import { useEffect, useState } from 'react'
import { getRandomFact } from '../services/getRandomFact'

export const useRandomFact = () => {
    const [fact, setFact] = useState(null)
    const refleshFact = () => {
      getRandomFact().then(newFact => setFact(newFact))
    }
    useEffect(refleshFact, [])
    return { fact, refleshFact }
  }