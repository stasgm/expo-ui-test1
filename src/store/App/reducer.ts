import { Reducer } from 'react';

import { IAppState } from '../../model/types';
import { TAppActions, ActionAppTypes } from './actions';

export const initialState: IAppState = {
  data: [],
  filter: [],
  sort: [{ number: 0, field: 'name', direction: 'ASC' }],
};

export const reducer: Reducer<IAppState, TAppActions> = (state = initialState, action): IAppState => {
  switch (action.type) {
    case ActionAppTypes.ADD_ITEM: {
      return { ...state, data: [...state.data, action.payload] };
    }
    case ActionAppTypes.ADD_ITEMS: {
      return { ...state, data: action.payload };
    }
    case ActionAppTypes.DELETE_ITEM:
      return {
        ...state,
        data: state.data.filter((i) => i.alpha2Code !== action.payload),
      };
    case ActionAppTypes.DELETE_ALL:
      return {
        ...state,
        data: [],
      };
    case ActionAppTypes.UPDATE_FILTER: {
      return { ...state, filter: [...state.filter, action.payload] };
    }
    case ActionAppTypes.UPDATE_SORT: {
      return { ...state, sort: [...state.sort, action.payload] };
    }
    default:
      return state;
  }
};
