import { Dispatch, FC, useEffect, useRef, useState } from 'react'
import { IListState } from '../../store/reducers/listReducer'
import { IListItem } from '../../types'
import styles from './list.module.scss'
import { ListItem } from './ListItem'

interface Props {
  list: IListState
  selectedId: IListItem['id'] | null
  setSelectedId: (id: IListItem['id']) => void
}

const List: FC<Props> = ({ list, selectedId, setSelectedId }) => {
  const listItems = list.ids.map((id) => list.byId[id])

  return (
    <ul className={styles.list}>
      {listItems.map(({ id, body }) => {
        return (
          <ListItem
            key={id}
            body={body}
            id={id}
            isSelected={selectedId === id}
            setSelectedId={setSelectedId}
          />
        )
      })}
    </ul>
  )
}

export { List }
