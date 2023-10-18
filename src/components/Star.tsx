import { FaStar } from "react-icons/fa";
interface StarProps {
  filled: boolean;
  onClick: (value: any) => void; // Accept a value argument
  value: number;
  name: string;
}

function Star({ filled, onClick, value }: StarProps) {
  return (
    <FaStar
      color={filled ? "orange" : "lightgray"}
      onClick={() => onClick(value)} //
    />
  );
}

export default Star;
