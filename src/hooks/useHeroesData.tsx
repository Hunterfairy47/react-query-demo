import axios from "axios"
import { AnyAaaaRecord } from "dns"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { request } from "../utils/axios-utils"

export interface HeroProps{
    id?: number,
    name: string,
    img: string,
}

const fetchHeroes = ()=>{
    return request({url: '/superheroes', method: 'get'})
}

const addHero = (hero:HeroProps)=>{
    return request({url: '/superheroes', method: 'post', data: hero})
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

export const useAddHero = ()=>{
    const queryClient = useQueryClient()
    return useMutation(addHero, {
        // onSuccess:(data)=>{
        //     // queryClient.invalidateQueries('super-heroes')

        //     // Save additional network request
        //     queryClient.setQueryData('super-heroes',(oldQueryData: any)=>{
        //         return {
        //             ...oldQueryData,
        //             data: [...oldQueryData.data, data.data]
        //         }
        //     })
        // }

        onMutate: async (newHero)=>{
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries('super-heroes')

            // Snapshot the previous value
            const prevHeroData = queryClient.getQueryData('super-heroes')

             // Optimistically update to the new value
            queryClient.setQueryData('super-heroes',(oldQueryData: any)=>{
                return {
                    ...oldQueryData,
                    data: [...oldQueryData.data, {id: oldQueryData?.data.lenght +1, ...newHero}]
                    }
            })

            // Return a context object with the snapshotted value
            return {
                prevHeroData,
            }
        },    

        // If the mutation fails, use the context returned from onMutate to roll back
        onError:(_error, _hero, context)=>{
            queryClient.setQueryData('super-heroes', context?.prevHeroData)
        },

         // Always refetch after error or success:
        onSettled:()=>{
            queryClient.invalidateQueries('super-heroes')
        },
        
    })
}