import { Dispatch, FC, memo } from 'react'
import { IListItem } from '../../types'
import styles from './list.module.scss'

interface Props extends IListItem {
  isSelected: boolean
  setSelectedId: (id: IListItem['id']) => void
}

const ListItem: FC<Props> = memo(({ id, body, isSelected, setSelectedId }) => {
  console.log('Item id --> ', id)

  return (
    <li
      onClick={() => setSelectedId(id)}
      className={`${styles.list__item} ${
        isSelected ? styles.list__item_select : ''
      }`}
      key={id}>
      {body}
    </li>
  )
})

export { ListItem }
