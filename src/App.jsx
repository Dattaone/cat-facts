import { useRandomFact } from './hooks/useRandomFact'
import { useRandomCatImg } from './hooks/useRandomCatImg'
import './App.css'

export const App = () => {
  const { fact, refleshFact } = useRandomFact()
  const { imgURL } = useRandomCatImg({ fact })

  const handleClick = async () => {
    refleshFact()
  }
  return (
    <main>
      <h1>Cat Facts</h1>
      <button onClick={handleClick}>New factCat</button>
      <section className='card'>
        {fact && <p>{fact}</p>}
        <img src={imgURL} alt='img random cat with fact' />
      </section>
    </main>
  )
}
