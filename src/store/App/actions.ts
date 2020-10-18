import { IData, IField, IForms, ISortField } from '../../model/types';
import { createActionPayload, ActionsUnion, createAction } from '../utils';

// eslint-disable-next-line no-shadow
export enum ActionAppTypes {
  ADD_ITEM = 'ADD_ITEM',
  ADD_ITEMS = 'ADD_ITEMS',
  EDIT_ITEM = 'EDIT_ITEM',
  DELETE_ITEM = 'DELETE_ITEM',
  DELETE_ALL = 'DELETE_ALL',
  UPDATE_FILTER = 'UPDATE_FILTER',
  UPDATE_SORT = 'UPDATE_SORT',
  SET_FORM = 'SET_FORM',
  CLEAR_FORM = 'CLEAR_FORM',
}

export const AppActions = {
  addItem: createActionPayload<ActionAppTypes.ADD_ITEM, IData>(ActionAppTypes.ADD_ITEM),
  addItems: createActionPayload<ActionAppTypes.ADD_ITEMS, IData[]>(ActionAppTypes.ADD_ITEMS),
  editItem: createActionPayload<ActionAppTypes.EDIT_ITEM, IData>(ActionAppTypes.EDIT_ITEM),
  deletItem: createActionPayload<ActionAppTypes.DELETE_ITEM, string>(ActionAppTypes.DELETE_ITEM),
  deleteAllItems: createAction<ActionAppTypes.DELETE_ALL>(ActionAppTypes.DELETE_ALL),
  updateFilter: createActionPayload<ActionAppTypes.UPDATE_FILTER, IField>(ActionAppTypes.UPDATE_FILTER),
  updateSort: createActionPayload<ActionAppTypes.UPDATE_SORT, ISortField>(ActionAppTypes.UPDATE_SORT),
  setForm: createActionPayload<ActionAppTypes.SET_FORM, IForms>(ActionAppTypes.SET_FORM),
  clearForm: createActionPayload<ActionAppTypes.CLEAR_FORM, string>(ActionAppTypes.CLEAR_FORM),
};

export type TAppActions = ActionsUnion<typeof AppActions>;
