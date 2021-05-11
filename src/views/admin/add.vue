<template>
    <admin-info :form="form"></admin-info>
</template>

<script>
  import AdminInfo from './component'
  export default {
    components: {
      AdminInfo
    },
    data() {
      return {
        form: {

        }
      }
    }
  }
</script>

<style scoped>

</style>
