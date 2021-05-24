import React from 'react'

const Header = (props) => {
  return (
    <div>
      <h3>{props.name}</h3>
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
      <Header name = {props.name} />
      <Content parts = {props.parts} />
      <Total parts = {props.parts} />
    </div>  
  
  )
}

export default Course