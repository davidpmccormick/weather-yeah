import colorForTemperature from "../utils/color-for-temperature";

export const state = () => ({
  hours: [],
  hourlySummary: "",
  currently: {},
  minutely: null,
  alerts: null,
  daily: {},
  detailsLeft: 0,
  barsLeft: 0,
  detailsEl: null,
  barsEl: null,
  pageWidth: null
});

const __SHAME_MAGIC_NUMBER_FOUR_FOR_SOME_REASON = 4;

export const getters = {
  dailyHighRange(state) {
    const sortedRange = state.daily.data
      .map(d => d.temperatureHigh)
      .sort((a, b) => a - b);
    return [sortedRange[0], sortedRange[sortedRange.length - 1]];
  },
  isOnSamePage(state, getters) {
    return (
      (getters.activeBarIndex <= 7 && state.barsLeft === 0) ||
      (getters.activeBarIndex >= 8 && state.barsLeft > 0)
    );
  },
  activeBarIndex(state) {
    return !state.pageWidth
      ? 0
      : Math.round(state.detailsLeft / state.pageWidth);
  },
  colorForActiveHour(state, getters) {
    return colorForTemperature(state.hours[getters.activeBarIndex].temperature);
  },
  barHeightsForHours(state) {
    const ouputStart = 50;
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
  scrollDetails({ state, getters }, index) {
    // Disable scrolling
    getters.isOnSamePage && state.detailsEl.classList.add("overflow-hidden");

    if (!state.pageWidth || !state.detailsEl) return;

    window.requestAnimationFrame(() => {
      state.detailsEl.scrollTo({ left: index * state.pageWidth });

      // Re-enable scrolling
      getters.isOnSamePage &&
        setTimeout(() => {
          state.detailsEl.classList.remove("overflow-hidden");
        }, 0);
    });
  },
  updateBarsScrollLeft({ state, getters }) {
    if (getters.activeBarIndex > 7) {
      window.requestAnimationFrame(() => {
        state.barsEl.scrollTo({
          left: state.pageWidth + __SHAME_MAGIC_NUMBER_FOUR_FOR_SOME_REASON
        });
      });
    } else {
      window.requestAnimationFrame(() => {
        state.barsEl.scrollTo({ left: 0 });
      });
    }
  },
  handleBarsScroll({ state, commit, getters, dispatch }) {
    commit("setBarsLeft", state.barsEl.scrollLeft);

    if (state.barsLeft >= state.pageWidth) {
      if (getters.activeBarIndex <= 7) {
        dispatch("scrollDetails", 8);
      }
    } else if (state.barsLeft === 0) {
      if (getters.activeBarIndex >= 8) {
        dispatch("scrollDetails", 7);
      }
    }
  },
  handleDetailsScroll({ state, commit, dispatch }) {
    commit("setDetailsLeft", state.detailsEl.scrollLeft);
    dispatch("updateBarsScrollLeft");
  }
};

export const mutations = {
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
  setBarsEl(state, value) {
    state.barsEl = value;
  },
  setPageWidth(state, value) {
    state.pageWidth = value;
  },
  setBarsLeft(state, value) {
    state.barsLeft = value;
  }
};
