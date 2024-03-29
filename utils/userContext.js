import { createContext } from "react";

const UserContext = createContext({
  loggedIn: false,
  setLoggedIn: function () {},
});

export default UserContext;
