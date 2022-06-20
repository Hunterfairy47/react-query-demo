import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'

const fetchUserByEmail = (email:string)=>{
    return axios.get(`http://localhost:4000/users/${email}`)
}
const fetchHobbyByHobbyId = (hobbyId:string)=>{
    return axios.get(`http://localhost:4000/hobbys/${hobbyId}`)
}

interface DependentQueriesProps{
  email: string
}

// 1 query dependent result of another query
export const DependentQueries = ({email}: DependentQueriesProps) => {

    const {data: user}=useQuery(['user', email],()=> fetchUserByEmail(email))
    const hobbyId = user?.data.hobbyId

    useQuery(['hobbys', hobbyId],()=> fetchHobbyByHobbyId(hobbyId),{
      enabled: !!hobbyId
    })
    return (
    <div>DependentQueries</div>
  )
}
