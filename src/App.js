import React from "react";
import "./App.css";
import Bugs from "./component/Bugs";
import configureStore from "./store/configStore";
import { Provider } from "react-redux";
import BugsHook from "./component/BugsHook";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <BugsHook />
    </Provider>
  );
}

export default App;
