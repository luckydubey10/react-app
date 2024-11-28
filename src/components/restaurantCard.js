import { useNavigate } from "react-router-dom";

const RestaurantCard = (props) => {
  const navigate = useNavigate();

  console.log("RestaurantCard>>>>", props);
  const { resData } = props;
  const { offerData } = props;
  console.log("props>>", props);
  const {
    name,
    locality,
    avgRating,
    costForTwo,
    deliveryTime,
    cuisines,
    cloudinaryImageId,
  } = resData;

  const { header, subHeader, discountTag } = offerData || {};

  console.log("resData?.data", resData);
  console.log("offfer data", offerData);
  const deliveryString = resData.sla.slaString;
  const cuisinesData = cuisines.join(", ");
  const imageUrl =
    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
    cloudinaryImageId;
  const offer =
    header
      ?.concat(" " + subHeader ? subHeader + " " : "")
      .concat(" ", discountTag ? discountTag + " " : "") || "";
  console.log("offer data", offer);
  console.log("cuisinesData>>>", cuisinesData);

  const handleCardClick = (resData) => {
    console.log("handleCardClick", resData);
    navigate(`/restaurant/${resData?.id}`);
  };

  return (
    <div
      className="card p-2 w-[240px] h-[280px] rounded-lg bg-pink-100"
      onClick={() => {
        handleCardClick(resData);
      }}
    >
      <div className="image-area relative">
        <img className="w-full h-[148px] rounded-lg" src={imageUrl}></img>
        <span className="w-full absolute top-28 text-white bg-custom-gradient overflow-hidden h-9 p-2">
          {offer}
        </span>
      </div>
      <div className="card-content">
        <div className="card-info">
          <h4 className="font-bold truncate hover:text-clip">{name || "NA"}</h4>
          <p className="font-semibold text-sm truncate hover:text-clip">
            {cuisinesData}
          </p>
          <p className="text-sm">{locality || "NA"}</p>
        </div>
        <div className="card-details">
          <span>{"⭐" + avgRating || "NA"} - </span>
          <span className="text-sm">{costForTwo || "NA"}</span>
          <div className="text-sm">{deliveryString ? deliveryString : ""}</div>
        </div>
      </div>
    </div>
  );
};

export const AvgRatingRestCard = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute border text-white rounded-xl z-10 bg-green-400 px-2 text-sm">Top Rated</label>
        <RestaurantCard {...props}></RestaurantCard>
      </div>
    );
  };
};

export default RestaurantCard;
