import "./reserve.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import useFetch from '../../Hooks/useFetch';
import IsLoading from "../spinner/isloading";
import { useContext, useState } from "react";
import { searchContext } from "../../context/searchContext";

const Reserve = ({setOpen,hotelId,setBtn}) => {
    const [selectedRoom, setSelectedRoom] = useState([]);
    const {data, loading,error} = useFetch(`/rooms/${hotelId}`);
    const {dates} = useContext(searchContext);
    console.log(error)
    const getDateInRang = (start,end) =>{

      const date = new Date(start?.getTime());
      let list = [];

      while(data <= end){
        list.push(new Date(date))
        date.setDate(date.getDate()+1)
      }
      return list;

    };
    const a = new Date(dates[0]?.startDate)
    const b = new Date(dates[0]?.endDate)
    //console.log(`From ${a.getDate()}/${a.getMonth()} to ${b.getDate()}/${b.getMonth()}`)
    //console.log(a.getTime());
    
    const handleSelect = (e) =>{
      const selected = e.target.checked;
      const value = e.target.value;
      setSelectedRoom(selected?[...selectedRoom, value]
      :selectedRoom.filter((item) => item !== value))
    };
 
    const handlClose = () =>{
      setOpen(false)
      setBtn(false)
    };

    
    return (
    <div className='reserve'>
      
       <div className='rcontainer'>
        <FontAwesomeIcon
        icon={faCircleXmark}
        className='rClose'
        onClick={() => handlClose()}
        />
        <span>Select your room</span>
         
        {loading?<IsLoading/>:data?.map((item)=>(
          <div key={item._id} className="rItem">
            <div className="rItemInfo">
              <div className="rTitle">Hotel name: {item?.title}</div>
              <div className="rDes">Description: {item?.desc}</div>
              <div className="rMaxPeoples">Max people: {item?.maxPeoples}</div>
              <div className="rPrice">Price: ${item?.price}</div>
            </div>
            <div className="room">
              
                {item?.roomNumbers.map((room) => (
                <div key={room?._id}>
                  <label>Room: {room.number}</label>
                  <input value={room?._id} onChange={(e) => handleSelect(e)} type="checkbox"  />
                </div>
                
              ))}
              <button  className="rbottun">Reserve now</button>
              
            </div>
          </div>
        ))}
       </div>
       
    </div>
  )
};

export default Reserve;