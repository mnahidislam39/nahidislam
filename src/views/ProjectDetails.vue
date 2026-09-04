<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';

// ডাটা ফাইল ইমপোর্ট
import { featuredWorkData, selectedWorkData } from '../data';

const route = useRoute();
const router = useRouter();

const projectId = computed(() => route.params.id);
const fromSection = computed(() => route.query.from);

// সক্রিয় Image Index
const activeImageIndex = ref(0);

// Zoom Controls State
const zoomLevel = ref(1); // Default 1 (100% - Scrollable Mode)
const isFitToView = ref(false); // Fit Mode Toggle

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
    // 100%-এর নিচে জুম আউট প্রেস করলে পুরো পেজ ফিট হয়ে যাবে
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

// ইমেজ চেঞ্জ হলে জুম রিসেট হওয়া
watch(activeImageIndex, () => {
  resetZoom();
});

// ডাটা ম্যাচিং লজিক
const projectData = computed(() => {
  const targetId = String(projectId.value);

  if (fromSection.value === 'selectedWork' || fromSection.value === 'selected-work') {
    const foundInSelected = findInSelectedWork(targetId);
    if (foundInSelected) return foundInSelected;
  } 
   
  if (fromSection.value === 'featuredWork' || fromSection.value === 'featured-projects') {
    const foundInFeatured = findInFeaturedProjects(targetId);
    if (foundInFeatured) return foundInFeatured;
  }

  return findInSelectedWork(targetId) || findInFeaturedProjects(targetId);
});

function findInFeaturedProjects(targetId) {
  if (featuredWorkData?.projects) {
    const found = featuredWorkData.projects.find(p => String(p.id) === targetId);
    if (found) return found;
  }
  return null;
}

function findInSelectedWork(targetId) {
  if (selectedWorkData?.featuredProject && String(selectedWorkData.featuredProject.id) === targetId) {
    return selectedWorkData.featuredProject;
  }
  if (selectedWorkData?.projects) {
    const found = selectedWorkData.projects.find(p => String(p.id) === targetId);
    if (found) return found;
  }
  return null;
}

// Vite Dynamic Asset Loader (src/assets/ ফোল্ডারের জন্য)
const getImageUrl = (imagePath) => {
  if (!imagePath || typeof imagePath !== 'string') return '';

  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  const cleanPath = imagePath.replace(/^[\.\/]+/, '');
  return new URL(`../assets/${cleanPath}`, import.meta.url).href;
};

// Safe Image Extraction Logic
const projectImages = computed(() => {
  if (!projectData.value) return [];
  
  if (Array.isArray(projectData.value.images) && projectData.value.images.length > 0) {
    return projectData.value.images.filter(Boolean);
  }
  
  if (projectData.value.image) {
    return [projectData.value.image];
  }

  if (projectData.value.img) {
    return [projectData.value.img];
  }

  return [];
});

const goBack = () => {
  const backTarget = fromSection.value || 'featuredWork'; 
  router.push({ path: '/', hash: `#${backTarget}` });
};
</script>

<template>
  <div class="single-project bg-[#0f0d0b] min-h-screen text-slate-300 py-24 px-4 sm:px-6 lg:px-8 selection:bg-emerald-500 selection:text-white">
    <div class="single-project-container max-w-[1440px] mx-auto">

      <!-- Back Button -->
      <div class="single-project-back-wrapper mb-8">
        <button 
          @click="goBack" 
          class="single-project-back-btn inline-flex items-center gap-2 text-emerald-400 font-bold text-sm hover:underline cursor-pointer bg-transparent border-0 p-0"
        >
          <span>←</span> <span>Back to Previous Section</span>
        </button>
      </div>

      <!-- Main Project Display -->
      <div v-if="projectData" class="single-project-content">
        
        <div class="single-project-hero grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          
          <!-- Left Info Column -->
          <div class="single-project-info lg:col-span-5 flex flex-col justify-between">
            <div class="single-project-details">
              <span class="single-project-badge inline-block px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-900/50 text-emerald-400 text-xs font-extrabold tracking-widest uppercase mb-4">
                {{ projectData.badge || projectData.category || projectData.techBadge || 'FEATURED PROJECT' }}
              </span>
              <h1 class="single-project-title text-4xl sm:text-6xl font-black tracking-tight mb-4 text-white">
                {{ projectData.title }}
              </h1>
              <p class="single-project-description text-slate-300 text-base sm:text-lg mb-8 leading-relaxed">
                {{ projectData.description }}
              </p>

              <!-- Overview Meta Grid -->
              <div class="single-project-meta grid grid-cols-2 gap-6 py-6 border-t border-b border-[#26201a] mb-8">
                <div class="single-project-meta-item">
                  <div class="single-project-meta-label text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Industry</div>
                  <div class="single-project-meta-value text-sm font-bold text-slate-200">{{ projectData.category || 'eCommerce' }}</div>
                </div>
                <div class="single-project-meta-item">
                  <div class="single-project-meta-label text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Platform</div>
                  <div class="single-project-meta-value text-sm font-bold text-slate-200">{{ projectData.techBadge || 'Shopify' }}</div>
                </div>
                <div class="single-project-meta-item">
                  <div class="single-project-meta-label text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Duration</div>
                  <div class="single-project-meta-value text-sm font-bold text-slate-200">{{ projectData.duration || 'N/A' }}</div>
                </div>
                <div class="single-project-meta-item">
                  <div class="single-project-meta-label text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">My Role</div>
                  <div class="single-project-meta-value text-sm font-bold text-slate-200">Shopify Developer</div>
                </div>
              </div>
            </div>

            <!-- Case Study Button -->
            <div class="single-project-actions flex flex-wrap gap-4">
              <a 
                :href="projectData.caseStudyLink || '#'" 
                target="_blank"
                rel="noopener noreferrer"
                class="single-project-action-btn inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-900/20"
              >
                <span>{{ projectData.caseStudyText || 'View Live Project' }}</span>
                <Icon icon="lucide:external-link" class="w-4 h-4" />
              </a>
            </div>
          </div>

          <!-- Right Image Gallery Column with Zoom Controls -->
          <div class="single-project-preview-wrapper lg:col-span-7 bg-[#16120e] border border-[#26201a] rounded-[2.5rem] p-4 sm:p-6 shadow-2xl relative">
            
            <!-- Zoom Action Controls Bar -->
            <div v-if="projectImages.length > 0" class="flex items-center justify-between mb-3 px-2">
              <span class="text-xs font-bold text-slate-400">
                Mode: 
                <span class="text-emerald-400 font-extrabold">
                  {{ isFitToView ? 'Full Page View (Fit)' : `${Math.round(zoomLevel * 100)}% (Scroll)` }}
                </span>
              </span>
              <div class="flex items-center gap-1.5 bg-[#1c1713] p-1.5 rounded-xl border border-[#26201a]">
                <button 
                  @click="fitToScreen" 
                  title="Fit Full Page"
                  :class="['px-2.5 py-1 text-xs font-bold rounded-lg transition-all', isFitToView ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:text-white hover:bg-[#26201a]']"
                >
                  Full Page
                </button>
                <button 
                  @click="resetZoom" 
                  title="Reset to 100%"
                  class="px-2 py-1 text-xs font-bold text-slate-300 hover:text-emerald-400 hover:bg-[#26201a] rounded-lg transition-all"
                >
                  100%
                </button>
                <button 
                  @click="zoomOut" 
                  title="Zoom Out"
                  class="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-[#26201a] transition-all"
                >
                  <Icon icon="lucide:zoom-out" class="w-4 h-4" />
                </button>
                <button 
                  @click="zoomIn" 
                  title="Zoom In"
                  class="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-[#26201a] transition-all"
                >
                  <Icon icon="lucide:zoom-in" class="w-4 h-4" />
                </button>
              </div>
            </div>

            <!-- Image Box -->
            <div 
              :class="[
                'single-project-preview-box rounded-2xl border border-[#26201a] bg-[#1c1713] h-[550px] relative mb-4 custom-scrollbar transition-all duration-300',
                isFitToView ? 'flex items-center justify-center p-2 overflow-hidden' : 'overflow-auto'
              ]"
            >
              <template v-if="projectImages.length > 0">
                <!-- Fit Mode: পুরো পেজ একসাথে ফিট হয়ে যাবে -->
                <img 
                  v-if="isFitToView"
                  :src="getImageUrl(projectImages[activeImageIndex])" 
                  :alt="projectData.title" 
                  class="max-w-full max-h-full object-contain block rounded-lg shadow-lg" 
                />

                <!-- Scroll / Zoom Mode -->
                <div v-else class="w-full flex justify-center origin-top transition-transform duration-200">
                  <img 
                    :src="getImageUrl(projectImages[activeImageIndex])" 
                    :alt="projectData.title" 
                    :style="{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }"
                    class="single-project-img w-full h-auto block transition-transform duration-200" 
                  />
                </div>
              </template>

              <div v-else class="single-project-no-img text-slate-500 text-sm flex items-center justify-center h-full p-20">
                No Preview Image Available
              </div>
            </div>

            <!-- Image Thumbnails List -->
            <div v-if="projectImages.length > 1" class="single-project-thumbnails flex gap-3 overflow-x-auto pb-2">
              <button
                v-for="(img, idx) in projectImages"
                :key="idx"
                @click="activeImageIndex = idx"
                :class="[
                  'relative w-20 h-14 rounded-lg overflow-hidden border-2 cursor-pointer flex-shrink-0 transition-all',
                  activeImageIndex === idx ? 'border-emerald-500 opacity-100 scale-105' : 'border-[#26201a] opacity-60 hover:opacity-100'
                ]"
              >
                <img :src="getImageUrl(img)" class="w-full h-full object-cover" />
              </button>
            </div>

          </div>
        </div>

        <!-- Key Details (Challenge, Solution, Result) -->
        <div v-if="projectData.challenge || projectData.solution || projectData.result" class="single-project-overview-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div v-if="projectData.challenge" class="single-project-card single-project-challenge-card bg-[#16120e] border border-[#26201a] rounded-3xl p-6">
            <h3 class="single-project-card-title text-xs font-black tracking-widest text-rose-400 uppercase mb-4 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-rose-500"></span> THE CHALLENGE
            </h3>
            <p class="single-project-card-text text-sm text-slate-300 leading-relaxed">{{ projectData.challenge }}</p>
          </div>

          <div v-if="projectData.solution" class="single-project-card single-project-solution-card bg-[#16120e] border border-[#26201a] rounded-3xl p-6">
            <h3 class="single-project-card-title text-xs font-black tracking-widest text-sky-400 uppercase mb-4 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-sky-500"></span> THE SOLUTION
            </h3>
            <p class="single-project-card-text text-sm text-slate-300 leading-relaxed">{{ projectData.solution }}</p>
          </div>

          <div v-if="projectData.result" class="single-project-card single-project-result-card bg-[#16120e] border border-[#26201a] rounded-3xl p-6">
            <h3 class="single-project-card-title text-xs font-black tracking-widest text-emerald-400 uppercase mb-4 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span> THE RESULT
            </h3>
            <p class="single-project-card-text text-sm text-slate-300 font-bold leading-relaxed">{{ projectData.result }}</p>
          </div>
        </div>

        <!-- Tags / Features & Tools -->
        <div class="single-project-extra-grid grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div v-if="projectData.features && projectData.features.length" class="single-project-features lg:col-span-6 bg-[#16120e] border border-[#26201a] rounded-3xl p-8">
            <h3 class="single-project-section-heading text-xl font-black text-white mb-6">KEY FEATURES</h3>
            <div class="single-project-features-list grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div v-for="(feat, fIdx) in projectData.features" :key="fIdx" class="single-project-feature-item flex items-center gap-3 text-sm text-slate-300">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>{{ typeof feat === 'object' ? feat.label : feat }}</span>
              </div>
            </div>
          </div>

          <div v-if="projectData.tags && projectData.tags.length" :class="[projectData.features && projectData.features.length ? 'lg:col-span-6' : 'lg:col-span-12', 'single-project-tags bg-[#16120e] border border-[#26201a] rounded-3xl p-8']">
            <h3 class="single-project-section-heading text-xl font-black text-white mb-6">TECHNOLOGIES USED</h3>
            <div class="single-project-tags-list flex flex-wrap gap-3">
              <span v-for="(tag, tIdx) in projectData.tags" :key="tIdx" class="single-project-tag-item px-4 py-2 rounded-2xl bg-[#1c1713] border border-[#2d2620] text-slate-300 text-xs font-bold">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>

      </div>

      <!-- 404 Not Found Fallback -->
      <div v-else class="single-project-not-found text-center py-32">
        <h2 class="single-project-not-found-title text-3xl font-black mb-4 text-white">Project Not Found</h2>
        <p class="single-project-not-found-desc text-slate-400 mb-8">The project you are looking for does not exist or was removed.</p>
        <router-link to="/" class="single-project-not-found-btn inline-block px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all">
          Back to Home
        </router-link>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #120e0b;
  border-radius: 8px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #2d2620;
  border-radius: 8px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #10b981;
}
</style>