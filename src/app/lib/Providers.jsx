"use client";


import store from "@/redux/store";
import { Provider } from "react-redux";
import { UserProvider } from "./UserContext";

const Providers = ({ children }) => {
  return (
      <Provider store={store}>
    <UserProvider>
        {children}
    </UserProvider>
    </Provider>
  );
};

export default Providers;