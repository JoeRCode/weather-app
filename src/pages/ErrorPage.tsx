import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CircleX } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex mt-8">
      <div className="flex flex-col items-center gap-2 p-2 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-2 w-full">
          <div className="flex-shrink-0">
            <CircleX size={96} />
          </div>
          <div className="flex flex-col items-start text-left">
            <h1 className="text-2xl font-bold mb-2 pt-4">
              Ooops, da ist etwas schief gelaufen!
            </h1>
            <h2 className="text-lg mb-6">
              Leider existiert diese Seite nicht! Zur Homepage gehts per Button
              :)!
            </h2>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <Button size={"lg"}>
            <Link to={"/"}>Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
