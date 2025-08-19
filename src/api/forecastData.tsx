import { API_CONFIG } from "./config";

export interface ForecastData {
  current?: {
    time: string;
    temperature_2m: number;
    precipitation: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
  };
  daily?: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    wind_speed_10m_max: number[];
    wind_direction_10m_dominant: number[];
  };
}

export const getForecastData = async (
  lat: number,
  lon: number
): Promise<ForecastData> => {
  const res = await fetch(
    `${API_CONFIG.FORECAST_URL}forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant&current=wind_speed_10m,wind_direction_10m,precipitation,temperature_2m&timezone=Europe%2FBerlin`
  );

  if (!res.ok) throw new Error("Ort nicht gefunden!");

  const data = await res.json();
  console.log(data);
  return data;
};
