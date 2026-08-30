<script setup>
import { marqueeData } from '../data';
import { useScrollReveal } from '../composables/useScrollReveal';

const marquee = marqueeData.items;
const { elementRef: sectionRef, isVisible } = useScrollReveal();
</script>

<template>
  <section ref="sectionRef" class="bg-[#fbf9f4] dark:bg-[#0f0d0b] py-10 overflow-hidden border-t border-slate-100 dark:border-[#26201a] transition-colors duration-300">
    <div class="w-full overflow-hidden transition-all duration-1000 ease-out"
       :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'">
      <div class="marquee-container flex overflow-hidden relative mask-gradient w-full">
        <div class="marquee-track flex items-center gap-12 animate-marquee">
          <div v-for="n in 3" :key="n" class="flex items-center gap-12 shrink-0">
            <div v-for="(item, iIndex) in marquee" :key="`item-${n}-${iIndex}`" class="flex items-center gap-5 shrink-0">
              <div class="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/50 flex items-center justify-center shrink-0 text-emerald-700 dark:text-emerald-400 text-2xl">
                <div v-html="item.icon"></div>
              </div>
              <div>
                <h4 class="text-base font-extrabold text-slate-900 dark:text-white mb-1 whitespace-nowrap">{{ item.title }}</h4>
                <p class="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed whitespace-nowrap">{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-33.333%); }
}

.animate-marquee {
  display: flex;
  width: max-content;
  will-change: transform;
  animation: marquee 25s linear infinite;
}

.mask-gradient {
  mask-image: linear-gradient(
    to right,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
}
</style>