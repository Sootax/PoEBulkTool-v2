const Table = require('easy-table')

// Creates the strings to be used on discord.
export default function createDiscordString (
  tableData,
  divinePrice,
  ign,
  currentTab
) {
  let discordStrings = []
  if (currentTab === 'Expedition') {
    const contentString = `**WTS Softcore | Non-Split/Corrupt | :divine: = ${divinePrice}c**`
    discordStrings.push(contentString)
  } else if (currentTab === 'Compasses') {
    const contentString = `**WTS Softcore Compasses | IGN: ${ign} | :divine: = ${divinePrice}c**`
    discordStrings.push(contentString)
  } else if (currentTab === 'Heist') {
    const contentString = `**WTS Softcore | Non-Split/Corrupt | :divine: = ${divinePrice}c**`
    discordStrings.push(contentString)
  }
  const tableStrings = generateTableString(tableData, divinePrice, currentTab)
  const ignString = `\n**IGN: ${ign}**`
  discordStrings = discordStrings.concat(tableStrings)
  discordStrings.push(ignString)
  return discordStrings.join('')
}

function generateTableString (tableData, divinePrice, currentTab) {
  const tableStrings = []
  for (const itemCategory in tableData) {
    const firstItemCategory = Object.keys(tableData)[0]
    if (itemCategory !== 'compasses' && itemCategory !== 'blueprints') {
      const ilvl = tableData[itemCategory][0].ilvl
      const categoryCapitalized =
        itemCategory[0].toUpperCase() + itemCategory.slice(1)
      if (itemCategory !== 'currency' && itemCategory !== 'blueprints') {
        const categoryString = `${
          itemCategory === firstItemCategory ? '\n\n' : '\n'
        }**_${categoryCapitalized}${
          ilvl > 0 ? ' ilvl: ' + ilvl + '+' : ''
        }_**\`\`\``
        tableStrings.push(categoryString)
      } else if (itemCategory === 'currency') {
        const categoryString = `${
          itemCategory === firstItemCategory ? '\n\n' : '\n'
        }**_${currentTab} ${categoryCapitalized}${
          ilvl > 0 ? ' ilvl: ' + ilvl + '+' : ''
        }_**\`\`\``
        tableStrings.push(categoryString)
      }
      const table = new Table()
      for (const item of tableData[itemCategory]) {
        table.cell('Amount', `${item.amount}x`)
        table.cell('Name', item.name)
        table.cell('Price', `${item.price}c`)
        table.cell('All', `${calculateTotal(item, divinePrice)}`)
        table.newRow()
      }
      tableStrings.push(table.toString(), '```')
    } else if (itemCategory === 'compasses') {
      const table = []
      for (const item of tableData[itemCategory]) {
        table.push(
          `\n${item.amount}x ${item.name} ${item.price}c (All: ${calculateTotal(
            item,
            divinePrice
          )})`
        )
      }
      tableStrings.push(table.join(''))
    } else if (itemCategory === 'blueprints') {
      const blueprintWings = generateBlueprintWings(tableData, itemCategory)
      for (const blueprintCategory in blueprintWings) {
        const ilvl = tableData[itemCategory][0].ilvl
        const categoryCapitalized =
          itemCategory[0].toUpperCase() + itemCategory.slice(1)
        const categoryString = `${
          itemCategory === firstItemCategory ? '\n\n' : '\n'
        }**_${categoryCapitalized} ${blueprintCategory}-Wings ${
          ilvl > 0 ? ' ilvl: ' + ilvl + '+' : ''
        }_**\`\`\``
        tableStrings.push(categoryString)
        const table = new Table()
        for (const item of tableData[itemCategory]) {
          table.cell('Amount', `${item.amount}x`)
          table.cell('Name', item.name)
          table.cell('Price', `${item.price}c`)
          table.cell('All', `${calculateTotal(item, divinePrice)}`)
          table.newRow()
        }
        tableStrings.push(table.toString(), '```')
      }
    }
  }
  return tableStrings
}

// Separates the blueprints by wings.
function generateBlueprintWings (tableData, itemCategory) {
  const blueprintWings = {}
  for (const item of tableData[itemCategory]) {
    if (!blueprintWings[item.wings]) {
      blueprintWings[item.wings] = []
    }
    blueprintWings[item.wings].push(item)
  }
  return blueprintWings
}

function calculateTotal (item, divinePrice) {
  if (item.name !== "Rogue's Markers") {
    const chaosTotal = item.amount * item.price
    const divineTotal = chaosTotal / divinePrice
    const divineTotalRemainder = divineTotal % 1
    const chaosRemainder = divineTotalRemainder * divinePrice
    if (divineTotal > 1) {
      return `${Math.floor(divineTotal)}div + ${Math.floor(chaosRemainder)}c`
    } else {
      return `${Math.floor(chaosRemainder)}c`
    }
  } else {
    const chaosTotal = (item.amount / 10000) * item.price
    const divineTotal = chaosTotal / divinePrice
    const divineTotalRemainder = divineTotal % 1
    const chaosRemainder = divineTotalRemainder * divinePrice
    if (divineTotal > 1) {
      return `${Math.floor(divineTotal)}div + ${Math.floor(chaosRemainder)}c`
    } else {
      return `${Math.floor(chaosRemainder)}c`
    }
  }
}
