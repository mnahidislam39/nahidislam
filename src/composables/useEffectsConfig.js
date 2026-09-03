import { reactive } from 'vue';

export const effectsConfig = reactive({
   // 🟢 Mouse Cursor Effects
   magneticCursor: true,   // Custom Smooth Glowing Cursor & Ring
   waterRipple: false,     // Interactive Fluid / Water Wave Trail
   
   // 🟢 Card & Button Effects
   tilt3DCard: true,       // 3D Card Tilt with Shine / Glow Reflection
   magneticButtons: true,  // Buttons magnetic pull effect

   // 🟢 Background Effects
   gridSpotlight: true,    // Vercel / Stripe-style Background Grid & Spotlight Glow

   // 🟢 Text & Scroll Effects
   textReveal: true,       // Scroll-triggered Text Reveal Animation
   smoothScroll: true,     // Lenis / Silky Smooth Scroll
});

// Helper function to easily toggle from anywhere
export function setEffect(effectName, status) {
   if (effectName in effectsConfig) {
      effectsConfig[effectName] = status;
   }
}