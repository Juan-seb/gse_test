import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography
} from '@material-tailwind/react'
import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { catFact } from '../../types'

const PageFact = (): JSX.Element => {
  const { id } = useParams<{ id: string }>()
  const { catFacts } = useSelector((state: RootState) => state.fact)
  const [fact, setFact] = useState<catFact>()

  useEffect(() => {
    // Check if the 'id' parameter is undefined to avoid errors
    if (id === undefined) return

    // Find the cat fact with the matching 'id' and set it as the 'fact' state
    const fact = catFacts.find(fact => fact.id === parseInt(id))
    console.log(fact)
    setFact(fact)
  }, [id])

  return (
    <main className='grid w-screen h-auto min-h-screen place-items-center bg-blue-gray-200'>
      <Card className='w-96 my-8'>
        <CardHeader floated={false} className='h-full'>
          <img src={fact?.urlImage} alt='profile-picture' />
        </CardHeader>
        <CardBody className='text-center'>
          <Typography className='font-medium text-black' textGradient>
            {fact?.fact}
          </Typography>
          <Typography className='font-medium text-black' textGradient>
            Longitud: {fact?.length}
          </Typography>
        </CardBody>
        <CardFooter className='flex justify-center gap-7 pt-2'>
          <Typography className='font-medium text-black' textGradient>
            <Link to='/' className='mt-4 hover:underline hover:text-blue-300'>
              Volver a inicio
            </Link>
          </Typography>
        </CardFooter>
      </Card>
    </main>
  )
}

export default PageFact
