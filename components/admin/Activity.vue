<template>
  <div class="w-full h-full overflow-auto no-scrollbar p-4">
    <h4 class="font-bold text-primary text-center text-lg m-5">
      Admin Activities
    </h4>
    <loader v-show="this.isPending"></loader>
    <div
      v-show="!this.isPending && this.rows.length > 0"
      class="w-full flex justify-center overflow-hidden"
    >
      <vue-good-table
        class="w-full table-entire-wrapper"
        max-height="600px"
        :columns="columns"
        :rows="rows"
        :fixed-header="true"
        :line-numbers="true"
        :search-options="{
          enabled: true,
          skipDiacritics: true, // desactiver la recherche avec accent
          placeholder: 'Rechercher',
        }"
        :sort-options="{
          enabled: true,
        }"
        :pagination-options="{
          enabled: true,
          perPageDropdown: [100, 150, 200, 300],
        }"
        compactMode
      >
      </vue-good-table>
    </div>
    <!--  -->
    <notification-notif
      v-if="this.notif.show"
      @closeNotif="notif.show = false"
      @confirm_delete_btn="deleteAllAdminActivity"
      :notif="this.notif"
    >
    </notification-notif>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //
      isPending: false, // loader controller

      columns: [
        {
          label: "Status",
          field: "status",
          type: "String",
        },
        {
          label: "IP",
          field: "ip",
          type: "String",
        },
        {
          label: "Role",
          field: "role",
          type: "String",
        },

        {
          label: "Username",
          field: "username",
          type: "String",
        },

        {
          label: "Path",
          field: "path",
          type: "String",
        },

        {
          label: "Date",
          field: "date",
          type: "String",
        },
        {
          label: "Action",
          field: "action",
          html: true,
          width: "100px",
          height: "50px",
          sortable: false,
        },
      ],
      rows: [],
      //
      notif: {
        show: false,
        type: "",
        message: "",
      },
      requestHeader: {
        Authorization: `Bearer ${this.$store.state.admin.token}`,
        "Content-Type": "application/json",
      },
    };
  },
  async fetch() {
    this.isPending = true;
    let resp = await this.$axios.get("/eventh24/getAdminActivity", {
      headers: this.requestHeader,
    });
    this.isPending = false;
    if (resp.data.success) {
      resp.data.result.reverse().forEach((access) => {
        let item = {
          status: access.status,
          ip: access.ip,
          role: access.role,
          username: access.username,
          path: access.path,
          date: access.date,
          action: `<p class="flex justify-between">
                    <i class="fa-solid fa-pen-to-square cursor-pointer text-fourth updateBtn" data-id=${access._id} ></i>
                    <i class="fa-solid fa-trash-can cursor-pointer text-third deleteBtn" data-id=${access._id}></i>
                  </p> `,
        };
        this.rows.push(item);
      });
    }
  },
  mounted() {
    document
      .querySelector(".table-entire-wrapper")
      .addEventListener("click", (e) => {
        if (e.target.classList.contains("deleteBtn")) {
          this.notif.type = "confirm";
          this.notif.show = true;
          this.notif.id = e.target.getAttribute("data-id");
        }
      });
  },
  methods: {
    async deleteAllAdminActivity(id) {
      //the id is not use right now ; it's for deleting all the activities
      this.isPending = true;
      let resp = await this.$axios.post(
        "/eventh24/deleteAllAdminActivity",
        {},
        {
          headers: this.requestHeader,
        }
      );
      this.isPending = false;
      // setup notification
      if (resp.data.success) {
        this.rows = [];
        this.notif.show = true;
        this.notif.type = "success";
        this.notif.message = resp.data.message;
      } else {
        this.notif.show = true;
        this.notif.type = "error";
        this.notif.message = resp.data.message;
      }
    },
  },
};
</script>