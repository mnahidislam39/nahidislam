<script setup>
import { footerData } from '../data';
import { Icon } from '@iconify/vue';
import { useScrollReveal } from '../composables/useScrollReveal';

const footer = footerData;

const { elementRef, isVisible } = useScrollReveal(0.1, true);
</script>

<template>
   <footer ref="elementRef" id="footer"
      class="footer-wrapper bg-[#fbf9f4] dark:bg-[#0b0f0e] text-slate-600 dark:text-slate-300  pb-12 px-4 sm:px-6 lg:px-12 relative overflow-hidden font-sans border-t border-slate-200/90 dark:border-emerald-950/40 transition-colors duration-300">

      <div id="footer-container-inner" :class="['footer-container max-w-[1440px] mx-auto scroll-zoom-container', { 'start-zoom': isVisible }]">

         <!-- Top CTA Card Banner -->
         <div id="footer-cta-banner"
            :class="['footer-cta-card bg-white dark:bg-[#0f1715] border border-slate-200/90 dark:border-emerald-900/40 rounded-[2.5rem] p-6 sm:p-8 lg:p-10 mb-20 shadow-[0_10px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden scroll-card-item', { 'is-visible': isVisible }]">

            <!-- Left Side: Icon & Text -->
            <div id="footer-cta-left" class="footer-cta-content-wrapper flex items-center gap-6">
               <div id="footer-cta-icon-box"
                  class="footer-cta-icon flex items-center justify-center w-16 h-16 text-3xl border shadow-inner rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-500 shrink-0">
                  <Icon icon="lucide:send" />
               </div>
               <div id="footer-cta-text-box" class="footer-cta-text-group">
                  <p id="footer-cta-tag"
                     class="footer-tagline-text text-xs font-bold tracking-[0.2em] text-emerald-700 dark:text-emerald-500 uppercase mb-1">
                     Have a Project in Mind?
                  </p>
                  <h3 id="footer-cta-headline"
                     class="footer-heading-text text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                     Let’s Build Something <span id="footer-cta-highlight"
                        class="text-emerald-700 dark:text-emerald-500">Amazing</span> Together!
                  </h3>
                  <p id="footer-cta-description"
                     class="footer-desc-text mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">I’m ready to
                     help you turn your ideas into a
                     powerful digital experience.</p>
               </div>
            </div>

            <!-- Right Side: Button & Note -->
            <div id="footer-cta-right"
               class="footer-cta-action-wrapper flex flex-col items-center w-full lg:items-end shrink-0 lg:w-auto">
               <a id="footer-cta-button" href="#contact"
                  class="footer-btn-main w-full lg:w-auto bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 dark:from-emerald-700 dark:to-emerald-600 dark:hover:from-emerald-600 dark:hover:to-emerald-500 text-white font-bold text-xs sm:text-sm px-8 py-4 rounded-xl transition-all shadow-[0_0_30px_rgba(16,185,129,0.2)] dark:shadow-[0_0_30px_rgba(16,185,129,0.3)] flex items-center justify-center gap-3 group">
                  Start Your Project
                  <Icon icon="lucide:arrow-right" class="text-lg transition-transform group-hover:translate-x-1" />
               </a>
               <span id="footer-cta-note"
                  class="footer-note-text text-[11px] text-slate-400 dark:text-slate-500 mt-2">I’ll get back to you
                  within <span class="font-bold text-emerald-700 dark:text-emerald-400">24 hours!</span></span>
            </div>

         </div>

         <!-- Main Footer Columns Grid -->
         <div id="footer-main-grid"
            :class="['footer-grid grid grid-cols-1 gap-12  md:grid-cols-2 lg:grid-cols-12 lg:gap-8 scroll-card-item', { 'is-visible': isVisible }]">

            <div id="footer-col-brand" class="footer-brand-column flex flex-col gap-6 lg:col-span-4">

               <!-- Logo & Title -->
               <div id="footer-brand-header" class="footer-logo-wrapper flex flex-col items-start gap-3">
                  <div id="footer-brand-logo-box"
                     class="footer-logo-icon flex items-center justify-center text-xl font-black max-w-[200px] text-emerald-700 dark:text-emerald-400 overflow-hidden shrink-0">
                     <img v-if="footer.personal.logoUrl" :src="footer.personal.logoUrl" alt="Logo"
                        class="w-full h-full object-cover" />
                  </div>
                  <div id="footer-brand-titles" class="footer-title-group">            
                     <p id="footer-author-role"
                        class="footer-role text-[11px] text-slate-400 dark:text-slate-400 font-medium">{{
                           footer.personal.title }}</p>
                  </div>
               </div>

               <!-- Description -->
               <p id="footer-brand-desc"
                  class="footer-bio text-xs leading-relaxed text-slate-500 dark:text-slate-400 pr-4">
                  {{ footer.personal.bio }}
               </p>

               <!-- Feature Bullet Points (Dynamic) -->
               <div id="footer-features-list" class="footer-features-wrapper flex flex-col gap-3 pt-2">
                  <div v-for="(feature, index) in footer.featuresList" :key="index"
                     class="footer-feature-item flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
                     <span
                        class="footer-check-icon flex items-center justify-center w-5 h-5 text-xs border rounded-full bg-emerald-50 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400 shrink-0 font-bold">✓</span>
                     {{ feature.text }}
                  </div>
               </div>

            </div>

            <div id="footer-col-links" class="footer-links-column flex flex-col gap-4 lg:col-span-2">
               <h3 id="footer-links-title"
                  class="footer-column-heading mb-2 text-sm font-bold tracking-wide text-slate-900 dark:text-white">
                  Quick Links</h3>
               <ul id="footer-links-list" class="footer-nav-list flex flex-col gap-3 text-xs">
                  <li v-for="(link, index) in footer.quickLinks" :key="index">
                     <a :href="link.href"
                        class="footer-nav-link flex items-center justify-between transition-colors text-slate-500 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 group">
                        {{ link.name }}
                        <span
                           class="transition-colors text-slate-400 dark:text-slate-600 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">›</span>
                     </a>
                  </li>
               </ul>
            </div>

            <div id="footer-middle-bar"
               class="footer-contact-social-grid grid grid-cols-1 gap-8 mb-10 text-xs lg:grid-cols-12 lg:col-span-6">

               <!-- Contact Details Left -->
               <div id="footer-contact-details" class="footer-get-in-touch flex flex-col gap-4 lg:col-span-8">
                  <h3 id="footer-contact-title"
                     class="footer-column-heading mb-1 text-sm font-bold tracking-wide text-slate-900 dark:text-white">
                     Get In Touch</h3>
                  <div id="footer-contact-items"
                     class="footer-contact-list flex flex-wrap items-center gap-6 sm:gap-8 text-slate-500 dark:text-slate-400">
                     <a id="footer-email-link" :href="'mailto:' + footer.personal.email"
                        class="footer-contact-element !lowercase flex items-center gap-2 transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
                        <Icon icon="lucide:mail" class="text-base text-emerald-600 dark:text-emerald-500" /> {{
                           footer.personal.email }}
                     </a>
                     <a id="footer-phone-link" :href="'tel:' + footer.personal.phone.replace(/\s/g, '')"
                        class="footer-contact-element flex items-center gap-2 transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
                        <Icon icon="lucide:phone" class="text-base text-emerald-600 dark:text-emerald-500" /> {{
                           footer.personal.phone }}
                     </a>
                     <div id="footer-location-info" class="footer-contact-element flex items-center gap-2">
                        <Icon icon="lucide:map-pin" class="text-base text-emerald-600 dark:text-emerald-500" /> {{
                           footer.personal.location }}
                     </div>
                     <div id="footer-response-info" class="footer-contact-element flex items-center gap-2">
                        <Icon icon="lucide:clock" class="text-base text-emerald-600 dark:text-emerald-500" /> Response
                        Time {{ footer.personal.responseTime }}
                     </div>
                  </div>
               </div>

               <!-- Social Icons Right -->
               <div id="footer-social-section" class="footer-follow-wrapper flex flex-col gap-3 lg:col-span-4">
                  <span id="footer-social-title"
                     class="footer-column-heading mb-1 text-sm font-bold tracking-wide text-slate-900 dark:text-white">Follow
                     Me</span>
                  <div id="footer-social-icons" class="footer-social-list flex flex-wrap items-center gap-3">
                     <a v-for="(social, index) in footer.socialLinks" :key="index" :href="social.url" target="_blank"
                        rel="noopener noreferrer"
                        class="footer-social-icon w-9 h-9 rounded-full bg-white dark:bg-[#0f1715] border border-slate-200 dark:border-emerald-950 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500 dark:hover:border-emerald-700 shadow-sm transition-all">
                        <Icon :icon="social.icon" class="text-sm" />
                     </a>
                  </div>
               </div>
            </div>
         </div>

         <!-- Dividers -->
         <div id="footer-divider-bottom" class="footer-divider w-full h-[1px] bg-slate-200 dark:bg-emerald-950/60 mb-8"></div>

         <!-- Bottom Copyright & Tech Stack Row -->
         <div id="footer-bottom-bar"
            class="footer-copyright-row flex flex-col items-center justify-between gap-6 text-xs md:flex-row text-slate-400 dark:text-slate-500">

            <div id="footer-copyright-box"
               class="footer-copyright-group flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
               <p>© {{ footer.personal.copyrightYear }} {{ footer.personal.firstName }} {{ footer.personal.lastName }}.
                  All rights reserved.</p>
               <span class="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
               <p>{{ footer.personal.tagline }}</p>
            </div>

         </div>

      </div>

   </footer>
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