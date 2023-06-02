<template>
    <div class="circleRating">
      <vue-circular-progress
        :percent="rating * 10"
        :stroke-width="8"
        :gradient-colors="[getColor()]"
        :gradient-direction="135"
        :rounded="true"
        :clockwise="false"
        :show-percentage="true"
        :responsive="true"
        :size="120"
        :start-angle="0"
        :animation-duration="1000"
        :linecap="rounded ? 'round' : 'butt'"
      ></vue-circular-progress>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      rating: {
        type: Number,
        required: true,
      },
    },
    methods: {
      getColor() {
        if (this.rating < 5) {
          return "#ff0000"; // red
        } else if (this.rating < 7) {
          return "#ffa500"; // orange
        } else {
          return "#008000"; // green
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .circleRating {
    background-color: #000;
    border-radius: 50%;
    padding: 2px;
  }
  
  .vue-circular-progress .vc-progress {
    stroke: var(--black) !important;
  }
  
  .vue-circular-progress .vc-text {
    font-size: 34px;
    font-weight: 700;
    fill: var(--black);
  }
  </style>
  