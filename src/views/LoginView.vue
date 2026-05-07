<!--<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card :loading="loading" variant="flat">
          <v-card-title class="d-flex justify-center">
            <img src="/logo.png" style="height: 130px; width: auto;" class="mb-4 mt-2"
                 alt="logo"/>
          </v-card-title>
          &lt;!&ndash; Title &ndash;&gt;
          <v-card-text class="text-h6 text-center">
            រដ្ឋាករទឹកបាត់ដំបង<br>
            AMS System
          </v-card-text>

          &lt;!&ndash; Form &ndash;&gt;

          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                  v-model="user.phoneNumber"
                  label="លេខទូរស័ព្ទ"
                  prepend-inner-icon="mdi-phone-lock"
                  :rules="phoneNumberRules"
                  inputmode="numeric"
                  required
              />

              <v-text-field
                  v-model="user.password"
                  label="លេខសំងាត់"
                  prepend-inner-icon="mdi-lock"
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append-inner="showPassword = !showPassword"
                  :rules="passwordRules"
                  required
              />
            </v-form>
          </v-card-text>

          &lt;!&ndash; Actions &ndash;&gt;
          <v-card-actions class="justify-end">
            <v-btn
                color="primary"
                size="large"
                variant="elevated"
                outlined
                block
                @click="login"
            >
              ចូលប្រើប្រាស់
            </v-btn>
            <br>

          </v-card-actions>
          &lt;!&ndash;          <div class="register-text" style="margin-bottom: 20px">
                      គ្មានគណនី? <a @click="gotoRegister" class="register-link">បង្កើតគណនី</a>
                    </div>&ndash;&gt;
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>-->
<template>
  <v-container
      fluid
      class="login-page pa-4"
  >

    <!-- Background Decorations -->
    <div class="bg-circle bg-circle-1"></div>
    <div class="bg-circle bg-circle-2"></div>

    <v-row
        align="center"
        justify="center"
        class="fill-height"
    >

      <v-col
          cols="12"
          sm="9"
          md="5"
          lg="4"
      >

        <v-card
            :loading="loading"
            class="login-card"
            elevation="0"
        >

          <!-- Top Gradient -->
          <div class="top-section">

            <div class="logo-wrapper">

              <img
                  src="/logo.png"
                  class="logo-image"
                  alt="logo"
              />

            </div>

          </div>

          <!-- Content -->
          <v-card-text class="pa-8">

            <!-- Title -->
            <div class="text-center mb-8">

              <h1 class="system-title">
                រដ្ឋាករទឹកបាត់ដំបង
              </h1>

              <p class="system-subtitle">
                AMS Attendance Management System
              </p>

            </div>

            <!-- Form -->
            <v-form
                ref="form"
                v-model="valid"
            >

              <!-- Phone -->
              <v-text-field
                  v-model="user.phoneNumber"
                  label="លេខទូរស័ព្ទ"
                  prepend-inner-icon="mdi-phone-outline"
                  :rules="phoneNumberRules"
                  inputmode="numeric"
                  variant="outlined"
                  rounded="xl"
                  class="modern-input"
                  required
              />

              <!-- Password -->
              <v-text-field
                  v-model="user.password"
                  label="លេខសំងាត់"
                  prepend-inner-icon="mdi-lock-outline"
                  :append-inner-icon="
                  showPassword
                    ? 'mdi-eye-off-outline'
                    : 'mdi-eye-outline'
                "
                  :type="
                  showPassword
                    ? 'text'
                    : 'password'
                "
                  @click:append-inner="
                  showPassword = !showPassword
                "
                  :rules="passwordRules"
                  variant="outlined"
                  rounded="xl"
                  class="modern-input"
                  required
              />

              <!-- Login Button -->
              <v-btn
                  block
                  size="x-large"
                  class="login-btn mt-6"
                  @click="login"
              >

                <v-icon start>
                  mdi-login
                </v-icon>

                ចូលប្រើប្រាស់

              </v-btn>

            </v-form>

            <!-- Bottom Text -->
            <div class="bottom-text">
              Secure Employee Attendance System
            </div>

          </v-card-text>

        </v-card>

      </v-col>

    </v-row>

  </v-container>
</template>
<script>
import axios from 'axios'
import {useAuthStore} from "@/store/auth.js"
import {Constants} from "@/lib/Constant";
// import {getDeviceId} from '@/lib/GlobalFn';

export default {
  name: "LoginView",
  data() {
    return {
      valid: false,
      user: {
        phoneNumber: "",
        password: "",
      },
      loading: false,
      error: null,
      showPassword: false,
      phoneNumberRules: [
        v => !!v || "ត្រូវបញ្ចូលលេខទូរស័ព្ទ",
      ],
      passwordRules: [
        v => !!v || "ត្រូវបញ្ចូលលេខសំងាត់",
      ]
    };
  },
  methods: {
    gotoRegister() {
      this.$router.push('/register');
    },
    async login() {
      let vm = this;
      vm.loading = true;
      vm.error = null;
      // alert(getDeviceId());
      try {
        if ((await vm.$refs.form.validate()).valid === true) {
          const res = await axios({
            method: "post",
            url: process.env.VUE_APP_API_URL + "/users/login",
            headers: {
              token: Constants.VUE_APP_API_SECRET
            },
            data: {
              username: this.user.phoneNumber,
              password: this.user.password,
            }
          })
          if (res.data.code === 200 || res.data.code === 201) {
            let useAuth = useAuthStore();
            useAuth.login(res.data.data)
            // Redirect (if router used)
            vm.$router.push('/scan')
          } else {
            window.toastr.error("លេខទូរស័ព្ទ ឬ លេខសំងាត់មិនត្រឹមត្រូវ!")
          }
        }


      } catch (err) {
        vm.error =
            err.response?.data?.message || 'Login failed';
        if (err.response) {
          // Server responded with a status other than 2xx
          window.toastr.error("លេខទូរស័ព្ទ ឬ លេខសំងាត់មិនត្រឹមត្រូវ!")
        } else {
          // Network or other errors
          window.toastr.error("Network error. Please try again.")
        }

      } finally {
        vm.loading = false
      }
    },
  }
  ,
  created() {
    let vm = this;
    if (localStorage.getItem('token') !== "" && localStorage.getItem('token') != null) {
      vm.$router.push('/scan')
    } else {
      vm.$router.push('/')
    }
  }
  ,
}
;
</script>

<style scoped>

/* ================= PAGE ================= */

.login-page {
  position: relative;

  min-height: 100vh;

  overflow: hidden;

  background:
      linear-gradient(
          135deg,
          #eef2ff 0%,
          #f8fafc 50%,
          #ffffff 100%
      );
}

/* ================= BACKGROUND ================= */

.bg-circle {
  position: absolute;

  border-radius: 50%;

  filter: blur(10px);
}

.bg-circle-1 {
  top: -120px;
  right: -120px;

  width: 320px;
  height: 320px;

  background:
      rgba(79,70,229,0.15);
}

.bg-circle-2 {
  bottom: -100px;
  left: -100px;

  width: 260px;
  height: 260px;

  background:
      rgba(37,99,235,0.15);
}

/* ================= CARD ================= */

.login-card {
  position: relative;

  overflow: hidden;

  border-radius: 32px;

  background:
      rgba(255,255,255,0.92);

  backdrop-filter:
      blur(12px);

  box-shadow:
      0 12px 40px rgba(0,0,0,0.08);
}

/* ================= TOP ================= */

.top-section {
  height: 190px;

  display: flex;
  align-items: center;
  justify-content: center;

  background:
      linear-gradient(
          135deg,
          #2563eb,
          #4f46e5
      );

  border-bottom-left-radius: 50% 18%;
  border-bottom-right-radius: 50% 18%;
}

/* ================= LOGO ================= */

.logo-wrapper {
  width: 130px;
  height: 130px;

  border-radius: 28px;

  display: flex;
  align-items: center;
  justify-content: center;

  background:
      rgba(255,255,255,0.15);

  backdrop-filter:
      blur(8px);

  border:
      2px solid rgba(255,255,255,0.2);

  box-shadow:
      0 10px 30px rgba(0,0,0,0.15);
}

.logo-image {
  width: 95px;
  height: auto;
}

/* ================= TITLE ================= */

.system-title {
  font-size: 30px;
  font-weight: 800;

  color: #0f172a;
}

.system-subtitle {
  margin-top: 10px;

  color: #64748b;

  font-size: 15px;
}

/* ================= INPUT ================= */

.modern-input {
  margin-bottom: 18px;
}

:deep(.v-field) {
  border-radius: 18px !important;

  background:
      #f8fafc !important;

  transition: 0.3s;
}

:deep(.v-field:hover) {
  background:
      #f1f5f9 !important;
}

:deep(.v-field--focused) {
  background:
      white !important;

  box-shadow:
      0 0 0 4px rgba(59,130,246,0.10);
}

/* ================= BUTTON ================= */

.login-btn {
  height: 58px !important;

  border-radius: 18px !important;

  text-transform: none !important;

  font-size: 18px !important;

  font-weight: 700 !important;

  color: white !important;

  background:
      linear-gradient(
          135deg,
          #2563eb,
          #4f46e5
      ) !important;

  box-shadow:
      0 10px 25px rgba(79,70,229,0.30);

  transition: 0.3s;
}

.login-btn:hover {
  transform: translateY(-2px);
}

/* ================= BOTTOM ================= */

.bottom-text {
  margin-top: 28px;

  text-align: center;

  color: #94a3b8;

  font-size: 13px;

  letter-spacing: 0.5px;
}

/* ================= MOBILE ================= */

@media (max-width: 600px) {

  .system-title {
    font-size: 24px;
  }

  .system-subtitle {
    font-size: 14px;
  }

  .top-section {
    height: 170px;
  }

  .logo-wrapper {
    width: 110px;
    height: 110px;
  }

  .logo-image {
    width: 80px;
  }

  .login-btn {
    font-size: 16px !important;
  }
}

</style>
<!--
<style scoped>
.fill-height {
  min-height: 100vh;
}

/*.background {
  height: 100vh;
  width: 100vw;
  !* Use your uploaded background image path here *!
  background: url('/path-to-your-uploaded-image.png') no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
}*/

.form-card {
  backdrop-filter: blur(12px);
  background-color: rgba(255 255 255 / 0.15);
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  width: 100%;
  max-width: 520px;
}

.white-input .v-input__control {
  color: white;
}

.white-input .v-label {
  color: white !important;
}

.white-input input {
  color: white !important;
}

.white-input .v-field__outline {
  border-color: rgba(255, 255, 255, 0.6) !important;
}

.white-input:hover .v-field__outline {
  border-color: white !important;
}

.actions-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 16px;
}

.forgot-link {
  color: white;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
}

.forgot-link:hover {
  text-decoration: underline;
}

.register-text {
  margin-top: 16px;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 400;
}

.register-link {
  color: black !important;
  font-weight: 600;
  text-decoration: none;
}

.register-link:hover {
  text-decoration: underline;
}

</style>-->
