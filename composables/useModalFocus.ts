import { nextTick, onBeforeUnmount, watch, type Ref } from 'vue'

/** Keep keyboard and assistive-technology focus inside a teleported modal. */
export const useModalFocus = (
  isOpen: Ref<boolean>,
  dialog: Ref<HTMLElement | null>,
  close: () => void,
) => {
  let previousFocus: HTMLElement | null = null
  let previousOverflow = ''
  let active = false
  const background = new Map<HTMLElement, boolean>()
  const focusable = () => Array.from(dialog.value?.querySelectorAll<HTMLElement>(
    'a[href], button, input, select, textarea, [tabindex], [contenteditable="true"]',
  ) ?? []).filter(element => element.tabIndex >= 0
    && !element.matches(':disabled')
    && !element.closest('[inert]')
    && element.getClientRects().length > 0
    && getComputedStyle(element).visibility !== 'hidden')

  const focusFirst = () => (focusable()[0] ?? dialog.value)?.focus({ preventScroll: true })
  const keepFocus = (event: FocusEvent) => {
    if (active && !dialog.value?.contains(event.target as Node)) focusFirst()
  }
  const handleKeydown = (event: KeyboardEvent) => {
    if (!active) return
    if (event.key === 'Escape') {
      event.preventDefault()
      event.stopPropagation()
      close()
      return
    }
    if (event.key !== 'Tab') return
    const elements = focusable()
    const first = elements[0]
    const last = elements[elements.length - 1]
    if (!first) {
      event.preventDefault()
      dialog.value?.focus({ preventScroll: true })
    } else if (!dialog.value?.contains(document.activeElement)
      || (event.shiftKey && (document.activeElement === first || document.activeElement === dialog.value))) {
      event.preventDefault()
      ;(event.shiftKey ? last : first)?.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }
  const release = () => {
    if (!active) return
    active = false
    document.removeEventListener('keydown', handleKeydown, true)
    document.removeEventListener('focusin', keepFocus)
    background.forEach((wasInert, element) => { element.inert = wasInert })
    background.clear()
    document.body.style.overflow = previousOverflow
    if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true })
    previousFocus = null
  }

  watch(isOpen, async (open) => {
    if (!open) {
      release()
      return
    }
    previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    await nextTick()
    if (!isOpen.value || !dialog.value) return
    previousOverflow = document.body.style.overflow
    active = true
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeydown, true)
    document.addEventListener('focusin', keepFocus)
    // Move focus before making its former container inert.
    focusFirst()
    for (const element of document.body.children) {
      if (!(element instanceof HTMLElement) || element.contains(dialog.value)
        || ['SCRIPT', 'STYLE', 'LINK'].includes(element.tagName)) continue
      background.set(element, element.inert)
      element.inert = true
    }
  }, { flush: 'post' })

  onBeforeUnmount(release)
}
