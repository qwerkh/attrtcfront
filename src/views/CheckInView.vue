<template>
  <v-container>
    <div class="attendance-container">
      <v-row align="center" justify="center" style="margin-bottom: 20px">
        <v-col cols="12" sm="12" style="margin-bottom: 20px;text-align: center">
          <h1>{{ userDoc.name }}</h1>
          <h2>{{ userDoc.username }}</h2>
        </v-col>
        <v-col cols="12" sm="12" style="margin-bottom: 20px;text-align: center">
          <h2>សូមចុចប៊ូតុងខាងក្រោមដើម្បីចុះវត្តមាន</h2>
          <h3> (បញ្ចាក់៖ សូមជ្រើសរើស <b>allow ទីតាំង</b> នៅពេលលោតសារអោយជ្រើសរើស)</h3>
        </v-col>

        <v-col cols="auto">
          <v-btn :loading="isScan" v-if="isScan!==true" :disabled="!!isScan" elevated size="x-large"
                 @click="checkInAttendance"
                 prepend-icon="mdi-fullscreen"
                 dark color="primary">
            <template v-slot:prepend>
              <v-icon color="white"></v-icon>
            </template>
            ចុះវត្តមាន
          </v-btn>
          <v-btn :loading="!isScan" v-if="isScan===true" elevated size="x-large" @click="refreshPage"
                 prepend-icon="mdi-arrow-left"
                 dark color="warning">
            <template v-slot:prepend>
              <v-icon color="white"></v-icon>
            </template>
            ត្រលប់ក្រោយ
          </v-btn>
        </v-col>

        <v-col cols="12" sm="12" style="margin-top: 20px;text-align: center">

          <p v-if="scannedResult">
            ✅ Scanned ID: <strong>{{ scannedResult }}</strong>
          </p>

          <h1 v-if="scannedResult && code<250">
            ចុះវត្តមានបានជោគជ័យ ! <br><br>
            ថ្ងៃ :{{ currentDate }}<br>ម៉ោង :{{ currentTime }}
          </h1>
          <h1 style="color: red" v-if="code>250">
            {{ message }}<br>
            ថ្ងៃ :{{ currentDate }}<br>ម៉ោង :{{ currentTime }}
          </h1>

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
import {useAuthStore} from "@/store/auth";
import moment from 'moment';
import axios from "axios";

export default {
  name: 'CheckInView',

  data() {
    return {
      profile: {
        name: '',
        email: '',
        employeeId: '',
      },
      qrScanner: null,
      scannedResult: "",
      scanning: false,
      loading: false,
      message: '',
      error: '',
      stream: null,
      auth: useAuthStore(),
      isScan: false,
      code: 200,
      currentDate: moment().format("DD/MM/YYYY"),
      currentTime: moment().format("HH:mm:ss"),
      officeLatitude: "",
      officeLongitude: "",
    }
  },
  computed: {
    userDoc() {
      return useAuthStore();
    }
  },
  methods: {
    refreshPage() {
      this.isScan = false;
      this.loading = false;
      window.location.reload();
    },
    async checkInAttendance() {
      let vm = this;
      vm.isScan = true;
      vm.loading = true;
      if (!navigator.geolocation) {
        window.toastr.error("Geolocation not supported")
        return;
      }
      let useAuth = useAuthStore();
      let device = localStorage.getItem("device");
      navigator.geolocation.getCurrentPosition(
          async (position) => {
            const {latitude, longitude} = position.coords;
            //Check accuracy of location
            if (position.coords.accuracy > 100) {
              window.toastr.error("ចាប់ទីតាំងមិនត្រឹមត្រូវ,សូមប្រើការចាប់ទីតាំងតាមរយៈទូរស័ព្ទដៃ!");
              vm.loading = false;
              return;
            }

            const checkIn = await axios({
              method: "post",
              url: process.env.VUE_APP_API_URL + "/employee/checkIn",
              headers: {
                token: `${useAuth.token}`,
              },
              data: {
                userId: vm.userDoc.userId,
                latitude,
                longitude,
                device: device
              }
            })
            if (checkIn.data.code === 201) {
              vm.scannedResult = checkIn.data.data || "";
            }
            vm.code = checkIn.data.code;
            vm.loading = false;
            if (checkIn.data && (checkIn.data.code > 250)) {
              vm.message = checkIn.data.message;
            }
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
