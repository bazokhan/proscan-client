import loadable from "helpers/loadable";

export default {
  home: loadable(import("../pages/home")),
  sessions: loadable(import("../pages/sessions")),
  session: loadable(import("../pages/session")),
  editSession: loadable(import("../pages/session/edit"))
};
