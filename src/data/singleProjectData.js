
export const singleProjectData = {

   header: {
      // logoText: "Nahid Islam",
      logoImg: "/nahid-logo.png",
      navLinks: [
         { name: "Home", href: "#home" },
         { name: "Services", href: "#services" },
         { name: "Projects", href: "#featuredWork" },
         { name: "About Me", href: "#about" },
         { name: "Contact", href: "#contact" },
         { name: "Testimonials", href: "#testimonials" }
      ],
      ctaText: "Let's Talk",
      ctaLink: "#contact"
   },

   hero: {
      badge: "Shopify Expert & Full Stack Developer",
      titlePrefix: "I'm",
      highlightName: "Nahid Islam  ",
      subtitle: "Shopify Expert Building High-Converting, Scalable Stores",
      heroDescription: "Custom Shopify development, theme customization, performance optimization and conversion-focused eCommerce experiences.",

      // flowTitle: "Follow Me",
      // socials: [
      //    { icon: "fa6-brands:facebook-f", link: "#" },
      //    { icon: "fa6-brands:x-twitter", link: "#" },
      //    { icon: "fa6-brands:pinterest-p", link: "#" },
      //    { icon: "fa6-brands:instagram", link: "#" }
      // ],


      reviewCount: "350+ Reviews",
      reviewRating: "(4.9 of 5)",
      reviewSubtext: "Reviews from Valued Clients",
      quote: "Highly Professional Developer with Great Expertise!",

      skillIcons: [
         { name: "Postman", icon: "logos:postman", style: "amber" },
         { name: "github", icon: "logos:github", style: "amber" },
         { name: "Git", icon: "logos:git", style: "amber" },
         { name: "WordPress", icon: "logos:wordpress-icon", style: "amber" },
         { name: "MySQL", icon: "logos:mysql", style: "amber" },
         { name: "Laravel", icon: "logos:laravel", style: "dark" },
         { name: "PHP", icon: "logos:php", style: "dark" },
         { name: "Vue.js", icon: "logos:vue", style: "amber" },
         { name: "JavaScript", icon: "logos:javascript", style: "dark" },
         { name: "Shopify", icon: "logos:shopify", style: "amber" },
      ],

      primaryCta: { text: "View Shopify Work", link: "#selected-work" },
      secondaryCta: { text: "Start a Project", link: "#contact" },
      image: "/na.png"
   },

   techStack: {
      id: "tech-stack",
      sectionNumber: "02. TRUST / TECH STACK",
      headline: 'Focused on <span class="text-emerald-600">Shopify.</span> Capable across the modern web.',
      description: "I combine deep expertise in Shopify development with modern technologies to deliver fast, scalable and future-ready solutions.",
      footerText: "Modern tools. Clean code. Better solutions.",
      skills: [
         {
            name: "SHOPIFY",
            icon: "logos:shopify"
         },
         {
            name: "LIQUID",
            icon: "lucide:droplet"
         },
         {
            name: "WORDPRESS",
            icon: "logos:wordpress-icon"
         },
         {
            name: "JAVASCRIPT",
            icon: "logos:javascript"
         },
         {
            name: "VUE.JS",
            icon: "logos:vue"
         },
         {
            name: "PHP",
            icon: "logos:php"
         },
         {
            name: "LARAVEL",
            icon: "logos:laravel"
         },
         {
            name: "MYSQL",
            icon: "logos:mysql"
         }
      ]
   },


   services: {
      id: "services",
      sectionNumber: "03. SERVICES",
      headline: "What I Can Build For You",
      description: "From Shopify storefronts to custom web solutions, I help businesses grow with clean design and powerful development.",
      cards: [
         {
            title: "Shopify Development",
            isPrimary: true,
            badge: "PRIMARY EXPERTISE",
            icon: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10 text-[#95BF47]"><path d="M15.346 3.679c-.11-.067-.257-.084-.383-.02l-6.423 3.12-2.52-1.332a.456.456 0 0 0-.46.037c-.12.09-.174.24-.136.379l1.83 6.786-2.835 1.353a.465.465 0 0 0-.236.467c.03.212.19.38.4.42l3.411.696 1.418 5.753c.045.183.2.313.388.318.01 0 .02 0 .03-.002.176-.03.32-.152.378-.323l4.895-14.773a.448.448 0 0 0-.173-.505z"/></svg>`,
            features: [
               "Custom Shopify Store Development",
               "Shopify Theme Customization",
               "Shopify 2.0 Development",
               "Liquid Development",
               "Custom Sections & Templates",
               "App Integration",
               "Bug Fixes & Troubleshooting",
               "Performance Optimization",
               "Conversion-Focused Design"
            ],
            buttonText: "Explore Shopify Services",
            buttonLink: "#"
         },
         {
            title: "WordPress Development",
            isPrimary: false,
            icon: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10 text-[#21759B]"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.127 19.362-3.15-8.685h2.115l1.058 3.242 1.05-3.242h2.094l-3.167 8.685z"/></svg>`,
            features: [
               "WordPress Website Development",
               "WooCommerce Development",
               "Custom Theme Development",
               "Elementor & Page Builder",
               "Plugin Customization",
               "Responsive Design",
               "Performance Optimization",
               "Website Maintenance"
            ],
            buttonText: "Explore WordPress Services",
            buttonLink: "#"
         },
         {
            title: "Custom Web Development",
            isPrimary: false,
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-10 h-10 text-slate-900"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>`,
            features: [
               "Custom Website Development",
               "HTML, CSS, SCSS, Tailwind CSS",
               "JavaScript & jQuery",
               "Vue.js Development",
               "PHP Development",
               "Laravel Development",
               "API Development",
               "Database Design (MySQL)"
            ],
            buttonText: "Explore Custom Services",
            buttonLink: "#"
         }
      ],
      featuresBottom: [
         {
            title: "Fast Delivery",
            desc: "On-time delivery with high quality.",
            icon: `<svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`
         },
         {
            title: "Clean & Secure Code",
            desc: "Maintainable, scalable and secure code.",
            icon: `<svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`
         },
         {
            title: "Fully Responsive",
            desc: "Perfect experience on every device.",
            icon: `<svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`
         },
         {
            title: "Clear Communication",
            desc: "Transparent updates throughout the project.",
            icon: `<svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>`
         }
      ]
   },


   selectedWork: {
      id: "selected-work",
      sectionNumber: "04. SELECTED SHOPIFY WORK",
      headline: "Selected Shopify Work",
      description: "A selection of Shopify experiences focused on usability, performance and conversion.",
      mainButtonText: "View All Projects",
      mainButtonLink: "#",
      featuredProject: {
         badge: "FEATURED PROJECT",
         title: "Vevano Home",
         description: "Premium home décor store with custom Shopify theme, mega menu, advanced filtering and optimized shopping experience.",
         tags: ["Shopify", "Liquid", "Custom Theme", "eCommerce"],
         caseStudyText: "View Case Study",
         caseStudyLink: "#",
         // placeholder or SVG/Image representation for project preview
         imageHtml: `<div class="w-full h-full bg-slate-100 flex items-center justify-center overflow-hidden rounded-2xl border border-slate-200/60 shadow-sm"><img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80" alt="Vevano Home" class="w-full h-full object-cover"/></div>`
      },
      projects: [
         {
            title: "Luminos Skin",
            description: "Skincare store with custom sections, product bundles, and subscription functionality.",
            tags: ["Shopify", "Liquid", "Subscription", "Responsive"],
            caseStudyText: "View Case Study",
            caseStudyLink: "#",
            imageHtml: `<div class="w-full h-52 bg-slate-100 overflow-hidden rounded-2xl border border-slate-200/60 shadow-sm mb-6"><img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80" alt="Luminos Skin" class="w-full h-full object-cover"/></div>`
         },
         {
            title: "Aurora Eyewear",
            description: "Modern Shopify store with advanced product filtering and quick view.",
            tags: ["Shopify", "Liquid", "Filtering", "Quick View"],
            caseStudyText: "View Case Study",
            caseStudyLink: "#",
            imageHtml: `<div class="w-full h-52 bg-slate-100 overflow-hidden rounded-2xl border border-slate-200/60 shadow-sm mb-6"><img src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80" alt="Aurora Eyewear" class="w-full h-full object-cover"/></div>`
         },
         {
            title: "Nutrify",
            description: "Health supplement store with custom theme, upsell offers and performance optimization.",
            tags: ["Shopify", "Custom Theme", "Upsell", "Performance"],
            caseStudyText: "View Case Study",
            caseStudyLink: "#",
            imageHtml: `<div class="w-full h-52 bg-slate-100 overflow-hidden rounded-2xl border border-slate-200/60 shadow-sm mb-6"><img src="https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=800&q=80" alt="Nutrify" class="w-full h-full object-cover"/></div>`
         }
      ],
      ctaBox: {
         title: "Have a similar project in mind?",
         description: "I help brands build Shopify stores that are fast, scalable and focused on driving real results.",
         buttonText: "Start a Project",
         buttonLink: "#"
      }
   },

   caseStudy: {
      id: "case-study",
      sectionNumber: "05. CASE STUDY",
      headline: "From Challenge to Conversion",
      description: "How we built a high-performing Shopify store that drives results.",
      metaInfo: [
         { label: "Project", value: "Vevano Home" },
         { label: "Platform", value: "Shopify" },
         { label: "Category", value: "Home Décor" },
         { label: "Role", value: "Design & Development" }
      ],
      sections: [
         {
            title: "THE CHALLENGE",
            text: "The client needed a modern, high-end Shopify store with advanced filtering, a smooth shopping experience, and a design that reflects their premium brand.",
            icon: `<svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`
         },
         {
            title: "THE APPROACH",
            text: "We planned the structure, designed a clean UI and developed a custom theme with performance and usability in mind.",
            icon: `<svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>`
         },
         {
            title: "THE SOLUTION",
            text: "A fully customized Shopify theme with advanced product filtering, custom sections, mega menu, and optimized speed for better conversions.",
            icon: `<svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>`
         },
         {
            title: "THE RESULT",
            text: "A fast, responsive store with improved user experience that helped increase engagement and conversions.",
            icon: `<svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>`
         }
      ],
      stats: [
         { value: "40%", sub: "Increase in site speed", desc: "(Page load time)", isUp: true },
         { value: "25%", sub: "Increase in add to cart", desc: "rate", isUp: true },
         { value: "30%", sub: "Increase in overall", desc: "conversion rate", isUp: true },
         { value: "100%", sub: "Fully responsive across", desc: "all devices", isUp: false }
      ],
      mainButtonText: "View Full Case Study",
      mainButtonLink: "#",
      mockupImageHtml: `<div class="w-full h-full bg-slate-100 rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm"><img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80" alt="Vevano Preview" class="w-full h-full object-cover"/></div>`,
      testimonial: {
         quote: "Nahid understood our brand vision perfectly and delivered a Shopify store that not only looks premium but also converts. The performance is fantastic!",
         author: "Vevano Home",
         role: "Owner",
         website: "vevano.com"
      }
   },

   moreThanShopify: {
      id: "services",
      sectionNumber: "06. MORE THAN SHOPIFY",
      headline: "Shopify is my specialty. Full-stack development is my foundation.",
      description: "While Shopify is my primary focus, my full-stack background allows me to build powerful solutions across multiple platforms and technologies.",
      cards: [
         {
            number: "01",
            title: "Shopify",
            subtitle: "Primary Expertise",
            description: "End-to-end Shopify development and customization that drives results for eCommerce businesses.",
            features: [
               "Shopify Store Development",
               "Theme Development & Customization",
               "Liquid Programming",
               "Shopify 2.0 Development",
               "Custom Sections & Templates",
               "App Integration",
               "Performance Optimization"
            ],
            previewImage: `<div class="w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-4 shadow-sm"><img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80" alt="Shopify Preview" class="w-full h-36 object-cover rounded-xl"/></div>`
         },
         {
            number: "02",
            title: "WordPress",
            subtitle: "CMS Development",
            description: "Custom WordPress solutions that are fast, secure and easy to manage.",
            features: [
               "WordPress Development",
               "WooCommerce Solutions",
               "Custom Theme Development",
               "Plugin Customization",
               "Elementor Development",
               "Speed Optimization",
               "Website Maintenance"
            ],
            previewImage: `<div class="w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-4 shadow-sm"><img src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80" alt="WordPress Preview" class="w-full h-36 object-cover rounded-xl"/></div>`
         },
         {
            number: "03",
            title: "Full-Stack",
            subtitle: "Custom Solutions",
            description: "Custom web applications and solutions using modern technologies.",
            features: [
               "HTML, CSS, SCSS, Tailwind CSS",
               "JavaScript & jQuery",
               "Vue.js Development",
               "PHP Development",
               "Laravel Development",
               "API Development",
               "MySQL Database Design"
            ],
            previewImage: `<div class="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm text-emerald-400 font-mono text-xs overflow-hidden h-36 flex items-center justify-center"><code>// Code Architecture<br/>const fullStack = true;<br/>function build() { return success; }</code></div>`
         }
      ],
      ctaBox: {
         title: "One Developer. Multiple Solutions.",
         description: "You get the advantage of working with a developer who understands both the business and the technology.",
         buttonText: "Start a Project",
         buttonLink: "#"
      }
   },

   professionalExperience: {
      id: "professional-experience",
      sectionNumber: "07. PROFESSIONAL EXPERIENCE",
      headline: "Professional Experience",
      description: "My journey as a developer, working on real projects, solving problems and delivering value for businesses.",
      authorName: "Nahid Islam",
      authorTitle: "Shopify Expert & Full-Stack Developer",
      stats: [
         { label: "Professional Experience", value: "3+ Years", icon: "briefcase" },
         { label: "Projects Completed", value: "100+", icon: "projects" },
         { label: "Technologies Mastered", value: "10+", icon: "code" },
         { label: "Happy Clients", value: "50+", icon: "clients" }
      ],
      experiences: [
         {
            role: "Shopify Developer / Team Lead",
            company: "Ilmify Tech Agency",
            duration: "Oct 2024 – Present",
            status: "Current",
            description: "Working as a Shopify Developer and Team Lead, handling Shopify store development, theme customization and guiding team members to deliver high-quality solutions for clients.",
            skills: ["Shopify Development", "Liquid", "Shopify 2.0", "Theme Customization", "Team Leadership"],
            icon: "briefcase"
         },
         {
            role: "Shopify CMS Frontend Developer",
            company: "Softvence Omega",
            duration: "Jan 2023 – Sep 2024",
            status: "",
            description: "Developed and customized Shopify themes, implemented custom sections, fixed bugs, and optimized store performance for better user experience.",
            skills: ["Shopify", "Liquid", "JavaScript", "Performance Optimization"],
            icon: "shopify"
         },
         {
            role: "WordPress Developer (Freelance)",
            company: "",
            duration: "2022 – 2023",
            status: "",
            description: "Built responsive WordPress websites for clients, including business websites and eCommerce stores using WooCommerce.",
            skills: ["WordPress", "WooCommerce", "Elementor", "Custom Themes"],
            icon: "wordpress"
         },
         {
            role: "Full-Stack Developer (Learning & Projects)",
            company: "",
            duration: "2021 – 2022",
            status: "",
            description: "Completed multiple projects using PHP, Laravel, Vue.js and MySQL. Built web applications and improved problem-solving and programming skills.",
            skills: ["Laravel", "Vue.js", "PHP", "MySQL", "JavaScript"],
            icon: "code"
         }
      ],
      footerQuote: {
         quote: "I believe in continuous learning, clean code and building products that make a real impact.",
         subText1: "Always learning.",
         subText2: "Always building."
      }
   },

   process: {
      sectionTag: "09. MY PROCESS",
      title: "My Process. Simple, Clear, <span class='text-emerald-600'>Effective.</span>",
      description: "A proven workflow that ensures your project is delivered on time, on budget and beyond expectations.",
      quote: "I follow a transparent and client-focused process to deliver high-quality solutions that drive real results.",
      author: "Nahid Islam",
      role: "Shopify Expert & Full-Stack Developer",
      steps: [
         {
            number: "01",
            icon: "lucide:message-square",
            title: "Discovery & Planning",
            description: "I understand your business, goals and requirements in detail.",
            features: ["Project Discussion", "Requirement Analysis", "Strategy & Roadmap"]
         },
         {
            number: "02",
            icon: "lucide:file-text",
            title: "Design & Prototyping",
            description: "I design a clean, user-friendly UI/UX that reflects your brand and converts.",
            features: ["Wireframing", "UI/UX Design", "Design Approval"]
         },
         {
            number: "03",
            icon: "lucide:code",
            title: "Development",
            description: "I bring the design to life with clean, efficient and scalable code.",
            features: ["Theme Development", "Custom Features", "App Integration"]
         },
         {
            number: "04",
            icon: "lucide:settings",
            title: "Testing & Quality Check",
            description: "I test everything carefully to ensure a smooth and bug-free experience.",
            features: ["Functional Testing", "Responsive Testing", "Cross-Browser Testing"]
         },
         {
            number: "05",
            icon: "lucide:rocket",
            title: "Launch & Deployment",
            description: "Your store/website goes live, optimized for speed and performance.",
            features: ["Final Optimization", "Store/Website Launch", "Environment Setup"]
         },
         {
            number: "06",
            icon: "lucide:headphones",
            title: "Support & Growth",
            description: "I provide ongoing support and improvements to help your business grow.",
            features: ["Post-Launch Support", "Performance Monitoring", "Continuous Improvement"]
         }
      ]
   },

   featuredWork: {
      sectionTag: "10. FEATURED WORK",
      title: "Real Projects. <span class='text-emerald-600 dark:text-emerald-400'>Real Results.</span>",
      description: "Here are some of the projects I've worked on for amazing brands and clients around the world.",
      categories: ["All Projects", "Shopify", "WordPress", "Webflow", "Custom Development"],
      projects: [
         {
            id: "kangroute-gear",
            title: "Kangroute Motorcycle Gear",
            category: "Shopify",
            techBadge: "Shopify Development",
            badgeIcon: "lucide:shopping-bag",
            description: "An advanced e-commerce store built for motorcycle gear enthusiasts with automated inventory sync.",
            image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
            features: [
               { label: "Custom Liquid" },
               { label: "Fast Checkout" }
            ]
         },
         {
            id: "motogear-pro",
            title: "MotoGear Pro Storefront",
            category: "Shopify",
            techBadge: "Shopify Customization",
            badgeIcon: "lucide:code",
            description: "High-performance storefront featuring custom product filtering and responsive design.",
            image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80",
            features: [
               { label: "Optimized Speed" },
               { label: "Advanced Filter" }
            ]
         },
         {
            id: "urban-riders",
            title: "Urban Riders Hub",
            category: "Custom Development",
            techBadge: "Vue.js & Tailwind",
            badgeIcon: "lucide:layout",
            description: "Tailor-made e-commerce platform crafted with modern dark UI aesthetics and smooth transitions.",
            image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&w=800&q=80",
            features: [
               { label: "Dark UI Design" },
               { label: "API Integrated" }
            ]
         },
         {
            id: "urban-riders",
            title: "Urban Riders Hub",
            category: "Custom Development",
            techBadge: "Vue.js & Tailwind",
            badgeIcon: "lucide:layout",
            description: "Tailor-made e-commerce platform crafted with modern dark UI aesthetics and smooth transitions.",
            image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&w=800&q=80",
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
   },

   testimonials: {
      sectionTag: "11. CLIENT FEEDBACK",
      title: "Trusted by Clients, Proven by <span class='text-emerald-600'>Results.</span>",
      description: "I'm proud to have helped amazing clients turn their ideas into successful digital experiences.",
      rating: "5.0",
      reviewCount: "Based on 50+ reviews across platforms",
      featuredReview: {
         quote: "Nahid is an exceptional Shopify developer. He delivered a high-quality store that exceeded my expectations. Great communication, fast delivery, and excellent problem-solving skills. Highly recommend!",
         author: "James Carter",
         role: "Founder, Luxora"
      },
      clientLogos: [
         { name: "LUXORA" },
         { name: "GreenLeaf" },
         { name: "TaskPro" },
         { name: "Brandify" },
         { name: "NexaStore" }
      ],
      reviews: [
         {
            quote: "Nahid did an outstanding job customizing our Shopify store. He understood our requirements perfectly and delivered on time. Will definitely work with him again!",
            name: "Michael Brown",
            role: "E-commerce Entrepreneur",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
            icon: "lucide:shopping-bag"
         },
         {
            quote: "\"Very professional and skilled developer. He fixed issues on our Shopify store and improved the speed significantly. Highly recommended!\"",
            name: "Sophia Williams",
            role: "Store Owner",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
            icon: "lucide:shopping-bag"
         },
         {
            quote: "\"Nahid built a clean and modern WordPress website for our business. Great attention to detail and excellent support throughout the project.\"",
            name: "David Thompson",
            role: "Marketing Manager",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
            icon: "lucide:globe"
         },
         {
            quote: "He developed a custom web application for our team that streamlined our workflow. Very reliable and easy to work with. Excellent experience!",
            name: "Daniel Smith",
            role: "CTO, TechSolutions",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
            icon: "lucide:code"
         },
      ]
   },

   faq: {
      sectionTag: "11. FAQ",
      title: "Frequently Asked <span class='text-emerald-600'>Questions.</span>",
      description: "Find answers to some of the most common questions my clients ask before starting a project.",
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
            description: "You'll always be updated at every step of your project."
         },
         {
            icon: "lucide:lock",
            title: "Data Security",
            description: "Your data and project information are always safe with me."
         }
      ],
      questions: [
         {
            icon: "lucide:shopping-bag",
            question: "1. What services do you offer?",
            answer: "I specialize in Shopify store development, theme customization, app integration, speed optimization, bug fix, and ongoing support. I also work with WordPress, Webflow, and custom web development."
         },
         {
            icon: "lucide:clock",
            question: "2. How long does a project take?",
            answer: "It depends on the project's complexity and requirements. A basic Shopify store may take 3-7 days, while more custom projects can take longer. I always provide a clear timeline before starting."
         },
         {
            icon: "lucide:dollar-sign",
            question: "3. How much does a project cost?",
            answer: "The cost depends on the project scope, features, and complexity. I offer flexible packages for different budgets. Please share your requirements or budget, and I'll give you the best possible solution."
         },
         {
            icon: "lucide:smartphone",
            question: "4. Will my website be mobile-friendly and SEO optimized?",
            answer: "Absolutely! All websites I build are fully responsive, mobile-friendly, and follow SEO best practices to help your store rank better on search engines."
         },
         {
            icon: "lucide:headphones",
            question: "5. Do you provide support after the project is completed?",
            answer: "Yes! I provide 30 days of free support after project delivery. I'm always here to help with any updates or issues you may face."
         },
         {
            icon: "lucide:code",
            question: "6. What is your process?",
            answer: "I follow a simple process: Discussion → Planning → Design/Development → Review → Delivery → Support. I keep you updated at every step."
         }
      ],
      ctaBanner: {
         title: "Ready to Start Your Project?",
         description: "Let's turn your ideas into a stunning digital experience.",
         highlights: [
            { icon: "lucide:message-square-text", title: "Fast Response", desc: "Within 24 Hours" },
            { icon: "lucide:shield-check", title: "Free Consultation", desc: "No Obligation" },
            { icon: "lucide:thumbs-up", title: "Satisfaction", desc: "Guaranteed" }
         ],
         buttonText: "Submit a Project Inquiry",
         buttonLink: "#contact"
      }
   },

   contact: {
      sectionTag: "Get In Touch",
      title: "Let's Build Something <span class='text-emerald-600 dark:text-emerald-400'>Amazing</span> Together",
      description: "Tell me what you're building, what needs improvement, or what needs fixing.",
      infoList: [
         {
            icon: "lucide:mail",
            label: "Email Me",
            value: "hello@example.com",
            href: "mailto:hello@example.com"
         },
         {
            icon: "lucide:phone",
            label: "Call / WhatsApp",
            value: "+880 1234 567890",
            href: "tel:+8801234567890"
         },
         {
            icon: "lucide:map-pin",
            label: "Location",
            value: "Rajshahi, Bangladesh",
            href: null
         }
      ],
      scheduleCall: {
         title: "Prefer a Quick Chat?",
         subtitle: "Book a 15-minute discovery call.",
         buttonText: "Schedule a Call",
         href: "#discuss"
      },
      form: {
         headerIcon: "lucide:send",
         title: "Project Inquiry / Contact",
         subtitle: "Fill out the form below with your project details and budget.",
         fields: {
            nameLabel: "Name",
            namePlaceholder: "Enter your full name",
            emailLabel: "Email",
            emailPlaceholder: "Enter your email",
            companyLabel: "Company / Brand",
            companyPlaceholder: "Enter your company or brand name",
            websiteLabel: "Website",
            websitePlaceholder: "https://yourwebsite.com",
            projectTypeLabel: "Project Type",
            projectTypeDefault: "Select project type",
            needLabel: "What do you need?",
            needPlaceholder: "Describe the core scope or services you need...",
            budgetLabel: "Budget",
            budgetDefault: "Select your budget range",
            timelineLabel: "Timeline",
            timelineDefault: "Select expected timeline",
            detailsLabel: "Additional details",
            detailsPlaceholder: "Any extra information, references, or specific features..."
         },
         projectTypes: [
            "Shopify Development",
            "Full-Stack Web App",
            "Custom Automation & Integration"
         ],
         budgetRanges: [
            "$1,000 - $3,000",
            "$3,000 - $5,000",
            "$5,000+"
         ],
         timelines: [
            "1-2 Weeks",
            "1 Month",
            "Flexible"
         ],
         uploadText: "Attach Files (Optional)",
         uploadSubtext: "Max file size: 10MB",
         submitButtonText: "Submit Inquiry"
      },
      processHeading: "Our Simple Process",
      processSteps: [
         { step: "01", title: "Discovery", icon: "lucide:search" },
         { step: "02", title: "Strategy", icon: "lucide:lightbulb" },
         { step: "03", title: "Development", icon: "lucide:code" },
         { step: "04", title: "Testing", icon: "lucide:check-circle" },
         { step: "05", title: "Launch", icon: "lucide:rocket" }
      ],
      commitmentHeading: "My Commitment to You",
      commitments: [
         "Clear & transparent communication",
         "On-time delivery guaranteed",
         "High-quality clean code standards"
      ],
      author: {
         name: "Nahid",
         title: "Lead Developer"
      }
   },

   personal: {
      firstName: "Nahid",
      lastName: "Islam",
      title: "Shopify Expert & Full-Stack Developer",
      bio: "I help businesses build high-converting Shopify stores, stunning websites, and custom web solutions that drive results and growth.",
      email: "hello@nahidislam.dev",
      phone: "+880 1712 345 678",
      location: "Ishwardi, Pabna Bangladesh",
      responseTime: "Within 24 Hours",
      copyrightYear: "2026",
      tagline: "Building Digital Experiences That Drive Results.",
   },

   // সোশ্যাল মিডিয়া লিংক
   socialLinks: [
      { name: "LinkedIn", icon: "lucide:linkedin", url: "https://linkedin.com" },
      { name: "GitHub", icon: "lucide:github", url: "https://github.com" },
      { name: "Twitter", icon: "lucide:twitter", url: "https://twitter.com" },
      { name: "Website", icon: "lucide:globe", url: "https://nahidislam.dev" },
      { name: "Dribbble", icon: "lucide:dribbble", url: "https://dribbble.com" },
   ],

   // কুইক লিংকস
   quickLinks: [
      { name: "Home", href: "#home" },
      { name: "About Me", href: "#about" },
      { name: "Services", href: "#services" },
      { name: "Portfolio", href: "#portfolio" },
      { name: "My Process", href: "#process" },
      { name: "Client Feedback", href: "#feedback" },
      { name: "FAQ", href: "#faq" },
      { name: "Contact", href: "#contact" },
   ],

   // সার্ভিস লিস্ট
   servicesList: [
      { name: "Shopify Store Development", icon: "lucide:shopping-bag", href: "#services" },
      { name: "Shopify Theme Customization", icon: "lucide:palette", href: "#services" },
      { name: "Shopify App Integration", icon: "lucide:puzzle", href: "#services" },
      { name: "WordPress Development", icon: "lucide:globe", href: "#services" },
      { name: "Webflow Development", icon: "lucide:layout", href: "#services" },
      { name: "Custom Web Development", icon: "lucide:code", href: "#services" },
      { name: "Speed Optimization", icon: "lucide:zap", href: "#services" },
      { name: "Maintenance & Support", icon: "lucide:headphones", href: "#services" },
   ],

   // রিসোর্সেস লিস্ট
   resourcesList: [
      { name: "Blog", href: "#" },
      { name: "Case Studies", href: "#" },
      { name: "Shopify Tips", href: "#" },
      { name: "Free Resources", href: "#" },
      { name: "Tools I Use", href: "#" },
   ],

   // লিগ্যাল বা পলিসি লিংক
   legalLinks: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Refund Policy", href: "#" },
   ],


};


