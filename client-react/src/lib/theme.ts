import {
  BrandVariants,
  Theme,
  createDarkTheme,
  createLightTheme,
} from "@fluentui/react-components";

const myNewTheme: BrandVariants = {
  10: "#020404",
  20: "#121B1A",
  30: "#1A2D2C",
  40: "#1F3B38",
  50: "#244845",
  60: "#2A5653",
  70: "#2E6560",
  80: "#33746F",
  90: "#38837D",
  100: "#3D928C",
  110: "#42A29B",
  120: "#46B2AA",
  130: "#4BC2BA",
  140: "#60D1C9",
  150: "#8DDDD5",
  160: "#B3E8E3",
};

export const lightTheme: Theme = {
  ...createLightTheme(myNewTheme),
};

export const darkTheme: Theme = {
  ...createDarkTheme(myNewTheme),
};

lightTheme.colorBrandForeground1 = myNewTheme[110];
lightTheme.colorBrandForeground2 = myNewTheme[120];

darkTheme.colorBrandForeground1 = myNewTheme[110];
darkTheme.colorBrandForeground2 = myNewTheme[120];
