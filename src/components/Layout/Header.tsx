import { Link } from "react-router-dom";
import { useTheme } from "@/context/theme-provider";
import ThemeToggle from "./ButtonThemeToggle";
import { Waves } from "lucide-react";
import Title from "./Title.tsx";
import { motion } from "framer-motion";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDarkTheme: boolean = theme?.toLowerCase() === "dark";

  const handleToggleTheme = () => {
    setTheme(isDarkTheme ? "light" : "dark");
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md py-2 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to={"/"} onClick={handleClick}>
          <div className="h-16 mt-4">
            <motion.div
              animate={{
                y: [0, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            >
              <Waves
                size={48}
                className="animate-wave"
                color={isDarkTheme ? "cyan" : "blue"}
              />
            </motion.div>
          </div>
        </Link>

        <Link to={"/"} onClick={handleClick}>
          <Title text="Check Dein Wetter" />
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle
            isDarkTheme={isDarkTheme}
            toggleTheme={handleToggleTheme}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
