import axios from "axios"
import { useQuery } from "react-query"


const fetchHero =(heroId: number)=>{
    return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

export const useHeroData = (heroId: number)=>{
    return useQuery(['super-hero', heroId], ()=>fetchHero(heroId))
}