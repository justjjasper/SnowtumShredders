'use client'
import { xmarkSVG } from '@/app/Misc/Icons'
import { useState, useEffect, useRef } from 'react'
import { collectionsAPI } from '@/app/config'

interface SearchFormProps {
  searchHovered: boolean;
  onMouseLeave: () => void
}
export default function SearchForm( {searchHovered, onMouseLeave}: SearchFormProps ) {
  // Might want to change the property names of each products to be consistent when mapping out
  const [collections, setCollections] = useState([])

  useEffect(() => {
    const controller = new AbortController();
    const getProducts = async () => {
      try {

        const data = await fetch(`${collectionsAPI}`, { signal: controller.signal })
        const response = await data.json()

        setCollections(response)
      } catch(err: any ) {
        if (err.name === 'AbortError') {
          // Request was aborted (component unmounted)
        } else {
          console.error('Error in retrieving collections API from front end');
        }
      }
    }

    getProducts()
    // Implement clean up function to cancel or abort request when component is unmounted
    // Prevents double re-render/triggers from browser console logs
    return () => {
      // Abort the network request when unmounted
      controller.abort();
    };
  }, [])

  // Create a state to store the search query
  const [searchQuery, setSearchQuery] = useState('');

  // Handle the search input change && real-time searching
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value
    setSearchQuery(inputText)


  };

  const handleCloseSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchQuery('')
    onMouseLeave()
  }

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default form submission behavior
      // Implement your logic for handling the "Enter" key press
      // For example, you can trigger the search or filtering here.
    }
  };

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
          value={searchQuery}
          onChange={handleSearchInputChange}
          onKeyDown={handleInputKeyDown}
        />
        <button className='absolute self-end mr-4 cursor-pointer'
          onClick={handleCloseSearch}
        >
          {xmarkSVG}
        </button>
      </form>
      <div className='search-result'></div>
    </div>
  )
}