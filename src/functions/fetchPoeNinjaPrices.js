const fs = require("fs");
import fetch from "node-fetch";

async function fetchPoeNinjaPrices(league) {
  const url = 'https://poe.ninja/api/data/CurrencyOverview?';
  const params = new URLSearchParams([
    ['league', league],
    ['type', 'Currency'],
    ['language', 'en'],
  ]);

  let itemPrices = await fetch(url + params.toString(), {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => {
      const jsonData = JSON.stringify(data, null, 4);
      fs.writeFileSync("./poePrices.json", jsonData, "utf-8");
      return jsonData
    })
    .catch((error) => {
      console.error(error);
    });
  return itemPrices
}

export default fetchPoeNinjaPrices;
