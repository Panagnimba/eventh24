<template>
  <div
    @click.stop="closeNotif($event)"
    class="
      h-full
      w-full
      fixed
      top-0
      rightSideMenuWrapper
      flex
      justify-center
      items-center
    "
    ref="wrapper"
  >
    <div class="w-full sm:w-1/3 lg:w-1/4 bg-white rounded-lg text-lg">
      <div
        v-if="this.notif.type == 'confirm'"
        class="flex flex-col justify-center items-center gap-4 p-2 text-center"
      >
        <i class="fa-solid fa-exclamation text-5xl font-bold text-red-600"></i>
        <h4 class="text-3xl font-bold">Êtes-vous sure ?</h4>
        <p>Vous ne serez plus à mesure de revenir en arrière</p>
        <div class="w-full flex justify-evenly gap-2 text-white">
          <div
            @click="$emit('closeNotif')"
            class="bg-second px-3 py-1 rounded-md cursor-pointer"
          >
            Retour
          </div>
          <div
            @click="$emit('confirm_delete_btn', notif.id)"
            class="bg-red-600 px-3 py-1 rounded-md cursor-pointer"
          >
            Supprimer
          </div>
        </div>
      </div>
      <div v-else class="flex flex-col justify-center items-center gap-4 p-2">
        <i
          v-if="this.notif.type == 'success'"
          class="fa-regular fa-circle-check text-5xl font-bold text-fourth"
        >
        </i>
        <i
          v-if="this.notif.type == 'error'"
          class="fa-solid fa-bug text-5xl font-bold text-red-600"
        >
        </i>
        <i
          v-if="this.notif.type == 'warning'"
          class="fa-solid fa-triangle-exclamation text-5xl font-bold text-third"
        >
        </i>
        <span class="text-center text-second">{{ this.notif.message }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["notif"],
  methods: {
    closeNotif(e) {
      if (e.target == this.$refs.wrapper) this.$emit("closeNotif");
    },
  },
};
</script>
<style scoped>
.rightSideMenuWrapper {
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100;
  transition: all 2s;
}
</style>