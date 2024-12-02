import MenuOptionList from "./MenuOptionList";
import {useState} from 'react';

const RestaurantCategory = (props) =>{ 
    let [showMenuOption, setMenuOption] = useState(false);
    
    const categoryList = props.resCategory;
    const listItem = categoryList?.card?.card?.itemCards ? categoryList?.card?.card?.itemCards : categoryList?.card?.card?.categories?.itemCards;

    return (
        <div className="">
        <div onClick={()=>{
            setMenuOption(!showMenuOption);
        }} className="cursor-pointer flex justify-between items-center my-4 shadow-lg p-2 border border-solid border-gray-400 rounded-lg">
        <div className="font-bold text-lg">{categoryList?.card?.card?.title} {categoryList?.card?.card?.itemCards?.length ? '(' + (categoryList?.card?.card?.itemCards?.length) + ')': ''}
        </div>
        <span>🔽</span>
        </div>

        { listItem?.map(list=>{
        return(<div className="">
            {showMenuOption &&  <MenuOptionList key={list?.card?.info?.name} resData={list?.card?.info}/>}
        </div>)
        })
        }
        
        </div>
        
    )
}

export default RestaurantCategory;