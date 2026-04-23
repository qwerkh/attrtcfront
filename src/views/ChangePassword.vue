<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-form
          :model="valid" ref="formData"
          lazy-validation
      >
        <v-img
            cover
            src="https://img.freepik.com/premium-vector/professional-male-avatar-profile-picture-employee-work_1322206-66590.jpg"></v-img>
        <v-row>
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
            <v-text-field label="លេខសំងាត់ចាស់" type="password" required
                          v-model="user.oldPassword"
                          :rules="passwordRules"
            ></v-text-field>
          </v-col>


          <v-col cols="12" md="12" sm="12">
            <v-text-field label="លេខសំងាត់ថ្មី" type="password" required
                          v-model="user.password"
                          :rules="passwordRules"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="12" sm="12">
            <v-text-field label="បញ្ចាក់លេខសំងាត់ថ្មី" type="password" required
                          v-model="user.confirmPassword"
                          :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
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
</template>

<script>
import {useAuthStore} from "@/store/auth";

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
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be more than 6 characters',
      ],
      confirmPasswordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be more than 6 characters',
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
    handleSubmit() {
      // let vm = this;

      /*if (vm.$refs.formData.validate()) {
        vm.loading = true;

        Accounts.changePassword(vm.user.oldPassword, vm.user.password, (err, result) => {
          if (!err) {
            this.$message({
              message: this.$t('successNotification'),
              showClose: true,
              type: 'success'
            });
            vm.loading = false;
            vm.$store.dispatch("logoutUser");
          } else {
            console.log(err.message);
            this.$message({
              message: err.message,
              showClose: true,
              type: 'error'
            });

          }
        })
        /!*Meteor.call("base_updateProfile", vm.user._id, vm.user,Constants.secret (err, result) => {
            if (!err) {
                this.$message({
                    message: this.$t('successNotification'),
                    showClose: true,
                    type: 'success'
                });
                vm.updateUser(Meteor.user());
                vm.loading = false;
            } else {
                console.log(err.message);
                this.$message({
                    message: err.message,
                    showClose: true,
                    type: 'error'
                });

            }
        })*!/
      }*/
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