import loadable from "helpers/loadable";

export default {
  details: loadable(import("./details")),
  edit: loadable(import("./edit")),
  preview: loadable(import("./preview")),
  start: loadable(import("./start"))
};
