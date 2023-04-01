import React from "react";
import ReactDOM from "react-dom/client";

import "./app.css";

// import Tabs from "./components/tabs/tabs";

const root = ReactDOM.createRoot(document.getElementById("root"));

function App() {
  return <div>Hello from react!</div>
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
