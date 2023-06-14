import { createSlice } from '@reduxjs/toolkit'
import { catFact, initialStateFact } from '../../types'

const initialState: initialStateFact = {
  catFacts: [],
  catFact: null
}

export const factSlice = createSlice({
  name: 'fact',
  initialState,
  reducers: {
    addFacts: (state, action) => {
      return {
        ...state,
        catFacts: action.payload.map((fact: catFact, index: number) => {
          const firstWord = fact.fact.split(' ')[0]

          return {
            id: index,
            fact: fact.fact,
            length: fact.length,
            state: false,
            firstWord,
            urlImage: `https://cataas.com/cat/says/${firstWord}`
          }
        })
      }
    },
    catFactById: (state, action) => {
      return {
        ...state,
        catFact: state.catFacts.find((fact) => fact.id === action.payload) as catFact
      }
    }
  }
})

export const { addFacts, catFactById } = factSlice.actions

export default factSlice.reducer
