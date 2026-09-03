import { reactive } from 'vue';

// ⚙️ এখান থেকে যেকোনো ইফেক্ট true/false করে On/Off করতে পারবেন
export const premiumConfig = reactive({
   spotlightGlow: true,  // মাউসের পেছনে ব্যাকগ্রাউন্ড স্পটলাইট গ্লো
   tilt3D: true,         // সার্ভিস/প্রজেক্ট কার্ডগুলোতে ৩D টিল্ট
   magneticButtons: true,// বাটনে মাউস নিলে ম্যাগনেটিক ফিল
   smoothScroll: true    // সিল্কি স্মুথ স্ক্রোলিং
});

export function toggleEffect(effectName, status) {
   if (effectName in premiumConfig) {
      premiumConfig[effectName] = status;
   }
}