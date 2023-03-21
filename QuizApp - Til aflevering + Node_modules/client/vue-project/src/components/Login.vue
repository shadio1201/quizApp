<template>
    <div class=" bg-slate-600 p-8 flex flex-col justify-center gap-4 text-center w-96">
    <h2 class="font-bold text-zinc-50 text-2xl">Login</h2>
        <input v-model="email" class="input" type="text" name="email" placeholder="Email">
        <input v-model="password" class="input" type="password" name="password" placeholder="Password">

        <Button @click="signin" :loading="loading">Login</Button>

        <RouterLink class=" bg-gray-100 px-8 py-2" to="/register">Register</RouterLink>

        <p class=" text-zinc-50 p-4 border-solid border-red-700 border-2" v-if="errors">{{ errors }}</p>
        <p class=" text-zinc-50 p-4 border-solid border-green-500 border-2" v-if="success">{{ success }}</p>
        
    </div>
</template>

<script setup>

import Button from '../components/base/Button.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useUser from '../composables/useUser'

const router = useRouter()
const user = useUser()

let errors = ref(null)
let success = ref(null)

const email = ref("")
const password = ref("")

//loading button
const loading = ref(false)
loading.value = true
loading.value = false

const signin = async () => {

    loading.value = true

    let data = await user.signin(email, password)

    if(data.error) {
    
        loading.value = false
       return errors.value = data.error
    }

    if(data.response.data) {
        success.value = data.response.data.message
    }

    loading.value = false

    router.push('/')
}

</script>



<style scoped>
.input {
    @apply p-2;
}

</style>