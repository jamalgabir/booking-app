import {useEffect, useState} from "react";
import { puplicRequest } from "../components/RequestUrl";

const useFetch = (url) =>{

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    
    useEffect(()=>{
        
            const fetchdata = async ()=>{
                setLoading(true)
                try{
                    const res = await puplicRequest.get(url)
                    
                    setData(res.data);
                    setLoading(false);
                }catch(err){
                    setError(err?.response?.data?.message)
                    setLoading(false)
                    
                    
                    
                }
                setLoading(false)
                
            }
            fetchdata();
            
       
            
    

    },[url]);
    const refetch = async ()=>{
        setLoading(true)
        try{
            const res = await puplicRequest.get(url)
            
            setData(res.data)
            setLoading(false)
        }catch(err){
            setLoading(false)
            setError(err?.response?.data?.message)
        }
        setLoading(false)
        
    }
    return {data, loading, error,refetch}

};

export default useFetch;