import { useEffect, useState } from "react";
import { HiOutlineStar, HiStar } from "react-icons/hi";

export function Rating({ getRating }) {
  const [value, setValue] = useState(1);

  const [hoverValue, setHoverValue] = useState(0);

  const handleMouseEnter = (index) => {
    setHoverValue(index);
  };

  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  const handleClick = (index) => {
    setValue(index);
    getRating(index);
  };

  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        const filled = starValue <= (hoverValue || value);

        return (
          <span
            key={index}
            style={{ cursor: "pointer" }}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starValue)}
          >
            {filled ? (
              <HiStar className="inline-block text-yellow-500 w-5 h-5" />
            ) : (
              <HiOutlineStar className="inline-block text-yellow-500 w-5 h-5" />
            )}
          </span>
        );
      })}
    </div>
  );
}
