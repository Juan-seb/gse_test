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
  const [pages, setPages] = useState<number>(0) // State for the total number of pages
  const [elementsInPage, setElementsInPage] = useState<number[]>([0, 10]) // State for the range of elements to display on the current page
  const [pageSelected, setPageSelected] = useState<number>(1) // State for the currently selected page
  const [updateFacts, result] = useUpdateAllFactsMutation() // Mutation hook for updating all facts
  const { data } = useGetNumberFactsQuery('', {
    skip: shouldSkipQuery()
  }) // Query hook for getting the number of facts
  const { catFacts } = useSelector((state: RootState) => state.fact) // Selecting catFacts from the Redux store
  const dispatch = useDispatch()

  // Fetching the all facts of cats using data.total as the number of facts to fetch - this is done only once because the data is stores with Redux Persist
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

  // Updating the state with the fetched cat facts - this is done only once because the data is stores with Redux Persist
  useEffect(() => {
    if (result.data === undefined) return

    dispatch(addFacts(result.data.data))
  }, [result])

  // Calculating the total number of pages based on the catFacts length
  useEffect(() => {
    if (catFacts === undefined) return

    const pages = Math.ceil(catFacts.length / 10)
    setPages(pages)
  }, [catFacts])

  // Updating the range of elements to display based on the selected page
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
