<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'; // ref, onMounted, onUnmounted যোগ করা হলো
import { heroData } from '../data/heroData';
import { clientReviewData } from '../data/clientReviewData';
import { Icon } from '@iconify/vue';
import { useScrollReveal } from '../composables/useScrollReveal';

// Safe Data Fallbacks
const hero = heroData || {};

// clientReviewData.reviews অ্যারেটিকে নেওয়া হচ্ছে
const testimonialsData = Array.isArray(clientReviewData?.reviews) ? clientReviewData.reviews : [];

// ১. মোট রিভিউ সংখ্যা
const totalReviewsCount = computed(() => {
  return testimonialsData.length;
});

// ২. এভারেজ রেটিং ক্যালকুলেশন (যেমন: (4.9 OF 5))
const averageRatingText = computed(() => {
  if (!testimonialsData.length) return '(5.0 OF 5)';

  const totalRating = testimonialsData.reduce((sum, item) => sum + (Number(item?.rating) || 5), 0);
  const avg = (totalRating / testimonialsData.length).toFixed(1);
  return `(${avg} OF 5)`;
});

// ৩. প্রথম ৪ জন রিভিউয়ারের ছবি
const reviewerAvatars = computed(() => {
  return testimonialsData.slice(0, 4).map(item => ({
    name: item?.name || 'Client',
    image: item?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop'
  }));
});

const { elementRef: leftContentRef, isVisible: leftIsVisible } = useScrollReveal();
const { elementRef: rightColRef, isVisible: rightIsVisible } = useScrollReveal();

// dynamic titles array: heroData এর dynamicTitle কে | দিয়ে split করে নেয়া হচ্ছে (অথবা কাস্টম লিস্ট ব্যবহার করতে পারেন)
const titles = hero.dyanmicTitle 
  ? hero.dyanmicTitle.split('|').map(t => t.trim()) 
  : [ 'Shopify Expert', 'Wordpress Developer', 'Full Stack Developer' ];

const currentTitle = ref('');
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout = null;

const typeEffect = () => {
  const currentFullText = titles[titleIndex];

  if (isDeleting) {
    currentTitle.value = currentFullText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    currentTitle.value = currentFullText.substring(0, charIndex + 1);
    charIndex++;
  }

  let typingSpeed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === currentFullText.length) {
    typingSpeed = 2000; // ২ সেকেন্ড পজ থাকবে
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
    typingSpeed = 500;
  }

  typingTimeout = setTimeout(typeEffect, typingSpeed);
};

onMounted(() => {
  typeEffect();
});

onUnmounted(() => {
  if (typingTimeout) clearTimeout(typingTimeout);
});
</script>

<template>
  <section id="home"
    class="hero-section relative bg-transparent text-slate-900 dark:text-white pt-32 md:pt-40 pb-0 md:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden flex flex-col justify-between transition-colors duration-300">
    <div
      class="hero-bg-pattern absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]">
    </div>

    <div class="hero-container flex flex-col max-w-[1400px] mx-auto w-full relative z-10 my-0">

      <div
        class="hero-grid grid grid-cols-1 lg:grid-cols-12 items-center gap-12 relative w-full text-center md:text-left">

        <div ref="leftContentRef"
          class="hero-left-content lg:col-span-6 flex flex-col items-center md:items-start gap-8 z-20 transition-all duration-1000 ease-out"
          :class="leftIsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'">

          <div class="hero-top-wrapper relative flex justify-center items-center">
            <div
              class="hero-badge-box inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white dark:bg-[#0f1715] border border-slate-200 dark:border-emerald-900/60 shadow-sm text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-300 transition-colors duration-300">
              <span
                class="hero-badge-icon w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs animate-pulse">🛡️</span>
              <span class="hero-badge-text uppercase">{{ hero.badge }}</span>
            </div>
          </div>

          <div class="hero-main-title-box text-center md:text-left">
            <h1
              class="hero-main-title flex flex-col text-2xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-emerald-500 leading-[1.1] transition-colors duration-300">
              <!-- {{ hero.titlePrefix }} -->
               <span
                class="hero-highlight-name text-emerald-600 text-5xl md:text-7xl dark:text-emerald-400">{{
                  hero.highlightName }}</span>
            </h1>
            <h2
              class="hero-dynamic-title h-7 text-lg sm:text-xl md:text-2xl font-semibold text-emerald-700 dark:text-emerald-500 animate-pulse py-8 transition-colors duration-300 flex items-center justify-center sm:justify-start gap-1">
              <!-- Dynamic Typing Text -->
              <span>{{ currentTitle }}</span>

              <!-- Blinking Cursor -->
              <span class="inline-block w-[2px] h-6 bg-emerald-600 dark:bg-emerald-400 animate-pulse"></span>
            </h2>
            <p
              class="hero-subtitle max-w-[600px] text-slate-600 dark:text-slate-300 font-medium text-base sm:text-lg transition-colors duration-300">
              {{ hero.subtitle }}  
              <!-- {{ hero.heroDescription }} -->
            </p>

          </div>

          <div class="hero-cta-group flex justify-center md:justify-start flex-wrap items-center gap-4 relative z-30">
           
            <a class="hero-primary-btn flex items-center gap-2.5 px-4 py-3 border border-slate-300 dark:border-emerald-900/60 rounded-full bg-emerald-600 hover:bg-transparent text-white dark:hover:text-white hover:text-black font-bold text-sm transition-all shadow-lg shadow-emerald-600/25 cursor-pointer"
              :href="hero.primaryCta?.link">
              <span>{{ hero.primaryCta?.text }}</span>
              <div
                class="hero-btn-arrow-box w-6 h-6 rounded-full bg-black/20 text-white flex items-center justify-center text-xs">
                <Icon icon="lucide:arrow-right" />
              </div>
            </a>
           
            <a class="hero-secondary-btn flex items-center gap-2.5 px-4 py-3 border border-slate-300 dark:border-emerald-900/60 rounded-full bg-transparent dark:bg-transparent text-slate-900 dark:text-white font-bold text-sm dark:hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/25 cursor-pointer w-fit hover:bg-emerald-700 hover:text-white"
              :href="hero.secondaryCta?.link">
              {{ hero.secondaryCta?.text }}
               <div
                class="hero-btn-arrow-box w-6 h-6 rounded-full bg-emerald-600/80 text-white flex items-center justify-center text-xs">
                <Icon icon="lucide:arrow-right" />
              </div>
            </a>
          </div>

          <div class="skills-wrapper relative flex flex-row items-center">
            <div
              class="skill-icon-item relative flex items-center justify-center cursor-pointer group [&:not(:first-child)]:-ml-3.5"
              v-for="(skill, sIdx) in hero.skillIcons" :key="sIdx" :title="skill.name">
              <div class="skill-ping-ring absolute inset-0 rounded-full bg-white "></div>
              <div
                class="skill-circle-box relative flex items-center justify-center w-12 h-12 transition-transform border-2 border-emerald-200 dark:border-[#fcfcfc] rounded-full shadow-lg group-hover:scale-110 group-hover:z-30 transition-colors duration-300"
                :class="[skill.style === 'amber' ? 'text-black' : 'bg-white text-slate-900 dark:text-white']">
                <Icon class="skill-svg-icon text-xl" :icon="skill.icon" />
              </div>
            </div>
          </div>

          <div
            class="flex flex-wrap items-center md:items-start justify-center md:justify-start w-full pt-6 border-t border-slate-200 dark:border-emerald-900/60 gap-6">
            <div class="review-wrapper justify-center md:justify-start flex items-center gap-4">

              <!-- Dynamic Reviewers Avatars -->
              <div class="review-avatars flex items-center -space-x-2">
                <!-- <img v-for="(reviewer, index) in reviewerAvatars" :key="index"
                  class="avatar-img w-9 h-9 rounded-full border-2 border-[#fbf9f4] dark:border-[#0b0f0e] object-cover shadow-sm transition-colors duration-300"
                  :src="reviewer.image" :alt="reviewer.name"> -->
              </div>

              <!-- Dynamic Review Content Box -->
              <div class="review-content-box text-left">
                <h4
                  class="review-count text-base font-black text-slate-900 dark:text-white transition-colors duration-300">
                  {{ totalReviewsCount }}+ REVIEWS
                  <span class="review-rating text-slate-600 dark:text-slate-300 font-semibold ml-1">
                    {{ averageRatingText }}
                  </span>
                </h4>
                <p
                  class="review-subtext text-xs text-slate-600 dark:text-slate-400 font-medium transition-colors duration-300">
                  {{ hero.reviewSubtext || 'Reviews from Valued Clients' }}
                </p>
              </div>

            </div>
          </div>

        </div>

        <div ref="rightColRef"
          class="hero-right-col lg:col-span-6 flex flex-col items-center justify-end relative min-h-[500px] pb-0 transition-all duration-1000 ease-out delay-200"
          :class="rightIsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'">

          <div class="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
            <div
              class="w-[350px] sm:w-[480px] h-[350px] sm:h-[480px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-3xl">
            </div>
            <div
              class="absolute w-[280px] sm:w-[380px] h-[280px] sm:h-[380px] rounded-full border border-emerald-500/20 animate-spin-slow">
            </div>
          </div>

          <div class="relative w-full max-w-[380px] sm:max-w-[450px] flex justify-center items-end">
            <img
              class="hero-main-image w-full max-h-[420px] md:max-h-[520px] h-full object-cover md:object-contain md:transform scale-[1.55] md:scale-[1.55] lg:scale-[1.8] object-bottom drop-shadow-2xl"
              :src="hero.image" :alt="hero.highlightName">
          </div>

          <div v-for="(badge, bIdx) in hero.floatingBadges" :key="bIdx" :class="badge.position"
            class="bg-white dark:bg-[#121a18] border border-slate-200 dark:border-emerald-900/50 px-4 py-2.5 rounded-full shadow-xl flex items-center gap-3 z-20">
            <div
              class="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center animate-pulse">
              <Icon :icon="badge.icon" class="text-base" />
            </div>
            <div>
              <p class="text-xs font-bold text-slate-900 dark:text-white uppercase">{{ badge.text }}</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes slowSpin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes floatAnim {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-8px);
  }
}

.animate-spin-slow {
  animation: slowSpin 20s linear infinite;
}

.animate-float-slow {
  animation: floatAnim 4s ease-in-out infinite;
}

.animate-float-delayed {
  animation: floatAnim 4s ease-in-out 2s infinite;
}
</style>