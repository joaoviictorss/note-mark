import { ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { VscChromeMaximize, VscChromeMinimize, VscChromeClose } from 'react-icons/vsc'
import { BaseWindow, contextBridge, ipcRenderer } from 'electron'
import { contextId } from 'process'

export const RootLayout = ({ children, className, ...props }: ComponentProps<'main'>) => {
  return (
    <main className={twMerge('flex flex-row h-screen', className)} {...props}>
      {children}
    </main>
  )
}

export const SideBar = ({ className, children, ...props }: ComponentProps<'aside'>) => {
  return (
    <aside
      className={twMerge('w-[250px] mt-10 h-[100vh + 10px] overflow-auto', className)}
      {...props}
    >
      {children}
    </aside>
  )
}

export const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={twMerge('flex-1 overflow-auto pt-8', className)} {...props}>
        {children}
      </div>
    )
  }
)

Content.displayName = 'Content'
