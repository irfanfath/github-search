import { InputHTMLAttributes } from "react";

const FormInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <input className="border p-2 rounded w-full" {...props} />;
};

export default FormInput;
