import { Box, Button, Typography } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import{useQuery}from'react-query'

interface ColorProps{
    id: number,
    label: string
}

const fetchColors=(pageNumber:number)=>{
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`)
}

export const PaginatedQueries=()=>{
    const [pageNumber, setPageNumber] = useState<number>(1)
    const{isLoading,isError,error,data, isFetching}= useQuery(['colors', pageNumber],()=>fetchColors(pageNumber),{
        keepPreviousData: true
    })

    if(isLoading){
        return <Typography variant='h2' sx={{textAlign: "center"}}>Loading ...</Typography>
    }

    if(isError){
        return <Typography variant='h2' sx={{textAlign: "center"}}>Somthing went wrong...</Typography>
    }

    return (
        <Box  sx={{textAlign: 'center'}}>
            <Box>
                {data?.data.map((color:ColorProps)=>{
                    return(
                        <Box key={color.id}>
                            <Typography variant='h5' sx={{color: color.label}}>
                                {color.id}. {color.label}
                            </Typography>
                        </Box>
                    )
                })}
            </Box>   
            <Box>
                <Button onClick={()=>setPageNumber(page=>page-1)} disabled={pageNumber===1}>Pre</Button>
                <Button onClick={()=>setPageNumber(page=>page+1)} disabled={pageNumber===4}>Next</Button>
            </Box>
            {isFetching && 'Loading background...'}
        </Box>
    )

}