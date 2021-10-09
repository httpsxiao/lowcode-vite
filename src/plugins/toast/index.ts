import { h, reactive, createApp, App, inject } from 'vue'

type CreateResponse = (app: App) => void
type ToastFn = (msg: string) => void
interface ToastOption {
  duration?: number,
  width?: string
  height?: string
  lineHeight?: string
  backgroundColor?: string,
  color?: string
  borderRadius?: string
}

const hasSymbol = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol'
const DefaultKey = hasSymbol ? Symbol('plugin-toast') : 'plugin-toast'

function createProvideKey(name?: string): symbol | string {
  if (!name) {
    return DefaultKey
  }

  return hasSymbol ? Symbol('plugin-toast' + name) : 'plugin-toast' + name
}

export function createToast(option: ToastOption = {}): CreateResponse {
  const {
    duration = 1000,
    width = '100px',
    height = '50px',
    lineHeight = '50px',
    backgroundColor = '#79bbff',
    color = '#fff',
    borderRadius = '5px'
  } = option

  const state = reactive({
    show: false,
    text: ''
  })
  
  const toastVM = createApp({
    setup() {
      return () =>
        h(
          'div',
          {
            class: [
              'plugin-toast',
            ],
            style: {
              position: 'fixed',
              top: '50%',
              left: '50%',
              zIndex: '9999',
              display: state.show ? 'block' : 'none',
              backgroundColor,
              color,
              width,
              height,
              lineHeight,
              textAlign: 'center',
              borderRadius,
              transform: 'translate(-50%, -50%)'
            }
          },
          [state.text]
        )
    }
  })
  
  const toastWrapper = document.createElement('div')
  toastWrapper.id = 'plugin-toast'
  document.body.appendChild(toastWrapper)
  toastVM.mount(toastWrapper)

  let timer: number|undefined = undefined

  function toast(msg: string): void {
    state.show = true
    state.text = msg

    clearTimeout(timer)
    timer = setTimeout(() => {
      state.show = false
      state.text = ''
    }, duration)
  }


  return (app: App, name?: string) => {
    const toastKey = createProvideKey(name)

    app.provide(toastKey, toast)
    app.config.globalProperties.$toast = toast
  }
}

export function useToast(name?: string): ToastFn {
  const toast = inject(name || DefaultKey) as ToastFn
  return toast
}
