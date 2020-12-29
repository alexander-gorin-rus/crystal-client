import React from 'react';
import StarRating from 'react-star-ratings';

export const showAverage = (p) => {
    if (p && p.ratings) {
        let ratingsArray = p && p.ratings;
        let total = [];
        let length = ratingsArray.length;
        ratingsArray.map((r) => total.push(r.star));
        let totalReduced = total.reduce((p, n) => p + n, 0);
        let highest = length * 5
        let result = (totalReduced * 5) / highest

        console.log('ratings result is: ', result);

        return (
            <div className="text-center pt-1 pb-3">
                <span>
                    <StarRating
                        starDimation="20px"
                        starSpacing="2px"
                        starColor="red"
                        editing={false}
                        rating={result} />
                    {" "} ({p.ratings.length})
                </span>
            </div>
        )
    }
}


