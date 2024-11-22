type Props = {
  amount: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

export function AmountInput({ amount, onIncrease, onDecrease }: Props) {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onDecrease}
        className="px-2 py-1 rounded hover:bg-gray-300/10"
      >
        -
      </button>
      <span className="text-lg font-medium">{amount}</span>
      <button
        onClick={onIncrease}
        className="px-2 py-1 rounded hover:bg-gray-300/10"
      >
        +
      </button>
    </div>
  );
}
