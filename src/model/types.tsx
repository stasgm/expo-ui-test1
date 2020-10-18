import { AppActions } from '../store';

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type ExtraStackParamList = {
  SelectItem: { name: string };
};

export type BottomTabParamList = {
  World: undefined;
  TabTwo: undefined;
};

export type WorldParamList = {
  List: { item: IData };
  Settings: undefined;
  Filter: undefined;
  Document: { id: number };
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
  BarcodeScreen: undefined;
};

export interface IData {
  name: string;
  region?: string;
  population?: number;
  capital?: string;
  alpha3Code: string;
  alpha2Code: string;
  borders?: string[];
  flag?: string;
}

export interface IAppContextProps {
  state: IAppState;
  actions: typeof AppActions;
}

export interface IDataFetch {
  isLoading: boolean;
  isError: boolean;
  status?: string;
}

export interface IAppSettings {
  synchronization?: boolean;
  dakrTheme?: boolean;
}

export interface IForm {
  [name: string]: any;
}

export interface IForms {
  [name: string]: IForm;
}

export interface IAppState {
  data: IData[];
  filter: IField[];
  sort: ISortField[];
  settings?: IAppSettings;
  settingsSearch?: string[];
  forms: IForms;
}

export interface IListItem {
  id?: number;
  value?: string;
  [key: string]: unknown;
}

export interface IField {
  name: string;
  value: string;
}

export interface ISortField {
  number?: number;
  field: keyof IData;
  direction: 'ASC' | 'DESC';
}
