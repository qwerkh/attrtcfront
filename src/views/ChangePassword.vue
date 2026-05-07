<!--<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-form
          :model="valid" ref="formData"
          lazy-validation
      >
        <v-row>
          <v-col cols="12" class="text-center">
            <h2>ប្តូរលេខសំងាត់</h2>
          </v-col>

          <v-col cols="12" md="12" sm="12">
            <v-text-field
                v-model="user.username"
                label="លេខទូរស័ព្ទ"
                persistent-hint
                required
                disabled
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="12" sm="12">
            <v-text-field label="លេខសំងាត់ចាស់"  required
                          v-model="user.oldPassword"
                          :rules="passwordRules"
                          autocomplete
                          :append-inner-icon="showOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="showOldPassword ? 'text' : 'password'"
                          @click:append-inner="showOldPassword = !showOldPassword"
            ></v-text-field>
          </v-col>


          <v-col cols="12" md="12" sm="12">
            <v-text-field label="លេខសំងាត់ថ្មី" required
                          v-model="user.password"
                          :rules="passwordRules"
                          autocomplete
                          :append-inner-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="showNewPassword ? 'text' : 'password'"
                          @click:append-inner="showNewPassword = !showNewPassword"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="12" sm="12">
            <v-text-field label="បញ្ចាក់លេខសំងាត់ថ្មី" required
                          v-model="user.confirmPassword"
                          autocomplete
                          :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
                          :append-inner-icon="showNewConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="showNewConfirmPassword ? 'text' : 'password'"
                          @click:append-inner="showNewConfirmPassword = !showNewConfirmPassword"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="12" sm="12" style="text-align: center">
            <v-spacer></v-spacer>
            <v-hover
                v-slot:default="{ hover }"
                close-delay="200"
            >
              <v-btn class="mr-4"
                     color="success"
                     large
                     outlined
                     x-large
                     @click="handleSubmit()"
                     rounded
                     :elevation="hover ? 16 :0"
              >
                <span class="font-weight-bold"><v-icon>mdi-check-circle</v-icon> រក្សទុក</span>
              </v-btn>
            </v-hover>
          </v-col>
        </v-row>
      </v-form>
    </v-row>
  </v-container>
</template>-->
<!--<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card border="0" elevation="0" rounded="xl" class="pa-3">

          <v-card-title class="text-center">
            <h2 class="w-100">ប្តូរលេខសំងាត់</h2>
          </v-card-title>

          <v-form v-model="valid" ref="formData" lazy-validation>
            <v-text-field
                class="mb-3"
                v-model="user.username"
                label="លេខទូរស័ព្ទ"
                disabled
            />

            <v-text-field
                class="mb-3"
                label="លេខសំងាត់ចាស់"
                v-model="user.oldPassword"
                :type="showOldPassword ? 'text' : 'password'"
                :append-inner-icon="showOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="showOldPassword = !showOldPassword"
            />

            <v-text-field
                class="mb-3"
                label="លេខសំងាត់ថ្មី"
                v-model="user.password"
                :type="showNewPassword ? 'text' : 'password'"
                :append-inner-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="showNewPassword = !showNewPassword"
            />

            <v-text-field
                class="mb-4"
                label="បញ្ចាក់លេខសំងាត់ថ្មី"
                v-model="user.confirmPassword"
                :type="showNewConfirmPassword ? 'text' : 'password'"
                :append-inner-icon="showNewConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="showNewConfirmPassword = !showNewConfirmPassword"
            />

            <v-btn
                block
                color="success"
                size="large"
                rounded="xl"
                @click="handleSubmit()"
            >
              <v-icon start>mdi-check-circle</v-icon>
              រក្សទុក
            </v-btn>

          </v-form>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>-->

<template>
  <v-container fluid class="change-password-page pa-4">
    <v-row align="center" justify="center" class="fill-height">
      <v-col cols="12" sm="10" md="6" lg="4">

        <v-card class="password-card" elevation="0">

          <!-- Top Gradient -->
          <div class="top-header">
            <div class="icon-wrapper">
              <v-icon size="48" color="white">
                mdi-lock-reset
              </v-icon>
            </div>
          </div>

          <v-card-text class="pa-8">

            <!-- Title -->
            <div class="text-center mb-8">
              <h1 class="title-text">ប្តូរលេខសំងាត់</h1>

              <p class="subtitle-text">
                សូមបំពេញព័ត៌មានខាងក្រោមដើម្បីប្តូរលេខសំងាត់ថ្មី
              </p>
            </div>

            <!-- Form -->
            <v-form
                v-model="valid"
                ref="formData"
                lazy-validation
            >

              <!-- Phone -->
              <v-text-field
                  class="modern-input"
                  v-model="user.username"
                  label="លេខទូរស័ព្ទ"
                  prepend-inner-icon="mdi-phone-outline"
                  variant="outlined"
                  rounded="xl"
                  disabled
              />

              <!-- Old Password -->
              <v-text-field
                  class="modern-input"
                  label="លេខសំងាត់ចាស់"
                  v-model="user.oldPassword"
                  :type="showOldPassword ? 'text' : 'password'"
                  :append-inner-icon="
                  showOldPassword
                    ? 'mdi-eye-off-outline'
                    : 'mdi-eye-outline'
                "
                  prepend-inner-icon="mdi-lock-outline"
                  @click:append-inner="
                  showOldPassword = !showOldPassword
                "
                  variant="outlined"
                  rounded="xl"
              />

              <!-- New Password -->
              <v-text-field
                  class="modern-input"
                  label="លេខសំងាត់ថ្មី"
                  v-model="user.password"
                  :type="showNewPassword ? 'text' : 'password'"
                  :append-inner-icon="
                  showNewPassword
                    ? 'mdi-eye-off-outline'
                    : 'mdi-eye-outline'
                "
                  prepend-inner-icon="mdi-lock-plus-outline"
                  @click:append-inner="
                  showNewPassword = !showNewPassword
                "
                  variant="outlined"
                  rounded="xl"
              />

              <!-- Confirm Password -->
              <v-text-field
                  class="modern-input"
                  label="បញ្ចាក់លេខសំងាត់ថ្មី"
                  v-model="user.confirmPassword"
                  :type="showNewConfirmPassword ? 'text' : 'password'"
                  :append-inner-icon="
                  showNewConfirmPassword
                    ? 'mdi-eye-off-outline'
                    : 'mdi-eye-outline'
                "
                  prepend-inner-icon="mdi-shield-check-outline"
                  @click:append-inner="
                  showNewConfirmPassword = !showNewConfirmPassword
                "
                  variant="outlined"
                  rounded="xl"
              />

              <!-- Save Button -->
              <v-btn
                  block
                  size="x-large"
                  class="save-btn mt-6"
                  @click="handleSubmit()"
              >
                <v-icon start>
                  mdi-check-circle-outline
                </v-icon>

                រក្សាទុក
              </v-btn>

            </v-form>

          </v-card-text>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import {useAuthStore} from "@/store/auth";
import axios from "axios";

export default {
  data() {
    return {
      valid: true,
      dense: true,
      user: {
        _id: "",
        username: "",
        oldPassword: "",
        password: "",
        confirmPassword: "",
      },
      showOldPassword: false,
      showNewPassword: false,
      showNewConfirmPassword: false,
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 3) || 'Password must be more than 6 characters',
      ],
      confirmPasswordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 3) || 'Password must be more than 6 characters',
      ],
    }
  },

  methods: {
    resetForm() {
      this.$refs.formData.reset()
    },

    /*onFileSelected(e) {
      let vm = this;
      this.selectedFile = e.target.files[0];
      setTimeout(function () {
        vm.onUpload();

      }, 500);
    },*/
    /*onUpload() {
      let vm = this;
      const storageRef = firebase.storage().ref("user" + moment().format("YYYYMMDDHHmmss") + this.selectedFile.name).put(this.selectedFile);
      storageRef.on(`state_changed`, snapshot => {
            this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          }, error => {
            console.log(error.message)
          },
          () => {
            this.uploadValue = 100;
            storageRef.snapshot.ref.getDownloadURL().then((url) => {
              vm.user.url = url || "";
              /!*Meteor.call("base_updateProfileImg", vm.user._id, url, Constants.secret, (err, result) => {
                if (err) {

                  console.log(err.message);
                }
              })*!/
            });
          }
      );
    },*/
    async handleSubmit() {
      let vm = this;

      if (vm.$refs.formData.validate()) {
        vm.loading = true;
        let useAuth = useAuthStore();
        const response = await axios({
          method: "post",
          url: process.env.VUE_APP_API_URL + "/user/changePassword",
          headers: {
            token: `${useAuth.token}`,
          },
          data: {
            userId: useAuth.userId,
            oldPassword: vm.user.oldPassword,
            newPassword: vm.user.password,
          }
        })
        window.toastr.options = {
          "positionClass": "toast-top-center"
        };
        if (response.data.code === 201) {
          window.toastr.success("ប្តូរលេខសំងាត់បានជោគជ័យ!");
        } else {
          let message = response.data.message;
          window.toastr.warning(message);
        }
        vm.loading = false;
      }
    },

  },
  computed: {
    passwordConfirmationRule() {
      return () =>
          this.user.password === this.user.confirmPassword || "Password must match";
    }
  },
  created() {
    let useAuth = useAuthStore();
    this.user._id = useAuth.userId;
    this.user.username = useAuth.username;
  }
}
</script>

<style scoped>

.change-password-page {
  min-height: 100vh;

  background:
      linear-gradient(
          135deg,
          #eef2ff 0%,
          #f8fafc 50%,
          #ffffff 100%
      );
}

/* Card */
.password-card {
  overflow: hidden;
  border-radius: 30px;

  background: rgba(255,255,255,0.95);

  backdrop-filter: blur(12px);

  box-shadow:
      0 10px 40px rgba(0,0,0,0.08);
}

/* Header */
.top-header {
  height: 160px;

  background:
      linear-gradient(
          135deg,
          #2563eb,
          #4f46e5
      );

  display: flex;
  align-items: center;
  justify-content: center;

  border-bottom-left-radius: 50% 20%;
  border-bottom-right-radius: 50% 20%;
}

/* Lock Icon */
.icon-wrapper {
  width: 90px;
  height: 90px;

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  background:
      rgba(255,255,255,0.15);

  backdrop-filter: blur(8px);

  border:
      2px solid rgba(255,255,255,0.2);

  box-shadow:
      0 8px 20px rgba(0,0,0,0.15);
}

/* Title */
.title-text {
  font-size: 30px;
  font-weight: 800;
  color: #0f172a;
}

.subtitle-text {
  margin-top: 10px;

  color: #64748b;

  line-height: 1.7;
}

/* Input */
.modern-input {
  margin-bottom: 18px;
}

/* Vuetify Input Styling */
:deep(.v-field) {
  border-radius: 18px !important;

  background: #f8fafc !important;

  box-shadow: none !important;

  transition: 0.3s;
}

:deep(.v-field:hover) {
  background: #f1f5f9 !important;
}

:deep(.v-field--focused) {
  background: white !important;

  box-shadow:
      0 0 0 4px rgba(59,130,246,0.10) !important;
}

/* Button */
.save-btn {
  height: 58px !important;

  border-radius: 18px !important;

  font-size: 18px !important;

  font-weight: bold !important;

  text-transform: none !important;

  color: white !important;

  background:
      linear-gradient(
          135deg,
          #16a34a,
          #22c55e
      ) !important;

  box-shadow:
      0 8px 20px rgba(34,197,94,0.35);

  transition: 0.3s;
}

.save-btn:hover {
  transform: translateY(-2px);
}

/* Mobile */
@media (max-width: 600px) {

  .title-text {
    font-size: 24px;
  }

  .subtitle-text {
    font-size: 14px;
  }

  .save-btn {
    font-size: 16px !important;
  }
}

</style>