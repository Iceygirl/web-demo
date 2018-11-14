<template>
  <div class="AreaManage">
    <unit-select></unit-select>
    辖区管理
  </div>
</template>

<script>
import UnitSelect from 'public/UnitSelect' 
export default {
  components: {
    'unit-select':UnitSelect
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
