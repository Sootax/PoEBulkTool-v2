// Gets the lowest ilvl in the table data.
function lowestIlvl(tableData) {
  let ilvl = 100;
  for (let item in tableData) {
		if (item.lowestIlvl < ilvl) {
			ilvl = item.lowestIlvl;
    }
	}
	return ilvl
}

export default lowestIlvl;
