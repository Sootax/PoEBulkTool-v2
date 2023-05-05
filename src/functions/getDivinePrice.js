export default function getDivinePrice (poeNinjaPrices) {
  for (const item of poeNinjaPrices.lines) {
    if (item.currencyTypeName.includes('Divine Orb')) {
      return Math.floor(item.chaosEquivalent)
    }
  }
}
