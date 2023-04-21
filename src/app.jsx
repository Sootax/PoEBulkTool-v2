import React from "react";
import ReactDOM from "react-dom/client";

import "./app.css";

import Tabs from "Components/tabs/tabs.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

function App() {
  return <Tabs />;
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
