import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider, useData } from './context/DataContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { SEOHead } from './components/common/SEOHead';
import { JsonRawModal } from './components/modals/JsonRawModal';
import { SeoModal } from './components/modals/SeoModal';

// Views
import { HomeView } from './components/views/HomeView';
import { AboutView } from './components/views/AboutView';
import { ResumeView } from './components/views/ResumeView';
import { MethodologyView } from './components/views/MethodologyView';
import { FrameworkView } from './components/views/FrameworkView';
import { ReportsView } from './components/views/ReportsView';
import { ReportDetailView } from './components/views/ReportDetailView';
import { PromptLabView } from './components/views/PromptLabView';
import { ResearchView, ResearchDetailView } from './components/views/ResearchView';
import { BlogView } from './components/views/BlogView';
import { ResourcesView } from './components/views/ResourcesView';
import { DownloadsView } from './components/views/DownloadsView';
import { DashboardView } from './components/views/DashboardView';
import { ContactView } from './components/views/ContactView';

const MainAppContent: React.FC = () => {
  const { currentPage, activeJsonModalContent, setActiveJsonModalContent, isSeoModalOpen, setIsSeoModalOpen } = useData();

  const seoConfig = {
    title: 'Haruna Kuforiji — AI Evaluator Portfolio & LLM Framework',
    description: 'Production-ready AI Evaluator Portfolio & LLM Benchmarking Suite for Haruna Kuforiji. Features dynamic JSON report loaders, safety rubrics, prompt engineering laboratory, research papers, technical blog, and analytics dashboard.',
    canonicalUrl: 'https://harunakuforiji.dev',
    ogType: 'website',
    ogImage: 'https://harunakuforiji.dev/og-image.png',
    twitterCard: 'summary_large_image',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Haruna Kuforiji',
      jobTitle: 'Senior AI Evaluator & LLM Safety Specialist',
      url: 'https://harunakuforiji.dev',
      sameAs: [
        'https://github.com/harunakuforiji',
        'https://linkedin.com/in/harunakuforiji',
      ],
    },
  };

  const renderView = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView />;
      case 'about':
        return <AboutView />;
      case 'resume':
        return <ResumeView />;
      case 'methodology':
        return <MethodologyView />;
      case 'framework':
        return <FrameworkView />;
      case 'reports':
        return <ReportsView />;
      case 'report-detail':
        return <ReportDetailView />;
      case 'prompt-lab':
        return <PromptLabView />;
      case 'research':
        return <ResearchView />;
      case 'research-detail':
        return <ResearchDetailView />;
      case 'blog':
        return <BlogView />;
      case 'resources':
        return <ResourcesView />;
      case 'downloads':
        return <DownloadsView />;
      case 'dashboard':
        return <DashboardView />;
      case 'contact':
        return <ContactView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors font-sans antialiased selection:bg-indigo-500 selection:text-white">
      <SEOHead config={seoConfig} />
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {renderView()}
      </main>

      <Footer />

      {/* RAW JSON Schema Modal */}
      {activeJsonModalContent && (
        <JsonRawModal
          title={activeJsonModalContent.title}
          data={activeJsonModalContent.json}
          onClose={() => setActiveJsonModalContent(null)}
        />
      )}

      {/* SEO & Sitemap Inspector Modal */}
      {isSeoModalOpen && (
        <SeoModal onClose={() => setIsSeoModalOpen(false)} />
      )}
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <MainAppContent />
      </DataProvider>
    </ThemeProvider>
  );
}
