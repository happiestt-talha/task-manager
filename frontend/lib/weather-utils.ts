import { ForecastEntry } from "./api/weather";

export function getForecastForDate(
    entries: ForecastEntry[],
    targetDate: string
): ForecastEntry | null {
    const target = new Date(targetDate).getTime();

    // find the closest forecast entry to the target date/time
    let closest: ForecastEntry | null = null;
    let smallestDiff = Infinity;

    for (const entry of entries) {
        const diff = Math.abs(new Date(entry.dateTime).getTime() - target);
        if (diff < smallestDiff) {
            smallestDiff = diff;
            closest = entry;
        }
    }

    return closest;
}

export function getDailyForecasts(entries: ForecastEntry[]): ForecastEntry[] {
    // API gives 3-hour intervals; grab one entry per day (around midday) for a clean 5-day view
    const seen = new Set<string>();
    const daily: ForecastEntry[] = [];

    for (const entry of entries) {
        const day = entry.dateTime.split(" ")[0];
        const hour = entry.dateTime.split(" ")[1];
        if (!seen.has(day) && hour.startsWith("12:")) {
            seen.add(day);
            daily.push(entry);
        }
    }

    return daily;
}