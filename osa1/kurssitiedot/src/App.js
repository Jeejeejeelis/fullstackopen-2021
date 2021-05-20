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
      <Part text = {props.parts[0].name} exercise = {props.parts[0].exercises}/>
      <Part text = {props.parts[1].name} exercise = {props.parts[1].exercises}/>
      <Part text = {props.parts[2].name} exercise = {props.parts[2].exercises}/>
    </div>
  )
}
const Total = (props) => {
  return (
    <div>
      <p>Total {props.parts[0].exercises+props.parts[1].exercises+props.parts[2].exercises}</p>
    </div>
  )
}

const App = () => {
  const course ={
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      }
    ]
  }
  
  const total = course.parts[0].exercises+course.parts[1].exercises+course.parts[2].exercises

  return (
    <div>
      <Header name ={course.name} />
      <Content parts = {course.parts} />
      <Total parts ={course.parts} />
    </div>
  )
}

export default App