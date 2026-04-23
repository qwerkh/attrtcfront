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
<template>
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