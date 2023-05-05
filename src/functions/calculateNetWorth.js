export default function calculateNetWorth (tableData, divinePrice, currencyType) {
  let chaosTotal = 0
  for (const category in tableData) {
    for (const item of tableData[category]) {
      if (item.name !== 'Rogue\'s Markers') {
        chaosTotal += item.amount * item.price
      } else {
        chaosTotal += (item.amount / 10000) * item.price
      }
    }
  }
  const divineTotal = chaosTotal / divinePrice
  if (currencyType === 'chaos') {
    return `${Math.floor(chaosTotal)}c`
  } else if (currencyType === 'divine') {
    return `${divineTotal.toFixed(2)}div`
  } else if (currencyType === 'hybrid') {
    const divineRemainder = divineTotal % 1
    const chaosRemainder = divinePrice * divineRemainder
    return `${Math.floor(divineTotal)}div + ${Math.floor(chaosRemainder)}c`
  }
}
