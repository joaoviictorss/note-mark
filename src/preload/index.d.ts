import { ElectronAPI } from '@electron-toolkit/preload'
import { GetNotes, ReadNote } from '@shared/types'

declare global {
  interface Window {
    // electron: ElectronAPI
    context: {
      locale: string
      getNotes: GetNotes
      readNote: ReadNote
      writeNote: WriteNote
      createNote: CreateNote
      deleteNote: DeleteNote
      window: {
        close: () => void
        minimize: () => void
        maximize: () => void
        unmaximize: () => void
      }
    }
  }
}
