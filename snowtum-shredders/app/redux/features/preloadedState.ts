import { current } from '@reduxjs/toolkit'

// Create a preloaded state
const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('cart')
    if (serializedState === null) {
      return undefined
    }
    console.log('[preloadedState] what is serializedState', serializedState)
    return {
      cart: {
        value: JSON.parse(serializedState)
      }
    }
  } catch(err) {
    console.error('Error loading state from localStorage', err)

    return undefined
  }
}

export const preloadedState = loadStateFromLocalStorage() || {
  cart: {
    value: []
  }
}