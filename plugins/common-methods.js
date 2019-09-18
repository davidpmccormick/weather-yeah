import Vue from "vue";
import colorForTemperature from "../utils/color-for-temperature";
import mapInputToRange from "../utils/map-input-to-range";

Vue.mixin({
  methods: {
    formatDate(timestamp) {
      const timestampMilliseconds = Number(`${timestamp}000`);
      const date = new Date(timestampMilliseconds);
      const dateNumber = date.getDate().toString();

      return dateNumber.length < 2 ? `0${dateNumber}` : dateNumber;
    },
    formatTime(timestamp, isActualMinutes) {
      const timestampMilliseconds = Number(`${timestamp}000`);
      const date = new Date(timestampMilliseconds);
      const hours = date.getHours().toString();
      const paddedHours = hours.length < 2 ? `0${hours}` : hours;
      const minutes = date.getMinutes().toString();
      const paddedMinutes = minutes.length < 2 ? `0${minutes}` : minutes;

      return `${paddedHours}:${isActualMinutes ? paddedMinutes : "00"}`;
    },
    formatDay(timestamp) {
      const daysOfWeek = {
        0: "Sun",
        1: "Mon",
        2: "Tue",
        3: "Wed",
        4: "Thu",
        5: "Fri",
        6: "Sat"
      };
      const timestampMilliseconds = Number(`${timestamp}000`);
      const date = new Date(timestampMilliseconds);
      const day = daysOfWeek[date.getDay()];

      return day;
    },
    humanBearing(bearing) {
      if (bearing >= 337.5 || bearing < 22.5) {
        return {
          short: "n",
          long: "north"
        };
      }
      if (bearing >= 22.5 && bearing < 67.5) {
        return {
          short: "ne",
          long: "north east"
        };
      }
      if (bearing >= 67.5 && bearing < 112.5) {
        return {
          short: "e",
          long: "east"
        };
      }
      if (bearing >= 112.5 && bearing < 157.5) {
        return {
          short: "se",
          long: "south east"
        };
      }
      if (bearing >= 157.5 && bearing < 202.5) {
        return {
          short: "s",
          long: "south"
        };
      }
      if (bearing >= 202.5 && bearing < 247.5) {
        return {
          short: "sw",
          long: "south west"
        };
      }
      if (bearing >= 247.5 && bearing < 292.5) {
        return {
          short: "w",
          long: "west"
        };
      }
      if (bearing >= 292.5 && bearing < 337.5) {
        return {
          short: "nw",
          long: "north west"
        };
      }
    },
    round(number) {
      return Math.round(number);
    },
    iconSrc(icon) {
      return `https://darksky.net/images/weather-icons/${icon}.png`;
    },
    colorForTemperature,
    mapInputToRange
  }
});
