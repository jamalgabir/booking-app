import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../Hooks/useFetch";
import IsLoading from "../../components/spinner/isloading";
import { searchContext } from "../../context/searchContext";

const List = () => {

  const location = useLocation();

  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min,setMin] = useState(1)
  const [max,setMax] = useState(999);
  // const [data,setData] = useState([DADA?.data])
  // const [loading,setLoading] = useState(DADA?.loading)
  const {data,loading,refetch} = useFetch(`/hotels?cities=${destination}&featured=true&min=${min}&max=${max}`)
  const {dispatch} = useContext(searchContext)
  
  
  const handleChange = (e) =>{
    setOptions(prev=>({...prev,[e.target.name]: e.target.value}));
  }
  const HandleSearch =()=>{

    dispatch({type:"NEW_SEARCH",payload:{destination:destination,options:options,dates:date}})
    
    refetch()
      
  }
 
  return (

    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} onChange={(e)=>setDestination(e.target.value)} type="text" />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0]?.startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0]?.endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item?.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" onChange={(e)=>setMin(e.target.value)} className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" onChange={(e)=>setMax(e.target.value)} className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                  onChange={(e)=>handleChange(e)}
                    name="adult"
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                  onChange={(e)=>handleChange(e)}
                  name="children"
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                  onChange={(e)=>handleChange(e)}
                  name="room"
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={()=>HandleSearch()} >Search</button>
          </div>
          <div className="listResult">
            {loading?<div className="list-loading"><IsLoading open={loading}/></div>:<>{
              data?.length?data.map(item=>(
                <SearchItem item={item}  key={item?._id}/>
                
              )):(<div className="noitem"><div>There Is No Items! {data.length}</div></div>)
            }</>}
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
