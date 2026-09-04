<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { servicesData as centralServicesData } from '../data';
import { Icon } from '@iconify/vue';

const services = centralServicesData; 
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
   <section ref="sectionRef" :id="services.id"
      class="services-section bg-[#fbf9f4] dark:bg-[#0f0d0b] py-18 px-4 sm:px-6 lg:px-8 text-slate-900 dark:text-slate-300 relative transition-colors duration-300">

      <!-- Max width container with Global Scroll Zoom Effect -->
      <div id="services-container" :class="['max-w-[1400px] mx-auto relative z-10 flex flex-col gap-10 scroll-zoom-container', { 'start-zoom': isVisible }]">

         <!-- Section Header Top Layout -->
         <div id="section-header-wrapper" class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center scroll-card-item">

            <!-- Left Title & Description -->
            <div id="header-title-col" class="lg:col-span-7 pb-4 md:pb-0 flex flex-col justify-center items-center md:items-start md:justify-start ">
               <div id="section-tag-wrapper"
                  class="flex flex-col text-center md:text-left items-center md:items-start mb-6">
                  <span id="section-number-tag"
                     class="text-xs text-center md:text-left font-bold tracking-[0.2em] text-emerald-600 dark:text-emerald-400 uppercase mb-3">
                     {{ services.sectionNumber }}
                  </span>
                  <div id="section-line-indicator"
                     class="relative text-center md:text-left flex items-center justify-start w-36">
                     <div id="section-line-gradient"
                        class="absolute w-full h-[1.5px] bg-gradient-to-r from-emerald-600/40 to-transparent"></div>
                     <span id="section-line-dot"
                        class="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 relative z-10"></span>
                  </div>
               </div>

               <h2 id="section-main-heading"
                  class="text-4xl sm:text-6xl max-w-2xl text-center md:text-left font-black tracking-tight mb-6 leading-tight text-slate-900 dark:text-white">
                  {{ services.headline }} 
                  <span id="section-heading-highlight" class="text-emerald-600 dark:text-emerald-400">
                     {{ services.highLigheHedline }}
                  </span>
                  {{ services.subHeadline }}
               </h2>

               <p id="section-description"
                  class="text-slate-300 max-w-xl dark:text-slate-300 text-center md:text-left text-base sm:text-lg font-normal max-w-2xl leading-relaxed">
                  {{ services.description }}
               </p>
            </div>

            <!-- Right Side: Circular Diagram Illustration Area -->
            <div id="header-graphic-col" class="lg:col-span-5 flex justify-center lg:justify-end max-md:hidden">
               <div id="circular-diagram-wrapper"
                  class="relative w-full max-w-[420px] h-[340px] flex items-center justify-center">

                  <!-- Circular Dashed Orbit Ring & Dots -->
                  <div id="dashed-orbit-ring"
                     class="absolute w-[280px] h-[280px] rounded-full border border-dashed border-emerald-200 dark:border-emerald-900/60 flex items-center justify-center">
                     <span class="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-[#fbf9f4] dark:ring-[#0f0d0b] z-30"></span>
                     <span class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-[#fbf9f4] dark:ring-[#0f0d0b] z-30"></span>
                     <span class="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-[#fbf9f4] dark:ring-[#0f0d0b] z-30"></span>
                     <span class="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-[#fbf9f4] dark:ring-[#0f0d0b] z-30"></span>
                  </div>

                  <!-- SVG Circular Path & Text Container -->
                  <svg class="absolute w-[340px] h-[340px] z-25 pointer-events-none animate-[spin_30s_linear_infinite]"
                     viewBox="0 0 400 400">
                     <defs>
                        <path id="textCirclePath" d="M 200, 200 m -135, 0 a 135,135 0 1,1 270,0 a 135,135 0 1,1 -270,0" fill="none" />
                     </defs>
                     <text class="text-md font-black fill-slate-800 dark:fill-slate-200" font-family="sans-serif">
                        <textPath href="#textCirclePath" startOffset="0%">&lt;/&gt; Clean Code &nbsp; &nbsp; &nbsp;</textPath>
                        <textPath href="#textCirclePath" startOffset="20%">💡 Problem Solver &nbsp; &nbsp; &nbsp;</textPath>
                        <textPath href="#textCirclePath" startOffset="45%">⚡ Performance Focused &nbsp; &nbsp; &nbsp;</textPath>
                        <textPath href="#textCirclePath" startOffset="75%">🎯 Business Focused &nbsp; &nbsp; &nbsp;</textPath>
                     </text>
                  </svg>

                  <!-- Central Shopify Icon -->
                  <div id="central-shopify-badge"
                     class="relative z-10 w-24 h-24 bg-white dark:bg-[#16120e] rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-slate-100 dark:border-[#26201a] flex items-center justify-center">
                     <div class="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center shadow-md">
                        <Icon icon="simple-icons:shopify" class="text-white text-3xl" />
                     </div>
                  </div>

               </div>
            </div>
         </div>

         <!-- Cards Container: Desktop Grid vs Mobile Sticky Stack -->
         <div id="capability-cards-grid" class="cards-stack-container relative grid grid-cols-1 lg:grid-cols-3 gap-6 scroll-card-item ">

            <template v-for="(card, cIdx) in services.cards" :key="cIdx">
               <!-- Mobile sticky and stack, Desktop standard grid item -->
               <div :id="'card-' + card.title.toLowerCase()" 
                  :style="{ top: `${90 + (cIdx * 0)}px`, zIndex: cIdx + 1 }"
                  :class="[
                     cIdx === 0 ? 'bg-[#f4faf6] dark:bg-[#131b15] border-emerald-100 dark:border-emerald-950/60 ' : '',
                     cIdx === 1 ? 'bg-white dark:bg-[#16120e] border-slate-200/90 dark:border-[#26201a] ' : '',
                     cIdx === 2 ? 'bg-[#fcf7f2] dark:bg-[#191512] border-amber-100/80 dark:border-amber-950/50 ' : '',
                     'framer-sticky-card sticky lg:static border rounded-[2.5rem] p-6 sm:p-10 shadow-[0_20px_40px_rgba(0,0,0,0.15)] flex flex-col justify-between transition-all duration-300'
                  ] "
               >
                  <div>
                     <div class="flex items-center justify-between mb-6 ">
                        <span :class="[
                           cIdx === 0 ? 'text-emerald-700 dark:text-emerald-300 bg-white dark:bg-[#1a261e] border-emerald-100 dark:border-emerald-900/50' : '',
                           cIdx === 1 ? 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/50 border-sky-100 dark:border-sky-900/50' : '',
                           cIdx === 2 ? 'text-amber-700 dark:text-amber-400 bg-white dark:bg-[#221c17] border-amber-100 dark:border-amber-900/50' : '',
                           'text-xs font-black tracking-wider uppercase px-3 py-1 rounded-full border'
                        ]">
                           {{ card.subtitle }}
                        </span>
                     </div>

                     <div class="flex items-center gap-3 mb-3">
                        <div :class="[
                           cIdx === 0 ? 'bg-white dark:bg-[#1a261e] border-emerald-100 dark:border-emerald-900/50 text-emerald-600 dark:text-emerald-400' : '',
                           cIdx === 1 ? 'bg-sky-50 dark:bg-sky-950/50 border-sky-100 dark:border-sky-900/50 text-sky-600 dark:text-sky-400' : '',
                           cIdx === 2 ? 'bg-white dark:bg-[#221c17] border-amber-100 dark:border-amber-900/50 text-amber-600 dark:text-amber-400' : '',
                           'w-10 h-10 rounded-xl border flex items-center justify-center shadow-sm font-bold text-lg'
                        ]">
                           <Icon v-if="cIdx === 0" icon="simple-icons:shopify" class="text-xl" />
                           <Icon v-else-if="cIdx === 1" icon="simple-icons:wordpress" class="text-xl" />
                           <Icon v-else icon="lucide:code" class="text-xl" />
                        </div>
                        <h3 class="text-3xl font-black text-slate-900 dark:text-white">{{ card.title }}</h3>
                     </div>

                     <p class="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6 max-w-3xl">
                        {{ card.description }}
                     </p>

                     <div class="Features flex flex-col gap-6">
                        <ul class="space-y-2.5">
                           <li v-for="(feature, fIdx) in card.features" :key="fIdx"
                              class="flex items-center gap-3 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                              <span :class="[
                                 cIdx === 0 ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300' : '',
                                 cIdx === 1 ? 'bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400' : '',
                                 cIdx === 2 ? 'bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300' : '',
                                 'w-4 h-4 rounded-full flex items-center justify-center text-[10px] shrink-0 font-black'
                              ]">✓</span>
                              <span>{{ feature }}</span>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </template>

         </div>

         <!-- Bottom CTA Banner Card -->
         <div id="bottom-cta-banner"
            class="bg-white dark:bg-[#16120e] border border-slate-200/90 dark:border-[#26201a] rounded-[2.5rem] p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col lg:flex-row items-center justify-between gap-6 relative z-20  scroll-card-item">

            <div class="flex md:items-center  md:flex-col md:flex-row gap-5">
               <div class="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900/50 flex items-center justify-center shrink-0">
                  <svg class="w-7 h-7 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                     <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
               </div>
               <div>
                  <h3 class="text-lg sm:text-xl md:text-center md:text-left font-black text-slate-900 dark:text-white mb-1">
                     {{ services.ctaBox.title }}
                  </h3>
                  <p class="text-xs sm:text-sm text-slate-300 dark:text-slate-300 font-medium">
                     {{ services.ctaBox.description }}
                  </p>
               </div>
            </div>

            <div class="flex items-center gap-6 w-full lg:w-auto justify-center md:justify-between lg:justify-end border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100 dark:border-[#26201a]">
               <div class="hidden sm:block text-right">
                  <p class="text-xs font-bold text-slate-900 dark:text-white">{{ services.ctaBox.subTextPrimary }}</p>
                  <p class="text-xs text-slate-300 dark:text-slate-300 font-medium">{{ services.ctaBox.subTextSecondary }}</p>
               </div>
               <a :href="services.ctaBox.buttonLink"
                  class=" inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#0d2318] dark:bg-white dark:hover:text-white hover:bg-emerald-600 dark:hover:bg-emerald-500 text-white dark:text-slate-900 font-bold text-sm transition-all duration-300 shadow-md">
                  <span class="">{{ services.ctaBox.buttonText }}</span>
                  <span>→</span>
               </a>
            </div>

         </div>

      </div>
   </section>
</template>

<style scoped>
.services-section, 
#services-container,
.cards-stack-container {
  overflow: visible !important;
}

.framer-sticky-card {
  backface-visibility: hidden;
}

@media (min-width: 1024px) {
  .cards-stack-container {
    display: grid !important;
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  }
  .framer-sticky-card {
    position: static !important;
    margin-bottom: 0 !important;
  }
}
</style>