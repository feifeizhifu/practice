<template>
  <div @click='click'>子组件<slot></slot></div>
</template>

<script>
export default {
  props:['title'],
  data(){
    return {
      name:'child'
    }
  },
  mounted() {
    console.log(this)
  },
  setup(props,context) {
    console.log(props,context.slot)
    function click(){
      context.emit('handle')
    }
    return {
      sub:[1,2,4],
      click
    }
  }
}
</script>

<style>

</style>