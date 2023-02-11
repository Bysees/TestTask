import { IListItem } from './../../types';
import { ActionTypes } from '../store'

export interface IListState {
  byId: {
    [key: IListItem['id']]: IListItem
  },
  ids: IListItem['id'][]
}

const initialState: IListState = {
  byId: {
    1: {
      id: 1,
      body: 'React'
    },
    2: {
      id: 2,
      body: 'TypeScript'
    },
    3: {
      id: 3,
      body: 'Redux'
    },
  },
  ids: [1, 2, 3]
}

export const listReducer = (state = initialState, action: ActionTypes): IListState => {
  switch (action.type) {
    case 'LIST/ADD_ITEM': {

      const newListItem: IListItem = {
        id: action.id,
        body: action.body,
      }

      return {
        byId: {
          ...state.byId,
          [action.id]: newListItem
        },
        ids: [...state.ids, action.id]

      }
    }

    case 'LIST/REMOVE_ITEM': {
      const { [action.id]: removedListItem, ...updatedListItems } = state.byId;

      return {
        byId: updatedListItems,
        ids: state.ids.filter(id => id !== action.id)
      };
    }

    default: {
      return state
    }
  }
}
