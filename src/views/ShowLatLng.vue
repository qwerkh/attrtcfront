<template>
  <v-container>
    <div class="attendance-container">
      <v-row align="center" justify="center" style="margin-bottom: 20px">


        <v-col cols="auto">
          <v-btn elevated size="x-large"
                 @click="checkLocation"
                 prepend-icon="mdi-fullscreen"
                 dark color="primary">
            <template v-slot:prepend>
              <v-icon color="white"></v-icon>
            </template>
            Check Location
          </v-btn>
        </v-col>

        <v-col cols="12" sm="12" style="margin-top: 20px;text-align: center">
          <v-btn x-large
                 color="secondary"
                 dark @click="copyText">
            <v-icon>mdi-content-copy</v-icon>  &nbsp; Copy
          </v-btn>
        </v-col>
        <v-col cols="12" sm="12" style="margin-top: 20px;text-align: center">
          <h2>Latitude: {{ latitude }}</h2><br>
          <h2>Longitude: {{ longitude }}</h2><br>
          <v-skeleton-loader
              v-if="loading"
              type="card"
          />
        </v-col>
      </v-row>


    </div>
  </v-container>
</template>

<script>

export default {
  name: 'CheckInView',

  data() {
    return {

      loading: false,
      message: '',
      error: '',
      isScan: false,

      latitude: "",
      longitude: "",
    }
  },

  methods: {
    async copyText() {
      try {
        await navigator.clipboard.writeText("Latitude : " + this.latitude + " Longitude : " + this.longitude);
        window.toastr.success("Copy បានជោគជ័យ!");
      } catch (err) {
        console.error('Copy failed', err)
      }
    },
    async checkLocation() {
      let vm = this;
      vm.isScan = true;
      vm.loading = true;
      if (!navigator.geolocation) {
        window.toastr.error("Geolocation not supported")
        return;
      }
      navigator.geolocation.getCurrentPosition(
          async (position) => {
            const {latitude, longitude} = position.coords;

            //Check accuracy of location
            if (position.coords.accuracy > 100) {
              window.toastr.error("ចាប់ទីតាំងមិនត្រឹមត្រូវ,សូមប្រើការចាប់ទីតាំងតាមរយៈទូរស័ព្ទដៃ!");
              vm.loading = false;
              return;
            }
            vm.latitude = latitude;
            vm.longitude = longitude;
          },
          () => {
            vm.loading = false;
            window.toastr.error("សូមបើកសិទ្ធទីតាំងនៅក្នុងទូរស័ព្ទដៃ (Please enable location access)!");
          },
          {
            enableHighAccuracy: true,
            timeout: 10000
          }
      );
    }
  }
}
</script>
