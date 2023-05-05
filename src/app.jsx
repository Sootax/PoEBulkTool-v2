import React, { useState } from 'react'
import Navbar from 'Components/navbar'
import PageContent from 'Components/pageContent'
import './index.css'

export default function App () {
  const [clickedTab, setClickedTab] = useState('Bulk Sell')

  const updateClickedTab = (clickedTab) => {
    setClickedTab(clickedTab)
  }

  return (
    <div className='h-screen w-screen flex flex-col'>
      <Navbar updateClickedTab={updateClickedTab} clickedTab={clickedTab} />
      <PageContent clickedTab={clickedTab} />
    </div>
  )
}
