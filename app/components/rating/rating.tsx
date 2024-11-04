import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";
import miregGood from "assets/mireg-good.png";
import miregBad from "assets/mireg-bad.png";
import Image from "next/image";

export function Rating({ value }: { value: number }) {
  const fullStars = Math.floor(value);
  const halfStar = value - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;
  const mireg = value >= 4 ? miregGood : miregBad;

  return (
    <div className="flex gap-1">
      {Array.from({ length: fullStars }).map((_, index) => (
        // <FontAwesomeIcon
        //   key={index}
        //   icon={faStar}
        //   className="text-yellow-500"
        // />
        <Image key={index} src={mireg} alt="mireg" width={16} height={16} />
      ))}

      {halfStar === 1 && (
        // <FontAwesomeIcon icon={faStarHalfStroke} className="text-yellow-500" />
        <Image src={mireg} alt="mireg" width={16} height={16} />
      )}

      {Array.from({ length: emptyStars }).map((_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={faStarEmpty}
          className="text-yellow-500"
        />
      ))}
    </div>
  );
}
