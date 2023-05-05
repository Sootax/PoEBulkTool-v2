import React, { createRef, useEffect, useRef, useState } from 'react'

export default function Settings () {
  const [inputRefs, setInputRefs] = useState({})
  const [config, setConfig] = useState([])
  const settingsContainer = useRef('inputContainer')
  const inputValues = [
    { name: 'Account Name:', type: 'text', ref: 'accountName' },
    { name: 'Character Name:', type: 'text', ref: 'characterName' },
    { name: 'PoE Session ID:', type: 'password', ref: 'sessionId' },
    { name: 'League Name:', type: 'text', ref: 'leagueName' },
    { name: 'Expedition Tab: ', type: 'text', ref: 'expeditionTab' },
    { name: 'Compasses Tab: ', type: 'text', ref: 'compassesTab' },
    { name: 'Heist Tab: ', type: 'text', ref: 'heistTab' }
  ]

  useEffect(() => {
    setInputRefs(
      inputValues.reduce((accumulator, current) => {
        accumulator[current.ref] = createRef()
        return accumulator
      }, {})
    )
  }, [])

  useEffect(() => {
    readConfig()
  }, [])

  const readConfig = () => {
    window.api.send('getConfig', 'renderer')
    window.api.receive('getConfig', (newConfig) => {
      setConfig(newConfig)
    })
  }

  const generateNewConfig = () => {
    const newConfig = {
      renderer: {
        accountName: inputRefs.accountName.current.value,
        characterName: inputRefs.characterName.current.value,
        sessionId: inputRefs.sessionId.current.value,
        leagueName: inputRefs.leagueName.current.value,
        expeditionTab: inputRefs.expeditionTab.current.value,
        compassesTab: inputRefs.compassesTab.current.value,
        heistTab: inputRefs.heistTab.current.value
      }
    }
    writeConfig(newConfig)
  }

  const writeConfig = (newConfig) => {
    window.api.send('setConfig', newConfig)
  }

  const settingOptionItems = inputValues.map((item, key) => {
    const configKeys = Object.keys(config)
    const index = inputValues.indexOf(item)
    return (
      <div key={key} className='flex flex-row'>
        <label className='w-32 font-semibold'>{item.name}</label>
        <input spellCheck='false' type={item.type} className='h-8 text-black p-2 outline-none rounded-md pb-3' defaultValue={config[configKeys[index]]} ref={inputRefs[item.ref]} />
      </div>
    )
  })

  return (
    <div className='bg-stone-900 flex h-full w-full flex-col place-items-center justify-center'>
      <div className='flex w-fit bg-stone-800 h-3/5 m-2 rounded-lg border-neutral-800 shadow-xl border text-white gap-6 flex-col p-8 place-items-center' ref={settingsContainer}>
        {settingOptionItems}
        <button className='bg-stone-700 w-1/2 rounded-lg h-10 hover:bg-stone-600 transition-all border-neutral-800 shadow-xl border font-semibold mt-10' onClick={generateNewConfig}>Save</button>
      </div>
    </div>
  )
}
