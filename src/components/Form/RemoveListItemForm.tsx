import { FC, FormEventHandler } from 'react'
import { removeListItem } from '../../store/actions'
import { useTypedDispatch } from '../../store/hooks'
import { IListItem } from '../../types'
import { Modal } from '../Modal'
import styles from './form.module.scss'

interface Props {
  onHide: () => void
  selectedId: IListItem['id']
  setSelectedId: (id: IListItem['id'] | null) => void
}

const RemoveListItemForm: FC<Props> = ({
  onHide,
  selectedId,
  setSelectedId
}) => {
  const dispatch = useTypedDispatch()

  const onSubmitHandler: FormEventHandler = (e) => {
    e.preventDefault()
    dispatch(removeListItem({ id: selectedId }))
    setSelectedId(null)
    onHide()
  }

  return (
    <Modal hide={onHide}>
      <form onSubmit={onSubmitHandler} className={styles.form}>
        <h3 className={styles.form__title}>Вы точно хотите удалить элемент?</h3>
        <div className={styles.form__btns}>
          <button>Да</button>
          <button type='button' onClick={onHide}>
            Нет
          </button>
        </div>
      </form>
    </Modal>
  )
}

export { RemoveListItemForm }
