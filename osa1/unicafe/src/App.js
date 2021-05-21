import React, { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.name} </h1>
    </div>
  )
}

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const all =  props.good+props.neutral+props.bad
  if(all === 0){
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <div>
      <table>
        <thead>
        </thead>
        <tbody>
          <StatisticsLine text = "Good" value = {props.good}/>
          <StatisticsLine text = "Neutral" value = {props.neutral}/>
          <StatisticsLine text = "Bad" value = {props.bad}/>
          <StatisticsLine text = "all" value = {props.good+props.neutral+props.bad}/>
          <StatisticsLine text = "average" value = {(props.good-props.bad)/(props.good+props.neutral+props.bad)}/>
          <StatisticsLine text = "positive" value = {(props.good)/(props.good+props.neutral+props.bad)}/>   
        </tbody>
     
      </table>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const name1 = "give feedback"
  const name2 = "statistics"

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const setGoodValue = newValue => {
    console.log(newValue)
    setGood(newValue)
  }
  const setNeutralValue = newValue => {
    console.log(newValue)
    setNeutral(newValue)
  }
  const setBadValue = newValue => {
    console.log(newValue)
    setBad(newValue)
  }

  return (
    <div>
      <Header name ={name1} />
      <Button handleClick={() => setGoodValue(good+1)} text="Good" />
      <Button handleClick={() => setNeutralValue(neutral+1)} text="Neutral" />
      <Button handleClick={() => setBadValue(bad+1)} text="Bad" />
      <Header name ={name2} />
      <Statistics good = {good} neutral = {neutral} bad = {bad} />

    </div>
  )
}

export default App