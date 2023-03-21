<template>
    <div class=" bg-slate-600 p-8 flex flex-col justify-center gap-4 text-center w-96">
        <p class="text-zinc-50">Username: {{  }}</p>
        <p class="text-zinc-50">Email: {{  }}</p>
    </div>
</template>

<script setup>

import Button from '../components/base/Button.vue'
import { ref } from 'vue'
import Authentication from '../services/Authentication'
import { useRouter } from 'vue-router'

const router = useRouter()

let errors = ref(null)
let success = ref(null)

const email = ref("")
const password = ref("")

//loading button
const loading = ref(false)


const getUser = async () => {

    errors.value = null

    loading.value = true

    if(response.data.error) {
        if(Array.isArray(response.data.error)) {
            errors.value = response.data.error[0].msg
        } 
        else {
            errors.value = response.data.error
        }

    } else {
        email.value = ""
        password.value = ""
        
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("user", response.data.profile.uuid);
  
        loading.value = false

        router.push('/')
    }}

</script>