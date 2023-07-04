import "./featuredProperties.css";
import useFetch from "../../Hooks/useFetch"
import IsLoading from "../spinner/isloading";

const FeaturedProperties = () => {
  
  const {data,loading} = useFetch("http://localhost:5000/hotels?featured=true&limit=4");
  
  return (
    <div className="fp">
      {loading?<div className="loading-container"><IsLoading/></div>:<>{data&&data.map((img)=>(
        <div key={img?._id} className="fpItem">
        <img
          src={img?.photos}
          alt=""
          className="fpImg"
        />
        <span className="fpName">{img?.type}</span>
        <span className="fpCity">{img?.city}</span>
        <span className="fpPrice">Starting from $120</span>
        <div className="fpRating">
          {img?.rating&&<><button>{img?.rating}</button>
          <span>Excellent</span></>}
          
        </div>
      </div>
         
      
      ))}</>}
      
    </div>
  );
};

export default FeaturedProperties;
