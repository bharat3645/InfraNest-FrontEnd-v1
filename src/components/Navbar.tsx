import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  MessageSquare, 
  Settings, 
  Code, 
  Rocket, 
  BarChart3,
  Layers3
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
    <nav className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Layers3 className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
            <span className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
              InfraNest
            </span>
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
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline-block">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;