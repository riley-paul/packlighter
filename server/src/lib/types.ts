import type { Station } from "../db/schema";

export type WeatherObservation = {
  stationID: string;
  tz: string;
  obsTimeUtc: string;
  obsTimeLocal: string;
  epoch: number;
  lat: number;
  lon: number;
  solarRadiationHigh: number | null;
  uvHigh: number | null;
  winddirAvg: number | null;
  humidityHigh: number | null;
  humidityLow: number | null;
  humidityAvg: number | null;
  qcStatus: number | null;
  metric: {
    tempHigh: number | null;
    tempLow: number | null;
    tempAvg: number | null;
    windspeedHigh: number | null;
    windspeedLow: number | null;
    windspeedAvg: number | null;
    windgustHigh: number | null;
    windgustLow: number | null;
    windgustAvg: number | null;
    dewptHigh: number | null;
    dewptLow: number | null;
    dewptAvg: number | null;
    windchillHigh: number | null;
    windchillLow: number | null;
    windchillAvg: number | null;
    heatindexHigh: number | null;
    heatindexLow: number | null;
    heatindexAvg: number | null;
    pressureMax: number | null;
    pressureMin: number | null;
    pressureTrend: number | null;
    precipRate: number | null;
    precipTotal: number | null;
  };
};

export type TimesOfInterest = {
  hours: number[];
  ranges: { beg: number; end: number }[];
};

export type WeatherFetch = {
  success: boolean;
  observations?: WeatherObservation[];
  error?: any;
  station: Station;
};

export type SummarizedWeather = {
  headers: { name: string; colspan: number }[];
  columns: string[];
  data: string[][];
};
