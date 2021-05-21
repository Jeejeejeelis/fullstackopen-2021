import React, { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.name} </h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.text} {props.clicks}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part text = "Good" clicks = {props.good}/>
      <Part text = "Neutral" clicks = {props.neutral}/>
      <Part text = "Bad" clicks = {props.bad}/>
      <Part text = "all" clicks = {props.good+props.neutral+props.bad}/>
      <Part text = "average" clicks = {(props.good-props.bad)/(props.good+props.neutral+props.bad)}/>
      <Part text = "positive" clicks = {(props.good)/(props.good+props.neutral+props.bad)}/>
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
      <Content good = {good} neutral = {neutral} bad = {bad} />

    </div>
  )
}

export default App