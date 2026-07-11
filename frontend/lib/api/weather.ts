import axios from "axios";

const WEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface ForecastEntry {
    dateTime: string;
    temp: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    description: string;
    icon: string;
}

export interface ForecastData {
    city: string;
    entries: ForecastEntry[];
}

export const weatherApi = {
    getForecast: async (city: string = "Lahore"): Promise<ForecastData> => {
        const { data } = await axios.get(`${WEATHER_BASE_URL}/forecast`, {
            params: {
                q: city,
                appid: WEATHER_API_KEY,
                units: "metric",
            },
        });

        const entries: ForecastEntry[] = data.list.map((item: any) => ({
            dateTime: item.dt_txt,
            temp: Math.round(item.main.temp),
            feelsLike: Math.round(item.main.feels_like),
            humidity: item.main.humidity,
            windSpeed: item.wind.speed,
            description: item.weather[0].description,
            icon: item.weather[0].icon,
        }));

        return {
            city: data.city.name,
            entries,
        };
    },
};