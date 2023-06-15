import { useEffect, useState } from 'react'
import { addFacts } from './redux/slices/factSlice'
import { useGetNumberFactsQuery, useUpdateAllFactsMutation } from './redux/services/factApi'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './redux/store'
import Header from './components/Header'
import Pagination from './components/Pagination'
import CardsContainer from './components/CardsContainer'

const shouldSkipQuery = (): boolean => {
  const { catFacts } = useSelector((state: RootState) => state.fact)

  return catFacts.length > 0
}
function Root (): JSX.Element {
  const [pages, setPages] = useState<number>(0)
  const [elementsInPage, setElementsInPage] = useState<number[]>([0, 10])
  const [pageSelected, setPageSelected] = useState<number>(1)
  const [updateFacts, result] = useUpdateAllFactsMutation()
  const { data } = useGetNumberFactsQuery('', {
    skip: shouldSkipQuery()
  })
  const { catFacts } = useSelector((state: RootState) => state.fact)
  const dispatch = useDispatch()

  useEffect(() => {
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

  useEffect(() => {
    if (catFacts === undefined) return

    const pages = Math.ceil(catFacts.length / 10)
    setPages(pages)
  }, [catFacts])

  useEffect(() => {
    if (catFacts === undefined) return

    setElementsInPage([(pageSelected - 1) * 10, pageSelected * 10])
  }, [pageSelected])

  return (
    <main className='flex flex-col w-screen min-h-screen h-auto font-[Roboto]'>
      <Header />
      {
        catFacts === undefined
          ? (<p>Cargando datos ...</p>)
          : (
            <CardsContainer catFacts={catFacts.slice(elementsInPage[0], elementsInPage[1])} />
            )
      }
      {
        catFacts === undefined
          ? (<p>Cargando datos ...</p>)
          : (
            <Pagination
              pages={pages}
              setPageSelected={setPageSelected}
            />
            )
      }

    </main>
  )
}

export default Root
