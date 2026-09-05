export const featuredWorkData = {
   sectionTag: "FEATURED WORK",
   title: "Real Projects <span class='text-emerald-600 dark:text-emerald-400'>Real Results</span>",
   description: "Here are some of the projects I've worked on for amazing brands and clients around the world.",
   categories: ["All", "Shopify", "WordPress", "Custom Development"],
   projects: [
      {
         id: "ab3d",
         title: "ab3d",
         category: "Shopify",
         techBadge: "Shopify Development",
         badgeIcon: "lucide:shopping-bag",
         description: "An advanced e-commerce store built for motorcycle gear enthusiasts with automated inventory sync.",
          image: 'ab3d.webp',
         features: [
            { label: "Custom Liquid" },
            { label: "Fast Checkout" }
         ]
      },
      {
         id: "Ophi Studio",
         title: "Ophi Studio",
         category: "Shopify",
         techBadge: "Shopify Customization",
         badgeIcon: "lucide:code",
         description: "High-performance storefront featuring custom product filtering and responsive design.",
         image: 'ophistudio.webp',
         features: [
            { label: "Optimized Speed" },
            { label: "Advanced Filter" }
         ]
      },
      {
         id: "beauty-essentials",
         title: "Beauty Essentials",
         category: "Custom Development",
         techBadge: "Vue.js & Tailwind",
         badgeIcon: "lucide:layout",
         description: "Tailor-made e-commerce platform crafted with modern dark UI aesthetics and smooth transitions.",
          image: 'beauty.webp',
         features: [
            { label: "Dark UI Design" },
            { label: "API Integrated" }
         ]
      },
      {
         id: "Funny Pets",
         title: "Funny Pets",
         category: "Custom Development",
         techBadge: "Vue.js & Tailwind",
         badgeIcon: "lucide:layout",
         description: "Tailor-made e-commerce platform crafted with modern dark UI aesthetics and smooth transitions.",
          image: 'f.webp',
         features: [
            { label: "Dark UI Design" },
            { label: "API Integrated" }
         ]
      }
   ],
   stats: [
      { icon: "lucide:briefcase", value: "100+", label: "Projects Completed" },
      { icon: "lucide:smile", value: "50+", label: "Happy Clients" },
      { icon: "lucide:globe", value: "10+", label: "Countries Served" },
      { icon: "lucide:star", value: "5.0", label: "Average Rating" }
   ],
   quoteBox: {
      quote: "I take pride in building websites and applications that help businesses grow and succeed online.",
      buttonText: "Let's Build Something Amazing",
      buttonLink: "#contact"
   }
};