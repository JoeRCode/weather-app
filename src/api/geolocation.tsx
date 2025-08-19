import { API_CONFIG } from "./config";

export type City = {
  results: [
    {
      id: number;
      name: string;
      latitude: number;
      longitude: number;
      admin1?: string;
      admin2?: string;
      admin3?: string;
      admin4?: string;
    }
  ];
};

export const getGeoLocation = async (cityName: string): Promise<City> => {
  const res = await fetch(
    `${API_CONFIG.GEO_URL}/search?name=${cityName}&count=10&language=de&format=json&countryCode=DE`
  );

  if (!res.ok) throw new Error("Ort nicht gefunden!");

  const data = await res.json();
  return data;
};
