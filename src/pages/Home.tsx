import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Zap, 
  Code2, 
  Rocket, 
  Shield, 
  Globe,
  MessageSquare,
  Settings,
  BarChart3,
  Terminal,
  Play,
  GitBranch,
  Database,
  Cloud
} from 'lucide-react';

const Home: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const [currentExample, setCurrentExample] = useState(0);
  
  const examples = [
    'Create a blog API with authentication',
    'Build an e-commerce backend',
    'Design a social media platform',
    'Generate a task management system'
  ];

  useEffect(() => {
    const text = examples[currentExample];
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setTypedText(text.slice(0, i + 1));
        i++;
      } else {
        setTimeout(() => {
          setCurrentExample((prev) => (prev + 1) % examples.length);
          setTypedText('');
        }, 2000);
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [currentExample]);

  const features = [
    {
      icon: MessageSquare,
      title: 'Natural Language Processing',
      description: 'Describe your backend in plain English and watch AI transform it into production code.',
      color: 'blue'
    },
    {
      icon: Code2,
      title: 'Multi-Framework Generation',
      description: 'Generate Django, Go Fiber, or Rails backends from the same specification.',
      color: 'green'
    },
    {
      icon: Rocket,
      title: 'One-Click Deployment',
      description: 'Deploy to Railway, Render, or Fly.io with automated containerization.',
      color: 'purple'
    },
    {
      icon: Shield,
      title: 'Security by Default',
      description: 'Built-in authentication, authorization, and OWASP security practices.',
      color: 'orange'
    },
    {
      icon: BarChart3,
      title: 'Observability Stack',
      description: 'Integrated monitoring with Prometheus metrics and Grafana dashboards.',
      color: 'cyan'
    },
    {
      icon: Globe,
      title: 'Event-Driven Architecture',
      description: 'Kafka-powered event mesh with real-time service orchestration.',
      color: 'pink'
    }
  ];

  const workflows = [
    {
      step: 1,
      title: 'Describe',
      description: 'Natural language to DSL',
      path: '/prompt',
      icon: MessageSquare,
      color: 'blue'
    },
    {
      step: 2,
      title: 'Build',
      description: 'Visual DSL editor',
      path: '/builder',
      icon: Settings,
      color: 'green'
    },
    {
      step: 3,
      title: 'Generate',
      description: 'Production-ready code',
      path: '/generate',
      icon: Code2,
      color: 'purple'
    },
    {
      step: 4,
      title: 'Deploy',
      description: 'Cloud deployment',
      path: '/deploy',
      icon: Rocket,
      color: 'orange'
    }
  ];

  const stats = [
    { label: 'APIs Generated', value: '10,000+', icon: Database },
    { label: 'Deployments', value: '5,000+', icon: Cloud },
    { label: 'Developers', value: '2,500+', icon: GitBranch },
    { label: 'Uptime', value: '99.9%', icon: Zap }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
      green: 'text-green-400 bg-green-400/10 border-green-400/20',
      purple: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
      orange: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
      cyan: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
      pink: 'text-pink-400 bg-pink-400/10 border-pink-400/20'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-32">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-cyan-600/10"></div>
        <div className="relative text-center space-y-12 py-20">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-full text-sm text-slate-300">
              <Terminal className="w-4 h-4 text-green-400" />
              <span>AI-Powered Backend Generation Platform</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold leading-tight">
              <span className="text-white">Build Backends</span>
              <br />
              <span className="gradient-text">with AI Magic</span>
            </h1>
            
            <div className="max-w-4xl mx-auto space-y-4">
              <p className="text-xl text-slate-300 leading-relaxed">
                Transform natural language descriptions into production-ready backend services.
                Generate, deploy, and monitor enterprise-grade APIs in minutes, not months.
              </p>
              
              <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4 font-mono text-left max-w-2xl mx-auto">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-slate-400 text-sm ml-2">InfraNest Terminal</span>
                </div>
                <div className="text-green-400">
                  <span className="text-blue-400">$</span> infranest describe "
                  <span className="text-white">{typedText}</span>
                  <span className="animate-pulse">|</span>"
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/prompt"
              className="inline-flex items-center px-8 py-4 btn-primary font-semibold text-lg group"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Start Building
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center px-8 py-4 btn-secondary font-semibold text-lg"
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              View Examples
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto pt-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center space-y-2">
                  <Icon className="w-8 h-8 text-blue-400 mx-auto" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-white">
            Everything You Need for Modern APIs
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            InfraNest provides all the tools and infrastructure needed to create, deploy, 
            and maintain production-ready backend services with enterprise-grade reliability.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colorClasses = getColorClasses(feature.color);
            return (
              <div
                key={index}
                className="interactive-card p-8 group animate-slideInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-4">
                  <div className={`inline-flex p-3 rounded-lg border ${colorClasses}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Workflow Section */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-white">
            From Idea to Production in Four Steps
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Our streamlined workflow takes you from concept to deployed backend service 
            with minimal effort and maximum reliability.
          </p>
        </div>
        
        <div className="relative">
          {/* Connection lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflows.map((workflow, index) => {
              const Icon = workflow.icon;
              const colorClasses = getColorClasses(workflow.color);
              return (
                <Link
                  key={index}
                  to={workflow.path}
                  className="group block relative"
                >
                  <div className="interactive-card p-8 text-center space-y-4 relative z-10">
                    <div className={`inline-flex p-4 rounded-full border ${colorClasses} relative`}>
                      <Icon className="w-8 h-8" />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-slate-800 border-2 border-slate-600 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{workflow.step}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors mb-2">
                        {workflow.title}
                      </h3>
                      <p className="text-slate-400 text-sm">
                        {workflow.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all mx-auto" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative text-center space-y-8 py-20">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-white">
              Ready to Transform Your Development?
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Join thousands of developers who are already building faster, more reliable 
              backends with InfraNest's AI-powered platform.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/prompt"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg shadow-blue-600/25"
            >
              <Zap className="w-5 h-5 mr-2" />
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center px-8 py-4 btn-secondary font-semibold text-lg"
            >
              <Terminal className="w-5 h-5 mr-2" />
              View Documentation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;