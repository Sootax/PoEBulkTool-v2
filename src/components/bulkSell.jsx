/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'

import Table from 'Components/table'
import Networth from 'Components/networth'

export default function BulkSell () {
  const dropdownItemsArray = [
    { name: 'Expedition' },
    { name: 'Heist' },
    { name: 'Compasses' }
  ]

  const [activeCategory, setActiveCategory] = useState(dropdownItemsArray[0].name)
  const [allData, setAllData] = useState(null)
  const [categoryData, setCategoryData] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    window.api.send('readStash')
    window.api.receive('readStash', (newTableData) => {
      setAllData(newTableData)
      setIsLoaded(true)
    })
  }, [])

  useEffect(() => {
    if (allData) {
      setCategoryData(allData[activeCategory.toLowerCase()])
    }
  }, [activeCategory, allData])

  const updateData = () => {
    setIsFetching(true)
    window.api.send('fetchStash')
    window.api.receive('fetchStash', (newData) => {
      setAllData(JSON.parse(JSON.stringify(newData)))
      setIsFetching(false)
    })
  }

  const handleCategoryChange = (direction) => {
    const currentIndex = dropdownItemsArray.findIndex((item) => item.name === activeCategory)
    let newIndex

    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? dropdownItemsArray.length - 1 : currentIndex - 1
    } else if (direction === 'next') {
      newIndex = (currentIndex + 1) % dropdownItemsArray.length
    }
    setActiveCategory(dropdownItemsArray[newIndex].name)
  }

  const handleItemUpdate = (newItem) => {
    const updatedCategoryData = { ...categoryData }
    const itemIndex = categoryData[newItem.category].findIndex((item) => item.name === newItem.name)
    updatedCategoryData[newItem.category][itemIndex] = newItem
    setCategoryData(updatedCategoryData)
  }

  const handleClick = () => {
    updateData()
  }
  const handleDataUpdate = (updatedCategoryData) => {
    setCategoryData(updatedCategoryData)
  }

  if (!isLoaded) {
    return (
      <div className='bg-neutral-800'></div>
    )
  }

  return (
    <div className='bg-neutral-700 flex h-full flex-col'>
      <div className='flex h-full w-full gap-2 mb-2'>
        <div className='flex flex-col bg-neutral-900 w-1/2 ml-2 mt-2 rounded-lg border-solid border-neutral-800 shadow-xl border'>
          <Table categoryData={categoryData} activeCategory={activeCategory} handleCategoryChange={handleCategoryChange} handleItemUpdate={handleItemUpdate} handleDataUpdate={handleDataUpdate} key={JSON.stringify(allData[activeCategory.toLowerCase()])}/>
          <Networth categoryData={categoryData} handleClick={handleClick} isFetching={isFetching} />
        </div>
        <div className='flex flex-col w-1/2 mr-2 gap-2'>
          <div className='flex bg-neutral-900 w-full h-4/5 mr-2 mt-2 rounded-lg border-solid shadow-black shadow'></div>
          <div className='flex bg-neutral-900 w-full h-1/5 mr-2 rounded-lg border-solid shadow-black shadow'>
          </div>
        </div>
      </div>
    </div>
  )
}
