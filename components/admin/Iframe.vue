<template>
  <client-only>
    <div class="m-5">
      <iframe :src="link" frameborder="0" class="w-full h-screen"></iframe>
    </div>
  </client-only>
</template>
<script>
export default {
  data() {
    return {
      link: null,
    };
  },
  mounted() {
    this.link = window.location.hostname;
  },
};
</script>