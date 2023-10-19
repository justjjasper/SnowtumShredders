'use client'
import { xmarkSVG } from '@/app/Misc/Icons'
import { useRef } from 'react'

interface SearchFormProps {
  searchHovered: boolean;
  onMouseLeave: () => void
}
export default function SearchForm( {searchHovered, onMouseLeave}: SearchFormProps ) {
  // Creates a reference to the input text field, function below clears the input/closes the dropdown menu
  const searchRef = useRef<HTMLInputElement | null>(null)
  const handleSearchRef = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchRef.current) {
      searchRef.current.value = ''
    }
    onMouseLeave()
  }

  return (
    <div className={`searchForm ${searchHovered ? 'flex' : 'hidden'} absolute flex-col py-12 justify-start items-center
      h-[300px] w-full`}>
      <label className='flex text-sm mb-1'>SEEK AND YOU WILL FIND</label>
      {/* Use Fuse.js to help with search queries */}
      <form className='flex flex-col relative justify-center items-center w-[30%]'>
        <input
          id='search-input'
          type='text'
          placeholder='Type here'
          className='w-full'
          ref={searchRef}
        />
        <button className='absolute self-end mr-4 cursor-pointer'
          // Implement a reset of input text field later, need ref
          onClick={handleSearchRef}
        >
          {xmarkSVG}
        </button>
      </form>
      <div className='search-result'></div>
    </div>
  )
}