export const faqData = {
   sectionTag: "FAQ",
   title: "Frequently Asked <span class='text-emerald-600 dark:text-emerald-400'>Questions.</span>",
   description: "Find clear answers to common questions about services, process, and technical capabilities before starting a project.",
   
   helpBox: {
      title: "Still have questions?",
      description: "I'm happy to help! Let's discuss your project and find the best solution for you.",
      buttonText: "Let's Talk",
      buttonLink: "#contact"
   },

   features: [
      {
         icon: "lucide:shield-check",
         title: "100% Satisfaction",
         description: "Client satisfaction is my top priority."
      },
      {
         icon: "lucide:clock",
         title: "On-Time Delivery",
         description: "I respect your time and always deliver on schedule."
      },
      {
         icon: "lucide:message-square",
         title: "Clear Communication",
         description: "You'll always be updated at every step."
      },
      {
         icon: "lucide:lock",
         title: "Data Security",
         description: "Your project data is completely secure."
      }
   ],

   // Categorized Questions Order: 1. Shopify -> 2. WordPress -> 3. Custom / Process
   questions: [
      // ================= SHOPIFY =================
      {
         category: "Shopify",
         icon: "lucide:shopping-bag",
         question: "01. What Shopify services do you offer?",
         answer: "I offer end-to-end Shopify development including custom Liquid theme creation, Shopify 2.0 section architecture, store setup, app integrations, and conversion rate optimization."
      },
      {
         category: "Shopify",
         icon: "lucide:store",
         question: "02. Can you build a Shopify store from scratch?",
         answer: "Yes. I develop fully customized, high-converting Shopify stores tailored to your brand identity, complete with optimized product pages, cart drawers, and mobile UX."
      },
      {
         category: "Shopify",
         icon: "lucide:wrench",
         question: "03. Can you customize existing Shopify themes or fix bugs?",
         answer: "Yes. I can modify your current Shopify theme, create bespoke Liquid sections, troubleshoot layout/script issues, and improve your mobile PageSpeed scores."
      },

      // ================= WORDPRESS =================
      {
         category: "WordPress",
         icon: "lucide:layout-template",
         question: "04. Do you develop WordPress and WooCommerce websites?",
         answer: "Yes. I build custom WordPress websites and WooCommerce online stores with Elementor or custom block themes, focused on fast loading speeds and easy content management."
      },
      {
         category: "WordPress",
         icon: "lucide:globe",
         question: "05. Can you customize an existing WordPress website?",
         answer: "Yes. I handle design revamps, plugin integration, speed optimization, responsive layout fixes, and ongoing maintenance for existing WordPress sites."
      },

      // ================= CUSTOM DEVELOPMENT & PROCESS =================
      {
         category: "Custom",
         icon: "lucide:figma",
         question: "06. Can you convert Figma designs into code?",
         answer: "Yes. I translate Figma designs into pixel-perfect, responsive code for Shopify themes, WordPress sites, or custom Vue.js/Laravel web applications."
      },
      {
         category: "Custom",
         icon: "lucide:code-2",
         question: "07. Can you build custom web applications?",
         answer: "Yes. Using JavaScript, Vue.js, PHP, Laravel, and MySQL, I build custom web applications, admin dashboards, and dynamic database-driven features."
      },
      {
         category: "Custom",
         icon: "lucide:zap",
         question: "08. Can you fix website bugs and optimize performance?",
         answer: "Yes. I diagnose technical performance bottlenecks and optimize Core Web Vitals, scripts, and asset loading to achieve 90+ speed scores on mobile and desktop."
      },
      {
         category: "Custom",
         icon: "lucide:messages-square",
         question: "09. How do you handle project communication?",
         answer: "I maintain clear and regular updates through direct messaging or email, keeping project goals, progress, and deliverables transparent throughout development."
      },
      {
         category: "Custom",
         icon: "lucide:rocket",
         question: "10. How do I start a project with you?",
         answer: "Simply send your project brief through the contact form below or via email. I will review your requirements and respond within 24 hours to discuss the next steps."
      }
   ],

   ctaBanner: {
      title: "Ready to Start Your Project?",
      description: "Let's turn your ideas into a stunning, high-converting store.",
      highlights: [
         { icon: "lucide:message-square-text", title: "Fast Response", desc: "Within 24 Hours" },
         { icon: "lucide:shield-check", title: "Free Consultation", desc: "No Obligation" },
         { icon: "lucide:thumbs-up", title: "Satisfaction", desc: "Guaranteed" }
      ],
      buttonText: "Submit a Project Inquiry",
      buttonLink: "#contact"
   }
};