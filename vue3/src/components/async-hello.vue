<template>
  <div>
    <h4>這是一個異步加載的組件</h4>
    <ul class="ul">
      <li v-for="item in arrList" :key="item">{{ item }}</li>
    </ul>
    
  </div>
</template>
<script>

export default {
  setup() {
    return new Promise((res)=>{
      setTimeout(() => {
        res({
        arrList:[
          1,2,3,4
        ]
      })
      }, 2000);
      
    })
  },
}
</script>