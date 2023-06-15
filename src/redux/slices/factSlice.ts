import { createSlice } from '@reduxjs/toolkit'
import { catFact, initialStateFact } from '../../types'

const initialState: initialStateFact = {
  catFacts: []
}

export const factSlice = createSlice({
  name: 'fact',
  initialState,
  reducers: {
    addFacts: (state, action) => {
      // Mapping the payload data to create an array of cat facts with the props we need
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

      return catFacts
    },
    updateStateFact: (state, action) => {
      // Updating the state (active/inactive) of a cat fact by id
      const id = action.payload
      const factToEdit = state.catFacts.find((fact) => fact.id === id) as catFact

      factToEdit.state = !factToEdit.state

      return state
    }
  }
})

export const { addFacts, updateStateFact } = factSlice.actions

export default factSlice.reducer
