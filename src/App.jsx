import React, { useState, useEffect } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  ExternalLink,
  Cpu,
  Code2,
  Database,
  Terminal as TerminalIcon,
  ChevronRight,
  Moon,
  Sun,
  FileText,
  Camera,
  Layers,
  Activity,
  Briefcase,
  User,
  X,
  Zap,
  Globe,
  Download,
  Stethoscope,
  CheckCircle2,
  ChevronDown,
  Layout,
  Send,
  Loader2,
  Award,
  Shield
} from 'lucide-react';

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSection, setActiveSection] = useState('home');

  // Form & Submission State
  const [status, setStatus] = useState('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'System Automation',
    message: ''
  });

  // Typewriter Effect Logic
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const roles = [
    "Systems Developer",
    "Automation Enthusiast",
    "Computer Vision Researcher",
    "IoT Specialist",
    "Problem Solver"
  ];

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setText(isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 75 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // NOTE: Since this is hosted on GitHub, you need a frontend-friendly relay.
      // Replace 'YOUR_FORMSPREE_ID' with your actual ID from formspree.io
      const response = await fetch("https://formspree.io/f/mojnrqon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service,
          message: formData.message
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', service: 'System Automation', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      // Fallback to mailto if fetch fails or for immediate offline feel
      const { name, email, service, message } = formData;
      const mailtoLink = `mailto:tharusahbimsara588@gmail.com?subject=Inquiry: ${service}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
      window.location.href = mailtoLink;
      setStatus('success');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const skills = [
    { name: 'Python', category: 'Backend', icon: <TerminalIcon size={18} />, level: 90 },
    { name: 'Django / Flask', category: 'Backend', icon: <Layers size={18} />, level: 85 },
    { name: 'OpenCV / Vision', category: 'AI', icon: <Camera size={18} />, level: 80 },
    { name: 'React / Tailwind', category: 'Frontend', icon: <Layout size={18} />, level: 85 },
    { name: 'IoT / ESP32', category: 'Hardware', icon: <Cpu size={18} />, level: 75 },
    { name: 'PostgreSQL', category: 'Database', icon: <Database size={18} />, level: 80 }
  ];

  const projects = [
    {
      id: 'ancs',
      title: 'Automatic Number Plate Capture (ANCS)',
      category: 'Computer Vision & Automation',
      summary: 'Developed an intelligent vehicle monitoring system that automatically detects vehicles and captures number plates and full vehicle images in real time.',
      highlights: [
        'Real-time vehicle detection using camera input',
        'Automatic number plate capture with OCR',
        'Duplicate detection prevention logic',
        'Configurable RTSP/IP camera support'
      ],
      tech: ['Python', 'OpenCV', 'Tkinter', 'Camera Streaming'],
      icon: <Camera size={24} />,
      hasLive: false,
      github: 'https://github.com/TharuUP/ANCS',
      doc: '/docs/ancs-technical-manual.pdf'
    },
    {
      id: 'job-system',
      title: 'Job Management System',
      category: 'Web-Based Workflow Automation',
      summary: 'Designed and developed a centralized job tracking and workflow management system to replace manual job handling processes.',
      highlights: [
        'Centralized job record management',
        'Role-based user access control',
        'Automated email reporting systems',
        'Task scheduling with Celery/Redis'
      ],
      tech: ['Python', 'Django', 'PostgreSQL', 'JavaScript'],
      icon: <Layers size={24} />,
      hasLive: false,
      github: 'https://github.com/TharuUP/JMS',
      doc: '/docs/job-system-spec.pdf'
    },
    {
      id: 'hotline',
      title: 'Data Management System (Hotline Solution)',
      category: 'Enterprise Record Management',
      industry: 'Laughs Eco Sri',
      summary: 'Developed an internal data management system for hotline operations at Laughs Eco Sri to digitally record customer complaints and operational records.',
      highlights: [
        'Complaint recording and status tracking',
        'Quick search and historical record retrieval',
        'Structured data tracking for management reporting',
        'Significantly improved operational transparency'
      ],
      tech: ['Python', 'Django', 'Web Interface', 'Database Management'],
      icon: <Database size={24} />,
      hasLive: true,
      link: 'https://tharu0creation.pythonanywhere.com/login/',
      github: 'https://github.com/TharuUP/DMS',
      doc: null
    },
    {
      id: 'business-site',
      title: 'Website for Business',
      category: 'Frontend & Brand Identity',
      summary: 'Crafting high-performance, responsive business websites that translate brand identity into digital experiences.',
      highlights: [
        'Fully responsive modern UI/UX',
        'SEO optimization and performance tuning',
        'Interactive contact and lead forms',
        'Smooth animations and modern styling'
      ],
      tech: ['React', 'Tailwind CSS', 'Framer Motion', 'JavaScript'],
      icon: <Globe size={24} />,
      hasLive: true,
      link: 'https://pixelcrewdesigners.github.io/pixel-crew-website/',
      github: 'https://github.com/TharuUP/Website',
      doc: null
    },
    {
      id: 'health',
      title: 'Smart Remote Health Monitoring',
      category: 'IoT + Cloud Healthcare Platform',
      summary: 'Built an IoT-based system integrating ESP32 hardware with a cloud-based Django backend to collect real-time patient vital data.',
      highlights: [
        'Real-time heart rate and temperature monitoring',
        'IoT device integration (ESP32)',
        'Telegram emergency alert system',
        'Live monitoring dashboard'
      ],
      tech: ['ESP32', 'Django', 'REST API', 'IoT Sensors'],
      icon: <Stethoscope size={24} />,
      hasLive: true,
      link: 'https://wd31.pythonanywhere.com/',
      github: 'https://github.com/TharuUP/SRHMS',
      doc: '/docs/health-monitoring-docs.pdf'
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 font-sans ${darkMode ? 'bg-[#050505] text-slate-300' : 'bg-slate-50 text-slate-900'}`}>

      {/* Background Grid & Glowing Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[140px] opacity-20 ${darkMode ? 'bg-blue-600' : 'bg-blue-200'}`}></div>
        <div className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[140px] opacity-20 ${darkMode ? 'bg-purple-600' : 'bg-purple-200'}`}></div>
        <div className={`absolute inset-0 opacity-[0.03] ${darkMode ? 'bg-[url("https://www.transparenttextures.com/patterns/carbon-fibre.png")]' : ''}`}></div>
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: `linear-gradient(${darkMode ? '#334155' : '#cbd5e1'} 1px, transparent 1px), linear-gradient(90deg, ${darkMode ? '#334155' : '#cbd5e1'} 1px, transparent 1px)`, backgroundSize: '60px 60px' }}></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b transition-all ${darkMode ? 'bg-black/50 border-white/5 shadow-2xl' : 'bg-white/70 border-black/5'}`}>
        <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold group-hover:rotate-12 transition-transform shadow-lg shadow-blue-600/20">
              <Code2 size={24} />
            </div>
            <span className="font-black tracking-tighter text-xl uppercase">Tharusha<span className="text-blue-500">.Dev</span></span>
          </div>

          <div className="hidden md:flex items-center gap-10 text-[11px] font-black tracking-[0.2em] uppercase opacity-70">
            {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
              <a key={item} href={`#${item}`} className={`hover:text-blue-500 transition-colors ${activeSection === item ? 'text-blue-500 opacity-100' : ''}`}>
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2.5 rounded-full hover:bg-slate-500/10 transition-colors">
              {darkMode ? <Sun size={24} className="text-yellow-400" /> : <Moon size={24} className="text-slate-600" />}
            </button>
            <a href="#contact" className="hidden sm:block px-6 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20">
              CONNECT
            </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-[1440px] mx-auto px-6">

        {/* Hero Section */}
        <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center pt-24 pb-12">
          <div className="space-y-8 max-w-5xl">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[11px] font-black uppercase tracking-[0.3em]">
              <Zap size={16} fill="currentColor" /> Technical Undergraduate & Developer
            </div>
            <h1 className="text-6xl sm:text-7xl md:text-9xl font-black tracking-tighter leading-[0.9]">
              I AM A <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-400 to-indigo-500">
                {text}
              </span>
              <span className="inline-block w-2 h-14 md:h-24 bg-blue-500 ml-2 animate-pulse align-middle"></span>
            </h1>
            <p className="text-xl md:text-2xl opacity-60 font-medium max-w-3xl mx-auto leading-relaxed px-4">
              Engineering high-reliability automation systems and software solutions. Focused on industrial-grade performance.
            </p>
            <div className="flex flex-wrap justify-center gap-6 pt-10">
              <a href="#projects" className="px-12 py-5 bg-blue-600 text-white font-black rounded-2xl hover:scale-105 transition-all shadow-2xl shadow-blue-600/30 flex items-center gap-3">
                PROJECT PORTFOLIO <ChevronRight size={22} />
              </a>
              <a
                href="/docs/tharusha-cv.pdf"
                download
                className={`px-12 py-5 border font-black rounded-2xl transition-all flex items-center gap-3 ${darkMode
                  ? 'border-white/10 hover:bg-white/5'
                  : 'border-black/10 hover:bg-black/5'
                  }`}
              >
                <FileText size={22} /> VIEW RESUME
              </a>
            </div>
          </div>
        </section>

        {/* Next-Level About Section */}
        <section id="about" className="py-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center px-4">

            {/* Glowing Profile Section */}
            <div className="order-2 lg:order-1 relative group w-full max-w-lg mx-auto">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-300"></div>
              <div className={`relative aspect-[3/4] w-full rounded-[2.8rem] border overflow-hidden ${darkMode ? 'bg-slate-900 border-white/10' : 'bg-slate-100 border-black/5'}`}>
                <img
                  src="/images/profile.jpg"
                  alt="Tharusha Bimsara"
                  className="w-full h-full object-cover"
                />
                <div className="w-full h-full flex flex-col items-center justify-center opacity-30 bg-gradient-to-br from-slate-800 to-slate-950">
                  <User size={120} className="mb-6 text-blue-500" />
                  <p className="text-sm font-black uppercase tracking-[0.4em]">Tharusha Bimsara</p>
                  <p className="text-xs mt-3 italic opacity-50">Industrial Photography Theme</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-12 left-10 right-10">
                  <h3 className="text-white text-4xl font-black tracking-tighter">Tharusha Bimsara</h3>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="h-1 w-8 bg-blue-500 rounded-full"></div>
                    <p className="text-blue-400 font-black uppercase text-[11px] tracking-[0.2em]">Undergraduate Systems Architect</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-blue-600 rounded-full flex flex-col items-center justify-center text-white border-[12px] border-[#050505] shadow-[0_20px_50px_rgba(37,99,235,0.3)] z-20">
                <Award size={40} />
                <span className="text-[11px] font-black uppercase tracking-tighter mt-2">Industry</span>
                <span className="text-[11px] font-black uppercase tracking-tighter">Proven</span>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-12">
              <div className="space-y-6">
                <h2 className="text-6xl md:text-7xl font-black tracking-tighter leading-tight">
                  About the <br /><span className="text-blue-500">Architect.</span>
                </h2>
                <div className="h-1.5 w-24 bg-blue-600 rounded-full"></div>
              </div>

              <div className="space-y-8 text-xl opacity-80 font-medium leading-relaxed max-w-2xl">
                <p>
                  I am <span className="text-white font-black underline decoration-blue-500 decoration-4 underline-offset-8">Tharusha Bimsara</span>, a technical undergraduate focused on the fusion of hardware precision and software logic.
                </p>
                <p>
                  My expertise spans across <span className="text-blue-500 font-bold">Computer Vision</span>, <span className="text-blue-500 font-bold">IoT Architecture</span>, and <span className="text-blue-500 font-bold">Automation Systems</span>. I specialize in building solutions that digitize manual industrial processes.
                </p>
                <p>
                  Having delivered systems for industry leaders like <span className="italic font-bold text-white">Laughs Eco Sri</span>, I bring a professional mindset to every project, ensuring that every line of code serves a functional, resilient purpose.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                <div className={`p-8 rounded-3xl border ${darkMode ? 'bg-white/5 border-white/10 shadow-2xl' : 'bg-white shadow-md'}`}>
                  <Shield className="text-blue-500 mb-4" size={32} />
                  <h4 className="text-sm font-black uppercase tracking-[0.2em]">Resilience</h4>
                  <p className="text-[12px] opacity-50 mt-2 font-bold uppercase leading-relaxed tracking-wider">Building high-availability systems for real-world stress.</p>
                </div>
                <div className={`p-8 rounded-3xl border ${darkMode ? 'bg-white/5 border-white/10 shadow-2xl' : 'bg-white shadow-md'}`}>
                  <Cpu className="text-purple-500 mb-4" size={32} />
                  <h4 className="text-sm font-black uppercase tracking-[0.2em]">Edge-Logic</h4>
                  <p className="text-[12px] opacity-50 mt-2 font-bold uppercase leading-relaxed tracking-wider">Integrating AI-driven vision and sensors at the device level.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-40 border-y border-white/5">
          <div className="text-center mb-24 space-y-6">
            <h2 className="text-5xl font-black uppercase tracking-tighter">Technical Stack</h2>
            <div className="h-1.5 w-32 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, i) => (
              <div key={i} className={`p-10 rounded-[2.5rem] border transition-all hover:border-blue-500/30 hover:-translate-y-2 ${darkMode ? 'bg-slate-900/40 border-white/5 shadow-2xl' : 'bg-white border-black/5 shadow-sm'}`}>
                <div className="flex justify-between items-center mb-8">
                  <div className="p-4 bg-blue-600/10 text-blue-500 rounded-2xl">
                    {skill.icon}
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] opacity-40">{skill.category}</span>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-end px-2">
                    <span className="font-black text-xl tracking-tight">{skill.name}</span>
                    <span className="text-xs font-mono opacity-40 font-bold">{skill.level}%</span>
                  </div>
                  <div className={`h-2 w-full rounded-full overflow-hidden ${darkMode ? 'bg-black/50' : 'bg-slate-100'}`}>
                    <div className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(37,99,235,0.5)]" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Project Section */}
        <section id="projects" className="py-40">
          <div className="mb-24 px-4">
            <h2 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter">Artifact Showroom</h2>
            <div className="flex items-center gap-4">
              <div className="h-1.5 w-16 bg-blue-600 rounded-full"></div>
              <span className="text-sm font-black uppercase tracking-[0.3em] opacity-50">Proven Industrial Case Studies</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className={`group relative rounded-[3rem] border overflow-hidden transition-all duration-500 hover:scale-[1.02] ${darkMode ? 'bg-slate-900/40 border-white/5 hover:border-blue-500/50 shadow-2xl' : 'bg-white border-black/5 shadow-xl'}`}
              >
                <div className="p-10 md:p-14 flex flex-col h-full">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-8 mb-10">
                    <div className={`w-16 h-16 rounded-[1.2rem] flex items-center justify-center ${darkMode ? 'bg-blue-600/10 text-blue-500 shadow-inner' : 'bg-blue-50 text-blue-600 shadow-sm'}`}>
                      {proj.icon}
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-3">
                      <span className="text-[11px] font-black uppercase tracking-[0.25em] px-5 py-2 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/20">
                        {proj.category}
                      </span>
                      {proj.industry && (
                        <span className="text-[11px] font-black uppercase tracking-[0.2em] px-4 py-2 bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 rounded-full flex items-center gap-2">
                          <Briefcase size={14} /> {proj.industry}
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-3xl font-black mb-6 group-hover:text-blue-500 transition-colors tracking-tight">{proj.title}</h3>
                  <p className="text-lg opacity-60 font-medium leading-relaxed mb-10 flex-1">
                    {proj.summary}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-12">
                    {proj.tech.map(t => (
                      <span key={t} className="px-4 py-2 bg-slate-500/10 rounded-xl text-[11px] font-black font-mono border border-white/5 uppercase opacity-70 tracking-tighter">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <button
                      onClick={() => setSelectedProject(proj)}
                      className="py-5 px-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[1.25rem] text-[11px] font-black uppercase tracking-[0.3em] transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3"
                    >
                      ENGINEERING VIEW <ChevronRight size={20} />
                    </button>
                    <div className="flex gap-4">
                      {proj.hasLive && (
                        <a href={proj.link} target="_blank" rel="noopener noreferrer" className={`flex-1 flex items-center justify-center rounded-[1.25rem] border transition-all ${darkMode ? 'border-white/10 hover:bg-white/5 hover:border-blue-500/50' : 'border-black/5 hover:bg-black/5'}`}>
                          <Globe size={24} />
                        </a>
                      )}
                      {proj.doc && (
                        <a href={proj.doc} download className={`flex-1 flex items-center justify-center rounded-[1.25rem] border transition-all ${darkMode ? 'border-white/10 hover:bg-white/5 hover:border-blue-500/50' : 'border-black/5 hover:bg-black/5'}`}>
                          <Download size={24} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-40 mb-20 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

            {/* Left Content */}
            <div className="space-y-16">
              <div className="space-y-8">
                <h2 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.9]">
                  LET'S <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-500 uppercase">
                    Connect.
                  </span>
                </h2>
                <p className="text-base md:text-lg opacity-60 font-black uppercase tracking-[0.3em] max-w-lg leading-relaxed">
                  Brief us on your project and see how system architecture scales your business identity.
                </p>
              </div>

              <div className="space-y-10">
                <div className="flex items-center gap-8 group">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xl shadow-black/40">
                    <Phone size={28} />
                  </div>
                  <div>
                    <p className="text-[12px] font-black uppercase tracking-[0.3em] opacity-40">Direct Line</p>
                    <p className="text-3xl font-black text-white tracking-tighter">+94 72 033 5383</p>
                  </div>
                </div>

                <div className="flex items-center gap-8 group">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xl shadow-black/40">
                    <Mail size={28} />
                  </div>
                  <div>
                    <p className="text-[12px] font-black uppercase tracking-[0.3em] opacity-40">Briefing Hub</p>
                    <p className="text-2xl font-black text-white uppercase break-all tracking-tighter">tharusahbimsara588@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Automated Contact Form */}
            <div className={`p-10 md:p-16 rounded-[3.5rem] border backdrop-blur-3xl shadow-2xl relative overflow-hidden ${darkMode ? 'bg-white/5 border-white/10 shadow-black' : 'bg-white border-black/5 shadow-slate-200'}`}>
              <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 blur-[120px] -z-0"></div>

              <form className="relative z-10 space-y-8" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] opacity-40 ml-2">Name</label>
                    <input
                      type="text"
                      required
                      disabled={status === 'sending'}
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="YOUR NAME"
                      className="w-full px-7 py-5 bg-black/40 border border-white/10 rounded-2xl outline-none focus:border-purple-500 transition-all text-sm font-bold uppercase tracking-widest placeholder:opacity-20" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] opacity-40 ml-2">Email</label>
                    <input
                      type="email"
                      required
                      disabled={status === 'sending'}
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="YOUR EMAIL"
                      className="w-full px-7 py-5 bg-black/40 border border-white/10 rounded-2xl outline-none focus:border-purple-500 transition-all text-sm font-bold uppercase tracking-widest placeholder:opacity-20" />
                  </div>
                </div>

                <div className="space-y-3 relative">
                  <label className="text-[11px] font-black uppercase tracking-[0.2em] opacity-40 ml-2">Service Type</label>
                  <div className="relative">
                    <select
                      disabled={status === 'sending'}
                      value={formData.service}
                      onChange={e => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-7 py-5 bg-black/40 border border-white/10 rounded-2xl outline-none focus:border-purple-500 transition-all text-sm font-bold uppercase tracking-widest appearance-none cursor-pointer disabled:opacity-50">
                      <option className="bg-[#050505]">System Automation</option>
                      <option className="bg-[#050505]">Computer Vision Solution</option>
                      <option className="bg-[#050505]">Business Website</option>
                      <option className="bg-[#050505]">IoT Development</option>
                    </select>
                    <ChevronDown size={22} className="absolute right-7 top-1/2 -translate-y-1/2 pointer-events-none opacity-40" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-[0.2em] opacity-40 ml-2">Project Brief</label>
                  <textarea
                    rows="5"
                    required
                    disabled={status === 'sending'}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="TELL ME ABOUT YOUR PROJECT"
                    className="w-full px-7 py-5 bg-black/40 border border-white/10 rounded-2xl outline-none focus:border-purple-500 transition-all text-sm font-bold uppercase tracking-widest resize-none placeholder:opacity-20"></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending' || status === 'success'}
                  className={`w-full py-6 font-black text-sm uppercase tracking-[0.4em] rounded-2xl shadow-2xl transition-all flex items-center justify-center gap-4 ${status === 'success'
                    ? 'bg-emerald-500 text-white shadow-emerald-500/20 cursor-default scale-[0.98]'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-purple-600/30 hover:scale-[1.03] hover:shadow-purple-600/50 active:scale-95 disabled:opacity-70'
                    }`}>
                  {status === 'sending' && <Loader2 className="animate-spin" size={24} />}
                  {status === 'success' && <CheckCircle2 size={24} />}
                  {status === 'idle' && 'Launch Brief'}
                  {status === 'sending' && 'Syncing Systems...'}
                  {status === 'success' && 'Transmission Success!'}
                </button>

                {status === 'success' && (
                  <p className="text-[11px] text-center font-black text-emerald-500 animate-pulse uppercase tracking-[0.3em] mt-4 bg-emerald-500/5 py-3 rounded-xl border border-emerald-500/10">
                    Sync Complete. Response protocol initiated.
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-[11px] text-center font-black text-red-400 uppercase tracking-[0.3em] mt-4">
                    Sync Failed. Please check connection.
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>

      </main>

      <footer className="py-24 border-t border-white/5 text-center opacity-40 px-6">
        <p className="text-[11px] font-black uppercase tracking-[0.6em] leading-relaxed">
          Technical Portfolio // Tharusha Bimsara // Build v5.0.0-PRO // © {new Date().getFullYear()}
        </p>
      </footer>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
          <div className={`relative w-full max-w-6xl max-h-[95vh] overflow-y-auto rounded-[4rem] border ${darkMode ? 'bg-[#0f0f12] border-white/10 text-white' : 'bg-white border-black/10 text-slate-900'} shadow-2xl`}>
            <button onClick={() => setSelectedProject(null)} className="absolute top-10 right-10 p-4 rounded-[1.5rem] hover:bg-white/5 transition-colors z-10 border border-white/5">
              <X size={32} />
            </button>

            <div className="p-12 md:p-20 lg:p-24">
              <div className="mb-16">
                <div className="flex items-center gap-5 mb-6">
                  <span className="px-6 py-2 bg-blue-600 text-[12px] font-black uppercase tracking-[0.3em] rounded-full shadow-lg shadow-blue-600/30">Case Study</span>
                  <span className="text-sm font-bold opacity-40 uppercase tracking-widest font-mono">REF_{selectedProject.id.toUpperCase()}</span>
                </div>
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter">{selectedProject.title}</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
                <div className="lg:col-span-2 space-y-20">
                  <section>
                    <h4 className="text-[11px] font-black uppercase text-blue-500 tracking-[0.4em] mb-8 flex items-center gap-4">
                      <TerminalIcon size={20} /> System Architecture Summary
                    </h4>
                    <p className="text-2xl md:text-3xl opacity-80 font-medium leading-tight max-w-3xl">{selectedProject.summary}</p>
                  </section>

                  <section>
                    <h4 className="text-[11px] font-black uppercase text-blue-500 tracking-[0.4em] mb-10 flex items-center gap-4">
                      <Zap size={20} /> Technical Highlights & Deliverables
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {selectedProject.highlights.map((h, i) => (
                        <div key={i} className={`p-8 rounded-[2.5rem] border flex items-start gap-5 transition-all hover:scale-[1.03] ${darkMode ? 'bg-white/5 border-white/5 hover:bg-white/[0.08]' : 'bg-slate-50 border-black/5'}`}>
                          <CheckCircle2 className="text-blue-500 mt-1 shrink-0" size={28} />
                          <span className="text-lg font-bold opacity-90 leading-snug tracking-tight">{h}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                <div className="space-y-14">
                  <div className={`p-10 rounded-[3rem] border transition-all ${darkMode ? 'bg-white/5 border-white/5 shadow-2xl' : 'bg-slate-100 border-black/5 shadow-sm'}`}>
                    <h4 className="text-[11px] font-black uppercase tracking-[0.3em] mb-10 opacity-40">Engineering Stack</h4>
                    <div className="flex flex-wrap gap-4">
                      {selectedProject.tech.map(t => (
                        <div key={t} className="px-5 py-2.5 bg-blue-600/10 text-blue-500 rounded-xl border border-blue-500/20 font-mono text-xs font-black uppercase tracking-tighter">{t}</div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    {selectedProject.hasLive && (
                      <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="w-full py-6 bg-white text-black font-black rounded-3xl flex items-center justify-center gap-5 hover:bg-blue-600 hover:text-white transition-all shadow-2xl no-underline text-sm uppercase tracking-[0.2em] hover:scale-[1.03]">
                        <Globe size={28} /> DEPLOYED SITE
                      </a>
                    )}
                    {selectedProject.doc && (
                      <a href={selectedProject.doc} download className="w-full py-6 border border-white/10 font-black rounded-3xl flex items-center justify-center gap-5 hover:bg-white/5 transition-all no-underline text-current text-sm uppercase tracking-[0.2em] hover:scale-[1.03]">
                        <Download size={28} /> TECHNICAL DOCS
                      </a>
                    )}
                    {selectedProject.github && (
                      <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="w-full py-6 border border-white/10 font-black rounded-3xl flex items-center justify-center gap-5 hover:bg-white/5 transition-all no-underline text-current text-sm uppercase tracking-[0.2em] hover:scale-[1.03]">
                        <Github size={28} /> SOURCE CODE
                      </a>
                    )}
                  </div>

                  <div className="pt-10 border-t border-white/5 text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-20 px-4">Secure Project Review Protocol</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;