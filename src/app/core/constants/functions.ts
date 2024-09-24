import { FunctionToggleModel } from "../models/function-toggle/function-toggle.model";

export const list: FunctionToggleModel[] = [];


export  function reset() {
  list.forEach((f) => (f.selected = false));
}
