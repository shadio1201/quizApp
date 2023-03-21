<template>
    <div class="addQuiz bg-slate-600 flex flex-col justify-center gap-4 p-8 text-center w-96">
        <h2 class="text-zinc-50 text-xl">Create Question</h2>
        <label class="text-zinc-50" for="category">Category</label>
        <select class="text-slate-600" v-model="category" name="category" id="category">
            <option disabled value="">Please select a category: </option>
            <option>Drama</option>
            <option>IT</option>
            <option>Food</option>
            <option>History</option>
        </select>
        <label class="text-zinc-50" for="question">Question</label>
        <input v-model="question" class="input" type="text" name="question" placeholder="Question?">
        <div class="grid columns-2 gap-2"> 
            <h2 class="text-zinc-50 text-xl">Svar muligheder:</h2>
            <input v-model="option1" class="input" type="text" name="text" placeholder="Svar 1?">
            <input v-model="option2" class="input" type="text" name="text" placeholder="Svar 2?">
            <input v-model="option3" class="input" type="text" name="text" placeholder="Svar 3?">
            <input v-model="option4" class="input" type="text" name="text" placeholder="Svar 4?">
        </div>
        
        <label class="text-zinc-50" for="answer">Choose the right answer:</label>
        <select class="text-slate-600" name="answer" id="answer" v-model="answer">
            <option disabled value="">Please select one</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
        </select>
        <Button @click="sendQuestion()" :loading="loading">Submit question</Button>
    <p class=" text-zinc-50 p-4 bg-green-500" v-if="success">{{ success }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from '../base/Button.vue'
import Quiz from '../../services/Quiz'
import useUser from '../../composables/useUser'

const user = useUser()

const category = ref("")
const question = ref("")
let option1 = ref('')
let option2 = ref('')
let option3 = ref('')
let option4 = ref('')
let answer = ref("")

const loading = ref(false)

const success = ref(null)

const sendQuestion = async () => {
    
    loading.value = true

    let error

    const questionSend = {
        uuid: user.user.value,
        category: category.value,
        question: question.value,
        options: [option1.value, option2.value, option3.value, option4.value],
        answer: Number(answer.value - 1)
    }

    const response = await Quiz.postQuiz(questionSend);

    if(response.error) {
        loading.value = false
        return console.log(response.error)
    }

    success.value = response.data.message

    category.value = ""
    question.value = ""
    option1.value = ""
    option2.value = ""
    option3.value = ""
    option4.value = ""
    answer.value = ""

    loading.value = false

}

</script>

<style scoped>

.input {
    @apply p-2;
}

</style>