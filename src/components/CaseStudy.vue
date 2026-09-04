<script setup>
import { caseStudyData } from '../data';
import { Icon } from '@iconify/vue';
import { useScrollReveal } from '../composables/useScrollReveal';

const caseData = caseStudyData;

const { elementRef, isVisible } = useScrollReveal(0.1, false);
</script>

<template>
   <section ref="elementRef" class="case-study-section bg-[#fbf9f4] dark:bg-[#0f0d0b] py-18 px-4 sm:px-6 lg:px-8 text-slate-900 dark:text-slate-300 relative transition-colors duration-300" :id="caseData.id">
      
      <div :class="['case-study-container max-w-[1440px] mx-auto relative z-10 scroll-zoom-container', { 'start-zoom': isVisible }]">
         
         <div class="case-study-grid-main grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-12 scroll-card-item">
            <div class="case-study-content-left text-center md:text-left justify-center md:justify-start lg:col-span-5 flex flex-col">
               <div class="case-study-header-wrap flex flex-col items-center md:items-start mb-6">
                  <span class="text-xs font-bold tracking-[0.2em] text-emerald-600 dark:text-emerald-400 uppercase mb-3">{{ caseData.sectionNumber }}</span>
                  <div class="case-study-line-wrap relative flex items-center justify-start w-36">
                     <div class="case-study-line absolute w-full h-[1.5px] bg-gradient-to-r from-emerald-600/40 to-transparent"></div>
                     <span class="case-study-dot w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 relative z-10"></span>
                  </div>
               </div>
               <h2 class="text-4xl sm:text-6xl font-black tracking-tight mb-4 leading-tight text-slate-900 dark:text-white">
                  {{ caseData.headline }}
               </h2>
               <p class="text-slate-300 dark:text-slate-300 text-base sm:text-lg mb-8 font-normal leading-relaxed">
                  {{ caseData.description }}
               </p>
               <div class="case-study-meta-box grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50/80 dark:bg-[#16120e] border border-slate-200/80 dark:border-[#26201a] rounded-2xl p-4 mb-10">
                  <div class="case-study-meta-item flex flex-col" v-for="(meta, mIdx) in caseData.metaInfo" :key="mIdx">
                     <span class="text-[11px] font-bold text-slate-300 dark:text-slate-300 uppercase tracking-wider mb-0.5">{{ meta.label }}</span>
                     <span class="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white truncate">{{ meta.value }}</span>
                  </div>
               </div>
               <div class="case-study-steps-list space-y-8 mb-10">
                  <div class="case-study-step-item flex text-left items-start gap-4" v-for="(step, sIdx) in caseData.sections" :key="sIdx">
                     <div class="case-study-step-icon-wrap w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900/50 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400">
                        <div class="case-study-step-icon w-full h-full flex items-center justify-center" v-html="step.icon"></div>
                     </div>
                     <div class="case-study-step-text-wrap flex flex-col">
                        <h4 class="text-sm font-extrabold text-emerald-700 dark:text-emerald-400 tracking-wider uppercase mb-1">{{ step.title }}</h4>
                        <p class="text-xs sm:text-sm text-slate-300 dark:text-slate-300 font-medium leading-relaxed">{{ step.text }}</p>
                     </div>
                  </div>
               </div>
               <div class="case-study-button-wrap flex justify-center md:justify-start items-center">
                  <a :href="caseData.mainButtonLink" class="case-study-btn  inline-flex items-center gap-3 px-8 py-4 rounded-full bg-slate-900 dark:bg-white hover:bg-emerald-600 dark:hover:bg-emerald-500 text-white dark:text-slate-900 font-bold text-sm transition-all duration-300 shadow-md group cursor-pointer">
                     {{ caseData.mainButtonText }}
                     <span class="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </a>
               </div>
            </div>
            
            <div class="case-study-content-right  lg:col-span-7 flex flex-col gap-8 h-full">
               <div class="case-study-mockup-card max-h-[700px] bg-white dark:bg-[#16120e] border border-slate-200/90 dark:border-[#26201a] rounded-[2.5rem] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.04)]">
                  <div class="case-study-mockup-inner h-full w-full flex items-center justify-center">
                     <div class="case-study-mockup-html w-full h-full flex items-center justify-center">
                        <img :src="caseData.mockupImageUrl" alt="Vevano Preview" class="w-full h-full object-cover object-top"/>
                     </div>
                  </div>
               </div>
               <div class="case-study-stats-grid grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div class="case-study-stat-card bg-white dark:bg-[#16120e] border border-slate-200/90 dark:border-[#26201a] rounded-3xl p-5 text-center shadow-sm flex flex-col justify-center" v-for="(stat, stIdx) in caseData.stats" :key="stIdx">
                     <div class="case-study-stat-value-wrap flex items-center justify-center gap-1 mb-1">
                        <span class="text-xl font-black text-slate-900 dark:text-white">{{ stat.value }}</span>
                        <span class="text-emerald-600 dark:text-emerald-400 font-black text-lg" v-if="stat.isUp">↑</span>
                     </div>
                     <p class="text-xs font-bold text-slate-800 dark:text-slate-300 mb-0.5">{{ stat.sub }}</p>
                     <p class="text-[11px] text-slate-300 dark:text-slate-300 font-medium">{{ stat.desc }}</p>
                  </div>
               </div>
               
                        <div class="case-study-testimonial-banner bg-white dark:bg-[#16120e] border border-slate-200/90 dark:border-[#26201a] rounded-[2.5rem] p-4 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-center justify-between gap-8 scroll-card-item">
                           <div class="case-study-testimonial-quote-wrap flex items-start gap-4 max-w-3xl animate-slide-in-right
               ">
                              <span class="text-4xl text-emerald-600 dark:text-emerald-400 font-serif font-black leading-none">“</span>
                              <p class="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium italic leading-relaxed">
                                 {{ caseData.testimonial.quote }}
                              </p>
                           </div>
                           <div class="case-study-testimonial-author-wrap flex items-center gap-4 shrink-0 border-t md:border-t-0 md:border-l border-slate-100 dark:border-[#26201a] pt-6 md:pt-0 md:pl-8 w-full md:w-auto justify-between md:justify-start">
                              <div class="case-study-author-inner flex items-center gap-3">
                                 <div class="case-study-author-avatar w-12 h-12 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-xs uppercase tracking-wider">
                                    {{ caseData.testimonial.author.substring(0, 3) }}
                                 </div>
                                 <div class="case-study-author-details flex flex-col">
                                    <h5 class="text-sm font-black text-slate-900 dark:text-white">{{ caseData.testimonial.author }}</h5>
                                    <p class="text-xs text-slate-300 dark:text-slate-300 font-medium">{{ caseData.testimonial.role }}</p>
                                    <a class="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold hover:underline inline-block mt-0.5" href="#">{{ caseData.testimonial.website }}</a>
                                 </div>
                              </div>
                           </div>
                        </div>
            </div>
         </div>

      </div>
   </section>
</template>