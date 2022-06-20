import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from'react'
import { useQuery, UseQueryResult } from 'react-query'
import { Link } from 'react-router-dom'
import { useAddHero, useHeroesData } from '../hooks/useHeroesData'
import { SuperHeroesProps } from './SuperHeroes'


export const RQSuperHeroes=()=>{
    const [name, setName] = useState<string>('')
    const [urlImg, setUrlImg] = useState<string>('')
    const {isLoading, data, isError, isFetching, refetch} = useHeroesData()

    const {mutate: addHero} = useAddHero()

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

    const handleRefetch = ()=>{
        refetch()
    }

    const handleAddHero =()=>{
        const hero = {name, img:urlImg}        
        addHero(hero)
    }
    return(
        <Box sx={{textAlign:"center"}}>
        <h1>Super Heroes page</h1>
        <Box component="form"sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}>
            <div>
                <TextField  label="Name" variant="outlined" onChange={(e)=>setName(e.target.value)} />
                <TextField  label="Image" variant="outlined" onChange={(e)=>setUrlImg(e.target.value)} />
                <Button sx={{mt:2}} onClick={handleAddHero} variant="outlined">
                    Add
                </Button>
            </div>
        </Box>

        <Button sx={{mb: 3}} variant='contained' onClick={handleRefetch}>Fetch heroes</Button> 
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