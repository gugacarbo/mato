import dark from "./dark";
import light from "./light";
import common from "./common";
const themes =  {
  dark: {
    ...common,
    ...dark,
  },
  light: {
    ...common,
    ...light,
    ...dark,
  },
};
export default themes;
