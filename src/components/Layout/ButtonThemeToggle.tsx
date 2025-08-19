import { Sun, Moon } from "lucide-react";
import { Button } from "../ui/button";

interface ButtonThemeToggleProps {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

const ButtonThemeToggle = ({
  isDarkTheme,
  toggleTheme,
}: ButtonThemeToggleProps) => {
  return (
    <Button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    >
      {isDarkTheme ? (
        <Sun className="h-6 w-6 text-yellow-500 transition-all" />
      ) : (
        <Moon className="h-6 w-6 text-blue-500 transition-all" />
      )}
    </Button>
  );
};

export default ButtonThemeToggle;
