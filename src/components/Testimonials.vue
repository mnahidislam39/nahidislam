<script setup>
import { computed } from 'vue';
import { clientReviewData } from '../data'; 
import { Icon } from '@iconify/vue';
import { useScrollReveal } from '../composables/useScrollReveal';

// Swiper Vue.js components & modules
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; // <--- Autoplay Import করা হয়েছে

// Swiper CSS styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const testimonialsData = clientReviewData; 
const modules = [Navigation, Pagination, Autoplay]; // <--- Modules array-তে যোগ করা হয়েছে

// Scroll Reveal Composable
const { elementRef, isVisible } = useScrollReveal(0.1, false);

// ১. এভারেজ রেটিং অটোমেটিক ক্যালকুলেশন
const calculatedRating = computed(() => {
  const reviews = testimonialsData.reviews;
  if (!reviews || reviews.length === 0) return '0.0';
  
  const total = reviews.reduce((acc, curr) => acc + (curr.rating || 5), 0);
  return (total / reviews.length).toFixed(1);
});

// ২. মোট রিভিউ সংখ্যা অটোমেটিক গণনা
const calculatedReviewCount = computed(() => {
  const count = testimonialsData.reviews?.length || 0;
  return `Based on ${count}+ reviews across platforms`;
});

// ৩. Star type (full, half, empty) বের করার হেলপার ফাংশন
const getStarType = (rating, index) => {
  const score = rating || 5;
  if (score >= index) {
    return 'full';
  } else if (score >= index - 0.5) {
    return 'half';
  }
  return 'empty';
};
</script>

<template>
   <section
      ref="elementRef"
      id="testimonials"
      class="relative px-4 py-18 bg-[#fbf9f4] dark:bg-[#0f0d0b] testimonials-section sm:px-6 lg:px-8 text-slate-900 dark:text-slate-300 transition-colors duration-700"
   >
      <div
         id="testimonials-container"
         :class="['max-w-[1440px] mx-auto relative z-10 scroll-zoom-container grid grid-cols-1 lg:grid-cols-12 gap-12 items-start', { 'start-zoom': isVisible }]"
      >
         <div class="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left scroll-card-item">
            <div class="testimonials-title-wrapper w-full">
               <div id="section-tag-wrapper" class="section-tag-container flex flex-col items-center lg:items-start mb-4">
                  <span id="section-number-tag"
                     class="section-number-text text-xs font-bold tracking-[0.2em] text-emerald-600 dark:text-emerald-400 uppercase mb-3 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-600/20 dark:border-emerald-500/20">
                     {{ testimonialsData.sectionTag }}
                  </span>
               </div>

               <h2 class="testimonials-main-title mb-4 text-3xl sm:text-6xl font-black leading-tight tracking-tight text-slate-900 dark:text-white" v-html="testimonialsData.title"></h2>
               <p class="testimonials-main-desc text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400 mb-6">{{ testimonialsData.description }}</p>
            </div>
         </div>

         <div class="lg:col-span-8 flex flex-col gap-6 min-w-0 scroll-card-item">
            
            <div class="flex items-center justify-between w-full gap-4">
               
               <div class="testimonials-rating-box flex items-center gap-4 p-3 sm:p-4 bg-white dark:bg-[#16120e] border shadow-sm border-slate-200/90 dark:border-[#26201a] rounded-3xl w-fit">
                  <div class="testimonials-rating-badge flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1.5 rounded-2xl text-emerald-800 dark:text-emerald-400 font-black text-base sm:text-lg">
                     <Icon icon="heroicons:star-solid" class="text-lg sm:text-xl text-emerald-600 dark:text-emerald-400" /> {{ calculatedRating }}
                  </div>
                  <div class="testimonials-rating-info-box text-left">
                     <div class="testimonials-stars-flex flex items-center gap-1 mb-0.5 text-emerald-600 dark:text-emerald-400">
                        <template v-for="i in 5" :key="i">
                           <Icon 
                              v-if="getStarType(Number(calculatedRating), i) === 'full'"
                              icon="heroicons:star-solid" 
                              class="w-4 h-4 text-emerald-600 dark:text-emerald-400" 
                           />
                           <Icon 
                              v-else-if="getStarType(Number(calculatedRating), i) === 'half'"
                              icon="ph:star-half-fill" 
                              class="w-4 h-4 text-emerald-600 dark:text-emerald-400" 
                           />
                           <Icon 
                              v-else
                              icon="heroicons:star" 
                              class="w-4 h-4 text-slate-400 opacity-30" 
                           />
                        </template>
                     </div>
                     <p class="testimonials-review-count text-[11px] sm:text-xs font-bold text-slate-500 dark:text-slate-400">{{ calculatedReviewCount }}</p>
                  </div>
               </div> 

               <div class="testimonials-nav-buttons-flex flex items-center gap-2 sm:gap-3">
                  <button
                     class="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 transition-all bg-white dark:bg-[#16120e] border rounded-full shadow-md cursor-pointer testimonial-prev-btn border-slate-200 dark:border-[#26201a] text-slate-700 dark:text-slate-300 hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:text-white dark:hover:text-slate-950 hover:border-emerald-600 dark:hover:border-emerald-500">
                     <Icon icon="lucide:chevron-left" class="text-lg sm:text-xl" />
                  </button>
                  <button
                     class="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 transition-all bg-white dark:bg-[#16120e] border rounded-full shadow-md cursor-pointer testimonial-next-btn border-slate-200 dark:border-[#26201a] text-slate-700 dark:text-slate-300 hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:text-white dark:hover:text-slate-950 hover:border-emerald-600 dark:hover:border-emerald-500">
                     <Icon icon="lucide:chevron-right" class="text-lg sm:text-xl" />
                  </button>
               </div>

            </div>

            <div class="testimonials-slider-wrapper relative min-w-0">
               <Swiper 
                  :modules="modules" 
                  :slides-per-view="1" 
                  :space-between="20" 
                  :loop="true"
                  :autoplay="{
                     delay: 3500,
                     disableOnInteraction: false,
                     pauseOnMouseEnter: true
                  }"
                  :navigation="{
                     nextEl: '.testimonial-next-btn',
                     prevEl: '.testimonial-prev-btn',
                  }" 
                  :pagination="{
                     el: '.testimonial-pagination-dots',
                     clickable: true
                  }"
                  :breakpoints="{
                     640: { slidesPerView: 2, spaceBetween: 20 },
                     1280: { slidesPerView: 3, spaceBetween: 24 },
                  }" 
                  class="testimonials-swiper overflow-hidden pb-2"
               >
                  <SwiperSlide v-for="(review, rIdx) in testimonialsData.reviews" :key="rIdx" class="h-auto">
                     <div
                        class="testimonials-card-item bg-white dark:bg-[#16120e] border border-slate-200/90 dark:border-[#26201a] rounded-[2rem] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full hover:border-emerald-500/50 transition-all">
                        <div class="testimonials-card-top-content text-left">
                           <span class="testimonials-card-quote-symbol block mb-3 font-serif text-2xl font-bold leading-none text-emerald-600 dark:text-emerald-400">“</span>
                           <p class="testimonials-card-quote mb-6 text-xs leading-relaxed text-slate-600 dark:text-slate-300">{{ review.quote }}</p>

                           <div class="testimonials-card-stars-flex flex items-center gap-1 mb-6 text-emerald-600 dark:text-emerald-400">
                              <template v-for="i in 5" :key="i">
                                 <Icon 
                                    v-if="getStarType(review.rating, i) === 'full'"
                                    icon="heroicons:star-solid" 
                                    class="w-4 h-4 text-emerald-600 dark:text-emerald-400" 
                                 />
                                 <Icon 
                                    v-else-if="getStarType(review.rating, i) === 'half'"
                                    icon="ph:star-half-fill" 
                                    class="w-4 h-4 text-emerald-600 dark:text-emerald-400" 
                                 />
                                 <Icon 
                                    v-else
                                    icon="heroicons:star" 
                                    class="w-4 h-4 text-slate-400 opacity-30" 
                                 />
                              </template>
                           </div>
                        </div>

                        <div class="testimonials-card-footer-flex flex items-center justify-between pt-4 mt-auto border-t border-slate-100 dark:border-[#26201a]">
                           <div class="testimonials-card-user-info flex items-center gap-3">
                              <img :src="review.avatar" :alt="review.name" class="testimonials-card-avatar object-cover w-10 h-10 rounded-full" />
                              <div class="testimonials-card-text-box text-left">
                                 <h4 class="testimonials-card-name text-xs font-black text-slate-900 dark:text-white">{{ review.name }}</h4>
                                 <p class="testimonials-card-role text-[10px] text-slate-500 dark:text-slate-400 font-semibold">{{ review.role }}</p>
                              </div>
                           </div>
                           <div class="testimonials-card-icon-badge flex items-center justify-center w-8 h-8 text-sm rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400">
                              <Icon :icon="review.icon" />
                           </div>
                        </div>
                     </div>
                  </SwiperSlide>
               </Swiper>

               <div class="testimonial-pagination-dots flex items-center justify-center gap-2 mt-6"></div>
            </div>

         </div>
      </div>
   </section>
</template>

<style scoped>
:deep(.testimonial-pagination-dots .swiper-pagination-bullet) {
   width: 8px;
   height: 8px;
   background-color: #94a3b8;
   opacity: 0.4;
   border-radius: 9999px;
   transition: all 0.3s ease;
   cursor: pointer;
}

:deep(.testimonial-pagination-dots .swiper-pagination-bullet-active) {
   width: 28px;
   background-color: #10b981;
   opacity: 1;
}
</style>