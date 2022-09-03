<template>
  <div class="bg-green-600 text-white p-4" @click="sendRequest()">joossue</div>
</template>
<script>
export default {
  methods: {
    async sendRequest() {
      await this.$axios.get("/eventh24/getMenus");
    },
  },
};
</script>