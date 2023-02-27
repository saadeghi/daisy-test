import type { Component } from "solid-js";

import { ToastProvider } from "../components/toast/toast";
import TextInput from "../components/inputs/text";
import Input from "../components/inputs/input";

const App: Component = () => {
  return (
    <div>
      <Input />
    </div>
  );
};

export default App;
