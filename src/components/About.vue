<script setup>
import { aboutData as centralAboutData } from '../data';
import { Icon } from '@iconify/vue';
import { useScrollReveal } from '../composables/useScrollReveal';

const about = centralAboutData;
const { elementRef, isVisible } = useScrollReveal(0.1, false);
</script>

<template>
   <!-- Main Section Container -->
   <section ref="elementRef" :id="about.id"
      :class="['about-experience-section bg-[#0f0d0b] py-18 px-4 sm:px-6 lg:px-8 text-slate-300 relative transition-colors duration-300 scroll-zoom-container', { 'start-zoom': isVisible }]">

      <!-- Section Inner Wrapper -->
      <div class="experience-container max-w-[1440px] mx-auto relative z-10">

         <!-- Main Grid Layout -->
         <div class="experience-main-grid grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            <!-- ========================================= -->
            <!-- LEFT COLUMN: ABOUT ME, STATS & TECH STACK -->
            <!-- ========================================= -->
            <div id="about-sidebar" class="lg:col-span-5 lg:sticky lg:top-24 flex flex-col gap-y-8 self-start">

               <!-- Section Tag/Number -->
               <div class="about-tag-wrapper flex flex-col md:items-start items-center">
                  <span id="section-id-tag" class="text-xs font-bold tracking-[0.2em] text-emerald-400 uppercase mb-3">
                     {{ about.sectionNumber }}
                  </span>
                  <div class="about-underline-wrapper relative flex items-center justify-start w-36">
                     <div class="absolute w-full h-[1.5px] bg-gradient-to-r from-emerald-400/40 to-transparent"></div>
                     <span class="w-2 h-2 rounded-full bg-emerald-400 relative z-10"></span>
                  </div>
               </div>

               <!-- Main Headline -->
               <h2 id="about-main-headline"
                  class="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-center md:text-left text-white">
                  {{ about.headline }}
                  <span id="about-highlight-text" class="text-emerald-400"> {{ about.subHeadline }} </span>
               </h2>

               <!-- Author Info & Profile Image Card -->
               <div class="author-profile-card grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  <div class="author-details sm:col-span-7 flex flex-col justify-center">
                     <h3 id="author-name-text" class="text-3xl font-bold text-emerald-400 mb-1">
                        {{ about.authorName }}
                     </h3>   
                     
                     <!-- Personal Description Paragraph -->
                     <p id="about-description-text" class="text-slate-300 text-sm font-normal leading-relaxed">
                        {{ about.description }}
                     </p>

                  </div>

                  <!-- Profile Image Container -->
                  <div v-if="about.profileImage" class="profile-image-wrapper sm:col-span-5">
                     <div
                        class="image-frame relative rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-[0_10px_30px_rgba(16,185,129,0.15)] bg-[#16120e] aspect-[3/4]">
                        <img :src="about.profileImage" :alt="about.authorName"
                           class="frame-img w-full h-full object-cover object-center" />
                     </div>
                  </div>
               </div>

               <!-- Key Statistics Grid -->
               <div id="key-stats-grid"
                  class="stats-box grid grid-cols-4 md:grid-cols-2 gap-5 bg-[#16120e] border border-[#26201a] rounded-[2rem] p-8 shadow-sm">

                  <div v-for="(stat, sIdx) in about.stats" :key="sIdx" :id="'stat-item-' + sIdx"
                     class="stat-card flex items-start gap-4">
                     <span
                        class="stat-icon-wrapper w-10 h-10 shrink-0 rounded-2xl bg-[#0f0d0b] text-emerald-400 flex items-center justify-center text-xl border border-[#26201a]">
                        <Icon v-if="stat.icon === 'briefcase'" icon="lucide:briefcase" />
                        <Icon v-else-if="stat.icon === 'projects'" icon="lucide:users" />
                        <Icon v-else-if="stat.icon === 'code'" icon="lucide:code" />
                        <Icon v-else icon="lucide:smile" />
                     </span>
                     <div class="stat-text-wrapper flex flex-col">
                        <h4 class="stat-value font-black text-white">{{ stat.value }}</h4>
                        <p class="stat-label text-xs text-slate-300 font-medium uppercase tracking-wider">{{ stat.label
                           }}</p>
                     </div>
                  </div>
               </div>

               <!-- Tech Stack Box -->
               <div v-if="about.technologies && about.technologies.length" id="tech-stack-showcase"
                  class="tech-box bg-[#16120e] border border-[#26201a] rounded-[2rem] p-8 shadow-sm md:visible hidden">
                  <div class="tech-header flex items-center gap-3 mb-6">
                     <span class="tech-pulse-dot w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                     <h5 class="tech-title text-xs font-bold text-slate-300 uppercase tracking-widest">TECHNOLOGIES I
                        WORK WITH</h5>
                  </div>
                  <div class="tech-icons-grid grid grid-cols-5 gap-y-6 gap-x-4">
                     <div v-for="(tech, tIdx) in about.technologies" :key="tIdx"
                        class="tech-icon-item flex flex-col items-center gap-2 group">
                        <div
                           class="icon-bg w-10 h-10 rounded-xl bg-[#0f0d0b] border border-[#26201a] flex items-center justify-center group-hover:border-emerald-500/50 transition-colors">
                           <Icon :icon="tech.icon"
                              class="tech-svg w-5 h-5 text-slate-300 group-hover:text-emerald-400 transition-colors" />
                        </div>
                        <span
                           class="tech-name text-[10px] font-medium text-slate-300 uppercase tracking-wider text-center">{{
                           tech.name }}</span>
                     </div>
                  </div>
               </div>

            </div>

            <!-- ========================================= -->
            <!-- RIGHT COLUMN: PROFESSIONAL EXPERIENCE TIMELINE -->
            <!-- ========================================= -->
            <div id="experience-timeline-column" class="lg:col-span-7">

               <div id="timeline-main-wrapper" class="relative">

                  <!-- Vertical Timeline Line -->
                  <div id="timeline-vertical-line"
                     class="absolute left-6 top-12 bottom-12 w-0.5 bg-emerald-900/60 hidden sm:block"></div>

                  <!-- স্পেস কমানো হয়েছে যাতে কার্ডগুলো কাছাকাছি থেকে সঠিকভাবে স্ট্যাক হয় -->
                  <div id="timeline-items-container" class="space-y-6 relative z-10">

                     <!-- মেইন এন্ট্রি ফ্লেক্স থেকে সরিয়ে সরাসরি কার্ডকেই স্টিকি করা হয়েছে, যেমনটা সার্ভিসে করা হয়েছিল -->
                     <div v-for="(exp, eIdx) in about.experiences" :key="eIdx" :id="'experience-entry-' + eIdx"
                        class="timeline-entry relative pl-0 sm:pl-16 sticky transition-all duration-300"
                        :style="{ top: `calc(6rem + ${eIdx * 0}rem)` }">

                        <!-- Desktop Timeline Icon Badge -->
                        <div id="timeline-badge-icon"
                           class="badge-wrapper w-12 h-12 rounded-2xl bg-[#1f1a15] border border-[#2b241d] shadow-md flex items-center justify-center shrink-0 z-10 text-xl text-emerald-400 absolute left-0 top-6 hidden sm:flex">
                           <Icon v-if="exp.icon === 'briefcase'" icon="lucide:briefcase" />
                           <Icon v-else-if="exp.icon === 'shopify'" icon="logos:shopify" class="w-6 h-6" />
                           <Icon v-else-if="exp.icon === 'wordpress'" icon="logos:wordpress-icon" class="w-6 h-6" />
                           <Icon v-else icon="lucide:code-2" />
                        </div>

                        <!-- Main Experience Card -->
                        <div id="experience-card-box"
                           class="experience-card bg-[#1f1a15] border border-[#2b241d] rounded-3xl p-7 shadow-2xl w-full relative flex flex-col">

                           <!-- Mobile Header (Role + Icon) -->
                           <div class="mobile-card-header flex items-center gap-4 mb-3 sm:hidden">
                              <div
                                 class="mobile-icon-bg w-10 h-10 rounded-2xl bg-[#1f1a15] border border-[#2b241d] shadow-md flex items-center justify-center text-emerald-400">
                                 <Icon v-if="exp.icon === 'briefcase'" icon="lucide:briefcase" />
                                 <Icon v-else-if="exp.icon === 'shopify'" icon="logos:shopify" class="w-5 h-5" />
                                 <Icon v-else-if="exp.icon === 'wordpress'" icon="logos:wordpress-icon"
                                    class="w-5 h-5" />
                                 <Icon v-else icon="lucide:code-2" />
                              </div>
                              <h3 class="mobile-role-title text-xl font-black text-white">{{ exp.role }}</h3>
                           </div>

                           <!-- Desktop Header Row (Role + Status + Duration) -->
                           <div id="desktop-card-header"
                              class="header-row flex items-center justify-between gap-4 mb-2">
                              <div class="role-status-group hidden sm:flex items-center gap-4">
                                 <h3 class="role-title font-black text-white text-xl">{{ exp.role }}</h3>
                                 <span v-if="exp.status"
                                    class="status-badge bg-emerald-950/50 text-emerald-300 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-900/50">
                                    {{ exp.status }}
                                 </span>
                              </div>
                              <span
                                 class="duration-badge text-xs font-bold text-slate-300 bg-[#16120e] px-4 py-1.5 rounded-full border border-[#2b241d] ml-auto sm:ml-0 shrink-0">
                                 {{ exp.duration }}
                              </span>
                           </div>

                           <!-- Company Name -->
                           <p v-if="exp.company" id="company-name-text"
                              class="company-title text-xs font-bold tracking-wider text-emerald-400 uppercase mb-4">
                              {{ exp.company }}
                           </p>

                           <!-- Job Description -->
                           <p id="job-description-text"
                              class="job-description text-slate-300 text-sm leading-relaxed mb-6">
                              {{ exp.description }}
                           </p>

                           <!-- Skills Tags Flex -->
                           <div id="skills-tags-flex" class="skills-container flex flex-wrap gap-3">
                              <span v-for="(skill, sIdx) in exp.skills" :key="sIdx"
                                 class="skill-tag text-xs font-bold text-slate-300 bg-[#16120e] border border-[#2b241d] px-3.5 py-2 rounded-xl">
                                 • {{ skill }}
                              </span>
                           </div>

                           <!-- Card Pointer / Arrow (Desktop only) -->
                           <div
                              class="card-pointer absolute -left-3 top-7 w-4 h-4 bg-[#1f1a15] border-l border-t border-[#2b241d] transform -rotate-45 hidden sm:block">
                           </div>
                        </div>

                     </div>

                  </div>

               </div>

            </div>

         </div>

      </div>
   </section>
</template>