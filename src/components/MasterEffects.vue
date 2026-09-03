<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { effectsConfig } from '../composables/useEffectsConfig';

// ------------------------------------------------------------------
// 1. MOUSE CURSOR & SPOTLIGHT STATE
// ------------------------------------------------------------------
const mouseX = ref(-200);
const mouseY = ref(-200);
const ringX = ref(-200);
const ringY = ref(-200);
const isHovered = ref(false);

// ------------------------------------------------------------------
// 2. WATER RIPPLE STATE
// ------------------------------------------------------------------
const rippleCanvas = ref(null);
let rippleCtx = null;
let ripples = [];

const createRipple = (x, y) => {
   if (!effectsConfig.waterRipple) return;
   ripples.push({ x, y, radius: 2, alpha: 0.7 });
};

const renderRipples = () => {
   if (rippleCtx && effectsConfig.waterRipple) {
      rippleCtx.clearRect(0, 0, rippleCanvas.value.width, rippleCanvas.value.height);
      ripples.forEach((r, index) => {
         r.radius += 1.8;
         r.alpha -= 0.015;

         rippleCtx.beginPath();
         rippleCtx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
         rippleCtx.strokeStyle = `rgba(4, 105, 71, ${r.alpha})`;
         rippleCtx.lineWidth = 1.8;
         rippleCtx.stroke();

         if (r.alpha <= 0) ripples.splice(index, 1);
      });
   }
   requestAnimationFrame(renderRipples);
};

// ------------------------------------------------------------------
// 3. MOUSE MOVE EVENT HANDLER
// ------------------------------------------------------------------
const handleMouseMove = (e) => {
   const x = e.clientX;
   const y = e.clientY;
   
   mouseX.value = x;
   mouseY.value = y;

   // Check hover for magnetic cursor
   const target = e.target;
   isHovered.value = !!target.closest('a, button, input, textarea, .btn-magnetic, .tilt-card');

   // Ripple Trigger
   createRipple(x, y);

   // 3D Tilt Card Logic
   if (effectsConfig.tilt3DCard) {
      // Fix 1: Selector Class Name Added (.tilt-card)
      const tiltCards = document.querySelectorAll('.tilt-card');
      tiltCards.forEach(card => {
         const rect = card.getBoundingClientRect();
         const cardX = x - rect.left;
         const cardY = y - rect.top;

         if (cardX >= 0 && cardX <= rect.width && cardY >= 0 && cardY <= rect.height) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((cardY - centerY) / centerY) * -12;
            const rotateY = ((cardX - centerX) / centerX) * 12;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.setProperty('--glow-x', `${(cardX / rect.width) * 100}%`);
            card.style.setProperty('--glow-y', `${(cardY / rect.height) * 100}%`);
         } else {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
         }
      });
   }

   // Magnetic Buttons Logic
   if (effectsConfig.magneticButtons) {
      // Fix 2: Selector Class Name Added (.btn-magnetic)
      const magBtns = document.querySelectorAll('.btn-magnetic');
      magBtns.forEach(btn => {
         const rect = btn.getBoundingClientRect();
         const btnX = x - (rect.left + rect.width / 2);
         const btnY = y - (rect.top + rect.height / 2);
         const distance = Math.sqrt(btnX * btnX + btnY * btnY);

         if (distance < 70) {
            btn.style.transform = `translate3d(${btnX * 0.35}px, ${btnY * 0.35}px, 0)`;
         } else {
            btn.style.transform = 'translate3d(0, 0, 0)';
         }
      });
   }
};

// Smooth Cursor Ring Animation
const animateRing = () => {
   if (effectsConfig.magneticCursor) {
      ringX.value += (mouseX.value - ringX.value) * 0.15;
      ringY.value += (mouseY.value - ringY.value) * 0.15;
   }
   requestAnimationFrame(animateRing);
};

// ------------------------------------------------------------------
// 4. TEXT REVEAL ON SCROLL LOGIC
// ------------------------------------------------------------------
const handleScrollReveal = () => {
   if (!effectsConfig.textReveal) return;
   const elements = document.querySelectorAll('.text-reveal');
   elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
         el.classList.add('revealed');
      }
   });
};

// ------------------------------------------------------------------
// LIFECYCLE
// ------------------------------------------------------------------
const handleResize = () => {
   if (rippleCanvas.value) {
      rippleCanvas.value.width = window.innerWidth;
      rippleCanvas.value.height = window.innerHeight;
   }
};

onMounted(() => {
   window.addEventListener('mousemove', handleMouseMove);
   window.addEventListener('scroll', handleScrollReveal);
   window.addEventListener('resize', handleResize);

   if (rippleCanvas.value) {
      rippleCtx = rippleCanvas.value.getContext('2d');
      handleResize();
      renderRipples();
   }

   animateRing();
   handleScrollReveal();
});

onUnmounted(() => {
   window.removeEventListener('mousemove', handleMouseMove);
   window.removeEventListener('scroll', handleScrollReveal);
   window.removeEventListener('resize', handleResize);
});
</script>

<template>
   <div class="master-effects-wrapper">
      
      <div v-if="effectsConfig.gridSpotlight" class="pointer-events-none fixed inset-0 z-0 overflow-hidden">
         <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
         <div 
            class="absolute w-[500px] h-[500px] rounded-full bg-[#046947]/15 dark:bg-[#00d492]/10 blur-[110px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
            :style="{ left: `${mouseX}px`, top: `${mouseY}px` }"
         ></div>
      </div>

      <canvas v-show="effectsConfig.waterRipple" ref="rippleCanvas" class="pointer-events-none fixed inset-0 z-[9998]"></canvas>

      <div v-if="effectsConfig.magneticCursor" class="pointer-events-none fixed inset-0 z-[9999]">
         <div 
            class="fixed top-0 left-0 w-2.5 h-2.5 bg-[#046947] dark:bg-[#00d492] rounded-full -translate-x-1/2 -translate-y-1/2"
            :style="{ transform: `translate3d(${mouseX}px, ${mouseY}px, 0)` }"
         ></div>
         <div 
            class="fixed top-0 left-0 w-9 h-9 border border-[#046947]/70 dark:border-[#00d492]/70 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
            :class="{ 'scale-150 bg-[#046947]/15 dark:bg-[#00d492]/20 border-[#046947] dark:border-[#00d492]': isHovered }"
            :style="{ transform: `translate3d(${ringX}px, ${ringY}px, 0)` }"
         ></div>
      </div>

   </div>
</template>

<style>
/* 4. Smooth Scroll Support */
html {
   scroll-behavior: smooth;
}

/* 5. 3D Tilt Card Base & Glow Overlay Style */
.tilt-card {
   position: relative;
   will-change: transform;
   transform-style: preserve-3d;
   transition: transform 0.2s ease-out;
   cursor: pointer;
}
.tilt-card::before {
   content: '';
   position: absolute;
   inset: 0;
   border-radius: inherit;
   background: radial-gradient(400px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(4, 105, 71, 0.15), transparent 80%);
   pointer-events: none;
   opacity: 0;
   transition: opacity 0.3s;
}
.tilt-card:hover::before {
   opacity: 1;
}

/* 6. Magnetic Buttons Transition */
.btn-magnetic {
   display: inline-block;
   will-change: transform;
   transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1);
}

/* 7. Text Reveal Style */
.text-reveal {
   opacity: 0;
   transform: translateY(30px);
   transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.text-reveal.revealed {
   opacity: 1;
   transform: translateY(0);
}
</style>