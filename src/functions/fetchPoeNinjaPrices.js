const fs = require("fs");
import fetch from "node-fetch";

async function fetchPoeNinjaPrices(league) {
  const url = "https://poe.ninja/api/data/CurrencyOverview?";
  const params = new URLSearchParams([
    ["league", league],
    ["type", "Currency"],
    ["language", "en"],
  ]);

  let itemPrices = await fetch(url + params.toString(), {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Received prices from poe.ninja");
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
  return itemPrices;
}

export default fetchPoeNinjaPrices;
