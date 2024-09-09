import {useEffect, useState} from 'react'
import useLocalStorage from '../hook/useLocalStorage'


const dayKey = date=>date?.toISOString().slice(0, 10)


export default function DayEdit({date}) {
  const [data, setData] = useLocalStorage('grub-logs', [])
  
  const [calories, setCalories] = useState()
  const [key, setKey] = useState(dayKey(date))
  const [protein, setProtein] = useState()
  const [carbs, setCarbs] = useState()
  const [fat, setFat] = useState()
  
  
  const save = event=>{
    event.preventDefault()
    
    const form = new FormData(event.target)
    
    const newObj = Object.fromEntries(form.entries())
    
    const newDat = {calories, protein, carbs, fat}
    
    const newData = {...data, [key]: newDat}
    
    setData(newData)
  }
  
  
  useEffect(() => {
    if (date) {
      setKey(dayKey(date))
      document.getElementById('calories').focus()
    }
  }, [date])
  
  
  useEffect(() => {
    if (data && key) {
      const thisn = data[key]
      
      if (thisn) {
        setCalories(thisn.calories)
        setProtein(thisn.protein)
        setCarbs(thisn.carbs)
        setFat(thisn.fat)
        
        return
      }
    }
    
    setCalories(0)
    setProtein(0)
    setCarbs(0)
    setFat(0)
  }, [data, key])
  
  
  if (date) return <div>
    <h2>{date?.toDateString? date?.toDateString(): 'select a date'}</h2>{key}
    
    {/* <pre>{JSON.stringify(thisn,null,2)}</pre> */}
    
    <form onSubmit={save}>
      <label htmlFor="calories">Calories</label>
      <input type="number" id="calories" name="calories"
        autoFocus={true}
        onChange={E=>setCalories(+E.target.value)}
        value={calories}
      />
      
      <label htmlFor="protein">Protein</label>
      <input type="number" id="protein" name="protein"
        onChange={E=>setProtein(+E.target.value)}
        value={protein}
      />
      
      <label htmlFor="carbs">Carbs</label>
      <input type="number" id="carbs" name="carbs"
        onChange={E=>setCarbs(+E.target.value)}
        value={carbs}
      />
      
      <label htmlFor="fat">Fat</label>
      <input type="number" id="fat" name="fat"
        onChange={E=>setFat(+E.target.value)}
        value={fat}
      />
      
      <button type="submit">Save</button>
    </form>
  </div>
}