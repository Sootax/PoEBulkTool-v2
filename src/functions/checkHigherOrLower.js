export default function checkHigherOrLower(tableData, newTableData) {
    for (let item of tableData) {
      const index = tableData.findIndex((item) => item.name === newTableData.name);
      if (item.name === newTableData.name) {
        if (item.amount * item.price > newTableData.amount * newTableData.price) {
          return { index: index, color: "flash-red" };
        } else if (item.amount * item.price < newTableData.amount * newTableData.price) {
          return { index: index, color: "flash-green" };
        } else {
          return { index: 1, color: "" };
        }
      }
    }
  }