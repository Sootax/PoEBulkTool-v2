import React, { useState, useEffect } from 'react'
import Navbar from 'Components/navbar'
import PageContent from 'Components/pageContent'
import './index.css'

export default function App () {
  const [allTableData, setAllTableData] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [clickedTab, setClickedTab] = useState('Bulk Sell')
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    window.api.send('readStash')
    window.api.receive('readStash', (newTableData) => {
      setAllTableData(newTableData)
      setIsLoaded(true)
    })
  }, [])

  const updateClickedTab = (clickedTab) => {
    setClickedTab(clickedTab)
  }

  const updateData = () => {
    setIsFetching(true)
    window.api.send('fetchStash')
    window.api.receive('fetchStash', (newData) => {
      setAllTableData(JSON.parse(JSON.stringify(newData)))
      setIsFetching(false)
    })
  }

  useEffect(() => { console.log(allTableData) }, [allTableData])

  if (!isLoaded) {
    return (
      <div className='bg-neutral-800'></div>
    )
  }

  return (
    <div className='h-screen w-screen flex flex-col'>
      <Navbar updateClickedTab={updateClickedTab} clickedTab={clickedTab} />
      <PageContent clickedTab={clickedTab} allTableData={allTableData} updateData={updateData} isFetching={isFetching} />
    </div>
  )
}
