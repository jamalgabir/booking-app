import "./reserve.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import useFetch from '../../Hooks/useFetch';

const Reserve = ({setOpen,hotelId}) => {
    const {data,loading} = useFetch(`/rooms/${hotelId}`);
    console.log(data)
  return (
    <div className='reserve'>
       <div className='rcontainer'>
        <FontAwesomeIcon
        icon={faCircleXmark}
        className='rClose'
        onClick={() => setOpen(false)}
        />
        <span>Select your rooms</span>
        {data.map((item)=>(
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