import {useEffect, useState} from 'react'
import useLocalStorage from '../hook/useLocalStorage'

const calPerLb = 2228


export default function WeekStats({week}) {
  const [budget, setBudget] = useLocalStorage('grub--daily-budget', 0)
  const [logs] = useLocalStorage('grub-logs', [])
  
  const [intake, setIntake] = useState()
  const [weekBudget, setWeekBudget] = useState()
  const [weightLoss, setWeightLoss] = useState()
  
  
  useEffect(() => {
    if (budget) setWeekBudget(budget * 7)
  }, [budget])
  
  
  useEffect(() => {
    if (logs && week) {
      const data = []
      
      let P, C, F
      

      week.forEach(date=>{
        const key = date.toISOString().slice(0, 10)
        
        const thisn = logs[key]
        
        if (thisn) {
          data.push(thisn)
          
        }
      })
      
      setIntake(data.reduce((acc, cur)=>acc + cur.calories, 0))
    }
  }, [logs, week])
  
  
  useEffect(() => {
    if (intake && weekBudget) {
      const loss = (intake - weekBudget) / calPerLb
      
      setWeightLoss(loss)
    }
  }, [intake, weekBudget])
  
  
  if (Array.isArray(week)) return <>
    <div>WeekStats</div>
    
    <label htmlFor="budget">Daily Calorie Budget</label>
    <input
      id="budget"
      onChange={E=>setBudget(E.target.value)}
      type="number"
      value={budget}
    />
    
    <div>
      Weekly Calorie Budget: {weekBudget} Kcal
    </div>
    
    <div>
      Consumption this week: {intake} Kcal
    </div>
    
    <div>
      Expected weight&nbsp;
      {weightLoss < 0? 'loss': 'gain'}
      :&nbsp;
      {Math.abs(Math.round(weightLoss*10)/10)} lbs
    </div>
  </>
}