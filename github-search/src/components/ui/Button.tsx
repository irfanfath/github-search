import { ButtonHTMLAttributes } from "react";

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
      {...props}
    />
  );
};

export default Button;
