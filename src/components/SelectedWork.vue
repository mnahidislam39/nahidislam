<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { selectedWorkData } from '../data';

const router = useRouter();
const workData = selectedWorkData;

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
</script>

<template>
  <section 
    ref="sectionRef" 
    :id="workData.id"
    class="selected-work-section bg-[#fbf9f4] dark:bg-[#0f0d0b] py-18 px-4 sm:px-6 lg:px-8 text-slate-900 dark:text-slate-300 relative transition-colors duration-300"
  >
    <div 
      id="selected-work-max-width-container" 
      :class="['selected-work-container max-w-[1440px] mx-auto relative z-10 scroll-zoom-container', { 'start-zoom': isVisible }]"
    >
      <!-- Header Section -->
      <div id="selected-work-header-grid" class="selected-work-header-grid grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12 scroll-card-item">
        <div id="selected-work-left-col" class="selected-work-header-col lg:col-span-4 flex flex-col justify-center md:justify-between">
          <div id="selected-work-title-content-wrapper" class="selected-work-title-wrapper text-center md:text-left">
            <div id="selected-work-tag-wrapper" class="selected-work-tag-group text-center md:text-left flex flex-col items-center md:items-start mb-6">
              <span id="selected-work-section-number" class="selected-work-section-badge text-xs font-bold tracking-[0.2em] text-emerald-600 dark:text-emerald-400 uppercase mb-3">
                {{ workData.sectionNumber }}
              </span>
              <div id="selected-work-line-indicator" class="selected-work-underline relative flex items-center justify-start w-36">
                <div id="selected-work-line-gradient" class="selected-work-underline-line absolute w-full h-[1.5px] bg-gradient-to-r from-emerald-600/40 dark:from-emerald-400/40 to-transparent"></div>
                <span id="selected-work-line-dot" class="selected-work-underline-dot w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 relative z-10"></span>
              </div>
            </div>

            <h2 id="selected-work-headline" class="selected-work-main-title text-4xl sm:text-6xl font-black tracking-tight mb-6 leading-tight text-slate-900 dark:text-white">
              SELECTED <span id="selected-work-headline-highlight" class="selected-work-title-accent text-emerald-600 dark:text-emerald-400">SHOPIFY</span> WORK
            </h2>

            <p id="selected-work-description" class="selected-work-intro-text text-slate-600 dark:text-slate-300 text-base sm:text-lg mb-8 font-normal leading-relaxed">
              {{ workData.description }}
            </p>
          </div>

          <div id="selected-work-main-btn-wrapper" class="selected-work-btn-wrapper text-center md:text-left">
            <a 
              :href="workData.mainButtonLink || '#all-projects'" 
              id="selected-work-main-btn"
              class="selected-work-main-button inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-slate-200 dark:border-[#26201a] hover:border-emerald-600 dark:hover:border-emerald-400 text-slate-900 dark:text-white hover:text-emerald-700 dark:hover:text-emerald-400 font-bold text-sm transition-all duration-300 group shadow-sm bg-white dark:bg-[#16120e]"
            >
              <span id="selected-work-main-btn-text" class="selected-work-btn-label">{{ workData.mainButtonText || 'VIEW ALL PROJECTS' }}</span>
              <span id="selected-work-main-btn-arrow" class="selected-work-btn-arrow transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

        <!-- Featured Project Card -->
        <div 
          id="selected-work-featured-card"
          class="selected-work-featured-card lg:col-span-8 bg-white dark:bg-[#16120e] overflow-hidden rounded-[2.5rem] flex flex-col-reverse lg:flex-row gap-8 items-center border border-slate-200/90 dark:border-[#26201a]"
        >
          <div id="selected-work-featured-info-col" class="selected-work-featured-details w-full lg:w-1/2 p-6 flex flex-col justify-between">
            <div id="selected-work-featured-inner-wrapper" class="selected-work-featured-content">
              <div 
                id="selected-work-featured-badge-wrapper"
                class="selected-work-featured-tag inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-400 text-[11px] font-extrabold tracking-wider mb-4"
              >
                <span id="selected-work-featured-badge-dot" class="selected-work-featured-dot w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400"></span>
                {{ workData.featuredProject.badge || 'FEATURED PROJECT' }}
              </div>

              <h3 id="selected-work-featured-title" class="selected-work-featured-heading text-3xl font-black text-slate-900 dark:text-white mb-3">
                {{ workData.featuredProject.title }}
              </h3>

              <p id="selected-work-featured-desc" class="selected-work-featured-paragraph text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                {{ workData.featuredProject.description }}
              </p>

              <div id="selected-work-featured-tags" class="selected-work-featured-tag-list flex flex-wrap gap-2 mb-6">
                <span 
                  v-for="(tag, tIdx) in workData.featuredProject.tags" 
                  :key="tIdx"
                  class="selected-work-featured-tag-item px-3 py-1 rounded-lg bg-slate-100 dark:bg-[#1c1713] border border-slate-200 dark:border-[#2d2620] text-slate-700 dark:text-slate-300 text-xs font-bold"
                >
                  {{ tag }}
                </span>
              </div>

              <div id="selected-work-metrics-row" class="selected-work-metrics-grid grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-t border-b border-slate-100 dark:border-[#26201a] mb-6">
                <div class="selected-work-metric-item">
                  <div class="selected-work-metric-value text-emerald-700 dark:text-emerald-400 font-black text-base sm:text-lg">+62%</div>
                  <div class="selected-work-metric-label text-[10px] text-slate-900 dark:text-slate-300 font-medium">Conversion Rate</div>
                </div>
                <div class="selected-work-metric-item">
                  <div class="selected-work-metric-value text-emerald-700 dark:text-emerald-400 font-black text-base sm:text-lg">+48%</div>
                  <div class="selected-work-metric-label text-[10px] text-slate-900 dark:text-slate-300 font-medium">AOV Increase</div>
                </div>
                <div class="selected-work-metric-item">
                  <div class="selected-work-metric-value text-emerald-700 dark:text-emerald-400 font-black text-base sm:text-lg">-35%</div>
                  <div class="selected-work-metric-label text-[10px] text-slate-900 dark:text-slate-300 font-medium">Load Time</div>
                </div>
                <div class="selected-work-metric-item">
                  <div class="selected-work-metric-value text-emerald-700 dark:text-emerald-400 font-black text-base sm:text-lg">+70%</div>
                  <div class="selected-work-metric-label text-[10px] text-slate-900 dark:text-slate-300 font-medium">Mobile Sales</div>
                </div>
              </div>
            </div>

            <div id="selected-work-featured-btn-wrapper" class="selected-work-featured-action">
              <button 
                @click="viewProjectDetails(workData.featuredProject)"
                id="selected-work-featured-btn"
                class="selected-work-featured-link inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors group cursor-pointer"
              >
                <span>{{ workData.featuredProject.caseStudyText || 'VIEW CASE STUDY' }}</span>
                <span class="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>

          <div id="selected-work-featured-image-col" class="selected-work-featured-media w-full lg:w-1/2 h-full overflow-hidden bg-slate-100 dark:bg-[#1c1713]">
            <div class="selected-work-featured-img-frame w-full h-full bg-slate-100 dark:bg-[#16120e] flex items-center justify-center overflow-hidden rounded-tr-lg rounded-br-lg">
              <img :src="workData.featuredProject.image" :alt="workData.featuredProject.title" class="selected-work-featured-img w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      <!-- Projects Grid -->

      <div id="selected-work-projects-grid" class="projects-stack-container selected-work-projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 items-start scroll-card-item">
        <template v-for="(project, pIdx) in workData.projects" :key="project.id || pIdx">
          <div 
            :id="'selected-work-project-card-' + pIdx" 
            :style="{ top: `${80 + (pIdx * 20)}px`, zIndex: pIdx + 1 }"
            class="framer-sticky-card selected-work-card sticky lg:static bg-white dark:bg-[#16120e] border border-slate-200/90 dark:border-[#26201a] rounded-[2.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col justify-between transition-all duration-300 hover:border-slate-300 dark:hover:border-[#382f25]"
          >
            <div class="selected-work-card-top flex flex-col">
              <!-- Image Header -->
              <div class="selected-work-card-media-wrapper w-full h-72 rounded-2xl rounded-br-none rounded-bl-none overflow-hidden border-none">
                <div class="selected-work-card-media-frame w-full h-full bg-slate-100 dark:bg-[#16120e] flex items-center justify-center overflow-hidden rounded-2xl rounded-bl-none rounded-br-none border border-slate-200/40 dark:border-[#2d2620] shadow-sm">
                  <img :src="project.image" :alt="project.title" class="selected-work-card-image w-full h-full object-cover" />
                </div>
              </div>

              <!-- Content Body -->
              <div class="selected-work-card-body p-6 flex flex-col gap-5">
                
                <!-- Title & Category Header -->
                <div class="selected-work-card-header">
                  <div class="selected-work-card-title-row flex items-center justify-between mb-2">
                    <h3 class="selected-work-card-title text-2xl font-black text-slate-900 dark:text-white">{{ project.title }}</h3>
                    <span class="selected-work-card-category text-[11px] text-slate-600 dark:text-slate-300 font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-[#1c1713] border border-slate-200 dark:border-[#2d2620]">
                      {{ project.category || 'Store' }}
                    </span>
                  </div>

                  <p class="selected-work-card-description text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-2">
                    {{ project.description }}
                  </p>
                </div>

                <!-- Highlight Box: Speed & Metric (Dynamic from Data) -->
                <div class="selected-work-card-highlights grid grid-cols-2 gap-3 p-3.5 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200/80 dark:border-emerald-900/50">
                  <div class="flex flex-col">
                    <span class="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">SPEED SCORE</span>
                    <span class="text-xs sm:text-sm font-black text-emerald-700 dark:text-emerald-400">
                      {{ project.result || '30% ➔ 90% Increase' }}
                    </span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">RESULT</span>
                    <span class="text-xs sm:text-sm font-black text-emerald-700 dark:text-emerald-400">
                      {{ project.conversionResult || '+55% Growth' }}
                    </span>
                  </div>
                </div>

                <!-- Challenge & Solution Text Block -->
                <div class="selected-work-card-case-meta space-y-2 text-xs">
                  <div class="selected-work-meta-row flex items-start gap-2">
                    <span class="selected-work-meta-label font-black text-emerald-700 dark:text-emerald-400 shrink-0 uppercase w-20">CHALLENGE</span>
                    <span class="selected-work-meta-value text-slate-700 dark:text-slate-300 line-clamp-1">{{ project.challenge }}</span>
                  </div>
                  <div class="selected-work-meta-row flex items-start gap-2">
                    <span class="selected-work-meta-label font-black text-emerald-700 dark:text-emerald-400 shrink-0 uppercase w-20">SOLUTION</span>
                    <span class="selected-work-meta-value text-slate-700 dark:text-slate-300 line-clamp-1">{{ project.solution }}</span>
                  </div>
                </div>

                <!-- Tags List -->
                <div class="selected-work-card-tags flex flex-wrap gap-1.5 pt-1">
                  <span 
                    v-for="(tag, tgIdx) in project.tags.slice(0, 4)" 
                    :key="tgIdx"
                    class="selected-work-card-tag-item px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#1c1713] border border-slate-200 dark:border-[#2d2620] text-slate-700 dark:text-slate-300 text-[11px] font-bold"
                  >
                    {{ tag }}
                  </span>
                </div>

              </div>
            </div>

            <!-- Card Bottom Action -->
            <div class="selected-work-card-footer p-6 border-t border-slate-100 dark:border-[#26201a]">
              <button 
                @click="viewProjectDetails(project)"
                class="selected-work-card-action inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors group cursor-pointer"
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
        class="selected-work-cta-banner bg-white dark:bg-[#16120e] border border-slate-200/90 dark:border-[#26201a] rounded-[2.5rem] p-8 sm:p-12 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col lg:flex-row items-center justify-between gap-8 scroll-card-item"
      >
        <div class="selected-work-cta-info flex items-center md:flex-row text-center md:text-left gap-6">
          <div class="selected-work-cta-icon-box w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/50 flex items-center justify-center shrink-0 text-emerald-700 dark:text-emerald-400">
            <svg class="selected-work-cta-svg w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <div class="selected-work-cta-text">
            <h3 class="selected-work-cta-title text-2xl font-black text-slate-900 dark:text-white mb-1">
              {{ workData.ctaBox?.title }}
            </h3>
            <p class="selected-work-cta-desc text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">
              {{ workData.ctaBox?.description }}
            </p>
          </div>
        </div>

        <div class="selected-work-cta-action">
          <a 
            :href="workData.ctaBox?.buttonLink" 
            class="selected-work-cta-btn inline-flex items-center gap-3 px-8 py-4 rounded-full bg-emerald-800 dark:bg-emerald-600 hover:bg-emerald-900 dark:hover:bg-emerald-500 text-white font-bold text-sm transition-all duration-300 shadow-md"
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