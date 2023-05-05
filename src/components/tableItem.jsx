/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'

export default function TableItem ({ item, columns, handleItemUpdate, index }) {
  const [editingIndex, setEditingIndex] = useState(-1)

  const [name, setName] = useState(item.name)
  const [amount, setAmount] = useState(item.amount)
  const [price, setPrice] = useState(item.price)
  const [isChanged, setIsChanged] = useState(false)

  const handleEditClick = (index) => {
    setEditingIndex(index)
  }

  useEffect(() => {
    if (editingIndex === -1 && isChanged) {
      handleItemUpdate({ name, amount, price, category: item.category })
      setIsChanged(false)
    }
  }, [name, amount, price, editingIndex, handleItemUpdate, isChanged])

  useEffect(() => {
    setName(item.name)
    setAmount(item.amount)
    setPrice(item.price)
  }, [item])

  const handleBlur = (index, value) => {
    if (index === 0 && value.length > 0) {
      setName(value)
    } else if (index === 1 && !isNaN(value) && value >= 0) {
      setAmount(value)
    } else if (index === 2 && !isNaN(value) && value >= 0) {
      setPrice(value)
    }
    setEditingIndex(-1)
    setIsChanged(true)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.target.blur()
    }
  }

  return (
    <div className='flex flex-row h-10 w-full gap-1'>
  {columns.map((column, i) => (
    <div key={i} className={`gap-1 ${column.style} pl-0`}>
      {editingIndex === i
        ? (
        <input
          type='text'
          defaultValue={i === 0 ? name : i === 1 ? amount : price}
          spellCheck='false'
          className={`bg-neutral-600 bg-opacity-60 hover:text-white flex w-full h-10 ${
            i === 0 ? 'text-left pl-2' : 'text-center'
          } ${i === 0 ? 'rounded-l-lg' : i === 2 ? 'rounded-r-lg' : ''} outline-none`}
          onFocus={(element) => element.target.select()}
          onBlur={(e) => handleBlur(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
          autoFocus
        />
          )
        : (
        <div
          onClick={() => i !== 0 && handleEditClick(i)}
          className={`hover:bg-neutral-600 hover:bg-opacity-60 transition-all hover:text-white flex h-10 ${index % 2 === 0 ? 'even-row' : 'odd-row'} items-center ${
            i === 0 ? 'justify-start pl-2' : 'justify-center'
          } ${i === 0 ? 'rounded-l-lg' : i === 2 ? 'rounded-r-lg cursor-pointer' : 'cursor-pointer'}`}
        >
          {i === 0 ? name : i === 1 ? amount : price}
        </div>
          )}
    </div>
  ))}
</div>
  )
}
