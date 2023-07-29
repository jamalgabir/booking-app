import {useEffect, useState} from "react";
import { puplicRequest } from "../components/RequestUrl";
import { useNavigate } from "react-router-dom";

const useFetch = (url) =>{
    const navigate = useNavigate();
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
                    setLoading(false)
                    
                    console.log(err.response.data.message)
                    setError(err)
                }
                setLoading(false)
                
            }
            fetchdata();
            
       
            
    

    },[url,navigate]);
    const refetch = async ()=>{
        setLoading(true)
        try{
            const res = await puplicRequest.get(url)
            
            setData(res.data)
            setLoading(false)
        }catch(err){
            setLoading(false)
            setError(err)
        }
        setLoading(false)
        
    }
    return {data, loading, error,refetch}

};

export default useFetch;