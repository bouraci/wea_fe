import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

type Props = {
  amount: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

export function AmountInput({ amount, onIncrease, onDecrease }: Props) {
  return (
    <div className="w-max ml-auto">
      <div className="grid-cols-3 grid items-center">
        <button className="button--amount" onClick={onDecrease}>
          <FontAwesomeIcon icon={faMinus} size="lg" />
        </button>
        <span className="text-lg text-center font-medium">{amount}</span>
        <button onClick={onIncrease} className="button--amount">
          <FontAwesomeIcon icon={faPlus} size="lg" />
        </button>
      </div>
    </div>
  );
}
