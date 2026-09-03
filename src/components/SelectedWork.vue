<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { selectedWorkData } from '../data';

const router = useRouter();
const workData = selectedWorkData;

const activeIndex = ref(null);
const sectionRef = ref(null);
const isVisible = ref(false);

let observer = null;

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      isVisible.value = entry.isIntersecting;
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

const viewProjectDetails = (projectOrId) => {
  let id = '';
  if (typeof projectOrId === 'object' && projectOrId !== null) {
    id = projectOrId.id || projectOrId.title?.toLowerCase().replace(/\s+/g, '-');
  } else {
    id = projectOrId;
  }

  if (!id) {
    console.error("Project ID is missing!");
    return;
  }

  router.push({ 
    path: `/project/${id}`, 
    query: { from: 'selected-work' } 
  });
};

const toggleDetails = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};
</script>

<template>
  <section 
    ref="sectionRef" 
    :id="workData.id"
    class="selected-work-section bg-[#fbf9f4] dark:bg-[#0f0d0b] py-18 px-4 sm:px-6 lg:px-8 text-slate-900 dark:text-slate-300 relative transition-colors duration-300"
  >
    <div 
      id="selected-work-max-width-container" 
      :class="['max-w-[1440px] mx-auto relative z-10 scroll-zoom-container', { 'start-zoom': isVisible }]"
    >
      <!-- Header Section -->
      <div id="selected-work-header-grid" class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12 scroll-card-item">
        <div id="selected-work-left-col" class="lg:col-span-4 flex flex-col justify-center md:justify-between">
          <div id="selected-work-title-content-wrapper" class="text-center md:text-left">
            <div id="selected-work-tag-wrapper" class="text-center md:text-left flex flex-col items-center md:items-start mb-6">
              <span id="selected-work-section-number" class="text-xs font-bold tracking-[0.2em] text-emerald-600 dark:text-emerald-400 uppercase mb-3">
                {{ workData.sectionNumber }}
              </span>
              <div id="selected-work-line-indicator" class="text-center md:text-left relative flex items-center justify-start w-36">
                <div id="selected-work-line-gradient" class="absolute w-full h-[1.5px] bg-gradient-to-r from-emerald-600/40 dark:from-emerald-400/40 to-transparent"></div>
                <span id="selected-work-line-dot" class="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 relative z-10"></span>
              </div>
            </div>

            <h2 id="selected-work-headline" class="text-4xl sm:text-6xl font-black tracking-tight mb-6 leading-tight text-slate-900 dark:text-white">
              SELECTED <span id="selected-work-headline-highlight" class="text-emerald-600 dark:text-emerald-400">SHOPIFY</span> WORK
            </h2>

            <p id="selected-work-description" class="text-slate-600 dark:text-slate-300 text-base sm:text-lg mb-8 font-normal leading-relaxed">
              {{ workData.description }}
            </p>
          </div>

          <div id="selected-work-main-btn-wrapper" class="text-center md:text-left">
            <a 
              :href="workData.mainButtonLink || '#all-projects'" 
              id="selected-work-main-btn"
              class=" inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-slate-200 dark:border-[#26201a] hover:border-emerald-600 dark:hover:border-emerald-400 text-slate-900 dark:text-white hover:text-emerald-700 dark:hover:text-emerald-400 font-bold text-sm transition-all duration-300 group shadow-sm bg-white dark:bg-[#16120e]"
            >
              <span id="selected-work-main-btn-text">{{ workData.mainButtonText || 'VIEW ALL PROJECTS' }}</span>
              <span id="selected-work-main-btn-arrow" class="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

        <!-- Featured Project Card -->
        <div 
          id="selected-work-featured-card"
          class="lg:col-span-8 bg-white dark:bg-[#16120e] overflow-hidden rounded-[2.5rem] flex flex-col-reverse lg:flex-row gap-8 items-center "
        >
          <div id="selected-work-featured-info-col" class="w-full lg:w-1/2 p-6 flex flex-col justify-between">
            <div id="selected-work-featured-inner-wrapper">
              <div 
                id="selected-work-featured-badge-wrapper"
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-400 text-[11px] font-extrabold tracking-wider mb-4"
              >
                <span id="selected-work-featured-badge-dot" class="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400"></span>
                {{ workData.featuredProject.badge || 'FEATURED PROJECT' }}
              </div>

              <h3 id="selected-work-featured-title" class="text-3xl font-black text-slate-900 dark:text-white mb-3">
                {{ workData.featuredProject.title }}
              </h3>

              <p id="selected-work-featured-desc" class="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                {{ workData.featuredProject.description }}
              </p>

              <div id="selected-work-featured-tags" class="flex flex-wrap gap-2 mb-6">
                <span 
                  v-for="(tag, tIdx) in workData.featuredProject.tags" 
                  :key="tIdx"
                  class="px-3 py-1 rounded-lg bg-slate-100 dark:bg-[#1c1713] border border-slate-200 dark:border-[#2d2620] text-slate-700 dark:text-slate-300 text-xs font-bold"
                >
                  {{ tag }}
                </span>
              </div>

              <div id="selected-work-metrics-row" class="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-t border-b border-slate-100 dark:border-[#26201a] mb-6">
                <div>
                  <div class="text-emerald-700 dark:text-emerald-400 font-black text-base sm:text-lg">+62%</div>
                  <div class="text-[10px] text-slate-300 dark:text-slate-300 font-medium">Conversion Rate</div>
                </div>
                <div>
                  <div class="text-emerald-700 dark:text-emerald-400 font-black text-base sm:text-lg">+48%</div>
                  <div class="text-[10px] text-slate-300 dark:text-slate-300 font-medium">AOV Increase</div>
                </div>
                <div>
                  <div class="text-emerald-700 dark:text-emerald-400 font-black text-base sm:text-lg">-35%</div>
                  <div class="text-[10px] text-slate-300 dark:text-slate-300 font-medium">Load Time</div>
                </div>
                <div>
                  <div class="text-emerald-700 dark:text-emerald-400 font-black text-base sm:text-lg">+70%</div>
                  <div class="text-[10px] text-slate-300 dark:text-slate-300 font-medium">Mobile Sales</div>
                </div>
              </div>
            </div>

            <div id="selected-work-featured-btn-wrapper">
              <button 
                @click="viewProjectDetails(workData.featuredProject)"
                id="selected-work-featured-btn"
                class=" inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors group cursor-pointer"
              >
                <span>{{ workData.featuredProject.caseStudyText || 'VIEW CASE STUDY' }}</span>
                <span class="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>

          <div id="selected-work-featured-image-col" class="w-full lg:w-1/2 h-full overflow-hidden bg-slate-100 dark:bg-[#1c1713]">
            <div class="w-full h-full bg-slate-100 flex items-center justify-center overflow-hidden rounded-tr-lg rounded-br-lg">
              <img :src="workData.featuredProject.imageUrl" :alt="workData.featuredProject.title" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      <!-- Projects Grid (Sticky Stack applied for Mobile) -->
      <div id="selected-work-projects-grid" class="projects-stack-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 items-start scroll-card-item">
        <template v-for="(project, pIdx) in workData.projects" :key="project.id || pIdx">
          <div 
            :id="'selected-work-project-card-' + pIdx" 
            :style="{ top: `${80 + (pIdx * 20)}px`, zIndex: pIdx + 1 }"
            class="framer-sticky-card  sticky lg:static bg-white dark:bg-[#16120e] border border-slate-200/90 dark:border-[#26201a] rounded-[2.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col justify-between transition-all duration-300 hover:border-slate-300 dark:hover:border-[#382f25]"
          >
            <div>
              <div class="w-full h-72 rounded-2xl rounded-br-none rounded-bl-none overflow-hidden border-none">
                <div class="w-full h-full bg-slate-100 flex items-center justify-center overflow-hidden rounded-2xl rounded-bl-none rounded-br-none border border-slate-200/40 shadow-sm">
                  <img :src="project.imageUrl" :alt="project.title" class="w-full h-full object-cover" />
                </div>
              </div>

              <div class="p-6 pb-2">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-2xl font-black text-slate-900 dark:text-white">{{ project.title }}</h3>
                  <span class="text-[11px] text-slate-600 dark:text-slate-300 font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-[#1c1713] border border-slate-200 dark:border-[#2d2620]">
                    {{ project.category || 'Store' }}
                  </span>
                </div>

                <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
                  {{ project.description }}
                </p>

                <button 
                  @click="toggleDetails(pIdx)"
                  :aria-expanded="activeIndex === pIdx"
                  class="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline focus:outline-none cursor-pointer mb-2"
                >
                  <span>{{ activeIndex === pIdx ? 'Hide Details' : 'Show Details' }}</span>
                  <span class="transition-transform duration-300" :class="{ 'rotate-180': activeIndex === pIdx }">▼</span>
                </button>
              </div>

              <div 
                v-show="activeIndex === pIdx"
                class="px-6 pt-2 pb-6 transition-all duration-300"
              >
                <div class="space-y-3 mb-6 rounded-2xl">
                  <div class="flex items-start gap-2 text-xs">
                    <span class="font-black text-emerald-700 dark:text-emerald-400 shrink-0 w-20">CHALLENGE</span>
                    <span class="text-slate-700 dark:text-slate-300">{{ project.challenge || 'Low conversion rate and poor product discovery.' }}</span>
                  </div>
                  <div class="flex items-start gap-2 text-xs">
                    <span class="font-black text-emerald-700 dark:text-emerald-400 shrink-0 w-20">SOLUTION</span>
                    <span class="text-slate-700 dark:text-slate-300">{{ project.solution || 'Custom sections, product bundles, and subscription app integration.' }}</span>
                  </div>
                  <div class="flex items-start gap-2 text-xs">
                    <span class="font-black text-emerald-700 dark:text-emerald-400 shrink-0 w-20">RESULT</span>
                    <span class="text-emerald-700 dark:text-emerald-400 font-bold">{{ project.result || '+55% conversion rate and +40% subscription sales.' }}</span>
                  </div>
                </div>

                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="(tag, tgIdx) in project.tags" 
                    :key="tgIdx"
                    class="px-3 py-1 rounded-lg bg-slate-100 dark:bg-[#1c1713] border border-slate-200 dark:border-[#2d2620] text-slate-700 dark:text-slate-300 text-xs font-bold"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>

            <div class="p-6 border-t border-slate-100 dark:border-[#26201a]">
              <button 
                @click="viewProjectDetails(project)"
                class=" inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors group cursor-pointer"
              >
                <span>{{ project.caseStudyText || 'VIEW CASE STUDY' }}</span>
                <span class="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>
        </template>
      </div>

      <!-- CTA Section -->
      <div 
        id="selected-work-cta-banner"
        class="bg-white dark:bg-[#16120e] border border-slate-200/90 dark:border-[#26201a] rounded-[2.5rem] p-8 sm:p-12 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col lg:flex-row items-center justify-between gap-8 scroll-card-item"
      >
        <div class="flex items-center md:flex-row text-center md:text-left gap-6">
          <div class="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/50 flex items-center justify-center shrink-0 text-emerald-700 dark:text-emerald-400">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <div>
            <h3 class="text-2xl font-black text-slate-900 dark:text-white mb-1">
              {{ workData.ctaBox?.title }}
            </h3>
            <p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">
              {{ workData.ctaBox?.description }}
            </p>
          </div>
        </div>

        <div>
          <a 
            :href="workData.ctaBox?.buttonLink" 
            class=" inline-flex items-center gap-3 px-8 py-4 rounded-full bg-emerald-800 dark:bg-emerald-600 hover:bg-emerald-900 dark:hover:bg-emerald-500 text-white font-bold text-sm transition-all duration-300 shadow-md"
          >
            <span>{{ workData.ctaBox?.buttonText }}</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.selected-work-section, 
#selected-work-max-width-container,
.projects-stack-container {
  overflow: visible !important;
}

.framer-sticky-card {
  backface-visibility: hidden;
}

@media (min-width: 1024px) {
  .projects-stack-container {
    display: grid !important;
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  }
  .framer-sticky-card {
    position: static !important;
    margin-bottom: 0 !important;
  }
}
</style>