import axios from "axios"
import { useQuery } from "react-query"

const fetchHeroes = ()=>{
    return axios.get('http://localhost:4000/superheroes')
}

const onSuccess= ()=>{
    console.log('After data fetching');
}
const onError= ()=>{
    console.log('After encoutering error');
}

export const useHeroesData = () =>{

    return useQuery('super-heroes', fetchHeroes,
    // Default value 5 minutes for the query cache
    // Can configure cacheTime to clear cache in object
    {
        cacheTime: 5000,
        // refetchOnWindowFocus: true 
        // refetchInterval: 2000, // polling: query will automatic refetch every 2 seconds
        // refetchIntervalInBackground: true, // Continue to pull data even the browser is not in focus
        // enabled: false, // Disable  fetching on Mount
        onSuccess,
        onError,
        // Data transformation
        // select: (data)=>{
        //     const superHeroesname = data.data.map((hero: SuperHeroesProps)=> hero.name)
        //     return superHeroesname
        // }
    }
    )
}