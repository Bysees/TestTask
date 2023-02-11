import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useRef,
  useState
} from 'react'
import { addListItem } from '../../store/actions'
import { useTypedDispatch } from '../../store/hooks'
import { IListItem } from '../../types'
import { Modal } from '../Modal'
import styles from './form.module.scss'

interface Props {
  onHide: () => void
}

const AddListItemForm: FC<Props> = ({ onHide }) => {
  const [text, setText] = useState('')
  const dispatch = useTypedDispatch()
  const refInput = useRef<HTMLInputElement>(null)

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) =>
    setText(e.target.value)

  const onSubmitHandler: FormEventHandler = (e) => {
    e.preventDefault()
    if (!text) return

    const newListItem: IListItem = {
      id: Date.now(),
      body: text
    }

    dispatch(addListItem(newListItem))
    setText('')
    refInput.current?.focus()
  }

  return (
    <Modal hide={onHide}>
      <form onSubmit={onSubmitHandler} className={styles.form}>
        <input
          ref={refInput}
          autoFocus
          className={styles.form__input}
          value={text}
          onChange={onChangeHandler}
          type='text'
          placeholder='Введите текст...'
        />
        <div className={styles.form__btns}>
        <button className={styles.form__acceptBtn}>Добавить</button>
        <button
          onClick={onHide}
          type='button'
          className={styles.form__cancelBtn}>
          Отмена
        </button>
        </div>
      </form>
    </Modal>
  )
}

export { AddListItemForm }
