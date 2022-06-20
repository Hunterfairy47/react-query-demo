import axios from 'axios'
import React from 'react'
import { useQueries, useQuery } from 'react-query'

const fetchHero = (heroId: number)=>{
    return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}


interface DynamicParallelProps{
  heroIds: number[]
}

export const DynamicParallel = ({heroIds}:DynamicParallelProps) => {
  
    const queryResults = useQueries(
      heroIds.map((id: number)=>{
        return {
          queryKey:['super-hero', id],
          queryFn:()=>fetchHero(id)
        }
      })
    )
    console.log(queryResults);
    
  return (
    <div>ParallelQueries</div>
  )
}
