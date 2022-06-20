import { Box, Button, Typography } from "@mui/material"
import axios from "axios"
import { Fragment, useState } from "react"
import{useInfiniteQuery}from'react-query'

interface ColorProps{
    id: number,
    label: string
}

const fetchColors=({pageParam=1 })=>{
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`)
}

export const InfiniteQueries=()=>{
    const{isLoading,isError,error,data, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage}= useInfiniteQuery('colors',fetchColors,{
        getNextPageParam: (_lastPage, pages)=>{
            if(pages.length<4){
                return pages.length+1
            }
            else{
                return undefined
            }
        }
    })

    if(isLoading){
        return <Typography variant='h2' sx={{textAlign: "center"}}>Loading ...</Typography>
    }

    if(isError){
        return <Typography variant='h2' sx={{textAlign: "center"}}>Somthing went wrong...</Typography>
    }

    const loadMore =()=>{
        fetchNextPage()

    }

    
    return (
        <Box  sx={{textAlign: 'center'}}>
            <Box>
                {data?.pages.map((group, index)=>{
                    return(
                        <Fragment key={index}>
                            {
                                group.data.map((color:ColorProps)=>(
                                    <Typography key={color.id} variant='h5' sx={{color: color.label}}>
                                        {color.id}. {color.label}
                                    </Typography>
                                ))
                            }
                        </Fragment>
                    )
                })}
            </Box>  
             
            <Box>
                <Button disabled={!hasNextPage} onClick={loadMore} >
                    Load more
                </Button>
            </Box>
            <Box>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</Box>
        </Box>  
    )

}