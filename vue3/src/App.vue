<template>
  <div id='app'>
    <Composition :title='title'></Composition>
    <button @click='changetitle' ref='btn'>点击</button>
    
  </div>

</template>

<script>
import Composition from './components/composition'
import {reactive,readonly} from 'vue'
export default {
  components:{
    Composition
  },
  data(){
    return {
      title:'学习'
    }
  },

  methods: {
    changetitle(){
      this.title='打游戏'
  
    }
  },
  setup() {
   let obj=reactive({
            x:10,
            y:{
              z:10
            }
          })
let obj1=readonly(obj)
obj1.y.z=100
console.log(obj)
  }
}
</script>

<style>

</style>