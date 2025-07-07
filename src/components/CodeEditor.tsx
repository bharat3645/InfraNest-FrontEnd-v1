import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Folder, 
  FolderOpen, 
  Download, 
  Copy,
  Check,
  Eye,
  Code
} from 'lucide-react';
import { useProjectStore } from '../lib/store';

interface FileTreeProps {
  files: Record<string, string>;
  onFileSelect: (path: string) => void;
  selectedFile: string | null;
}

const FileTree: React.FC<FileTreeProps> = ({ files, onFileSelect, selectedFile }) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['']));

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const buildFileTree = (files: Record<string, string>) => {
    const tree: any = {};
    
    Object.keys(files).forEach(filePath => {
      const parts = filePath.split('/');
      let current = tree;
      
      parts.forEach((part, index) => {
        if (index === parts.length - 1) {
          // It's a file
          current[part] = { type: 'file', path: filePath };
        } else {
          // It's a folder
          if (!current[part]) {
            current[part] = { type: 'folder', children: {} };
          }
          current = current[part].children;
        }
      });
    });
    
    return tree;
  };

  const renderTree = (tree: any, currentPath = '', level = 0) => {
    return Object.entries(tree).map(([name, node]: [string, any]) => {
      const fullPath = currentPath ? `${currentPath}/${name}` : name;
      const isExpanded = expandedFolders.has(fullPath);
      
      if (node.type === 'folder') {
        return (
          <div key={fullPath}>
            <div
              className={`flex items-center space-x-2 p-2 cursor-pointer hover:bg-slate-700/50 rounded transition-colors`}
              style={{ paddingLeft: `${level * 16 + 8}px` }}
              onClick={() => toggleFolder(fullPath)}
            >
              {isExpanded ? (
                <FolderOpen className="w-4 h-4 text-blue-400" />
              ) : (
                <Folder className="w-4 h-4 text-blue-400" />
              )}
              <span className="text-sm text-slate-300">{name}</span>
            </div>
            {isExpanded && (
              <div>
                {renderTree(node.children, fullPath, level + 1)}
              </div>
            )}
          </div>
        );
      } else {
        return (
          <div
            key={fullPath}
            className={`flex items-center space-x-2 p-2 cursor-pointer rounded transition-colors ${
              selectedFile === node.path
                ? 'bg-blue-600/20 text-blue-300'
                : 'text-slate-300 hover:bg-slate-700/50'
            }`}
            style={{ paddingLeft: `${level * 16 + 8}px` }}
            onClick={() => onFileSelect(node.path)}
          >
            <FileText className="w-4 h-4 text-slate-400" />
            <span className="text-sm">{name}</span>
          </div>
        );
      }
    });
  };

  const fileTree = buildFileTree(files);

  return (
    <div className="space-y-1">
      {renderTree(fileTree)}
    </div>
  );
};

interface CodeEditorProps {
  files: Record<string, string>;
  className?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ files, className = '' }) => {
  const { activeFile, setActiveFile } = useProjectStore();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (activeFile && files[activeFile]) {
      await navigator.clipboard.writeText(files[activeFile]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getLanguage = (filePath: string) => {
    const ext = filePath.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'py': return 'python';
      case 'js': case 'ts': return 'javascript';
      case 'go': return 'go';
      case 'rb': return 'ruby';
      case 'yml': case 'yaml': return 'yaml';
      case 'json': return 'json';
      case 'sql': return 'sql';
      case 'md': return 'markdown';
      default: return 'text';
    }
  };

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-4 gap-6 ${className}`}>
      {/* File Explorer */}
      <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-slate-700/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Folder className="w-5 h-5 text-blue-400" />
            <h3 className="font-semibold text-white">Project Files</h3>
          </div>
          <span className="text-xs text-slate-400">{Object.keys(files).length} files</span>
        </div>
        <FileTree 
          files={files} 
          onFileSelect={setActiveFile} 
          selectedFile={activeFile} 
        />
      </div>

      {/* Code Viewer */}
      <div className="lg:col-span-3 bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-slate-700/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Code className="w-5 h-5 text-blue-400" />
            <h3 className="font-semibold text-white">
              {activeFile || 'Select a file'}
            </h3>
            {activeFile && (
              <span className="px-2 py-1 bg-slate-600/50 text-xs rounded text-slate-300">
                {getLanguage(activeFile)}
              </span>
            )}
          </div>
          {activeFile && (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopy}
                className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                title="Copy to clipboard"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          )}
        </div>
        
        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 h-96 overflow-auto">
          {activeFile && files[activeFile] ? (
            <pre className="text-sm">
              <code className={`language-${getLanguage(activeFile)} text-green-400`}>
                {files[activeFile]}
              </code>
            </pre>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-500">
              <div className="text-center">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Select a file to view its content</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;