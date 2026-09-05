<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'; // Router ও Route ইম্পোর্ট করুন
import { footerData } from '../data';
import { Icon } from '@iconify/vue';
import { useScrollReveal } from '../composables/useScrollReveal';

import footerBgImg from '/nahid.png'; 

const footer = footerData;
const { elementRef, isVisible } = useScrollReveal(0.1, true);

const router = useRouter();
const route = useRoute();

// Scroll Parallax Logic
const scrollY = ref(0);

const handleScroll = () => {
   if (elementRef.value) {
      const rect = elementRef.value.getBoundingClientRect();
      scrollY.value = rect.top * 0.25; 
   }
};

// Smart Scroll & Routing Handler
const scrollToSection = async (targetHref) => {
   if (!targetHref) return;

   // ১. যদি ইন্টারনাল হ্যাশ লিঙ্ক না হয় (যেমন external url)
   if (!targetHref.startsWith('#')) {
      window.location.href = targetHref;
      return;
   }

   // ২. আপনি যদি হোম পেজে না থাকেন (Single Project Page-এ থাকেন)
   if (route.path !== '/') {
      // প্রথমে হোম পেজে যান
      await router.push('/');
      // পেজ লোড হওয়ার জন্য সামান্য ডিলে দিয়ে স্ক্রোল করুন
      setTimeout(() => {
         const targetElement = document.querySelector(targetHref);
         if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
         }
      }, 300);
   } else {
      // ৩. আপনি অলরেডি হোম পেজে থাকলে সরাসরি স্ক্রোল হবে
      const targetElement = document.querySelector(targetHref);
      if (targetElement) {
         targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
   }
};

onMounted(() => {
   window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
   window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
   <!-- relative & overflow-hidden দিয়ে ছবিটিকে শুধুমাত্র ফুটারের মধ্যে লক করা হয়েছে -->
   <footer ref="elementRef" id="footer"
      class="footer-wrapper bg-[#fbf9f4] dark:bg-[#0b0f0e] text-slate-800 dark:text-slate-300 relative overflow-hidden font-sans border-t border-slate-200 dark:border-emerald-950/40 transition-colors duration-300">

      <div 
         class="absolute inset-0 w-full h-[130%] -top-[15%] bg-cover bg-center pointer-events-none z-0 opacity-1 dark:opacity-100 transition-transform duration-100 ease-out"
         :style="{ 
            backgroundImage: `url(${footerBgImg})`,
            transform: `translate3d(0, ${scrollY}px, 0)` 
         }"
      ></div>

      <!-- Overlay Layer (লেখা যাতে স্পষ্ট পড়া যায়) -->
      <div class="absolute inset-0 bg-gradient-to-b from-[#fbf9f4]/90 via-[#fbf9f4]/60 to-[#046947]/40 dark:from-[#0b0f0e]/95 dark:via-[#0b0f0e]/70 dark:to-[#046947]/50 pointer-events-none z-0"></div>

      <!-- Top CTA & Big Title Section -->
      <div id="footer-top-container" :class="['max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12 pt-16 pb-20 relative z-10 scroll-zoom-container', { 'start-zoom': isVisible }]">
         <div id="footer-top-cta" class="flex flex-col items-center justify-center text-center">
            
            <div class="w-12 h-12 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center mb-6 text-slate-700 dark:text-white text-xl font-bold bg-emerald-200/60 dark:bg-emerald-900/50 shadow-sm">
               <Icon icon="lucide:circle-dot" />
            </div>

            <h2 class="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white uppercase max-w-4xl leading-tight mb-8">
               {{ footer.personal.title }} <br class="hidden sm:inline" />  {{ footer.personal.subTitle }}
            </h2>

            <a :href="footer.personal.ectaButtonLink" 
               @click.prevent="scrollToSection(footer.personal.ectaButtonLink)"
               class="bg-[#046947] hover:bg-[#035237] text-white font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-full transition-transform duration-300 hover:scale-105 shadow-md mb-10 cursor-pointer">
               {{ footer.personal.ectaButtonText }}
            </a>

            <div class="mt-2">
               <h1 class="text-6xl sm:text-7xl lg:text-9xl font-black text-[#046947] dark:text-[#00d492] tracking-wider uppercase select-none drop-shadow-sm transition-colors duration-300">
                  {{ footer.personal.firstName }} {{ footer.personal.lastName }}
               </h1>
            </div>

         </div>
      </div>

      <!-- Bottom Real Live Wave Container -->
      <div class="relative w-full bg-[#046947] text-white py-5 z-10">
         
         <!-- Live Infinite Animated Waves -->
         <div class="wave-wrapper absolute bottom-full left-0 w-full h-[60px] sm:h-[120px] overflow-hidden leading-none pointer-events-none">
            <svg class="waves w-full h-full" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
               viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
               <defs>
                  <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
               </defs>
               <g class="parallax"> 
                  <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(4, 105, 71, 0.3)" />
                  <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(4, 105, 71, 0.5)" />
                  <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(4, 105, 71, 0.7)" />
                  <use xlink:href="#gentle-wave" x="48" y="7" fill="#046947" />
               </g>
            </svg>
         </div>

         <!-- Centered Content inside Wave Section -->
         <div class="max-w-4xl mx-auto px-4 flex flex-col items-center justify-center text-center gap-6 relative z-20">
            
            <!-- Social Icons -->
            <div class="flex items-center justify-center gap-4 sm:gap-5">
               <a v-for="(social, index) in footer.socialLinks" :key="index" :href="social.url" target="_blank" rel="noopener noreferrer"
                  class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110">
                  <Icon :icon="social.icon" class="text-lg" />
               </a>
            </div>

            <!-- Inline Navigation Links -->
            <ul v-if="footer.quickLinks" class="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm font-medium text-emerald-100">
               <li v-for="(link, index) in footer.quickLinks" :key="index">
                  <a :href="link.href" 
                     @click.prevent="scrollToSection(link.href)"
                     class="hover:text-white transition-colors cursor-pointer">
                     {{ link.name }}
                  </a>
               </li>
            </ul>

            <!-- Copyright -->
            <p class="text-xs text-emerald-200 mt-2">
               © {{ footer.personal.copyrightYear }} {{ footer.personal.firstName }} {{ footer.personal.lastName }}. All Rights Reserved.
            </p>

         </div>
      </div>

   </footer>
</template>

<style scoped>
/* Scroll Reveal */
.scroll-zoom-container {
   opacity: 0;
   transform: scale(0.98) translateY(20px);
   transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.scroll-zoom-container.start-zoom {
   opacity: 1;
   transform: scale(1) translateY(0);
}

/* Wave Animation */
.parallax > use {
   animation: move-forever 25s cubic-bezier(.55, .5, .45, .5) infinite;
}
.parallax > use:nth-child(1) { animation-delay: -2s; animation-duration: 7s; }
.parallax > use:nth-child(2) { animation-delay: -3s; animation-duration: 10s; }
.parallax > use:nth-child(3) { animation-delay: -4s; animation-duration: 13s; }
.parallax > use:nth-child(4) { animation-delay: -5s; animation-duration: 20s; }

@keyframes move-forever {
   0% { transform: translate3d(-90px, 0, 0); }
   100% { transform: translate3d(85px, 0, 0); }
}
</style>