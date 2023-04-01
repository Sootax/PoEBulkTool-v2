import React, { useEffect, useState } from "react";

import "./table.css";

// Creates the table for the LeaguePages component.
function Table(props) {
  // saves the values of the clicked row
  const [clickedRowData, setClickedRowData] = useState({
    name: "",
    amount: "",
    price: "",
  });

  const animate = props.animate;
  let tableData = props.data;

  // get the childNodes of the clicked element and creates a list using their text values.
  const getClickedTableRow = (element) => {
    const siblings = element.target.closest("tr").childNodes;
    setClickedRowData({
      name: siblings[0].innerText,
      amount: siblings[1].innerText,
      price: siblings[2].innerText,
    });
  };

  // Sets the reverse state for sorting the table
  const [reverse, setReverse] = useState(false);

  // Either sorts the table ascending or descending based on reverse
  const sortByHeader = (header) => {
    if (!reverse) {
      const tableDataCopy = [...tableData];
      let tableDataSorted = tableDataCopy.sort((a, b) => {
        if (header.target.innerText === "Name") {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        } else if (header.target.innerText === "Amount") {
          return parseInt(b.amount) - parseInt(a.amount);
        } else if (header.target.innerText === "Price") {
          return parseInt(b.price) - parseInt(a.price);
        }
      });
      props.updateTable(tableDataSorted);
      setReverse(true);
    } else if (reverse) {
      const tableDataCopy = [...tableData];
      let tableDataSorted = tableDataCopy.sort((a, b) => {
        if (header.target.innerText === "Name") {
          if (b.name < a.name) {
            return -1;
          }
          if (b.name > a.name) {
            return 1;
          }
          return 0;
        } else if (header.target.innerText === "Amount") {
          return parseInt(a.amount) - parseInt(b.amount);
        } else if (header.target.innerText === "Price") {
          return parseInt(a.price) - parseInt(b.price);
        }
      });
      props.updateTable(tableDataSorted);
      setReverse(false);
    }
  };

  // Calls the parent component function to trigger an update.
  useEffect(() => {
    props.onDataReceived(clickedRowData);
  }, [clickedRowData]);

  // Creates table rows for the table using fetched items.
  // Implements animation for flashing the table row either green or red.
  const tableContent = tableData.map((item, index) => {
    return (
      <tr
        key={index}
        onAnimationEnd={props.animationEnd}
        onClick={getClickedTableRow}
        className={
          animate.index === index && animate.color === "flash-green"
            ? "flash-green"
            : animate.index === index && animate.color === "flash-red"
            ? "flash-red"
            : ""
        }
      >
        <td className="td-name">{item.name}</td>
        <td className="td-amount">{item.amount}</td>
        <td className="td-price">{item.price}</td>
      </tr>
    );
  });

  return (
    <table className="league-table">
      <thead>
        <tr>
          <th className="th-name" onClick={sortByHeader}>
            Name
          </th>
          <th className="th-amount" onClick={sortByHeader}>
            Amount
          </th>
          <th className="th-price" onClick={sortByHeader}>
            Price
          </th>
        </tr>
      </thead>
      <tbody>{tableContent}</tbody>
    </table>
  );
}

export default Table;
