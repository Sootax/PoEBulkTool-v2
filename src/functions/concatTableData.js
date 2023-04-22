export default function concatTableData(tableData) {
  let result = [];
  for (let category in tableData) {
    for (let subCategory in tableData[category]) {
      const items = tableData[category][subCategory];
      result = result.concat(items)
    }
  }
  return result;
}
