/* eslint-disable react/prop-types */
import React from 'react'

export default function Button ({ width, text, handleClick, extra }) {
  return (
    <button className={`flex bg-neutral-800 text-neutral-500 font-semibold text-lg justify-center items-center p-2 rounded-lg ${width} ${extra} hover:text-white hover:bg-neutral-600 transition-all`} onClick={() => handleClick()}>{text}</button>
  )
}
