export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  World: undefined;
  TabTwo: undefined;
};

export type WorldParamList = {
  List: undefined;
  Settings: undefined;
  Document: { id: number };
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export interface IData {
  name: string;
  region?: string;
  population?: number;
  capital?: string;
  alpha3Code?: string;
  borders?: string[];
}
