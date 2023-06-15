import { useState } from 'react'
import { IconButton, Typography } from '@material-tailwind/react'
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

const Pagination = ({ pages, setPageSelected }: { pages: number, setPageSelected: React.Dispatch<React.SetStateAction<number>> }): JSX.Element => {
  const [active, setActive] = useState(1)

  // Function to go to the next page
  const next = (): void => {
    // Check if already on the last page
    if (active === pages) return

    // Increment the active page and update the pageSelected state
    setActive(active + 1)
    setPageSelected(active + 1)
  }

  // Function to go to the previous page
  const prev = (): void => {
    // Check if already on the first page
    if (active === 1) return

    // Decrement the active page and update the pageSelected state
    setActive(active - 1)
    setPageSelected(active - 1)
  }

  return (
    <div className='w-full h-[50px] flex justify-center items-center my-6'>
      <div className='flex items-center gap-8'>
        <IconButton
          size='sm'
          variant='outlined'
          color='blue-gray'
          onClick={prev}
          disabled={active === 1}
        >
          <ArrowLeftIcon strokeWidth={2} className='h-4 w-4' />
        </IconButton>
        <Typography color='gray' className='font-normal'>
          Page <strong className='text-blue-gray-900'>{active}</strong> of{' '}
          <strong className='text-blue-gray-900'>{pages}</strong>
        </Typography>
        <IconButton
          size='sm'
          variant='outlined'
          color='blue-gray'
          onClick={next}
          disabled={active === pages}
        >
          <ArrowRightIcon strokeWidth={2} className='h-4 w-4' />
        </IconButton>
      </div>
    </div>

  )
}

export default Pagination
