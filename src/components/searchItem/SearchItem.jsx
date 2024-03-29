import { useContext } from "react";
import { searchContext } from "../../context/searchContext";
import "./searchItem.css";
import {Link }from "react-router-dom";

const SearchItem = ({item}) => {
  
 // const {dispatch} = useContext(searchContext);

  
  return (
    <div className="searchItem">
      <img
        src={item?.photos[0]}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item?.type}</h1>
        <span className="siDistance">500m from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          {item?.title}
        </span>
        <span className="siFeatures">
          Entire studio • 1 bathroom • 21m² 1 full bed
        </span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item?.rating&&<div className="siRating">
          <span>Excellent</span>
          <button>{item?.rating}</button>
        </div>}
        
        <div className="siDetailTexts">
          <span className="siPrice">${item?.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`${item?._id}`}>
            <button className="siCheckButton">See availability</button>
          </Link>
            
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
