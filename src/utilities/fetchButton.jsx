import React from "react";
import "./defaultButton.css";

function FetchButton(props) {
  const update = () => {
    props.onClick();
  };
  return (
    <button className="default-button" onClick={update}>
      Fetch
    </button>
  );
}

export default FetchButton;
