<template>
  <strong>{{ timeAgo }}</strong>
</template>

<script>
  export default {
    name: "BeenAliveFor",
    props: {
      birthday: Date
    },
    data: function () {
      return {
        timeAgo: undefined
      }
    },
    methods: {
      calcTimeAgo: function () {
        this.timeAgo = this.birthday;
      },
    },
    mounted () {
      let now = new Date();

      this.timeAgo = this.calcTimeAgo();
    }
  }
</script>

<style scoped>

</style>
