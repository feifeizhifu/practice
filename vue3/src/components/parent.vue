<template>
  <div>父组件<child title='title' :params='{a:1}' @handle='handle'>
    <p>天气</p>
    </child></div>
 
</template>

<script>
import child from './child'
export default {
 
  components:{
    child
  },
  methods: {
    handle(){
      console.log('click')
    }
  },
}
</script>

<style>

</style>