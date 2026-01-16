<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
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

            <div ref="telegramBtn"></div>

          </v-card-actions>

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
  mounted() {
    this.loadTelegramWidget();
  },
  methods: {
    loadTelegramWidget() {
      // Make callback global (Telegram requirement)
      window.onTelegramAuth = this.onTelegramAuth;

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

      this.$refs.telegramBtn.appendChild(script);
    },
    async onTelegramAuth(user) {
      try {
        const res = await fetch(process.env.VUE_APP_API_URL + "/auth/telegram", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

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
    },
    async login() {
      let vm = this;
      vm.loading = true;
      vm.error = null;
      try {
        console.log((await vm.$refs.form.validate()).valid);
        if ((await vm.$refs.form.validate()).valid === true) {
          console.log("Jol");
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
          console.log(res);
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
</style>