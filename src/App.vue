<script setup>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { Icon } from '@iconify/vue';
import MasterEffects from './components/MasterEffects.vue'; 
import { effectsConfig, setEffect } from './composables/useEffectsConfig';

// 🎯 আপনি চাইলে এখান থেকে অন/অফ করতে পারেন:
setEffect('waterRipple', false); // Water Ripple চালু করার জন্য
setEffect('magneticCursor', false); // Cursor বন্ধ করার জন্য
</script>

<template>
   <main
      class="min-h-screen bg-[#fbf9f4] dark:bg-[#0b0f0e] text-slate-900 dark:text-white selection:bg-emerald-500 selection:text-white relative font-sans transition-colors duration-300 ">

      <Header />

      <div class="Main-Content-Wrapper">
         <RouterView />
      </div>

      <Footer />
      <MasterEffects />

      <div class="fixed z-50 flex-col hidden gap-4 -translate-y-1/2 right-6 top-1/2 lg:flex">
        
         <a href="https://wa.me/01761005639" target="_blank"
            class="custom-whatsapp-btn w-12 h-12 rounded-full bg-white/80 dark:bg-[#0f1715]/80 backdrop-blur-md border border-slate-200 dark:border-emerald-900/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 hover:text-white hover:bg-emerald-600 dark:hover:bg-emerald-700 hover:border-emerald-500 dark:hover:border-emerald-600 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] group animate-pulse"
            aria-label="WhatsApp">
            <Icon icon="ri:whatsapp-fill" class="text-2xl transition-transform group-hover:scale-110" />
         </a>
      </div>
   </main>
</template>