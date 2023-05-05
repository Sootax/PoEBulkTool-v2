/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'

import Table from 'Components/table'
import Networth from 'Components/networth'

export default function BulkSell ({ allTableData, updateData, isFetching }) {
  const dropdownItemsArray = [
    { name: 'Expedition' },
    { name: 'Heist' },
    { name: 'Compasses' }
  ]

  const [activeCategory, setActiveCategory] = useState(dropdownItemsArray[0].name)
  const [data, setData] = useState(allTableData[activeCategory.toLowerCase()])
  const [originalData, setOriginalData] = useState(data)

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
    const updatedData = { ...data }
    const itemIndex = data[newItem.category].findIndex((item) => item.name === newItem.name)
    updatedData[newItem.category][itemIndex] = newItem
    setData(updatedData)
  }

  const handleClick = () => {
    updateData()
  }
  const handleDataUpdate = (updatedData) => {
    setData(updatedData)
  }

  const resetTableData = () => {

  }

  useEffect(() => {
    setData(allTableData[activeCategory.toLowerCase()])
  }, [activeCategory, allTableData])

  return (
    <div className='bg-neutral-700 flex h-full flex-col'>
      <div className='flex h-full w-full gap-2 mb-2'>
        <div className='flex flex-col bg-neutral-900 w-1/2 ml-2 mt-2 rounded-lg border-solid border-neutral-800 shadow-xl border'>
          <Table data={data} activeCategory={activeCategory} handleCategoryChange={handleCategoryChange} handleItemUpdate={handleItemUpdate} handleDataUpdate={handleDataUpdate} key={JSON.stringify(allTableData[activeCategory.toLowerCase()])}/>
          <Networth data={data} handleClick={handleClick} isFetching={isFetching} resetTableData={resetTableData} />
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
