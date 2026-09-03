<script setup>
import { ref, computed } from 'vue';
import { contactData } from '../data'; 
import { Icon } from '@iconify/vue';
import { useScrollReveal } from '../composables/useScrollReveal';

const contact = contactData; 

const { elementRef, isVisible } = useScrollReveal(0.1, true);

const form = ref({
   name: '',
   email: '',
   company: '',
   website: '',
   projectType: '',
   need: '',
   budget: '',
   timeline: '',
   details: ''
});

const availableBudgets = computed(() => {
   const mapping = contact.form.budgetMapping || {};
   return mapping[form.value.projectType] || contact.form.budgetRanges;
});
</script>

<template>
   <section ref="elementRef" id="contact"
      class="contact-section relative px-4 py-18 overflow-hidden bg-[#fbf9f4] dark:bg-[#0f0d0b] sm:px-6 lg:px-8 text-slate-900 dark:text-slate-300 transition-colors duration-300">

      <div id="contact-container" :class="['contact-container max-w-[1440px] mx-auto relative z-10 scroll-zoom-container', { 'start-zoom': isVisible }]">

         <!-- Main Grid Layout (Left Info & Right Form) -->
         <div id="contact-grid-layout" class="contact-grid-layout grid items-start grid-cols-1 gap-12 lg:grid-cols-12">

            <!-- Left Column: Heading & Contact Info (5 Cols) -->
            <div id="contact-left-col" :class="['contact-left-column lg:col-span-5 lg:sticky lg:top-24 flex flex-col gap-8 scroll-card-item', { 'is-visible': isVisible }]">

               <div class="contact-header-wrapper flex flex-col items-center justify-center text-center md:items-start md:text-left">
                  <div id="section-tag-wrapper" class="section-tag-wrapper flex flex-col items-start mb-4">
                     <span id="section-number-tag"
                        class="section-number-tag text-xs font-bold tracking-[0.2em] text-emerald-600 dark:text-emerald-400 uppercase mb-3">{{ contact.sectionTag }}</span>
                     <div id="section-line-indicator" class="section-line-indicator relative flex items-center justify-start w-36">
                        <div class="section-line-bar absolute w-full h-[1.5px] bg-gradient-to-r from-emerald-600/40 to-transparent"></div>
                        <span class="section-line-dot relative z-10 w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400"></span>
                     </div>
                  </div>

                  <h2 id="section-main-heading" class="section-main-heading mb-4 text-4xl font-black leading-tight tracking-tight sm:text-6xl text-slate-900 dark:text-white"
                     v-html="contact.title"></h2>

                  <p id="section-description" class="section-description text-sm leading-relaxed text-slate-300 dark:text-slate-300 sm:text-base">
                     {{ contact.description }}
                  </p>
               </div>

               <!-- Contact Details List -->
               <div id="contact-info-list" class="contact-info-card-wrapper bg-white dark:bg-[#16120e] border border-slate-200/90 dark:border-[#26201a] rounded-[2.5rem] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] space-y-6 flex flex-wrap justify-between">
                  <div v-for="(item, index) in contact.infoList" :key="index" class="contact-info-item flex items-start gap-4">
                     <span
                        class="contact-info-icon flex items-center justify-center w-12 h-12 text-xl rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 shrink-0">
                        <Icon :icon="item.icon" />
                     </span>
                     <div class="contact-info-content">
                        <p class="contact-info-label mb-1 text-xs font-bold tracking-wider uppercase text-slate-300 dark:text-slate-300">{{ item.label }}</p>
                        <a v-if="item.href" :href="item.href"
                           class="contact-info-link !lowercase text-sm font-bold transition-colors text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400">{{
                              item.value }}</a>
                        <p v-else class="contact-info-value text-sm font-bold text-slate-900 dark:text-white">{{ item.value }}</p>
                     </div>
                  </div>
               </div>

               <!-- Schedule a Call Box -->
               <div id="schedule-call-box"
                  class="hidden md:visible schedule-call-wrapper flex flex-col items-center justify-between gap-6 p-8 border bg-white dark:bg-[#16120e] border-slate-200/90 dark:border-[#26201a] rounded-[2.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] sm:flex-row">
                  <div class="schedule-call-info flex items-center gap-4">
                     <span
                        class="schedule-call-icon flex items-center justify-center w-12 h-12 text-xl bg-emerald-50 dark:bg-emerald-950/50 rounded-2xl text-emerald-600 dark:text-emerald-400 shrink-0">
                        <Icon icon="lucide:calendar-days" />
                     </span>
                     <div class="schedule-call-text">
                        <h4 class="schedule-call-title text-sm font-bold text-slate-900 dark:text-white">{{ contact.scheduleCall.title }}</h4>
                        <p class="schedule-call-subtitle text-xs text-slate-300 dark:text-slate-300">{{ contact.scheduleCall.subtitle }}</p>
                     </div>
                  </div>
                  <a :href="contact.scheduleCall.href"
                     class="schedule-call-btn flex items-center justify-center gap-2 px-6 py-4 text-xs font-bold text-white dark:text-slate-950 transition-all shadow-md bg-emerald-950 dark:bg-emerald-500 hover:bg-emerald-900 dark:hover:bg-emerald-400 rounded-xl w-full sm:w-auto shrink-0">
                     <Icon icon="lucide:calendar" /> {{ contact.scheduleCall.buttonText }}
                  </a>
               </div>

            </div>

            <!-- Right Column: Form (7 Cols) -->
            <div id="contact-right-col" :class="['contact-right-column lg:col-span-7 scroll-card-item', { 'is-visible': isVisible }]">

               <div id="contact-form-wrapper"
                  class="contact-form-container bg-white dark:bg-[#16120e] border border-slate-200/90 dark:border-[#26201a] rounded-[2.5rem] p-6 sm:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">

                  <div class="contact-form-header flex items-center gap-4 pb-6 mb-8 border-b border-slate-100 dark:border-[#26201a]">
                     <span
                        class="contact-form-header-icon flex items-center justify-center w-12 h-12 text-xl rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                        <Icon :icon="contact.form.headerIcon || 'lucide:send'" />
                     </span>
                     <div class="contact-form-header-text">
                        <h3 class="contact-form-title text-xl font-black text-slate-900 dark:text-white">{{ contact.form.title }}</h3>
                        <p class="contact-form-subtitle text-xs text-slate-300 dark:text-slate-300">{{ contact.form.subtitle }}</p>
                     </div>
                  </div>

                  <form @submit.prevent class="contact-main-form space-y-6">

                     <!-- Name & Email -->
                     <div class="form-row-group grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div class="form-field-group">
                           <label class="form-label block mb-2 text-xs font-bold tracking-wider uppercase text-slate-700 dark:text-slate-300">
                              {{ contact.form.fields.nameLabel }} <span class="text-red-500">*</span>
                           </label>
                           <input type="text" v-model="form.name" :placeholder="contact.form.fields.namePlaceholder"
                              class="form-input w-full bg-slate-50 dark:bg-[#1f1a15] border border-slate-200 dark:border-[#26201a] rounded-2xl px-4 py-3.5 text-sm text-slate-900 dark:text-slate-300 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-400 focus:bg-white dark:focus:bg-[#16120e] transition-all"
                              required />
                        </div>
                        <div class="form-field-group">
                           <label class="form-label block mb-2 text-xs font-bold tracking-wider uppercase text-slate-700 dark:text-slate-300">
                              {{ contact.form.fields.emailLabel }} <span class="text-red-500">*</span>
                           </label>
                           <input type="email" v-model="form.email" :placeholder="contact.form.fields.emailPlaceholder"
                              class="form-input w-full bg-slate-50 dark:bg-[#1f1a15] border border-slate-200 dark:border-[#26201a] rounded-2xl px-4 py-3.5 text-sm text-slate-900 dark:text-slate-300 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-400 focus:bg-white dark:focus:bg-[#16120e] transition-all"
                              required />
                        </div>
                     </div>

                     <!-- Company / Brand & Website -->
                     <div class="form-row-group grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div class="form-field-group">
                           <label class="form-label block mb-2 text-xs font-bold tracking-wider uppercase text-slate-700 dark:text-slate-300">
                              {{ contact.form.fields.companyLabel }}
                           </label>
                           <input type="text" v-model="form.company" :placeholder="contact.form.fields.companyPlaceholder"
                              class="form-input w-full bg-slate-50 dark:bg-[#1f1a15] border border-slate-200 dark:border-[#26201a] rounded-2xl px-4 py-3.5 text-sm text-slate-900 dark:text-slate-300 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-400 focus:bg-white dark:focus:bg-[#16120e] transition-all" />
                        </div>
                        <div class="form-field-group">
                           <label class="form-label block mb-2 text-xs font-bold tracking-wider uppercase text-slate-700 dark:text-slate-300">
                              {{ contact.form.fields.websiteLabel }}
                           </label>
                           <input type="url" v-model="form.website" :placeholder="contact.form.fields.websitePlaceholder"
                              class="form-input w-full bg-slate-50 dark:bg-[#1f1a15] border border-slate-200 dark:border-[#26201a] rounded-2xl px-4 py-3.5 text-sm text-slate-900 dark:text-slate-300 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-400 focus:bg-white dark:focus:bg-[#16120e] transition-all" />
                        </div>
                     </div>

                     <!-- Project Type -->
                     <div class="form-field-group">
                        <label class="form-label block mb-2 text-xs font-bold tracking-wider uppercase text-slate-700 dark:text-slate-300">
                           {{ contact.form.fields.projectTypeLabel }} <span class="text-red-500">*</span>
                        </label>
                        <select
                           v-model="form.projectType"
                           class="form-select w-full bg-slate-50 dark:bg-[#1f1a15] border border-slate-200 dark:border-[#26201a] rounded-2xl px-4 py-3.5 text-sm text-slate-900 dark:text-slate-300 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-400 focus:bg-white dark:focus:bg-[#16120e] transition-all"
                           required>
                           <option disabled value="">{{ contact.form.fields.projectTypeDefault }}</option>
                           <option v-for="(opt, idx) in contact.form.projectTypes" :key="idx" :value="opt">{{ opt }}</option>
                        </select>
                     </div>

                     <!-- What do you need? (Requirements/Scope) -->
                     <div class="form-field-group">
                        <label class="form-label block mb-2 text-xs font-bold tracking-wider uppercase text-slate-700 dark:text-slate-300">
                           {{ contact.form.fields.needLabel }} <span class="text-red-500">*</span>
                        </label>
                        <textarea rows="3"
                           v-model="form.need"
                           :placeholder="contact.form.fields.needPlaceholder"
                           class="form-textarea w-full bg-slate-50 dark:bg-[#1f1a15] border border-slate-200 dark:border-[#26201a] rounded-2xl px-4 py-3.5 text-sm text-slate-900 dark:text-slate-300 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-400 focus:bg-white dark:focus:bg-[#16120e] transition-all"
                           required></textarea>
                     </div>

                     <!-- Budget & Timeline -->
                     <div class="form-row-group grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div class="form-field-group">
                           <label class="form-label block mb-2 text-xs font-bold tracking-wider uppercase text-slate-700 dark:text-slate-300">
                              {{ contact.form.fields.budgetLabel }} <span class="text-red-500">*</span>
                           </label>
                           <select
                              v-model="form.budget"
                              class="form-select w-full bg-slate-50 dark:bg-[#1f1a15] border border-slate-200 dark:border-[#26201a] rounded-2xl px-4 py-3.5 text-sm text-slate-900 dark:text-slate-300 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-400 focus:bg-white dark:focus:bg-[#16120e] transition-all"
                              required>
                              <option disabled value="">{{ contact.form.fields.budgetDefault }}</option>
                              <option v-for="(budget, idx) in availableBudgets" :key="idx" :value="budget">{{ budget }}</option>
                           </select>
                        </div>
                        <div class="form-field-group">
                           <label class="form-label block mb-2 text-xs font-bold tracking-wider uppercase text-slate-700 dark:text-slate-300">
                              {{ contact.form.fields.timelineLabel }}
                           </label>
                           <select
                              v-model="form.timeline"
                              class="form-select w-full bg-slate-50 dark:bg-[#1f1a15] border border-slate-200 dark:border-[#26201a] rounded-2xl px-4 py-3.5 text-sm text-slate-900 dark:text-slate-300 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-400 focus:bg-white dark:focus:bg-[#16120e] transition-all">
                              <option disabled value="">{{ contact.form.fields.timelineDefault }}</option>
                              <option v-for="(time, idx) in contact.form.timelines" :key="idx" :value="time">{{ time }}</option>
                           </select>
                        </div>
                     </div>

                     <!-- Additional Details -->
                     <div class="form-field-group">
                        <label class="form-label block mb-2 text-xs font-bold tracking-wider uppercase text-slate-700 dark:text-slate-300">
                           {{ contact.form.fields.detailsLabel }}
                        </label>
                        <textarea rows="3"
                           v-model="form.details"
                           :placeholder="contact.form.fields.detailsPlaceholder"
                           class="form-textarea w-full bg-slate-50 dark:bg-[#1f1a15] border border-slate-200 dark:border-[#26201a] rounded-2xl px-4 py-3.5 text-sm text-slate-900 dark:text-slate-300 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-400 focus:bg-white dark:focus:bg-[#16120e] transition-all"></textarea>
                     </div>

                     <!-- File Upload & Submit Row -->
                     <div class="form-footer-action flex flex-col items-center justify-between gap-4 pt-2 sm:flex-row">
                        <label
                           class="form-upload-label flex items-center gap-2 text-xs font-bold transition-colors cursor-pointer text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 w-full sm:w-auto">
                           <span
                              class="form-upload-icon-box flex items-center justify-center w-10 h-10 border rounded-xl bg-slate-50 dark:bg-[#1f1a15] border-slate-200 dark:border-[#26201a] text-slate-700 dark:text-slate-300 shrink-0">
                              <Icon icon="lucide:paperclip" />
                           </span>
                           <span class="form-upload-text-wrap">{{ contact.form.uploadText }} <br /><span class="text-[10px] text-slate-300 dark:text-slate-300 font-normal">{{ contact.form.uploadSubtext }}</span></span>
                           <input type="file" class="hidden" />
                        </label>

                        <button type="submit"
                           class="form-submit-btn flex items-center justify-center w-full gap-2 px-6 py-4 text-xs font-bold text-white dark:text-slate-950 transition-all shadow-md sm:w-auto bg-emerald-950 dark:bg-emerald-500 hover:bg-emerald-900 dark:hover:bg-emerald-400 rounded-xl">
                           <Icon icon="lucide:send" /> {{ contact.form.submitButtonText }}
                        </button>
                     </div>

                  </form>

               </div>

            </div>

         </div>

      </div>
   </section>
</template>

<style scoped>
/* Scroll Zoom & Fade Transitions */
.scroll-zoom-container {
   opacity: 0;
   transform: scale(0.95) translateY(30px);
   transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.scroll-zoom-container.start-zoom {
   opacity: 1;
   transform: scale(1) translateY(0);
}

.scroll-card-item {
   opacity: 0;
   transform: translateY(25px);
   transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
   transition-delay: 0.2s;
}

.scroll-card-item.is-visible {
   opacity: 1;
   transform: translateY(0);
}
</style>