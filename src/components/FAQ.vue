<script setup>
import { ref } from 'vue';
import { faqData as centralFaqData } from '../data'; 
import { Icon } from '@iconify/vue';
import { useScrollReveal } from '../composables/useScrollReveal';

const faqData = centralFaqData; 
const activeIndex = ref(null);

const { elementRef, isVisible } = useScrollReveal(0.1, true);

const toggleAccordion = (index) => {
   activeIndex.value = activeIndex.value === index ? null : index;
};
</script>

<template>
   <section ref="elementRef" id="faq" class="relative pt-0 px-4 py-28 overflow-hidden bg-[#fbf9f4] dark:bg-[#0f0d0b] sm:px-6 lg:px-8 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div id="faq-main-container" :class="['faq-container max-w-[1440px] mx-auto relative z-10 scroll-zoom-container', { 'start-zoom': isVisible }]">

         <!-- Top Grid: Left Column & Right Accordion -->
         <div class="faq-top-grid grid items-start grid-cols-1 gap-12 mb-16 lg:grid-cols-12">

            <!-- Left Column -->
            <div :class="['faq-left-column flex flex-col gap-8 lg:col-span-5 scroll-card-item', { 'is-visible': isVisible }]">

               <!-- Heading & Description -->
               <div class="faq-header-content-box text-center md:text-left">
                  <div id="faq-tag-wrapper" class="faq-tag-container flex flex-col md:items-start items-center  mb-4">
                     <span id="faq-section-number-tag" class="faq-section-tag text-xs font-bold tracking-[0.2em] text-emerald-600 dark:text-emerald-400 uppercase mb-3">{{
                        faqData.sectionTag }}</span>
                     <div id="faq-line-indicator" class="faq-line-wrapper relative flex items-center justify-start  w-36">
                        <div class="faq-line-bg absolute w-full h-[1.5px] bg-gradient-to-r from-emerald-600/40 to-transparent">
                        </div>
                        <span class="faq-line-dot relative z-10 w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400"></span>
                     </div>
                  </div>

                  <h2 class="faq-main-title mb-4 text-4xl font-black leading-tight tracking-tight sm:text-5xl text-slate-900 dark:text-white" v-html="faqData.title">
                  </h2>
                  <p class="faq-main-desc text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">{{ faqData.description }}</p>
               </div>

               <!-- Still Have Questions Box -->
               <div
                  class="faq-help-card  flex flex-col md:items-left items-center gap-6 relative">
                  <div class="faq-help-inner-flex flex md:items-start gap-4">
                     <div
                        class="faq-help-icon-box flex items-center justify-center w-12 h-12 text-2xl text-white dark:text-slate-950 rounded-2xl bg-emerald-950 dark:bg-emerald-500 shrink-0">
                        <Icon icon="fa6-solid:question" />
                     </div>
                     <div class="faq-help-text-box">
                        <h3 class="faq-help-title mb-1 text-base font-black text-slate-900 dark:text-white">{{ faqData.helpBox.title }}</h3>
                        <p class="faq-help-desc text-xs leading-relaxed text-slate-500 dark:text-slate-400">{{ faqData.helpBox.description }}</p>
                     </div>
                  </div>
                  <a :href="faqData.helpBox.buttonLink"
                     class="faq-help-btn flex items-center justify-center gap-2 px-6 py-4 text-xs font-bold text-white dark:text-slate-950 transition-all shadow-md bg-emerald-950 dark:bg-emerald-500 hover:bg-emerald-900 dark:hover:bg-emerald-400 rounded-xl w-fit">
                     {{ faqData.helpBox.buttonText }}
                     <Icon icon="lucide:arrow-right" class="text-base" />
                  </a>
               </div>

               <!-- 4 Trust Features Card -->
               <div
                  class="faq-features-grid-card bg-white dark:bg-[#16120e] border border-slate-200/90 dark:border-[#26201a] rounded-[2.5rem] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)] grid md:grid-cols-2 grid-cols-2 sm:grid-cols-3  gap-4 items-center">
                  <div v-for="(badge, bIdx) in faqData.features" :key="bIdx"
                     class="faq-feature-item flex flex-col items-center px-2 py-1 text-center"
                     :class="{ 'border-r border-slate-100 dark:border-[#26201a]': bIdx < 3 }">
                     <div
                        class="faq-feature-icon-box flex items-center justify-center w-10 h-10 mb-2 text-lg rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                        <Icon :icon="badge.icon" />
                     </div>
                     <h4 class="faq-feature-title text-[11px] font-black text-slate-900 dark:text-white mb-0.5 whitespace-nowrap">{{ badge.title }}</h4>
                     <p class="faq-feature-desc text-[9px] text-slate-400 dark:text-slate-500 leading-tight">{{ badge.description }}</p>
                  </div>
               </div>

            </div>

            <!-- Right Column: FAQ Accordion List -->
            <div :class="['faq-accordion-column flex flex-col gap-4 lg:col-span-7 scroll-card-item', { 'is-visible': isVisible }]">
               <div v-for="(item, idx) in faqData.questions" :key="idx"
                  class="faq-accordion-item bg-white dark:bg-[#16120e] border border-slate-200/90 dark:border-[#26201a] rounded-[2rem] p-6 sm:p-7 shadow-[0_5px_20px_rgba(0,0,0,0.02)] transition-all hover:border-emerald-500/50">
                  <!-- Accordion Header -->
                  <button @click="toggleAccordion(idx)"
                     class="faq-accordion-btn flex items-center justify-between w-full gap-4 text-left cursor-pointer">
                     <div class="faq-accordion-title-flex flex items-center gap-4">
                        <div
                           class="faq-accordion-icon-box flex items-center justify-center w-10 h-10 text-lg rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 shrink-0">
                           <Icon :icon="item.icon" />
                        </div>
                        <h3 class="faq-accordion-question text-sm font-black sm:text-base text-slate-900 dark:text-white">{{ item.question }}</h3>
                     </div>

                     <!-- Plus Toggle Icon -->
                     <div
                        class="faq-accordion-toggle-icon flex items-center justify-center w-8 h-8 transition-transform border rounded-full bg-slate-50 dark:bg-[#1f1a15] border-slate-200 dark:border-[#26201a] text-slate-700 dark:text-slate-300 shrink-0"
                        :class="{ 'rotate-45 bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 border-emerald-600 dark:border-emerald-500': activeIndex === idx }">
                        <Icon icon="lucide:plus" class="text-lg" />
                     </div>
                  </button>

                  <!-- Accordion Body / Answer -->
                  <div v-show="activeIndex === idx" class="faq-accordion-body pt-4 mt-4 border-t border-slate-100 dark:border-[#26201a]">
                     <p class="faq-accordion-answer text-xs leading-relaxed text-slate-500 dark:text-slate-400 sm:text-sm">{{ item.answer }}</p>
                  </div>
               </div>
            </div>

         </div>

         <!-- Bottom CTA Banner Bar -->
         <div
            :class="['faq-cta-banner-bar bg-white dark:bg-[#16120e] border border-slate-200/90 dark:border-[#26201a] rounded-[2.5rem] p-8 sm:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.03)] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center scroll-card-item', { 'is-visible': isVisible }]">

            <!-- Left Icon & Heading -->
            <div class="faq-cta-left-col flex items-center gap-4 lg:col-span-4">
               <div
                  class="faq-cta-icon-box flex items-center justify-center text-2xl text-white dark:text-slate-950 shadow-md w-14 h-14 rounded-2xl bg-emerald-950 dark:bg-emerald-500 shrink-0">
                  <Icon icon="lucide:send" />
               </div>
               <div class="faq-cta-text-box">
                  <h3 class="faq-cta-title mb-1 text-base font-black text-slate-900 dark:text-white">{{ faqData.ctaBanner.title }}</h3>
                  <p class="faq-cta-desc text-xs text-slate-500 dark:text-slate-400">{{ faqData.ctaBanner.description }}</p>
               </div>
            </div>

            <!-- Center Highlights -->
            <div
               class="faq-cta-highlights-col grid grid-cols-3 gap-4 px-0 py-4 text-center border-t lg:col-span-5 lg:border-t-0 lg:border-x border-slate-100 dark:border-[#26201a] lg:py-0 lg:px-6 lg:text-left">
               <div v-for="(high, hIdx) in faqData.ctaBanner.highlights" :key="hIdx"
                  class="faq-cta-highlight-item flex flex-col items-center lg:items-start">
                  <div class="faq-cta-highlight-title flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-0.5">
                     <Icon :icon="high.icon" /> {{ high.title }}
                  </div>
                  <span class="faq-cta-highlight-desc text-[10px] text-slate-400 dark:text-slate-500">{{ high.desc }}</span>
               </div>
            </div>

            <!-- Right Button -->
            <div class="faq-cta-right-col flex justify-end lg:col-span-3">
               <a :href="faqData.ctaBanner.buttonLink"
                  class="faq-cta-btn flex items-center justify-center w-full gap-2 px-6 py-4 text-xs font-bold text-white dark:text-slate-950 transition-all shadow-md lg:w-auto bg-emerald-950 dark:bg-emerald-500 hover:bg-emerald-900 dark:hover:bg-emerald-400 rounded-xl">
                  {{ faqData.ctaBanner.buttonText }}
                  <Icon icon="lucide:arrow-right" class="text-base" />
               </a>
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
   transition-delay: 0.2s;
}

.scroll-card-item.is-visible {
   opacity: 1;
   transform: translateY(0);
}
</style>