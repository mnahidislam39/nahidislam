<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
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

// Vite Dynamic Asset Loader (লোগো যেন সব পেজে দেখায়)
const getLogoUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  const cleanPath = imagePath.replace(/^[\.\/]+/, '');
  return new URL(`../assets/${cleanPath}`, import.meta.url).href;
};

// স্মার্ট নেভিগেশন (অন্য পেজে থাকলেও হোমপেজের সেকশনে নিয়ে যাবে)
const handleNavClick = (href, e) => {
  if (e) e.preventDefault();
  isOpen.value = false;

  if (!href) return;

  // যদি লিংকটি কোনো সেকশন আইডির না হয়ে এক্সটার্নাল লিংক হয়
  if (!href.startsWith('#')) {
    router.push(href);
    return;
  }

  const targetId = href.substring(1);
  activeSection.value = targetId;

  // বর্তমানে যদি হোমপেজে থাকি
  if (route.path === '/') {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  } else {
    // যদি Single Project বা অন্য পেজে থাকি, তবে হোমপেজে রিডাইরেক্ট হয়ে সেকশনে যাবে
    router.push({ path: '/', hash: href });
  }
};

const handleScroll = () => {
  if (window.scrollY > 20) {
    isScrolled.value = true;
  } else {
    isScrolled.value = false;
  }

  // শুধুমাত্র হোমপেজে থাকলে স্ক্রোল অনুযায়ী এক্টিভ সেকশন ট্র্যাকিং করবে
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
</script>

<template>
   <header
      class="fixed top-0 left-0 right-0 z-50 flex items-center justify-center transition-all duration-300 pointer-events-none"
      :class="[
         isScrolled 
            ? (isDark ? 'pt-0 px-0 bg-[#120f0c] text-white border-[#26211c] shadow-[0_15px_35px_rgba(0,0,0,0.25)]' : 'pt-0 px-0 bg-[#fbf9f4] text-slate-900 border-slate-200/90 shadow-[0_15px_35px_rgba(0,0,0,0.06)]') 
            : 'pt-4 px-4'
      ]"
      id="site-header-wrapper"
   >
      <div
         class="pointer-events-auto flex items-center justify-between transition-all duration-300 relative"
         :class="[
            isDark ? 'bg-[#120f0c] text-white border-[#26211c] shadow-[0_15px_35px_rgba(0,0,0,0.25)]' : 'bg-[#fbf9f4] text-slate-900 border-slate-200/90 shadow-[0_15px_35px_rgba(0,0,0,0.06)]',
            isScrolled 
               ? 'w-full max-w-[1440px] mx-auto rounded-none border-x-0 border-t-0 px-6 sm:px-12 py-3.5 backdrop-blur-md bg-[#120f0c]/95 dark:bg-[#120f0c]/95 shadow-md' 
               : 'w-full max-w-[1440px] mx-auto rounded-full px-4 py-2.5 sm:px-6 sm:py-3 border'
         ]"
         id="site-nav-container"
      >

      <!-- GitHub Pages URL টি নতুন রিপোজিটরির নামে আপডেট করুন -->
      <router-link
         to="/"
         class="flex items-center gap-3 cursor-pointer group"
         id="site-logo-link"
         @click="handleLogoClick"
      >
         <img
            class="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105"
            id="site-logo-image"
            :src="getLogoUrl(headerData.logoImg)" 
            alt="Logo" 
         />
      </router-link>

         <!-- Desktop Nav Links -->
         <nav
            class="items-center hidden gap-8 text-xs font-bold lg:flex transition-colors duration-300"
            :class="isDark ? 'text-slate-300' : 'text-slate-600'"
            id="desktop-nav-menu"
         >
            <a
               v-for="(link, idx) in headerData.navLinks" 
               :key="idx" 
               :href="link.href" 
               @click="handleNavClick(link.href, $event)"
               class="transition-colors relative py-1 text-sm uppercase cursor-pointer"
               :class="[
                  activeSection === link.href.substring(1) && route.path === '/'
                     ? 'text-[#009966]' 
                     : (isDark ? 'hover:text-[#009966]' : 'hover:text-[#009966]')
               ]"
               id="desktop-nav-link-item"
            >
               {{ link.name }}
               <span
                  v-if="activeSection === link.href.substring(1) && route.path === '/'" 
                  class="absolute bottom-0 left-0 w-full h-[2px] bg-[#009966] rounded-full"
                  id="desktop-nav-active-indicator"
               ></span>
            </a>
         </nav>

         <!-- Actions (Theme Toggle, CTA Button & Mobile Hamburger) -->
         <div
            class="flex items-center gap-3"
            id="header-actions-group"
         >
            <button
               class="w-10 h-10 rounded-full bg-slate-100 dark:bg-[#1b1713] border border-slate-200 dark:border-[#2d2620] flex items-center justify-center text-[#009966] hover:bg-slate-200 dark:hover:bg-[#26211c] transition-all cursor-pointer shadow-inner"
               id="theme-toggle-button"
               @click="toggleDark"
            >
               <Icon :icon="isDark ? 'lucide:sun' : 'lucide:moon'" class="text-base" />
            </button>

            <!-- Desktop CTA -->
            <a
               class="hidden px-4 py-2 text-sm rounded-full font-bold transition-all shadow-md cursor-pointer sm:inline-block"
               :class="isDark ? 'bg-[#009966] text-white hover:bg-[transparent] hover:text-white border border-[#009966] hover:border-[#009966]' : 'bg-white text-black hover:bg-[#009966] hover:text-white'"
               id="desktop-cta-button"
               :href="headerData.ctaLink"
               @click="handleNavClick(headerData.ctaLink, $event)"
            >
               {{ headerData.ctaText }}
            </a>

            <!-- Mobile Menu Toggle Button -->
            <button
               class="w-10 h-10 rounded-full bg-slate-100 dark:bg-[#1b1713] border border-slate-200 dark:border-[#2d2620] flex items-center justify-center text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-[#26211c] transition-all cursor-pointer shadow-inner lg:hidden"
               id="mobile-menu-toggle-button"
               @click="toggleMenu"
            >
               <Icon :icon="isOpen ? 'lucide:x' : 'lucide:menu'" class="text-xl" />
            </button>
         </div>

         <!-- Mobile Dropdown Menu -->
         <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform -translate-y-2 opacity-0"
            enter-to-class="transform translate-y-0 opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="transform translate-y-0 opacity-100"
            leave-to-class="transform -translate-y-2 opacity-0"
         >
            <div
               v-if="isOpen" 
               class="absolute left-0 right-0 z-40 p-6 flex flex-col gap-4 pointer-events-auto lg:hidden transition-all duration-300"
               :class="[
                  isDark ? 'bg-[#120f0c] text-white border-[#26211c] shadow-[0_20px_40px_rgba(0,0,0,0.4)]' : 'bg-[#fbf9f4] text-slate-900 border-slate-200 shadow-[0_20px_40px_rgba(0,0,0,0.1)]',
                  isScrolled ? 'top-full rounded-b-3xl rounded-t-none border-t-0' : 'top-full mt-2 rounded-3xl border'
               ]"
               id="mobile-dropdown-container"
            >
               <nav
                  class="flex flex-col gap-3 text-sm font-bold"
                  id="mobile-nav-links-list"
               >
                  <a
                     v-for="(link, idx) in headerData.navLinks" 
                     :key="idx" 
                     :href="link.href" 
                     @click="handleNavClick(link.href, $event)"
                     class="py-2 px-4 rounded-xl transition-colors cursor-pointer"
                     :class="[
                        activeSection === link.href.substring(1) && route.path === '/'
                           ? 'bg-[#009966]/10 text-[#009966]' 
                           : (isDark ? 'hover:bg-[#1b1713] hover:text-[#009966]' : 'hover:bg-slate-100 hover:text-[#009966]')
                     ]"
                     id="mobile-nav-link-item"
                  >
                     {{ link.name }}
                  </a>
               </nav>

               <a
                  class="w-full py-3 rounded-full font-bold text-xs text-center transition-all shadow-md cursor-pointer sm:hidden"
                  :class="isDark ? 'bg-white text-black hover:bg-[#009966] hover:text-white' : 'bg-slate-900 text-white hover:bg-[#009966] hover:text-white'"
                  id="mobile-cta-button"
                  :href="headerData.ctaLink"
                  @click="handleNavClick(headerData.ctaLink, $event)"
               >
                  {{ headerData.ctaText }}
               </a>
            </div>
         </transition>

      </div>
   </header>
</template>