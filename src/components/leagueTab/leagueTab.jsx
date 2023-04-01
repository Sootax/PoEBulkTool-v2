import React, { useState, useRef, useEffect } from "react";

import Table from "Components/table/table.jsx";
import UpdateButton from "Utilities/UpdateButton.jsx";
import FetchButton from "Utilities/fetchButton.jsx";
import checkHigherOrLower from "Helpers/checkHigherOrLower.js";
import cleanNewData from "Helpers/cleanNewData.js";
import "./leagueTab.css";

function LeagueTab() {
  // Makes a reference of the input element container.
  const inputRef = useRef(null);

  // Temporary Divine Orb price.
  const [divineOrbPrice, setDivineOrbPrice] = useState(195);

  // Temporary table data.
  const [tableData, setTableData] = useState([
    {
      name: "Order of the Chalice",
      amount: "28x",
      price: "25c",
    },
    {
      name: "Black Scythe Mercenaries",
      amount: "38x",
      price: "55c",
    },
    {
      name: "Druids of the Broken Circle",
      amount: "22x",
      price: "35c",
    },
    {
      name: "Knights of the Sun",
      amount: "7x",
      price: "75c",
    },
  ]);

  // Uses the saved values from Table component and fills the inputs with those values.
  const fillInputs = (data) => {
    const childInputs = inputRef.current.childNodes;
    childInputs[0].value = data.name;
    childInputs[1].value = data.amount;
    childInputs[2].value = data.price;
  };

  const animationEnd = () => {
    setAnimate({ index: 1, color: "" });
  };

  // Used in triggering animation for table rows.
  const [animate, setAnimate] = useState({ index: 1, color: "" });

  // Takes the new values from inputs and updates the table row.
  const handleUpdate = () => {
    const childInputs = inputRef.current.childNodes;
    const updatedData = {
      name: childInputs[0].value,
      amount: childInputs[1].value,
      price: childInputs[2].value,
    };
    const index = tableData.findIndex((item) => item.name === updatedData.name);
    const updatedTableData = [...tableData];
    updatedTableData[index] = updatedData;
    setAnimate(checkHigherOrLower(tableData, updatedData));
    setTableData(cleanNewData(updatedTableData));
  };

  // Sets the networth to allow for easy updating.
  const [networth, setNetworth] = useState("Networth: ERROR");

  // Calculates the networth of the table items
  useEffect(() => {
    let chaosTotal = 0;
    let divineTotal = 0.0;
    for (let item of tableData) {
      const itemTotal = parseInt(item.amount) * parseInt(item.price);
      chaosTotal += itemTotal;
    }
    divineTotal = chaosTotal / divineOrbPrice;
    const divineRemainder = divineTotal - Math.floor(divineTotal);
    setNetworth(
      `Networth: ${chaosTotal} (${parseInt(divineTotal)} Divines + ${parseInt(
        divineOrbPrice * divineRemainder
      )} Chaos) Divine Orb: ${divineOrbPrice}c`
    );
  }, []);

  // Selects the text in the clicked input.
  const selectValues = (e) => {
    e.target.select();
  };

  // Updates the table with the new table data.
  const updateTable = (newTableData) => {
    setTableData(newTableData);
  };

  // Submits the input values when pressing enter on the keyboard.
  const submitOnEnter = (e) => {
    if (e.which === 13) {
      handleUpdate();
    }
  };

  const readConfig = () => {
    window.api.send('fetchStash')
    console.log('fetching stash')
  };

  return (
    <div className="tab-content">
      <div className="top-container">
        <div className="left-container">
          <Table
            onDataReceived={fillInputs}
            data={tableData}
            animate={animate}
            animationEnd={animationEnd}
            updateTable={updateTable}
          />
          <div id="input-container" ref={inputRef}>
            <input id="input-name" placeholder="Name" disabled />
            <input
              id="input-amount"
              placeholder="Amount"
              onClick={selectValues}
              onKeyPress={submitOnEnter}
            />
            <input
              id="input-price"
              placeholder="Price"
              onClick={selectValues}
              onKeyPress={submitOnEnter}
            />
          </div>
          <div className="button-container">
            <UpdateButton onUpdate={handleUpdate} />
            <FetchButton onClick={readConfig} />
          </div>
        </div>
        <div className="right-container">Right Container</div>
      </div>
      <div className="bottom-container">
        <div className="bottom-info-bar">{networth}</div>
      </div>
    </div>
  );
}

export default LeagueTab;
