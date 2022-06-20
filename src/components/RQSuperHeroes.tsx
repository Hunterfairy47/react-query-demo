import { Box, Button, Typography } from '@mui/material'
import axios from 'axios'
import React from'react'
import { useQuery, UseQueryResult } from 'react-query'
import { Link } from 'react-router-dom'
import { useHeroesData } from '../hooks/useHeroesData'
import { SuperHeroesProps } from './SuperHeroes'


export const RQSuperHeroes=()=>{
    const {isLoading, data, isError, isFetching, refetch} = useHeroesData()

    // First time of redering isLoading true, isFetching true
    // Next time isLoading false, isFetching true => list updated in background
    console.log({isLoading, isFetching});
    
    console.log(data?.data);
    

    if(isLoading){
        return <Typography variant='h2' sx={{textAlign: "center"}}>Loading ...</Typography>
      }

    if(isError){
        return <Typography variant='h2' sx={{textAlign: "center"}}>Somthing went wrong...</Typography>
    }
    return(
        <Box sx={{textAlign:"center"}}>
        <h1>Super Heroes page</h1>
        {/* <Button variant='contained' onClick={refetch}>Fetch heroes</Button> // Refetch when click button */}
        { data?.data.map((hero: SuperHeroesProps)=>{
            return <Box sx={{mb: 2}} key={hero.name}>
                <Link to={`${hero.id}`}>
                    <Box>
                        <img width ="300px"  height="200px" src={hero.img}/>
                    </Box>
                    <Typography>
                        {hero.name}
                    </Typography>
                </Link>
            </Box>
        })}

    </Box>
    )
}