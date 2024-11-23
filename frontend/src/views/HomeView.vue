<script lang="ts" setup>
import { useDisplay } from 'vuetify'

const { xs } = useDisplay()
</script>

<template>
  <v-responsive class="align-centerfill-height mx-auto" max-width="900">
    <v-img
      class="mb-4"
      height="150"
      src="https://cdn.imlazy.ink:233/img/%E8%A1%A8%E6%83%85%E5%8C%85/%E7%8C%AB%E7%BE%BD%E9%9B%AB/059.png"
    />

    <div class="text-center">
      <h1
        class="text-primary text-h2 font-weight-medium"
        :class="xs ? 'text-h4' : 'text-h3'"
        style="transition: all 0.5s"
      >
        Nyancy <span class="text-secondary">Bot</span>
      </h1>
      <div class="py-4" />
      <v-btn prepend-icon="mdi-cat" color="primary" variant="tonal" size="large" to="/auth"
        >开始使用</v-btn
      >
    </div>
  </v-responsive>
</template>
