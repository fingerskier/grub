import {useEffect, useState } from 'react'
import DayEdit from './com/DayEdit'
import DayList from './com/DayList'
import WeekStats from './com/WeekStats'

import './style/App.css'

const today = new Date()


export default function App() {
  const [selDate, setSelDate] = useState()
  const [selWeek, setSelWeek] = useState()
  const [testDate, setTestDate] = useState()
  const [userDate, setUserDate] = useState()
  
  
  const selectDate = event=>{
    console.log('up-date', new Date(event.target.value + 'T00:00:00'))
    setTestDate(new Date(event.target.value + 'T00:00:00'))
  }
  
  
  useEffect(() => {
    if (userDate) {
      setTestDate(new Date(userDate + 'T00:00:00'))
      setSelDate(new Date(userDate + 'T00:00:00'))
    }
  }, [userDate])
  
  
  return <>
    <h1>grub</h1>
    
    <input
      onChange={E=>setUserDate(E.target.value)}
      type="date"
      value={userDate}
    />
    
    <button
      onClick={E=>setUserDate((new Date()).toISOString().slice(0, 10))}
    >today</button>
    
    <DayList
      adjacentDate={testDate}
      setSelDate={setSelDate}
      setSelWeek={setSelWeek}
    />
    
    <DayEdit date={selDate} />
    
    <WeekStats week={selWeek} />
  </>
}