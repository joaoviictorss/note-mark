import { useSetAtom } from 'jotai'
import { ActionButton, ActionButtonProps } from './action-button'
import { FaRegTrashAlt } from 'react-icons/fa'
import { deleteNoteAtom } from '@renderer/store'

export const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {
  const deleteNote = useSetAtom(deleteNoteAtom)

  const handleDelete = async () => {
    await deleteNote()
  }

  return (
    <ActionButton onClick={handleDelete} {...props}>
      <FaRegTrashAlt className="size-4 text-zinc-300" />
    </ActionButton>
  )
}
