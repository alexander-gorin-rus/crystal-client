import React from 'react';
import StarRating from 'react-star-ratings';
import RatingModal from '../modal/RatingModal';

const RatingComponent = ({ product }) => {

    const { _id } = product
    return (
        <div>
            <RatingModal>
                <StarRating
                    name={_id}
                    numberOfStars={5}
                    rating={3}
                    changeRating={(newRating, name) => (
                        console.log("new rating", newRating, "name", name)
                    )}
                    isSelectable={true}
                    starRatedColor="red"
                />
            </RatingModal>
        </div>
    )
}

export default RatingComponent
