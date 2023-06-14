import { useEffect } from 'react'
import { addFacts } from './redux/slices/factSlice'
import { useGetNumberFactsQuery, useUpdateAllFactsMutation } from './redux/services/factApi'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './redux/store'

function Root (): JSX.Element {
  const [updateFacts, result] = useUpdateAllFactsMutation()
  const { data } = useGetNumberFactsQuery('')
  const { catFacts } = useSelector((state: RootState) => state.fact)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(data)
    const updateFactsRequest = async (): Promise<any> => {
      if (data === undefined) return

      try {
        await updateFacts(data.total)
      } catch (err: any) {
        console.log(err)
      }
    }

    updateFactsRequest().catch(error => console.log(error))
  }, [data])

  useEffect(() => {
    if (result.data === undefined) return
    console.log(result.data.data)

    dispatch(addFacts(result.data.data))
  }, [result])

  return (
    <main className='bg-blue-gray-500'>
      Soy el main
    </main>
  )
}

export default Root
