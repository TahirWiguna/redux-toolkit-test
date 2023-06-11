import { ReactNode } from "react";

const Button = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) => {
  return <button {...props}>{children}</button>;
};

export default Button;
