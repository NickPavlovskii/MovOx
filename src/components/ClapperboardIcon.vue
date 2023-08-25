<template>
  <div style="" class="clapperboard_icons">
    <img
      src="../assets/clapperboard.png"
      alt=""
      style="height: 40px; opacity: 0.3; margin-right: 70px"
    />
    <img
      src="../assets/clapperboard.png"
      alt=""
      style="height: 80px; opacity: 0.75; margin-right: 70px"
    />
    <img
      src="../assets/clapperboard.png"
      alt=""
      style="height: 140px; opacity: 1; margin-right: 70px"
    />
    <img
      src="../assets/clapperboard.png"
      alt=""
      style="height: 80px; opacity: 0.75; margin-right: 70px"
    />
    <img
      src="../assets/clapperboard.png"
      alt=""
      style="height: 40px; opacity: 0.3; margin-right: 50px"
    />
  </div>
</template>

<style scoped>
.clapperboard_icons {
  display: flex;
  justify-content: center;
  align-items: center;

  margin-left: 50px;
}

@media screen and (max-width: 900px) {
  .clapperboard_icons img:nth-child(1),
  .clapperboard_icons img:nth-child(5) {
    display: none;
  }
}

@media screen and (max-width: 480px) {
  .clapperboard_icons img:nth-child(1),
  .clapperboard_icons img:nth-child(5) {
    display: block;
  }

  .clapperboard_icons img:nth-child(3),
  .clapperboard_icons img:nth-child(2) {
    display: none;
  }
}
</style>
