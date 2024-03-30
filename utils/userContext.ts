import { createContext } from "react";

const UserContext = createContext({
  loggedIn: false,
  setLoggedIn: (val: boolean) => {},
});

export default UserContext;
