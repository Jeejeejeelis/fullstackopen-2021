import React from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>Header {props.name}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.text} {props.exercise}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part text = {props.part1.name} exercise = {props.part1.exercises}/>
      <Part text = {props.part2.name} exercise = {props.part2.exercises}/>
      <Part text = {props.part3.name} exercise = {props.part3.exercise}/>
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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10,
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7,
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14,
  }
  
  const total = part1.exercises+part2.exercises+part3.exercises

  return (
    <div>
      <Header name ={course} />
      <Content  part1 = {part1} part2 = {part2} part3 = {part3}/>
      <Total total ={total} />
    </div>
  )
}

export default App