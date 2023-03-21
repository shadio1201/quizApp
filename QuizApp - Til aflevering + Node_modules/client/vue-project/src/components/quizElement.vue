<template>
    <div class="bg-slate-600 text-white grid place-content-center w-full">
        <div class="flex justify-between items-center gap-8 px-4 h-full w-full">
            <h3>{{ quiz.category }}</h3>
            <Button @click="buttonClick()">Play</Button>
        </div>
    </div>
</template>

<script setup>

import Button from '../components/base/Button.vue'

defineProps({
  quiz: {
    type: Object,
  },
});

defineEmits(['play'])

function buttonClick() {
  emit('play', true)
}

</script>

<style lang="scss" scoped>

</style>