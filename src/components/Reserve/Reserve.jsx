import "./reserve.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import useFetch from '../../Hooks/useFetch';
import IsLoading from "../spinner/isloading";

const Reserve = ({setOpen,hotelId,setBtn}) => {
    const {data,loading} = useFetch(`/rooms/${hotelId}`);
    const handlClose = () =>{
      setOpen(false)
      setBtn(false)
    }
    return (
    <div className='reserve'>
      
       <div className='rcontainer'>
        <FontAwesomeIcon
        icon={faCircleXmark}
        className='rClose'
        onClick={() => handlClose()}
        />
        <span>Select your rooms</span>

        {loading?<IsLoading/>:data.map((item)=>(
          <div key={item._id} className="ritem">
            <div className="rinfo">
              <div className="title">{item?.disc}</div>
              <div className="title">{item?.title}</div>
            </div>
          </div>
        ))}
       </div>
       
    </div>
  )
};

export default Reserve;