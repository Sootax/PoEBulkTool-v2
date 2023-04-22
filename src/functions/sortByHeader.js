export default function sortByHeader(header, reverse, tableData) {
  if (!reverse) {
    const tableDataCopy = [...tableData];
    let tableDataSorted = tableDataCopy.sort((a, b) => {
      if (header.target.innerText === 'Name') {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      } else if (header.target.innerText === 'Amount') {
        return parseInt(b.amount) - parseInt(a.amount);
      } else if (header.target.innerText === 'Price') {
        return parseInt(b.price) - parseInt(a.price);
      }
    });
		return [true, tableDataSorted]
  } else if (reverse) {
    const tableDataCopy = [...tableData];
    let tableDataSorted = tableDataCopy.sort((a, b) => {
      if (header.target.innerText === 'Name') {
        if (b.name < a.name) {
          return -1;
        }
        if (b.name > a.name) {
          return 1;
        }
        return 0;
      } else if (header.target.innerText === 'Amount') {
        return parseInt(a.amount) - parseInt(b.amount);
      } else if (header.target.innerText === 'Price') {
        return parseInt(a.price) - parseInt(b.price);
      }
		});
    return [false, tableDataSorted]
  }
};
