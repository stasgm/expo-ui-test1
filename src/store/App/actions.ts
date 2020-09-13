import { IData } from '../../model/types';
import { createActionPayload, ActionsUnion, createAction } from '../utils';

// eslint-disable-next-line no-shadow
export enum ActionAppTypes {
  ADD_ITEM = 'ADD_ITEM',
  ADD_ITEMS = 'ADD_ITEMS',
  EDIT_ITEM = 'EDIT_ITEM',
  DELETE_ITEM = 'DELETE_ITEM',
  DELETE_ALL = 'DELETE_ALL',
}

export const AppActions = {
  addItem: createActionPayload<ActionAppTypes.ADD_ITEM, IData>(ActionAppTypes.ADD_ITEM),
  addItems: createActionPayload<ActionAppTypes.ADD_ITEMS, IData[]>(ActionAppTypes.ADD_ITEMS),
  editItem: createActionPayload<ActionAppTypes.EDIT_ITEM, IData>(ActionAppTypes.EDIT_ITEM),
  deletItem: createActionPayload<ActionAppTypes.DELETE_ITEM, string>(ActionAppTypes.DELETE_ITEM),
  deleteAllItems: createAction<ActionAppTypes.DELETE_ALL>(ActionAppTypes.DELETE_ALL),
};

export type TAppActions = ActionsUnion<typeof AppActions>;
