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

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(p => 
        <Part key = {p.id} text = {p.name} exercise = {p.exercises}/>)}

      {/* <Part text = {props.parts[0].name} exercise = {props.parts[0].exercises}/>
      <Part text = {props.parts[1].name} exercise = {props.parts[1].exercises}/>
      <Part text = {props.parts[2].name} exercise = {props.parts[2].exercises}/> */}
    </div>
  )
}
const Total = (props) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue.exercises
  return (
    <div>
      <p><b>Total of {props.parts.reduce(reducer, 0)} exercises</b></p>
    </div>
  )
}

const Course = (props) => {
  return (
    <div>
      <Header header = {props.course.name} />
      <Content parts = {props.course.parts} />
      <Total parts = {props.course.parts} />
    </div>  
  
  )
}

const App = () => {
  const course ={
    name:  'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
{/*       
      <Header name ={course.name} />
      <Content parts = {course.parts} />
      <Total parts ={course.parts} /> */}
      
    </div>
  )
}

export default App