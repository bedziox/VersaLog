<template>
  <div class="home .flex-column">
    <v-col cols="12" md="6">
      <v-card>
        <img
          src="@/assets/logo/logo-no-background.svg"
          style="max-height: 200px"
        />
        <v-card-text>
          <v-card-title>Train Smarter, Not Harder</v-card-title>
          <v-card-text p="5" class="">
            VersaLog is the ultimate training companion for fitness enthusiasts
            of all levels. Streamline your workout creation and focus on
            achieving your goals.
          </v-card-text>
          <v-card-item>
            <v-btn color="primary" href="#">Learn More</v-btn>
          </v-card-item>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card>
        <v-card-text>
          <v-card-title>Key Features</v-card-title>
          <v-list lines="three">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-icon>mdi-dumbbell</v-icon> Fast Training
                  Creation</v-list-item-title
                >
                <v-list-item-subtitle
                  >Build workouts in seconds with our easy-to-use
                  interface.</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-icon>mdi-playlist-plus</v-icon> Extensive Exercise
                  Library</v-list-item-title
                >
                <v-list-item-subtitle
                  >Find the perfect exercises for your goals, with detailed
                  instructions.</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-icon>mdi-all-inclusive</v-icon> Follow your
                  way</v-list-item-title
                >
                <v-list-item-subtitle
                  >Add your own exercises to our database to make your trainings
                  customizable</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  ><v-icon>mdi-calendar-clock</v-icon> Track Your
                  Progress</v-list-item-title
                >
                <v-list-item-subtitle
                  >Monitor your workout history and stay motivated on your
                  fitness journey.</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card>
        <v-card-text class=".flex-column .justify-center">
          <v-card-title>Train Smarter, Not Harder</v-card-title>
          <v-card-item>
            <v-btn color="success" href="#">Download VersaLog</v-btn>
          </v-card-item>
        </v-card-text>
      </v-card>
    </v-col>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
};
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 70vw;
}
.v-card-item {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.v-card {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
