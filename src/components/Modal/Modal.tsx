import ReactDOM from 'react-dom'
import { FC, ReactNode, useEffect } from 'react'
import styles from './modal.module.scss'

const modalContainer = document.getElementById('modal') as HTMLElement
const Portal: FC<{ children?: ReactNode }> = ({ children }) =>
  ReactDOM.createPortal(children, modalContainer)

interface Props {
  children?: ReactNode | undefined
  hide: () => void
}

const Modal: FC<Props> = ({ children, hide }) => {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.code === 'Escape') hide()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [hide])

  return (
    <Portal>
      <div className={styles.container}>
        {children}
      </div>
    </Portal>
  )
}

export { Modal }
