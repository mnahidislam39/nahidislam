<script setup>
import { ref, computed } from 'vue';
import { featuredProjectsData } from '../data';
import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router';
import { useScrollReveal } from '../composables/useScrollReveal';

// Swiper Vue.js components & modules
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';

// Swiper CSS styles
import 'swiper/css';
import 'swiper/css/navigation';

const router = useRouter();

// কার্ড বা "View Project" এ ক্লিকের ফাংশন
const viewProjectDetails = (id) => {
   router.push({ 
      path: `/project/${id}`, 
      query: { from: 'featuredWork' } 
   });
};

// featuredProjectsData 
const featured = featuredProjectsData; 
const modules = [Navigation, Pagination];

// Active Category State
const activeCategory = ref("All");

// Scroll Reveal Composable (Intersection Observer)
const { elementRef, isVisible } = useScrollReveal(0.15, false);

// Filtered Projects Computed Property
const filteredProjects = computed(() => {
   if (activeCategory.value === "All") {
      return featured.projects;
   }
   return featured.projects.filter(project =>
      project.category?.toLowerCase() === activeCategory.value.toLowerCase() ||
      project.techBadge?.toLowerCase() === activeCategory.value.toLowerCase()
   );
});
</script>

<template>
   <section
      ref="elementRef"
      class="relative px-4 py-18 overflow-hidden bg-[#fbf9f4] dark:bg-[#0f0d0b] featured-section sm:px-6 lg:px-8 text-slate-900 dark:text-slate-200 transition-colors duration-300"
      id="featuredWork"
   >

      <!-- Main Container with Tailwind Zoom Scale & Opacity Animation -->
      <div
         :class="[
            'max-w-[1440px] mx-auto relative z-10 featured-container-inner transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] transform',
            isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-12'
         ]"
         id="featured-container"
      >

         <!-- Top Header & Category Filter Row -->
         <div
            :class="[
               'flex flex-col justify-between gap-6 mb-16 lg:flex-row lg:items-end featured-header-wrapper items-center md:items-start text-center md:text-left transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-100 transform',
               isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            ]"
            id="featured-header"
         >

            <!-- Left Title and Description -->
            <div class="max-w-2xl featured-title-desc-wrapper">
               <div
                  class="flex flex-col md:items-start items-center mb-4 section-tag-group"
                  id="section-tag-wrapper"
               >
                  <span
                     class="text-xs font-bold tracking-[0.2em] text-emerald-600 dark:text-emerald-400 uppercase mb-3 section-number-text"
                     id="section-number-tag"
                  >{{ featured.sectionTag }}</span>
                  <div
                     class="relative flex items-center justify-start w-36 section-line-wrapper"
                     id="section-line-indicator"
                  >
                     <div class="absolute w-full h-[1.5px] bg-gradient-to-r from-emerald-600/40 to-transparent section-gradient-line"></div>
                     <span class="relative z-10 w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 section-dot-indicator"></span>
                  </div>
               </div>

               <!-- Main Heading -->
               <h2
                  class="mb-4 text-4xl font-black leading-tight tracking-tight sm:text-6xl text-slate-900 dark:text-white section-heading-text"
                  id="featured-main-heading"
                  v-html="featured.title"
               ></h2>
               
               <p
                  class="text-sm leading-relaxed text-slate-200 dark:text-slate-200 sm:text-base section-desc-text"
                  id="featured-description"
               >{{ featured.description }}</p>
            </div>

            <!-- Working Category Filters -->
            <div
               class="flex items-center gap-1.5 bg-white dark:bg-[#16120e] border border-slate-200/90 dark:border-[#26201a] p-1.5 rounded-full shadow-sm overflow-x-auto max-w-full category-filters-wrapper"
               id="category-filters"
            >
               <button v-for="(cat, cIdx) in featured.categories" :key="cIdx" @click="activeCategory = cat" :class="[
                  'px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap',
                  activeCategory === cat
                     ? 'bg-emerald-800 dark:bg-emerald-500 text-white dark:text-slate-950 shadow-md'
                     : 'text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-150 dark:hover:bg-[#1f1a15]'
               ]">
                  {{ cat }}
               </button>
            </div>

         </div>

         <!-- Projects Slider Container -->
         <div
            :class="[
               'relative px-2 mb-16 sm:px-4 slider-outer-container transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-300 transform',
               isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
            ]"
            id="projects-slider-wrapper"
         >

            <Swiper :key="activeCategory" :modules="modules" :slides-per-view="1" :space-between="24" :navigation="{
               nextEl: '.custom-next-btn',
               prevEl: '.custom-prev-btn',
            }" :breakpoints="{
               640: { slidesPerView: 1 },
               768: { slidesPerView: 2 },
               1024: { slidesPerView: 3 },
            }" class="pb-8 overflow-visible swiper-main-component">
               <SwiperSlide v-for="(project, pIdx) in filteredProjects" :key="pIdx" class="h-auto swiper-slide-item">

                  <!-- Project Card -->
                  <div
                     class=" bg-white dark:bg-[#16120e] border border-slate-200/90 dark:border-[#26201a] rounded-[2.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full hover:border-emerald-500/50 transition-all project-card-box"
                  >

                     <!-- Thumbnail Preview -->
                     <div
                        class="relative rounded-2xl overflow-hidden mb-6 bg-slate-900 dark:bg-[#1f1a15] aspect-[16/10] border border-slate-100 rounded-bl-none rounded-br-none dark:border-[#2b241d] cursor-pointer project-thumbnail-wrapper"
                        @click="viewProjectDetails(project.id)"
                     >
                        <img
                           class="object-cover object-top w-full h-full transition-transform duration-500 hover:scale-105 project-thumbnail-img"
                           :src="project.image"
                           :alt="project.title"
                        />
                     </div>

                     <div class="p-4 project-card-content-area">
                        <!-- Tech Badge -->
                        <span
                           class="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400 rounded-full text-xs font-bold mb-3 project-tech-badge"
                        >
                           <Icon :icon="project.badgeIcon || 'lucide:code'" /> {{ project.techBadge }}
                        </span>

                        <h3
                           class="mb-2 text-lg font-black transition-colors cursor-pointer text-slate-900 dark:text-white hover:text-emerald-700 dark:hover:text-emerald-400 project-title-text"
                           @click="viewProjectDetails(project.id)"
                        >{{ project.title }}</h3>
                        <p
                           class="mb-6 text-xs leading-relaxed text-slate-200 dark:text-slate-200 line-clamp-2 project-desc-text"
                        >{{ project.description }}
                        </p>
                     </div>

                     <!-- Features & Link Row -->
                     <div
                        class="flex items-center justify-between p-4 mt-auto border-t border-slate-100 dark:border-[#26201a] project-card-footer"
                     >
                        <div
                           class="flex items-center gap-3 text-xs font-bold text-slate-700 dark:text-slate-200 project-features-group"
                        >
                           <span v-for="(feat, fIdx) in project.features" :key="fIdx" class="flex items-center gap-1 project-feature-item">
                              <Icon icon="lucide:check-circle-2" class="text-sm text-emerald-700 dark:text-emerald-400" /> {{ feat.label }}
                           </span>
                        </div>
                        <!-- View Project Button -->
                        <button
                           class="flex items-center gap-1 text-xs font-bold cursor-pointer  text-emerald-800 dark:text-emerald-400 hover:text-emerald-950 dark:hover:text-emerald-300 shrink-0 project-view-btn"
                           @click="viewProjectDetails(project.id)"
                        >
                           View Project
                           <Icon icon="lucide:arrow-right" />
                        </button>
                     </div>

                  </div>

               </SwiperSlide>
            </Swiper>

            <!-- Custom Navigation Arrows -->
            <button
               class="custom-prev-btn absolute -left-5 sm:-left-6 top-[45%] -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white dark:bg-[#16120e] border border-slate-200 dark:border-[#26201a] shadow-xl text-slate-700 dark:text-slate-200 hover:bg-emerald-800 dark:hover:bg-emerald-500 hover:text-white dark:hover:text-slate-950 hover:border-emerald-800 dark:hover:border-emerald-500 flex items-center justify-center transition-all cursor-pointer"
            >
               <Icon icon="lucide:chevron-left" class="text-2xl" />
            </button>

            <button
               class="custom-next-btn absolute -right-5 sm:-right-6 top-[45%] -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white dark:bg-[#16120e] border border-slate-200 dark:border-[#26201a] shadow-xl text-slate-700 dark:text-slate-200 hover:bg-emerald-800 dark:hover:bg-emerald-500 hover:text-white dark:hover:text-slate-950 hover:border-emerald-800 dark:hover:border-emerald-500 flex items-center justify-center transition-all cursor-pointer"
            >
               <Icon icon="lucide:chevron-right" class="text-2xl" />
            </button>

         </div>

         <!-- Bottom Stats & Quote Banner -->
         <div
            :class="[
               'bg-white dark:bg-[#16120e] border border-slate-200/90 dark:border-[#26201a] rounded-[2.5rem] p-8 sm:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.03)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative featured-bottom-banner transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-500 transform',
               isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            ]"
         >

            <!-- Stats Columns -->
            <div
               class="grid grid-cols-2 gap-6 pr-4 text-center lg:col-span-7 sm:grid-cols-4 lg:border-r lg:border-slate-100 dark:lg:border-[#26201a] banner-stats-grid"
            >
               <div v-for="(stat, sIdx) in featured.stats" :key="sIdx" class="flex flex-col items-center stat-item-box">
                  <div class="mb-3 text-emerald-600 dark:text-emerald-400 stat-icon-wrapper">
                     <Icon :icon="stat.icon" class="text-2xl" />
                  </div>
                  <h3 class="mb-1 text-3xl font-black text-slate-900 dark:text-white stat-value-text">{{ stat.value }}</h3>
                  <p class="text-[11px] text-slate-200 dark:text-slate-200 font-bold uppercase tracking-wider stat-label-text">{{ stat.label }}</p>
               </div>
            </div>

            <!-- Quote & CTA Button -->
            <div
               class="relative flex flex-col items-center justify-between gap-6 pl-0 lg:col-span-5 sm:flex-row lg:pl-4 banner-quote-cta-wrapper"
            >
               <div class="flex items-start gap-3 quote-content-box">
                  <span class="font-serif text-3xl font-bold leading-none text-emerald-600 dark:text-emerald-400 quote-symbol">“</span>
                  <p class="text-xs font-medium leading-relaxed sm:text-sm text-slate-600 dark:text-slate-200 quote-text">
                     {{ featured.quoteBox.quote }}
                  </p>
               </div>

               <div class="flex flex-col items-end gap-4 shrink-0 cta-button-group">
                  <a
                     class="flex items-center gap-2 px-6 py-4 text-xs font-bold text-white dark:text-slate-950 transition-all shadow-md bg-emerald-950 dark:bg-emerald-500 hover:bg-emerald-900 dark:hover:bg-emerald-400 rounded-2xl banner-action-btn"
                     :href="featured.quoteBox.buttonLink"
                  >
                     {{ featured.quoteBox.buttonText }}
                     <Icon icon="lucide:arrow-right" />
                  </a>
               </div>
            </div>

         </div>

      </div>
   </section>
</template>