import { X } from "lucide-react";
import React, { FC, ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface DialogProps {
  children?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Dialog: FC<DialogProps> = ({ children, isOpen = false, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isOpen) return;

    const handleClose = (e: MouseEvent) => {
      if (!ref || !ref.current) return;
      const target = e.target as Node;

      if (!ref.current.contains(target)) {
        onClose();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }
  return createPortal(
    <div className="fixed inset-0 pointer-events-auto bg-black/50 z-50 flex items-center justify-center">
      <div
        ref={ref}
        className="min-h-80 max-h-[95dvh] overflow-auto w-[calc(100%-2rem)] sm:w-[90%] max-w-2xl bg-card p-6 relative rounded-lg"
      >
        <button
          className="aspect-square hover:bg-foreground/10 transition p-2 rounded-md absolute top-2 right-2"
          onClick={onClose}
        >
          <X className="size-5" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Dialog;
