import { useTransition } from "react";

type ButtonClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;

interface ButtonProps {
  children: React.ReactNode;
  onClick: (event: ButtonClickEvent) => void;
}

export function Button({ children, onClick }: ButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleClick = (e: ButtonClickEvent) => {
    startTransition(() => {
      onClick(e);
    });
  };

  return (
    <button disabled={isPending} onClick={handleClick}>
      {children}
    </button>
  );
}
