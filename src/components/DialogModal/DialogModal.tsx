import { useRef, useState } from 'react'
// @ts-ignore
import { eventBusService } from '../../services/eventBus.service.js'

interface DialogModalProps {
  modalName: string
}

export const DialogModal = (props: DialogModalProps) => {
  const [name, setName] = useState<string | null>()
  const elDialog = useRef<any>()

  eventBusService.on('openDialogModal', (settingName: string) => {
    setName(settingName)
    if (elDialog.current) {
      elDialog.current.removeAttribute('open')
      elDialog.current.showModal()
    }
  })

  const themes = () => ['Light', 'Dark', 'System default']

  const setTheme = (theme: string) => {
    document.documentElement.setAttribute('data-color-scheme', theme.toLowerCase() !== 'dark' ? 'default' : 'dark')
  }

  return (
    <dialog ref={elDialog} className="dialog-modal">
      <form method="dialog">
        <div className="dialog-modal__title">Choose {name}</div>
        <main className="dialog-modal__main flex column justify-center space-between">
          {themes().map((theme: string) => (
            <label key={theme} className="flex">
              <input name="radio" type="radio" value={theme} onChange={() => setTheme(theme)} />
              {theme}
            </label>
          ))}
        </main>
        <div className="dialog-modal__btns flex justify-end">
          <button className="dialog-modal--btn" type="submit" value="Close">
            CANCEL
          </button>
          <button className="dialog-modal--btn" type="submit" value="Close">
            OK
          </button>
        </div>
      </form>
    </dialog>
  )
}
