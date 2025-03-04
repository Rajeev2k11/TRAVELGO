"use client"; // Ensures Redux is only used on the client

import { Provider } from "react-redux";
import store from "./store";

export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}