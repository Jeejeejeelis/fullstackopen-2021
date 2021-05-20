import React from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>Header {props.name}</h1>
    </div>
  )
}
const Content = (props) => {
  return (
    <div>
      <p>{props.part} {props.exercise}</p>
    </div>
  )
}
const Total = (props) => {
  return (
    <div>
      <p>Total {props.total}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const total = exercises1+exercises2+exercises3

  return (
    <div>
      <Header name ={course} />
      <Content part ={part1} exercise={exercises1} />
      <Content part ={part2} exercise={exercises2} />
      <Content part ={part3} exercise={exercises3}/>
      <Total total ={total} />
    </div>
  )
}

export default App