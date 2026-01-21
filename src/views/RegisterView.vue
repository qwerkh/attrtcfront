<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="form-card" elevation="10">
          <!-- Title -->
          <v-card-text class="text-h6 text-center">
            Register
          </v-card-text>

          <!-- Form -->
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                  v-model="user.name"
                  label="Name"
                  prepend-inner-icon="mdi-account"
                  required
              />

              <v-text-field
                  v-model="user.email"
                  label="Email"
                  prepend-inner-icon="mdi-email"
                  :rules="emailRules"
                  required
              />

              <v-text-field
                  v-model="user.password"
                  label="Password"
                  prepend-inner-icon="mdi-lock"
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append-inner="showPassword = !showPassword"
                  :rules="passwordRules"
                  required
              />
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
                color="primary"
                size="large"
                variant="elevated"
                outlined
                block
                @click="register"
            >
              Register
            </v-btn>
            <br>

          </v-card-actions>
          <div class="register-text" style="margin-bottom: 20px">
            Already have an account? <a @click="gotoLogin" class="register-link">Login</a>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: "LoginView",
  data() {
    return {
      valid: false,
      user: {
        email: "",
        password: "",
        name: ""
      },
      loading: false,
      error: null,
      showPassword: false,
      emailRules: [
        v => !!v || "Email is required",
        v => /.+@.+\..+/.test(v) || "Email must be valid"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length >= 6 || "Minimum 6 characters"
      ]
    };
  },
  methods: {
    gotoLogin() {
      this.$router.push("/");
    },
    async register() {
      let vm = this;
      vm.loading = true;
      vm.error = null;
      try {
        if ((await vm.$refs.form.validate()).valid === true) {
          const res = await axios({
            method: "post",
            url: process.env.VUE_APP_API_URL + "/auth/register",
            headers: {
              token: process.env.VUE_APP_API_SECRET
            },
            data: {
              email: this.user.email,
              password: this.user.password,
              name: this.user.name,
            }
          })
          if (res.status === 200) {
            vm.$router.push('/')
            alert("ចុះឈ្មោះបានជោគជ័យ")
          } else {
            alert(res.data.message)
          }
        }


      } catch (err) {
        vm.error =
            err.response?.data?.message || 'Register failed';
        if (err.response) {
          // Server responded with a status other than 2xx
          alert(err.response.data.message || "Register failed");
        } else {
          // Network or other errors
          alert("Network error. Please try again.");
        }

      } finally {
        vm.loading = false
      }
    },
  }
}
;
</script>


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
</style>