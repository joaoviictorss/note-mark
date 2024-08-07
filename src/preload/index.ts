import { contextBridge } from 'electron'

if (!process.contextIsolated) {
  throw new Error('ContextIsolation must be enabled in this BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('context', {
    //TODO
  })
} catch (error) {
  console.error(error)
}