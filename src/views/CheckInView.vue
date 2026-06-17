<!--<template>
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
                 style="font-weight: bold;"
                 dark :color="title==='CheckIn' ? 'green' :'red'">
            <template v-slot:prepend>
              <v-icon color="white">
                {{ title === 'CheckIn' ? 'mdi-clock-in' : 'mdi-clock-out' }}
              </v-icon>
            </template>

            {{ title === "CheckIn" ? "ចូលធ្វើការ" : "ចេញពីធ្វើការ" }}
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
            &lt;!&ndash;            ថ្ងៃ :{{ currentDate }}<br>&ndash;&gt;
            ម៉ោង :{{ currentTime }}
          </h1>
          <h1 style="color: red" v-if="code>250">
            {{ removeSign(message) }}<br>
            &lt;!&ndash;            ថ្ងៃ :{{ currentDate }}<br>ម៉ោង :{{ currentTime }}&ndash;&gt;
          </h1>


          <v-skeleton-loader
              v-if="loading"
              type="card"
          />
        </v-col>
      </v-row>


    </div>
  </v-container>
</template>-->

<template>
  <v-container fluid class="attendance-page pa-4">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" sm="10" md="6" lg="5">

        <v-card class="attendance-card" elevation="0">

          <!-- Top Gradient -->
          <div class="top-wave"></div>

          <v-card-text class="text-center px-6 py-10">

            <!-- Avatar -->
            <v-avatar size="90" class="mb-4 profile-avatar">
              <v-img v-if="userDoc.url==='' && userDoc.gender==='1'"
                     src="/profile-male.png"></v-img>
              <v-img v-if="userDoc.url==='' && userDoc.gender==='2'"
                     src="/profile-female.png"></v-img>
            </v-avatar>

            <!-- User Info -->
            <h1 class="employee-name">{{ userDoc.name }}</h1>
            <p class="employee-id">{{ userDoc.username }}</p>

            <!-- Instruction -->
            <div class="instruction-box mt-6">
              <h2 class="instruction-title">
                សូមចុចប៊ូតុងខាងក្រោមដើម្បីចុះវត្តមាន
              </h2>

              <p class="instruction-subtitle">
                សូមអនុញ្ញាត <b>Location Permission</b> នៅពេលមានសារលោតឡើង
              </p>
            </div>

            <!-- Action Button -->
            <div class="mt-8">

              <!-- Check In / Out -->
              <v-btn
                  v-if="!isScan"
                  :loading="isScan"
                  :disabled="!!isScan"
                  @click="checkInAttendance"
                  class="attendance-btn"
                  :class="title === 'CheckIn' ? 'checkin-btn' : 'checkout-btn'"
                  size="x-large"
              >
                <v-icon start size="24">
                  {{
                    title === 'CheckIn'
                        ? 'mdi-clock-check-outline'
                        : 'mdi-clock-remove-outline'
                  }}
                </v-icon>

                {{
                  title === "CheckIn"
                      ? "ចូលធ្វើការ"
                      : "ចេញពីធ្វើការ"
                }}
              </v-btn>

              <!-- Back Button -->
              <v-btn
                  v-else
                  @click="refreshPage"
                  color="warning"
                  size="x-large"
                  class="attendance-btn"
              >
                <v-icon start>mdi-arrow-left</v-icon>
                ត្រលប់ក្រោយ
              </v-btn>
            </div>

            <!-- Success Result -->
            <div
                v-if="scannedResult && code < 250"
                class="result-card success-card mt-8"
            >
              <v-icon size="60" color="success">
                mdi-check-circle
              </v-icon>

              <h2 class="mt-3 success-text">
                ចុះវត្តមានបានជោគជ័យ
              </h2>

              <p class="time-text">
                ម៉ោង : {{ currentTime }}
              </p>
            </div>
            <!-- Info Message -->
            <!--               -->

            <div
                v-if="infoCheck.empId"
                class="attendance-row mt-8"
            >
              <!-- Check In -->
              <!--              v-if="infoCheck.checkIn"-->

              <div
                  v-if="infoCheck.checkIn"
                  class="attendance-item success"
              >
                <v-icon size="60" color="success">
                  mdi-login
                </v-icon>

                <h3 class="title">
                  បានចូលធ្វើការ
                </h3>

                <div class="time-box">
                  {{ infoCheck.checkIn || "" }}
                </div>
              </div>

              <!-- Check Out -->
              <!--              -->

              <div
                  v-if="infoCheck.checkOut"
                  class="attendance-item warning"
              >
                <v-icon size="60" color="warning">
                  mdi-logout
                </v-icon>

                <h3 class="title">
                  បានចេញពីធ្វើការ
                </h3>

                <div class="time-box">
                  {{ infoCheck.checkOut || "" }}
                </div>
              </div>
            </div>

            <!-- Error Result -->
            <div
                v-if="code > 250"
                class="result-card error-card mt-8"
            >
              <v-icon size="60" color="red">
                mdi-alert-circle
              </v-icon>

              <h2 class="mt-3 error-text">
                {{ removeSign(message) }}
              </h2>
            </div>

            <v-btn
                v-if="removeSign(message)==='សូមចុចប៊ូតុងខាងក្រោមដើម្បី ភ្ជាប់ជាមួយម៉ាស៊ីនមេ!'"
                class="server-btn mt-7"
                @click="connectToServer"
            >
              <v-icon start size="18">
                mdi-connection
              </v-icon>

              ភ្ជាប់ម៉ាស៊ីនមេ
            </v-btn>

            <!-- Loading -->
            <v-skeleton-loader
                v-if="loading"
                type="card"
                class="mt-6"
            />

          </v-card-text>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import {useAuthStore} from "@/store/auth";
import moment from 'moment';
import axios from "axios";
import {getDeviceId} from "@/lib/GlobalFn";

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
      title: "CheckIn",
      infoCheck: {}
    }
  },
  computed: {
    userDoc() {
      return useAuthStore();
    }
  },
  created() {
    let vm = this;
    vm.checkStatusUser();
  },
  mounted() {
    window.addEventListener('focus', this.checkStatusUser);
  },

  beforeUnmount() {
    window.removeEventListener('focus', this.checkStatusUser);
  },
  methods: {
    async checkStatusUser() {
      let vm = this;
      let useAuth = useAuthStore();
      const checkStatus = await axios({
        method: "post",
        url: process.env.VUE_APP_API_URL + "/employee/checkStatus",
        headers: {
          token: `${useAuth.token}`,
        },
        data: {
          userId: vm.userDoc.userId,
        }
      })
      if (checkStatus.data.code === 201) {
        vm.title = checkStatus.data.data && checkStatus.data.data.checkType || "";
        vm.infoCheck = checkStatus.data.data && checkStatus.data.data.todayAttDoc || {};
      }

    },
    refreshPage() {
      this.isScan = false;
      this.loading = false;
      this.scannedResult = "";
      this.message = "";
      this.code = 200;
      window.location.reload();
    },
    async connectToServer() {
      let device = getDeviceId();
      let useAuth = useAuthStore();
      const requestDevice = await axios({
        method: "post",
        url: process.env.VUE_APP_API_URL + "/employee/requestDevice",
        headers: {
          token: `${useAuth.token}`,
        },
        data: {
          userId: useAuth.userId,
          device: device
        }
      })
      window.toastr.options = {
        "positionClass": "toast-top-center"
      };
      if (requestDevice.data.code === 201) {
        window.toastr.success("ស្នើភ្ជាប់ទៅម៉ាស៊ីនមេបានជោគជ័យ! រងចាំអនុញ្ញាត្តពី Admin!");
      } else {
        let message = requestDevice.data.message;
        message = message.indexOf("duplicate") > -1 ? "បានស្នើសុំរួចម្តងហើយ" : message;
        window.toastr.warning(message);
      }
    },
    removeSign(text) {
      return text.replace(/\[|\]/g, '')
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
              vm.scannedResult = checkIn.data.data && checkIn.data.data.id || "";
              vm.currentDate = checkIn.data.data && checkIn.data.data.date || "";
              vm.currentTime = checkIn.data.data && checkIn.data.data.time || "";
            }
            vm.code = checkIn.data.code;
            vm.loading = false;
            if (checkIn.data && (checkIn.data.code > 250)) {
              vm.message = checkIn.data.message;
            }

            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: 'smooth'
            });

          },
          () => {
            vm.loading = false;
            window.toastr.error("សូមបើកសិទ្ធទីតាំងនៅក្នុងទូរស័ព្ទដៃ (Please enable location access)!");
            /* vm.howtoenablelocation=`
               Iphone: Setting -> Privacy and Security -> Location Services -> ស្វែងរក Safari Website -> Tick While Using the App <br>
               Android:
             `;*/
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: 'smooth'
            });
          },
          {
            enableHighAccuracy: true,
            timeout: 10000
          }
      );
    },

  }
}
</script>


<style scoped>

.attendance-page {
  min-height: 100vh;
  background: linear-gradient(
      135deg,
      #eef2ff 0%,
      #f8fafc 50%,
      #ffffff 100%
  );
}

/* Main Card */
.attendance-card {
  position: relative;
  overflow: hidden;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
}

/* Top Wave */
.top-wave {
  height: 70px;
  background: linear-gradient(
      135deg,
      #2563eb,
      #4f46e5
  );
  border-bottom-left-radius: 50% 20%;
  border-bottom-right-radius: 50% 20%;
}

/* Avatar */
.profile-avatar {
  margin-top: -95px;
  border: 6px solid white;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* User Info */
.employee-name {
  font-size: 30px;
  font-weight: 800;
  color: #1e293b;
}

.employee-id {
  color: #64748b;
  font-size: 16px;
  margin-top: 6px;
}

/* Instruction Box */
.instruction-box {
  background: #f8fafc;
  padding: 18px;
  border-radius: 18px;
}

.instruction-title {
  font-size: 20px;
  font-weight: bold;
  color: #0f172a;
}

.instruction-subtitle {
  margin-top: 10px;
  color: #64748b;
  line-height: 1.7;
}

/* Main Button */
.attendance-btn {
  width: 100%;
  height: 62px !important;
  border-radius: 18px !important;
  font-size: 20px !important;
  font-weight: bold !important;
  color: white !important;
  letter-spacing: 0.5px;
  text-transform: none !important;
  transition: 0.3s;
}

.attendance-btn:hover {
  transform: translateY(-2px);
}

.checkin-btn {
  background: linear-gradient(
      135deg,
      #16a34a,
      #22c55e
  ) !important;
  box-shadow: 0 8px 25px rgba(34, 197, 94, 0.35);
}

.checkout-btn {
  background: linear-gradient(
      135deg,
      #dc2626,
      #ef4444
  ) !important;
  box-shadow: 0 8px 25px rgba(239, 68, 68, 0.35);
}

/* Result Card */
.result-card {
  padding: 25px;
  border-radius: 22px;
}

.success-card {
  background: #f0fdf4;
}

.error-card {
  background: #fef2f2;
}

.success-text {
  color: #16a34a;
  font-weight: 800;
}

.error-text {
  color: #dc2626;
  font-weight: 700;
}

.time-text {
  margin-top: 10px;
  color: #334155;
  font-size: 18px;
  font-weight: 600;
}

/* Mobile */
@media (max-width: 600px) {

  .employee-name {
    font-size: 24px;
  }

  .attendance-btn {
    font-size: 18px !important;
  }

  .instruction-title {
    font-size: 18px;
  }
}

.server-btn {
  height: 42px !important;

  border-radius: 14px !important;

  color: white !important;

  font-weight: 700 !important;

  text-transform: none !important;

  background: linear-gradient(
      135deg,
      #2563eb,
      #4f46e5
  ) !important;

  box-shadow: 0 8px 18px rgba(79, 70, 229, 0.25);
}

.attendance-row {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap; /* responsive */
}

.attendance-item {
  flex: 1;
  min-width: 220px;
  max-width: 300px;

  background: #fff;
  border-radius: 16px;
  padding: 24px;
  text-align: center;

  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.success {
  border-top: 5px solid #22c55e;
}

.warning {
  border-top: 5px solid #f59e0b;
}

.title {
  margin: 12px 0;
  font-size: 20px;
  font-weight: 600;
}

.time-box {
  margin-top: 10px;
  padding: 12px;
  border-radius: 12px;
  background: #f8fafc;
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
}
</style>
