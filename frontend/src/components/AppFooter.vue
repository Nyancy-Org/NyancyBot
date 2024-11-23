<template>
  <v-footer height="40" app>
    <div class="text-body-2 text-center w-100 text-disabled">
      &copy; {{ new Date().getFullYear() }} <strong class="text-primary">Lazy</strong> All Right
      Reserved —
      <a
        class="text-decoration-none on-surface"
        href="https://github.com/Nyancy-Org/NyancyBot/blob/main/LICENSE"
        rel="noopener noreferrer"
        target="_blank"
      >
        MIT License
      </a>
    </div>
  </v-footer>
</template>

<style scoped lang="scss">
footer {
  background: transparent;
  backdrop-filter: blur(10px);
  strong {
    opacity: 0.7;
  }
}
</style>
