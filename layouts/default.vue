<template>
  <Nuxt/>
</template>

<style lang="scss">
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

h2 {
  font-size: 1.8em;
}

.no-padding {
  padding: 0;
}

.full-width {
  width: calc(100vw - 40px);
}

.inline-grid {
  display: inline-grid;
}

.grid {
  display: grid;
}

.grid-gap {
  grid-gap: 3px;
}

.grid-end {
  align-items: end;
}

.grid-8 {
  grid-template-columns: repeat(8, 1fr);
}

.grid-12 {
  grid-template-columns: repeat(12, 1fr);
}

.grid-100-100 {
  grid-template-columns: repeat(3, calc(100vw - 40px));
}

.overflow-x-auto {
  overflow-x: auto;
}

.overflow-hidden {
  width: 100%;
  overflow: hidden;
}

.pad-row {
  padding: 20px;
}

.nowrap {
  white-space: nowrap;
}

.snap-scroll {
  -webkit-scroll-snap-points-x: repeat(100%);
  scroll-snap-points-x: repeat(100%);
  -webkit-scroll-snap-type: mandatory;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;

  > * {
    -webkit-scroll-snap-align: start;
    scroll-snap-align: start;
  }
}

.flex {
  display: flex;
}

.align-stretch {
  align-items: stretch;
}

.align-center {
  align-items: center;
}

.justify-end {
  justify-content: flex-end;
}

.justify-between {
  justify-content: space-between;
}

.justify-center {
  justify-content: center;
}

.spaced {
  > * + * {
    margin-top: 20px;
  }
}
</style>

