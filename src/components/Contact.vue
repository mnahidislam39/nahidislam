<script setup>
import { ref, computed } from 'vue';
import { contactData } from '../data'; 
import { Icon } from '@iconify/vue';
import { useScrollReveal } from '../composables/useScrollReveal';

const contact = contactData; 

const { elementRef, isVisible } = useScrollReveal(0.1, true);

// 🔗 Google Apps Script Webhook URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzzmpY4UlbNBo-eL0befnCIoNsQgt_wGfXIPQ98L3RpUcqeN74nj9l5Bmd5pNpmv2po4g/exec';

const form = ref({
  name: '',
  email: '',
  whatsapp: '', 
  company: '',
  website: '',
  projectType: '',
  need: '',
  budget: '',
  timeline: '',
  details: ''
});

const isSubmitting = ref(false);
const isSuccessScreen = ref(false); // ১০ সেকেন্ডের এনিমেশন স্ক্রিন দেখানোর জন্য
const countdown = ref(10); // ১০ সেকেন্ড কাউন্টডাউন
let countdownTimer = null;

const availableBudgets = computed(() => {
  if (!contact?.form) return [];
  const mapping = contact.form.budgetMapping || {};
  return mapping[form.value.projectType] || contact.form.budgetRanges || [];
});

// ১০ সেকেন্ড পর ফর্মে ফিরে যাওয়ার লজিক
const startCountdown = () => {
  countdown.value = 10;
  isSuccessScreen.value = true;

  if (countdownTimer) clearInterval(countdownTimer);

  countdownTimer = setInterval(() => {
    countdown.value -= 1;
    if (countdown.value <= 0) {
      clearInterval(countdownTimer);
      isSuccessScreen.value = false; // ফর্মে ব্যাক করবে
    }
  }, 1000);
};

// ম্যানুয়ালি সাথে সাথে ব্যাক করার অপশন
const resetToForm = () => {
  if (countdownTimer) clearInterval(countdownTimer);
  isSuccessScreen.value = false;
};

// Form Submit Handler
const handleSubmit = async () => {
  isSubmitting.value = true;

  // ব্রাউজার থেকে ক্লায়েন্টের সময় ও টাইমজোন বের করা
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown';

  const payload = {
    name: String(form.value.name || ''),
    email: String(form.value.email || ''),
    whatsapp: String(form.value.whatsapp || ''),
    company: String(form.value.company || ''),
    website: String(form.value.website || ''),
    projectType: String(form.value.projectType || ''),
    whatDoYouNeed: String(form.value.need || ''),
    budget: String(form.value.budget || ''),
    timeline: String(form.value.timeline || ''),
    clientCountry: String(userTimezone),
    additionalDetails: String(form.value.details || '')
  };

  try {
    await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    // ফর্ম ক্লিয়ার করা
    form.value = {
      name: '', email: '', whatsapp: '', company: '',
      website: '', projectType: '', need: '', budget: '',
      timeline: '', details: ''
    };

    // ১০ সেকেন্ডের অ্যানিমেটেড সাকসেস মেসেজ দেখানো শুরু
    startCountdown();

  } catch (error) {
    console.error('Submission error:', error);
    alert('Something went wrong. Please try again!');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
   <section ref="elementRef" id="contact"
      class="contact-section relative px-4 py-18 overflow-hidden bg-[#fbf9f4] dark:bg-[#0f0d0b] sm:px-6 lg:px-8 text-slate-900 dark:text-slate-300 transition-colors duration-300">

      <div id="contact-container" :class="['contact-container max-w-[1440px] mx-auto relative z-10 scroll-zoom-container', { 'start-zoom': isVisible }]">

         <!-- Main Grid Layout -->
         <div id="contact-grid-layout" class="contact-grid-layout grid items-start grid-cols-1 gap-12 lg:grid-cols-12">

            <!-- Left Column: Heading & Contact Info -->
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

                  <p id="section-description" class="section-description text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
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
                        <p class="contact-info-label mb-1 text-xs font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">{{ item.label }}</p>
                        <a v-if="item.href" :href="item.href"
                           class="contact-info-link !lowercase text-sm font-bold transition-colors text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400">{{
                              item.value }}</a>
                        <p v-else class="contact-info-value text-sm font-bold text-slate-900 dark:text-white">{{ item.value }}</p>
                     </div>
                  </div>
               </div>

               <!-- Schedule a Call Box -->
               <div id="schedule-call-box"
                  class="hidden md:flex schedule-call-wrapper flex-col items-center justify-between gap-6 p-8 border bg-white dark:bg-[#16120e] border-slate-200/90 dark:border-[#26201a] rounded-[2.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] sm:flex-row">
                  <div class="schedule-call-info flex items-center gap-4">
                     <span
                        class="schedule-call-icon flex items-center justify-center w-12 h-12 text-xl bg-emerald-50 dark:bg-emerald-950/50 rounded-2xl text-emerald-600 dark:text-emerald-400 shrink-0">
                        <Icon icon="lucide:calendar-days" />
                     </span>
                     <div class="schedule-call-text">
                        <h4 class="schedule-call-title text-sm font-bold text-slate-900 dark:text-white">{{ contact.scheduleCall?.title }}</h4>
                        <p class="schedule-call-subtitle text-xs text-slate-500 dark:text-slate-400">{{ contact.scheduleCall?.subtitle }}</p>
                     </div>
                  </div>
                  <a :href="contact.scheduleCall?.href"
                     class="schedule-call-btn flex items-center justify-center gap-2 px-6 py-4 text-xs font-bold text-white dark:text-slate-950 transition-all shadow-md bg-emerald-950 dark:bg-emerald-500 hover:bg-emerald-900 dark:hover:bg-emerald-400 rounded-xl w-full sm:w-auto shrink-0">
                     <Icon icon="lucide:calendar" /> {{ contact.scheduleCall?.buttonText }}
                  </a>
               </div>

            </div>

            <!-- Right Column: Form or Animated Success Message -->
            <div id="contact-right-col" :class="['contact-right-column lg:col-span-7 scroll-card-item', { 'is-visible': isVisible }]">

               <div id="contact-form-wrapper"
                  class="contact-form-container min-h-[550px] flex flex-col justify-center bg-white dark:bg-[#16120e] border border-slate-200/90 dark:border-[#26201a] rounded-[2.5rem] p-6 sm:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.03)] relative overflow-hidden">

                  <!-- 🌟 ১০ সেকেন্ডের অ্যানিমেটেড সাকসেস স্ক্রিন 🌟 -->
                  <transition name="fade-scale" mode="out-in">
                     <div v-if="isSuccessScreen" key="success" class="flex flex-col items-center justify-center text-center py-12 px-4 space-y-6 my-auto">
                        
                        <!-- Animated Icon Container -->
                        <div class="relative flex items-center justify-center">
                           <div class="absolute w-28 h-28 bg-emerald-500/20 rounded-full animate-ping"></div>
                           <div class="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center text-4xl shadow-lg shadow-emerald-500/30 animate-bounce">
                              🎉
                           </div>
                        </div>

                        <!-- Success Text -->
                        <div class="space-y-2">
                           <h3 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                              Message Sent Successfully!
                           </h3>
                           <p class="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                              Thank you for reaching out! I have received your project details and will review them shortly.
                           </p>
                        </div>

                        <!-- 10 Second Progress Bar & Timer -->
                        <div class="w-full max-w-xs space-y-2 pt-4">
                           <div class="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                              <span>Redirecting back in</span>
                              <span class="text-emerald-600 dark:text-emerald-400 font-bold">{{ countdown }}s</span>
                           </div>
                           <div class="w-full bg-slate-100 dark:bg-[#26201a] h-2 rounded-full overflow-hidden">
                              <div class="bg-emerald-500 h-full transition-all duration-1000 ease-linear" :style="{ width: `${(countdown / 10) * 100}%` }"></div>
                           </div>
                        </div>

                        <!-- Manual Back Button -->
                        <button @click="resetToForm" type="button" class="mt-4 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer flex items-center gap-1">
                           <Icon icon="lucide:arrow-left" /> Send another message
                        </button>

                     </div>

                     <!-- 📝 মূল কন্টাক্ট ফর্ম 📝 -->
                     <div v-else key="form">
                        <div class="contact-form-header flex items-center gap-4 pb-6 mb-8 border-b border-slate-100 dark:border-[#26201a]">
                           <span
                              class="contact-form-header-icon flex items-center justify-center w-12 h-12 text-xl rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                              <Icon :icon="contact.form?.headerIcon || 'lucide:send'" />
                           </span>
                           <div class="contact-form-header-text">
                              <h3 class="contact-form-title text-xl font-black text-slate-900 dark:text-white">{{ contact.form?.title }}</h3>
                              <p class="contact-form-subtitle text-xs text-slate-500 dark:text-slate-400">{{ contact.form?.subtitle }}</p>
                           </div>
                        </div>

                        <form @submit.prevent="handleSubmit" class="contact-main-form space-y-6">

                           <!-- Name & Email -->
                           <div class="form-row-group grid grid-cols-1 gap-6 sm:grid-cols-2">
                              <div class="form-field-group">
                                 <label class="form-label block mb-2 text-xs font-bold tracking-wider uppercase text-slate-700 dark:text-slate-300">
                                    {{ contact.form?.fields?.nameLabel }} <span class="text-red-500">*</span>
                                 </label>
                                 <input type="text" v-model="form.name" :placeholder="contact.form?.fields?.namePlaceholder"
                                    class="form-input w-full bg-slate-50 dark:bg-[#1f1a15] border border-slate-200 dark:border-[#26201a] rounded-2xl px-4 py-3.5 text-sm text-slate-900 dark:text-slate-300 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-400 focus:bg-white dark:focus:bg-[#16120e] transition-all"
                                    required />
                              </div>
                              <div class="form-field-group">
                                 <label class="form-label block mb-2 text-xs font-bold tracking-wider uppercase text-slate-700 dark:text-slate-300">
                                    {{ contact.form?.fields?.emailLabel }} <span class="text-red-500">*</span>
                                 </label>
                                 <input type="email" v-model="form.email" :placeholder="contact.form?.fields?.emailPlaceholder"
                                    class="form-input w-full bg-slate-50 dark:bg-[#1f1a15] border border-slate-200 dark:border-[#26201a] rounded-2xl px-4 py-3.5 text-sm text-slate-900 dark:text-slate-300 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-400 focus:bg-white dark:focus:bg-[#16120e] transition-all"
                                    required />
                              </div>
                           </div>

                           <!-- WhatsApp & Company -->
                           <div class="form-row-group grid grid-cols-1 gap-6 sm:grid-cols-2">
                              <div class="form-field-group">
                                 <label class="form-label block mb-2 text-xs font-bold tracking-wider uppercase text-slate-700 dark:text-slate-300">
                                    WhatsApp Number <span class="text-xs text-slate-400 font-normal">(Optional)</span>
                                 </label>
                                 <input type="text" v-model="form.whatsapp" placeholder="Your WhatsApp Number"
                                    class="form-input w-full bg-slate-50 dark:bg-[#1f1a15] border border-slate-200 dark:border-[#26201a] rounded-2xl px-4 py-3.5 text-sm text-slate-900 dark:text-slate-300 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-400 focus:bg-white dark:focus:bg-[#16120e] transition-all" />
                              </div>
                              <div class="form-field-group">
                                 <label class="form-label block mb-2 text-xs font-bold tracking-wider uppercase text-slate-700 dark:text-slate-300">
                                    {{ contact.form?.fields?.companyLabel }}
                                 </label>
                                 <input type="text" v-model="form.company" :placeholder="contact.form?.fields?.companyPlaceholder"
                                    class="form-input w-full bg-slate-50 dark:bg-[#1f1a15] border border-slate-200 dark:border-[#26201a] rounded-2xl px-4 py-3.5 text-sm text-slate-900 dark:text-slate-300 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-400 focus:bg-white dark:focus:bg-[#16120e] transition-all" />
                              </div>
                           </div>

                           <!-- Website & Project Type -->
                           <div class="form-row-group grid grid-cols-1 gap-6 sm:grid-cols-2">
                              <div class="form-field-group">
                                 <label class="form-label block mb-2 text-xs font-bold tracking-wider uppercase text-slate-700 dark:text-slate-300">
                                    {{ contact.form?.fields?.websiteLabel }}
                                 </label>
                                 <input type="url" v-model="form.website" :placeholder="contact.form?.fields?.websitePlaceholder"
                                    class="form-input w-full bg-slate-50 dark:bg-[#1f1a15] border border-slate-200 dark:border-[#26201a] rounded-2xl px-4 py-3.5 text-sm text-slate-900 dark:text-slate-300 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-400 focus:bg-white dark:focus:bg-[#16120e] transition-all" />
                              </div>

                              <div class="form-field-group">
                                 <label class="form-label block mb-2 text-xs font-bold tracking-wider uppercase text-slate-700 dark:text-slate-300">
                                    {{ contact.form?.fields?.projectTypeLabel }} <span class="text-red-500">*</span>
                                 </label>
                                 <select
                                    v-model="form.projectType"
                                    class="form-select w-full bg-slate-50 dark:bg-[#1f1a15] border border-slate-200 dark:border-[#26201a] rounded-2xl px-4 py-3.5 text-sm text-slate-900 dark:text-slate-300 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-400 focus:bg-white dark:focus:bg-[#16120e] transition-all"
                                    required>
                                    <option disabled value="">{{ contact.form?.fields?.projectTypeDefault }}</option>
                                    <option v-for="(opt, idx) in contact.form?.projectTypes" :key="idx" :value="opt">{{ opt }}</option>
                                 </select>
                              </div>
                           </div>

                           <!-- What do you need? -->
                           <div class="form-field-group">
                              <label class="form-label block mb-2 text-xs font-bold tracking-wider uppercase text-slate-700 dark:text-slate-300">
                                 {{ contact.form?.fields?.needLabel }} <span class="text-red-500">*</span>
                              </label>
                              <textarea rows="3"
                                 v-model="form.need"
                                 :placeholder="contact.form?.fields?.needPlaceholder"
                                 class="form-textarea w-full bg-slate-50 dark:bg-[#1f1a15] border border-slate-200 dark:border-[#26201a] rounded-2xl px-4 py-3.5 text-sm text-slate-900 dark:text-slate-300 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-400 focus:bg-white dark:focus:bg-[#16120e] transition-all"
                                 required></textarea>
                           </div>

                           <!-- Budget & Timeline -->
                           <div class="form-row-group grid grid-cols-1 gap-6 sm:grid-cols-2">
                              <div class="form-field-group">
                                 <label class="form-label block mb-2 text-xs font-bold tracking-wider uppercase text-slate-700 dark:text-slate-300">
                                    {{ contact.form?.fields?.budgetLabel }} <span class="text-red-500">*</span>
                                 </label>
                                 <select
                                    v-model="form.budget"
                                    class="form-select w-full bg-slate-50 dark:bg-[#1f1a15] border border-slate-200 dark:border-[#26201a] rounded-2xl px-4 py-3.5 text-sm text-slate-900 dark:text-slate-300 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-400 focus:bg-white dark:focus:bg-[#16120e] transition-all"
                                    required>
                                    <option disabled value="">{{ contact.form?.fields?.budgetDefault }}</option>
                                    <option v-for="(budget, idx) in availableBudgets" :key="idx" :value="budget">{{ budget }}</option>
                                 </select>
                              </div>
                              <div class="form-field-group">
                                 <label class="form-label block mb-2 text-xs font-bold tracking-wider uppercase text-slate-700 dark:text-slate-300">
                                    {{ contact.form?.fields?.timelineLabel }}
                                 </label>
                                 <select
                                    v-model="form.timeline"
                                    class="form-select w-full bg-slate-50 dark:bg-[#1f1a15] border border-slate-200 dark:border-[#26201a] rounded-2xl px-4 py-3.5 text-sm text-slate-900 dark:text-slate-300 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-400 focus:bg-white dark:focus:bg-[#16120e] transition-all">
                                    <option disabled value="">{{ contact.form?.fields?.timelineDefault }}</option>
                                    <option v-for="(time, idx) in contact.form?.timelines" :key="idx" :value="time">{{ time }}</option>
                                 </select>
                              </div>
                           </div>

                           <!-- Additional Details -->
                           <div class="form-field-group">
                              <label class="form-label block mb-2 text-xs font-bold tracking-wider uppercase text-slate-700 dark:text-slate-300">
                                 {{ contact.form?.fields?.detailsLabel }}
                              </label>
                              <textarea rows="3"
                                 v-model="form.details"
                                 :placeholder="contact.form?.fields?.detailsPlaceholder"
                                 class="form-textarea w-full bg-slate-50 dark:bg-[#1f1a15] border border-slate-200 dark:border-[#26201a] rounded-2xl px-4 py-3.5 text-sm text-slate-900 dark:text-slate-300 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-400 focus:bg-white dark:focus:bg-[#16120e] transition-all"></textarea>
                           </div>

                           <!-- Submit Button Row -->
                           <div class="form-footer-action flex items-center justify-end pt-2">
                              <button type="submit"
                                 :disabled="isSubmitting"
                                 class="form-submit-btn flex items-center justify-center w-full sm:w-auto gap-2 px-8 py-4 text-xs font-bold text-white dark:text-slate-950 transition-all shadow-md bg-emerald-950 dark:bg-emerald-500 hover:bg-emerald-900 dark:hover:bg-emerald-400 rounded-xl disabled:opacity-50 cursor-pointer">
                                 <Icon v-if="isSubmitting" icon="lucide:loader-2" class="animate-spin text-base" />
                                 <Icon v-else icon="lucide:send" />
                                 {{ isSubmitting ? 'Sending...' : contact.form?.submitButtonText }}
                              </button>
                           </div>

                        </form>
                     </div>
                  </transition>

               </div>

            </div>

         </div>

      </div>
   </section>
</template>

<style scoped>
/* Smooth Transition FX between Form and Success Screen */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.4s ease-in-out;
}

.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.fade-scale-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

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