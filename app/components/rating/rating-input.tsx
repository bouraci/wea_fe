"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

export function RatingInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const fullStars = Math.floor(value);
  const [hovered, setHovered] = useState<number | undefined>(undefined);

  const handleMouseEnter = (index: number) => {
    setHovered(index + 1);
  };

  const handleMouseLeave = () => {
    setHovered(undefined);
  };

  const handleClick = (index: number) => {
    onChange(index + 1);
  };

  const getStarIcon = (index: number) => {
    if (hovered !== undefined) {
      return index < hovered ? faStar : faStarEmpty;
    }
    return index < fullStars ? faStar : faStarEmpty;
  };

  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={getStarIcon(index)}
          className="text-yellow-500 cursor-pointer"
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
}
