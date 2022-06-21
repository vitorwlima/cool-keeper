import { toast, ToastOptions } from 'react-toastify'

type Notification = 'info' | 'success' | 'warn' | 'error'

export const notify = (type: Notification, message: string, options?: ToastOptions) => {
  return toast[type](message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    ...options,
  })
}
