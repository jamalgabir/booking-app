import {useEffect, useState} from "react";
import { puplicRequest ,userRequest} from "../components/RequestUrl";

const useFetch = (url) =>{

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    
    useEffect(()=>{
        
            const fetchdata = async ()=>{
                setLoading(true)
                try{
                    const res = await puplicRequest.get(url)
                    
                    setData(res.data);
                    setLoading(false);
                }catch(err){
                    console.log(err)
                    setError(err)
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
            
            setError(err)
        }
        setLoading(false)
        
    }
    return {data, loading, error,refetch}

};

export default useFetch;