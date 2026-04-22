<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar app color="#005BAA" dark v-if="!!userDoc.token">
      <v-app-bar-nav-icon v-if="!!userDoc.token" @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-if="!!userDoc.token">Scan Attendance</v-toolbar-title>

      <!-- Spacer to push buttons to right -->
      <v-spacer></v-spacer>

      <!-- Login / Logout Button -->
      <v-btn v-if="!!userDoc.token" color="white" @click="connectToServer">ភ្ចាប់ជាមួយម៉ាស៊ីនមេ</v-btn>
      <v-btn v-if="!!userDoc.token" color="white" @click="logout">Logout</v-btn>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" app temporary v-if="!!userDoc.token">
      <!-- Profile Section -->
      <v-sheet color="white lighten-4" class="pa-4" elevation="1">
        <v-list dense nav shaped>
          <v-list-item>
            <v-list-item-avatar>
              <v-img
                  src="https://img.freepik.com/premium-vector/professional-male-avatar-profile-picture-employee-work_1322206-66590.jpg"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ userDoc.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ userDoc.username }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

      </v-sheet>

      <v-list density="compact" nav>
        <v-list-item
            v-for="subItem in items"
            :prepend-icon="subItem.action"
            :title="subItem.title"
            :key="subItem.title"
            value="home"
            tag="a"
            v-show="subItem.hasRole()"
            :to="subItem.to"
        ></v-list-item>

        <!--        <v-list-item
                    v-for="subItem in items"
                    :key="subItem.title"
                    tag="a"
                    :to="subItem.to"
                >
                  <v-list-item-icon v-text="subItem.action"></v-list-item-icon>

                  <v-list-item-content link>
                    <v-list-item-title v-text="subItem.title"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>-->
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app padless v-if="!!userDoc.token">
      <v-sheet color="#005BAA" width="100%" class="text-center white--text py-2">
        © 2026 BBWSA AMS
      </v-sheet>
    </v-footer>

    <v-dialog v-model="confirm.show" max-width="400">
      <v-card>
        <v-card-title class="text-h6">
          {{ confirm.title }}
        </v-card-title>

        <v-card-text>
          {{ confirm.message }}
        </v-card-text>

        <v-card-actions>
          <v-spacer/>

          <v-btn variant="text" @click="cancel">
            Cancel
          </v-btn>

          <v-btn color="success" @click="ok">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-app>
</template>

<script>
import {useAuthStore} from '@/store/auth.js'
import {getDeviceId} from '@/lib/GlobalFn';
import axios from "axios";
import {Constants} from "@/lib/constant";

export default {
  data() {
    return {
      drawer: false,
      isLoggedIn: false,
      profile: {
        name: "John Doe",
        email: "john.doe@example.com",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      },
      confirm: {
        show: false,
        title: 'Confirm',
        message: '',
        resolve: null,
      },
      items: [
        /*{
          title: 'Check In List',
          action: "mdi-home-city",
          to: "/checkInByDay",
          hasRole: () => useAuthStore().role == "Admin"
        }, {
          title: 'Employee',
          action: "mdi-account",
          to: "/employee",
          hasRole: () => useAuthStore().role == "Admin"
        },*/
        {
          title: 'Scan Attendance',
          action: "mdi-fullscreen",
          to: "/scan",
          hasRole: () => true
        }
      ],
    };
  },
  methods: {
    openConfirm(message, title = 'Confirm') {
      return new Promise((resolve) => {
        this.confirm = {
          show: true,
          title,
          message,
          resolve,
        }
      })
    },
    ok() {
      this.confirm.show = false
      this.confirm.resolve(true)
    },
    cancel() {
      this.confirm.show = false
      this.confirm.resolve(false)
    },
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    async connectToServer() {
      let device = getDeviceId();
      let useAuth = useAuthStore();
      console.log(device);
      const requestDevice = await axios({
        method: "post",
        url: Constants.VUE_APP_API_URL + "/employee/requestDevice",
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
    login() {
      let vm = this;
      let authStore = useAuthStore();
      authStore.logout();
      vm.$router.push('/');
      if (authStore.token) {
        this.isLoggedIn = true;
      } else {
        vm.isLoggedIn = false;
      }

    },
    logout() {
      let vm = this;
      let authStore = useAuthStore();
      authStore.logout();
      vm.$router.push('/');
      if (authStore.token) {
        this.isLoggedIn = true;
      } else {
        vm.isLoggedIn = false;
      }
    },
  },
  computed: {
    userDoc() {
      let useAuth = useAuthStore();
      return useAuth;
    }
  },
};
</script>

<style>
/* Optional global styles */
</style>
