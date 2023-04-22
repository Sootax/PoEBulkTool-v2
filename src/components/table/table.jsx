import React, { useEffect, useState } from 'react';
import sortByHeader from 'Functions/sortByHeader.js';
import './table.css';

// Creates the table for the LeaguePages component.
function Table(props) {
  const [clickedRowData, setClickedRowData] = useState({
    name: '',
    amount: '',
    price: '',
  });

  // get the childNodes of the clicked element and creates a list using their text values.
  const getClickedTableRow = (element) => {
    const siblings = element.target.closest('tr').childNodes;
    setClickedRowData({
      name: siblings[0].innerText,
      amount: siblings[1].innerText,
      price: siblings[2].innerText,
    });
  };

  // Creates the data for the table.
  const tableData = props.data.map((item, index) => {
    return (
      <tr
        key={index}
        onAnimationEnd={props.animationEnd}
        onClick={getClickedTableRow}
        className={
          props.animate.index === index && props.animate.color === "flash-green"
            ? "flash-green"
            : props.animate.index === index && props.animate.color === "flash-red"
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

  // Sets the reverse state for sorting the table
  const [reverse, setReverse] = useState(false);

  // Either sorts the table ascending or descending based on reverse
  const sortByHeader2 = (header) => {
    const [newReverseState, sortedTableData] = sortByHeader(header, reverse, props.data)
    setReverse(newReverseState);
    props.updateTable(sortedTableData);
  };

  // Calls the parent component function to trigger an update.
  useEffect(() => {
    props.onDataReceived(clickedRowData);
  }, [clickedRowData]);

  return (
    <table className="league-table">
      <thead>
        <tr>
          <th className="th-name" onClick={sortByHeader2}>
            Name
          </th>
          <th className="th-amount" onClick={sortByHeader2}>
            Amount
          </th>
          <th className="th-price" onClick={sortByHeader2}>
            Price
          </th>
        </tr>
      </thead>
      <tbody>{tableData}</tbody>
    </table>
  );
}

export default Table;
