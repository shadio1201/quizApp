<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import useUser from './composables/useUser';

const user = useUser()
const router = useRouter()

const Route = useRoute()

const success = ref("")

let pageName = ref("")

pageName = Route.name

const signout = async () => {
  
  const response = await user.signout()

  success.value = response.data.message

  router.go('/login')

}
</script>

<template>
  <header>
    <div class="wrapper">
      <nav v-if="!user.user.value">
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
      </nav>
      <nav v-if="user.user.value">
        <RouterLink to="/">Play</RouterLink>
        <RouterLink to="/dashboard">Dashboard</RouterLink>
        <RouterLink to="/stats">Statistik</RouterLink>
        <RouterLink to="/profile">Profile</RouterLink>
        <button class=" w-16" @click="signout()">Log out</button>
      </nav>
    </div>
  </header>
  <main class="h-screen w-full grid place-content-center text-black">
  <RouterView />
  </main>
</template>

<style scoped>

.wrapper {
  @apply w-full px-8 h-12 flex justify-center items-center bg-zinc-50 shadow-md;
}

nav {
  @apply w-full flex justify-end gap-8 text-slate-700
}

</style>
