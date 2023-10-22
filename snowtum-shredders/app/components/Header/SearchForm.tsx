'use client'
import './SearchForm.css'
import Image from 'next/image'
import Link from 'next/link'
import { circleXMarkSVG } from '@/app/Misc/Icons'
import { useState, useEffect, useRef } from 'react'
import { collectionsAPI } from '@/app/config'
import Fuse from 'fuse.js'
// limit 8, threshold 3, index name and description

interface SearchFormProps {
  searchHovered: boolean;
  onMouseLeave: () => void;
  hamburgerToggle: boolean
}

interface ItemType {
  id: number;
  name: string;
  image: string;
  description: string;
  category: string
}
export default function SearchForm( {searchHovered, onMouseLeave, hamburgerToggle}: SearchFormProps ) {
  // Might want to change the property names of each products to be consistent when mapping out
  const [collections, setCollections] = useState([])
  const [filteredCollections, setFilteredCollections] = useState([])

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

    // Options for Fuse
    const options = { keys: ['name', 'description'], limit: 8, threshold: 0.3 }

    // Create fuse index
    const myIndex = Fuse.createIndex(options.keys, collections)

    // Initialize Fuse with index
    const fuse = new Fuse(collections, options,  myIndex)

    // Initiate fuse search
    const results = fuse.search(inputText)

    setFilteredCollections(results.slice(0, 8).map(results => results.item))
  };

  const handleCloseSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onMouseLeave()
    setSearchQuery('')
    setFilteredCollections([]); // Clear the filtered results
  }

  const handleLinkClick = () => {
    onMouseLeave()
    setSearchQuery('')
    setFilteredCollections([]); // Clear the filtered results
  }

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default form submission behavior
      // Implement your logic for handling the "Enter" key press
      // For example, you can trigger the search or filtering here.
    }
  };

  return (
    <div className={`searchForm relative flex-col py-8 lg:py-12 justify-start items-center w-full
      lg:${searchHovered ? 'flex' : 'hidden'}
      ${hamburgerToggle ? 'flex' : 'hidden'}`
      }>
      <label className='flex text-sm mb-1'>SEEK AND YOU WILL FIND</label>
      {/* Use Fuse.js to help with search queries */}
      <form className='flex flex-col relative justify-center items-center w-[40%] lg:w-[30%]'>
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
          {circleXMarkSVG}
        </button>
      </form>
      <div className={`search-result w-full grid-container px-16 py-8
        ${filteredCollections.length === 0 ? 'hidden' : ''}`
        }>
        {filteredCollections.map((item: ItemType, i) => {
          const formattedName = item.name.replace(/\s+/g, '-').toLowerCase()
          return (
            <div key={i} className='item-content flex items-center'>
              <Link href={`/products/${item.category}/${formattedName}`}
                onClick={handleLinkClick}
              >
                <Image
                  src= {`${item.image}`}
                  width={53}
                  height={80}
                  alt='Item image'
                  />
                </Link>
              <span className='text-xs'>{item.name}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}