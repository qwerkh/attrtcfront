<template>
  <v-container fluid class="attendance-page pa-4">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" md="4" sm="6" lg="2">
        <v-card class="pa-4 rounded-xl" elevation="2">
          <div class="d-flex align-center">
            <v-icon large class="mr-3" color="red">mdi-close-circle</v-icon>
            <div>
              <div class="caption">ចំនួនដងអវត្តមាន</div>
              <div class="title font-weight-bold">{{ dataObj.absent }}</div>
            </div>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" sm="6" lg="2">
        <v-card class="pa-4 rounded-xl" elevation="2">
          <div class="d-flex align-center">
            <v-icon large class="mr-3" color="warning">mdi-clock-outline</v-icon>
            <div>
              <div class="caption">ចំនួនដងមកយឺត</div>
              <div class="title font-weight-bold">{{ dataObj.late }}</div>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" sm="6" lg="2">
        <v-card class="pa-4 rounded-xl" elevation="2">
          <div class="d-flex align-center">
            <v-icon large class="mr-3" color="green">mdi-shield-account</v-icon>
            <div>
              <div class="caption">ចំនួនដងសុំច្បាប់</div>
              <div class="title font-weight-bold">{{ dataObj.permission }}</div>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" sm="6" lg="2">
        <v-card class="pa-4 rounded-xl" elevation="2">
          <div class="d-flex align-center">
            <v-icon large class="mr-3" color="blue">mdi-target</v-icon>
            <div>
              <div class="caption">ចំនួនដងបេសកកម្ម</div>
              <div class="title font-weight-bold">{{ dataObj.mission }}</div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import {useAuthStore} from "@/store/auth";
import axios from "axios";

export default {
  name: 'ActivityList',

  data() {
    return {
      dataObj: {
        absent: 0,
        permission: 0,
        mission: 0,
        late: 0,
      },
    }
  },
  computed: {
    userDoc() {
      return useAuthStore();
    }
  },
  created() {
    let vm = this;
    vm.getAttendance();
  },
  methods: {
    async getAttendance() {
      let vm = this;
      let useAuth = useAuthStore();
      const doc = await axios({
        method: "post",
        url: process.env.VUE_APP_API_URL + "/employee/getAttendanceByUserId",
        headers: {
          token: `${useAuth.token}`,
        },
        data: {
          userId: vm.userDoc.userId,
        }
      })
      if (doc.data.code === 201) {
        vm.dataObj.absent = doc.data.data.absent || 0;
        vm.dataObj.permission = doc.data.data.permission || 0;
        vm.dataObj.mission = doc.data.data.mission || 0;
        vm.dataObj.late = doc.data.data.late || 0;
      }
      vm.loading = false;

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
</style>
