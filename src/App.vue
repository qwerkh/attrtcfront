<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar app color="primary" dark v-if="!!userDoc.token">
      <v-app-bar-nav-icon v-if="!!userDoc.token" @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-if="!!userDoc.token">Scan Attendance</v-toolbar-title>

      <!-- Spacer to push buttons to right -->
      <v-spacer></v-spacer>

      <!-- Login / Logout Button -->
      <v-btn v-if="!!userDoc.token" color="white" @click="logout">Logout</v-btn>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" app temporary v-if="!!userDoc.token">
      <!-- Profile Section -->
      <v-sheet color="white lighten-4" class="pa-4" elevation="1">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ userDoc.userName }}</v-list-item-title>
            <v-list-item-subtitle>{{ userDoc.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-sheet>

      <v-divider class="my-2"></v-divider>

    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app padless v-if="!!userDoc.token">
      <v-sheet color="primary" width="100%" class="text-center white--text py-2">
        © 2025 RPITSB
      </v-sheet>
    </v-footer>
  </v-app>
</template>

<script>
import {useAuthStore} from '@/store/auth.js'

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
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
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
