<!--<template>
  <v-app>
    &lt;!&ndash; App Bar &ndash;&gt;
    <v-app-bar app color="#005BAA" dark v-if="!!userDoc.token">
      <v-app-bar-nav-icon v-if="!!userDoc.token" @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-if="!!userDoc.token">Scan Attendance</v-toolbar-title>

      &lt;!&ndash; Spacer to push buttons to right &ndash;&gt;
      <v-spacer></v-spacer>

      &lt;!&ndash; Login / Logout Button &ndash;&gt;
      <v-btn v-if="!!userDoc.token" color="white" @click="connectToServer">ភ្ចាប់ជាមួយម៉ាស៊ីនមេ</v-btn>
      <v-btn v-if="!!userDoc.token" color="white" @click="logout">Logout</v-btn>
    </v-app-bar>

    &lt;!&ndash; Navigation Drawer &ndash;&gt;
    <v-navigation-drawer v-model="drawer" app temporary v-if="!!userDoc.token">
      &lt;!&ndash; Profile Section &ndash;&gt;
      <v-sheet color="white lighten-4" class="pa-4" elevation="1">
        <v-list dense nav shaped>
          <v-list-item>
            <v-list-item-avatar>
              <v-img v-if="userDoc.url==='' && userDoc.gender==='1'"
                     src="/profile-male.png"></v-img>
              <v-img v-if="userDoc.url==='' && userDoc.gender==='2'"
                     src="/profile-female.png"></v-img>

              <v-img v-if="userDoc.url!=='' && userDoc.url!==null && userDoc.url!==undefined"
                     :src="userDoc.url"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <br>
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
            style="line-height: 1.8rem !important;"
            tag="a"
            v-show="subItem.hasRole()"
            :to="subItem.to"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    &lt;!&ndash; Main Content &ndash;&gt;
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    &lt;!&ndash; Footer &ndash;&gt;
    <v-footer app padless v-if="!!userDoc.token">
      <v-sheet color="#005BAA" width="100%" class="text-center white&#45;&#45;text py-2">
        © 2026 BWU AMS
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
</template>-->

<template>
  <v-app class="modern-app">

    <!-- ================= APP BAR ================= -->
    <v-app-bar
        app
        flat
        height="78"
        class="modern-app-bar"
        v-if="!!userDoc.token"
    >

      <!-- Menu Button -->
      <v-btn
          icon
          variant="text"
          @click="toggleDrawer"
          class="menu-btn"
      >
        <v-icon size="28">mdi-menu</v-icon>
      </v-btn>

      <!-- Logo + Title -->
      <div class="d-flex align-center">

        <div class="logo-box">
          <v-icon color="white" size="22">
            mdi-qrcode-scan
          </v-icon>
        </div>

        <div class="ml-3">
          <h2 class="app-title">
            Scan Attendance
          </h2>

          <p class="app-subtitle">
            Attendance Management System
          </p>
        </div>
      </div>

      <v-spacer></v-spacer>

      <!-- Server Button -->
      <v-btn
          class="server-btn mr-2"
          @click="connectToServer"
      >
        <v-icon start size="18">
          mdi-connection
        </v-icon>

        ភ្ជាប់ម៉ាស៊ីនមេ
      </v-btn>

      <!-- Logout -->
      <v-btn
          icon
          variant="text"
          @click="logout"
          class="logout-btn"
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>

    </v-app-bar>

    <!-- ================= DRAWER ================= -->
    <v-navigation-drawer
        v-model="drawer"
        app
        temporary
        width="300"
        class="modern-drawer"
        v-if="!!userDoc.token"
    >

      <!-- Drawer Header -->
      <div class="drawer-header">

        <div class="drawer-overlay"></div>

        <div class="profile-section">

          <v-avatar
              size="90"
              class="profile-avatar"
          >

            <!-- Male -->
            <v-img
                v-if="userDoc.url==='' && userDoc.gender==='1'"
                src="/profile-male.png"
            />

            <!-- Female -->
            <v-img
                v-if="userDoc.url==='' && userDoc.gender==='2'"
                src="/profile-female.png"
            />

            <!-- Custom -->
            <v-img
                v-if="
                userDoc.url!=='' &&
                userDoc.url!==null &&
                userDoc.url!==undefined
              "
                :src="userDoc.url"
            />

          </v-avatar>

          <h2 class="user-name">
            {{ userDoc.name }}
          </h2>

          <p class="user-phone">
            {{ userDoc.username }}
          </p>

        </div>
      </div>

      <!-- Menu -->
      <div class="pa-4">

        <div class="menu-label">
          MENU
        </div>

        <v-list
            nav
            density="comfortable"
            bg-color="transparent"
        >

          <v-list-item
              v-for="subItem in items"
              :key="subItem.title"
              v-show="subItem.hasRole()"
              :to="subItem.to"
              rounded="xl"
              class="menu-item mb-2"
          >

            <template v-slot:prepend>
              <v-icon class="mr-3">
                {{ subItem.action }}
              </v-icon>
            </template>

            <v-list-item-title>
              {{ subItem.title }}
            </v-list-item-title>

          </v-list-item>
          <v-list-item
              key="connectToServer"
              @click="connectToServer"
              rounded="xl"
              class="menu-item mb-2"
          >

            <template v-slot:prepend>
              <v-icon class="mr-3">
                mdi-connection
              </v-icon>
            </template>

            <v-list-item-title>
              ភ្ជាប់ម៉ាស៊ីនមេ
            </v-list-item-title>

          </v-list-item>

        </v-list>
      </div>

    </v-navigation-drawer>

    <!-- ================= MAIN ================= -->
    <v-main class="main-content">

      <!-- Background -->
      <div class="background-decoration"></div>

      <v-container fluid class="pa-4">
        <router-view></router-view>
      </v-container>

    </v-main>

    <!-- ================= FOOTER ================= -->
    <v-footer
        app
        border="0"
        class="modern-footer"
        v-if="!!userDoc.token"
    >

      <div class="footer-content">
        © 2026 BWU AMS • All Rights Reserved
      </div>

    </v-footer>

    <!-- ================= DIALOG ================= -->
    <v-dialog
        v-model="confirm.show"
        max-width="420"
    >

      <v-card class="confirm-dialog">

        <v-card-title class="dialog-title">

          <div class="dialog-icon">
            <v-icon color="white">
              mdi-alert-circle-outline
            </v-icon>
          </div>

          <div class="ml-4">
            {{ confirm.title }}
          </div>

        </v-card-title>

        <v-card-text class="dialog-text">
          {{ confirm.message }}
        </v-card-text>

        <v-card-actions class="pa-4">

          <v-spacer/>

          <v-btn
              variant="text"
              rounded="xl"
              @click="cancel"
          >
            Cancel
          </v-btn>

          <v-btn
              rounded="xl"
              class="ok-btn"
              @click="ok"
          >
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
          title: 'ចុះវត្តមាន',
          action: "mdi-fullscreen",
          to: "/scan",
          hasRole: () => useAuthStore().roles.indexOf("Employee") > -1
        },
        {
          title: 'ប្តូរលេខសំងាត់',
          action: "mdi-lock-reset",
          to: "/changePassword",
          hasRole: () => useAuthStore().roles.indexOf("Employee") > -1
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
      const requestDevice = await axios({
        method: "post",
        url: process.env.VUE_APP_API_URL + "/employee/requestDevice",
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

<!--<style>
/* Optional global styles */

.v-list-item&#45;&#45;nav .v-list-item-title {
  line-height: 1.8rem !important;
}
</style>-->


<style scoped>

.v-list-item--nav .v-list-item-title {
  line-height: 1.8rem !important;
}
/* ================= APP ================= */

.modern-app {
  background:
      linear-gradient(
          135deg,
          #eef2ff 0%,
          #f8fafc 50%,
          #ffffff 100%
      );
}

/* ================= APP BAR ================= */

.modern-app-bar {
  background:
      rgba(255,255,255,0.85) !important;

  backdrop-filter:
      blur(12px);

  border-bottom:
      1px solid rgba(255,255,255,0.2);

  box-shadow:
      0 4px 25px rgba(0,0,0,0.05) !important;
}

.menu-btn {
  margin-right: 10px;
}

.logo-box {
  width: 45px;
  height: 45px;

  border-radius: 14px;

  display: flex;
  align-items: center;
  justify-content: center;

  background:
      linear-gradient(
          135deg,
          #2563eb,
          #4f46e5
      );

  box-shadow:
      0 8px 20px rgba(79,70,229,0.3);
}

.app-title {
  font-size: 18px;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
}

.app-subtitle {
  font-size: 12px;
  color: #64748b;
  margin: 0;
}

.server-btn {
  height: 42px !important;

  border-radius: 14px !important;

  color: white !important;

  font-weight: 700 !important;

  text-transform: none !important;

  background:
      linear-gradient(
          135deg,
          #2563eb,
          #4f46e5
      ) !important;

  box-shadow:
      0 8px 18px rgba(79,70,229,0.25);
}

.logout-btn {
  color: #ef4444 !important;
}

/* ================= DRAWER ================= */

.modern-drawer {
  border-right: none !important;
}

.drawer-header {
  position: relative;

  height: 260px;

  background:
      linear-gradient(
          135deg,
          #2563eb,
          #4f46e5
      );

  overflow: hidden;
}

.drawer-overlay {
  position: absolute;

  inset: 0;

  background:
      radial-gradient(
          rgba(255,255,255,0.15),
          transparent
      );
}

.profile-section {
  position: relative;
  z-index: 2;

  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.profile-avatar {
  border:
      4px solid rgba(255,255,255,0.4);

  box-shadow:
      0 10px 25px rgba(0,0,0,0.18);
}

.user-name {
  margin-top: 18px;

  color: white;

  font-size: 22px;
  font-weight: 800;
}

.user-phone {
  color: rgba(255,255,255,0.85);
  margin-top: 5px;
}

.menu-label {
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;

  color: #94a3b8;

  margin-bottom: 14px;
}

.menu-item {
  min-height: 56px;

  color: #334155;

  transition: 0.3s;
}

.menu-item:hover {
  background: #eef2ff;
  transform: translateX(4px);
}

.menu-item.v-list-item--active {
  background:
      linear-gradient(
          135deg,
          #2563eb,
          #4f46e5
      );

  color: white;
}

/* ================= MAIN ================= */

.main-content {
  position: relative;
}

.background-decoration {
  position: fixed;

  top: -150px;
  right: -150px;

  width: 350px;
  height: 350px;

  border-radius: 50%;

  background:
      radial-gradient(
          rgba(99,102,241,0.15),
          transparent 70%
      );

  z-index: 0;
}

/* ================= FOOTER ================= */

.modern-footer {
  background:
      rgba(255,255,255,0.85) !important;

  backdrop-filter:
      blur(10px);

  border-top:
      1px solid rgba(255,255,255,0.2);

  box-shadow:
      0 -4px 20px rgba(0,0,0,0.03);
}

.footer-content {
  width: 100%;

  text-align: center;

  color: #64748b;

  font-weight: 600;

  padding: 12px 0;
}

/* ================= DIALOG ================= */

.confirm-dialog {
  border-radius: 26px !important;

  overflow: hidden;
}

.dialog-title {
  display: flex;
  align-items: center;

  padding: 24px;
}

.dialog-icon {
  width: 50px;
  height: 50px;

  border-radius: 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  background:
      linear-gradient(
          135deg,
          #2563eb,
          #4f46e5
      );
}

.dialog-text {
  color: #475569;

  font-size: 16px;

  line-height: 1.8;
}

.ok-btn {
  color: white !important;

  text-transform: none !important;

  background:
      linear-gradient(
          135deg,
          #16a34a,
          #22c55e
      ) !important;
}

/* ================= MOBILE ================= */

@media (max-width: 600px) {

  .server-btn {
    display: none;
  }

  .app-title {
    font-size: 16px;
  }

  .app-subtitle {
    display: none;
  }

  .drawer-header {
    height: 230px;
  }

  .user-name {
    font-size: 20px;
  }
}

</style>
