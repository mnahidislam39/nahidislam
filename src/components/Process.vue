<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { processData as centralProcessData } from '../data'; 
import { Icon } from '@iconify/vue';

const processData = centralProcessData;
const sectionRef = ref(null);
const isVisible = ref(false);

let observer = null;

onMounted(() => {
   observer = new IntersectionObserver(
      ([entry]) => {
         if (entry.isIntersecting) {
            isVisible.value = true;
            if (observer && sectionRef.value) {
               observer.unobserve(sectionRef.value);
            }
         }
      },
      { threshold: 0.1 }
   );

   if (sectionRef.value) {
      observer.observe(sectionRef.value);
   }
});

onUnmounted(() => {
   if (observer) {
      observer.disconnect();
   }
});
</script>

<template>
   <section ref="sectionRef" id="process-section"
      class="relative px-4 py-18 bg-[#fbf9f4] dark:bg-[#0f0d0b] process-section sm:px-6 lg:px-8 text-slate-900 dark:text-slate-300 transition-colors duration-700">

      <!-- Main Container Div with Animation Binding -->
      <div id="process-container" :class="['max-w-[1440px] mx-auto relative z-10 scroll-zoom-container', { 'start-zoom': isVisible }]">

         <!-- Top Header & CTA Button Grid Div -->
         <div :class="['process-header-quote-grid flex flex-col items-center justify-center gap-6 text-center scroll-card-item', { 'is-visible': isVisible }]">

            <!-- Left Title & Description Div -->
            <div class="process-title-wrapper max-w-2xl">
               <div id="section-tag-wrapper" class="section-tag-container flex flex-col items-center mb-4">
                  <span id="section-number-tag"
                     class="section-number-text text-xs font-bold tracking-[0.2em] text-emerald-700 dark:text-emerald-400 uppercase mb-3 px-4 py-1.5 rounded-full bg-amber-100/50 dark:bg-emerald-950/50 border border-emerald-600/20 dark:border-emerald-500/20">
                     {{ processData.sectionTag }}
                  </span>
               </div>

               <h2 class="process-main-title mb-4 text-4xl font-black leading-tight tracking-tight sm:text-6xl text-slate-900 dark:text-white" v-html="processData.title">
               </h2>
               <p class="process-main-desc text-sm leading-relaxed text-slate-300 dark:text-slate-300 sm:text-base mb-6">{{ processData.description }}</p>
            </div>

            <!-- Top CTA Button -->
            <div v-if="processData.cta" class="process-top-cta">
               <a :href="processData.cta.buttonLink || '#'"
                  class="process-cta-btn inline-flex items-center gap-2 px-8 py-4 text-sm font-bold transition-all bg-emerald-700 hover:bg-emerald-800 text-white rounded-full shadow-[0_10px_25px_rgba(180,83,9,0.3)] transform hover:-translate-y-0.5">
                  {{ processData.cta.buttonText || 'Book Free Visit' }}
               </a>
            </div>

         </div>

         <!-- 3 Process Steps Layout -->
         <div class="process-steps-curve-wrapper relative pt-6 ">
            
            <!-- SVG Curved Wave Line -->
            <div class="absolute inset-0 hidden lg:block pointer-events-none z-0">
               <svg class="w-full h-full text-amber-600/60 dark:text-emerald-500/50" viewBox="0 0 1200 400" fill="none" preserveAspectRatio="none">
                  <path :class="['animated-wave-path', { 'start-draw': isVisible }]" d="M 30 320 Q 300 350, 450 150 T 850 250 T 1170 100" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="1500" stroke-dashoffset="1500" />
               </svg>
            </div>

            <!-- Steps Container -->
            <div class="flex flex-col lg:grid lg:grid-cols-3 gap-8 relative z-10 items-start">
               
               <!-- Step 1 -->
               <div :class="['process-step-item scroll-card-item flex flex-col items-center lg:items-start lg:text-left text-center relative lg:-mt-12 group bg-white dark:bg-[#16120e] p-8 rounded-3xl border border-slate-200 dark:border-[#26201a] shadow-xl sticky top-24 z-10 transition-all duration-300 w-full', { 'is-visible': isVisible }]">
                  <span class="absolute top-4 lg:-top-16 lg:left-24 text-7xl lg:text-9xl font-black text-slate-300/40 dark:text-slate-800/40 select-none z-0 pointer-events-none transition-transform duration-500 group-hover:scale-105">
                     1
                  </span>

                  <div class="relative z-10 max-w-sm px-2 mb-6">
                     <h3 class="mb-3 text-xl font-black text-slate-900 dark:text-white">{{ processData.steps[0]?.title }}</h3>
                     <p class="text-xs sm:text-sm leading-relaxed text-slate-300 dark:text-slate-300">
                        {{ processData.steps[0]?.description }}
                     </p>
                  </div>

                  <div class="relative z-10 w-16 h-16 rounded-2xl bg-[#fbf9f4] dark:bg-[#0f0d0b] border border-slate-200 dark:border-[#26201a] shadow-md flex items-center justify-center text-amber-700 dark:text-emerald-400 text-2xl transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                     <Icon :icon="processData.steps[0]?.icons?.[0] || 'lucide:box'" />
                  </div>
               </div>

               <!-- Step 2 -->
               <div :class="['process-step-item scroll-card-item flex flex-col items-center lg:items-center lg:text-center text-center relative lg:mt-32 group bg-white dark:bg-[#16120e] p-8 rounded-3xl border border-slate-200 dark:border-[#26201a] shadow-xl sticky top-32 z-20 transition-all duration-300 w-full', { 'is-visible': isVisible }]">
                  <span class="absolute top-4 lg:-top-16 text-7xl lg:text-9xl font-black text-slate-300/40 dark:text-slate-800/40 select-none z-0 pointer-events-none transition-transform duration-500 group-hover:scale-105">
                     2
                  </span>

                  <div class="relative z-10 mb-6 w-16 h-16 rounded-2xl bg-[#fbf9f4] dark:bg-[#0f0d0b] border border-slate-200 dark:border-[#26201a] shadow-md flex items-center justify-center text-amber-700 dark:text-emerald-400 text-2xl transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                     <Icon :icon="processData.steps[1]?.icons?.[0] || 'lucide:wrench'" />
                  </div>

                  <div class="relative z-10 max-w-sm px-2">
                     <h3 class="mb-3 text-xl font-black text-slate-900 dark:text-white">{{ processData.steps[1]?.title }}</h3>
                     <p class="text-xs sm:text-sm leading-relaxed text-slate-300 dark:text-slate-300 mb-4">
                        {{ processData.steps[1]?.description }}
                     </p>
                  </div>
               </div>

               <!-- Step 3 -->
               <div :class="['process-step-item scroll-card-item flex flex-col items-center lg:items-end lg:text-right text-center relative lg:-mt-12 group bg-white dark:bg-[#16120e] p-8 rounded-3xl border border-slate-200 dark:border-[#26201a] shadow-xl sticky top-40 z-30 transition-all duration-300 w-full', { 'is-visible': isVisible }]">
                  <span class="absolute top-4 lg:-top-16 lg:right-24 text-7xl lg:text-9xl font-black text-slate-300/40 dark:text-slate-800/40 select-none z-0 pointer-events-none transition-transform duration-500 group-hover:scale-105">
                     3
                  </span>

                  <div class="relative z-10 mb-6 w-16 h-16 rounded-2xl bg-[#fbf9f4] dark:bg-[#0f0d0b] border border-slate-200 dark:border-[#26201a] shadow-md flex items-center justify-center text-amber-700 dark:text-emerald-400 text-2xl transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                     <Icon :icon="processData.steps[2]?.icons?.[0] || 'lucide:truck'" />
                  </div>

                  <div class="relative z-10 max-w-sm px-2">
                     <h3 class="mb-3 text-xl font-black text-slate-900 dark:text-white">{{ processData.steps[2]?.title }}</h3>
                     <p class="text-xs sm:text-sm leading-relaxed text-slate-300 dark:text-slate-300 mb-4">
                        {{ processData.steps[2]?.description }}
                     </p>
                  </div>
               </div>

            </div>
         </div>

      </div>
   </section>
</template>

<style scoped>
/* Scroll Zoom & Fade Transitions */
.scroll-zoom-container {
   opacity: 0;
   transform: scale(0.95) translateY(30px);
   transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.scroll-zoom-container.start-zoom {
   opacity: 1;
   transform: scale(1) translateY(0);
}

.scroll-card-item {
   opacity: 0;
   transform: translateY(25px);
   transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.scroll-card-item.is-visible {
   opacity: 1;
   transform: translateY(0);
}

/* Wave Drawing Animation */
@keyframes drawWave {
   to {
      stroke-dashoffset: 0;
   }
}

.animated-wave-path {
   transition: stroke-dashoffset 2s ease;
}

.animated-wave-path.start-draw {
   animation: drawWave 2.5s ease-in-out forwards;
}
</style>