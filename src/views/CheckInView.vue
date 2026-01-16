<template>
  <v-container>
    <div class="attendance-container">
      <v-row align="center" justify="center" style="margin-bottom: 20px">
        <v-col cols="12" sm="12" style="margin-bottom: 20px;text-align: center">
          <h1>សួស្តី {{ userDoc.userName }}</h1>
        </v-col>
        <v-col cols="12" sm="12" style="margin-bottom: 20px;text-align: center">
          <h2>សូមចុចប៊ូតុងខាងក្រោមដើម្បីចុះវត្តមាន</h2>
        </v-col>
        <v-col cols="auto">
          <v-btn :disabled="!!isScan" elevated size="x-large" @click="checkInAttendance" prepend-icon="mdi-fullscreen"
                 color="indigo-darken-3">
            <template v-slot:prepend>
              <v-icon color="white"></v-icon>
            </template>
            Check Attendance
          </v-btn>
          <!--          <v-btn v-if="isScan" elevated size="x-large" @click="stopScan" prepend-icon="mdi-stop" color="red-darken-3">
                      <template v-slot:prepend>
                        <v-icon color="white"></v-icon>
                      </template>
                      Stop Scan
                    </v-btn>-->
        </v-col>
        <v-col cols="12" sm="12" style="margin-top: 20px;text-align: center">
          <!--      <div v-show="isScan" id="qr-reader"></div>-->

          <p v-if="scannedResult">
            ✅ Scanned ID: <strong>{{ scannedResult }}</strong>
          </p>

          <h1 v-if="scannedResult && code<250">
            ចុះវត្តមានបានជោគជ័យ ! <br><br>
            ថ្ងៃ :{{ currentDate }}<br>ម៉ោង :{{ currentTime }}
          </h1>
          <h1 style="color: red" v-if="scannedResult && code>250">
            មិនអាចចុះវត្តមានបានទេ<br><br>
            ថ្ងៃ :{{ currentDate }}<br>ម៉ោង :{{ currentTime }}
          </h1>

          <h1 v-if="message && code>250" style="color: red">{{ message }}<br><br>
            ថ្ងៃ :{{ currentDate }}<br>ម៉ោង :{{ currentTime }}</h1>
        </v-col>
      </v-row>


    </div>
  </v-container>
</template>

<script>
// import axios from 'axios'
import {Html5Qrcode} from 'html5-qrcode'
// import axios from "axios";
import {useAuthStore} from "@/store/auth";
import api from '@/util/axios'
import moment from 'moment';

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
      message: '',
      error: '',
      stream: null,
      auth: useAuthStore(),
      isScan: false,
      code: 200,
      currentDate: moment().format("DD/MM/YYYY"),
      currentTime: moment().format("HH:mm:ss"),
    }
  },
  // 13.104756962789539, 103.19984872675734
  // mounted() {
  //   this.startScanner();
  // },
  beforeUnmount() {
    if (this.qrScanner) {
      this.qrScanner.stop();
    }
  },
  computed: {
    userDoc() {
      return useAuthStore();
    }
  },
  methods: {
    startScan() {
      this.isScan = true;
      this.startScanner();
    },
    stopScan() {
      this.isScan = false;
      if (this.qrScanner) {
        this.qrScanner.stop();
      }
    },
    async checkInAttendance() {
      let vm = this;
      vm.isScan = true;
      if (!navigator.geolocation) {
        alert('Geolocation not supported');
        return;
      }
      let useAuth = useAuthStore();
      navigator.geolocation.getCurrentPosition(
          async (position) => {
            const {latitude, longitude} = position.coords;
            const checkIn = await api.request({
              method: "post",
              url: process.env.VUE_APP_API_URL + "/scan",
              headers: {
                Authorization: `Bearer ${useAuth.token}`,
                // Authorization: `${vm.auth.token}`,
              },
              data: {
                userId: vm.auth.userId,
                latitude,
                longitude,
              }
            })
            vm.scannedResult = useAuth.email;
            vm.code = checkIn.data.code;
            if (checkIn.data && (checkIn.data.code === "401" || checkIn.data.code === "400" || checkIn.data.code === "402")) {
              vm.message = checkIn.data.message;
            }
          },
          () => {
            alert('Please enable location access');
          },
          {
            enableHighAccuracy: true,
            timeout: 10000
          }
      );


    },
    startScanner() {
      let vm = this;
      this.qrScanner = new Html5Qrcode("qr-reader");
      try {
        this.qrScanner.start(
            {facingMode: "environment"},
            {fps: 10, qrbox: 250},
            (decodedText) => {
              this.scannedResult = decodedText;


              vm.checkInAttendance();
              this.qrScanner.stop();
              this.isScan = false;
            }
            /*(error) => {
              // console.warn(error);
            }*/
        );
      } catch (err) {
        console.warn(err);
      }

    },
    submitAttendance() {
      // Example: send scanned ID to backend
      // axios.post("/api/attendance", { id: this.scannedResult })

      this.message = "Attendance marked successfully!";
      this.scannedResult = "";
      this.startScanner();
    }
  }
}
</script>
