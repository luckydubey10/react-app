import { useEffect, useState } from "react";
// import { useParams } from 'react-router-dom';
import { useParams } from "react-router-dom";
import MenuOptionList from "./MenuOptionList";

const RestaurantMenu = () => {
  const { resId } = useParams();
  console.log("id 1>>>", resId);
  let [restMenuInfo, setRestMenuInfo] = useState([]);
  let [restMenuDeals, setRestMenuDeals] = useState([]);
  let [restMenuRecommondedOptions, setRestMenuRecommondedOptions] = useState([]);
  let [restTopPicks, setRestTopPicks] = useState([]);
  useEffect(() => {
    // console.log('id>>>>', id)
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    // console.log('id>>>', id)
    // 28405
    const data = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.0759837&lng=72.8776559&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`
    );
    const json = await data.json();
    setRestMenuInfo(json.data.cards[2]);
    setRestMenuDeals(
      json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers
    );
    setRestTopPicks(
      json?.data?.cards[4]["groupedCard"]["cardGroupMap"]["REGULAR"][
        "cards"
      ][1]["card"]["card"]["carousel"]
    );
    setRestMenuRecommondedOptions(json?.data?.cards[4]["groupedCard"]["cardGroupMap"]["REGULAR"][
        "cards"
      ][2]["card"]["card"]["itemCards"]?.sort((a,b)=>{
        return a-b
      }))
    console.log('check or recomm', json?.data?.cards[4]["groupedCard"]["cardGroupMap"]["REGULAR"][
        "cards"
      ][2]["card"]["card"]["itemCards"])
    console.log("json check", json?.data?.cards);
  };

  return (
    <div>
      <h2>{restMenuInfo?.card?.card?.info?.name}</h2>
      <div className="rest-menu-info-div">
        <div className="rest-menu-info">
          <h5>
            {restMenuInfo?.card?.card?.info?.avgRating}(
            {restMenuInfo?.card?.card?.info?.totalRatingsString}) -{" "}
            {restMenuInfo?.card?.card?.info?.costForTwoMessage}
          </h5>
          <h5>{restMenuInfo?.card?.card?.info?.cuisines.join(", ")}</h5>
          <h5>Outlet: {restMenuInfo?.card?.card?.info?.areaName}</h5>
          <h5>{restMenuInfo?.card?.card?.info?.sla?.slaString}</h5>
        </div>
      </div>
      <div>
        <h2>Deals for you</h2>
        <div className="deal-section">
          {restMenuDeals.map((e) => {
            return (
              <div>
                <h3>{e?.info?.header}</h3>
                {/* <h5>ENDS IN: <CountdownTimer expiryTime={restMenuDeals[0]?.info?.expiryTime}/></h5> */}
              </div>
            );
          })}
        </div>
      </div>
      <div className="menu-section">
        <h4 className="title">Menu</h4>
        <input placeholder="Search for dishes"></input>
        <div>Veg/Non Veg/ Bestseller</div>
      </div>
      <div className="title">Top Picks</div>
      <div className="carousel">
        {restTopPicks?.map((item) => {
          return (
            <div className="top-pick">
              <img
                src={
                  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/" +
                  item.creativeId
                }
              />
              <div className="add-to-cart">
                <span>{item.dish.info.defaultPrice / 100}</span>
                <button>Add</button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="title">Recommended ({restMenuRecommondedOptions?.length})</div>
       { restMenuRecommondedOptions?.map(item=>{
        return (
            <MenuOptionList key={item.card.info.name} resData={item.card.info}/>
        )
       })}

    </div>
  );
};

export default RestaurantMenu;
