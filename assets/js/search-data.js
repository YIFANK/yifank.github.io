// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-writing",
          title: "writing",
          description: "Course projects, surveys, and lecture notes (PDFs).",
          section: "Navigation",
          handler: () => {
            window.location.href = "/writing/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "A collection of my projects!",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-coursework",
          title: "coursework",
          description: "Coursework at MIT (excluding listener subjects).",
          section: "Navigation",
          handler: () => {
            window.location.href = "/coursework/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-sutton-39-s-big-world-hypothesis",
        
          title: "Sutton&#39;s Big World Hypothesis",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/big-world/";
          
        },
      },{id: "post-classes-that-i-am-taking-this-semester-spring-2026",
        
          title: "Classes that I am taking this semester (Spring 2026)",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/spring-semester/";
          
        },
      },{id: "post-the-alchemist-s-shadow-in-a-chemist-s-world",
        
          title: "The Alchemist’s Shadow in a Chemist’s World",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/alchemist/";
          
        },
      },{id: "post-unconditional-normalizing-flows-for-conditional-generation",
        
          title: "Unconditional Normalizing Flows for Conditional Generation",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/unconditional-normalizing-flows/";
          
        },
      },{id: "projects-doodle-agent",
          title: 'Doodle Agent',
          description: "Exploring Freeform Visual Generation with Multimodal LLMs",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-attacking-llm-s-arithmetic-ability-through-data-poisoning",
          title: 'Attacking LLM’s Arithmetic Ability Through Data Poisoning',
          description: "Exploring how small amounts of corrupted data can silently degrade reasoning performance.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/poisoned-goat/";
            },},{id: "projects-aquagen",
          title: 'AquaGen',
          description: "Interactive Aquarium Generated From Text",
          section: "Projects",handler: () => {
              window.location.href = "/projects/aquagen/";
            },},{id: "projects-sniff-your-personal-shopping-agent",
          title: 'Sniff - Your Personal Shopping Agent',
          description: "An LLM-powered shopping agent, made at *TreeHacks 2026*.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/sniff/";
            },},{id: "projects-ai-kotoba-ai言葉",
          title: 'AI-Kotoba (AI言葉)',
          description: "A macOS app for Chinese speakers learning Japanese through AI-generated scenario conversations.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/ai-kotoba/";
            },},{id: "projects-tampire",
          title: 'TAMPire',
          description: "A Multi-Agent Zero-Shot Robotics Planner from Pixels",
          section: "Projects",handler: () => {
              window.location.href = "/projects/tampire/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%79%69%66%61%6E%6B@%6D%69%74.%65%64%75", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/yifank", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/yifan-kang-etk", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
