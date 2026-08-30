import { ref, onMounted, onUnmounted } from 'vue';

// ==========================================
// GLOBAL CONFIGURATION (এক জায়গা থেকে কন্ট্রোল করুন)
// ==========================================
const REPEAT_ANIMATION = true; 

export function useScrollReveal(options = { threshold: 0.1 }) {
   const elementRef = ref(null);
   const isVisible = ref(false);
   let observer = null;

   onMounted(() => {
      observer = new IntersectionObserver(
         ([entry]) => {
            if (REPEAT_ANIMATION) {
               // বারবার টগল করার জন্য
               isVisible.value = entry.isIntersecting;
            } else {
               // একবার অ্যানিমেশন হয়ে থেমে যাওয়ার জন্য
               if (entry.isIntersecting) {
                  isVisible.value = true;
                  if (observer && elementRef.value) {
                     observer.unobserve(elementRef.value);
                  }
               }
            }
         },
         { threshold: options.threshold || 0.1 }
      );

      if (elementRef.value) {
         observer.observe(elementRef.value);
      }
   });

   onUnmounted(() => {
      if (observer) {
         observer.disconnect();
      }
   });

   return {
      elementRef,
      isVisible
   };
}