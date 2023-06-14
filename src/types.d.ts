export interface catFact {
  id: number
  fact: string
  length: number
  state: boolean
  firstWord: string
  urlImage: string
}

export interface initialStateFact {
  catFacts: catFact[]
  catFact: catFact | null
}
