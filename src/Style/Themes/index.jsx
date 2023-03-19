import dark from "./dark";
import light from "./light";
import contrast from "./contrast";
import common from "./common";
const themes = {
  dark: {
    ...common,
    ...dark,
  },
  light: {
    ...common,
    ...light,
  },
  // contrast: {
  //   ...common,
  //   ...contrast,
  // },
};
export default themes;
