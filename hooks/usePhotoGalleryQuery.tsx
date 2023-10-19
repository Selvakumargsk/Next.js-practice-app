import axios from "axios"
import { useQuery } from "react-query"

const fetchAllPhotos = (url: any) =>{
   return axios.get(url)
}

export const usePhotogallery = (url : any , data:any) =>{
    return useQuery('Gallery' , ()=>fetchAllPhotos(url + `?_page=${data?.currentPage}&_limit=${data?.PHOTOS_PER_PAGE}`))
}