import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(Array(anecdotes.length - 1).fill(0))

  const randomAnecdote = () => {
    const randomNum = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomNum)
  }

  const handleVote = () => {
    const newVote = [...vote]
    newVote[selected]+=1
    setVote(newVote)
  }

  const maxVotes = Math.max(...vote)
  const maxVotesIndex = vote.indexOf(maxVotes)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]} 
      <p>has {vote[selected]} votes</p>
      <br/>
      <button onClick={handleVote}>vote</button>
      <button onClick={randomAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[maxVotesIndex]} has {maxVotes} votes</p>
    </div>
  )
}

export default App

