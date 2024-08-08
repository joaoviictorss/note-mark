import { ActionButton, Content, NotePreviewList, RootLayout, SideBar } from './components'
import ActionButtonsRow from './components/button/action-buttons-row'
import DragableHeader from './components/dragable'
import FloatingNoteTitle from './components/floating-note-title'
import MarkdownEditor from './components/markdown-editor'

const App = () => {
  return (
    <RootLayout>
      <DragableHeader />
      <SideBar className="p-2">
        <ActionButtonsRow className="flex justify-between mt-1" />
        <NotePreviewList className="mt-3 space-y-1" />
      </SideBar>

      <Content className="border-l bg-zinc-900/50 border-l-white/20  ">
        <FloatingNoteTitle className='pt-2'/> 
        <MarkdownEditor />
      </Content>
    </RootLayout>
  )
}

export default App
