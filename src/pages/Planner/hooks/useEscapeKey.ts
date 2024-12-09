import { useEffect } from "react";

interface UseEscapeKeyProps {
  onClose: () => void;
}

export const useEscapeKey = ({ onClose }: UseEscapeKeyProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);
};
