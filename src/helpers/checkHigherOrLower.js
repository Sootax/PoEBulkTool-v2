function checkHigherOrLower(tableData, newTableData) {
  for (let item of tableData) {
    const index = tableData.findIndex(
      (item) => item.name === newTableData.name
    );
    if (item.name === newTableData.name) {
      const oldAmount = parseInt(item.amount.replace(/\D/g, ""));
      const oldPrice = parseInt(item.price.replace(/\D/g, ""));
      const newAmount = parseInt(newTableData.amount.replace(/\D/g, ""));
      const newPrice = parseInt(newTableData.price.replace(/\D/g, ""));
      if (oldAmount * oldPrice > newAmount * newPrice) {
        return { index: index, color: "flash-red" };
      } else if (oldAmount * oldPrice < newAmount * newPrice) {
        return { index: index, color: "flash-green" };
      } else {
        return { index: 1, color: "" };
      }
    }
  }
}

export default checkHigherOrLower;
