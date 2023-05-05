/* eslint-disable react/prop-types */
import React from 'react'
import BulkSell from 'Components/bulkSell'
import Settings from 'Components/settings'
import CompassSniper from 'Components/compassSniper'

export default function PageContent ({ clickedTab, updateData }) {
  const definedNavbarItems = [
    { name: 'Bulk Sell', component: () => <BulkSell updateData={updateData} /> },
    { name: 'Compass Sniper', component: () => <CompassSniper /> },
    { name: 'Settings', component: () => <Settings /> }
  ]

  return (
    <>
      {definedNavbarItems.find((item) => item.name === clickedTab).component()}
    </>
  )
}
