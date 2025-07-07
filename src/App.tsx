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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark-theme">
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
              background: 'rgba(30, 41, 59, 0.95)',
              color: '#f8fafc',
              border: '1px solid rgba(51, 65, 85, 0.5)',
              backdropFilter: 'blur(8px)',
              fontFamily: 'Inter, sans-serif',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#f8fafc',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#f8fafc',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;