// Types a fixed prefix once, then cycles through messages: type, pause, delete, next.
// State is reactive refs, so the template just renders text. Timers stop on unmount.
export const useTypewriter = (prefix: string, messages: string[], opts = { type: 70, erase: 50, hold: 1500, prefixSpeed: 100 }) => {
  const prefixText = ref('')
  const typedText = ref('')
  let timer: ReturnType<typeof setTimeout> | undefined
  let stopped = false

  const wait = (ms: number) => new Promise<void>((resolve) => { timer = setTimeout(resolve, ms) })

  const run = async () => {
    for (const ch of prefix) {
      if (stopped) return
      prefixText.value += ch
      await wait(opts.prefixSpeed)
    }
    for (let i = 0; !stopped; i = (i + 1) % messages.length) {
      const msg = messages[i]!
      for (let n = 1; n <= msg.length && !stopped; n++) {
        typedText.value = msg.slice(0, n)
        await wait(opts.type)
      }
      await wait(opts.hold)
      for (let n = msg.length - 1; n >= 0 && !stopped; n--) {
        typedText.value = msg.slice(0, n)
        await wait(opts.erase)
      }
    }
  }

  onMounted(run)
  onBeforeUnmount(() => { stopped = true; clearTimeout(timer) })

  return { prefixText, typedText }
}
