import RES_DATA from "../utils/mockData"
import RestaurantCard from "./restaurantCard"
import {useState, useEffect} from 'react'
import Shimmer from "./shimmer";

console.log('RES_DATA', RES_DATA)

const BodyComponent = () =>{
    let [searchValue, setSearchValue] = useState(''); 

    //State Variable : Maintaints the State of variable.
    let [restaurantList, setRestaurantList] = useState([]);
    let [filteredRestaurantList, setfilteredRestaurantList] = useState([]);
    // let restaurantList = []; 

    //This method is called after component is rendered.
    useEffect(()=>{
        console.log('use effect called...');
        fetchData();
    }, [])

    const fetchData = async ()=>{
        console.log('fetch data')
        const data = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.0759837&lng=72.8776559&page_type=DESKTOP_WEB_LISTING');

        const json = await data.json();
        const cardDetailedList = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        setRestaurantList(cardDetailedList);
        setfilteredRestaurantList(cardDetailedList);
        console.log('after set', restaurantList)
        console.log('json data>>>>', json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }

    console.log('BodyComponent>>>');

    return filteredRestaurantList?.length == 0 ? <Shimmer/> : (
        <div className='bodyLayout'>
            <div className="top-section">
            <div className="filter-section">
                <button className="filter-btn" onClick={
                    ()=>{
                        console.log('Button CLicked');
                        const filteredList = restaurantList = restaurantList.filter(e=> e.info.avgRating > 4);
                        setRestaurantList(filteredList);
                        console.log('restaurantList>>>', restaurantList)
                    }
                }>Top Rated Restaurant</button>
            </div>
            <div className="search-section">
                <input type="text" value={searchValue} onChange={(e)=>{
                    if(e.target.value.length == 0){
                        setfilteredRestaurantList(restaurantList);
                    }
                    setSearchValue(e.target.value);
                }}/>
                <button onClick={()=>{
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
            <div className='card-container'>
            {filteredRestaurantList.map(item => {
                console.log('item of rest list...', item);
               return (
               <RestaurantCard key={item?.info?.name} resData={item?.info} offerData={item?.info?.aggregatedDiscountInfoV3}/>
               )}
               )}
            </div>
        </div>
    )
}

export default BodyComponent