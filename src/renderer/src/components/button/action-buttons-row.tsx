import { ComponentProps } from 'react'
import { DeleteNoteButton } from './delete-note-button'
import { NewNoteButton } from './new-note-button'

const ActionButtonsRow = ({ ...props }: ComponentProps<'div'>) => {
  return (
    <div {...props}>
      <NewNoteButton />
      <DeleteNoteButton />
    </div>
  )
}

export default ActionButtonsRow
