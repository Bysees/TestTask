import { IListItem } from "../../types"

export const addListItem = ({ id, body }: IListItem) => {
  return {
    type: 'LIST/ADD_ITEM',
    id,
    body
  } as const
}


export const removeListItem = ({ id }: Pick<IListItem, 'id'>) => {
  return {
    type: 'LIST/REMOVE_ITEM',
    id
  } as const
}