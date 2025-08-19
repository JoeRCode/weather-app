import { Github } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t backdrop-blur supports-[backdrop-filter]:bg-background/60 py-12">
      <div className="container mx-auto px-4 flex justify-center">
        <Link
          to={"https://github.com/JoeRCode/weather-app"}
          target="_blank"
          className="flex items-center gap-2"
        >
          <Github className="w-6 h-6" />
          <p>Github Repo</p>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
