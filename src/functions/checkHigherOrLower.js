export default function checkHigherOrLower (tableData, newTableData) {
  for (const item of tableData) {
    const index = tableData.findIndex((item) => item.name === newTableData.name)
    if (item.name === newTableData.name) {
      if (item.amount * item.price > newTableData.amount * newTableData.price) {
        console.log(item.amount, item.price, newTableData.amount, newTableData.price, 'red')
        return { index, color: 'flash-red' }
      } else if (item.amount * item.price < newTableData.amount * newTableData.price) {
        console.log(item.amount, item.price, newTableData.amount, newTableData.price, 'green')
        return { index, color: 'flash-green' }
      } else {
        console.log(item.amount, item.price, newTableData.amount, newTableData.price, 'none')
        return { index: 1, color: '' }
      }
    }
  }
}
