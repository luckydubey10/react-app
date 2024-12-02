import { useEffect, useState } from "react";
// import { useParams } from 'react-router-dom';
import { useParams } from "react-router-dom";
import MenuOptionList from "./MenuOptionList";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const { resId } = useParams();
  let [restMenuInfo, setRestMenuInfo] = useState([]);
  let [restMenuDeals, setRestMenuDeals] = useState([]);
  let [restMenuRecommondedOptions, setRestMenuRecommondedOptions] = useState([]);
  let [restTopPicks, setRestTopPicks] = useState([]);
  let [accordionData, setAccordionData] = useState([]);
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
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
    setAccordionData(json?.data?.cards[4]["groupedCard"]["cardGroupMap"]["REGULAR"][
      "cards"].slice(2))
  };

  return (
    <div className="w-3/5 mx-auto my-auto">
      <h2 className="text-center font-extrabold text-xl">{restMenuInfo?.card?.card?.info?.name}</h2>
      <div className="rest-menu-info-div text-center border border-solid border-black shadow-xl rounded-xl my-5 bg-pink-50 p-2">
        <div className="rest-menu-info text-sm">
          <h5 className="font-semibold">
            {restMenuInfo?.card?.card?.info?.avgRating}(
            {restMenuInfo?.card?.card?.info?.totalRatingsString}) -{" "}
            {restMenuInfo?.card?.card?.info?.costForTwoMessage}
          </h5>
          <h5 className="font-semibold text-orange-400 underline">{restMenuInfo?.card?.card?.info?.cuisines.join(", ")}</h5>
          <h5><span className="font-bold">Location:</span> {restMenuInfo?.card?.card?.info?.areaName}</h5>
          <h5 className="font-bold">{restMenuInfo?.card?.card?.info?.sla?.slaString}</h5>
        </div>
      </div>
      <div className="">
        <h2 className="font-bold text-lg my-5">Deals for you</h2>
        <div className="flex justify-start gap-5 flex-wrap">
          {restMenuDeals.map((e) => {
            return (
              <div className="border-gray-400 border border-solid rounded-xl w-[250px] px-10 py-5 bg-green-50">
                <h3 className="font-extrabold text-md">{e?.info?.header}</h3>
                {/* <h5>ENDS IN: <CountdownTimer expiryTime={restMenuDeals[0]?.info?.expiryTime}/></h5> */}
              </div>
            );
          })}
        </div>
      </div>
      <div className="my-5 flex-row text-center">
        <h4 className="font-bold text-xl">Menu</h4>
        <input placeholder="Search for dishes" className="border border-gray-200 rounded-lg p-2 w-[100%]"></input>
        <div className="m-2 flex justify-start font-semibold">Veg/Non Veg/ Bestseller</div>
      </div>
      <div className="font-bold text-xl">Top Picks</div>
      <div className={`flex justify-start gap-5 ${restTopPicks.length > 3 ? 'overflow-x-scroll' : ''}`}>
        {restTopPicks?.map((item) => {
          return (
            <div className="top-pick relative">
              <img className="w-[600px] h-[200px] max-w-min"
                src={
                  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/" +
                  item.creativeId
                }
              />
              <div className="w-full bottom-0 text-white bg-custom-gradient overflow-hidden h-9 p-2 absolute flex justify-between">
                <span className="font-bold">{item.dish.info.defaultPrice / 100}</span>
                <button className="border border-black rounded-lg px-2 bg-white text-black text-sm h-auto">Add</button>
              </div>
            </div>
          );
        })}
      </div>

      { accordionData.map(item=>{
      return ( 
        <RestaurantCategory key={item?.card?.card?.title} resCategory={item}/>
      )
})
}

    </div>
  );
};

export default RestaurantMenu;
