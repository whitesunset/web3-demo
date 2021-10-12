<template>
  <v-alert
    v-if="error"
    border="left"
    max-width="50%"
    colored-border
    color="deep-purple accent-4"
    elevation="2"
    class="mx-auto"
  >
    Omg, you just broke the Internet. Well done!
  </v-alert>  
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Widget extends Vue {
  @Prop() private error!: boolean
}
</script>