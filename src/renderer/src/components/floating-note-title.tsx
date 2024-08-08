import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

const FloatingNoteTitle = ({ className, ...props }: ComponentProps<'div'>) => {
  const title = 'Title'

  return (
    <div className={twMerge('flex justify-center', className)} {...props}>
      <span className='text-gray-400'>{title}</span>
    </div>
  )
}

export default FloatingNoteTitle
