import { ReactNode } from "react";

const Card = ({ children, onClick }: { children: ReactNode; onClick?: () => void }) => {
  return (
    <div className="border p-4 rounded shadow hover:bg-gray-100 cursor-pointer" onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
