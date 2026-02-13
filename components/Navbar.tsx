import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  Moon, 
  Sun,
  Activity,
  LayoutDashboard,
  Users,
  FileText,
  ScanLine,
  ChevronDown,
  ChevronUp,
  ShieldAlert
} from 'lucide-react';
import { Button } from './ui/Components';
import { cn } from '../lib/utils';
import { useTheme, useNavigation } from '../App';

interface NavbarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

// --- Mock Notifications ---
const notifications = [
  { id: 1, title: 'Alerta Crítico: Maria Garcia', desc: 'PA 182/104 - Ação necessária', time: '5 min atrás', type: 'critical' },
  { id: 2, title: 'Novo Registro: David Kim', desc: 'Sinais vitais normais gravados', time: '12 min atrás', type: 'success' },
  { id: 3, title: 'Atraso: John Doe', desc: 'Não enviou registro matinal', time: '1h atrás', type: 'warning' },
];

const Navbar: React.FC<NavbarProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const { theme, toggleTheme } = useTheme();
  const { currentPage, setCurrentPage } = useNavigation();
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // Scroll state for hiding navbar on mobile
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Close notifications when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle Scroll to hide/show navbar on mobile
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Se rolar para baixo e já tiver passado do topo (10px buffer), esconde
      if (currentScrollY > lastScrollY.current && currentScrollY > 10) {
        setIsNavbarVisible(false);
      } else {
        // Se rolar para cima, mostra
        setIsNavbarVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'dashboard', label: "Painel", icon: LayoutDashboard },
    { id: 'patients', label: "Pacientes", icon: Users },
    { id: 'priorities', label: "Prioridades", icon: ShieldAlert },
    { id: 'reports', label: "Relatórios", icon: FileText },
  ];

  return (
    <>
      {/* --- TOP NAVBAR --- */}
      <nav 
        className={cn(
          "fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50 transition-all duration-300 transform",
          // Mobile: Translates Y based on visibility. Desktop (lg): Always translate-y-0 (visible)
          !isNavbarVisible ? "-translate-y-full lg:translate-y-0" : "translate-y-0"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          
          {/* Logo & Desktop Menu */}
          <div className="flex items-center gap-4">
            <div 
              className="flex items-center gap-2 group cursor-pointer"
              onClick={() => setCurrentPage('dashboard')}
            >
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white shadow-sm group-hover:bg-teal-700 transition-colors">
                <Activity size={18} />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                Vigi<span className="text-teal-600">Doc</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center ml-8 gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id as any)}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2",
                    currentPage === item.id 
                      ? "bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400" 
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800"
                  )}
                >
                  {item.icon && <item.icon size={16} />}
                  {item.label}
                  {currentPage === item.id && (
                    <span className="ml-1 w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative text-slate-500 hover:text-teal-600"
                onClick={() => setIsNotifOpen(!isNotifOpen)}
              >
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-950"></span>
              </Button>
              
              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-1 z-20 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                        <span className="font-semibold text-sm">Notificações</span>
                        <span className="text-xs text-teal-600 cursor-pointer hover:underline">Marcar como lidas</span>
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                        {notifications.map(notif => (
                            <div key={notif.id} className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer border-b border-slate-50 dark:border-slate-800/50 last:border-0 flex gap-3">
                                <div className={cn("mt-1 w-2 h-2 rounded-full flex-shrink-0", 
                                    notif.type === 'critical' ? "bg-red-500" : 
                                    notif.type === 'success' ? "bg-emerald-500" : "bg-amber-500"
                                )}></div>
                                <div>
                                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{notif.title}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{notif.desc}</p>
                                    <p className="text-[10px] text-slate-400 mt-1">{notif.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-2 border-t border-slate-100 dark:border-slate-800 text-center">
                        <button className="text-xs text-slate-500 hover:text-teal-600 font-medium">Ver Histórico Completo</button>
                    </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 p-1.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700">
                  <img src="https://i.pravatar.cc/150?u=drsmith" alt="Dr. Smith" className="w-full h-full object-cover" />
                </div>
              </button>

              {/* Dropdown */}
              {isProfileOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsProfileOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg py-1 z-20 animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Dra. Sara Silva</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Cardiologia</p>
                    </div>
                    
                    <button className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2">
                      <User size={16} /> Perfil
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2">
                      <Settings size={16} /> Configurações
                    </button>
                    
                    <button 
                      onClick={() => { toggleTheme(); setIsProfileOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />} 
                        Aparência
                      </span>
                      <span className="text-xs font-medium text-slate-400 capitalize">{theme === 'dark' ? 'Escuro' : 'Claro'}</span>
                    </button>

                    <div className="h-px bg-slate-100 dark:bg-slate-800 my-1"></div>
                    
                    <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2">
                      <LogOut size={16} /> Sair
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* --- MOBILE BOTTOM NAVIGATION --- */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pb-safe z-50 px-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between h-16 px-2">
          
          <button 
            onClick={() => setCurrentPage('dashboard')}
            className={cn("flex flex-col items-center justify-center w-14 gap-1 transition-colors", currentPage === 'dashboard' ? "text-teal-600 dark:text-teal-400" : "text-slate-500 dark:text-slate-400")}
          >
            <LayoutDashboard size={20} />
            <span className="text-[10px] font-medium">Início</span>
          </button>

          <button 
            onClick={() => setCurrentPage('patients')}
            className={cn("flex flex-col items-center justify-center w-14 gap-1 transition-colors", currentPage === 'patients' ? "text-teal-600 dark:text-teal-400" : "text-slate-500 dark:text-slate-400")}
          >
            <Users size={20} />
            <span className="text-[10px] font-medium">Pacientes</span>
          </button>

          {/* Central Highlighted Button - Quick Report or Add */}
          <div className="relative -top-5">
            <button 
              onClick={() => setCurrentPage('scan')}
              className={cn(
                "flex items-center justify-center w-14 h-14 rounded-full text-white shadow-lg shadow-teal-600/30 hover:bg-teal-700 hover:scale-105 transition-all border-4 border-slate-50 dark:border-slate-950",
                currentPage === 'scan' ? "bg-teal-700 ring-2 ring-teal-200 dark:ring-teal-900" : "bg-teal-600"
              )}
            >
              <ScanLine size={24} />
            </button>
          </div>

          <button 
             onClick={() => setCurrentPage('reports')}
             className={cn("flex flex-col items-center justify-center w-14 gap-1 transition-colors", currentPage === 'reports' ? "text-teal-600 dark:text-teal-400" : "text-slate-500 dark:text-slate-400")}
          >
            <FileText size={20} />
            <span className="text-[10px] font-medium">Relatórios</span>
          </button>

          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex flex-col items-center justify-center w-14 gap-1 text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          >
            <Menu size={20} />
            <span className="text-[10px] font-medium">Menu</span>
          </button>

        </div>
      </div>

      {/* --- SIDE DRAWER (Expanded Menu) --- */}
      <div className={cn(
        "fixed inset-0 bg-slate-900/50 z-50 lg:hidden transition-opacity duration-300 backdrop-blur-sm",
        isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )} onClick={() => setIsMobileMenuOpen(false)}>
        
        {/* Drawer Content */}
        {/* Reduced horizontal padding from p-6 to px-3 py-6 */}
        <div className={cn(
          "fixed inset-y-0 right-0 w-72 bg-white dark:bg-slate-950 shadow-2xl transform transition-transform duration-300 ease-in-out px-3 py-6 flex flex-col h-full",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )} onClick={e => e.stopPropagation()}>
          
          <div className="flex items-center justify-between mb-8 px-3">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white shadow-sm">
                  <Activity size={18} />
                </div>
                <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                  Vigi<span className="text-teal-600">Doc</span>
                </span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={20} />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto px-1">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3">Navegação</p>
            <div className="space-y-1">
                {navItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => {
                        setCurrentPage(item.id as any);
                        setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                    "w-full px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-3 transition-colors",
                    currentPage === item.id 
                        ? "bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400" 
                        : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900"
                    )}
                >
                    <item.icon size={18} />
                    {item.label}
                </button>
                ))}
            </div>
            
            <div className="h-px bg-slate-100 dark:bg-slate-800 my-4 mx-3"></div>
            
            {/* Account Accordion */}
            <div className="space-y-1">
                <button
                    onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                    className="w-full px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <User size={18} />
                        <span>Minha Conta</span>
                    </div>
                    {isAccountMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                <div className={cn(
                    "space-y-1 overflow-hidden transition-all duration-300 ease-in-out pl-4",
                    isAccountMenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                )}>
                    <a href="#" className="px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-3 text-slate-500 hover:text-teal-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900/50">
                        Meu Perfil
                    </a>
                    <a href="#" className="px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-3 text-slate-500 hover:text-teal-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900/50">
                        Configurações
                    </a>
                </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-auto px-1">
             <Button variant="outline" className="w-full justify-start gap-2 mb-3" onClick={toggleTheme}>
                {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
                {theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}
             </Button>
             <Button variant="danger" className="w-full justify-start gap-2 bg-red-50 text-red-600 border-red-100 hover:bg-red-100 dark:bg-red-900/20 dark:border-red-900/50 dark:hover:bg-red-900/40">
                <LogOut size={16} /> Sair
             </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;