const Table = require('easy-table')

export default function createDiscordString(tableData, divinePrice, ign) {
  let categories = {};
  for (let item of tableData) {
    const category = item.category
    if (!categories.category) {
      categories[category] = []
    }
  }
  for (let item of tableData) {
    if (!categories[item.category].includes(item)) {
      categories[item.category].push(item)
    }
  }
  const itemStrings = [`**WTS Logbooks | Non-Split/Corrupt | IGN: ${ign} | :divine: = ${divinePrice}c**\n`]
  for (let category in categories) {
    const categoryCapitalized = category[0].toUpperCase() + category.slice(1)
    // itemStrings.push(`**${categoryCapitalized} ilvl: ${categories[category][0].ilvl}+**\`\`\``)
    itemStrings.push(`**__${categoryCapitalized} ${categories[category][0].ilvl > 0 ? 'ilvl: '+ categories[category][0].ilvl + '+'  : ''}__**\`\`\`fix`)
    const table = new Table
    for (let item of categories[category]) {
      table.cell('Amount', `${item.amount}x`)
      table.cell('Name', item.name)
      table.cell('Price', `${item.price}c /ea`)
      table.newRow()
    }
    table.sort(['Price|des'])
    itemStrings.push(table.toString(), '```')
  }
  return itemStrings
}
