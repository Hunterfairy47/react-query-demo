import { Box, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from'react'
import { hydrateRoot } from 'react-dom/client'

export interface SuperHeroesProps {
    id: number,
    name: string,
    alterEgo: string,
    img: string
}
export const SuperHeroesPage=()=>{
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState<SuperHeroesProps[]>([])

    useEffect(()=>{
        axios.get('http://localhost:4000/superheroes').then((res)=>{
          setData(res.data)
          setIsLoading(false)
       })
      },[])
      if(isLoading){
        return<h2>Loading ...</h2>
      }
      
    return(
        <Box sx={{textAlign:"center"}}>
            <h1>Super Heroes page</h1>
            { data.map(hero=>{
                return <Box sx={{mb: 2}} key={hero.name}>
                    <Box>
                        <img width ="300px"  height="200px" src={hero.img}/>
                    </Box>
                    <Typography>
                        {hero.name}
                    </Typography>
                    </Box>
            })}
        </Box>
    )
}