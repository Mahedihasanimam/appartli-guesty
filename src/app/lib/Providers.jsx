"use client";


import store from "@/redux/store";
import { Provider } from "react-redux";
import { UserProvider } from "./UserContext";

const Providers = ({ children }) => {
  return (
    <UserProvider>
      <Provider store={store}>
        {children}
    </Provider>
    </UserProvider>
  );
};

export default Providers;