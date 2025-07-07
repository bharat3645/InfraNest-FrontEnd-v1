import React, { useState } from 'react';
import { 
  Send, 
  Sparkles, 
  Code, 
  ArrowRight,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Loader2,
  Save
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { api, DSLSpec } from '../lib/api';
import { useProjectStore } from '../lib/store';

const PromptToDSL: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentDSL, setIsGenerating, isGenerating } = useProjectStore();
  const [prompt, setPrompt] = useState('');
  const [generatedDSL, setGeneratedDSL] = useState<DSLSpec | null>(null);
  const [validationResult, setValidationResult] = useState<any>(null);
  const [activeExample, setActiveExample] = useState<number | null>(null);

  const examples = [
    {
      title: 'Blog API',
      description: 'A complete blog system with posts, comments, and user management',
      prompt: 'Create a blog API with users, posts, and comments. Users can register, login, create posts, and comment on posts. Posts should have titles, content, and publication status. Include user authentication and proper permissions.'
    },
    {
      title: 'E-commerce Store',
      description: 'Online store with products, orders, and inventory management',
      prompt: 'Build an e-commerce API with products, categories, shopping cart, and orders. Include user authentication, product inventory, order tracking, and payment integration. Products should have images, prices, and stock levels.'
    },
    {
      title: 'Task Management',
      description: 'Project management system with tasks, teams, and deadlines',
      prompt: 'Create a task management API with projects, tasks, and team collaboration. Users can create projects, assign tasks to team members, set deadlines, and track progress. Include user roles, notifications, and file attachments.'
    },
    {
      title: 'Social Media Platform',
      description: 'Social network with posts, followers, and real-time messaging',
      prompt: 'Design a social media API with user profiles, posts, followers, and messaging. Users can create posts, follow other users, like and comment on posts, and send direct messages. Include real-time notifications and content moderation.'
    }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a description for your backend');
      return;
    }

    setIsGenerating(true);
    
    try {
      const result = await api.parsePrompt(prompt);
      setGeneratedDSL(result.dsl);
      
      // Validate the generated DSL
      const validation = await api.validateDSL(result.dsl);
      setValidationResult(validation);
      
      if (validation.valid) {
        toast.success('DSL generated successfully!');
        setCurrentDSL(result.dsl);
      } else {
        toast.error('Generated DSL has validation errors');
      }
    } catch (error) {
      console.error('Generation failed:', error);
      toast.error('Failed to generate DSL. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExampleClick = (example: typeof examples[0], index: number) => {
    setActiveExample(index);
    setPrompt(example.prompt);
    setTimeout(() => setActiveExample(null), 2000);
  };

  const handleSaveAndContinue = () => {
    if (generatedDSL) {
      setCurrentDSL(generatedDSL);
      navigate('/builder');
    }
  };

  const handleGenerateCode = () => {
    if (generatedDSL) {
      setCurrentDSL(generatedDSL);
      navigate('/generate');
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">
          Describe Your Backend
        </h1>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Tell us what you want to build in plain English, and we'll generate a complete DSL specification for your backend service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50">
            <div className="flex items-center space-x-3 mb-4">
              <MessageSquare className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Describe Your Backend</h2>
            </div>
            
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Example: Create a blog API with users, posts, and comments. Users can register, login, create posts, and comment on posts. Posts should have titles, content, and publication status. Include user authentication and proper permissions."
              className="w-full h-40 p-4 bg-slate-700/50 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none resize-none"
              disabled={isGenerating}
            />
            
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-slate-400">
                {prompt.length}/1000 characters
              </span>
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Generate DSL</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Generated DSL */}
          {generatedDSL && (
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Code className="w-6 h-6 text-green-400" />
                  <h2 className="text-xl font-semibold text-white">Generated DSL</h2>
                  {validationResult?.valid ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-400" />
                  )}
                </div>
                <button
                  onClick={handleSaveAndContinue}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Edit in Builder</span>
                </button>
              </div>
              
              <pre className="bg-slate-900/50 p-4 rounded-lg text-green-400 text-sm overflow-x-auto border border-slate-700 max-h-96">
                {JSON.stringify(generatedDSL, null, 2)}
              </pre>
              
              {/* Validation Results */}
              {validationResult && (
                <div className="mt-4 space-y-2">
                  {validationResult.errors?.map((error: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-red-400/10 border border-red-400/20 rounded text-red-400">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">{error}</span>
                    </div>
                  ))}
                  {validationResult.warnings?.map((warning: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-yellow-400/10 border border-yellow-400/20 rounded text-yellow-400">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">{warning}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {validationResult?.valid ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-400" />
                    )}
                    <span className="text-sm text-slate-300">
                      {validationResult?.valid ? 'Valid DSL' : 'Has Errors'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-slate-300">{generatedDSL.meta.framework} Ready</span>
                  </div>
                </div>
                <button
                  onClick={handleGenerateCode}
                  disabled={!validationResult?.valid}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all"
                >
                  <span>Generate Code</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Examples Sidebar */}
        <div className="space-y-6">
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">Example Prompts</h3>
            <div className="space-y-3">
              {examples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(example, index)}
                  disabled={isGenerating}
                  className={`w-full p-4 text-left rounded-lg border transition-all ${
                    activeExample === index
                      ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                      : 'bg-slate-700/30 border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:border-slate-500'
                  } ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="font-medium mb-1">{example.title}</div>
                  <div className="text-sm text-slate-400">{example.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50">
            <div className="flex items-center space-x-3 mb-4">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              <h3 className="text-lg font-semibold text-white">Tips</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• Be specific about your data models and relationships</li>
              <li>• Mention authentication and permission requirements</li>
              <li>• Include any special features or integrations needed</li>
              <li>• Describe the expected API endpoints and functionality</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptToDSL;