<template>
  <div>
  <!-- <b-table striped hover :items="items" :fields="fields">
    <b-button size="sm"></b-button>
  </b-table>  -->
  <DisasterEditor />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from '@vue/composition-api'
import DisasterEditor from '@/components/DisasterEditor.vue'

export default defineComponent({
  name: 'DisasterSelector',
  components: {
    DisasterEditor
  },
  setup () {
    return {}
  }
})

</script>
