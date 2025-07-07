import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Plus, 
  Trash2, 
  Save, 
  AlertCircle,
  CheckCircle,
  Database,
  Key,
  Globe,
  Code
} from 'lucide-react';
import { DSLSpec } from '../lib/api';
import { useProjectStore } from '../lib/store';

interface DSLEditorProps {
  dsl: DSLSpec;
  onChange: (dsl: DSLSpec) => void;
  className?: string;
}

const DSLEditor: React.FC<DSLEditorProps> = ({ dsl, onChange, className = '' }) => {
  const [activeTab, setActiveTab] = useState('meta');
  const [errors, setErrors] = useState<string[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);

  const tabs = [
    { id: 'meta', label: 'Project Info', icon: Settings },
    { id: 'auth', label: 'Authentication', icon: Key },
    { id: 'models', label: 'Data Models', icon: Database },
    { id: 'api', label: 'API Endpoints', icon: Globe },
    { id: 'preview', label: 'Preview', icon: Code }
  ];

  const frameworks = [
    { id: 'django', name: 'Django + DRF', language: 'Python' },
    { id: 'go-fiber', name: 'Go Fiber + GORM', language: 'Go' },
    { id: 'rails', name: 'Ruby on Rails', language: 'Ruby' }
  ];

  const fieldTypes = [
    'string', 'text', 'integer', 'float', 'boolean', 'datetime', 
    'date', 'uuid', 'url', 'email', 'json', 'foreign_key', 'many_to_many'
  ];

  const updateDSL = (path: string[], value: any) => {
    const newDSL = { ...dsl };
    let current = newDSL;
    
    for (let i = 0; i < path.length - 1; i++) {
      if (!current[path[i]]) {
        current[path[i]] = {};
      }
      current = current[path[i]];
    }
    
    current[path[path.length - 1]] = value;
    onChange(newDSL);
  };

  const addModel = () => {
    const modelName = prompt('Enter model name:');
    if (modelName && !dsl.models[modelName]) {
      updateDSL(['models', modelName], {
        fields: {
          id: { type: 'uuid', primary_key: true, auto_generated: true }
        }
      });
    }
  };

  const addField = (modelName: string) => {
    const fieldName = prompt('Enter field name:');
    if (fieldName && !dsl.models[modelName].fields[fieldName]) {
      updateDSL(['models', modelName, 'fields', fieldName], {
        type: 'string',
        required: false
      });
    }
  };

  const removeModel = (modelName: string) => {
    if (confirm(`Are you sure you want to remove the ${modelName} model?`)) {
      const newModels = { ...dsl.models };
      delete newModels[modelName];
      updateDSL(['models'], newModels);
    }
  };

  const removeField = (modelName: string, fieldName: string) => {
    if (confirm(`Are you sure you want to remove the ${fieldName} field?`)) {
      const newFields = { ...dsl.models[modelName].fields };
      delete newFields[fieldName];
      updateDSL(['models', modelName, 'fields'], newFields);
    }
  };

  const renderMetaTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Project Name
          </label>
          <input
            type="text"
            value={dsl.meta.name}
            onChange={(e) => updateDSL(['meta', 'name'], e.target.value)}
            className="w-full p-3 bg-slate-700/50 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Version
          </label>
          <input
            type="text"
            value={dsl.meta.version}
            onChange={(e) => updateDSL(['meta', 'version'], e.target.value)}
            className="w-full p-3 bg-slate-700/50 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Description
        </label>
        <textarea
          value={dsl.meta.description}
          onChange={(e) => updateDSL(['meta', 'description'], e.target.value)}
          className="w-full p-3 bg-slate-700/50 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none h-24"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Framework
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {frameworks.map((framework) => (
            <button
              key={framework.id}
              onClick={() => updateDSL(['meta', 'framework'], framework.id)}
              className={`p-4 rounded-lg border transition-all ${
                dsl.meta.framework === framework.id
                  ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                  : 'bg-slate-700/30 border-slate-600 text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              <div className="font-medium">{framework.name}</div>
              <div className="text-sm text-slate-400">{framework.language}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderModelsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Data Models</h3>
        <button
          onClick={addModel}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Model</span>
        </button>
      </div>

      <div className="space-y-4">
        {Object.entries(dsl.models).map(([modelName, modelConfig]) => (
          <div key={modelName} className="bg-slate-700/30 p-4 rounded-lg border border-slate-600">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-white">{modelName}</h4>
              <button
                onClick={() => removeModel(modelName)}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-300">Fields</span>
                <button
                  onClick={() => addField(modelName)}
                  className="flex items-center space-x-1 px-3 py-1 bg-slate-600 hover:bg-slate-500 text-white rounded text-sm transition-all"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Field</span>
                </button>
              </div>

              <div className="space-y-2">
                {Object.entries(modelConfig.fields || {}).map(([fieldName, fieldConfig]: [string, any]) => (
                  <div key={fieldName} className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded border border-slate-600">
                    <div className="flex-1">
                      <div className="font-medium text-white">{fieldName}</div>
                      <div className="text-sm text-slate-400">{fieldConfig.type}</div>
                    </div>
                    <select
                      value={fieldConfig.type}
                      onChange={(e) => updateDSL(['models', modelName, 'fields', fieldName, 'type'], e.target.value)}
                      className="px-3 py-1 bg-slate-700 text-white rounded border border-slate-600 text-sm"
                    >
                      {fieldTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => removeField(modelName, fieldName)}
                      className="p-1 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded transition-all"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPreviewTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">DSL Preview</h3>
        <div className="flex items-center space-x-2">
          {errors.length > 0 && (
            <div className="flex items-center space-x-1 text-red-400">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{errors.length} errors</span>
            </div>
          )}
          {warnings.length > 0 && (
            <div className="flex items-center space-x-1 text-yellow-400">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{warnings.length} warnings</span>
            </div>
          )}
          {errors.length === 0 && (
            <div className="flex items-center space-x-1 text-green-400">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Valid</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
        <pre className="text-green-400 text-sm overflow-x-auto">
          {JSON.stringify(dsl, null, 2)}
        </pre>
      </div>

      {(errors.length > 0 || warnings.length > 0) && (
        <div className="space-y-2">
          {errors.map((error, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 bg-red-400/10 border border-red-400/20 rounded text-red-400">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          ))}
          {warnings.map((warning, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 bg-yellow-400/10 border border-yellow-400/20 rounded text-yellow-400">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{warning}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className={`bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden ${className}`}>
      <div className="border-b border-slate-700/50">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white border-b-2 border-blue-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-8">
        {activeTab === 'meta' && renderMetaTab()}
        {activeTab === 'models' && renderModelsTab()}
        {activeTab === 'preview' && renderPreviewTab()}
        {activeTab === 'auth' && (
          <div className="text-center py-12">
            <Key className="w-16 h-16 text-slate-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Authentication Builder</h3>
            <p className="text-slate-400">Configure authentication settings and user models</p>
          </div>
        )}
        {activeTab === 'api' && (
          <div className="text-center py-12">
            <Globe className="w-16 h-16 text-slate-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">API Builder</h3>
            <p className="text-slate-400">Configure REST API endpoints and handlers</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DSLEditor;