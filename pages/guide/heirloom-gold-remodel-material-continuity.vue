<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/heirloom-gold-remodel-material-continuity'
const pageTitle = '금 리폼, 물려받은 금 사용 방식부터 정하세요 | 귀족'
const pageDescription = '물려받은 금으로 리폼할 때 원제품 일부를 남길지, 가져온 금을 재료로 쓸지, 금의 가치를 제작비에 반영할지 구분하고 순도·중량 확인과 공정별 확인 질문을 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/guide/heirloom-gold-remodel-material-continuity-hero-6e458495.webp`
const publishedAt = '2026-11-13'
const updatedAt = ''
const faqItems = [
  {
    "question": "리폼하면 물려받은 금이 전부 새 반지에 들어가나요?",
    "answer": "가져온 금을 재료로 쓰는 방식이라도 새 디자인에 필요한 중량보다 금이 적으면 새 금이 더해질 수 있습니다. 금의 가치를 제작비에 반영하는 방식이라면 완성품의 금속 자체는 가져온 금과 다른 금일 수 있습니다. 어느 방식으로 진행하는지와 추가 금이 들어가는지를 견적 단계에서 확인하세요."
  },
  {
    "question": "14K 반지와 18K 목걸이를 함께 가져가도 되나요?",
    "answer": "함께 가져와 상담할 수 있지만 순도가 다르므로 제품별로 감정과 계량 결과를 받아 두는 것이 좋습니다. 여러 합금을 함께 녹이면 주조물에 결함이 생길 수 있다고 안내하는 제작업체도 있으니, 두 제품을 합쳐 쓸지 나눠 쓸지 미리 물어보세요."
  },
  {
    "question": "작업 후 남은 금은 돌려받을 수 있나요?",
    "answer": "해외의 한 제작업체는 쓰지 않은 금속을 고객 선택에 따라 돌려주거나 스크랩으로 처리한다고 안내합니다. 귀족에서 남은 금을 어떻게 처리하는지는 사용 방식을 정하는 상담에서 함께 확인하고, 돌려받기를 원한다면 맡길 때 미리 말해 두세요."
  },
  {
    "question": "사진만 보내도 견적을 받을 수 있나요?",
    "answer": "카카오톡으로 제품 전체, 각인, 원하는 디자인 사진을 보내면 상담을 시작할 수 있습니다. 다만 순도와 중량은 매장에서 실물을 감정하고 계량해 확인하므로, 금값이 들어가는 최종 견적은 실물 확인 뒤에 정해집니다."
  },
  {
    "question": "물려받은 금 리폼은 완성까지 얼마나 걸리나요?",
    "answer": "주문제작은 최소 3주가 필요합니다. 날짜가 정해진 선물이라면 디자인 협의와 실물 감정 시간까지 더해 받고 싶은 날보다 3주 이상 앞서 문의하세요."
  }
]
const quickAnswers = [
  "'기존 금 활용'은 원제품 일부 남기기, 가져온 금을 재료로 쓰기, 금의 가치를 제작비에 반영하기로 나뉘며, 물려받은 금속 자체가 새 제품에 들어가는 것은 앞의 두 방식입니다.",
  "가져온 금을 재료로 쓸 때는 다른 금과 분리해 작업하는지, 모자라면 새 금을 더하는지, 남은 금은 어떻게 처리하는지를 공정 단계별로 물어야 합니다.",
  "귀족은 순도와 중량을 매장에서 실물 감정·계량으로 확인한 뒤 사용 방식을 정하며, 주문제작에는 최소 3주가 필요합니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "기존 금 활용은 세 가지 방식으로 나뉩니다",
    "paragraphs": [
      "물려받은 금이 새 제품에 그대로 쓰이는지 확인하는 기준은 리폼을 '원제품 일부 남기기', '가져온 금을 재료로 쓰기', '금의 가치를 제작비에 반영하기' 중 어느 방식으로 진행하는지입니다. 세 방식 모두 '기존 금을 활용한다'고 표현될 수 있지만, 완성품에 할머니의 반지나 어머니의 목걸이가 어떤 형태로 남는지는 서로 다릅니다.",
      "원제품 일부 남기기는 반지 본체, 펜던트 장식, 각인이 있는 부분처럼 원래 모양을 유지한 채 크기를 바꾸거나 새 부품을 더하는 방식입니다. 눈에 보이는 형태와 각인이 이어지기 때문에 '물려받은 물건 그대로'라는 의미가 가장 분명하게 남습니다.",
      "가져온 금을 재료로 쓰는 방식은 원제품의 모양은 사라지지만 그 금속이 새 디자인의 재료가 됩니다. 영국 제작업체 Stephen Einhorn은 고객의 금을 쓰는 주문에서 해당 금을 다른 금과 분리하고, 주조할 때 별도의 주조 용기를 쓴다고 설명합니다. 이런 분리 관리가 있어야 '내 금이 들어갔다'는 말이 성립하므로, 이 방식에서는 공정 관리가 핵심 질문이 됩니다.",
      "금의 가치를 제작비에 반영하는 방식은 가져온 금의 순도와 중량만큼의 가치를 새 제품 비용에 계산해 넣는 구조입니다. 영국 제작업체 Lawsons Goldsmiths는 기존 금의 상태와 조성에 따라 금을 새 디자인에 직접 넣는 방식과 재활용하는 금의 가치를 프로젝트에 반영하는 방식을 나눠 안내합니다. 가치를 반영하는 방식이라면 새 제품의 금속을 가져온 금과 같은 금속이라고 볼 수 없습니다.",
      "귀족의 주문제작 안내에도 리폼·리디자인 항목으로 기존 금 활용, 새 디자인 적용, 크기 변경이 있습니다. 가져온 금제품을 새 제품에 어떻게 쓸지는 제품의 순도·상태와 원하는 디자인을 확인한 뒤 정하므로, 처음 문의할 때 세 방식 중 어느 쪽을 원하는지 먼저 밝혀 두면 이후 질문이 분명해집니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "방식",
        "완성품에 남는 것",
        "먼저 확인할 점",
        "상담에서 물을 질문"
      ],
      "rows": [
        [
          "원제품 일부 남기기",
          "원래 형태·장식·각인의 일부",
          "남길 부위의 마모 상태와 새 부품과의 연결 구조",
          "어느 부위를 그대로 두고 어디를 새로 만드는지"
        ],
        [
          "가져온 금을 재료로 쓰기",
          "원제품의 금속(형태는 바뀜)",
          "제품별 순도·중량, 여러 제품의 합금 차이",
          "다른 금과 분리해 작업하는지, 모자라면 새 금을 더하는지"
        ],
        [
          "금의 가치를 제작비에 반영하기",
          "금의 가치(금속 자체는 다른 금일 수 있음)",
          "실물 감정한 순도와 계량한 중량",
          "어떤 기준으로 가치를 계산하는지, 남는 금은 어떻게 처리하는지"
        ]
      ]
    }
  },
  {
    "title": "원제품 일부를 남기려면 남길 부위부터 지정합니다",
    "paragraphs": [
      "물려받은 형태를 그대로 남기고 싶다면 녹이거나 자르지 않고 둘 부위를 먼저 지정해야 합니다. 반지라면 각인이 있는 안쪽 면이나 장식이 있는 윗부분, 목걸이라면 펜던트나 특정 마디처럼 '이 부분은 손대지 않는다'는 범위가 정해져야 새로 만들 부분도 정해집니다.",
      "크기 변경은 원형을 유지하는 리폼에서 자주 나오는 요청입니다. 반지 호수를 바꾸는 작업은 둘레의 일부를 다루게 되므로, 각인이 작업할 위치와 가까운지 미리 봐야 각인을 온전히 남길 수 있습니다. 각인 사진을 따로 찍어 보내면 각인 위치와 작업 부위가 겹치는지 함께 볼 수 있습니다.",
      "원래 장식에 보석이 박혀 있다면 보석을 그대로 둘지, 빼서 새 디자인으로 옮길지도 나눠서 물어야 합니다. 금속은 재료로 쓰고 보석만 원래 모습을 이어 가는 조합도 상담 항목이 되므로, '반지를 그대로 남긴다'는 말이 금속을 뜻하는지 보석을 뜻하는지 스스로 먼저 정리해 두세요.",
      "남길 부위가 오래 착용돼 얇아졌거나 이음새가 약해졌다면 그대로 둘 수 있는지보다 보강이 필요한지가 먼저 판단됩니다. 남길 부위의 두께와 이음새가 온전할수록 원형을 유지하는 쪽으로, 마모와 변형이 클수록 재료로 쓰는 쪽으로 방향이 기울기 쉽습니다.",
      "한쪽만 남은 귀걸이처럼 장식 하나를 펜던트로 살리는 경우는 원형을 남기는 대표적인 예입니다. 이때는 장식 자체보다 연결 고리를 어디에 어떤 방향으로 달지가 함께 정해지므로, 장식의 앞뒤 사진과 원하는 착용 방향을 같이 보내면 판단이 빨라집니다."
    ],
    "bullets": [
      "제품 전체 사진: 앞면·옆면·뒷면을 각각 한 장씩",
      "남기고 싶은 부위 근접 사진: 장식, 마디, 보석이 있는 면",
      "각인 사진: 안쪽 면이나 잠금장식에 새겨진 글자와 숫자",
      "원하는 새 디자인 사진: 참고 이미지나 손그림"
    ],
    "table": null
  },
  {
    "title": "가져온 금을 재료로 쓸 때 공정별로 묻습니다",
    "paragraphs": [
      "가져온 금 자체가 새 제품에 들어가길 원한다면 '기존 금을 쓴다'는 답 하나로 넘어가지 말고, 공정 단계마다 금이 어떻게 관리되는지를 물어야 합니다. 맡길 때, 녹이거나 가공할 때, 금이 모자랄 때, 금이 남을 때의 네 단계로 나누면 질문이 빠지지 않습니다.",
      "맡길 때와 가공할 때의 질문은 분리 관리입니다. Stephen Einhorn은 고객의 금을 다른 금과 분리하고 주조 시 별도 주조 용기를 쓴다고 설명하면서, 적용 여부는 개별 사례별로 판단한다고 밝힙니다. 이는 해당 업체의 방침이므로, 귀족에 맡길 때도 내 금이 다른 금과 따로 관리되는지 직접 물어 확인하세요.",
      "여러 제품을 함께 가져온다면 합칠지 나눌지가 다음 질문입니다. 네덜란드 제작자 Margriet Jewels는 고객이 가져온 기존 금은 합금 조성을 정확히 알 수 없어 작업 전에 확인이 필요하고, 여러 기존 합금을 함께 녹이면 주조물에 불순물이나 작은 구멍 같은 결함이 생길 수 있다고 안내합니다. 14K 반지와 18K 목걸이처럼 표기가 다른 제품을 함께 맡긴다면 어떤 제품을 어떤 부위에 쓸지 미리 정해 두는 편이 안전합니다.",
      "금이 모자랄 때의 처리도 미리 알아야 합니다. Margriet Jewels는 고객의 금만으로 제품 전체를 만들기에 부족하면 필요한 중량을 맞추기 위해 새 금을 더한다고 명시합니다. 새 디자인이 원제품보다 크거나 두꺼울수록 가져온 금만으로 완성품이 구성되지 않을 가능성이 커지므로, 추가 금이 들어가는지와 그 비중을 견적 단계에서 확인하세요.",
      "금이 남을 때의 처리는 마지막 질문입니다. Stephen Einhorn은 기존 반지에서 쓰지 않은 금속을 고객의 선택에 따라 돌려주거나 스크랩으로 처리한다고 안내합니다. 남은 금을 돌려받을지, 가치로 계산할지, 다른 작은 제품에 쓸지를 맡기기 전에 정해 두면 완성 후 정리가 깔끔합니다."
    ],
    "bullets": [
      "맡긴 금을 다른 금과 섞이지 않게 따로 보관하고 작업하는지",
      "순도가 다른 여러 제품을 함께 녹이는지, 제품별로 나눠 쓰는지",
      "새 디자인에 필요한 중량보다 가져온 금이 적으면 새 금을 얼마나 더하는지",
      "작업 후 남은 금은 돌려받는지, 가치로 계산하는지",
      "완성품에 원제품의 각인이나 장식이 남는 부분이 있는지"
    ],
    "table": null
  },
  {
    "title": "순도와 중량을 먼저 확인해야 하는 이유",
    "paragraphs": [
      "가져온 금을 새 제품에 어떻게 쓸지는 순도와 중량을 확인한 다음에 정할 수 있습니다. 귀족은 순도와 중량을 매장에서 실물을 감정하고 계량해 확인하며, 이 결과가 원형 유지, 재료 사용, 가치 반영 중 어느 방식이 맞는지를 가르는 출발점이 됩니다.",
      "캐럿은 전체 금속 중량에서 순금이 차지하는 비율입니다. World Gold Council과 GIA 자료에 따르면 18K는 금 75%와 다른 금속 25%로 이루어지고, 천분율로는 .750으로 표기합니다. 14K는 대부분 585로 표기하며(.583으로 적힌 경우도 있음), 24K 순금은 .999로 표기합니다.",
      "반지 안쪽의 각인만 보고 순도를 확정하기는 어렵습니다. GIA 학술지 논문은 금제품에 표기된 순도와 실제 금 함량이 다를 수 있다는 문제가 업계에서 오래 제기돼 왔고, 그래서 금 함량을 확인하는 검사가 필요하다고 설명합니다. 물려받은 제품은 각인이 닳아 읽기 어렵거나 아예 없는 경우도 있으므로, 실물 감정을 거쳐야 새 제품의 재료로 쓸 수 있는지 판단할 수 있습니다.",
      "중량은 1돈이 3.75g이라는 기준으로 환산합니다. 같은 1돈이라도 순도에 따라 들어 있는 순금의 양이 달라서, 18K 1돈에는 약 2.81g, 14K 1돈에는 약 2.19g의 순금이 들어 있습니다. 물려받은 제품의 무게가 같아 보여도 순도가 다르면 새 제품에 기여하는 금의 양이 다르다는 뜻입니다.",
      "가져온 금의 순도와 새로 만들 제품의 순도가 다르면 가져온 금을 그대로 재료로 쓰는 방식이 맞는지부터 다시 따져 봐야 합니다. 14K 제품을 가져와 18K 반지를 원하는 경우처럼 순도가 맞지 않을 때는, 제품별 감정 결과를 받은 뒤 재료로 쓸지 가치로 반영할지를 정하는 순서가 자연스럽습니다."
    ],
    "bullets": [],
    "image": {
      "src": "/Image/guide/heirloom-gold-remodel-material-continuity-section-3-4f49aa52.webp",
      "alt": "확대경 렌즈 아래로 금반지 안쪽에 새겨진 585 숫자 각인이 크게 보이는 근접 사진",
      "caption": "반지 안쪽의 585 각인은 14K 표기에 해당하지만, 실제 금 함량은 실물 감정으로 확인합니다.",
      "width": 1254,
      "height": 1254
    },
    "table": {
      "headers": [
        "표기",
        "순도 비율",
        "천분율 표기",
        "1돈(3.75g)의 순금 환산"
      ],
      "rows": [
        [
          "24K",
          "99.9%",
          ".999",
          "약 3.75g"
        ],
        [
          "18K",
          "75%",
          ".750",
          "약 2.81g"
        ],
        [
          "14K",
          "58.5%",
          ".585(.583)",
          "약 2.19g"
        ]
      ]
    }
  },
  {
    "title": "금의 가치를 반영하는 방식은 가격 구조로 확인합니다",
    "paragraphs": [
      "금의 가치를 제작비에 반영하는 방식이라면, 가져온 금이 어떤 계산식으로 새 제품 가격에 들어가는지 확인하는 것이 핵심입니다. 새 금제품의 가격은 금값(중량 × 당일 시세 × 순도 비율: 24K 99.9%, 18K 75%, 14K 58.5%)에 공임, 그리고 보석·각인 같은 추가 작업이 더해지는 구조입니다.",
      "가져온 금은 이 가운데 금값 부분과 맞닿습니다. 실물 감정한 순도와 계량한 중량에 순도 비율을 곱하면 가져온 금의 순금 환산량이 나오고, 이를 새 디자인에 필요한 금의 양과 비교하면 금이 모자라는지 남는지가 갈립니다. 모자라면 새 금이, 남으면 잔여 금의 처리 방식이 견적에 함께 들어갑니다.",
      "공임은 가져온 금을 쓰더라도 새 디자인을 만드는 작업에 대해 따로 계산되는 항목입니다. 원제품 일부를 남기는 리폼에서는 남길 부위를 다루고 새 부품과 잇는 작업이, 재료로 쓰는 리폼에서는 새로 만드는 범위와 디자인의 복잡도가 공임을 움직입니다. 원래 보석을 옮겨 세팅하거나 새 각인을 넣는다면 추가 작업으로 더해집니다.",
      "금액과 공임 범위는 실물 감정과 디자인이 정해진 뒤 견적으로 나오므로 이 글에는 적지 않습니다. 견적을 받으려면 제품 전체 사진, 각인 사진, 남기고 싶은 부위 사진, 원하는 디자인 사진과 함께 원하는 방식(원형 유지·재료 사용·가치 반영)과 희망 수령일을 보내세요.",
      "같은 '기존 금 활용'이라도 금속 자체를 쓰는 방식과 가치를 반영하는 방식은 견적에서 금이 다뤄지는 방법이 다릅니다. 견적을 받을 때 가져온 금이 재료로 들어갔는지, 금액 계산에 반영됐는지를 한 줄로 확인해 두면 완성품을 받은 뒤 '내 금이 들어간 줄 알았다'는 오해를 막을 수 있습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "귀족에 상담할 때의 순서와 일정",
    "paragraphs": [
      "귀족에서는 카카오톡으로 제품 전체, 각인, 원하는 디자인 사진을 보내면 상담을 시작할 수 있고, 전화나 매장 방문으로도 문의할 수 있습니다. 매장은 서울 종로3가 종묘귀금속백화점 101호에 있는 귀금속 도매·주문제작 매장입니다.",
      "첫 메시지에는 사진과 함께 원하는 방식을 한 문장으로 적으세요. '반지 윗부분 장식은 그대로 두고 크기만 바꾸고 싶다', '목걸이와 반지를 녹여 새 반지 하나로 만들고 싶다'처럼 남길 것과 바꿀 것을 구체적으로 적으면 어떤 질문부터 확인해야 할지가 바로 정해집니다.",
      "사진으로는 디자인 방향과 남길 부위를 볼 수 있지만, 순도와 중량은 매장에서 실물을 감정하고 계량해야 확인됩니다. 실물을 가져오기 전에 집에서 제품마다 사진을 찍어 두고, 매장에서 확인한 순도와 중량을 함께 기록해 두면 앞에서 정리한 공정별 질문의 답과 나중에 맞춰 볼 수 있습니다.",
      "주문제작은 최소 3주가 필요합니다. 결혼, 돌, 기념일처럼 날짜가 정해진 선물로 리폼한다면 받고 싶은 날에서 최소 3주를 거꾸로 계산하고, 디자인 협의와 실물 감정 시간을 더해 첫 문의 날짜를 잡으세요.",
      "가족이 함께 물려받은 금이라면 누가 어떤 제품을 맡기는지, 남은 금을 누구에게 돌려줄지까지 미리 정해 두는 편이 좋습니다. 금의 사용 방식이 정해진 뒤에 의견이 갈리면 디자인 확정이 늦어지고, 최소 3주인 제작 기간도 그만큼 뒤로 밀립니다."
    ],
    "bullets": [
      "원하는 방식: 원형 유지, 재료 사용, 가치 반영 중 하나",
      "제품 전체 사진과 각인 사진, 남기고 싶은 부위 근접 사진",
      "원하는 새 디자인 참고 사진",
      "여러 제품이라면 제품별로 나눈 사진과 각 제품을 어디에 쓰고 싶은지",
      "남은 금의 처리 희망(돌려받기, 가치 계산 등)",
      "희망 수령일(주문제작 최소 3주 기준)"
    ],
    "table": null
  }
]
const cautions = [
  "해외 제작업체가 설명한 분리 보관, 별도 주조 용기, 남은 금속 반환 방침은 각 업체의 방침입니다. 귀족에서의 처리 방식이 같다는 뜻이 아니므로 맡기기 전에 직접 확인하세요.",
  "새 디자인에 필요한 금이 가져온 금보다 많으면 새 금이 더해질 수 있어, 완성품이 물려받은 금만으로 이루어진다고 단정할 수 없습니다.",
  "순도가 다른 여러 제품을 함께 녹이면 주조물에 불순물이나 작은 구멍 같은 결함이 생길 수 있다고 안내하는 제작업체가 있으니, 합칠지 나눌지를 미리 물어보세요.",
  "각인 표기와 실제 금 함량이 다를 수 있으므로 각인만 보고 순도와 금값을 계산하지 마세요.",
  "사진 상담만으로는 순도와 중량이 확정되지 않으며, 금값이 들어가는 견적은 매장에서 실물을 감정·계량한 뒤에 나옵니다."
]
const relatedLinks = [
  {
    "to": "/guide/gold-jewelry-remodeling-cost",
    "label": "금 리폼 비용, 오래된 금제품을 새 반지·목걸이로 바꾸는 기준",
    "description": "기존 금 중량, 순도, 새 디자인, 세공 공임, 추가 금 사용 여부에 따라 달라지는 리폼 비용 기준을 정리했습니다."
  },
  {
    "to": "/guide/gold-jewelry-remodeling-time",
    "label": "금 리폼 기간, 디자인 확정부터 새 반지·목걸이 수령까지",
    "description": "기존 금·보석 확인, 디자인 확정, 제작, 세팅, 마감과 검수 단계로 나눠 희망 수령일에 맞춘 리폼 일정을 정리했습니다."
  },
  {
    "to": "/guide/single-earring-to-pendant-remodel",
    "label": "한쪽 귀걸이 목걸이 리폼, 가능할까요?",
    "description": "한쪽만 남은 귀걸이를 펜던트로 살릴 때 장식·보석의 재사용 범위와 연결 구조를 확인하는 방법을 정리했습니다."
  },
  {
    "to": "/guide/gold-magnet-test-limitations",
    "label": "금이 자석에 붙으면 가짜일까? 자석 테스트 한계와 확인 순서",
    "description": "물려받은 금제품의 순도를 집에서 판단하기 어려운 이유와 각인·XRF·시금석으로 확인하는 순서를 정리했습니다."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '금 리폼, 물려받은 금 사용 방식부터 정하세요'
const gmArticleLead = '물려받은 금이 새 제품에 그대로 쓰이는지 확인하려면 원하는 방식이 \'원제품 일부 남기기\', \'가져온 금을 재료로 쓰기\', \'금의 가치를 제작비에 반영하기\' 중 무엇인지 먼저 정하고, 그 방식에 맞는 질문을 공정 단계별로 해야 합니다. 세 방식은 모두 \'기존 금 활용\'이라고 불릴 수 있지만, 완성품에 남는 것이 원래 형태인지, 금속 자체인지, 금의 가치인지가 서로 다릅니다. 이 글은 방식별로 확인할 점, 순도와 중량을 먼저 확인해야 하는 이유, 가격이 정해지는 구조, 귀족에 상담할 때 준비할 사진과 일정을 차례로 정리합니다.'
const gmArticleCategory = '주문'
const gmArticleKeyword = '물려받은 금 리폼'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '물려받은 금 리폼 시 기존 금 사용 방식(원형 유지·재료 사용·가치 반영) 상담'
const gmHeroAlt = '나무 작업대 위에 오래 착용해 광택이 줄어든 금반지 두 개와 노란 금 체인 목걸이가 놓여 있고, 옆에 전자저울과 확대경이 함께 있는 모습'
const gmHeroCaption = '오래된 금반지와 체인 목걸이를 전자저울·확대경과 함께 놓아 리폼 전에 중량과 각인을 살펴보는 상황을 담았습니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '원형 유지·재료 사용·가치 반영의 구분과 분리 보관, 추가 금 투입, 남은 금속 처리에 대한 설명은 영국과 네덜란드 제작업체가 자사 서비스를 설명한 공식 안내를 근거로 했으며, 각 업체의 방침일 뿐 귀족의 공정과 같다는 뜻은 아닙니다. 캐럿 정의와 천분율 표기, 표기와 실제 함량이 다를 수 있다는 점은 World Gold Council과 GIA 자료를 따랐습니다. 귀족의 상담 방법, 실물 감정·계량, 주문제작 최소 3주, 1돈 3.75g 기준은 사업자가 제공한 사실입니다.'
const gmSources = [
  {
    "label": "Lawsons Goldsmiths — Jewellery Remodelling",
    "url": "https://lawsonsgoldsmiths.co.uk/pages/jewellery-remodelling",
    "note": "자체 작업실을 운영하는 제작업체의 공식 리폼 안내입니다. 기존 금의 상태와 조성에 따라 직접 사용하는 방식과 금의 가치를 프로젝트에 반영하는 방식을 구분합니다. 해당 업체의 서비스 설명에 한정합니다."
  },
  {
    "label": "Stephen Einhorn — Bespoke Jewellery",
    "url": "https://www.stepheneinhorn.co.uk/pages/bespoke-jewellery",
    "note": "자체 작업실에서 제품을 제작하는 제조사의 공식 문답입니다. 고객 금의 분리 관리와 별도 주조 용기 사용, 사용하지 않은 금속의 처리 방침을 직접 설명합니다."
  },
  {
    "label": "Margriet Jewels — Jewelry of OWN GOLD",
    "url": "https://www.margrietjewels.com/en/collections/goldsmith-margriet/jewelry-of-own-gold/",
    "note": "제작자가 고객의 기존 금으로 작업하는 과정을 설명한 공식 서비스 문서입니다. 기존 합금의 사전 확인, 개별 제작, 금이 부족할 때의 추가 투입을 확인할 수 있습니다."
  },
  {
    "label": "World Gold Council — About gold jewellery",
    "url": "https://www.gold.org/about-gold/about-gold-jewellery",
    "note": "국제 금 산업 협회의 금 순도 설명입니다. 캐럿별 금 함량과 천분율 표기의 근거로 씁니다."
  },
  {
    "label": "GIA Gems & Gemology — Methods for Determining the Gold Content of Jewelry Metals",
    "url": "https://www.gia.edu/doc/Methods-for-Determining-Gold-Content-of-Jewelry-Metals.pdf",
    "note": "보석 교육기관 GIA 학술지 논문입니다. 캐럿이 전체 금속 중량 대비 순금 비율이라는 정의와, 표기와 실제 함량이 다를 수 있어 검사가 필요하다는 점의 근거로 씁니다."
  }
]
// guide-manager:data:end

useHead({
  title: pageTitle,
  link: [{ rel: 'canonical', href: `${siteConfig.url}${pagePath}` }],
  meta: [
    { name: 'description', content: pageDescription },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: `${siteConfig.url}${pagePath}` },
    { property: 'og:image', content: ogImage },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: pageDescription },
    { name: 'twitter:image', content: ogImage },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(buildBreadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '귀금속 가이드', path: '/guide' },
        { name: gmArticleTitle, path: pagePath },
      ])),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: pageTitle,
        description: pageDescription,
        image: articleImages,
        datePublished: publishedAt,
        dateModified: updatedAt || publishedAt,
        mainEntityOfPage: `${siteConfig.url}${pagePath}`,
        author: { '@type': 'Organization', '@id': siteConfig.url + '/#organization', name: siteConfig.name, url: siteConfig.url },
        reviewedBy: { '@type': 'Organization', '@id': siteConfig.url + '/#organization', name: gmReviewedBy, url: siteConfig.url },
        publisher: {
          '@type': 'Organization', '@id': siteConfig.url + '/#organization', name: siteConfig.name, url: siteConfig.url,
          logo: { '@type': 'ImageObject', url: siteConfig.url + '/favicon.svg' },
        },
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      }),
    },
  ],
})
</script>

<template>
  <GuideArticleView
    :category="gmArticleCategory"
    :keyword="gmArticleKeyword"
    :inquiry-type="gmInquiryType"
    :inquiry-topic="gmInquiryTopic"
    :title="gmArticleTitle"
    :lead="gmArticleLead"
    :published-at="publishedAt"
    :updated-at="updatedAt || undefined"
    :hero-image="ogImage"
    :hero-alt="gmHeroAlt"
    :hero-caption="gmHeroCaption"
    :hero-width="gmHeroWidth"
    :hero-height="gmHeroHeight"
    :reviewed-by="gmReviewedBy"
    :quick-answers="quickAnswers"
    :sections="sections"
    :cautions="cautions"
    :faq-items="faqItems"
    :related-links="relatedLinks"
    :source-note="gmSourceNote"
    :sources="gmSources"
  />
</template>
