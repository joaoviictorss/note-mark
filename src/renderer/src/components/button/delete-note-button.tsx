import { ActionButton, ActionButtonProps } from './action-button'
import { FaRegTrashAlt } from 'react-icons/fa'

export const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {
  return (
    <ActionButton {...props}>
      <FaRegTrashAlt className="size-4 text-zinc-300" />
    </ActionButton>
  )
}
