<template>
  <div id="app">
    <!-- <h2>TodoList</h2>

    <div class="todolist">
      <input type="text" v-model="val" @keyup.enter="addList" />
      <h4>正在進行</h4>
      <ul>
        <li v-for="(item, index) in list" :key="index" v-show="!item.isChecked">
          <input type="checkbox" v-model="item.isChecked" />
          {{ item.value }}
          ---- <button @click="del(index)">刪除</button>
        </li>
      </ul>
    </div>
    <h4>已完成</h4>
    <ul>
      <li v-for="(item, index) in list" :key="index" v-show="item.isChecked">
        <input type="checkbox" v-model="item.isChecked" />
        {{ item.value }}
        ---- <button @click="del(index)">刪除</button>
      </li>
    </ul> -->
    <suspense>
      <template #default >
        <asyncHello></asyncHello>
      </template>
      <template #fallback>
        <div>正在拼了命的加载…</div>
      </template>
    </suspense>
  </div>
</template>

<script>
import {defineAsyncComponent} from 'vue'
const asyncHello=defineAsyncComponent(()=>import('./components/async-hello'))
export default {
  data() {
    return {
      val: "",
      list: [],
      arrList: [],
    };
  },
  mounted() {
    setTimeout(() => {
      this.arrList = ["a", "d", "r", "u"];
    }, 2000);
  },
  methods: {
    addList() {
      this.list.push({
        value: this.val,
        isChecked: false,
      });
    },
    del(index) {
      this.list.splice(index, 1);
    },
  },
  components:{
    asyncHello
  }
};
</script>

<style>
#app {
  width: 400px;
}
</style>