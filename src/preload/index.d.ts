import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    // electron: ElectronAPI
    context: {
      locale: string,
      window: {
        close: () => void
        minimize: () => void
        maximize: () => void
        unmaximize: () => void
      }
    }
  }
}
