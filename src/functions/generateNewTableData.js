import itemCategories from 'Json/itemCategories.json'
import compassNames from 'Json/compassNameChange.json';

function filterStash(stashData, tftPrices) {
  const finalItemArray = getItemCategoryDetails(stashData, tftPrices)
  return finalItemArray
}

function getItemCategoryDetails(stashData, tftPrices) {
  let expeditionLogbooks = [];
  let expeditionCurrency = [];
  let heistContracts = [];
  let heistBlueprints = [];
  let heistCurrency = [];
  let compassesCompasses = [];
  for (let item of stashData.items) {
    if (item.baseType.includes("Compass")) {
      if (verifyUses(item)) {
        const itemName = changeCompassName(item);
        const itemIlvl = item.ilvl;
        const itemPrice = getItemPrice(tftPrices, itemName);
        compassesCompasses.push({ name: itemName, ilvl: itemIlvl, price: itemPrice });
      }
    } else if (item.baseType.includes("Logbook")) {
      const itemName = getBestFaction(item, tftPrices);
      const itemIlvl = item.ilvl;
      const itemPrice = getItemPrice(tftPrices, itemName);
      console.log(`---Item Details---\nName: ${itemName}\nPrice: ${itemPrice}\nIlvl: ${itemIlvl}\n`);
      expeditionLogbooks.push({ name: itemName, ilvl: itemIlvl, price: itemPrice });
    } else if (item.baseType.includes("Contract")) {
      const itemName = getContractName(item);
      const itemIlvl = item.ilvl;
      const itemPrice = getItemPrice(tftPrices, itemName);
      console.log(`---Item Details---\nName: ${itemName}\nPrice: ${itemPrice}\nIlvl: ${itemIlvl}\n`);
      heistContracts.push({ name: itemName, ilvl: itemIlvl, price: itemPrice });
    } else if (item.baseType.includes("Blueprint")) {
      if (verifyWingsNotRevealed(item)) {
        const itemName = changeBlueprintName(item, tftPrices);
        const itemIlvl = item.ilvl;
        const itemPrice = getItemPrice(tftPrices, itemName);
        console.log(`---Item Details---\nName: ${itemName}\nPrice: ${itemPrice}\nIlvl: ${itemIlvl}\n`);
        heistBlueprints.push({ name: itemName, ilvl: itemIlvl, price: itemPrice });
      }
    } else if (itemCategories.expedition.currency.includes(item.baseType)) {
      const itemName = item.baseType;
      const itemIlvl = item.ilvl;
      const itemPrice = getItemPrice(tftPrices, itemName);
      const itemStackSize = getCurrencyStackSize(item)
      console.log(`---Item Details---\nName: ${itemName}\nPrice: ${itemPrice}\nIlvl: ${itemIlvl}\n`);
      expeditionCurrency.push({ name: itemName, ilvl: itemIlvl, price: itemPrice, stackSize: itemStackSize});
    } else if (itemCategories.heist.currency.includes(item.baseType)) {
      const itemName = `${item.baseType}s`;
      const itemIlvl = item.ilvl;
      const itemPrice = getItemPrice(tftPrices, itemName);
      const itemStackSize = getCurrencyStackSize(item)
      console.log(`---Item Details---\nName: ${itemName}\nPrice: ${itemPrice}\nIlvl: ${itemIlvl}\n`);
      heistCurrency.push({ name: itemName, ilvl: itemIlvl, price: itemPrice, stackSize: itemStackSize});
    }
  }
  return {
    heist: {
      contracts: getItemAmount(heistContracts),
      blueprints: getItemAmount(heistBlueprints),
      currency: getItemAmountCurrency(heistCurrency)
    },
    expedition: {
      logbooks: getItemAmount(expeditionLogbooks),
      currency: getItemAmountCurrency(expeditionCurrency)
    },
    compasses: {
      compasses: getItemAmount(compassesCompasses) 
    }
  }
}

// Gets the lowest ilvl of the itemArray.
function getLowestIlvl(itemArray) {
  return itemArray.reduce((prev, curr) => prev.ilvl < curr.ilvl ? prev : curr).ilvl
};

// Merges the itemArray to contain no duplicates while getting the amount and lowest ilvl for currency.
function getItemAmountCurrency(itemArray) {
  let reducedItemArray = itemArray.reduce((accumulator, current) => {
    const matchingItem = accumulator.find((item) => item.name === current.name)
    if (!matchingItem) {
      current.ilvl = getLowestIlvl(itemArray)
      current.amount = current.stackSize || 1
      accumulator.push(current)
    } else {
      matchingItem.amount += current.stackSize || 1
    }
    return accumulator
  }, []);
  reducedItemArray = reducedItemArray.map(({ stackSize, ...rest }) => rest);
  return reducedItemArray
}


// Merges the itemArray to contain no duplicates while getting the amount and lowest ilvl.
function getItemAmount(itemArray) {
  const reducedItemArray = itemArray.reduce((accumulator, current) => {
    const matchingItem = accumulator.find((item) => item.name === current.name)
    if (!matchingItem) {
      current.ilvl = getLowestIlvl(itemArray)
      current.amount = 1
      accumulator.push(current)
    } else {
      matchingItem.amount += 1
    }
    return accumulator
  }, []);
  return reducedItemArray
};

// Gest the currency amount.
function getCurrencyStackSize(item) {
  return parseInt(item.properties[0].values[0][0].match(/\d*/)[0])
}

// Changes the blueprint name based on TFT naming scheme.
function changeBlueprintName(item, tftPrices) {
  for (let category in tftPrices) {
    for (let tftItem of tftPrices[category].data) {
      if (item.properties[0].values[0][0].includes(tftItem.name)) {
        return tftItem.name;
      }
    }
  }
}

// Gets the contract name.
function getContractName(item) {
  return item.properties[3].values[1][0];
}

// Gets the item price.
function getItemPrice(tftPrices, itemName) {
  for (let category in tftPrices) {
    for (let tftItem of tftPrices[category].data) {
      if (itemName === tftItem.name) {
        return tftItem.chaos
      }
    }
  }
}

// Finds the best faction in the pool of mods based on price.
function getBestFaction(item, tftPrices) {
  const bestFaction = item.logbookMods.reduce(
    (accumulator, logbookMod) => {
      const tftFactionMatch = tftPrices.expedition.data.find(
        (tftFaction) => tftFaction.name === logbookMod.faction.name
      );
      if (tftFactionMatch.chaos > accumulator.price) {
        return { name: logbookMod.faction.name, price: tftFactionMatch.chaos };
      }
      return accumulator;
    },
    { name: "", price: 0 }
  ).name;
  return bestFaction;
}

// Changes the compass name to fit TFT naming schema.
function changeCompassName(item) {
  for (let compassName in compassNames) {
    if (item.enchantMods.includes(compassNames[compassName])) {
      return compassName;
    }
  }
}

// Verifies that the blueprint is not fully revealed.
function verifyWingsNotRevealed(item) {
  const wingsRevealed = item.properties[2].values[0][0].match(/\d/)[0];
  const maxWingsRevealed = item.properties[2].values[0][0].match(/\d/)[1];
  if (wingsRevealed !== maxWingsRevealed) {
    return true;
  }
}

// Verifies that the compass is 4 uses.
function verifyUses(item) {
  if (item.enchantMods.includes("4 uses remaining")) {
    return true;
  }
}

export default filterStash;
