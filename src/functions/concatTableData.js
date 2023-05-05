export default function concatTableData (tableData) {
  let result = []
  for (const category in tableData) {
    for (const subCategory in tableData[category]) {
      const items = tableData[category][subCategory]
      result = result.concat(items)
    }
  }
  return result
}
