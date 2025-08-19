import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CommandGroup, CommandItem, CommandSeparator } from "cmdk";
import { getGeoLocation } from "@/api/geolocation";
import WeatherCard from "./WeatherCard";

import type { City } from "../api/geolocation";
import { Loader } from "lucide-react";

const SearchInput = () => {
  const [cityName, setCityName] = useState("");
  const [selected, setSelected] = useState(false);
  const [selectedLon, setSelectedLon] = useState(0);
  const [selectedLat, setSelectedLat] = useState(0);
  const [selectedName, setSelectedName] = useState("");

  const { data, isLoading, isError, error } = useQuery<City>({
    queryKey: ["citySearch", cityName],
    queryFn: () => getGeoLocation(cityName),
    enabled: cityName.length >= 3,
  });

  const handleSelect = (cityData: string) => {
    const [name, lat, lon] = cityData.split("-");
    console.log(name, lat, lon);
    setSelectedLat(Number(lat));
    setSelectedLon(Number(lon));
    setSelectedName(name);
    setCityName("");
    setSelected(true);
  };

  return (
    <div className="mt-4">
      <Command>
        <CommandInput
          placeholder="Eine Stadt suchen ..."
          value={cityName}
          onValueChange={setCityName}
        />
        <CommandList>
          {cityName.length > 2 && !isLoading && (
            <CommandEmpty>Keine Stadt gefunden.</CommandEmpty>
          )}
          <CommandSeparator />

          {data && (
            <CommandGroup heading="Stadt">
              {isLoading && (
                <CommandItem>
                  <div className="flex item-center justify-center p-4">
                    <Loader className="h-8 w-8 mt-2 animate-spin" />
                  </div>
                </CommandItem>
              )}
              {isError && (
                <div className="p-4">
                  Error:
                  {error instanceof Error
                    ? error.message
                    : "Failed to load data"}
                </div>
              )}
              {data.results?.map((city) => (
                <CommandItem
                  key={city.id}
                  value={`${city.name}-${city.latitude}-${city.longitude}`}
                  onSelect={handleSelect}
                  className="hover:border hover:border-white rounded-sm transition-all duration-200"
                >
                  <span className="text-sm text-muted-foreground pl-1">
                    {city.name}
                    {city.admin1 && <span>, {city.admin1}</span>}
                    {city.admin2 && <span>, {city.admin2}</span>}
                    {city.admin3 && <span>, {city.admin3}</span>}
                    {city.admin4 && <span>, {city.admin4}</span>}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </Command>

      {selected && (
        <WeatherCard
          lat={selectedLat}
          lon={selectedLon}
          cityName={selectedName}
        />
      )}
    </div>
  );
};

export default SearchInput;
