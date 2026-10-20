import { siteConfig } from '../config/site'
import { splitVat } from './quote'

// 관리 화면과 고객 화면이 함께 쓰는 주문서 계산. 서버의 저장 형태는 server/utils/orders.ts에 있다.

export type OrderState = 'open' | 'expired' | 'submitted' | 'paid' | 'cancelled'

export interface AdminOrder {
  id: string
  token: string
  product: string
  amount: number // 고객이 내는 총금액 (부가세를 더한 주문이면 부가세 포함)
  vatIncluded: boolean
  deposit: number // 계약금. 0이면 완불
  account: string // 입금 계좌 id (orderAccount)
  spec: string
  dueDate: string
  memo: string
  state: OrderState
  customerName: string | null
  customerPhone: string | null
  customerAddress: string | null
  createdAt: string
  expiresAt: string
  submittedAt: string | null
  paidAt: string | null // 계약금 주문이면 계약금, 아니면 전액 입금을 확인한 때
  balancePaidAt: string | null // 계약금 주문의 잔금 입금을 확인한 때
}

export const ORDER_ACCOUNTS = siteConfig.order.accounts
/** 주문서의 입금 계좌. 모르는 id면 기본 계좌. */
export const orderAccount = (id: string | undefined) => ORDER_ACCOUNTS.find(item => item.id === id) || ORDER_ACCOUNTS[0]

/** 제작 후 실측 중량으로 최종 금액이 바뀔 수 있다는 고지. 고객 주문서와 주문서 이미지에 함께 쓴다. */
export const WEIGHT_NOTICE = '제작 후 실측 중량에 따라 금액이 달라질 수 있습니다.'

/** 공급가액에 부가세 10%를 더한 총금액. */
export const addVat = (supply: number) => supply + Math.round(supply / 10)

/** 총금액을 공급가액·부가세, 계약금·잔금으로 나눈다. */
export function orderMoney(order: Pick<AdminOrder, 'amount' | 'vatIncluded' | 'deposit'>) {
  const { supply, vat } = order.vatIncluded ? splitVat(order.amount) : { supply: order.amount, vat: 0 }
  return { total: order.amount, supply, vat, deposit: order.deposit, balance: order.amount - order.deposit }
}

/** 입금이 어디까지 확인됐는지. 계약금 주문은 계약금 → 잔금(완불) 두 번에 나눠 확인한다. */
export function paymentStage(order: Pick<AdminOrder, 'state' | 'deposit' | 'balancePaidAt'>): 'none' | 'deposit' | 'full' {
  if (order.state !== 'paid') return 'none'
  return order.deposit > 0 && !order.balancePaidAt ? 'deposit' : 'full'
}

const DIGITS = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구']
const SMALL_UNITS = ['', '십', '백', '천']
const LARGE_UNITS = ['', '만', '억', '조']

/** 증빙 서식에 쓰는 한글 금액. 1,000,000 → 일백만 */
export function koreanAmount(value: number): string {
  if (!value) return '영'
  let result = ''
  let rest = value
  for (let group = 0; rest > 0; group++, rest = Math.floor(rest / 10000)) {
    let chunk = rest % 10000
    let part = ''
    for (let place = 0; chunk > 0; place++, chunk = Math.floor(chunk / 10)) {
      const digit = chunk % 10
      if (digit) part = DIGITS[digit] + SMALL_UNITS[place] + part
    }
    if (part) result = part + LARGE_UNITS[group] + result
  }
  return result
}
