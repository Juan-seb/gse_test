import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button
} from '@material-tailwind/react'
import { useDispatch } from 'react-redux'
import { updateStateFact } from '../../redux/slices/factSlice'
import { Link } from 'react-router-dom'

const CardCat = ({ id, state }: { id: number, state: boolean }): JSX.Element => {
  const dispatch = useDispatch()

  const handleChangeState = (): void => {
    dispatch(updateStateFact(id)) // Dispatching the updateStateFact action with the id as the payload to update the state of the fact
  }

  return (
    <Card className='w-[300px] shadow-xl'>
      <CardBody>
        <Typography variant='h5' color='blue-gray' className='mb-2'>
          Dato curioso {id}
        </Typography>
        <Typography>
          Estado: <span className={`font-bold ${state ? 'text-green-400' : 'text-red-400'}`}>{`${state ? 'Activo' : 'Inactivo'}`}</span>
        </Typography>
      </CardBody>
      <CardFooter className='flex flex-col pt-0'>
        <Button onClick={handleChangeState}>Cambiar estado</Button>
        <Link to={`/fact/${id}`} className='mt-4 hover:underline hover:text-blue-300'>Ver dato curioso</Link>
      </CardFooter>
    </Card>
  )
}

export default CardCat
