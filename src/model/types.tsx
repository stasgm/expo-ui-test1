import { AppActions } from '../store';

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type ExtraStackParamList = {
  SelectItem: undefined;
};

export type BottomTabParamList = {
  World: undefined;
  TabTwo: undefined;
};

export type WorldParamList = {
  List: { item: IData };
  Settings: undefined;
  Filter: undefined;
  Document: { item: IData };
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
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

export interface IAppState {
  data: IData[];
  settings?: IAppSettings;
  settingsSearch?: string[];
  // formParams?: IFormParams;
  // productParams?: ISellLine;
  // documentParams?: IDocumentParams;
}

export interface IListItem {
  id?: number;
  value?: string;
  [key: string]: unknown;
}
