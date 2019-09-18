<template>
  <span class="icon flex align-center justify-center">
    <span class="icon-bg flex" :class="{'dark': dark}">
      <img :src="iconSrc(icon)">
    </span>
  </span>
</template>

<script>
export default {
  props: ["icon", "dark"]
};
</script>

<style lang="scss">
.icon {
  width: 32px;
  border-radius: 0 6px 6px 0;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}

.icon-bg {
  background: #eaf6fe;
  border-radius: 9999px;
  padding: 3px;

  &.dark {
    background: darkblue;
  }
}
</style>
