import { catFact } from '../../types'
import CardCat from '../Card'

const CardsContainer = ({ catFacts }: { catFacts: catFact[] }): JSX.Element => {
  return (
    <section className='grow grid place-items-center w-full min-w-[350px] my-8'>
      <div className='flex flex-wrap justify-center gap-8 w-4/5'>
        {
        catFacts.map((fact: catFact, index: number) => (
          <CardCat
            key={index}
            id={fact.id}
            state={fact.state}
          />
        ))
        }
      </div>

    </section>
  )
}

export default CardsContainer
