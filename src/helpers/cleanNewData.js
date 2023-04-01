function cleanNewData(newData) {
  for (let item of newData) {
    if (!item.amount.includes("x")) {
      item.amount += "x";
    }
    if (!item.price.includes("c")) {
      item.price += "c";
    }
  }
  return newData;
}

export default cleanNewData;
