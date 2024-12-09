// components/ThemeSwitcher.tsx
import { Button } from "@nextui-org/react";
import {useTheme} from "next-themes";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div>
      {/* The current theme is: {theme} */}
      <Button onClick={() => setTheme('light')}>Light Mode</Button>
      <Button onClick={() => setTheme('dark')}>Dark Mode</Button>
    </div>
  )
};