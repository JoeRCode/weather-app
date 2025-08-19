import { getForecastData, type ForecastData } from "@/api/forecastData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateInGerman } from "@/functions/formatGermanDay";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowDown,
  ArrowUp,
  Loader,
  ThermometerSun,
  Umbrella,
  Wind,
  WindArrowDown,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface WeatherCardProps {
  lat: number;
  lon: number;
  cityName: string;
}

const WeatherCard = ({ lat, lon, cityName }: WeatherCardProps) => {
  const { data, isLoading, isError, error } = useQuery<ForecastData>({
    queryKey: ["forecastData", cityName, lat, lon],
    queryFn: () => getForecastData(lat, lon),
    enabled: !!lat && !!lon && !!cityName,
  });

  return (
    <div className="space-y-4">
      {isLoading && (
        <div className="flex items-center justify-center p-4">
          <Loader className="h-8 w-8 mt-2 animate-spin" />
        </div>
      )}
      {isError && (
        <div className="text-red-500 p-4">
          Error:
          {error instanceof Error ? error.message : "Failed to load data"}
        </div>
      )}
      {data && !isLoading && !isError && (
        <>
          <Card className="mt-4 gap-2">
            <CardHeader>
              <CardTitle className="text-center text-3xl">{cityName}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 grid-rows-2 gap-4 text-center">
                <div className="col-span-2">
                  {data.current?.time
                    ? formatDateInGerman(data.current?.time)
                    : "Keine Daten gefunden!"}
                </div>
                <div className="row-start-2 flex justify-center gap-2">
                  <span className="flex items-center">
                    <ThermometerSun color="yellow" size={20} />
                    <p className="pl-1">{data.current?.temperature_2m}°C</p>
                  </span>
                </div>
                <div className="row-start-2 flex justify-center gap-2">
                  <span className="flex items-center">
                    <ArrowUp size={20} color="red" />
                    <p className="pl-1">
                      {data.daily?.temperature_2m_max[0]}°C
                    </p>
                  </span>
                  <span className="flex items-center">
                    <ArrowDown size={20} color="blue" />
                    <p className="pl-1">
                      {data.daily?.temperature_2m_min[0]}°C
                    </p>
                  </span>
                </div>
                <div className="row-start-3 flex justify-center">
                  <span className="flex items-center">
                    <Umbrella size={20} color="blue" />
                    <p className="pl-1">{data.current?.precipitation} mm</p>
                  </span>
                </div>
                <div className="row-start-3 flex justify-center gap-2">
                  <span className="flex items-center">
                    <Wind size={20} color="lightblue" />
                    <p className="pl-1">{data.current?.wind_speed_10m} km/h</p>
                  </span>
                  <span className="flex items-center">
                    <WindArrowDown size={20} color="lightblue" />
                    <p className="pl-1">{data.current?.wind_direction_10m}°</p>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          <h1 className="text-center">Wettervorhersage</h1>
          <Carousel className="w-full">
            <CarouselContent>
              {data.daily?.time.slice(1).map((day: string, index: number) => (
                <CarouselItem key={day}>
                  <Card className="border shadow-sm">
                    <CardContent className="p-4 space-y-2">
                      <div className="grid grid-cols-2 grid-rows-2 gap-4 text-center">
                        <div className="col-span-2">
                          {formatDateInGerman(day)}
                        </div>
                        <div className="row-start-2 flex justify-center gap-2">
                          <span className="flex items-center">
                            <ArrowUp size={20} color="red" />
                            <p className="pl-1">
                              {data.daily?.temperature_2m_max[index + 1]}°C
                            </p>
                          </span>
                          <span className="flex items-center">
                            <ArrowDown size={20} color="blue" />
                            <p className="pl-1">
                              {data.daily?.temperature_2m_min[index + 1]}°C
                            </p>
                          </span>
                        </div>
                        <div className="row-start-2 flex justify-center">
                          <span className="flex items-center">
                            <Umbrella size={20} color="blue" />
                            <p className="pl-1">
                              {data.current?.precipitation} mm
                            </p>
                          </span>
                        </div>
                        <div className="row-start-3 flex justify-center">
                          <span className="flex items-center">
                            <Wind size={20} color="lightblue" />
                            <p className="pl-1">
                              {data.daily?.wind_speed_10m_max[index + 1]} km/h
                            </p>
                          </span>
                        </div>
                        <div className="row-start-3 flex justify-center">
                          <span className="flex items-center">
                            <WindArrowDown size={20} color="lightblue" />
                            <p className="pl-1">
                              {
                                data.daily?.wind_direction_10m_dominant[
                                  index + 1
                                ]
                              }
                              °
                            </p>
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </>
      )}
    </div>
  );
};

export default WeatherCard;
