import React from "react";

import "./defaultButton.css";

function UpdateButton(props) {
  const update = () => {
    props.onUpdate();
  };

  return (
    <button className="default-button" onClick={update}>
      Update
    </button>
  );
}

export default UpdateButton;
