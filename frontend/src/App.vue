<script lang="ts" setup>
import AppFooter from './components/AppFooter.vue'
import FloatingMenu from './components/FloatingMenu.vue'
import Snackbar from './components/Snackbar.vue'
import ConfirmDialog from './components/ConfirmDialog.vue'

const GLOBAL_COMPONENTS = [AppFooter, Snackbar, FloatingMenu, ConfirmDialog]
</script>

<template>
  <v-app>
    <v-main>
      <v-container class="h-100">
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
