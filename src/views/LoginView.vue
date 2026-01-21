<template>
  <!--  <v-app>
      &lt;!&ndash; Background container &ndash;&gt;
      <div class="background">
        <v-card class="form-card" elevation="10" width="360">
          <v-card-title class="white&#45;&#45;text justify-center" style="font-weight: 700; font-size: 24px;">
            Login
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              &lt;!&ndash; Username &ndash;&gt;
              <v-text-field
                  v-model="username"
                  label="Username"
                  prepend-inner-icon="mdi-account"
                  variant="outlined"
                  rounded
                  color="white"
                  :rules="usernameRules"
                  hide-details="auto"
                  class="white-input"
              ></v-text-field>

              &lt;!&ndash; Password &ndash;&gt;
              <v-text-field
                  v-model="password"
                  label="Password"
                  prepend-inner-icon="mdi-lock"
                  type="password"
                  variant="outlined"
                  rounded
                  color="white"
                  :rules="passwordRules"
                  hide-details="auto"
                  class="white-input"
              ></v-text-field>

              <div class="actions-row">
                <v-checkbox
                    v-model="remember"
                    label="Remember me"
                    class="white&#45;&#45;text"
                    hide-details
                    dense
                    color="white"
                ></v-checkbox>

                <a href="#" class="forgot-link">Forgot password?</a>
              </div>

              <v-btn
                  class="mt-4"
                  color="white"
                  rounded
                  block
                  :disabled="!valid"
                  @click="submit"
              >
                Login
              </v-btn>

              <div class="register-text white&#45;&#45;text">
                Don't have an account? <a href="#" class="register-link">Register</a>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </div>
    </v-app>-->

  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="form-card" elevation="10" :loading="loading">
          <!-- Title -->
          <v-card-text class="text-h6 text-center">
            Login
          </v-card-text>

          <!-- Form -->

          <v-card-text>
            <v-form ref="form" v-model="valid">
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
          <!--          <v-card-text class="text-center">
                      <div ref="telegramBtn"></div>
                    </v-card-text>-->
          <!-- Actions -->
          <v-card-actions class="justify-end">
            <v-btn
                color="primary"
                size="large"
                variant="elevated"
                outlined
                block
                @click="login"
            >
              Login
            </v-btn>
            <br>

          </v-card-actions>
          <div class="register-text" style="margin-bottom: 20px">
            Don't have an account? <a @click="gotoRegister" class="register-link">Register</a>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import {useAuthStore} from "@/store/auth.js"

export default {
  name: "LoginView",
  data() {
    return {
      valid: false,
      user: {
        email: "",
        password: "",
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
  /*mounted() {
    window.onTelegramAuth = this.onTelegramAuth.bind(this);
    this.loadTelegramWidget();
  },*/
  methods: {
    /*loadTelegramWidget() {
      // Make callback global (Telegram requirement)
      window.onTelegramAuth = this.onTelegramAuth.bind(this);

      // Remove existing widget if remounted
      if (this.$refs.telegramBtn.firstChild) {
        this.$refs.telegramBtn.innerHTML = "";
      }

      const script = document.createElement("script");
      script.src = "https://telegram.org/js/telegram-widget.js?22";
      script.async = true;

      script.setAttribute("data-telegram-login", process.env.VUE_APP_TELEGRAM_BOT_USERNAME);
      script.setAttribute("data-size", "large");
      script.setAttribute("data-userpic", "true");
      script.setAttribute("data-request-access", "write");
      script.setAttribute("data-onauth", "onTelegramAuth(user)");
      console.log("Jol0");
      this.$refs.telegramBtn.appendChild(script);
    },
    async onTelegramAuth(user) {
      try {
        console.log(user);
        const res = await fetch(process.env.VUE_APP_API_URL + "/auth/telegram", {
          method: "POST",
          headers: {
            token: process.env.VUE_APP_API_SECRET,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        console.log(res);
        const data = await res.json();

        if (data.success) {
          console.log("Logged in:", data.user);

          // Example: store token / user
          // localStorage.setItem("token", data.token);

          this.$emit("login-success", data.user);
        } else {
          console.error("Telegram login failed");
        }
      } catch (err) {
        console.error("Auth error:", err);
      }
    },*/
    gotoRegister() {
      this.$router.push('/register');
    },
    async login() {
      let vm = this;
      vm.loading = true;
      vm.error = null;
      try {
        if ((await vm.$refs.form.validate()).valid === true) {
          const res = await axios({
            method: "post",
            url: process.env.VUE_APP_API_URL + "/auth/login",
            headers: {
              token: process.env.VUE_APP_API_SECRET
            },
            data: {
              email: this.user.email,
              password: this.user.password,
            }
          })
          if (res.status === 200) {
            let useAuth = useAuthStore();
            useAuth.login(res.data)
            // Redirect (if router used)
            vm.$router.push('/scan')
          } else {
            alert(res.data.message)
          }
        }


      } catch (err) {
        vm.error =
            err.response?.data?.message || 'Login failed';
        if (err.response) {
          // Server responded with a status other than 2xx
          alert(err.response.data.message || "Login failed");
        } else {
          // Network or other errors
          alert("Network error. Please try again.");
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