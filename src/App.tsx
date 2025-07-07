import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PromptToDSL from './pages/PromptToDSL';
import DSLBuilder from './pages/DSLBuilder';
import CodeGenerator from './pages/CodeGenerator';
import Deploy from './pages/Deploy';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/prompt" element={<PromptToDSL />} />
            <Route path="/builder" element={<DSLBuilder />} />
            <Route path="/generate" element={<CodeGenerator />} />
            <Route path="/deploy" element={<Deploy />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1f2937',
              color: '#f9fafb',
              border: '1px solid #374151',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;