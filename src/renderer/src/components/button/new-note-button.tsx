import { useSetAtom } from 'jotai'
import { ActionButton, ActionButtonProps } from './action-button'
import { LuFileSignature } from 'react-icons/lu'
import { createEmptyNoteAtom } from '@renderer/store'

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)

  const handleCreation = () => {
    createEmptyNote()
  }

  return (
    <ActionButton onClick={handleCreation} {...props}>
      <LuFileSignature className="size-4 text-zinc-300" />
    </ActionButton>
  )
}
