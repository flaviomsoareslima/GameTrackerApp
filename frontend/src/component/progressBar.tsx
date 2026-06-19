interface ValueProps {
    value: number;
}

function ProgressBar({ value }:ValueProps) {
  return (
    <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-green-500 transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default ProgressBar;