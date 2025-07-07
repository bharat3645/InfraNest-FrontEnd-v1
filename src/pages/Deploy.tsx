import React, { useState } from 'react';
import { 
  Rocket, 
  Globe, 
  Database, 
  Shield,
  CheckCircle,
  AlertCircle,
  Loader2,
  ExternalLink,
  Settings
} from 'lucide-react';

const Deploy: React.FC = () => {
  const [selectedProvider, setSelectedProvider] = useState('railway');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState<string | null>(null);

  const providers = [
    {
      id: 'railway',
      name: 'Railway',
      logo: '🚂',
      description: 'Deploy with zero configuration',
      features: ['Auto-deploy from Git', 'Built-in databases', 'Custom domains', 'Environment variables'],
      pricing: 'Free tier available'
    },
    {
      id: 'render',
      name: 'Render',
      logo: '🎨',
      description: 'Modern cloud platform',
      features: ['Auto-scaling', 'PostgreSQL', 'Redis', 'Static sites'],
      pricing: 'Free tier available'
    },
    {
      id: 'fly',
      name: 'Fly.io',
      logo: '✈️',
      description: 'Deploy close to your users',
      features: ['Global deployment', 'Edge computing', 'Auto-scaling', 'Postgres clusters'],
      pricing: 'Pay for resources used'
    }
  ];

  const deploymentSteps = [
    { step: 1, title: 'Code Generation', status: 'completed', description: 'Backend code generated successfully' },
    { step: 2, title: 'Containerization', status: 'completed', description: 'Docker image built and optimized' },
    { step: 3, title: 'Database Setup', status: 'completed', description: 'PostgreSQL database provisioned' },
    { step: 4, title: 'Environment Config', status: 'completed', description: 'Environment variables configured' },
    { step: 5, title: 'Deployment', status: 'in-progress', description: 'Deploying to production servers' },
    { step: 6, title: 'Health Check', status: 'pending', description: 'Verifying deployment health' },
    { step: 7, title: 'DNS Setup', status: 'pending', description: 'Configuring custom domain' }
  ];

  const handleDeploy = async () => {
    setIsDeploying(true);
    setDeploymentStatus('deploying');
    
    try {
      // Mock deployment process
      await new Promise(resolve => setTimeout(resolve, 5000));
      setDeploymentStatus('success');
    } catch (error) {
      setDeploymentStatus('error');
    } finally {
      setIsDeploying(false);
    }
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'in-progress':
        return <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />;
      case 'pending':
        return <div className="w-5 h-5 rounded-full border-2 border-slate-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-red-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">Deploy Your Backend</h1>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Deploy your generated backend to the cloud with one click. Choose your preferred hosting provider and we'll handle the rest.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Provider Selection */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50">
            <h2 className="text-xl font-semibold text-white mb-4">Choose Hosting Provider</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {providers.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => setSelectedProvider(provider.id)}
                  className={`p-6 rounded-lg border transition-all text-left ${
                    selectedProvider === provider.id
                      ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                      : 'bg-slate-700/30 border-slate-600 text-slate-300 hover:bg-slate-700/50'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{provider.logo}</span>
                      <div>
                        <h3 className="font-semibold">{provider.name}</h3>
                        <p className="text-xs text-slate-400">{provider.pricing}</p>
                      </div>
                    </div>
                    <p className="text-sm">{provider.description}</p>
                    <div className="space-y-1">
                      {provider.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                          <span className="text-xs">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Deployment Configuration */}
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50">
            <h2 className="text-xl font-semibold text-white mb-4">Deployment Configuration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  defaultValue="blog-api"
                  className="w-full p-3 bg-slate-700/50 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Environment
                </label>
                <select className="w-full p-3 bg-slate-700/50 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none">
                  <option>Production</option>
                  <option>Staging</option>
                  <option>Development</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Custom Domain (Optional)
              </label>
              <input
                type="text"
                placeholder="api.yourdomain.com"
                className="w-full p-3 bg-slate-700/50 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Deploy Button */}
          <div className="text-center">
            <button
              onClick={handleDeploy}
              disabled={isDeploying}
              className="flex items-center space-x-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all mx-auto"
            >
              {isDeploying ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Deploying...</span>
                </>
              ) : (
                <>
                  <Rocket className="w-5 h-5" />
                  <span>Deploy to {providers.find(p => p.id === selectedProvider)?.name}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Deployment Status */}
        <div className="space-y-6">
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">Deployment Status</h3>
            <div className="space-y-3">
              {deploymentSteps.map((step) => (
                <div key={step.step} className="flex items-center space-x-3">
                  {getStepIcon(step.status)}
                  <div className="flex-1">
                    <div className="font-medium text-white text-sm">{step.title}</div>
                    <div className="text-xs text-slate-400">{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Deployment Info */}
          {deploymentStatus === 'success' && (
            <div className="bg-green-600/20 border border-green-500/50 p-6 rounded-xl">
              <div className="flex items-center space-x-2 mb-4">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <h3 className="font-semibold text-green-300">Deployment Successful!</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">URL:</span>
                  <a
                    href="#"
                    className="text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                  >
                    <span>blog-api.railway.app</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Status:</span>
                  <span className="text-green-400">Live</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Database:</span>
                  <span className="text-blue-400">PostgreSQL</span>
                </div>
              </div>
            </div>
          )}

          {/* Resource Usage */}
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">Resource Overview</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Database className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="text-white font-medium">Database</div>
                  <div className="text-sm text-slate-400">PostgreSQL 15</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-green-400" />
                <div>
                  <div className="text-white font-medium">Web Service</div>
                  <div className="text-sm text-slate-400">Django + Gunicorn</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="text-white font-medium">Security</div>
                  <div className="text-sm text-slate-400">HTTPS + JWT Auth</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deploy;