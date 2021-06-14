<template>
  <div>
    <span v-for="item in todos">{{ item }}</span>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
@Component({
  components: {},
})
export default class Todo extends Vue {
  public todos: string[] = ["香蕉", "苹果"];
}
</script>
