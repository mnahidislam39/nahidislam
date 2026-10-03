<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';

// data.js import
import { featuredWorkData, selectedWorkData } from '../data';

const route = useRoute();
const router = useRouter();

const projectId = computed(() => route.params.id);
const fromSection = computed(() => route.query.from);

// Zoom and Canvas Frame Controls
const activeImageIndex = ref(0);
const zoomLevel = ref(1);
const isFitToView = ref(false);

const zoomIn = () => {
  isFitToView.value = false;
  if (zoomLevel.value < 2.5) {
    zoomLevel.value = parseFloat((zoomLevel.value + 0.25).toFixed(2));
  }
};

const zoomOut = () => {
  if (zoomLevel.value > 1) {
    zoomLevel.value = parseFloat((zoomLevel.value - 0.25).toFixed(2));
  } else {
    isFitToView.value = true;
  }
};

const fitToScreen = () => {
  isFitToView.value = true;
  zoomLevel.value = 1;
};

const resetZoom = () => {
  isFitToView.value = false;
  zoomLevel.value = 1;
};

watch(activeImageIndex, () => resetZoom());

// Dynamic Data Fetcher (Looks into featuredWorkData and selectedWorkData dynamically)
const projectData = computed(() => {
  const targetId = String(projectId.value);

  if (fromSection.value === 'selectedWork' || fromSection.value === 'selected-work') {
    const found = findInSelectedWork(targetId);
    if (found) return found;
  }

  if (fromSection.value === 'featuredWork' || fromSection.value === 'featured-projects') {
    const found = findInFeaturedProjects(targetId);
    if (found) return found;
  }

  return findInFeaturedProjects(targetId) || findInSelectedWork(targetId);
});

function findInFeaturedProjects(targetId) {
  return featuredWorkData?.projects?.find(p => String(p.id) === targetId) || null;
}

function findInSelectedWork(targetId) {
  if (selectedWorkData?.featuredProject && String(selectedWorkData.featuredProject.id) === targetId) {
    return selectedWorkData.featuredProject;
  }
  return selectedWorkData?.projects?.find(p => String(p.id) === targetId) || null;
}

// Vite Dynamic Image Resolver
const getImageUrl = (imagePath) => {
  if (!imagePath || typeof imagePath !== 'string') return '';
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
  const cleanPath = imagePath.replace(/^[\.\/]+/, '');
  return new URL(`../assets/${cleanPath}`, import.meta.url).href;
};

// Dynamic Images Normalizer
const projectImages = computed(() => {
  if (!projectData.value) return [];
  if (Array.isArray(projectData.value.images) && projectData.value.images.length > 0) {
    return projectData.value.images.filter(Boolean);
  }
  if (projectData.value.image) return [projectData.value.image];
  if (projectData.value.img) return [projectData.value.img];
  return [];
});

const goBack = () => {
  const backTarget = fromSection.value || 'featuredWork';
  router.push({ path: '/', hash: `#${backTarget}` });
};
</script>

<template>
  <div
    class="project-details-page min-h-screen pt-30 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#0f0d0b] text-slate-800 dark:text-slate-300 transition-colors duration-300 selection:bg-emerald-500 selection:text-white">
    <div class="project-details-container max-w-[1440px] mx-auto">

      <!-- Navigation & Dynamic Header CTAs -->
      <div class="project-details-header flex items-center justify-between mb-8">
        <button @click="goBack"
          class="project-details-back-btn inline-flex items-center gap-2 font-bold text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-all cursor-pointer bg-transparent border-0 p-0">
          <Icon icon="lucide:arrow-left" class="project-details-back-icon w-4 h-4" />
          <span class="project-details-back-text">Back to Portfolio</span>
        </button>

        <a v-if="projectData?.liveUrl" :href="projectData.liveUrl" target="_blank" rel="noopener noreferrer"
          class="project-details-live-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-950/20">
          <span class="project-details-live-btn-text">{{ projectData.liveBtnText || 'Live Store Preview' }}</span>
          <Icon icon="lucide:external-link" class="project-details-live-btn-icon w-3.5 h-3.5" />
        </a>
      </div>

      <!-- Main Content -->
      <div v-if="projectData" class="project-details-content">

        <div class="project-details-hero grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">

          <!-- Left Details Section -->
          <div class="project-details-info-col lg:col-span-5 flex flex-col justify-between">
            <div class="project-details-info-wrapper">
              <span
                class="project-details-category-badge inline-block px-3 py-1 rounded-full text-xs font-extrabold tracking-widest uppercase border bg-emerald-100 border-emerald-300 text-emerald-800 dark:bg-emerald-950/60 dark:border-emerald-800/50 dark:text-emerald-400">
                {{ projectData.techBadge || projectData.category || 'PROJECT CASE STUDY' }}
              </span>

              <h1
                class="project-details-title text-4xl sm:text-6xl font-black tracking-tight mb-4 text-slate-900 dark:text-white">
                {{ projectData.title }}
              </h1>

              <p
                class="project-details-description text-base sm:text-lg mb-8 leading-relaxed text-slate-600 dark:text-slate-300">
                {{ projectData.description }}
              </p>

              <!-- Fully Dynamic Case Study Grid (Challenge / Solution / Result) -->
              <div v-if="projectData.challenge || projectData.solution || projectData.result"
                class="project-details-case-study-grid grid grid-cols-1 gap-6 ">
                <!-- Challenge Box -->
                <div v-if="projectData.challenge"
                  class="project-details-case-box project-details-challenge-box border rounded-3xl p-6 bg-white border-slate-200 dark:bg-[#16120e] dark:border-[#26201a] shadow-sm">
                  <h3
                    class="project-details-case-title text-xs font-black tracking-widest text-rose-500 uppercase mb-4 flex items-center gap-2">
                    <span class="project-details-case-dot w-2 h-2 rounded-full bg-rose-500"></span>
                    {{ projectData.challengeTitle || 'THE CHALLENGE' }}
                  </h3>
                  <p class="project-details-case-desc text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {{ projectData.challenge }}
                  </p>
                </div>

                <!-- Solution Box -->
                <div v-if="projectData.solution"
                  class="project-details-case-box project-details-solution-box border rounded-3xl p-6 bg-white border-slate-200 dark:bg-[#16120e] dark:border-[#26201a] shadow-sm">
                  <h3
                    class="project-details-case-title text-xs font-black tracking-widest text-sky-500 uppercase mb-4 flex items-center gap-2">
                    <span class="project-details-case-dot w-2 h-2 rounded-full bg-sky-500"></span>
                    {{ projectData.solutionTitle || 'THE SOLUTION' }}
                  </h3>
                  <p class="project-details-case-desc text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {{ projectData.solution }}
                  </p>
                </div>

                <!-- Result Box (Auto Full-Width for 3rd Item in 2-Col Grid) -->
                <div v-if="projectData.result" :class="[
                  'project-details-case-box project-details-result-box border rounded-3xl p-6 bg-white border-slate-200 dark:bg-[#16120e] dark:border-[#26201a] shadow-sm',
                  projectData.challenge && projectData.solution ? 'md:col-span-1' : ''
                ]">
                  <h3
                    class="project-details-case-title text-xs font-black tracking-widest text-emerald-500 uppercase mb-4 flex items-center gap-2">
                    <span class="project-details-case-dot w-2 h-2 rounded-full bg-emerald-500"></span>
                    {{ projectData.resultTitle || 'THE RESULT' }}
                  </h3>
                  <p
                    class="project-details-case-desc text-sm font-bold leading-relaxed text-slate-700 dark:text-slate-300">
                    {{ projectData.result }}
                  </p>
                </div>
              </div>


              <!-- Dynamic Meta Info -->
              <div
                class="project-details-meta-grid grid grid-cols-2 gap-6 py-6 border-t border-b border-slate-200 dark:border-[#26201a] mb-8">
                <div v-if="projectData.category" class="project-details-meta-item">
                  <div
                    class="project-details-meta-label text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Category</div>
                  <div class="project-details-meta-value text-sm font-bold text-slate-900 dark:text-slate-200">{{
                    projectData.category }}</div>
                </div>
                <div v-if="projectData.techBadge" class="project-details-meta-item">
                  <div
                    class="project-details-meta-label text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Platform</div>
                  <div class="project-details-meta-value text-sm font-bold text-slate-900 dark:text-slate-200">{{
                    projectData.techBadge }}</div>
                </div>
                <div v-if="projectData.duration" class="project-details-meta-item">
                  <div
                    class="project-details-meta-label text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Duration</div>
                  <div class="project-details-meta-value text-sm font-bold text-slate-900 dark:text-slate-200">{{
                    projectData.duration }}</div>
                </div>
                <div v-if="projectData.role" class="project-details-meta-item">
                  <div
                    class="project-details-meta-label text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Role</div>
                  <div class="project-details-meta-value text-sm font-bold text-slate-900 dark:text-slate-200">{{
                    projectData.role }}</div>
                </div>
              </div>

              <!-- Dynamic Inline CTA Box -->
              <div v-if="projectData.ctaBox"
                class="project-details-cta-card p-6 rounded-2xl border bg-white border-slate-200 shadow-sm dark:bg-[#16120e] dark:border-[#26201a] mb-8">
                <h4 class="project-details-cta-card-title font-bold text-base mb-2 text-slate-900 dark:text-white">
                  {{ projectData.ctaBox.title }}
                </h4>
                <p class="project-details-cta-card-subtitle text-xs mb-4 text-slate-600 dark:text-slate-400">
                  {{ projectData.ctaBox.subtitle }}
                </p>
                <router-link :to="projectData.ctaBox.buttonLink || '/#contact'"
                  class="project-details-cta-card-btn inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all w-full justify-center shadow-lg shadow-emerald-950/20">
                  <span class="project-details-cta-card-btn-text">{{ projectData.ctaBox.buttonText }}</span>
                  <Icon icon="lucide:arrow-right" class="project-details-cta-card-btn-icon w-4 h-4" />
                </router-link>
              </div>
            </div>
          </div>

          <!-- Right Preview Container Frame -->
          <div
            class="project-details-preview-col lg:col-span-7 border rounded-[2.5rem] p-4 sm:p-6 shadow-2xl relative bg-white border-slate-200 dark:bg-[#16120e] dark:border-[#26201a]">

            <div v-if="projectImages.length > 0"
              class="project-details-controls-bar flex items-center justify-between mb-3 px-2">
              <span class="project-details-view-mode text-xs font-bold text-slate-500 dark:text-slate-400">
                Mode:
                <span class="project-details-view-mode-value text-emerald-500 font-extrabold">
                  {{ isFitToView ? 'Full Page View (Fit)' : `${Math.round(zoomLevel * 100)}% (Scroll)` }}
                </span>
              </span>
              <div
                class="project-details-zoom-actions flex items-center gap-1.5 p-1.5 rounded-xl border bg-slate-100 border-slate-200 dark:bg-[#1c1713] dark:border-[#26201a]">
                <button @click="fitToScreen"
                  :class="['project-details-control-btn project-details-btn-fit px-2.5 py-1 text-xs font-bold rounded-lg transition-all', isFitToView ? 'bg-emerald-600 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#26201a]']">
                  Full Page
                </button>
                <button @click="resetZoom"
                  class="project-details-control-btn project-details-btn-reset px-2 py-1 text-xs font-bold rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#26201a] transition-all">
                  100%
                </button>
                <button @click="zoomOut"
                  class="project-details-control-btn project-details-btn-zoom-out p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#26201a] transition-all">
                  <Icon icon="lucide:zoom-out" class="project-details-zoom-icon w-4 h-4" />
                </button>
                <button @click="zoomIn"
                  class="project-details-control-btn project-details-btn-zoom-in p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#26201a] transition-all">
                  <Icon icon="lucide:zoom-in" class="project-details-zoom-icon w-4 h-4" />
                </button>
              </div>
            </div>

            <!-- Dynamic Image Frame -->
            <div :class="[
              'project-details-frame rounded-2xl border h-[580px] relative mb-4 custom-scrollbar transition-all duration-300 bg-slate-100 border-slate-200 dark:bg-[#1c1713] dark:border-[#26201a]',
              isFitToView ? 'flex items-center justify-center p-2 overflow-hidden' : 'overflow-auto'
            ]">
              <template v-if="projectImages.length > 0">
                <img v-if="isFitToView" :src="getImageUrl(projectImages[activeImageIndex])" :alt="projectData.title"
                  class="project-details-fit-image max-w-full max-h-full object-contain block rounded-lg shadow-lg" />

                <div v-else
                  class="project-details-scroll-wrapper w-full flex justify-center origin-top transition-transform duration-200">
                  <img :src="getImageUrl(projectImages[activeImageIndex])" :alt="projectData.title"
                    :style="{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }"
                    class="project-details-scroll-image w-full h-auto block transition-transform duration-200" />
                </div>
              </template>

              <div v-else
                class="project-details-empty-preview text-slate-400 text-sm flex items-center justify-center h-full p-20">
                No Preview Image Available
              </div>
            </div>

            <!-- Image Thumbnails -->
            <div v-if="projectImages.length > 1"
              class="project-details-thumbnails-list flex gap-3 overflow-x-auto pb-2">
              <button v-for="(img, idx) in projectImages" :key="idx" @click="activeImageIndex = idx" :class="[
                'project-details-thumbnail-btn relative w-20 h-14 rounded-lg overflow-hidden border-2 cursor-pointer flex-shrink-0 transition-all',
                activeImageIndex === idx
                  ? 'border-emerald-500 opacity-100 scale-105'
                  : 'border-slate-200 dark:border-[#26201a] opacity-70 hover:opacity-100'
              ]">
                <img :src="getImageUrl(img)" class="project-details-thumbnail-img w-full h-full object-cover" />
              </button>
            </div>

            <!-- Fully Dynamic Features Deliverables & Tags Stack -->
            <div class="project-details-tech-features-grid grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
              <div v-if="projectData.features && projectData.features.length"
                :class="[projectData.tags && projectData.tags.length ? 'lg:col-span-12' : 'lg:col-span-12', 'project-details-features-box ']">
                <h3 class="project-details-section-heading text-xl font-black mb-6 text-slate-900 dark:text-white">
                  {{ projectData.featuresHeading || 'KEY DELIVERABLES & ACHIEVEMENTS' }}
                </h3>
                <div class="project-details-features-list grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div v-for="(feat, fIdx) in projectData.features" :key="fIdx"
                    class="project-details-feature-item flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <Icon icon="lucide:check-circle-2"
                      class="project-details-feature-icon w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span class="project-details-feature-label">{{ typeof feat === 'object' ? feat.label : feat
                    }}</span>
                  </div>
                </div>
              </div>

              <div v-if="projectData.tags && projectData.tags.length"
                :class="[projectData.features && projectData.features.length ? 'lg:col-span-12' : 'lg:col-span-12', 'project-details-tags-box']">
                <h3 class="project-details-section-heading text-xl font-black mb-6 text-slate-900 dark:text-white">
                  {{ projectData.tagsHeading || 'TECHNOLOGIES USED' }}
                </h3>
                <div class="project-details-tags-list flex flex-wrap gap-3">
                  <span v-for="(tag, tIdx) in projectData.tags" :key="tIdx"
                    class="project-details-tag-item px-4 py-2 rounded-2xl border text-xs font-bold bg-slate-100 border-slate-200 text-slate-700 dark:bg-[#1c1713] dark:border-[#2d2620] dark:text-slate-300">
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>





        <!-- Fully Dynamic Bottom Banner -->
        <div v-if="projectData.bottomBanner"
          class="project-details-bottom-banner rounded-3xl border p-8 sm:p-12 text-center transition-all bg-gradient-to-r from-emerald-50 via-white to-emerald-50 border-emerald-200 shadow-sm dark:from-emerald-950/40 dark:via-[#16120e] dark:to-emerald-950/40 dark:border-emerald-900/40">
          <h2 class="project-details-banner-title text-2xl sm:text-4xl font-black mb-4 text-slate-900 dark:text-white">
            {{ projectData.bottomBanner.title }}
          </h2>
          <p
            class="project-details-banner-subtitle text-sm sm:text-base max-w-2xl mx-auto mb-8 text-slate-600 dark:text-slate-300">
            {{ projectData.bottomBanner.subtitle }}
          </p>
          <router-link :to="projectData.bottomBanner.buttonLink || '/#contact'"
            class="project-details-banner-btn inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm uppercase tracking-wider transition-all shadow-xl shadow-emerald-950/20">
            <span class="project-details-banner-btn-text">{{ projectData.bottomBanner.buttonText }}</span>
            <Icon icon="lucide:message-square" class="project-details-banner-btn-icon w-4 h-4" />
          </router-link>
        </div>

      </div>

      <!-- Fallback empty state -->
      <div v-else class="project-details-not-found text-center py-32">
        <h2 class="project-details-not-found-title text-3xl font-black mb-4 text-slate-900 dark:text-white">Project Not
          Found
        </h2>
        <p class="project-details-not-found-desc mb-8 text-slate-600 dark:text-slate-400">The project you are looking
          for does
          not exist or was removed.</p>
        <router-link to="/"
          class="project-details-not-found-btn inline-block px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all">
          Back to Home
        </router-link>
      </div>

    </div>
  </div>
</template>