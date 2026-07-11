"use client";

import Image from "next/image";
import { useState } from "react";
import { useWeatherQuery } from "@/hooks/queries/useWeatherQuery";
import { getDailyForecasts } from "@/lib/weather-utils";

export function WeatherWidget() {
    const [city, setCity] = useState("Lahore");
    const [inputValue, setInputValue] = useState("Lahore");

    const { data, isLoading, isError } = useWeatherQuery(city);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            setCity(inputValue.trim());
        }
    };

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-3">
            <form onSubmit={handleSubmit} className="flex gap-2 mb-2">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter city..."
                    className="flex-1 h-9 px-3 bg-surface-container-lowest border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-label-md"
                />
                <button
                    type="submit"
                    className="h-9 px-4 bg-primary text-on-primary font-bold rounded-lg hover:bg-on-surface-variant transition-standard active:scale-95 text-label-md flex items-center justify-center"
                >
                    Set
                </button>
            </form>

            {isLoading && (
                <div className="text-sm text-gray-400 animate-pulse">
                    Loading forecast...
                </div>
            )}

            {isError && (
                <div className="text-sm text-red-500">
                    City not found. Try again.
                </div>
            )}

            {data && (
                <>
                    <div className="text-xs text-gray-500 mb-2">
                        5-day forecast - {data.city}
                    </div>
                    <div className="flex gap-3 overflow-x-auto">
                        {getDailyForecasts(data.entries)
                            .slice(0, 5)
                            .map((day) => (
                                <div
                                    key={day.dateTime}
                                    className="flex flex-col items-center min-w-[64px] text-center"
                                >
                                    <span className="text-xs text-gray-500">
                                        {new Date(day.dateTime).toLocaleDateString(undefined, {
                                            weekday: "short",
                                        })}
                                    </span>
                                    <Image
                                        src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                                        alt={day.description}
                                        width={32}
                                        height={32}
                                        className="w-8 h-8"
                                    />
                                    <span className="text-sm font-medium">{day.temp}°C</span>
                                    <span className="text-[10px] text-gray-400 capitalize">
                                        {day.description}
                                    </span>
                                </div>
                            ))}
                    </div>
                </>
            )}
        </div>
    );
}