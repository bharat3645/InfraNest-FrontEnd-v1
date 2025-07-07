import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  MessageSquare, 
  Settings, 
  Code, 
  Rocket, 
  BarChart3,
  Terminal,
  Zap
} from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/prompt', label: 'Prompt', icon: MessageSquare },
    { path: '/builder', label: 'Builder', icon: Settings },
    { path: '/generate', label: 'Generate', icon: Code },
    { path: '/deploy', label: 'Deploy', icon: Rocket },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 }
  ];
  
  return (
    <nav className="glass-strong border-b border-slate-700/50 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Terminal className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold gradient-text">
                InfraNest
              </span>
              <span className="text-xs text-slate-400 font-mono">
                v1.0.0-beta
              </span>
            </div>
          </Link>
          
          {/* Navigation Items */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg transition-all group ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline-block font-medium">{item.label}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Status Indicator */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1 bg-slate-800/50 rounded-full border border-slate-600/50">
              <div className="status-dot status-online"></div>
              <span className="text-xs text-slate-300 font-mono">ONLINE</span>
            </div>
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all">
              <Zap className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;