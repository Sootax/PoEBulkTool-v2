const fs = require("fs");
import fetch from "node-fetch";

async function fetchTftPrices() {
  const urls = {
    compasses:
      'https://raw.githubusercontent.com/The-Forbidden-Trove/tft-data-prices/master/lsc/bulk-compasses.json',
    expedition:
      'https://raw.githubusercontent.com/The-Forbidden-Trove/tft-data-prices/master/lsc/bulk-expedition.json',
    heist:
      'https://raw.githubusercontent.com/The-Forbidden-Trove/tft-data-prices/master/lsc/bulk-heist.json',
  };

  let data = {}

  for (const [category, url] of Object.entries(urls)) {
    let priceData = await fetch(url, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`Received prices from TFT ${category}`)
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
    data[category] = priceData
  }
  return data
}

export default fetchTftPrices;
