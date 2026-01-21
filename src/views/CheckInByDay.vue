<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-card>

        <!-- TITLE -->
        <v-card-title class="d-flex align-center">
          <v-icon
              v-if="!isMobile"
              icon="mdi-check-circle-outline"
              size="48"
              color="green-darken-2"
              class="mr-2"
          />
          <span v-if="!isMobile">Attendant List</span>

          <v-spacer/>

          <v-menu
              v-model="menu"
              :close-on-content-click="true"
              :return-value="params.datestart"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
          >
            <template #activator="{ props }">
              <v-text-field
                  v-model="datestartText"
                  label="Start Date"
                  prepend-inner-icon="mdi-calendar-range"
                  readonly
                  v-bind="props"
              ></v-text-field>
            </template>

            <v-date-picker
                :max="params.dateend"
                v-model="params.datestart"
                @update:model-value="updateDatesText"
            ></v-date-picker>
          </v-menu>
          <v-menu
              v-model="menuEnd"
              :close-on-content-click="true"
              :return-value="params.dateend"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
          >
            <template #activator="{ props }">
              <v-text-field
                  v-model="dateendText"
                  label="End Date"
                  prepend-inner-icon="mdi-calendar-range"
                  readonly
                  v-bind="props"
              ></v-text-field>
            </template>

            <v-date-picker
                :min="params.datestart"
                v-model="params.dateend"
                @update:model-value="updateDateEndText"
            ></v-date-picker>
          </v-menu>

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
            hide-default-footer
        >
          <template #loading>
            <v-progress-circular indeterminate color="green"/>
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
import moment from "moment";

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
      menu: false, // controls v-menu
      menuEnd: false, // controls v-menu
      // selected range
      datestartText: moment().format("DD/MM/YYYY"), // text to show in v-text-field
      dateendText: moment().format("DD/MM/YYYY"), // text to show in v-text-field
      loading: false,
      valid: true,
      snackbar: false,
      currentPage: 1,
      itemsPerPage: 70000,
      totalPage: 0,
      pageCount: 0,
      params: {
        datestart: moment().format("YYYY-MM-DD"),
        dateend: moment().format("YYYY-MM-DD"),
      },
      headers: [
        {title: 'ឈ្មោះ', key: 'name'},
        {title: 'យឺតពេលព្រឹក (ចូល)-នាទី', key: 'MorningIn'},
        {title: 'ចេញមុនពេលព្រឹក (ចេញ)-នាទី', key: 'MorningOut'},
        {title: 'យឺតពេលរសៀល(ចូល)-នាទី', key: 'AfternoonIn'},
        {title: 'ចេញមុនពេលរសៀល(ចេញ)-នាទី', key: 'AfternoonOut'},
        {title: 'ថ្ងៃ', key: 'date'},
      ],

      dataLists: [],
      titleClick: '',
      dataObj: {_id: '', name: '', email: ""},

      requireInput: [
        v => !!v || 'Please Input Data'
      ]
    }
  },
  watch: {
    "params.datestart"() {
      this.fetchDataTable();
    },
    "params.dateend"() {
      this.fetchDataTable();
    },
  },
  methods: {
    updateDatesText(value) {
      this.datestartText = value
          ? `${moment(value).format('DD/MM/YYYY')}`
          : ""

    },
    updateDateEndText(value) {
      this.dateendText = value
          ? `${moment(value).format('DD/MM/YYYY')}`
          : ""

    },
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
    async fetchDataTable() {
      let vm = this;
      vm.loading = true
      let useAuth = useAuthStore();
      const res = await api.request({
        method: "post",
        url: process.env.VUE_APP_API_URL + "/scan/byDay",
        headers: {
          Authorization: `Bearer ${useAuth.token}`,
          // Authorization: `${vm.auth.token}`,
        },
        data: {
          page: vm.currentPage,
          limit: vm.itemsPerPage,
          datestart: moment(vm.params.datestart).format("YYYY-MM-DD"),
          dateend: moment(vm.params.dateend).format("YYYY-MM-DD"),
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