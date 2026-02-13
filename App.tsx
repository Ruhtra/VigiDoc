import React, { useState, useEffect, createContext, useContext } from 'react';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import { AuthManager, AuthPageType } from './components/Auth';
import { Button } from './components/ui/Components';
import { Construction, ArrowLeft, ScanLine, ShieldAlert } from 'lucide-react';

// --- Theme Context ---
type Theme = 'dark' | 'light';
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// --- Navigation Context ---
type Page = 'dashboard' | 'patients' | 'priorities' | 'reports' | 'scan';

interface NavigationContextType {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// --- Placeholder Page Component ---
const PlaceholderPage: React.FC<{ title: string; description: string; icon?: React.ElementType }> = ({ title, description, icon: Icon = Construction }) => {
  const { setCurrentPage } = useNavigation();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-12 h-12 text-teal-600 dark:text-teal-400" />
      </div>
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{title}</h2>
      <p className="text-slate-500 dark:text-slate-400 max-w-md text-lg">
        {description}
      </p>
      <div className="pt-4">
         <Button onClick={() => setCurrentPage('dashboard')} variant="outline" className="gap-2">
           <ArrowLeft size={16} /> Voltar ao Painel
         </Button>
      </div>
    </div>
  );
};

// --- View State Types ---
type ViewState = 'landing' | 'auth' | 'admin';

// --- Main Layout ---
const App: React.FC = () => {
  // Routing State
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  
  // Auth State (Managed within the 'auth' view mainly, but state persists here)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authPage, setAuthPage] = useState<AuthPageType>('login');

  // App/Dashboard State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  // --- Handlers ---
  const handleNavigateToLogin = () => {
    setAuthPage('login');
    setCurrentView('auth');
    // Scroll to top
    window.scrollTo(0, 0);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentView('admin');
    setCurrentPage('dashboard');
  };

  // Simulating Logout (In a real app, this would be passed down via Context)
  // For this demo, refreshing the page or clearing state resets it, but let's assume
  // Navbar's logout button would eventually trigger a function that sets isAuthenticated(false) and view to 'landing'
  // Since Navbar is isolated, we won't wire the Logout button explicitly in this snippet without Context refactor, 
  // but the flow is prepared.

  return (
    <ThemeProvider>
      {/* 1. LANDING PAGE VIEW */}
      {currentView === 'landing' && (
        <LandingPage onNavigateToLogin={handleNavigateToLogin} />
      )}

      {/* 2. AUTH VIEW (/login/*) */}
      {currentView === 'auth' && (
         <AuthManager 
            onLogin={handleLoginSuccess} 
            currentAuthPage={authPage} 
            setAuthPage={setAuthPage} 
         />
      )}

      {/* 3. ADMIN DASHBOARD VIEW (/admin/*) */}
      {currentView === 'admin' && isAuthenticated && (
        <NavigationContext.Provider value={{ currentPage, setCurrentPage }}>
          <div className="min-h-screen bg-[#e0f2f1] dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans selection:bg-teal-100 dark:selection:bg-teal-900">
            <Navbar 
              isMobileMenuOpen={isMobileMenuOpen} 
              setIsMobileMenuOpen={setIsMobileMenuOpen} 
            />
            
            {/* Main Content Area */}
            <main className="pt-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto pb-12 space-y-8 animate-in fade-in duration-500">
              {currentPage === 'dashboard' && <Dashboard />}
              
              {currentPage === 'patients' && (
                <PlaceholderPage 
                  title="Gestão de Pacientes" 
                  description="O módulo completo de prontuários, histórico e gestão de pacientes está em desenvolvimento." 
                />
              )}
              
              {currentPage === 'priorities' && (
                <PlaceholderPage 
                  title="Fila de Prioridades" 
                  description="Lista inteligente de pacientes classificados por risco clínico para contato e intervenção imediata."
                  icon={ShieldAlert}
                />
              )}
              
              {currentPage === 'reports' && (
                <PlaceholderPage 
                  title="Relatórios Avançados" 
                  description="Ferramentas analíticas e exportação de dados em PDF/Excel estão sendo construídas." 
                />
              )}

              {currentPage === 'scan' && (
                <PlaceholderPage 
                  title="Leitor Rápido" 
                  description="Acesso à câmera para leitura de QR Code de pacientes e identificação rápida de prontuários."
                  icon={ScanLine}
                />
              )}
            </main>
          </div>
        </NavigationContext.Provider>
      )}
    </ThemeProvider>
  );
};

export default App;