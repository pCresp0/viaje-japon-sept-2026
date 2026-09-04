import { useState, useEffect, useCallback } from "react";
import { getTripStatus, todayISO, diffDays } from "./date";

export const CITY_COORDS = {
  "Tokio": { lat: 35.6895, lon: 139.6917, name: "Tokio" },
  "Kioto": { lat: 35.0116, lon: 135.7681, name: "Kioto" },
  "Kanazawa": { lat: 36.5613, lon: 136.6562, name: "Kanazawa" },
  "Takayama": { lat: 36.1461, lon: 137.2522, name: "Takayama" },
  "Tsumago": { lat: 35.5768, lon: 137.5954, name: "Nakasendo (Tsumago/Magome)" },
  "Osaka": { lat: 34.6937, lon: 135.5023, name: "Osaka" },
  "Nara": { lat: 34.6851, lon: 135.8048, name: "Nara" },
  "Fuji": { lat: 35.3606, lon: 138.7274, name: "Monte Fuji" },
  "Narita": { lat: 35.7767, lon: 140.3188, name: "Narita" }
};

export const CITY_DISPLAY_NAMES = {
  "Kioto": "Kioto",
  "Tokio": "Tokio",
  "Kanazawa": "Kanazawa",
  "Takayama": "Takayama",
  "Tsumago": "Nakasendo",
  "Osaka": "Osaka",
  "Nara": "Nara",
  "Fuji": "Mte. Fuji",
  "Narita": "Narita",
};

export const DAY_CITIES = {
  0: ["Tokio"],
  1: ["Tokio", "Kioto"],
  2: ["Kioto", "Nara"],
  3: ["Kioto"],
  4: ["Kioto"],
  5: ["Kioto", "Osaka"],
  6: ["Kioto", "Kanazawa"],
  7: ["Kanazawa", "Takayama"],
  8: ["Takayama", "Tsumago"],
  9: ["Tsumago", "Tokio"],
  10: ["Tokio"],
  11: ["Tokio"],
  12: ["Tokio"],
  13: ["Tokio"],
  14: ["Tokio", "Fuji"],
  15: ["Tokio"]
};

export const STATIC_CITY_WEATHER = {
  "Kioto": { high: 29, low: 21, rain: 20, sky: "partly", condition: "Parcialmente nublado" },
  "Tokio": { high: 28, low: 20, rain: 15, sky: "sun", condition: "Soleado" },
  "Kanazawa": { high: 27, low: 20, rain: 60, sky: "rain", condition: "Lluvia posible" },
  "Takayama": { high: 24, low: 18, rain: 40, sky: "cloud", condition: "Nublado" },
  "Tsumago": { high: 23, low: 16, rain: 10, sky: "sun", condition: "Despejado" },
  "Osaka": { high: 30, low: 22, rain: 15, sky: "sun", condition: "Soleado" },
  "Nara": { high: 29, low: 21, rain: 20, sky: "partly", condition: "Parcialmente nublado" },
  "Fuji": { high: 22, low: 14, rain: 25, sky: "partly", condition: "Nublado variable" },
  "Narita": { high: 28, low: 20, rain: 15, sky: "sun", condition: "Soleado" },
};

function getSkyFromWMO(code) {
  if (code === 0) return "sun";
  if (code === 1 || code === 2) return "partly";
  if (code === 3 || code === 45 || code === 48) return "cloud";
  return "rain";
}

function getConditionFromWMO(code) {
  if (code === 0) return "Soleado";
  if (code === 1 || code === 2) return "Parcialmente nublado";
  if (code === 3 || code === 45 || code === 48) return "Nublado";
  if (code >= 51 && code <= 67) return "Lluvia";
  if (code >= 71 && code <= 86) return "Nieve/Lluvia";
  if (code >= 95) return "Tormenta";
  return "Variable";
}

const CACHE_KEY = "jp_weather_forecast_cache_v2";
const CACHE_TTL = 2 * 60 * 60 * 1000; // 2 hours

export async function fetchLiveWeatherMap() {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { timestamp, data } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL) {
          return data;
        }
      }
    }

    const cities = Object.keys(CITY_COORDS);
    const lats = cities.map(c => CITY_COORDS[c].lat).join(",");
    const lons = cities.map(c => CITY_COORDS[c].lon).join(",");
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FTokyo&forecast_days=16`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Weather fetch failed: ${res.status}`);
    const raw = await res.json();
    const arr = Array.isArray(raw) ? raw : [raw];

    const weatherMap = {};
    cities.forEach((city, idx) => {
      weatherMap[city] = arr[idx].daily;
    });

    if (typeof window !== "undefined" && window.localStorage) {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          timestamp: Date.now(),
          data: weatherMap
        }));
      } catch (e) {
        console.warn("Could not save weather cache", e);
      }
    }

    return weatherMap;
  } catch (err) {
    console.warn("Using offline / fallback weather", err);
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          return JSON.parse(cached).data;
        }
      } catch (e) { /* ignore */ }
    }
    return null;
  }
}

export function useTodayWeatherForecast() {
  const [liveMap, setLiveMap] = useState(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) return JSON.parse(cached).data;
      } catch (e) { /* ignore */ }
    }
    return null;
  });
  const [loading, setLoading] = useState(!liveMap);

  useEffect(() => {
    let mounted = true;
    fetchLiveWeatherMap().then(data => {
      if (mounted && data) {
        setLiveMap(data);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  const status = getTripStatus();
  let activeDayNum = 1;
  if (status.phase === "during") {
    activeDayNum = status.dayNum ?? 1;
  } else if (status.phase === "after") {
    activeDayNum = 15;
  } else {
    // Before trip: preview Day 1
    activeDayNum = 1;
  }

  const cityKeys = DAY_CITIES[activeDayNum] || ["Tokio"];
  const isDisplacement = cityKeys.length > 1;

  const tripStartDate = new Date("2026-09-07T00:00:00+09:00");
  const targetDate = new Date(tripStartDate);
  targetDate.setDate(tripStartDate.getDate() + (activeDayNum - 1));
  const targetDateStr = targetDate.toISOString().split("T")[0];

  const citiesWeather = cityKeys.map(cityKey => {
    const fallback = STATIC_CITY_WEATHER[cityKey] || { high: 28, low: 20, rain: 20, sky: "partly", condition: "Parcialmente nublado" };
    const displayName = CITY_DISPLAY_NAMES[cityKey] || cityKey;

    if (!liveMap || !liveMap[cityKey]) {
      return {
        cityKey,
        displayName,
        rain: fallback.rain,
        high: fallback.high,
        low: fallback.low,
        sky: fallback.sky,
        condition: fallback.condition,
        isLive: false,
      };
    }

    const cityDaily = liveMap[cityKey];
    let dateIdx = cityDaily.time ? cityDaily.time.indexOf(targetDateStr) : -1;
    // If target trip date is not in the 16-day window (e.g. testing before Sept 2026), use today's forecast (index 0)
    if (dateIdx === -1) dateIdx = 0;

    const rain = cityDaily.precipitation_probability_max?.[dateIdx] ?? fallback.rain;
    const high = cityDaily.temperature_2m_max?.[dateIdx] != null ? Math.round(cityDaily.temperature_2m_max[dateIdx]) : fallback.high;
    const low = cityDaily.temperature_2m_min?.[dateIdx] != null ? Math.round(cityDaily.temperature_2m_min[dateIdx]) : fallback.low;
    const wmo = cityDaily.weathercode?.[dateIdx];
    const sky = wmo != null ? getSkyFromWMO(wmo) : fallback.sky;
    const condition = wmo != null ? getConditionFromWMO(wmo) : fallback.condition;

    return {
      cityKey,
      displayName,
      rain,
      high,
      low,
      sky,
      condition,
      isLive: true,
    };
  });

  return {
    loading,
    dayNum: activeDayNum,
    isDisplacement,
    citiesWeather,
    targetDateStr,
    phase: status.phase,
  };
}
