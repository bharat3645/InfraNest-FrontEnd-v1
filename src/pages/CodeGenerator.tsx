import React, { useState, useEffect } from 'react';
import { 
  Code, 
  Download, 
  Play,
  CheckCircle,
  Loader2,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CodeEditor from '../components/CodeEditor';
import { api, GeneratedProject } from '../lib/api';
import { useProjectStore } from '../lib/store';

const CodeGenerator: React.FC = () => {
  const navigate = useNavigate();
  const { 
    currentDSL, 
    currentProject, 
    setCurrentProject, 
    addProject,
    isGenerating, 
    setIsGenerating 
  } = useProjectStore();
  
  const [selectedFramework, setSelectedFramework] = useState('django');
  const [frameworks, setFrameworks] = useState<any[]>([]);

  useEffect(() => {
    // Load available frameworks
    const loadFrameworks = async () => {
      try {
        const result = await api.getFrameworks();
        setFrameworks(result.frameworks);
      } catch (error) {
        console.error('Failed to load frameworks:', error);
      }
    };

    loadFrameworks();
  }, []);

  useEffect(() => {
    // Set framework from current DSL if available
    if (currentDSL?.meta.framework) {
      setSelectedFramework(currentDSL.meta.framework);
    }
  }, [currentDSL]);

  const handleGenerate = async () => {
    if (!currentDSL) {
      toast.error('No DSL specification found. Please create one first.');
      navigate('/prompt');
      return;
    }

    setIsGenerating(true);
    
    try {
      const project = await api.generateCode(currentDSL, selectedFramework);
      setCurrentProject(project);
      addProject(project);
      toast.success('Code generated successfully!');
    } catch (error) {
      console.error('Generation failed:', error);
      toast.error('Failed to generate code. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!currentProject) return;

    try {
      const blob = await api.downloadProject(currentProject.id);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${currentProject.name}-${currentProject.framework}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Project downloaded successfully!');
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Failed to download project');
    }
  };

  const handleDeploy = () => {
    if (currentProject) {
      navigate('/deploy');
    } else {
      toast.error('Please generate code first');
    }
  };

  if (!currentDSL) {
    return (
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white">Code Generator</h1>
          <p className="text-slate-300">
            No DSL specification found. Please create one first.
          </p>
        </div>
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate('/prompt')}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all"
          >
            <span>Create from Prompt</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('/builder')}
            className="flex items-center space-x-2 px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-semibold transition-all"
          >
            <span>Use DSL Builder</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">Code Generator</h1>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Generate production-ready backend code from your DSL specification in your preferred framework.
        </p>
      </div>

      {/* Project Info */}
      <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">{currentDSL.meta.name}</h2>
            <p className="text-slate-300">{currentDSL.meta.description}</p>
            <div className="flex items-center space-x-4 mt-2">
              <span className="px-2 py-1 bg-blue-600/20 text-blue-300 rounded text-sm">
                v{currentDSL.meta.version}
              </span>
              <span className="px-2 py-1 bg-slate-600/50 text-slate-300 rounded text-sm">
                {Object.keys(currentDSL.models).length} models
              </span>
              <span className="px-2 py-1 bg-slate-600/50 text-slate-300 rounded text-sm">
                {currentDSL.meta.database}
              </span>
            </div>
          </div>
          {currentProject && (
            <div className="flex items-center space-x-2 text-green-400">
              <CheckCircle className="w-5 h-5" />
              <span>Generated</span>
            </div>
          )}
        </div>
      </div>

      {/* Framework Selection */}
      <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50">
        <h2 className="text-xl font-semibold text-white mb-4">Choose Your Framework</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {frameworks.map((framework) => (
            <button
              key={framework.id}
              onClick={() => setSelectedFramework(framework.id)}
              disabled={isGenerating}
              className={`p-6 rounded-lg border transition-all text-left ${
                selectedFramework === framework.id
                  ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                  : 'bg-slate-700/30 border-slate-600 text-slate-300 hover:bg-slate-700/50'
              } ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">{framework.name}</h3>
                  <p className="text-sm text-slate-400">{framework.language}</p>
                </div>
                <p className="text-sm">{framework.description}</p>
                <div className="flex flex-wrap gap-2">
                  {framework.features?.map((feature: string, index: number) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-slate-600/50 text-xs rounded text-slate-300"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <div className="text-center">
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="flex items-center space-x-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all mx-auto"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Generating Code...</span>
            </>
          ) : (
            <>
              <Code className="w-5 h-5" />
              <span>Generate {frameworks.find(f => f.id === selectedFramework)?.name} Code</span>
            </>
          )}
        </button>
      </div>

      {/* Generated Code */}
      {currentProject && (
        <>
          <CodeEditor files={currentProject.files} />
          
          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all"
            >
              <Download className="w-5 h-5" />
              <span>Download Project</span>
            </button>
            <button
              onClick={handleDeploy}
              className="flex items-center space-x-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all"
            >
              <Play className="w-5 h-5" />
              <span>Deploy Now</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CodeGenerator;