export default function getDivinePrice(poeNinjaPrices) {
  for (let item of poeNinjaPrices.lines) {
    if (item.currencyTypeName.includes('Divine Orb')) {
      return Math.floor(item.chaosEquivalent);
    }
  }
}
