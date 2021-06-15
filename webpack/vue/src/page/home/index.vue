<template>
  <div>天气{{ msg }}</div>
</template>
<script>
export default {
  data() {
    return {
      msg: "晴",
    };
  },
  mounted() {
    Promise.resolve().then(() => {
      this.msg = "阴";
    });
  },
};
</script>
