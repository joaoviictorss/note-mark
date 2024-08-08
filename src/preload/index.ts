import { GetNotes } from '@shared/types'
import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('ContextIsolation must be enabled in this BrowserWindow')
}

export const API = {
  locale: navigator.language,
  getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke('getNotes', ...args),
  window: {
    close: () => ipcRenderer.send('app/close'),
    minimize: () => ipcRenderer.send('app/minimize'),
    maximize: () => ipcRenderer.send('app/maximize'),
    unmaximize: () => ipcRenderer.send('app/unmaximize')
  }
}

try {
  contextBridge.exposeInMainWorld('context', API)
} catch (error) {
  console.error(error)
}
