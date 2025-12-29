import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

const COLORS = ["red", "blue", "black", "white"];
const STORAGE_KEY = "chat_username";

const generateUsername = () => {
  const word = COLORS[Math.floor(Math.random() * COLORS.length)];
  return `${word}-monkey-${nanoid(4)}`;
};

export const useUsername = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const main = () => {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        setUsername(stored);
        return;
      }

      const generated = generateUsername();
      localStorage.setItem(STORAGE_KEY, generated);
      setUsername(generated);
    };

    main();
  }, []);

  return { username };
};
