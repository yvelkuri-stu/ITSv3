'use client';

import React, { useState, useEffect } from 'react';

// Environment Variables with fallbacks
const ENV = {
  COMPANY_NAME: process.env.NEXT_PUBLIC_COMPANY_NAME || "Ideal Technosoft",
  COMPANY_TAGLINE: process.env.NEXT_PUBLIC_COMPANY_TAGLINE || "Innovating Tomorrow's Digital Solutions",
  COMPANY_EMAIL: process.env.NEXT_PUBLIC_COMPANY_EMAIL || "hello@idealtechnosoft.com",
  COMPANY_PHONE: process.env.NEXT_PUBLIC_COMPANY_PHONE || "+1 (555) 123-4567",
  COMPANY_ADDRESS: process.env.NEXT_PUBLIC_COMPANY_ADDRESS || "San Francisco, CA",
  HERO_TITLE: process.env.NEXT_PUBLIC_HERO_TITLE || "Where Innovation Meets Excellence",
  HERO_SUBTITLE: process.env.NEXT_PUBLIC_HERO_SUBTITLE || "We craft cutting-edge software solutions that transform businesses and create exceptional digital experiences for the modern world.",
  ABOUT_TITLE: process.env.NEXT_PUBLIC_ABOUT_TITLE || "Pioneering Digital Transformation",
  ABOUT_DESCRIPTION: process.env.NEXT_PUBLIC_ABOUT_DESCRIPTION || "At Ideal Technosoft, we don't just write code—we architect the future. Our team combines technical expertise with creative vision to deliver solutions that exceed expectations and drive real business results.",
};

// =================== BACKGROUND COMPONENTS ===================

const IdealTechnosoftIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <div className={`${className} flex items-center justify-center`}>
    <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.3))' }}>
      <defs>
        <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="45" fill="url(#iconGradient)" opacity="0.9" />
      <path d="M25 35 L50 25 L75 35 L75 65 L50 75 L25 65 Z" fill="white" opacity="0.9" />
      <circle cx="50" cy="50" r="15" fill="url(#iconGradient)" />
    </svg>
  </div>
);

const BreathingOrbs = React.memo(() => {
  const orbs = [
    { id: 1, size: 400, x: 10, y: 15, duration: 8, delay: 0 },
    { id: 2, size: 300, x: 85, y: 25, duration: 12, delay: 2 },
    { id: 3, size: 250, x: 25, y: 70, duration: 10, delay: 4 },
    { id: 4, size: 350, x: 75, y: 60, duration: 14, delay: 1 },
    { id: 5, size: 200, x: 50, y: 40, duration: 9, delay: 3 },
    { id: 6, size: 180, x: 20, y: 90, duration: 11, delay: 5 },
    { id: 7, size: 320, x: 90, y: 10, duration: 13, delay: 6 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            background: `radial-gradient(circle, rgba(147, 51, 234, 0.15), rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.05), transparent)`,
            transform: 'translate(-50%, -50%)',
            filter: 'blur(2px)',
            animation: `breathe ${orb.duration}s ease-in-out infinite ${orb.delay}s`,
          }}
        />
      ))}
    </div>
  );
});

// =================== NAVIGATION COMPONENT ===================

const Navigation = ({ userInteractions, onInteraction }: { userInteractions: number; onInteraction: () => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (targetId: string) => {
    onInteraction();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-lg z-40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <IdealTechnosoftIcon className="w-8 h-8 sm:w-10 sm:h-10" />
          <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
            {ENV.COMPANY_NAME}
          </span>
        </div>

        <div className="hidden lg:flex space-x-8">
          {['Home', 'Services', 'About', 'Team', 'Contact'].map((item) => (
            <button
              key={item}
              className="hover:text-purple-300 transition-all duration-300 relative group py-2"
              onClick={() => handleNavClick(item.toLowerCase())}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-400 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        <button
          className="lg:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-black/40 backdrop-blur-lg border-t border-white/10">
          <div className="px-4 sm:px-6 py-4 space-y-4">
            {['Home', 'Services', 'About', 'Team', 'Contact'].map((item) => (
              <button
                key={item}
                className="block w-full text-left hover:text-purple-300 transition-all duration-300 py-2"
                onClick={() => handleNavClick(item.toLowerCase())}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

// =================== HERO SECTION ===================

const HeroSection = ({ userInteractions, onInteraction }: { userInteractions: number; onInteraction: () => void }) => {
  const LiveTime = React.memo(() => {
    const [time, setTime] = useState<Date | null>(null);
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
      setMounted(true);
      setTime(new Date());
      const timer = setInterval(() => setTime(new Date()), 1000);
      return () => clearInterval(timer);
    }, []);
    
    if (!mounted || !time) {
      return <>--:--:--</>;
    }
    
    return <>{time.toLocaleTimeString()}</>;
  });

  const InteractiveButton = ({ 
    children, 
    variant = "primary", 
    onClick, 
    className = "" 
  }: {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
    onClick?: () => void;
    className?: string;
  }) => (
    <button
      className={`group relative overflow-hidden px-4 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-sm sm:text-base ${
        variant === "primary"
          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
          : "bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20"
      } ${className}`}
      onClick={() => {
        onInteraction();
        onClick && onClick();
      }}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </button>
  );

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6">
      <div className="text-center max-w-6xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent leading-tight">
            {ENV.HERO_TITLE}
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
            {ENV.HERO_SUBTITLE}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12 px-4">
          <InteractiveButton onClick={() => scrollToSection('services')}>
            🚀 Get Started
          </InteractiveButton>
          <InteractiveButton variant="secondary" onClick={() => scrollToSection('about')}>
            ▶️ View Portfolio
          </InteractiveButton>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-400 px-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full opacity-80 animate-pulse"></div>
            Live: <LiveTime />
          </div>
          <div className="flex items-center gap-2">
            👁️ Interactions: {userInteractions}
          </div>
          <div className="flex items-center gap-2">
            ❤️ System Active
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 animate-bounce text-purple-300">
        ⬇️
      </div>
    </section>
  );
};

// =================== SERVICES SECTION ===================

const ServicesSection = () => {
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const services = [
    {
      icon: "🧠",
      title: "AI-Powered Solutions",
      description: "Intelligent systems that learn, adapt, and scale with your business needs.",
      features: ["Machine Learning", "Natural Language Processing", "Predictive Analytics", "Automation"],
      details: {
        overview: "Transform your business with cutting-edge artificial intelligence solutions that drive efficiency, accuracy, and innovation.",
        capabilities: [
          "Custom Machine Learning Models tailored to your specific business needs",
          "Natural Language Processing for intelligent document analysis and chatbots",
          "Computer Vision for image recognition and automated quality control",
          "Predictive Analytics to forecast trends and optimize decision-making",
          "Process Automation to streamline workflows and reduce manual tasks",
          "AI Integration with existing systems and databases"
        ],
        technologies: ["TensorFlow", "PyTorch", "OpenAI", "Hugging Face", "AWS SageMaker", "Google Cloud AI"],
        deliverables: ["AI Strategy & Roadmap", "Custom Model Development", "Integration & Deployment", "Training & Support"]
      }
    },
    {
      icon: "📚",
      title: "Full-Stack Development",
      description: "End-to-end web and mobile applications built with modern technologies.",
      features: ["React/Next.js", "Node.js/Python", "Cloud Infrastructure", "DevOps"],
      details: {
        overview: "Complete software development lifecycle from concept to deployment, using the latest technologies and best practices.",
        capabilities: [
          "Frontend Development with React, Next.js, and modern JavaScript frameworks",
          "Backend APIs with Node.js, Python, and microservices architecture",
          "Database Design using SQL and NoSQL solutions (PostgreSQL, MongoDB)",
          "Cloud Infrastructure on AWS, Azure, and Google Cloud Platform",
          "Mobile App Development for iOS and Android platforms",
          "DevOps & CI/CD pipeline setup for automated testing and deployment"
        ],
        technologies: ["React", "Next.js", "Node.js", "Python", "TypeScript", "Docker", "Kubernetes", "AWS"],
        deliverables: ["Technical Architecture", "MVP Development", "Production Deployment", "Maintenance & Support"]
      }
    },
    {
      icon: "🎨",
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces that create memorable user experiences.",
      features: ["Design Systems", "Prototyping", "User Research", "Accessibility"],
      details: {
        overview: "Human-centered design approach that creates intuitive, accessible, and engaging digital experiences.",
        capabilities: [
          "User Research & Analysis to understand your target audience",
          "Information Architecture and user journey mapping",
          "Wireframing & Prototyping with interactive mockups",
          "Visual Design with modern aesthetics and brand consistency",
          "Design Systems creation for scalable and consistent UI components",
          "Accessibility Testing to ensure WCAG compliance and inclusive design"
        ],
        technologies: ["Figma", "Adobe Creative Suite", "Principle", "Sketch", "InVision", "Framer"],
        deliverables: ["User Research Report", "Design System", "Interactive Prototypes", "Design Handoff"]
      }
    },
    {
      icon: "✨",
      title: "Digital Transformation",
      description: "Modernize your business processes with cutting-edge technology solutions.",
      features: ["Cloud Migration", "Legacy Modernization", "Process Automation", "Data Analytics"],
      details: {
        overview: "Comprehensive digital transformation strategies that modernize your operations and accelerate business growth.",
        capabilities: [
          "Cloud Migration strategy and execution for improved scalability",
          "Legacy System Modernization to improve performance and maintainability",
          "Business Process Automation to increase efficiency and reduce costs",
          "Data Analytics & Business Intelligence for data-driven decision making",
          "Digital Strategy consulting to align technology with business goals",
          "Change Management support to ensure smooth transition and adoption"
        ],
        technologies: ["AWS", "Azure", "Google Cloud", "Salesforce", "Microsoft 365", "Tableau", "Power BI"],
        deliverables: ["Digital Strategy", "Migration Roadmap", "Process Documentation", "Training Programs"]
      }
    }
  ];

  const toggleService = (index: number) => {
    setExpandedService(expandedService === index ? null : index);
  };

  return (
    <section id="services" className="py-12 sm:py-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 text-gradient">
            Our Services
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Comprehensive technology solutions designed to drive your business forward.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div key={index} className="group">
              <div className={`glass rounded-2xl hover:border-purple-400/30 transition-all duration-700 hover-lift ${
                expandedService === index ? 'border-purple-400/50 bg-white/10' : ''
              }`}>
                <div 
                  className="p-6 sm:p-8 cursor-pointer"
                  onClick={() => toggleService(index)}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-700 flex-shrink-0 text-2xl">
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold">{service.title}</h3>
                      <p className="text-gray-300 leading-relaxed mt-2">{service.description}</p>
                    </div>
                    <div className="text-purple-300 text-xl transition-transform duration-300 ml-auto">
                      {expandedService === index ? '−' : '+'}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></span>
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {expandedService !== index && (
                    <div className="mt-4 text-center">
                      <span className="text-purple-300 text-sm">Click to explore details ↓</span>
                    </div>
                  )}
                </div>

                {expandedService === index && (
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8 border-t border-white/10">
                    <div className="pt-6 space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-purple-300 mb-3">Overview</h4>
                        <p className="text-gray-300 leading-relaxed">{service.details.overview}</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-purple-300 mb-3">Key Capabilities</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {service.details.capabilities.map((capability, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <span className="text-green-400 text-sm mt-1">✓</span>
                              <span className="text-sm text-gray-300">{capability}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-purple-300 mb-3">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {service.details.technologies.map((tech, i) => (
                            <span key={i} className="px-3 py-1 bg-indigo-600/30 text-indigo-200 rounded-full text-xs border border-indigo-400/30">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-purple-300 mb-3">Deliverables</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {service.details.deliverables.map((deliverable, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <span className="text-yellow-400 text-sm">📋</span>
                              <span className="text-sm text-gray-300">{deliverable}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 text-center">
                        <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                          Get Started with {service.title}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// =================== ABOUT SECTION ===================

const AboutSection = () => {
  return (
    <section id="about" className="py-12 sm:py-24 px-4 sm:px-6 bg-black/20 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-5xl font-bold mb-6 sm:mb-8 text-gradient">
              {ENV.ABOUT_TITLE}
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
              {ENV.ABOUT_DESCRIPTION}
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 mt-1 flex-shrink-0">🖥️</span>
                <div>
                  <h4 className="font-semibold mb-2">Innovation First</h4>
                  <p className="text-gray-400 text-sm sm:text-base">Cutting-edge solutions that push the boundaries of what's possible.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400 mt-1 flex-shrink-0">🌍</span>
                <div>
                  <h4 className="font-semibold mb-2">Global Reach</h4>
                  <p className="text-gray-400 text-sm sm:text-base">Serving clients worldwide with scalable, reliable technology solutions.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="relative">
              <div className="w-full h-64 sm:h-96 bg-gradient-to-br from-purple-600/30 to-indigo-600/30 rounded-2xl flex items-center justify-center">
                <IdealTechnosoftIcon className="w-24 h-24 sm:w-32 sm:h-32 opacity-80" />
              </div>
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center opacity-90 text-2xl sm:text-4xl">
                ✨
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// =================== TEAM SECTION ===================

const TeamSection = () => {
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAnimation, setModalAnimation] = useState('');

  const teamMembers = [
    {
      name: "Yesh Velkuri",
      role: "Co-Founder & CEO",
      specialty: "Technology Strategy & Digital Transformation",
      avatar: "👨‍💼",
      experience: "20+ years",
      bio: "Visionary technology leader with two decades of experience scaling technology companies and driving digital transformation initiatives.",
      education: "Masters in Computer Science, Bachelors in Computer Science",
      previousProjects: [
        "Led digital transformation at Fortune 500 company",
        "Founded 2 successful startups with successful exits",
        "Scaled engineering teams from 5 to 500+ professionals",
        "Implemented enterprise-wide cloud migration strategies"
      ],
      skills: ["Strategic Planning", "Digital Transformation", "Team Leadership", "Product Vision", "Business Development", "Enterprise Architecture"],
      achievements: [
        "Successfully exited 2 technology startups",
        "Led $50M+ digital transformation projects",
        "Built and scaled multiple engineering organizations",
        "Expert in enterprise technology strategy"
      ],
      specialties: "Enterprise digital transformation, startup scaling, technology strategy, and organizational leadership."
    },
    {
      name: "Vamsi Priya",
      role: "Co-Founder & CTO",
      specialty: "Robotics & International Technology Solutions",
      avatar: "👩‍💻",
      experience: "15+ years",
      bio: "Robotics expert with extensive experience delivering cutting-edge automation solutions for Japanese enterprise clients.",
      education: "Bachelors in Computer Science, Specialized in Robotics Engineering",
      previousProjects: [
        "Led robotics automation projects for major Japanese corporations",
        "Developed AI-powered manufacturing systems for automotive industry",
        "Built cross-cultural technology teams spanning Japan and India",
        "Implemented Industry 4.0 solutions for smart factories"
      ],
      skills: ["Robotics Engineering", "AI/ML Systems", "International Project Management", "Cross-Cultural Leadership", "Manufacturing Automation", "IoT Solutions"],
      achievements: [
        "Delivered 50+ successful robotics projects in Japan",
        "Fluent in Japanese business culture and technology practices",
        "Patents in robotics automation systems",
        "Expert in international technology consulting"
      ],
      specialties: "Robotics automation, international project delivery, Japanese market expertise, and AI-powered manufacturing solutions."
    },
    {
      name: "Raj Kumar",
      role: "Lead Developer",
      specialty: "Full-Stack Development",
      avatar: "👨‍💻",
      experience: "8+ years",
      bio: "Full-stack architect who has built scalable systems serving millions of users worldwide.",
      education: "MS Software Engineering, BS Computer Science",
      previousProjects: [
        "Built scalable e-commerce platform (10M+ users)",
        "Developed real-time trading systems",
        "Created award-winning mobile apps",
        "Led microservices architecture implementations"
      ],
      skills: ["React/Next.js", "Node.js", "Python", "Cloud Architecture", "Microservices", "DevOps"],
      achievements: [
        "GitHub top contributor",
        "Built systems handling 1B+ requests/day",
        "Open source maintainer",
        "Technical architecture expert"
      ],
      specialties: "Scalable web applications, cloud architecture, and high-performance systems."
    },
    {
      name: "Anita Singh",
      role: "Design Director",
      specialty: "UI/UX Design",
      avatar: "👩‍🎨",
      experience: "9+ years",
      bio: "Award-winning designer focused on creating intuitive and accessible user experiences.",
      education: "MFA Design from RISD, BA Psychology",
      previousProjects: [
        "Redesigned banking app used by 50M+ users",
        "Created design system for major SaaS platform",
        "Led UX for award-winning healthcare app",
        "Designed interfaces for Fortune 100 companies"
      ],
      skills: ["User Research", "Interaction Design", "Design Systems", "Prototyping", "Accessibility", "Brand Design"],
      achievements: [
        "Webby Award winner",
        "Featured in Design Museum",
        "Increased user engagement by 300%",
        "Accessibility design advocate"
      ],
      specialties: "Human-centered design, accessibility, and scalable design systems."
    }
  ];

  const openMemberModal = (member: any) => {
    setSelectedMember(member);
    setModalAnimation('entering');
    setIsModalOpen(true);
    setTimeout(() => setModalAnimation('visible'), 10);
  };

  const closeMemberModal = () => {
    setModalAnimation('exiting');
    setTimeout(() => {
      setIsModalOpen(false);
      setSelectedMember(null);
      setModalAnimation('');
    }, 300);
  };

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen) {
        closeMemberModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <>
      <section id="team" className="py-12 sm:py-24 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 text-gradient">
              Our Team
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Meet the talented professionals who bring your ideas to life.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div 
                  className="glass rounded-2xl p-4 sm:p-6 hover:border-purple-400/30 transition-all duration-700 text-center hover-lift h-full cursor-pointer"
                  onClick={() => openMemberModal(member)}
                >
                  <div className="text-3xl sm:text-5xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-700">
                    {member.avatar}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">{member.name}</h3>
                  <p className="text-purple-300 font-medium mb-1 sm:mb-2 text-xs sm:text-sm">{member.role}</p>
                  <p className="text-gray-400 text-xs mb-2 sm:mb-3">{member.specialty}</p>
                  <p className="text-indigo-300 text-xs mb-3 sm:mb-4">{member.experience} experience</p>
                  
                  <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed line-clamp-3">{member.bio}</p>
                  
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-purple-300">Core Skills</h4>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {member.skills.slice(0, 4).map((skill, i) => (
                        <span key={i} className="px-1.5 py-0.5 bg-purple-600/20 text-purple-200 rounded text-xs border border-purple-400/20">
                          {skill}
                        </span>
                      ))}
                      {member.skills.length > 4 && (
                        <span className="px-1.5 py-0.5 bg-indigo-600/20 text-indigo-200 rounded text-xs border border-indigo-400/20">
                          +{member.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 sm:mt-4 text-center">
                    <span className="text-purple-300 text-xs">Click to view full profile ↗</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Member Modal */}
      {isModalOpen && selectedMember && (
        <div 
          className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300 ${
            modalAnimation === 'visible' ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeMemberModal}
        >
          <div 
            className={`bg-gradient-to-br from-slate-800 to-purple-900 rounded-2xl p-4 sm:p-6 lg:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-purple-400/30 transition-all duration-500 transform ${
              modalAnimation === 'visible' 
                ? 'scale-100 rotate-0 translate-y-0' 
                : modalAnimation === 'entering'
                ? 'scale-75 rotate-12 translate-y-8'
                : 'scale-75 rotate-12 translate-y-8'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4 sm:mb-0">
                <div className="text-5xl sm:text-6xl animate-pulse">{selectedMember.avatar}</div>
                <div className="text-center sm:text-left">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">{selectedMember.name}</h3>
                  <p className="text-purple-300 font-medium text-lg">{selectedMember.role}</p>
                  <p className="text-gray-400 text-sm">{selectedMember.experience} experience</p>
                  <p className="text-indigo-300 text-sm mt-1">{selectedMember.specialties}</p>
                </div>
              </div>
              <button
                onClick={closeMemberModal}
                className="text-gray-400 hover:text-white transition-all duration-300 p-2 hover:bg-white/10 rounded-full hover:rotate-90 self-end sm:self-start"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    👨‍🎓 Education & Background
                  </h4>
                  <p className="text-gray-300 mb-3">{selectedMember.education}</p>
                  <p className="text-gray-300 leading-relaxed">{selectedMember.bio}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    🚀 Key Projects & Experience
                  </h4>
                  <ul className="space-y-2">
                    {selectedMember.previousProjects.map((project: string, index: number) => (
                      <li key={index} className="text-gray-300 flex items-start gap-2">
                        <span className="text-purple-400 mt-0.5 flex-shrink-0">⭐</span>
                        <span className="text-sm">{project}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    🧠 Technical Skills & Expertise
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.skills.map((skill: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-600/30 text-purple-200 rounded-full text-sm border border-purple-400/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    🏆 Notable Achievements
                  </h4>
                  <ul className="space-y-2">
                    {selectedMember.achievements.map((achievement: string, index: number) => (
                      <li key={index} className="text-gray-300 flex items-start gap-2">
                        <span className="text-yellow-400 mt-0.5 flex-shrink-0">🎯</span>
                        <span className="text-sm">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="text-center pt-6 sm:pt-8 border-t border-white/10 mt-6 sm:mt-8">
              <p className="text-xs text-gray-500 mb-2">Press ESC or click outside to close</p>
              <button
                onClick={closeMemberModal}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// =================== CONTACT SECTION ===================

const ContactSection = ({ onInteraction }: { onInteraction: () => void }) => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '', 
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onInteraction();
    
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      alert('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission - replace with actual integration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert(`Thank you ${contactForm.name}! Your message has been sent successfully. We'll get back to you at ${contactForm.email} soon.`);
      setContactForm({ name: '', email: '', message: '' });
      
    } catch (error) {
      alert('Sorry, there was an error sending your message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-24 px-4 sm:px-6 bg-black/20 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 text-gradient">
            Let's Work Together
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 px-4">
            Ready to transform your business with innovative technology? Get in touch with us today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12">
          <div className="lg:col-span-2">
            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 text-xl sm:text-2xl">
                  📧
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Email</h4>
                  <p className="text-gray-300 text-sm sm:text-base break-all">{ENV.COMPANY_EMAIL}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 text-xl sm:text-2xl">
                  📞
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Phone</h4>
                  <p className="text-gray-300 text-sm sm:text-base">{ENV.COMPANY_PHONE}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 text-xl sm:text-2xl">
                  📍
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Location</h4>
                  <p className="text-gray-300 text-sm sm:text-base">{ENV.COMPANY_ADDRESS}</p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-indigo-600/20 rounded-lg border border-indigo-400/30">
                <h4 className="font-semibold text-indigo-300 mb-2">Form Integration Options:</h4>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• EmailJS for client-side email delivery</li>
                  <li>• Formspree for form backend service</li>
                  <li>• Netlify Forms for JAMstack sites</li>
                  <li>• Custom API integration</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={handleContactFormSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={contactForm.name}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-400 focus:outline-none text-white placeholder-gray-400 text-sm sm:text-base transition-colors duration-300"
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    value={contactForm.email}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-400 focus:outline-none text-white placeholder-gray-400 text-sm sm:text-base transition-colors duration-300"
                    onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Project Details</label>
                <textarea
                  placeholder="Tell us about your project, timeline, budget, and how we can help you achieve your goals..."
                  value={contactForm.message}
                  rows={6}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-400 focus:outline-none text-white placeholder-gray-400 resize-none text-sm sm:text-base transition-colors duration-300"
                  onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                  disabled={isSubmitting}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full group relative overflow-hidden px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                  isSubmitting 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                }`}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      ➤ Send Message
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// =================== FOOTER ===================

const Footer = () => {
  return (
    <footer className="py-8 sm:py-12 px-4 sm:px-6 border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <IdealTechnosoftIcon className="w-8 h-8 sm:w-10 sm:h-10" />
            <div>
              <span className="text-xl sm:text-2xl font-bold block">{ENV.COMPANY_NAME}</span>
              <p className="text-gray-400 text-xs sm:text-sm">{ENV.COMPANY_TAGLINE}</p>
            </div>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-purple-300 transition-colors text-2xl">🐦</a>
            <a href="#" className="text-gray-400 hover:text-purple-300 transition-colors text-2xl">💼</a>
            <a href="#" className="text-gray-400 hover:text-purple-300 transition-colors text-2xl">🐙</a>
          </div>
        </div>
        
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10 text-center text-gray-400">
          <p className="text-xs sm:text-sm">&copy; 2025 {ENV.COMPANY_NAME}. All rights reserved. Built with innovation in mind.</p>
        </div>
      </div>
    </footer>
  );
};

// =================== MAIN COMPONENT ===================

export default function UltramodernTechWebsite() {
  const [userInteractions, setUserInteractions] = useState(0);

  const handleInteraction = () => {
    setUserInteractions(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      <BreathingOrbs />
      
      <Navigation userInteractions={userInteractions} onInteraction={handleInteraction} />

      <HeroSection userInteractions={userInteractions} onInteraction={handleInteraction} />

      <ServicesSection />

      <AboutSection />

      <TeamSection />

      <ContactSection onInteraction={handleInteraction} />

      <Footer />

      <style jsx>{`
        @keyframes breathe {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 0.6;
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.2) rotate(180deg);
            opacity: 0.8;
          }
        }
        
        .hover-lift {
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px -12px rgba(99, 102, 241, 0.25);
        }

        .glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        
        .glass:hover {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(16px);
          border-color: rgba(147, 51, 234, 0.3);
        }
        
        .text-gradient {
          background: linear-gradient(to right, #a78bfa, #c084fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Enhanced Mobile Responsiveness */
        @media (max-width: 640px) {
          .text-4xl { font-size: 2rem; line-height: 2.5rem; }
          .text-6xl { font-size: 3rem; line-height: 1; }
          .text-8xl { font-size: 4rem; line-height: 1; }
          
          .py-12 { padding-top: 2rem; padding-bottom: 2rem; }
          .py-24 { padding-top: 3rem; padding-bottom: 3rem; }
          
          .gap-6 { gap: 1rem; }
          .gap-8 { gap: 1.5rem; }
          
          .rounded-2xl { border-radius: 1rem; }
          
          .glass {
            backdrop-filter: blur(8px);
          }
        }

        /* Tablet Optimizations */
        @media (min-width: 641px) and (max-width: 1024px) {
          .lg\\:grid-cols-4 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          
          .lg\\:grid-cols-2 {
            grid-template-columns: repeat(1, minmax(0, 1fr));
          }
        }

        /* Large Screen Optimizations */
        @media (min-width: 1920px) {
          .max-w-7xl {
            max-width: 1400px;
          }
          
          .text-8xl {
            font-size: 8rem;
            line-height: 1;
          }
        }

        /* Animation Performance */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
          
          .hover-lift {
            transition: none;
          }
          
          .animate-bounce {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}