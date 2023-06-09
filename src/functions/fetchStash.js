import fetch, { Headers } from 'node-fetch'
import FormData from 'form-data'
const fs = require('fs')

async function fetchStash ({ sessionId, accountName, leagueName, tabs, tabIndex }) {
  console.log('fetching stash')
  const url = 'https://www.pathofexile.com/character-window/get-stash-items?'
  const headers = new Headers([
    ['User-Agent', 'Oauth GrabMyStash/1.0.0 (contact: 3jeunami82lekw@gmail.com'],
    ['Cookie', `POESESSID=${sessionId}`],
    ['Content-Type', 'multipart/form-data']
  ])

  const params = new URLSearchParams([
    ['league', leagueName],
    ['accountName', accountName],
    ['tabs', tabs],
    ['tabIndex', tabIndex]
  ])

  console.log(tabs, tabIndex)

  const formData = new FormData([['scope', 'account:stashes']])

  const stashItems = await fetch(url + params.toString(), {
    method: 'POST',
    headers,
    body: formData
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Received items from stash.')
      return data
    })
    .catch((error) => {
      console.error(error, 'test')
    })
  return stashItems
}

export default fetchStash
