export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
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
