import React, { useState } from 'react';
import {
  Menu,
  X,
  Sun,
  Moon,
  Laptop,
  Globe,
  Search,
  Cpu,
  FileCheck2,
  FileText,
  Brain,
  ShieldCheck,
  FolderDown,
  LayoutDashboard,
  Mail,
  UserCheck,
  Compass,
  BookOpen,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
import { NavigationPage } from '../../types';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { currentPage, setCurrentPage, setIsSeoModalOpen, filters, setFilters } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerSearchOpen, setHeaderSearchOpen] = useState(false);

  const navItems: { id: NavigationPage; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Compass className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'resume', label: 'Resume', icon: <FileText className="w-4 h-4" /> },
    { id: 'methodology', label: 'Methodology', icon: <Brain className="w-4 h-4" /> },
    { id: 'framework', label: 'Framework', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'reports', label: 'Reports', icon: <FileCheck2 className="w-4 h-4" /> },
    { id: 'prompt-lab', label: 'Prompt Lab', icon: <Cpu className="w-4 h-4" /> },
    { id: 'research', label: 'Research', icon: <Brain className="w-4 h-4" /> },
    { id: 'blog', label: 'Blog', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'resources', label: 'Resources', icon: <Compass className="w-4 h-4" /> },
    { id: 'downloads', label: 'Downloads', icon: <FolderDown className="w-4 h-4" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
  ];

  const handleNav = (page: NavigationPage) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNav('home')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-indigo-400 flex items-center justify-center text-white font-black text-lg shadow-sm">
              HK
            </div>
            <div>
              <span className="font-bold text-zinc-900 dark:text-zinc-100 text-base tracking-tight block">
                Haruna Kuforiji
              </span>
              <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 -mt-1 block">
                AI Evaluator Portfolio
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1 text-xs font-semibold">
            {navItems.map((item) => {
              const isActive = currentPage === item.id || (item.id === 'reports' && currentPage === 'report-detail') || (item.id === 'research' && currentPage === 'research-detail');
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.id)}
                  className={`px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-500/20'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2">
            {/* Quick Search */}
            <button
              type="button"
              onClick={() => {
                setHeaderSearchOpen(!headerSearchOpen);
                if (currentPage !== 'reports') setCurrentPage('reports');
              }}
              className="p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title="Quick Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* SEO Inspector */}
            <button
              type="button"
              onClick={() => setIsSeoModalOpen(true)}
              className="p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors hidden sm:flex"
              title="SEO & Metadata Inspector"
            >
              <Globe className="w-4 h-4" />
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title={`Current Theme: ${theme}`}
            >
              {theme === 'dark' && <Moon className="w-4 h-4 text-indigo-400" />}
              {theme === 'light' && <Sun className="w-4 h-4 text-amber-500" />}
              {theme === 'system' && <Laptop className="w-4 h-4 text-zinc-400" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Quick Search Dropdown Bar */}
        {headerSearchOpen && (
          <div className="py-2 pb-3 border-t border-zinc-200 dark:border-zinc-800 animate-in slide-in-from-top duration-150">
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
              placeholder="Search across reports, rubrics, papers, models..."
              className="w-full px-4 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              autoFocus
            />
          </div>
        )}
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 pt-3 pb-6 space-y-1.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNav(item.id)}
              className={`w-full px-3 py-2.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                currentPage === item.id
                  ? 'bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-500/20'
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
          <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-2 text-xs text-zinc-500">
            <span>Inspector & Schema Tools</span>
            <button
              type="button"
              onClick={() => {
                setIsSeoModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-indigo-600 dark:text-indigo-400 font-semibold"
            >
              Open SEO Inspector
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
