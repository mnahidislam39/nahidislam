<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { headerData } from '../data';
import { Icon } from '@iconify/vue';
import { useDark } from '../composables/useDark.js';

const route = useRoute();
const router = useRouter();

const header = headerData;
const { isDark, toggleDark } = useDark();

const isOpen = ref(false);
const activeSection = ref('home');
const isScrolled = ref(false);

const toggleMenu = () => {
   isOpen.value = !isOpen.value;
};

const handleLogoClick = (e) => {
   if (e) e.preventDefault();
   isOpen.value = false;
   activeSection.value = 'home';

   if (route.path === '/') {
      if (route.hash) {
         router.replace({ path: '/', hash: '' });
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
   } else {
      router.push({ path: '/' });
   }
};

const getLogoUrl = (imagePath) => {
   if (!imagePath) return '';
   if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
   }
   const cleanPath = imagePath.replace(/^[\.\/]+/, '');
   return new URL(`../assets/${cleanPath}`, import.meta.url).href;
};

// Raw Drive Link for Download Button
const resumePdfUrl = computed(() => {
   return headerData.ctaLink || '';
});

// Drive Preview Embed Link Converter for Modal
const driveEmbedUrl = computed(() => {
   if (!headerData.ctaLink) return '';
   // Google Drive-এর view লিংককে embeddable preview লিংকে রূপান্তর করে
   if (headerData.ctaLink.includes('drive.google.com')) {
      return headerData.ctaLink.replace(/\/view.*$/, '/preview');
   }
   return headerData.ctaLink;
});

const handleNavClick = (href, e) => {
   if (e) e.preventDefault();
   isOpen.value = false;

   if (!href) return;

   if (!href.startsWith('#')) {
      router.push(href);
      return;
   }

   const targetId = href.substring(1);
   activeSection.value = targetId;

   if (route.path === '/') {
      const element = document.getElementById(targetId);
      if (element) {
         element.scrollIntoView({ behavior: 'smooth' });
      }
   } else {
      router.push({ path: '/', hash: href });
   }
};

const handleScroll = () => {
   if (window.scrollY > 20) {
      isScrolled.value = true;
   } else {
      isScrolled.value = false;
   }

   if (route.path === '/') {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 200;

      sections.forEach((sec) => {
         const sectionTop = sec.offsetTop;
         const sectionHeight = sec.offsetHeight;
         const sectionId = sec.getAttribute('id');

         if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            activeSection.value = sectionId;
         }
      });
   }
};

onMounted(() => {
   window.addEventListener('scroll', handleScroll);
   handleScroll();
});

onUnmounted(() => {
   window.removeEventListener('scroll', handleScroll);
});

// Modal State
const isResumeModalOpen = ref(false);

const openResumeModal = (e) => {
   if (e) e.preventDefault();
   isOpen.value = false;
   isResumeModalOpen.value = true;
};
</script>

<template>
   <header
      class="site-header-wrapper fixed top-0 left-0 right-0 z-50 flex items-center justify-center transition-all duration-300 pointer-events-none"
      :class="[
         isScrolled
            ? (isDark ? 'pt-0 px-0 bg-[#120f0c] text-white border-[#26211c] shadow-[0_15px_35px_rgba(0,0,0,0.25)]' : 'pt-0 px-0 bg-white text-slate-900 border-slate-200/90 shadow-[0_15px_35px_rgba(0,0,0,0.06)]')
            : 'pt-4 px-4'
      ]" id="site-header-wrapper">
      <div
         class="site-nav-container pointer-events-auto flex items-center justify-between transition-all duration-300 relative"
         :class="[
            isDark ? 'bg-[#120f0c] text-white border-[#26211c] shadow-[0_15px_35px_rgba(0,0,0,0.25)]' : 'bg-white text-slate-900 border-slate-200/90 ',
            isScrolled
               ? 'w-full max-w-[1440px] mx-auto rounded-none border-x-0 border-t-0 px-6 sm:px-12 py-3.5 backdrop-blur-md bg-[#120f0c]/95 dark:bg-[#120f0c]/95 '
               : 'w-full max-w-[1440px] mx-auto rounded-full px-4 py-2.5 sm:px-6 sm:py-3 border'
         ]" id="site-nav-container">

         <!-- Logo -->
         <router-link to="/" class="site-logo-link flex items-center gap-3 cursor-pointer group" id="site-logo-link"
            @click="handleLogoClick">
            <img class="site-logo-image h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105"
               id="site-logo-image" :src="getLogoUrl(headerData.logoImg)" alt="Logo" />
         </router-link>

         <!-- Nav Links -->
         <nav
            class="desktop-nav-menu items-center hidden gap-8 text-xs font-bold lg:flex transition-colors duration-300"
            :class="isDark ? 'text-slate-300' : 'text-slate-900'" id="desktop-nav-menu">
            <a v-for="(link, idx) in headerData.navLinks" :key="idx" :href="link.href"
               @click="handleNavClick(link.href, $event)"
               class="desktop-nav-link-item transition-colors relative py-1 text-sm uppercase cursor-pointer" :class="[
                  activeSection === link.href.substring(1) && route.path === '/'
                     ? 'text-[#009966]'
                     : (isDark ? 'hover:text-[#009966]' : 'hover:text-[#009966]')
               ]" id="desktop-nav-link-item">
               {{ link.name }}
               <span v-if="activeSection === link.href.substring(1) && route.path === '/'"
                  class="desktop-nav-active-indicator absolute bottom-0 left-0 w-full h-[2px] bg-[#009966] rounded-full"
                  id="desktop-nav-active-indicator"></span>
            </a>
         </nav>

         <!-- Actions -->
         <div class="header-actions-group flex items-center gap-3" id="header-actions-group">
            <button
               class="theme-toggle-button w-10 h-10 rounded-full bg-slate-100 dark:bg-[#1b1713] border border-slate-200 dark:border-[#2d2620] flex items-center justify-center text-[#009966] hover:bg-slate-200 dark:hover:bg-[#26211c] transition-all cursor-pointer shadow-inner"
               id="theme-toggle-button" @click="toggleDark">
               <Icon :icon="isDark ? 'lucide:sun' : 'lucide:moon'" class="theme-toggle-icon text-base" />
            </button>

            <button
               class="desktop-cta-button flex items-center justify-center hidden px-4 py-2 text-sm rounded-full font-bold transition-all shadow-md cursor-pointer sm:inline-block"
               :class="isDark ? 'bg-[#009966] text-white hover:bg-[transparent] hover:text-white border border-[#009966] hover:border-[#009966]' : 'bg-transparent border border-[#009966] text-black hover:bg-[#009966] hover:text-white'"
               id="desktop-cta-button" @click="openResumeModal">
               {{ headerData.ctaText }}
            </button>

            <button
               class="mobile-menu-toggle-button w-10 h-10 rounded-full bg-slate-100 dark:bg-[#1b1713] border border-slate-200 dark:border-[#2d2620] flex items-center justify-center text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-[#26211c] transition-all cursor-pointer shadow-inner lg:hidden"
               id="mobile-menu-toggle-button" @click="toggleMenu">
               <Icon :icon="isOpen ? 'lucide:x' : 'lucide:menu'" class="mobile-menu-icon text-xl" />
            </button>
         </div>

         <!-- Mobile Menu -->
         <transition enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform -translate-y-2 opacity-0" enter-to-class="transform translate-y-0 opacity-100"
            leave-active-class="transition duration-150 ease-in" leave-from-class="transform translate-y-0 opacity-100"
            leave-to-class="transform -translate-y-2 opacity-0">
            <div v-if="isOpen"
               class="mobile-dropdown-container absolute left-0 right-0 z-40 p-6 flex flex-col gap-4 pointer-events-auto lg:hidden transition-all duration-300"
               :class="[
                  isDark ? 'bg-[#120f0c] text-white border-[#26211c] shadow-[0_20px_40px_rgba(0,0,0,0.4)]' : 'bg-white text-slate-900 border-slate-200 shadow-[0_20px_40px_rgba(0,0,0,0.1)]',
                  isScrolled ? 'top-full rounded-b-3xl rounded-t-none border-t-0' : 'top-full mt-2 rounded-3xl border'
               ]" id="mobile-dropdown-container">
               <nav class="mobile-nav-links-list flex flex-col gap-3 text-sm font-bold" id="mobile-nav-links-list">
                  <a v-for="(link, idx) in headerData.navLinks" :key="idx" :href="link.href"
                     @click="handleNavClick(link.href, $event)"
                     class="mobile-nav-link-item py-2 px-4 rounded-xl transition-colors cursor-pointer" :class="[
                        activeSection === link.href.substring(1) && route.path === '/'
                           ? 'bg-[#009966]/10 text-[#009966]'
                           : (isDark ? 'hover:bg-[#1b1713] hover:text-[#009966]' : 'hover:bg-slate-100 hover:text-[#009966]')
                     ]" id="mobile-nav-link-item">
                     {{ link.name }}
                  </a>
               </nav>

               <button class="mobile-cta-button w-full py-3 rounded-full font-bold text-xs text-center transition-all shadow-md cursor-pointer sm:hidden"
                  :class="isDark ? 'bg-transparent border border-[#009966] text-white hover:bg-[#009966] hover:text-white' : 'bg-transparent border border-[#009966] text-emerald-600 hover:bg-[#009966] hover:text-white'"
                  id="mobile-cta-button" @click="openResumeModal">
                  {{ headerData.ctaText }}
               </button>
            </div>
         </transition>

      </div>
   </header>

   <!-- Resume Preview Modal -->
   <Teleport to="body">
      <div v-if="isResumeModalOpen"
         class="resume-modal-overlay fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
         @click.self="isResumeModalOpen = false">
         <div
            class="resume-modal-content relative w-full max-w-4xl h-[85vh] bg-white dark:bg-[#120f0c] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-[#26211c]">
            <!-- Modal Header -->
            <div
               class="resume-modal-header flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-[#26211c]">
               <h3 class="resume-modal-title text-lg font-bold text-slate-800 dark:text-white">Resume Preview</h3>

               <div class="resume-modal-actions flex items-center gap-3">
                  <a :href="resumePdfUrl" target="_blank" rel="noopener noreferrer"
                     class="resume-download-btn flex items-center gap-2 px-4 py-2 bg-[#009966] text-white rounded-full text-xs font-bold hover:bg-[#007a52] transition-colors">
                     <Icon icon="lucide:download" class="text-base" />
                     Open / Download
                  </a>

                  <button @click="isResumeModalOpen = false"
                     class="resume-close-btn p-2 rounded-full hover:bg-slate-100 dark:hover:bg-[#1b1713] text-slate-600 dark:text-slate-300 transition-colors">
                     <Icon icon="lucide:x" class="text-xl" />
                  </button>
               </div>
            </div>

            <!-- Modal Body (Google Drive Preview) -->
            <div class="resume-modal-body flex-1 bg-slate-100 dark:bg-[#1b1713] relative overflow-hidden">
               <iframe
                  :src="driveEmbedUrl"
                  class="w-full h-full border-none"
                  title="Resume Preview"
                  allow="autoplay"
               ></iframe>
            </div>
         </div>
      </div>
   </Teleport>
</template>