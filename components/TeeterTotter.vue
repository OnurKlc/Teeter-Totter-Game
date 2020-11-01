<template>
  <div class="teeter-totter">
    <div id="teeterTotterTop" ref="topLayer" class="top-layer" />
    <div class="base" />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.teeter-totter {
  margin-bottom: 50px;
  margin-top: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.top-layer {
  background-color: red;
  width: 70%;
  height: 5px;
}
.base {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 100px 173.2px 100px;
  border-color: transparent transparent #393d42 transparent;
}
</style>
