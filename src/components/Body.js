import RES_DATA from "../utils/mockData"
import RestaurantCard, {AvgRatingRestCard} from "./restaurantCard"
import {useState, useEffect} from 'react'
import Shimmer from "./shimmer";
import {REACT_APP_API_URL} from './../utils/constant';
import { Link, useNavigate } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

console.log('RES_DATA', RES_DATA)

const BodyComponent = () =>{
    let [searchValue, setSearchValue] = useState(''); 

    //State Variable : Maintaints the State of variable.
    let [restaurantList, setRestaurantList] = useState([]);
    let [topRatedFlag, setTopRatedFlag] = useState([true]);
    let [filteredRestaurantList, setfilteredRestaurantList] = useState([]);

    const RestaurantCardWithAverageRating = AvgRatingRestCard(RestaurantCard);
    // let restaurantList = [];

    //This method is called after component is rendered.
    useEffect(()=>{
        console.log('use effect called...');
        fetchData();
    }, []);

    const fetchData = async ()=>{
        console.log('fetch data')
        const data = await fetch(REACT_APP_API_URL + '/dapi/restaurants/list/v5?lat=19.0759837&lng=72.8776559&page_type=DESKTOP_WEB_LISTING');

        const json = await data.json();
        const cardDetailedList = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        setRestaurantList(cardDetailedList);
        setfilteredRestaurantList(cardDetailedList);
        console.log('after set', restaurantList)
        console.log('json data>>>>', json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }

    console.log('BodyComponent>>>');
    const onlineStatus = useOnlineStatus();
    if(!onlineStatus){
        return (
            <h1>Looks like you are offline! Try reconnecting the network!!</h1>
        )
    }

    return filteredRestaurantList?.length == 0 ? <Shimmer/> : (
        <div className='bodyLayout m-3'>
            <div className="top-section flex justify-between mb-5">
            <div className="filter-section ">
                <button className={`filter-btn border border-solid rounded-full pr-2 pl-2 shadow-md text-white text-sm ${topRatedFlag ? 'bg-gray-600': 'bg-purple-700'}`} onClick={
                    ()=>{
                        
                        
                        console.log('Button CLicked', topRatedFlag);
                        if(topRatedFlag){
                            const filteredList = restaurantList = restaurantList.filter(e=> e.info.avgRating > 4);
                        setfilteredRestaurantList(filteredList);
                        } else{
                            setfilteredRestaurantList(restaurantList);
                        }
                        
                        setTopRatedFlag(!topRatedFlag);
                        // console.log('restaurantList>>>', restaurantList, filteredList)
                    }
                }>Top Rated Restaurant</button>
            </div>
            <div className="search-section flex gap-2">
                <input className="border border-solid rounded-xl px-2 border-black" type="text" value={searchValue} onChange={(e)=>{
                    if(e.target.value.length == 0){
                        setfilteredRestaurantList(restaurantList);
                    }
                    setSearchValue(e.target.value);
                }}/>
                <button className="border border-solid rounded-full pr-2 pl-2 bg-blue-700 text-white text-sm" onClick={()=>{
                    // setfilteredRestaurantList(restaurantList);
                    console.log('restaurantList', restaurantList)
                    console.log('filteredRestaurantList', filteredRestaurantList)
                    console.log('search value>>>', searchValue);
                    const searchedList = restaurantList.filter(e=>{
                        console.log('e',  e.info.name.includes(searchValue))
                        return e.info.name.toLowerCase().includes(searchValue.toLowerCase());
                    });
                    console.log('searchedList', searchedList)
                    setfilteredRestaurantList(searchedList);
                }}>Search</button>
            </div>
            </div>
            <div className='card-container flex flex-wrap gap-4'>
            {filteredRestaurantList.map(item => {
                console.log('item of rest list...', item);
               return (
                // <Link to={`/restaurant/${item?.info?.id}`}>
                item?.info?.avgRating > 4 ? <RestaurantCardWithAverageRating key={item?.info?.name} resData={item?.info} offerData={item?.info?.aggregatedDiscountInfoV3}/> : <RestaurantCard key={item?.info?.name} resData={item?.info} offerData={item?.info?.aggregatedDiscountInfoV3}/>
            //   </Link>
               )}
               )}
            </div>
        </div>
    )
}

export default BodyComponent
