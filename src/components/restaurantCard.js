const RestaurantCard = (props) =>{
console.log('RestaurantCard>>>>', props)
    const {resData} = props;
    const {offerData} = props;
    console.log('props>>', props);
    const {
        name,
        locality,
        avgRating,
        costForTwo,
        deliveryTime,
        cuisines,
        cloudinaryImageId
    } = resData;

    const {
        header,
        subHeader,
        discountTag
    } = offerData || {};

    console.log('resData?.data', resData);
    console.log('offfer data', offerData);
    const cuisinesData = cuisines.join(', ');
    const imageUrl = 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/' + cloudinaryImageId;
    const offer = header?.concat(' ' + subHeader ? subHeader + ' ' : '').concat(' ', discountTag ? discountTag + ' ' : '') || 'NA'; 
    console.log('offer data', offer)
    console.log('cuisinesData>>>', cuisinesData);
    return (
        <div className='card'>
            <div className="image-area">
        <img width="15%" height="15%" src={imageUrl}></img>
        <span className="offer-text">{offer}</span>
        </div>
            <div className='card-content'>
            <div className='card-info'>                    
            <h4>{name || 'NA'}</h4>
            <p className="cuisine-info">{cuisinesData}</p>
            <p className="locality-info">{locality || 'NA'}</p>
            </div>
            <div className='card-details'>
                <span>{avgRating || 'NA'}</span>
                <span className="cuisine-info">{costForTwo || 'NA'}</span>
                <span className="locality-info">{deliveryTime || 'NA'}</span>
            </div>
            </div>
        </div>
    )
}

export default RestaurantCard