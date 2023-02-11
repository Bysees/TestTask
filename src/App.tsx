import { List } from './components/List'
import styles from './app.module.scss'
import { useTypedSelector } from './store/hooks'
import { AddListItemForm, RemoveListItemForm } from './components/Form'
import { getList } from './store/selectors'
import { useState } from 'react'
import { IListItem } from './types'

const App = () => {
  const list = useTypedSelector(getList)
  const [selectedId, setSelectedId] = useState<IListItem['id'] | null>(null)
  const hasSelectedId = !!selectedId

  const handleSelectId = (id: IListItem['id']) => {
    setSelectedId((prevId) => (prevId !== id ? id : null))
  }

  const [modalFormStatus, setModalFormStatus] = useState<
    'confirm' | 'remove' | null
  >(null)

  const showAddListItemForm = () => setModalFormStatus('confirm')
  const showRemoveListItemForm = () => setModalFormStatus('remove')
  const hideAddListItemForm = () => setModalFormStatus(null)
  const hideRemoveListItemForm = () => setModalFormStatus(null)

  const ModalForm = {
    confirm: <AddListItemForm onHide={hideAddListItemForm} />,
    remove: hasSelectedId && (
      <RemoveListItemForm
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        onHide={hideRemoveListItemForm}
      />
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* А что должна делать эта кнопка? Я не знаю */}
        <button className={styles.graphBtn}>Тест GraphQL</button>
        <div className={styles.btns}>
          <button className={styles.btns__addBtn} onClick={showAddListItemForm}>
            Добавить
          </button>
          <button
            disabled={!hasSelectedId}
            onClick={showRemoveListItemForm}
            className={styles.btns__removeBtn}>
            Удалить
          </button>
        </div>
        <List
          list={list}
          selectedId={selectedId}
          setSelectedId={handleSelectId}
        />
      </div>
      {modalFormStatus && ModalForm[modalFormStatus]}
    </div>
  )
}

export { App }
