import {useEffect, useState} from 'react'


export default function DayList({
  adjacentDate,
  setSelDate,
  setSelWeek,
}) {
  const [dayDate, setDayDate] = useState([])
  
  
  useEffect(() => {
    if (!adjacentDate) return
    
    // calculate the dates of the current week
    const today = adjacentDate
    const day = today.getDay()
    const diff = today.getDate() - day// + (day == 0 ? -6 : 1)
    
    const newDate = []
    
    newDate[0] = new Date(today.setDate(diff + 0))
    newDate[1] = new Date(today.setDate(diff + 1))
    newDate[2] = new Date(today.setDate(diff + 2))
    newDate[3] = new Date(today.setDate(diff + 3))
    newDate[4] = new Date(today.setDate(diff + 4))
    newDate[5] = new Date(today.setDate(diff + 5))
    newDate[6] = new Date(today.setDate(diff + 6))
    
    setDayDate(newDate)
    setSelWeek(newDate)
  }, [adjacentDate])
  
  
  if (adjacentDate) return <div id='date-selector-list'>
    {dayDate.map((date,I)=><button
      key={I}
      onClick={()=>setSelDate(date)}
    >
      {date.toDateString()}
    </button>)}
  </div>
}
