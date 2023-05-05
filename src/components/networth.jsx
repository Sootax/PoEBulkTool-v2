/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import calculateNetWorth from 'Functions/calculateNetWorth'
import { BsCurrencyDollar } from 'react-icons/bs'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { IconContext } from 'react-icons'

export default function Networth ({ data, handleClick, isFetching, resetTableData }) {
  const [currencyType, setCurrencyType] = useState('chaos')
  const [networth, setNetworth] = useState(calculateNetWorth(data, 185, 'chaos'))

  const changeCurrencyType = () => {
    switch (currencyType) {
      case 'chaos':
        setCurrencyType('divine')
        setNetworth(calculateNetWorth(data, 185, 'divine'))
        break
      case 'divine':
        setCurrencyType('hybrid')
        setNetworth(calculateNetWorth(data, 185, 'hybrid'))
        break
      case 'hybrid':
        setCurrencyType('chaos')
        setNetworth(calculateNetWorth(data, 185, 'chaos'))
        break
      default:
        break
    }
  }

  useEffect(() => {
    setNetworth(calculateNetWorth(data, 185, currencyType))
  }, [data])

  return (
    <div className='flex flex-row'>
      <div className='text-white flex bg-neutral-800 h-12 rounded-lg m-1 text-lg w-2/6'>
        <div className='flex flex-row rounded-lg items-center'>
          <IconContext.Provider value={{ size: '1.5em' }}>
            <div onClick={changeCurrencyType} className='m-1 bg-neutral-700 rounded-lg p-1 cursor-pointer hover:bg-neutral-600 transition-all'>
              <BsCurrencyDollar />
            </div>
          </IconContext.Provider>
          <div className='text-center font-semibold select-none pl-2 w-full'>
            {networth}
          </div>
        </div>
      </div>
      <button className='flex justify-center items-center bg-neutral-800 m-1 ml-0 text-neutral-600 font-semibold text-lg rounded-lg w-2/6 hover:bg-neutral-700 transition-all hover:text-white select-none' onClick={handleClick}>
        {isFetching
          ? <IconContext.Provider value={{ size: '1.5em', className: 'animate-spin text-white' }}>
              <AiOutlineLoading3Quarters />
            </IconContext.Provider>
          : 'Fetch Stash'
        }
      </button>
      <button className='bg-neutral-800 m-1 ml-0 text-neutral-600 font-semibold text-lg rounded-lg w-2/6 hover:bg-neutral-700 transition-all hover:text-white select-none' onClick={resetTableData}>Reset</button>
    </div>
  )
}
