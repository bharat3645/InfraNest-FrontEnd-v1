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
  Cloud,
  Sparkles,
  ChevronRight,
  Clock,
  Users,
  TrendingUp
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

  const recentProjects = [
    { name: 'Blog API', framework: 'Django', status: 'Live', lastModified: '2 hours ago' },
    { name: 'E-commerce', framework: 'Go Fiber', status: 'Building', lastModified: '1 day ago' },
    { name: 'Social App', framework: 'Rails', status: 'Draft', lastModified: '3 days ago' }
  ];

  const quickStats = [
    { label: 'APIs Generated', value: '12', icon: Database, color: 'text-blue-400' },
    { label: 'Deployments', value: '8', icon: Rocket, color: 'text-green-400' },
    { label: 'Active Projects', value: '5', icon: Code2, color: 'text-purple-400' },
    { label: 'Uptime', value: '99.9%', icon: TrendingUp, color: 'text-orange-400' }
  ];

  return (
    <div className="h-full bg-[#0a0a0a] text-white overflow-auto">
      <div className="max-w-7xl mx-auto p-8 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#1a1a1a] border border-[#333333] rounded-full text-sm">
              <Sparkles className="w-4 h-4 text-[#00ff88]" />
              <span className="text-gray-300">AI-Powered Backend Generation</span>
              <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse"></div>
            </div>
            
            <h1 className="text-6xl font-bold leading-tight">
              <span className="text-white">Build Backends</span>
              <br />
              <span className="bg-gradient-to-r from-[#00ff88] to-[#00ccff] bg-clip-text text-transparent">
                with AI Magic
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Transform natural language into production-ready backend services. 
              Generate, deploy, and monitor enterprise-grade APIs in minutes.
            </p>
          </div>

          {/* Terminal Demo */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-[#111111] border border-[#333333] rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-[#333333]">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[#ff4444] rounded-full"></div>
                  <div className="w-3 h-3 bg-[#ffaa00] rounded-full"></div>
                  <div className="w-3 h-3 bg-[#00ff88] rounded-full"></div>
                </div>
                <span className="text-sm text-gray-400 font-mono">InfraNest Terminal</span>
                <div className="w-16"></div>
              </div>
              <div className="p-4 font-mono text-sm">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-[#00ff88]">➜</span>
                  <span className="text-[#00ccff]">infranest</span>
                  <span className="text-gray-400">describe</span>
                </div>
                <div className="text-gray-300">
                  "{typedText}<span className="animate-pulse">|</span>"
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/prompt"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#00ff88] to-[#00ccff] text-black rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-[#00ff88]/25 transition-all transform hover:scale-105"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Building
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center px-8 py-4 bg-[#1a1a1a] border border-[#333333] text-white rounded-lg font-semibold text-lg hover:bg-[#222222] transition-all"
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              View Dashboard
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-[#111111] border border-[#333333] rounded-lg p-6 hover:border-[#444444] transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                  <TrendingUp className="w-4 h-4 text-gray-500" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Projects */}
          <div className="lg:col-span-2 bg-[#111111] border border-[#333333] rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Recent Projects</h2>
              <Link 
                to="/dashboard"
                className="text-[#00ff88] hover:text-[#00ccff] text-sm flex items-center space-x-1"
              >
                <span>View all</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {recentProjects.map((project, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg hover:bg-[#222222] transition-colors cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#00ff88] to-[#00ccff] rounded-lg flex items-center justify-center">
                      <Code2 className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <div className="font-medium text-white">{project.name}</div>
                      <div className="text-sm text-gray-400">{project.framework}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm px-2 py-1 rounded ${
                      project.status === 'Live' ? 'bg-green-400/20 text-green-400' :
                      project.status === 'Building' ? 'bg-yellow-400/20 text-yellow-400' :
                      'bg-gray-400/20 text-gray-400'
                    }`}>
                      {project.status}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{project.lastModified}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-[#111111] border border-[#333333] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Start</h3>
              <div className="space-y-3">
                <Link
                  to="/prompt"
                  className="flex items-center space-x-3 p-3 bg-[#1a1a1a] rounded-lg hover:bg-[#222222] transition-colors"
                >
                  <MessageSquare className="w-5 h-5 text-[#00ff88]" />
                  <div>
                    <div className="font-medium text-white">AI Prompt</div>
                    <div className="text-sm text-gray-400">Describe your backend</div>
                  </div>
                </Link>
                <Link
                  to="/builder"
                  className="flex items-center space-x-3 p-3 bg-[#1a1a1a] rounded-lg hover:bg-[#222222] transition-colors"
                >
                  <Settings className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="font-medium text-white">DSL Builder</div>
                    <div className="text-sm text-gray-400">Visual configuration</div>
                  </div>
                </Link>
                <Link
                  to="/generate"
                  className="flex items-center space-x-3 p-3 bg-[#1a1a1a] rounded-lg hover:bg-[#222222] transition-colors"
                >
                  <Code2 className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="font-medium text-white">Generate Code</div>
                    <div className="text-sm text-gray-400">Production-ready code</div>
                  </div>
                </Link>
              </div>
            </div>

            <div className="bg-[#111111] border border-[#333333] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">API Gateway</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#00ff88] rounded-full"></div>
                    <span className="text-[#00ff88] text-sm">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Database</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#00ff88] rounded-full"></div>
                    <span className="text-[#00ff88] text-sm">Connected</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">AI Engine</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse"></div>
                    <span className="text-[#00ff88] text-sm">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;