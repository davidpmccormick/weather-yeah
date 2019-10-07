import colorForTemperature from "../utils/color-for-temperature";
import axios from "axios";

export const state = () => ({
  hours: [],
  hourlySummary: "",
  currently: {},
  minutely: null,
  alerts: null,
  daily: {},
  activeBarIndex: null,
  latitude: "51.5638522",
  longitude: "-0.0968134",
  provider: "darksky"
});

export const getters = {
  sunriseToday(state) {
    return state.daily.data[0].sunriseTime;
  },
  sunsetToday(state) {
    return state.daily.data[0].sunsetTime;
  },
  sunriseTomorrow(state) {
    return state.daily.data[1].sunriseTime;
  },
  sunsetTomorrow(state) {
    return state.daily.data[1].sunsetTime;
  },
  fiveMinutely(state) {
    return [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
      .map(interval => {
        return state.minutely.data
          .slice(interval, interval + 5)
          .map(minOfFive => {
            return [minOfFive.precipIntensity, minOfFive.precipProbability];
          })
          .reduce(
            (acc, curr) => {
              return [acc[0] + curr[0], acc[1] + curr[1]];
            },
            [0, 0]
          );
      })
      .map(([i, p], index) => {
        return {
          interval: (index + 1) * 5,
          intensity: i / 5,
          probability: p / 5
        };
      });
  },
  shouldShowThisHour(state, getters) {
    return getters.fiveMinutely.some(({ probability }) => probability > 0.2);
  },
  dailyHighRange(state) {
    const sortedRange = state.daily.data
      .map(d => d.temperatureHigh)
      .sort((a, b) => a - b);
    return [sortedRange[0], sortedRange[sortedRange.length - 1]];
  },
  activeHour(state) {
    return state.hours[state.activeBarIndex];
  },
  colorForActiveHour(state, getters) {
    return (
      getters.activeHour && colorForTemperature(getters.activeHour.temperature)
    );
  },
  barHeightsForHours(state) {
    const ouputStart = 55;
    const outputEnd = 120;
    const t = state.hours.map(h => h.temperature).sort((a, b) => a - b);

    return state.hours.map(h => {
      return Math.round(
        ouputStart +
          ((outputEnd - ouputStart) / (t[t.length - 1] - t[0])) *
            (h.temperature - t[0])
      );
    });
  }
};

export const actions = {
  async getWeatherData({ commit, state }) {
    const {
      data: { minutely, hourly, daily, alerts, currently }
    } = await axios.get(
      `/${state.provider}/${state.latitude},${state.longitude}?units=uk2`
    );
    commit("setCurrently", currently);
    commit("setHours", hourly.data.slice(1, 25));
    commit("setHourlySummary", hourly.summary);
    commit("setMinutely", minutely);
    commit("setAlerts", alerts);
    commit("setDaily", daily);
  }
};

export const mutations = {
  setProvider(state, value) {
    state.provider = value;
  },
  setLatitude(state, value) {
    state.latitude = value;
  },
  setLongitude(state, value) {
    state.longitude = value;
  },
  setHours(state, value) {
    state.hours = value;
  },
  setHourlySummary(state, value) {
    state.hourlySummary = value;
  },
  setCurrently(state, value) {
    state.currently = value;
  },
  setMinutely(state, value) {
    state.minutely = value;
  },
  setAlerts(state, value) {
    state.alerts = value;
  },
  setDaily(state, value) {
    state.daily = value;
  },
  setDetailsLeft(state, value) {
    state.detailsLeft = value;
  },
  setDetailsEl(state, value) {
    state.detailsEl = value;
  },
  setIsScrollingBars(state, value) {
    state.isScrollingBars = value;
  },
  setActiveBarIndex(state, value) {
    state.activeBarIndex = state.activeBarIndex === value ? null : value;
  }
};
