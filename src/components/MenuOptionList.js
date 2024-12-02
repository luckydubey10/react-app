const MenuOptionList = function(props) {
    return (
        <div className="flex justify-between items-center my-4 border-b-2 border-solid border-gray-300 p-2">
            <div className="w-[70%]">
            <h4 className="font-bold flex justify-start items-center gap-4"><span className="text-xs">{props.resData.isVeg ? '🟩' : '🟥'}</span> <span className="text-lg">{props.resData.name}</span></h4>
            <span className={`${props.resData.finalPrice ? 'strike' : ''} text-lg font-semibold`}>{props?.resData?.defaultPrice ? props?.resData?.defaultPrice/100 : ''}</span> <span>{props?.resData?.finalPrice ? props?.resData?.finalPrice/100 : ''}</span>
            <p className="font-semibold text-gray-700">⭐{props.resData.ratings.aggregatedRating.rating} ({props.resData.ratings.aggregatedRating.ratingCountV2})</p>
            <p className="text-gray-600 text-sm">{props.resData.description}</p>
            </div>
            <div className="w-[156px] h-[144px] border rounded-md [background:rgb(251,238,215)]">
                <img className="object-cover w-full h-full border rounded-md" src={'https://media-assets.swiggy.com/swiggy/' + props.resData.imageId}/>
            </div>
        </div>
    )
}

export default MenuOptionList