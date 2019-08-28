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
    formatTime(timestamp) {
      const timestampMilliseconds = Number(`${timestamp}000`);
      const date = new Date(timestampMilliseconds);
      const hours = date.getHours().toString();
      const paddedHours = hours.length < 2 ? `0${hours}` : hours;

      return `${paddedHours}:00`;
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
    round(number) {
      return Math.round(number);
    },
    colorForTemperature,
    mapInputToRange
  }
});
