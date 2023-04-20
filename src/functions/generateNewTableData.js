const fs = require('fs');

// Generates a object containing league items with price info.
function generatePriceObject(expeditionPrices, heistPrices, compassPrices) {
  const expeditionPricesObject = generateExpeditionPrices(expeditionPrices);
  const heistPricesObject = generateHeistPrices(heistPrices);
  const compassPricesObject = generateCompassPrices(compassPrices);
  return {
    expedition: expeditionPricesObject,
    heist: heistPricesObject,
    compasses: compassPricesObject,
  };
}

// Generates the expedition data.
function generateExpeditionPrices(expeditionPrices) {
  const expeditionCurrency = [];
  const expeditionLogbooks = [];

  const expeditionLogbookNames = [
    'Black Scythe Mercenaries',
    'Knights of the Sun',
    'Druids of the Broken Circle',
    'Order of the Chalice',
  ];
  const expeditionCurrencyNames = [
    'Astragali',
    'Burial Medallion',
    'Exotic Coinage',
    'Scrap Metal',
  ];

  for (let expeditionItem of expeditionPrices.data) {
    if (expeditionLogbookNames.includes(expeditionItem.name)) {
      expeditionLogbooks.push({
        type: expeditionItem.name,
        price: expeditionItem.chaos,
      });
    } else if (expeditionCurrencyNames.includes(expeditionItem.name)) {
      expeditionCurrency.push({
        type: expeditionItem.name,
        price: expeditionItem.chaos,
      });
    }
  }

  return {
    logbooks: sortByHighestPrice(expeditionLogbooks),
    currency: sortByHighestPrice(expeditionCurrency),
  };
}

// Generates the heist data.
function generateHeistPrices(heistPrices) {
  const heistContracts = [];
  const heistBlueprints = [];
  const heistCurrency = [];

  const heistContractNames = [
    'Deception',
    'Demolition',
    'Perception',
    'Agility',
    'Brute Force',
    'Counter-Thaumaturgy',
    'Engineering',
    'Lockpicking',
    'Trap Disarmament',
  ];
  const heistBlueprintNames = [
    'Enchanted Armaments',
    'Unusual Gems',
    'Replicas or Experimented Items',
    'Trinkets or Currency',
  ];
  const heistCurrencyNames = ["Rogue's Markers"];

  for (let heistItem of heistPrices.data) {
    if (heistContractNames.includes(heistItem.name)) {
      heistContracts.push({ type: heistItem.name, price: heistItem.chaos });
    } else if (heistBlueprintNames.includes(heistItem.name)) {
      heistBlueprints.push({ type: heistItem.name, price: heistItem.chaos });
    } else if (heistCurrencyNames.includes(heistItem.name)) {
      heistCurrency.push({ type: heistItem.name, price: heistItem.chaos });
    }
  }

  return {
    contracts: sortByHighestPrice(heistContracts),
    blueprints: sortByHighestPrice(heistBlueprints),
    currency: sortByHighestPrice(heistCurrency),
  };
}

// Generates the compass data.
function generateCompassPrices(compassPrices) {
  const compassCompasses = [];
  for (let compassItem of compassPrices.data) {
    compassCompasses.push({ type: compassItem.name, price: compassItem.chaos });
  }

  return {
    compasses: sortByHighestPrice(compassCompasses),
  };
}

function sortByHighestPrice(prices) {
  const sortedPrices = prices.sort((a, b) => {
    return parseInt(b.price) - parseInt(a.price);
  });
  return sortedPrices;
}

function sortStashItems(stashData, table) {
  for (let item of stashData.items) {
    if (item.baseType.includes('logbook')) {

    } else if (item.baseType.includes('')) {
    }
  }
};

// const table = generatePriceObject(expeditionPrices, heistPrices, compassPrices);
// sortStashItems(stashData, table)


module.exports = {};
