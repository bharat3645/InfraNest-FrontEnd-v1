import React from 'react';
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
  BarChart3
} from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: MessageSquare,
      title: 'Natural Language to Code',
      description: 'Describe your backend in plain English and watch it transform into production-ready code.'
    },
    {
      icon: Code2,
      title: 'Multi-Framework Support',
      description: 'Generate Django, Go Fiber, or Rails backends from the same specification.'
    },
    {
      icon: Rocket,
      title: 'One-Click Deployment',
      description: 'Deploy to Railway, Render, or Fly.io with automated Docker containerization.'
    },
    {
      icon: Shield,
      title: 'Security First',
      description: 'Built-in authentication, authorization, and OWASP security best practices.'
    },
    {
      icon: BarChart3,
      title: 'Monitoring & Analytics',
      description: 'Integrated Prometheus metrics and Grafana dashboards for observability.'
    },
    {
      icon: Globe,
      title: 'Event-Driven Architecture',
      description: 'Kafka-powered event mesh with real-time service orchestration.'
    }
  ];

  const workflows = [
    {
      step: 1,
      title: 'Describe Your Backend',
      description: 'Use natural language to describe your API requirements',
      path: '/prompt',
      icon: MessageSquare
    },
    {
      step: 2,
      title: 'Refine with Builder',
      description: 'Fine-tune your specification with our visual DSL builder',
      path: '/builder',
      icon: Settings
    },
    {
      step: 3,
      title: 'Generate Code',
      description: 'Create production-ready backend code in your preferred framework',
      path: '/generate',
      icon: Code2
    },
    {
      step: 4,
      title: 'Deploy & Monitor',
      description: 'Deploy to the cloud and monitor with built-in observability',
      path: '/deploy',
      icon: Rocket
    }
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Build Backends with
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {' '}AI Magic
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Transform natural language descriptions into production-ready backend services. 
            Generate, deploy, and monitor enterprise-grade APIs in minutes, not months.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/prompt"
            className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-blue-600/25"
          >
            Start Building
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-all border border-slate-600"
          >
            View Examples
            <Zap className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-white">
            Everything You Need to Build Modern APIs
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            InfraNest provides all the tools and infrastructure needed to create, deploy, and maintain production-ready backend services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-all group"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-600/20 rounded-lg group-hover:bg-blue-600/30 transition-colors">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Workflow Section */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-white">
            From Idea to Production in Four Steps
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Our streamlined workflow takes you from concept to deployed backend service with minimal effort.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflows.map((workflow, index) => {
            const Icon = workflow.icon;
            return (
              <Link
                key={index}
                to={workflow.path}
                className="group block"
              >
                <div className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-all hover:bg-slate-800/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {workflow.step}
                      </div>
                      <Icon className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {workflow.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {workflow.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-8 py-16">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white">
            Ready to Transform Your Backend Development?
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Join thousands of developers who are already building faster, more reliable backends with InfraNest.
          </p>
        </div>
        
        <Link
          to="/prompt"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-blue-600/25"
        >
          Get Started Free
          <ArrowRight className="w-5 h-5 ml-2" />
        </Link>
      </section>
    </div>
  );
};

export default Home;