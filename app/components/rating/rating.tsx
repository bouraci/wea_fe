import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";

type Props = {
  value: number;
  size?: SizeProp;
};

export function Rating({ value, size }: Props) {
  const fullStars = Math.floor(value);
  const halfStar = value - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="flex gap-1">
      {Array.from({ length: fullStars }).map((_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={faStar}
          className="text-yellow-500"
          size={size}
        />
      ))}

      {halfStar === 1 && (
        <FontAwesomeIcon
          icon={faStarHalfStroke}
          className="text-yellow-500"
          size={size}
        />
      )}

      {Array.from({ length: emptyStars }).map((_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={faStarEmpty}
          className="text-yellow-500"
          size={size}
        />
      ))}
    </div>
  );
}
