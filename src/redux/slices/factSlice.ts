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
      const catFacts = action.payload.map((fact: catFact, index: number) => {
        const firstWord = fact.fact.split(' ')[0]

        return {
          id: index + 1,
          fact: fact.fact,
          length: fact.length,
          state: false,
          firstWord,
          urlImage: `https://cataas.com/cat/says/${firstWord}`
        }
      })

      return {
        ...state,
        catFacts
      }
    },
    catFactById: (state, action) => {
      return {
        ...state,
        catFact: state.catFacts.find((fact) => fact.id === action.payload) as catFact
      }
    },
    updateStateFact: (state, action) => {
      const id = action.payload
      const factToEdit = state.catFacts.find((fact) => fact.id === id) as catFact

      factToEdit.state = !factToEdit.state

      return state
    }
  }
})

export const { addFacts, catFactById, updateStateFact } = factSlice.actions

export default factSlice.reducer
