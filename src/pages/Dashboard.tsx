import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Database,
  Globe,
  Activity,
  Clock,
  AlertCircle
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const projects = [
    {
      id: 1,
      name: 'Blog API',
      framework: 'Django',
      status: 'Live',
      url: 'blog-api.railway.app',
      requests: 1847,
      uptime: '99.9%',
      lastDeployed: '2 hours ago'
    },
    {
      id: 2,
      name: 'E-commerce API',
      framework: 'Go Fiber',
      status: 'Live',
      url: 'shop-api.render.com',
      requests: 3256,
      uptime: '100%',
      lastDeployed: '1 day ago'
    },
    {
      id: 3,
      name: 'Task Manager',
      framework: 'Rails',
      status: 'Building',
      url: 'tasks-api.fly.dev',
      requests: 0,
      uptime: '-',
      lastDeployed: 'Never'
    }
  ];

  const metrics = [
    {
      title: 'Total Projects',
      value: '12',
      change: '+2 this month',
      icon: Database,
      color: 'blue'
    },
    {
      title: 'API Requests',
      value: '45.2K',
      change: '+12% from last month',
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Active Users',
      value: '1,234',
      change: '+5% this week',
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Average Uptime',
      value: '99.8%',
      change: '+0.2% improvement',
      icon: Activity,
      color: 'yellow'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live':
        return 'text-green-400 bg-green-400/20';
      case 'Building':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'Error':
        return 'text-red-400 bg-red-400/20';
      default:
        return 'text-slate-400 bg-slate-400/20';
    }
  };

  const getMetricColor = (color: string) => {
    switch (color) {
      case 'blue':
        return 'text-blue-400 bg-blue-400/20';
      case 'green':
        return 'text-green-400 bg-green-400/20';
      case 'purple':
        return 'text-purple-400 bg-purple-400/20';
      case 'yellow':
        return 'text-yellow-400 bg-yellow-400/20';
      default:
        return 'text-slate-400 bg-slate-400/20';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-300 mt-2">Monitor and manage your deployed backends</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm text-slate-300">All systems operational</span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${getMetricColor(metric.color)}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <BarChart3 className="w-4 h-4 text-slate-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">{metric.value}</h3>
                <p className="text-sm text-slate-400">{metric.title}</p>
                <p className="text-xs text-slate-500">{metric.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Projects Table */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
        <div className="p-6 border-b border-slate-700/50">
          <h2 className="text-xl font-semibold text-white">Your Projects</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/30">
              <tr>
                <th className="text-left p-4 text-slate-300 font-medium">Project</th>
                <th className="text-left p-4 text-slate-300 font-medium">Framework</th>
                <th className="text-left p-4 text-slate-300 font-medium">Status</th>
                <th className="text-left p-4 text-slate-300 font-medium">URL</th>
                <th className="text-left p-4 text-slate-300 font-medium">Requests</th>
                <th className="text-left p-4 text-slate-300 font-medium">Uptime</th>
                <th className="text-left p-4 text-slate-300 font-medium">Last Deployed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-700/20 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-white">{project.name}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-slate-600/50 text-slate-300 rounded text-sm">
                      {project.framework}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-sm ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <a
                      href={`https://${project.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                    >
                      <Globe className="w-3 h-3" />
                      <span className="text-sm">{project.url}</span>
                    </a>
                  </td>
                  <td className="p-4">
                    <div className="text-white font-medium">{project.requests.toLocaleString()}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-white">{project.uptime}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-1 text-slate-400">
                      <Clock className="w-3 h-3" />
                      <span className="text-sm">{project.lastDeployed}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <div className="flex-1">
                <div className="text-white text-sm">Blog API deployed successfully</div>
                <div className="text-slate-400 text-xs">2 hours ago</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <div className="flex-1">
                <div className="text-white text-sm">E-commerce API reached 1000 requests</div>
                <div className="text-slate-400 text-xs">5 hours ago</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <div className="flex-1">
                <div className="text-white text-sm">Task Manager API build started</div>
                <div className="text-slate-400 text-xs">1 day ago</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-4">System Health</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">API Gateway</span>
              <span className="text-green-400">Healthy</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Database</span>
              <span className="text-green-400">Healthy</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Cache</span>
              <span className="text-yellow-400">Warning</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">CDN</span>
              <span className="text-green-400">Healthy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;