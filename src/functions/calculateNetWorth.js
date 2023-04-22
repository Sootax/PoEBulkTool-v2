export default function calculateNetWorth(tableData, divinePrice) {
    let chaosTotal = 0;
    for (let league in tableData) {
        for (let category in tableData[league]) {
            for (let item of tableData[league][category])
                if (item.name !== 'Rogue\'s Markers') {
                    chaosTotal += item.price * item.amount
                } else {
                    chaosTotal  += (item.amount / 10000) * item.price
                }
        }
    }
    const divineTotal = chaosTotal / divinePrice
    const divineRemaining = divineTotal % 1
    const chaosRemaining = divineRemaining * divinePrice
    const netWorthString = `Networth: ${Math.floor(chaosTotal)}c (${Math.floor(divineTotal)}div + ${Math.floor(chaosRemaining)}c)`
    return netWorthString
};