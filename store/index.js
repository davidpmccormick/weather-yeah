import colorForTemperature from "../utils/color-for-temperature";

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
  provider: "darksky",
  location: null,
  isLocationsActive: false,
  isUpdating: true,
  activeAlerts: [],
  favourites: [
    {
      name: "27 Digby Crescent, London, UK",
      latitude: "51.5638522",
      longitude: "-0.0968134"
    },
    {
      name: "Kettering, UK",
      latitude: "52.3967963",
      longitude: "-0.7509954"
    },
    {
      name: "Beverley, UK",
      latitude: "53.8410525",
      longitude: "-0.4668983"
    },
    {
      name: "Glasgow, UK",
      latitude: "55.8555366",
      longitude: "-4.3026696"
    },
    {
      name: "Somewhere in Canada",
      latitude: "56.5334972",
      longitude: "-61.8930622"
    }
  ]
});

export const getters = {
  cleanedAlerts(state) {
    return (
      state.alerts &&
      state.alerts.reduce((acc, curr) => {
        const alreadyIn = acc.some(i => i.title === curr.title);

        return alreadyIn ? acc : [...acc, curr];
      }, [])
    );
  },
  moonPhase(state) {
    const phaseNumber = state.daily.data[0].moonPhase;

    if (phaseNumber === 0) return "new";
    if (phaseNumber < 0.25) return "waxing crescent";
    if (phaseNumber === 0.25) return "first quarter";
    if (phaseNumber < 0.5) return "waxing gibbous";
    if (phaseNumber === 0.5) return "full";
    if (phaseNumber < 0.75) return "waning gibbous";
    if (phaseNumber === 0.75) return "last quarter";

    return "waning crescent";
  },
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
    return (
      state.minutely &&
      [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
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
        })
    );
  },
  shouldShowThisHour(state, getters) {
    return (
      getters.fiveMinutely &&
      getters.fiveMinutely.some(({ probability }) => probability > 0.2)
    );
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
  async updateCurrentLocation({ commit, dispatch }) {
    commit("setIsLocationsActive", false);
    commit("setIsUpdating", true); // TODO: this is duped in getWeatherData - could be tidier?

    window.navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        commit("setLatitude", latitude);
        commit("setLongitude", longitude);
        dispatch("getWeatherData");
        dispatch("getLocation");
      }
    );
  },
  updateLocation({ commit, dispatch }, location) {
    commit("setLatitude", location.latitude);
    commit("setLongitude", location.longitude);
    commit("setLocation", location.name);
    dispatch("getWeatherData");
    commit("setIsLocationsActive", false);
  },
  async getLocation({ commit, state }) {
    const { data } = await this.$axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
        state.latitude
      },${state.longitude}&key=AIzaSyACT9LXR6o1ufwV8jA8BvP2C7CCAUOmhTc`
    );
    const firstResult = data.results && data.results[0];
    const location = firstResult && firstResult.formatted_address;

    commit("setLocation", location);
  },
  async getWeatherData({ commit, state }) {
    commit("setIsUpdating", true);
    const {
      data: { minutely, hourly, daily, alerts, currently }
    } = await this.$axios.get(
      `/darksky/${state.latitude},${state.longitude}?units=uk2`
    );
    commit("setCurrently", currently);
    commit("setHours", hourly.data.slice(1, 25));
    commit("setHourlySummary", hourly.summary);
    commit("setMinutely", minutely);
    commit("setAlerts", alerts);
    commit("setDaily", daily);
    commit("setIsUpdating", false);
  }
};

export const mutations = {
  setIsLocationsActive(state, value) {
    state.isLocationsActive = value;
  },
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
    state.activeBarIndex = value;
  },
  setLocation(state, value) {
    state.location = value;
  },
  setIsUpdating(state, value) {
    state.isUpdating = value;
  },
  setActiveAlerts(state, value) {
    state.activeAlerts = value;
  }
};
