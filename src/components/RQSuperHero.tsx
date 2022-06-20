import { Box, Typography } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useHeroData } from '../hooks/useHeroData'

export const RQSuperHero = () => {
    const {heroId} = useParams()
    const [id, setId] = React.useState<number>(1)
    React.useEffect(() => {
        const newHeroId = heroId as unknown as number
        setId(newHeroId)
    }, [heroId])
    
    const {isLoading, data, isError}=useHeroData(id)
    
    if(isLoading){
        return <Typography variant='h2' sx={{textAlign: "center"}}>Loading ...</Typography>
      }

    if(isError){
        return <Typography variant='h2' sx={{textAlign: "center"}}>Somthing went wrong...</Typography>
    }
  return (
    <Box sx={{textAlign:"center"}}>
        <Box>
            <img width ="300px"  height="200px" src={data?.data.img}/>
        </Box>
        <Typography>
            {data?.data.name}
        </Typography>
    </Box>
  )
}
