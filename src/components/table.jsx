/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import TableItem from 'Components/tableItem'
import { AiFillCaretRight, AiFillCaretLeft, AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import { IconContext } from 'react-icons'

export default function Table ({ categoryData, handleItemUpdate, activeCategory, handleCategoryChange, handleDataUpdate }) {
  const columns = [
    { name: 'Name', style: 'w-3/5 justify-start rounded-l-lg' },
    { name: 'Amount', style: 'w-1/5 justify-center' },
    { name: 'Price', style: 'w-1/5 justify-center rounded-r-lg' }
  ]

  const previousItem = () => {
    handleCategoryChange('prev')
  }

  const nextItem = () => {
    handleCategoryChange('next')
  }

  const [sortOrders, setSortOrders] = useState({})

  const sortByHeader = (event, column) => {
    const key = event.target.textContent.toLowerCase()

    if (event.target.textContent === column.name) {
      const newSortOrders = {}

      if (!sortOrders[key]) {
        newSortOrders[key] = 'asc'
      } else if (sortOrders[key] === 'asc') {
        newSortOrders[key] = 'desc'
      } else {
        newSortOrders[key] = 'asc'
      }

      setSortOrders(newSortOrders)
      const newData = {}

      for (const category in categoryData) {
        newData[category] = categoryData[category].slice().sort((a, b) => {
          if (a[key] < b[key]) {
            return sortOrders[key] === 'asc' ? -1 : 1
          }
          if (a[key] > b[key]) {
            return sortOrders[key] === 'asc' ? 1 : -1
          }
          return 0
        })
      }

      handleDataUpdate(newData)
    }
  }

  if (!categoryData) {
    return (
      <div className='bg-neutral-800'></div>
    )
  }

  const tableHeaders = columns.map((column) => {
    const headerKey = column.name.toLowerCase()
    const isAscending = sortOrders[headerKey] === 'asc'
    const isDescending = sortOrders[headerKey] === 'desc'

    return (
      <div key={column.name} className={`${column.style} ${column.name === 'Name' ? 'pl-2' : ''} items-center flex bg-stone-950 font-semibold cursor-pointer`}
        onClick={(event) => sortByHeader(event, column)}
      >
        {column.name}
        {isAscending && (
          <IconContext.Provider value={{ className: 'inline ml-1' }}>
            <AiFillCaretDown />
          </IconContext.Provider>
        )}
        {isDescending && (
          <IconContext.Provider value={{ className: 'inline ml-1' }}>
            <AiFillCaretUp />
          </IconContext.Provider>
        )}
      </div>
    )
  })

  const tableContent = Object.keys(categoryData).map((category) => {
    const categoryName = category[0].toUpperCase() + category.slice(1)
    const categoryItems = categoryData[category].map((item, index) => {
      return (
        <TableItem key={item.name} item={item} columns={columns} index={index} handleItemUpdate={handleItemUpdate} />
      )
    })
    return (
      <div key={category} className='flex flex-col gap-1'>
        <div className='flex bg-stone-950 items-center justify-center rounded-lg h-10'>{categoryName}</div>
        {categoryItems}
      </div>
    )
  })

  return (
    <div className='flex flex-col h-full text-white m-1 select-none'>
      <div className='flex flex-row h-14 bg-neutral-800 rounded-lg gap-6 items-center justify-center'>
        <div className='bg-neutral-700 p-1 rounded-lg text-neutral-500 hover:bg-neutral-600 hover:text-white transition-all cursor-pointer font-semibold' onClick={previousItem}>
          <IconContext.Provider value={{ size: '1.5em' }}>
            <AiFillCaretLeft />
          </IconContext.Provider>
        </div>
        <div className='flex flex-col content-between w-32 text-center font-semibold text-xl'>
          <div className='flex items-center justify-center w-full h-full'>{activeCategory}</div>
          <div className='h-[5px] bg-white rounded-t-lg'></div>
        </div>
        <div className='bg-neutral-700 p-1 rounded-lg text-neutral-500 hover:bg-neutral-600 hover:text-white transition-all cursor-pointer font-semibold' onClick={nextItem}>
          <IconContext.Provider value={{ size: '1.5em' }}>
            <AiFillCaretRight />
          </IconContext.Provider>
        </div>
      </div>
      <div className='flex flex-col flex-1 w-full font-semibold gap-1 mt-1'>
        <div className='flex flex-row w-full h-10 gap-1'>
          {tableHeaders}
        </div>
        <div className='flex flex-col flex-1 w-full gap-2'>
          {tableContent}
        </div>
      </div>
    </div>
  )
}
