import React from 'react';
import { 
  Activity, 
  ArrowRight, 
  ShieldCheck, 
  Smartphone, 
  Zap, 
  CheckCircle2, 
  Download, 
  Share, 
  PlusSquare,
  Menu
} from 'lucide-react';
import { Button } from './ui/Components';
import { cn } from '../lib/utils';

interface LandingPageProps {
  onNavigateToLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToLogin }) => {
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden font-sans selection:bg-teal-500/30">
      
      {/* --- HEADER --- */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-teal-900/20">
              <Activity size={24} />
            </div>
            <span className="font-bold text-2xl tracking-tight text-white">
              Vigi<span className="text-teal-400">Doc</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors focus:outline-none">Recursos</button>
            <button onClick={() => scrollToSection('benefits')} className="hover:text-white transition-colors focus:outline-none">Benefícios</button>
            <button onClick={() => scrollToSection('install')} className="hover:text-white transition-colors focus:outline-none">Instalar App</button>
          </div>

          <div className="flex items-center gap-4">
            <Button 
              onClick={onNavigateToLogin}
              variant="ghost" 
              className="text-slate-300 hover:text-white hover:bg-white/5 hidden sm:flex"
            >
              Entrar
            </Button>
            <Button 
              onClick={onNavigateToLogin}
              className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] transition-all duration-300 rounded-full px-6"
            >
              Começar Agora
            </Button>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        {/* Background Effects */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-teal-500/20 rounded-full blur-[120px] -z-10 opacity-50 animate-pulse duration-[5000ms]"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-teal-400 text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            A revolução do monitoramento contínuo
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Cuide dos seus pacientes <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-500">
              além do consultório.
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            O VigiDoc conecta médicos e pacientes em tempo real. Identifique riscos, previna hospitalizações e ofereça um atendimento premium com nossa tecnologia de vigilância ativa.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <Button 
              onClick={onNavigateToLogin}
              className="h-14 px-8 text-lg bg-white text-slate-950 hover:bg-slate-200 font-bold rounded-full w-full sm:w-auto shadow-xl"
            >
              Testar Gratuitamente
            </Button>
            <Button 
              variant="outline"
              className="h-14 px-8 text-lg border-white/10 text-white hover:bg-white/5 rounded-full w-full sm:w-auto gap-2"
              onClick={() => scrollToSection('install')}
            >
              <Download size={20} />
              Instalar App
            </Button>
          </div>

          {/* Floating UI Elements Mockup */}
          <div className="mt-20 relative mx-auto max-w-5xl animate-in fade-in zoom-in-95 duration-1000 delay-500">
            <div className="aspect-[16/9] rounded-2xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10"></div>
              {/* Mock Interface Content */}
              <div className="absolute top-0 left-0 right-0 h-12 bg-slate-800/50 border-b border-white/5 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
              </div>
              <div className="pt-16 p-8 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                 {/* Mock Card 1 */}
                 <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                    <div className="h-2 w-24 bg-slate-700 rounded mb-4"></div>
                    <div className="h-8 w-16 bg-teal-500/20 rounded mb-2"></div>
                    <div className="h-2 w-full bg-slate-700 rounded"></div>
                 </div>
                 {/* Mock Card 2 */}
                 <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                    <div className="h-2 w-24 bg-slate-700 rounded mb-4"></div>
                    <div className="flex gap-2 mb-2">
                         <div className="h-8 w-8 bg-red-500/20 rounded-full"></div>
                         <div className="h-8 w-full bg-slate-700/50 rounded"></div>
                    </div>
                 </div>
                 {/* Mock Card 3 */}
                 <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                    <div className="h-32 w-full bg-gradient-to-t from-teal-500/10 to-transparent rounded"></div>
                 </div>
              </div>
              
              {/* Floating Notification */}
              <div className="absolute bottom-10 right-10 md:right-20 bg-slate-800/90 backdrop-blur-xl border border-teal-500/30 p-4 rounded-xl shadow-2xl flex items-center gap-4 animate-bounce duration-[3000ms]">
                 <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">
                    <ShieldCheck size={20} />
                 </div>
                 <div>
                    <p className="text-sm font-bold text-white">Alerta Detectado</p>
                    <p className="text-xs text-slate-400">Paciente Maria Silva - PA Alta</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section id="features" className="py-24 bg-slate-900/50 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Por que escolher o VigiDoc?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Ferramentas poderosas para médicos que não aceitam menos que a excelência.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Vigilância Ativa",
                desc: "Algoritmos inteligentes monitoram sinais vitais 24/7 e alertam apenas quando necessário."
              },
              {
                icon: Zap,
                title: "Dados em Tempo Real",
                desc: "Receba atualizações instantâneas de pressão, glicemia e oxigenação diretamente no painel."
              },
              {
                icon: Smartphone,
                title: "Engajamento Mobile",
                desc: "Aplicativo intuitivo para pacientes registrarem dados e receberem lembretes automáticos."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-slate-950 p-8 rounded-2xl border border-white/5 hover:border-teal-500/30 transition-all hover:-translate-y-1 group">
                <div className="w-14 h-14 rounded-xl bg-slate-900 flex items-center justify-center mb-6 group-hover:bg-teal-500/10 transition-colors">
                  <feature.icon className="text-teal-500" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-teal-400 transition-colors">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BENEFITS / STATS --- */}
      <section id="benefits" className="py-24 relative overflow-hidden scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Aumente a retenção e reduza riscos clínicos.
            </h2>
            <p className="text-lg text-slate-400">
              Clínicas que utilizam VigiDoc reportam maior satisfação dos pacientes e redução drástica em eventos adversos evitáveis.
            </p>
            
            <div className="space-y-4">
              {[
                "Dashboard centralizado para múltiplos pacientes",
                "Histórico clínico exportável em PDF/Excel",
                "Comunicação segura e direta",
                "Configuração personalizada de alertas"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="text-teal-500" size={20} />
                  <span className="text-slate-200">{item}</span>
                </div>
              ))}
            </div>
            
            <Button onClick={onNavigateToLogin} className="bg-white text-slate-950 hover:bg-slate-200 px-8 py-6 rounded-xl font-bold mt-4">
              Começar Período de Teste
            </Button>
          </div>
          
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-full blur-[100px]"></div>
            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex flex-col items-center text-center">
                <span className="text-4xl font-bold text-white mb-2">40%</span>
                <span className="text-sm text-slate-400">Menos Reinternações</span>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex flex-col items-center text-center translate-y-8">
                <span className="text-4xl font-bold text-teal-400 mb-2">98%</span>
                <span className="text-sm text-slate-400">Satisfação Paciente</span>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex flex-col items-center text-center">
                <span className="text-4xl font-bold text-emerald-400 mb-2">24/7</span>
                <span className="text-sm text-slate-400">Monitoramento</span>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex flex-col items-center text-center translate-y-8">
                <span className="text-4xl font-bold text-white mb-2">10k+</span>
                <span className="text-sm text-slate-400">Vidas Monitoradas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PWA INSTALLATION TUTORIAL --- */}
      <section id="install" className="py-24 bg-slate-900 border-t border-white/5 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-12">
            <span className="text-teal-500 font-bold tracking-wider text-sm uppercase mb-2 block">Instalação Fácil</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Leve o VigiDoc no seu bolso</h2>
            <p className="text-slate-400 text-lg">
              Instale nossa aplicação diretamente no seu dispositivo sem precisar das lojas de aplicativos. 
              Funciona como um app nativo, rápido e seguro.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            {/* iOS Instructions */}
            <div className="bg-slate-950 p-8 rounded-3xl border border-white/10 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Activity size={100} />
               </div>
               <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                 <span className="bg-white text-black text-xs px-2 py-1 rounded">iOS</span>
                 iPhone & iPad
               </h3>
               
               <ol className="space-y-6 relative z-10">
                 <li className="flex gap-4">
                   <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-white/10 text-sm font-bold">1</div>
                   <div>
                     <p className="text-slate-300 text-sm">Toque no botão <span className="text-white font-bold">Compartilhar</span> na barra inferior do Safari.</p>
                     <div className="mt-2 p-2 bg-slate-800 rounded-lg inline-block">
                        <Share size={20} className="text-blue-500" />
                     </div>
                   </div>
                 </li>
                 <li className="flex gap-4">
                   <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-white/10 text-sm font-bold">2</div>
                   <div>
                     <p className="text-slate-300 text-sm">Role para baixo e selecione <span className="text-white font-bold">Adicionar à Tela de Início</span>.</p>
                     <div className="mt-2 flex items-center gap-2 text-xs text-slate-400 bg-slate-800 px-3 py-2 rounded-lg inline-flex">
                        <PlusSquare size={16} /> Adicionar à Tela de Início
                     </div>
                   </div>
                 </li>
                 <li className="flex gap-4">
                   <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-white/10 text-sm font-bold">3</div>
                   <div>
                     <p className="text-slate-300 text-sm">Confirme tocando em <span className="text-white font-bold">Adicionar</span> no topo direito.</p>
                   </div>
                 </li>
               </ol>
            </div>

            {/* Android Instructions */}
            <div className="bg-slate-950 p-8 rounded-3xl border border-white/10 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Smartphone size={100} />
               </div>
               <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                 <span className="bg-teal-500 text-black text-xs px-2 py-1 rounded">Android</span>
                 Chrome
               </h3>
               
               <ol className="space-y-6 relative z-10">
                 <li className="flex gap-4">
                   <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-white/10 text-sm font-bold">1</div>
                   <div>
                     <p className="text-slate-300 text-sm">Toque no ícone de <span className="text-white font-bold">Menu (3 pontos)</span> no canto superior direito.</p>
                     <div className="mt-2 p-2 bg-slate-800 rounded-lg inline-block">
                        <Menu size={20} className="text-slate-200" />
                     </div>
                   </div>
                 </li>
                 <li className="flex gap-4">
                   <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-white/10 text-sm font-bold">2</div>
                   <div>
                     <p className="text-slate-300 text-sm">Selecione <span className="text-white font-bold">Instalar aplicativo</span> ou <span className="text-white font-bold">Adicionar à tela inicial</span>.</p>
                     <div className="mt-2 flex items-center gap-2 text-xs text-slate-400 bg-slate-800 px-3 py-2 rounded-lg inline-flex">
                        <Download size={16} /> Instalar aplicativo
                     </div>
                   </div>
                 </li>
                 <li className="flex gap-4">
                   <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-white/10 text-sm font-bold">3</div>
                   <div>
                     <p className="text-slate-300 text-sm">Siga as instruções na tela para concluir a instalação.</p>
                   </div>
                 </li>
               </ol>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-950 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white">
              <Activity size={18} />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              Vigi<span className="text-teal-500">Doc</span>
            </span>
          </div>
          
          <div className="text-slate-500 text-sm">
            © 2024 VigiDoc Health Systems. Todos os direitos reservados.
          </div>
          
          <div className="flex gap-6">
             <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacidade</a>
             <a href="#" className="text-slate-400 hover:text-white transition-colors">Termos</a>
             <a href="#" className="text-slate-400 hover:text-white transition-colors">Suporte</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;