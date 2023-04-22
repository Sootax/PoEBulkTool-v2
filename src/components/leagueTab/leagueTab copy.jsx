import React, { useState, useRef, useEffect } from "react";

import Table from "Components/table/table.jsx";
import UpdateButton from "Utilities/UpdateButton.jsx";
import FetchButton from "Utilities/fetchButton.jsx";
import checkHigherOrLower from "Helpers/checkHigherOrLower.js";
import cleanNewData from "Helpers/cleanNewData.js";
import "./leagueTab.css";

function LeagueTab(params) {
  // Makes a reference of the input element container.
  const inputRef = useRef(null);

  // Temporary Divine Orb price.
  const [divineOrbPrice, setDivineOrbPrice] = useState(195);

  // Temporary table data.
  const [tableData, setTableData] = useState({
    "heist": {
        "contracts": [
            {
                "name": "Trap Disarmament",
                "ilvl": 82,
                "price": 1,
                "amount": 2
            },
            {
                "name": "Agility",
                "ilvl": 82,
                "price": 1,
                "amount": 2
            },
            {
                "name": "Perception",
                "ilvl": 82,
                "price": 3,
                "amount": 4
            },
            {
                "name": "Deception",
                "ilvl": 82,
                "price": 9,
                "amount": 2
            },
            {
                "name": "Lockpicking",
                "ilvl": 82,
                "price": 2,
                "amount": 2
            },
            {
                "name": "Demolition",
                "ilvl": 82,
                "price": 1,
                "amount": 3
            },
            {
                "name": "Engineering",
                "ilvl": 82,
                "price": 1,
                "amount": 2
            },
            {
                "name": "Brute Force",
                "ilvl": 82,
                "price": 1,
                "amount": 1
            }
        ],
        "blueprints": [
            {
                "name": "Trinkets or Currency",
                "ilvl": 83,
                "price": 5,
                "amount": 1
            },
            {
                "name": "Replicas or Experimented Items",
                "ilvl": 83,
                "price": 15,
                "amount": 1
            }
        ],
        "currency": [
            {
                "name": "Rogue's Markers",
                "ilvl": 0,
                "price": 31,
                "amount": 142130
            }
        ]
    },
    "expedition": {
        "logbooks": [
            {
                "name": "Order of the Chalice",
                "ilvl": 83,
                "price": 15,
                "amount": 9
            },
            {
                "name": "Druids of the Broken Circle",
                "ilvl": 83,
                "price": 10,
                "amount": 10
            }
        ],
        "currency": [
            {
                "name": "Scrap Metal",
                "ilvl": 0,
                "price": 1,
                "amount": 182
            },
            {
                "name": "Astragali",
                "ilvl": 0,
                "price": 1,
                "amount": 21
            }
        ]
    },
    "compasses": {
        "compasses": [
            {
                "name": "Unidentified Map",
                "ilvl": 20,
                "price": 4,
                "amount": 1
            },
            {
                "name": "Blue Plants",
                "ilvl": 20,
                "price": 50,
                "amount": 1
            },
            {
                "name": "Magic Pack Size",
                "ilvl": 20,
                "price": 5,
                "amount": 2
            }
        ]
    }
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
      setTableData(cleanNewData(updatedTableData));
    }
  };

  // Sets the networth to allow for easy updating.
  const [networth, setNetworth] = useState("Networth: ERROR");

  // Calculates the networth of the table items.
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
  }, [tableData]);

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
  const tab = params.activeTab

  // Fetches the stash
  const fetchStash = () => {
    const currentTab = params.activeTab;
    window.api.send("fetchStash", currentTab);
    window.api.receive('fetchStash', itemArray => {
      setTableData(itemArray[params.activeTab.toLowerCase()])
    })
  };

  return (
    <div className="tab-content">
      <div className="top-container">
        <div className="left-container">
          <Table
            data={tableData}
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
