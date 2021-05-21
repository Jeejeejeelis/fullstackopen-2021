import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Header = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}


const App = () => {
  /*
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  */

  const anecdotes ={
    parts: [
      {
        text: 'If it hurts, do it more often',
        points: 0,
      },
      {
        text: 'Adding manpower to a late software project makes it later!',
        points: 0,
      },
      {
        text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        points: 0,
      },
      {
        text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        points: 0,
      },
      {
        text: 'Premature optimization is the root of all evil.',
        points: 0,
      },
      {
        text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        points: 0,
      }
    ]
  }

 
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(anecdotes.parts)

  const max = () => {
    var i;
    var highestVotes = 0;
    var highestIndex = 0;
    for (i=0; i<anecdotes.parts.length; i++) {
      if(votes[i].points>highestVotes){
        highestVotes = votes[i].points
        highestIndex = i
      }
    }
    return highestIndex
  }
  
  const nextAnecdote = newValue => {
    console.log(newValue)
    setSelected(newValue)
  }
  
  const voteAnecdote = () => {
    const copy = [...votes]
    copy[selected].points += 1
    setVotes(copy)
  }

  return (
    <div>
      <Header name = "Anecdote of the day" />
      <div>
        {anecdotes.parts[selected].text}
      </div>
      <div>
        {votes[selected].points}
      </div>
      <div>
      <Button handleClick={() => voteAnecdote()} text="vote" />
        <Button handleClick={() => nextAnecdote(Math.floor(Math.random()*10%6))} text="next anecdote" />
      </div>
      <Header name = "Anecdote with most votes" />
      <div>
        {anecdotes.parts[max()].text}
      </div>
      <div>
        {votes[max()].points}
      </div>
    </div>
  )
}

export default App