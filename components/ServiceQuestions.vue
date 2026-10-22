<script setup lang="ts">
import { serviceQuestions } from '~/data/service-questions'

const props = defineProps<{ path: string }>()
const questions = computed(() => serviceQuestions[props.path] || [])
</script>

<template>
  <section v-if="questions.length" class="service-questions" aria-label="상담 전 확인할 질문">
    <h2>상담 전에 확인하세요</h2>
    <div v-for="item in questions" :key="item.question" class="service-answer">
      <h3>{{ item.question }}</h3>
      <p>{{ item.answer }}</p>
      <ul>
        <li v-for="link in item.links" :key="link.to"><NuxtLink :to="link.to">{{ link.label }} →</NuxtLink></li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.service-questions { margin: 0 0 64px; }
.service-questions h2 { margin: 0 0 24px; color: #fafafa; font-size: clamp(23px, 4vw, 30px); font-weight: 700; }
.service-answer { padding: 24px 0; border-top: 1px solid rgba(250, 250, 250, .12); }
.service-answer h3 { margin: 0 0 12px; color: #fafafa; font-size: 18px; line-height: 1.6; font-weight: 600; }
.service-answer p { max-width: 76ch; color: rgba(250, 250, 250, .78); font-size: 15px; line-height: 1.85; word-break: keep-all; overflow-wrap: anywhere; }
.service-answer ul { display: flex; flex-wrap: wrap; gap: 4px 24px; padding: 0; margin: 12px 0 0; list-style: none; }
.service-answer a { display: inline-block; padding: 10px 0; color: #d8b868; line-height: 1.6; text-underline-offset: 4px; text-decoration: underline; }
.service-answer a:focus-visible { outline: 2px solid #d8b868; outline-offset: 4px; }
</style>
