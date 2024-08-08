import { VscChromeClose, VscChromeMaximize, VscChromeMinimize } from 'react-icons/vsc'

const DragableHeader = () => {
  function handleMinimize() {
    window.context.window.minimize()
  }

  function handleMaximize() {
    window.context.window.maximize()
  }

  function handleUnmaximize() {
    window.context.window.unmaximize()
  }

  function handleClose() {
    window.context.window.close()
  }

  return (
    <header className="absolute inset-0 h-8 bg-transparent flex items-center justify-end header ">
      <button
        className="p-2 hover:backdrop-brightness-125 cursor-pointer"
        id="minimize"
         onClick={handleMinimize}
      >
        <VscChromeMinimize color="gray" className="size-4" />
      </button>

      <button
        className="p-2 hover:backdrop-brightness-125 cursor-pointer"
        id="maximize"
        onClick={handleMaximize}
      >
        <VscChromeMaximize color="gray" className="size-4" />
      </button>

      <button
        className="p-2 hover:backdrop-brightness-125 cursor-pointer"
        id="close"
        onClick={handleClose}
      >
        <VscChromeClose color="gray" className="size-4" />
      </button>
    </header>
  )
}

export default DragableHeader
