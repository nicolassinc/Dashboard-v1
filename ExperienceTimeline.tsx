/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardOverview from './components/DashboardOverview';
import AcademicViewer from './components/AcademicViewer';
import ExperienceTimeline from './components/ExperienceTimeline';
import SkillsCertificates from './components/SkillsCertificates';
import PersonalProfile from './components/PersonalProfile';
import DioAchievements from './components/DioAchievements';
import MyDashboards from './components/MyDashboards';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview setActiveTab={setActiveTab} />;
      case 'academic':
        return <AcademicViewer />;
      case 'experience':
        return <ExperienceTimeline />;
      case 'certificates':
        return <SkillsCertificates />;
      case 'dio-achievements':
        return <DioAchievements />;
      case 'dashboards':
        return <MyDashboards />;
      case 'profile':
        return <PersonalProfile />;
      default:
        return <DashboardOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex bg-slate-100 min-h-screen font-sans antialiased text-slate-600 relative overflow-x-hidden">
      
      {/* Sidebar Navigation Panel (Responsive) */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Superior Header Widget */}
        <Header 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          setSearchQuery={setSearchQuery} 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Scrollable Workspace with animations */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
              className="w-full max-w-7xl mx-auto"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>

      </div>

    </div>
  );
}
