

import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { StarRatingProps } from '../../types/Review';

const StarRating: React.FC<StarRatingProps> = ({ totalStars, initialRating = 0, onChange }) => {
  const colors = ['red', 'orange', 'yellow', 'lightgreen', 'green']; 

  const handleStarClick = (starIndex: number) => {
    onChange(starIndex + 1);
  };

  return (
    <div>
      {[...Array(totalStars)].map((_, index) => (
        <span
          key={index}
          onClick={() => handleStarClick(index)}
          style={{ cursor: 'pointer', color: index < initialRating ? colors[initialRating - 1] : 'gray' }}
        >
          {index < initialRating ? <StarIcon /> : <StarOutlineIcon />}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
