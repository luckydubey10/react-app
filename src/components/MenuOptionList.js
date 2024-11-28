const MenuOptionList = function(props) {
    console.log('card row data', props.resData, props?.resData?.defaultPrice);
    return (
        <div className="card-row">
            <div>
            <span>{props.resData.isVeg ? 'Veg': 'Non Veg'}</span>
            <h4>{props.resData.name}</h4>
            <span className={props.resData.finalPrice ? 'strike' : ''}>{props?.resData?.defaultPrice ? props?.resData?.defaultPrice/100 : ''}</span> <span>{props?.resData?.finalPrice ? props?.resData?.finalPrice/100 : ''}</span>
            <p>{props.resData.ratings.aggregatedRating.rating} ({props.resData.ratings.aggregatedRating.ratingCountV2})</p>
            <p>{props.resData.description}</p>
            </div>
            <div className="card-row-image">
                <img src={'https://media-assets.swiggy.com/swiggy/' + props.resData.imageId}/>
            </div>
        </div>
    )
}

export default MenuOptionList