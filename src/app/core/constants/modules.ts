import { ModuleToggleModel } from "../models/module-toggle/module-toggle.model";

export const list: ModuleToggleModel[] = [];

export  function reset() {
  list.forEach((m) => (m.selected = false));
}
