"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export type CursorVariant = "default" | "pointer" | "text" | "magnetic" | "hidden";

interface CursorContextType {
  variant: CursorVariant;
  text: string;
  isHovering: boolean;
  setVariant: (variant: CursorVariant) => void;
  setText: (text: string) => void;
  setIsHovering: (hovering: boolean) => void;
  enterHover: (variant?: CursorVariant, text?: string) => void;
  leaveHover: () => void;
}

const CursorContext = createContext<CursorContextType>({
  variant: "default",
  text: "",
  isHovering: false,
  setVariant: () => {},
  setText: () => {},
  setIsHovering: () => {},
  enterHover: () => {},
  leaveHover: () => {},
});

export function useCursor() {
  return useContext(CursorContext);
}

export function CursorProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [text, setText] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  const enterHover = useCallback((newVariant: CursorVariant = "pointer", newText = "") => {
    setVariant(newVariant);
    setText(newText);
    setIsHovering(true);
  }, []);

  const leaveHover = useCallback(() => {
    setVariant("default");
    setText("");
    setIsHovering(false);
  }, []);

  return (
    <CursorContext.Provider
      value={{
        variant,
        text,
        isHovering,
        setVariant,
        setText,
        setIsHovering,
        enterHover,
        leaveHover,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}
