<template>
  <div>
    <h3>{{ title }}</h3>
    <div>
      <p>支持人数{{ sup }}</p>
      <p>反对人数{{ opp }}</p>
      <p>支持率{{ ratio }}</p>
      <button @click="change('+')">支持</button>
      <button @click="change('-')">反对</button>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, watch, onUpdated, onMounted } from "vue";
export default {
  props: ["title"],
  //初始化props和beforeCreate之间
  setup() {
    let sup = ref(2),
      opp = ref(3);
    let state = reactive({
      sup: 2,
      opp: 3,
    });
    //props 基于proxy代理的响应式数据,不能进行解构，解构之后就不是响应式数据
    watch(()=>state.sup,(val) => {
      console.log(val);
    });
    onUpdated(()=>{
      console.log('setup onupdate')
    })
    onMounted(()=>{
      console.log('setup onmounted')
    })
    // let ratio=computed(()=>{
    //   let total=sup.value+opp.value
    //   return total===0?'--':((sup.value/total)*100).toFixed(2)+'%'
    // })
    let ratio = computed({
      get: () => {
        let total = state.sup + state.opp;
        return total === 0
          ? "--"
          : ((state.sup / total) * 100).toFixed(2) + "%";
      },
      set:val=>{
        console.log(val)
      }
    });
    ratio.value=100
    const change = (type) => {
      type === "-" ? state.opp++ : state.sup++;
    };
    return {
      sup,
      opp,
      ratio,
      change,
      state,
    };
  },
  mounted() {
    console.log('mounted')
  },
  updated() {
    console.log('updated')
  },
  unmounted() {
    console.log('destroyed')
  },
};
</script>

<style>
</style>