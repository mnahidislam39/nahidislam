<script setup>
import { techStackData } from '../data';
import { useScrollReveal } from '../composables/useScrollReveal';

const techData = techStackData;
const { elementRef: sectionRef, isVisible } = useScrollReveal();
</script>

<template>
   <section ref="sectionRef" :id="techData.id"
      class="tech-stack-section bg-[#fbf9f4] dark:bg-[#0f0d0b] py-20 px-4 sm:px-6 lg:px-8 text-slate-900 dark:text-slate-100 relative overflow-hidden transition-colors duration-300">

      <div id="tech-stack-container" class="max-w-[1440px] mx-auto relative z-10 transition-all duration-1000 ease-out"
         :class="isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'">

         <div id="tech-stack-ambient-pulse"
            class="absolute md:flex left-4 top-10 hidden lg:flex items-center justify-center pointer-events-none">
            <div id="tech-stack-pulse-wrapper" class="relative w-40 h-40 flex items-center justify-center">
               <div id="tech-stack-pulse-ring-1"
                  class="absolute inset-0 rounded-full border border-emerald-500/10 animate-pulse"></div>
               <div id="tech-stack-pulse-ring-2"
                  class="absolute inset-4 rounded-full border border-emerald-500/20 animate-pulse"></div>
               <div id="tech-stack-pulse-ring-3"
                  class="absolute inset-9 rounded-full border border-emerald-500/30 animate-pulse"></div>
               <div id="tech-stack-pulse-icon-box"
                  class="w-14 h-14 bg-emerald-50 dark:bg-emerald-950/50 rounded-full flex items-center justify-center shadow-sm border border-emerald-100 dark:border-emerald-900/50">
                  <svg id="tech-stack-pulse-svg" class="w-7 h-7 text-emerald-600 dark:text-emerald-400 animate-pulse"
                     fill="currentColor" viewBox="0 0 20 20">
                     <path fill-rule="evenodd"
                        d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z"
                        clip-rule="evenodd" />
                  </svg>
               </div>
            </div>
         </div>

         <div id="tech-stack-dots-grid"
            class="absolute right-4 top-10 hidden md:grid grid-cols-5 gap-2.5 opacity-30 pointer-events-none">
            <div id="tech-stack-dot-item" class="w-1 h-1 rounded-full bg-emerald-700 dark:bg-emerald-500 animate-pulse"
               v-for="i in 25" :key="i"></div>
         </div>

         <div id="tech-stack-header-wrapper" class="tech-stack-header flex flex-col items-center justify-center mb-6">
            <span id="tech-stack-badge-span"
               class="tech-stack-badge-text text-xs font-bold tracking-[0.2em] text-emerald-600 dark:text-emerald-400 uppercase mb-3">{{
                  techData.sectionNumber }}</span>
            <div id="tech-stack-line-wrapper" class="relative flex items-center justify-center w-48">
               <div id="tech-stack-line-bar"
                  class="absolute w-full h-[1.5px] bg-gradient-to-r from-transparent via-emerald-600/40 to-transparent">
               </div>
               <span id="tech-stack-line-dot"
                  class="tech-stack-dot w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 relative z-10"></span>
            </div>
         </div>

         <h2 id="tech-stack-main-heading"
            class="tech-stack-title text-4xl sm:text-5xl lg:text-6xl font-black text-center tracking-tight mb-6 max-w-4xl mx-auto leading-tight text-slate-900 dark:text-white"
            v-html="techData.headline"></h2>

         <p id="tech-stack-description-text"
            class="tech-stack-description text-slate-500 dark:text-slate-400 text-center max-w-2xl mx-auto text-base sm:text-lg font-normal leading-relaxed">
            {{ techData.description }}
         </p>

      </div>
   </section>
</template>