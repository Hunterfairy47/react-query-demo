import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'

const fetchHeroes = ()=>{
    return axios.get('http://localhost:4000/superheroes')
}
const fetchCats = ()=>{
    return axios.get('http://localhost:4000/cats')
}


export const ParallelQueries = () => {
    const {data: superheroes}=useQuery('super-heroes', fetchHeroes)
    const {data: cats}=useQuery('cats', fetchCats)
  return (
    <div>ParallelQueries</div>
  )
}
