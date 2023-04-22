import React, { useState, useRef, useEffect } from 'react';

import Table from 'Components/table/table.jsx';
import UpdateButton from 'Utilities/UpdateButton.jsx';
import FetchButton from 'Utilities/fetchButton.jsx';
import finalItemArray from 'Json/finalItemArray.json';
import calculateNetWorth from 'Functions/calculateNetWorth.js'
import concatTableData from 'Functions/concatTableData.js';
import checkHigherOrLower from 'Functions/checkHigherOrLower.js';
import './leagueTab.css';

function LeagueTab(props) {
  // Temporary Divine Orb price.
  const [divinePrice, setDivinePrice] = useState(180);
  const [tableData, setTableData] = useState(concatTableData(finalItemArray[props.activeTab.toLowerCase()]))
  const [networth, setNetworth] = useState(calculateNetWorth(finalItemArray, divinePrice))
  
  // Makes a reference of the input element container.
  const inputRef = useRef(null);

  // Fetches the stash
  const fetchStash = () => {
    const currentTab = props.activeTab;
    window.api.send('fetchStash', currentTab);
    window.api.receive('fetchStash', (itemArray) => {
      setTableData(itemArray[props.activeTab.toLowerCase()]);
    });
  };

  // Uses the saved values from Table component and fills the inputs with those values.
  const fillInputs = (data) => {
    const childInputs = inputRef.current.childNodes;
    childInputs[0].value = data.name;
    childInputs[1].value = data.amount;
    childInputs[2].value = data.price;
  };

  // Removes the animation when it ends.
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
    if (index >= 0) {
      const updatedTableData = [...tableData];
      updatedTableData[index] = updatedData;
      setAnimate(checkHigherOrLower(tableData, updatedData));
      setTableData(updatedTableData);
    }
  };

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

  return (
    <div className="tab-content">
      <div className="top-container">
        <div className="left-container">
          <Table
            data={tableData}
            onDataReceived={fillInputs}
            animate={animate}
            updateTable={updateTable}
          />
          <div id="input-container" ref={inputRef}>
            <input id="input-name" placeholder="Name" disabled />
            <input id="input-amount" placeholder="Amount" onClick={selectValues} onKeyPress={submitOnEnter} />
            <input id="input-price" placeholder="Price" onClick={selectValues} onKeyPress={submitOnEnter} />
          </div>
          <div className="button-container">
            <UpdateButton onUpdate={handleUpdate} />
            <FetchButton onClick={fetchStash} />
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
