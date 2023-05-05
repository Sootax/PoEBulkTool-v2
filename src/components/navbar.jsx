/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'

export default function Navbar ({ updateClickedTab, clickedTab }) {
  const definedNavbarItems = [
    'Bulk Sell',
    'Compass Sniper'
  ]

  const getClickedTab = (element) => {
    updateClickedTab(element.target.innerText)
  }

  const navbarItems = definedNavbarItems.map((tab, index) => {
    return (
      <div onClick={getClickedTab} className={`flex flex-col h-full pt-2 pl-2 pr-2 group cursor-pointer ${tab === clickedTab ? 'text-white' : 'text-stone-600'} transition-all`} key={index}>
        <div className='group-hover:text-white transition-all'>{tab}</div>
        <div className={`h-[5px] w-[105%] ${tab === clickedTab ? 'bg-white' : 'bg-neutral-600'} group-hover:bg-white rounded-t-xl transition-all`}></div>
      </div>
    )
  })

  return (
    <div className='flex bg-neutral-900 text-xl select-none'>
      <ul className='flex font-semibold space-x-2'>{navbarItems}</ul>
    </div>
  )
}
