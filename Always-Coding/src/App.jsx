import './App.css'
import { useState } from 'react'
import { useEffect } from 'react'
import React from 'react'
import PokemonList from './components/PokemonList'
import axios from 'axios'
import Page from './components/Page'


function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setcurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [previousPageUrl, setpreviousPageUrl] = useState()
  const [nextPageUrl, setnextPageUrl] = useState()
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    setLoading(true)
    axios.get(currentPageUrl).then(response => {
      setLoading(false)
      setPokemon (response.data.results.map(pokemon => pokemon.name))
      setpreviousPageUrl(response.data.previous)
      setnextPageUrl(response.data.next)
    })
  }, [currentPageUrl])
  
  function gotoPreviousPage (){
    setcurrentPageUrl(previousPageUrl)
  }

  function gotoNextPage (){
    setcurrentPageUrl(nextPageUrl)
  }

  if(loading === true) {
    return "Loading..."
  }

  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Page 
        gotoPreviousPage = {previousPageUrl ? gotoPreviousPage : null}
        gotoNextPage = {nextPageUrl ? gotoNextPage : null} 
      />
    </>
  )
}

export default App;
