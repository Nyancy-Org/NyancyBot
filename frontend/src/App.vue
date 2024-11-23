<script lang="ts" setup>
import AppFooter from './components/AppFooter.vue'
import FloatingMenu from './components/FloatingMenu.vue'

const GLOBAL_COMPONENTS = [AppFooter, FloatingMenu]
</script>

<template>
  <v-app>
    <v-main>
      <v-container class="fill-height">
        <RouterView v-slot="{ Component }">
          <v-fade-transition>
            <component :is="Component" />
          </v-fade-transition>
        </RouterView>
      </v-container>
    </v-main>

    <component v-for="(c, i) in GLOBAL_COMPONENTS" :key="i" :is="c" />
  </v-app>
</template>
