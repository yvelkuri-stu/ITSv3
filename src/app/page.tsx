'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Zap, Brain, Palette, Rocket, Users, Mail, Phone, MapPin, Github, Linkedin, Twitter, Menu, X, Play, Star, ArrowRight, Eye, Heart, Cpu, Layers, Globe, Sparkles } from 'lucide-react';

// Environment Variables with fallbacks
const ENV = {
  COMPANY_NAME: process.env.NEXT_PUBLIC_COMPANY_NAME || "Ideal Technosoft",
  COMPANY_TAGLINE: process.env.NEXT_PUBLIC_COMPANY_TAGLINE || "Innovating Tomorrow's Digital Solutions",
  PRIMARY_COLOR: process.env.NEXT_PUBLIC_PRIMARY_COLOR || "#6366f1",
  SECONDARY_COLOR: process.env.NEXT_PUBLIC_SECONDARY_COLOR || "#f59e0b",
  ACCENT_COLOR: process.env.NEXT_PUBLIC_ACCENT_COLOR || "#ec4899",
  COMPANY_EMAIL: process.env.NEXT_PUBLIC_COMPANY_EMAIL || "hello@idealtechnosoft.com",
  COMPANY_PHONE: process.env.NEXT_PUBLIC_COMPANY_PHONE || "+1 (555) 123-4567",
  COMPANY_ADDRESS: process.env.NEXT_PUBLIC_COMPANY_ADDRESS || "San Francisco, CA",
  HERO_TITLE: process.env.NEXT_PUBLIC_HERO_TITLE || "Where Innovation Meets Excellence",
  HERO_SUBTITLE: process.env.NEXT_PUBLIC_HERO_SUBTITLE || "We craft cutting-edge software solutions that transform businesses and create exceptional digital experiences for the modern world.",
  ABOUT_TITLE: process.env.NEXT_PUBLIC_ABOUT_TITLE || "Pioneering Digital Transformation",
  ABOUT_DESCRIPTION: process.env.NEXT_PUBLIC_ABOUT_DESCRIPTION || "At Ideal Technosoft, we don't just write code—we architect the future. Our team combines technical expertise with creative vision to deliver solutions that exceed expectations and drive real business results.",
};

// Custom Company Icon Component
const IdealTechnosoftIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <div className={`${className} flex items-center justify-center`}>
    <img 
      src="/icon.svg" 
      alt="Ideal Technosoft Logo" 
      className="w-full h-full"
      style={{ filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.3))' }}
    />
  </div>
);

// Separate time component
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

export default function UltramodernTechWebsite() {
  const [userInteractions, setUserInteractions] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Team member modal state
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAnimation, setModalAnimation] = useState('');

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '', 
    message: ''
  });

  // Static color
  const getStaticColor = () => {
    if (typeof window === 'undefined') {
      return '#6366f1';
    }
    
    const hour = new Date().getHours();
    if (hour < 6) return '#1e1b4b';
    if (hour < 12) return '#3b82f6';
    if (hour < 18) return '#f59e0b';
    return '#8b5cf6';
  };

  const [stableColor, setStableColor] = useState('#6366f1');
  
  useEffect(() => {
    setStableColor(getStaticColor());
  }, []);

  const handleInteraction = () => {
    setUserInteractions(prev => prev + 1);
  };

  // Form handlers
  const handleContactFormChange = (field: string, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  const handleContactFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      alert('Please fill in all fields.');
      return;
    }
    
    alert(`Thank you ${contactForm.name}! We'll get back to you at ${contactForm.email} soon.`);
    setContactForm({ name: '', email: '', message: '' });
  };

  // Team member modal handlers
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

  // ESC key handler
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

  // Neural Network Component
  const NeuralNetwork = React.memo(() => {
    const nodes = [
      { x: 15, y: 20, size: 6, delay: 0 },
      { x: 85, y: 15, size: 5, delay: 2 },
      { x: 25, y: 45, size: 7, delay: 4 },
      { x: 75, y: 35, size: 5, delay: 6 },
      { x: 45, y: 65, size: 6, delay: 8 },
      { x: 20, y: 80, size: 5, delay: 10 },
      { x: 80, y: 75, size: 6, delay: 12 },
      { x: 60, y: 25, size: 5, delay: 14 },
      { x: 35, y: 90, size: 7, delay: 16 },
      { x: 90, y: 55, size: 5, delay: 18 },
    ];

    const connections = [
      { from: 0, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 4 },
      { from: 3, to: 4 }, { from: 4, to: 5 }, { from: 4, to: 6 },
      { from: 1, to: 7 }, { from: 5, to: 8 }, { from: 6, to: 9 },
      { from: 7, to: 4 }, { from: 8, to: 6 }, { from: 3, to: 9 }
    ];

    return (
      <div className="fixed inset-0 pointer-events-none z-0">
        <svg className="w-full h-full opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={stableColor} stopOpacity="0.8" />
              <stop offset="100%" stopColor={stableColor} stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={stableColor} stopOpacity="0" />
              <stop offset="50%" stopColor={stableColor} stopOpacity="1" />
              <stop offset="100%" stopColor={stableColor} stopOpacity="0" />
              <animateTransform
                attributeName="gradientTransform"
                type="translate"
                values="-100 0;200 0;-100 0"
                dur="4s"
                repeatCount="indefinite"
              />
            </linearGradient>
            <filter id="neuralGlow">
              <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {connections.map((connection, index) => {
            const fromNode = nodes[connection.from];
            const toNode = nodes[connection.to];
            return (
              <g key={index}>
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke="url(#neuralGradient)"
                  strokeWidth="0.15"
                  opacity="0.4"
                />
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke="url(#pulseGradient)"
                  strokeWidth="0.25"
                  filter="url(#neuralGlow)"
                >
                  <animate
                    attributeName="opacity"
                    values="0;1;0"
                    dur={`${3 + index * 0.5}s`}
                    repeatCount="indefinite"
                    begin={`${index * 0.3}s`}
                  />
                </line>
              </g>
            );
          })}
          
          {nodes.map((node, index) => (
            <g key={index}>
              <circle
                cx={node.x}
                cy={node.y}
                r={(node.size + 4) / 8}
                fill="none"
                stroke={stableColor}
                strokeWidth="0.05"
                opacity="0.3"
              >
                <animate
                  attributeName="r"
                  values={`${(node.size + 2) / 8};${(node.size + 8) / 8};${(node.size + 2) / 8}`}
                  dur={`${8 + node.delay}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;0.6;0"
                  dur={`${8 + node.delay}s`}
                  repeatCount="indefinite"
                />
              </circle>
              <circle
                cx={node.x}
                cy={node.y}
                r={node.size / 8}
                fill={stableColor}
                filter="url(#neuralGlow)"
                opacity="0.8"
              >
                <animate
                  attributeName="r"
                  values={`${node.size / 8};${(node.size + 2) / 8};${node.size / 8}`}
                  dur={`${4 + node.delay * 0.5}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.5;1;0.5"
                  dur={`${6 + node.delay * 0.3}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          ))}
        </svg>
      </div>
    );
  });

  // Floating Particles Component
  const FloatingParticles = React.memo(() => {
    const particles = [
      { id: 0, x: 15, y: 25, size: 8, duration: 35, delay: 0 },
      { id: 1, x: 85, y: 15, size: 10, duration: 40, delay: 2 },
      { id: 2, x: 25, y: 65, size: 6, duration: 45, delay: 4 },
      { id: 3, x: 75, y: 35, size: 12, duration: 38, delay: 6 },
      { id: 4, x: 45, y: 80, size: 9, duration: 42, delay: 8 },
      { id: 5, x: 65, y: 20, size: 7, duration: 36, delay: 1 },
    ];

    return (
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: `radial-gradient(circle, ${stableColor}60, ${stableColor}20, transparent)`,
              animation: `gentleFloat ${particle.duration}s ease-in-out infinite ${particle.delay}s`,
              opacity: 0.6,
              filter: 'blur(1px)',
            }}
          />
        ))}
      </div>
    );
  });

  // AnimatedCard Component
  const AnimatedCard = ({ children, delay = 0, className = "" }: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
  }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimated) {
            setTimeout(() => {
              setIsVisible(true);
              setHasAnimated(true);
            }, delay);
          }
        },
        { 
          threshold: 0.05,
          rootMargin: '100px'
        }
      );

      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, [delay, hasAnimated]);

    return (
      <div
        ref={ref}
        className={`transform transition-all duration-1200 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        } ${className}`}
        onClick={handleInteraction}
      >
        {children}
      </div>
    );
  };

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
        handleInteraction();
        onClick && onClick();
      }}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </button>
  );

  const services = [
    {
      icon: Brain,
      title: "AI-Powered Solutions",
      description: "Intelligent systems that learn, adapt, and scale with your business needs.",
      features: ["Machine Learning", "Natural Language Processing", "Predictive Analytics", "Automation"]
    },
    {
      icon: Layers,
      title: "Full-Stack Development",
      description: "End-to-end web and mobile applications built with modern technologies.",
      features: ["React/Next.js", "Node.js/Python", "Cloud Infrastructure", "DevOps"]
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces that create memorable user experiences.",
      features: ["Design Systems", "Prototyping", "User Research", "Accessibility"]
    },
    {
      icon: Sparkles,
      title: "Digital Transformation",
      description: "Modernize your business processes with cutting-edge technology solutions.",
      features: ["Cloud Migration", "Legacy Modernization", "Process Automation", "Data Analytics"]
    }
  ];

  const teamMembers = [
    {
      name: "Arjun Patel",
      role: "Founder & CEO",
      specialty: "Technology Strategy",
      avatar: "👨‍💼",
      experience: "12+ years",
      education: "MBA from Stanford, MS Computer Science",
      previousProjects: ["Led digital transformation at Fortune 500 company", "Founded 2 successful startups", "Scaled tech teams from 5 to 200+ engineers"],
      skills: ["Strategic Planning", "Team Leadership", "Product Vision", "Business Development"],
      achievements: ["Featured in Forbes 30 Under 30", "Raised $50M+ in funding", "Patents in AI/ML technologies"]
    },
    {
      name: "Priya Sharma",
      role: "CTO",
      specialty: "AI & Machine Learning",
      avatar: "👩‍💻",
      experience: "10+ years",
      education: "PhD AI from MIT, BS Computer Science",
      previousProjects: ["Built recommendation engine serving 100M+ users", "Led AI research at Google", "Developed award-winning chatbot platform"],
      skills: ["Machine Learning", "Deep Learning", "Natural Language Processing", "Computer Vision"],
      achievements: ["Published 25+ research papers", "Speaker at major AI conferences", "Winner of Kaggle competitions"]
    },
    {
      name: "Raj Kumar",
      role: "Lead Developer",
      specialty: "Full-Stack Development",
      avatar: "👨‍💻",
      experience: "8+ years",
      education: "MS Software Engineering, BS Computer Science",
      previousProjects: ["Built scalable e-commerce platform (10M+ users)", "Developed real-time trading systems", "Created award-winning mobile apps"],
      skills: ["React/Next.js", "Node.js", "Python", "Cloud Architecture", "DevOps"],
      achievements: ["GitHub top contributor", "Built systems handling 1B+ requests/day", "Open source maintainer"]
    },
    {
      name: "Anita Singh",
      role: "Design Director",
      specialty: "UI/UX Design",
      avatar: "👩‍🎨",
      experience: "9+ years",
      education: "MFA Design from RISD, BA Psychology",
      previousProjects: ["Redesigned banking app used by 50M+ users", "Created design system for major SaaS platform", "Led UX for award-winning healthcare app"],
      skills: ["User Research", "Interaction Design", "Design Systems", "Prototyping", "Accessibility"],
      achievements: ["Webby Award winner", "Featured in Design Museum", "Increased user engagement by 300%"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      {/* Neural Network Background */}
      <NeuralNetwork />
      
      {/* Floating Particles */}
      <FloatingParticles />

      {/* Navigation */}
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
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-purple-300 transition-all duration-300 relative group py-2 scroll-smooth"
                onClick={(e) => {
                  e.preventDefault();
                  handleInteraction();
                  const element = document.getElementById(item.toLowerCase());
                  if (element) {
                    element.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }
                }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-black/40 backdrop-blur-lg border-t border-white/10">
            <div className="px-4 sm:px-6 py-4 space-y-4">
              {['Home', 'Services', 'About', 'Team', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block hover:text-purple-300 transition-all duration-300 py-2"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    handleInteraction();
                    const element = document.getElementById(item.toLowerCase());
                    if (element) {
                      element.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 sm:px-6">
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
            <InteractiveButton
              onClick={() => {
                const servicesSection = document.getElementById('services');
                if (servicesSection) {
                  servicesSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }
              }}
            >
              <Rocket className="w-4 h-4 sm:w-5 sm:h-5" />
              Get Started
            </InteractiveButton>
            <InteractiveButton 
              variant="secondary"
              onClick={() => {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                  aboutSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }
              }}
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5" />
              View Portfolio
            </InteractiveButton>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-400 px-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full opacity-80"></div>
              Live: <LiveTime />
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
              Interactions: {userInteractions}
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-400 opacity-80" />
              System Active
            </div>
          </div>
        </div>

        <ChevronDown className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 animate-bounce text-purple-300" />
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedCard className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 text-gradient">
              Our Services
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Comprehensive technology solutions designed to drive your business forward.
            </p>
          </AnimatedCard>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <AnimatedCard key={index} delay={index * 200} className="group">
                <div className="glass rounded-2xl p-6 sm:p-8 hover:border-purple-400/30 transition-all duration-700 hover-lift h-full">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-700 flex-shrink-0">
                      <service.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold">{service.title}</h3>
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-24 px-4 sm:px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
            <AnimatedCard>
              <h2 className="text-3xl sm:text-5xl font-bold mb-6 sm:mb-8 text-gradient">
                {ENV.ABOUT_TITLE}
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                {ENV.ABOUT_DESCRIPTION}
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Innovation First</h4>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Global Reach</h4>
                    <p className="text-gray-400 text-sm sm:text-base">Serving clients worldwide with scalable, reliable technology solutions.</p>
                  </div>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={200}>
              <div className="relative">
                <div className="w-full h-64 sm:h-96 bg-gradient-to-br from-purple-600/30 to-indigo-600/30 rounded-2xl flex items-center justify-center">
                  <IdealTechnosoftIcon className="w-24 h-24 sm:w-32 sm:h-32 opacity-80" />
                </div>
                <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center opacity-90">
                  <Sparkles className="w-8 h-8 sm:w-12 sm:h-12" />
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-12 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedCard className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 text-gradient">
              Our Team
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Meet the talented professionals who bring your ideas to life.
            </p>
          </AnimatedCard>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {teamMembers.map((member, index) => (
              <AnimatedCard key={index} delay={index * 150} className="group">
                <div 
                  className="glass rounded-2xl p-6 hover:border-purple-400/30 transition-all duration-700 text-center hover-lift h-full cursor-pointer"
                  onClick={() => openMemberModal(member)}
                >
                  <div className="text-4xl sm:text-6xl mb-4 group-hover:scale-110 transition-transform duration-700">
                    {member.avatar}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-purple-300 font-medium mb-2 text-sm sm:text-base">{member.role}</p>
                  <p className="text-gray-400 text-xs sm:text-sm mb-3">{member.specialty}</p>
                  <div className="text-xs text-indigo-300 opacity-80">Click to view profile</div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-24 px-4 sm:px-6 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <AnimatedCard className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 text-gradient">
              Let's Work Together
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 px-4">
              Ready to transform your business with innovative technology? Get in touch with us today.
            </p>
          </AnimatedCard>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            <AnimatedCard>
              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-gray-300 text-sm sm:text-base break-all">{ENV.COMPANY_EMAIL}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-gray-300 text-sm sm:text-base">{ENV.COMPANY_PHONE}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Location</h4>
                    <p className="text-gray-300 text-sm sm:text-base">{ENV.COMPANY_ADDRESS}</p>
                  </div>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={200}>
              <form onSubmit={handleContactFormSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={contactForm.name}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-400 focus:outline-none text-white placeholder-gray-400 text-sm sm:text-base transition-colors duration-300"
                    onChange={(e) => handleContactFormChange('name', e.target.value)}
                    autoComplete="off"
                    data-form-type="other"
                    data-lpignore="true"
                    data-1p-ignore="true"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={contactForm.email}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-400 focus:outline-none text-white placeholder-gray-400 text-sm sm:text-base transition-colors duration-300"
                    onChange={(e) => handleContactFormChange('email', e.target.value)}
                    autoComplete="off"
                    data-form-type="other"
                    data-lpignore="true"
                    data-1p-ignore="true"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Tell us about your project..."
                    value={contactForm.message}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-400 focus:outline-none text-white placeholder-gray-400 resize-none text-sm sm:text-base transition-colors duration-300"
                    onChange={(e) => handleContactFormChange('message', e.target.value)}
                    autoComplete="off"
                    data-form-type="other"
                    data-lpignore="true"
                    data-1p-ignore="true"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full group relative overflow-hidden px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    Send Message
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </button>
              </form>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 border-t border-white/10">
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
              <a href="#" className="text-gray-400 hover:text-purple-300 transition-colors">
                <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-300 transition-colors">
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-300 transition-colors">
                <Github className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>
          
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10 text-center text-gray-400">
            <p className="text-xs sm:text-sm">&copy; 2025 {ENV.COMPANY_NAME}. All rights reserved. Built with innovation in mind.</p>
          </div>
        </div>
      </footer>

      {/* Team Member Modal */}
      {isModalOpen && selectedMember && (
        <div 
          className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300 ${
            modalAnimation === 'visible' ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeMemberModal}
        >
          <div 
            className={`bg-gradient-to-br from-slate-800 to-purple-900 rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-purple-400/30 transition-all duration-500 transform ${
              modalAnimation === 'visible' 
                ? 'scale-100 rotate-0 translate-y-0' 
                : modalAnimation === 'entering'
                ? 'scale-75 rotate-12 translate-y-8'
                : 'scale-75 rotate-12 translate-y-8'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="text-6xl animate-pulse">{selectedMember.avatar}</div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedMember.name}</h3>
                  <p className="text-purple-300 font-medium">{selectedMember.role}</p>
                  <p className="text-gray-400">{selectedMember.experience} experience</p>
                </div>
              </div>
              <button
                onClick={closeMemberModal}
                className="text-gray-400 hover:text-white transition-all duration-300 p-2 hover:bg-white/10 rounded-full hover:rotate-90"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-400" />
                  Education
                </h4>
                <p className="text-gray-300">{selectedMember.education}</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-purple-400" />
                  Key Projects
                </h4>
                <ul className="space-y-2">
                  {selectedMember.previousProjects.map((project: string, index: number) => (
                    <li key={index} className="text-gray-300 flex items-start gap-2">
                      <Star className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      {project}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  Core Skills
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
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  Achievements
                </h4>
                <ul className="space-y-2">
                  {selectedMember.achievements.map((achievement: string, index: number) => (
                    <li key={index} className="text-gray-300 flex items-start gap-2">
                      <Heart className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="text-center pt-4">
                <p className="text-xs text-gray-500">Press ESC to close</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes gentleFloat {
          0%, 100% { 
            transform: translate3d(0, 0, 0) rotate(0deg); 
          }
          33% { 
            transform: translate3d(4px, -6px, 0) rotate(120deg); 
          }
          66% { 
            transform: translate3d(-2px, -8px, 0) rotate(240deg); 
          }
        }
        
        .hover-lift {
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px -12px rgba(99, 102, 241, 0.25);
        }
      `}</style>
    </div>
  );
}