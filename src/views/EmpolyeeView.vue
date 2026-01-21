<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-card>

        <!-- TITLE -->
        <v-card-title class="d-flex align-center">
          <v-icon
              v-if="!isMobile"
              icon="mdi-account"
              size="48"
              color="green-darken-2"
              class="mr-2"
          />
          <span v-if="!isMobile">Emplyee</span>

          <v-spacer/>

          <v-text-field
              v-model="search"
              label="Search"
              density="compact"
              hide-details
              prepend-inner-icon="mdi-magnify"
          />

          <v-spacer/>

          <!--          <add-button
                        v-if="checkRole('Create') && !isMobile"
                        @add="openAdd"
                    />
                    <raise-button
                        v-if="checkRole('Create') && isMobile"
                        @add="openAdd"
                    />-->
        </v-card-title>

        <!-- DATA TABLE -->
        <v-data-table-server
            :headers="headers"
            :items="dataLists"
            :search="search"
            :items-length="totalPage"
            :loading="loading"
            loading-text="Loading... Please wait"
            v-model:page="currentPage"
            v-model:items-per-page="itemsPerPage"
            @update:options="onOptionsChange"
        >
          <template #loading>
            <v-progress-circular indeterminate color="green"/>
          </template>

          <template v-slot:[`item.status`]="{item}">
            <v-chip
                :color="item.status ? 'green' : 'red'"
                :text="item.status ? 'Approved' : 'Pending'"
                class="text-uppercase"
                size="small"
                label
            ></v-chip>
          </template>
          <template v-slot:[`item.action`]="{item}">
            <!--            <v-btn
                            icon
                            color="primary"
                            variant="text"
                            @click="handleUpdate(item)"
                        >
                          <v-icon icon="mdi-pencil"/>
                        </v-btn>

                        <v-btn
                            icon
                            color="error"
                            variant="text"
                            @click="handleRemove(item)"
                        >
                          <v-icon icon="mdi-delete"/>
                        </v-btn>-->
            <v-btn
                v-if="!item.status"
                icon
                color="green"
                variant="text"
                @click="handleApprove(item)"
            >
              <v-icon icon="mdi-shield-check"/>
            </v-btn>
          </template>

          <template #no-data>
            No Data
          </template>
        </v-data-table-server>
      </v-card>
    </v-col>
    <v-snackbar
        v-model="snackbar"
        color="success"
        timeout="3000"
        location="top right"
    >
      Operation successfully!
    </v-snackbar>
    <!-- DIALOG -->
    <v-dialog v-model="dialog" max-width="800">
      <v-form ref="formData" v-model="valid">
        <v-card>
          <v-card-title class="d-flex align-center">
            <v-icon
                :icon="titleClick === 'addEmployee'
                ? 'mdi-library-plus'
                : 'mdi-autorenew'"
                size="36"
                color="green-darken-2"
            />
            <span class="ml-2">Add Employee</span>
            <v-spacer/>
            <close-button @closeForm="dialog = false"/>
          </v-card-title>

          <v-card-text>
            <v-text-field
                v-model="dataObj.name"
                :rules="requireInput"
                label="name"
                required
            />
          </v-card-text>

          <v-card-actions>
            <v-spacer/>
            <reset-button @resetForm="resetForm"/>
            <save-button
                :loading="loading"
                @saveForm="handleSubmit"
            />
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>
<script>
import {useDisplay} from 'vuetify'
import api from "@/util/axios";
import {useAuthStore} from "@/store/auth";

export default {
  name: 'EmployeeView',
  setup() {
    const {mobile} = useDisplay()
    return {isMobile: mobile}
  },
  data() {
    return {
      dialog: false,
      search: '',
      loading: false,
      valid: true,
      snackbar: false,
      currentPage: 1,
      itemsPerPage: 10,
      totalPage: 0,
      pageCount: 0,

      headers: [
        {title: 'Name', key: 'name'},
        {title: 'Email', key: 'email'},
        {title: 'Staus', key: 'status', width: "220px"},
        {title: 'Actions', key: 'action', sortable: false, width: "220px"}
      ],

      dataLists: [],
      titleClick: '',
      dataObj: {_id: '', name: '', email: ""},

      requireInput: [
        v => !!v || 'Please Input Data'
      ]
    }
  },

  methods: {
    openAdd() {
      this.dialog = true
      this.titleClick = 'addEmployee'
    },
    showSuccess() {
      this.snackbar = true
    },
    resetForm() {
      this.$refs.formData.reset()
    },

    onOptionsChange() {
      this.fetchDataTable()
    },
    async handleApprove(doc) {
      let vm = this;
      const ok = await this.$confirm('Are you sure? You want to activate this user?')
      if (!ok) return
      let useAuth = useAuthStore();
      const res = await api.request({
        method: "post",
        url: process.env.VUE_APP_API_URL + "/employee/approve",
        headers: {
          Authorization: `Bearer ${useAuth.token}`,
        },
        data: {
          userId: doc._id
        }
      })
      if (res.status === 200) {
        vm.showSuccess();
        vm.fetchDataTable();
      }
    },
    async fetchDataTable() {
      let vm = this;
      vm.loading = true
      let useAuth = useAuthStore();
      const res = await api.request({
        method: "post",
        url: process.env.VUE_APP_API_URL + "/employee/list",
        headers: {
          Authorization: `Bearer ${useAuth.token}`,
          // Authorization: `${vm.auth.token}`,
        },
        data: {
          page: this.currentPage,
          limit: this.itemsPerPage,
          search: this.search,
        }
      })
      vm.loading = false;
      vm.code = res.data.code;
      if (res.status === 200) {
        vm.dataLists = res.data.data;
        vm.totalPage = res.data.pagination.total;
        vm.pageCount = res.data.pagination.totalPage;
      }

      // Meteor.call(...) same logic
      // set dataLists, totalPage, pageCount
    },

    handleSubmit() {
      if (!this.$refs.formData.validate()) return
      this.loading = true
      // Meteor insert/update
      this.loading = false
      this.dialog = false
    },

    handleUpdate(item) {
      this.dataObj = {...item}
      this.titleClick = 'updateEmployee'
      this.dialog = true
    },

    handleRemove() {
      // Meteor remove logic
    }
  }
}

</script>