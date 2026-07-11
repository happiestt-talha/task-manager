"use client";

import { useQuery } from "@tanstack/react-query";
import { weatherApi } from "@/lib/api/weather";

export function useWeatherQuery(city?: string) {
    return useQuery({
        queryKey: ["weather-forecast", city],
        queryFn: () => weatherApi.getForecast(city),
        staleTime: 15 * 60 * 1000,
        retry: 1,
    });
}