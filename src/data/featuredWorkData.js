export const featuredWorkData = {
   sectionTag: "FEATURED WORK",
   title: "Real Projects <span class='text-emerald-600 dark:text-emerald-400'>Real Results</span>",
   description: "Here are some of the projects I've worked on for amazing brands and clients around the world.",
   categories: ["All", "Shopify", "WordPress", "Custom Development"],
   projects: [

      {
         id: "ab3d",
         title: "A-B 3D Print",
         category: "Shopify",
         techBadge: "3D Print & Equipment",
         badgeIcon: "lucide:shopping-bag",
         duration: "2 Weeks",
         role: "Shopify Developer",
         liveUrl: "https://ab3dprint.com/",
         liveBtnText: "Live Store Preview",
         description: "Designed and developed a specialized Shopify e-commerce store for A-B 3D Print, a brand focused on high-quality 3D printed accessories, clip containers, and magnetic holders for dog nosework training and tracking sports.",
         image: "ab3d.webp", // Apnar image file name

         // Dynamic Case Study Labels & Content
         challengeTitle: "THE CHALLENGE",
         challenge: "The client required a clean, multi-language international storefront to showcase unique 3D printed products with complex options, while fixing slow mobile load speeds and high cart abandonment.",

         solutionTitle: "THE SOLUTION",
         solution: "Customized Shopify 2.0 sections using Liquid, implemented dynamic variant selections for 3D printed gear, integrated a fast slide-out cart with upsell features, and optimized image/script loading for Core Web Vitals.",

         resultTitle: "THE RESULT",
         result: "Boosted PageSpeed score from 30% to 92%, resulting in a 55% increase in conversion rate and a seamless shopping experience for global customers.",

         ctaBox: {
            title: "Want performance like this?",
            subtitle: "Get a high-speed custom Shopify theme built for sales.",
            buttonText: "Let's Talk",
            buttonLink: "/#contact"
         },

         bottomBanner: {
            title: "Have a similar project in mind?",
            subtitle: "Let's work together to build a fast, scalable, high-converting online store.",
            buttonText: "Get in Touch",
            buttonLink: "/#contact"
         },

         featuresHeading: "KEY DELIVERABLES & ACHIEVEMENTS",
         features: [
            { label: "PageSpeed Score Boosted from 30% to 92%" },
            { label: "+55% Mobile Conversion Growth" },
            { label: "Multi-Language & Multi-Currency Architecture" },
            { label: "Custom Liquid Product Sections for 3D Variants" },
            { label: "Slide-Out Drawer Cart with Instant Upsells" },
            { label: "Mobile-First Responsive Design" }
         ],
         tagsHeading: "TECHNOLOGIES USED",
         tags: ["Shopify 2.0", "Liquid", "JavaScript", "SEO Optimization", "Performance Optimization", "Multi-Language Setup"]
      },
      {
         id: "Ophi Studio",
         title: "OPHI STUDIO",
         category: "Shopify",
         techBadge: "Lifestyle & Fashion Brand",
         badgeIcon: "lucide:code",
         duration: "1 Weeks",
         role: "Shopify Developer",
         liveUrl: "https://ophistudios.co.uk/",
         liveBtnText: "Live Store Preview",
         description: "Designed and developed a modern, high-converting e-commerce store for Ophi Studios, a UK-based lifestyle brand. The primary focus was creating an aesthetically pleasing layout that matches the brand’s identity while delivering a seamless, mobile-responsive shopping experience.",
         image: "ophistudio.webp",

         // Dynamic Case Study Labels & Content
         challengeTitle: "THE CHALLENGE",
         challenge: "The client needed a high-end UK storefront that balanced visual elegance with top-tier search performance and accessible user journeys across mobile devices.",
         solutionTitle: "THE SOLUTION",
         solution: "Customized Shopify 2.0 sections using Liquid, optimized dynamic media assets, implemented high-contrast layout accessibility, and structured clean semantic HTML for full SEO compliance.",
         resultTitle: "THE RESULT",
         result: "Achieved a perfect 100/100 Lighthouse SEO score and 91/100 Accessibility score, resulting in faster load times and an optimized mobile conversion funnel.",

         ctaBox: {
            title: "Want performance like this?",
            subtitle: "Get a high-speed custom Shopify theme built for sales.",
            buttonText: "Let's Talk",
            buttonLink: "/#contact"
         },

         bottomBanner: {
            title: "Have a similar project in mind?",
            subtitle: "Let's work together to build a fast, scalable, high-converting online store.",
            buttonText: "Get in Touch",
            buttonLink: "/#contact"
         },

         featuresHeading: "KEY DELIVERABLES & ACHIEVEMENTS",
         features: [
            { label: "100/100 Lighthouse SEO Performance" },
            { label: "91/100 Accessibility Score" },
            { label: "Dynamic Currency & Multi-Region Setup" },
            { label: "Custom Liquid Sections" },
            { label: "Mobile-First Responsive Architecture" },
            { label: "High-Speed Asset Optimization" }
         ],
         tagsHeading: "TECHNOLOGIES USED",
         tags: ["Shopify", "Liquid", "JavaScript", "CSS3", "SEO Optimization", "Accessibility Compliance", "Performance Optimization", "Multi-Language Setup"]
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