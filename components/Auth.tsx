import React, { useState } from 'react';
import { Button, Input, Label, Checkbox } from './ui/Components';
import { Activity, ArrowRight, Lock, Mail, User, Construction, ArrowLeft } from 'lucide-react';
import { cn } from '../lib/utils';

export type AuthPageType = 'login' | 'register' | 'forgot-password';

interface AuthProps {
  onLogin: () => void;
  currentAuthPage: AuthPageType;
  setAuthPage: (page: AuthPageType) => void;
}

const AuthLayout: React.FC<{ 
  children: React.ReactNode; 
  title: string; 
  subtitle: string;
}> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2">
      {/* Left Side (Desktop) / Top (Mobile) - Brand Area */}
      <div className="relative hidden lg:flex flex-col items-center justify-center bg-slate-900 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900 to-slate-950 z-0"></div>
        <div className="absolute top-0 -left-40 w-96 h-96 bg-teal-600/20 rounded-full blur-3xl filter"></div>
        <div className="absolute bottom-0 -right-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl filter"></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center p-12 max-w-lg">
          <div className="w-24 h-24 bg-gradient-to-tr from-teal-500 to-teal-400 rounded-2xl flex items-center justify-center shadow-2xl shadow-teal-900/50 mb-8 transform rotate-3 hover:rotate-6 transition-transform duration-500">
            <Activity className="text-white w-12 h-12" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-6 tracking-tight">Vigi<span className="text-teal-400">Doc</span></h1>
          <p className="text-xl text-slate-300 leading-relaxed font-light">
            Monitoramento contínuo inteligente para uma medicina proativa, segura e humana.
          </p>
          
          {/* Quote / Testimonial Style Element */}
          <div className="mt-12 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
            <p className="text-sm text-slate-400 italic">"A revolução no cuidado ao paciente começa com a vigilância constante e a ação precisa."</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form Area */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-slate-50 dark:bg-slate-950 h-full relative">
        {/* Mobile Logo (Visible only on mobile) */}
        <div className="lg:hidden flex flex-col items-center mb-8">
           <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center shadow-lg mb-3">
            <Activity className="text-white w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Vigi<span className="text-teal-600">Doc</span></h2>
        </div>

        <div className="w-full max-w-[400px] space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center lg:text-left space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h2>
            <p className="text-slate-500 dark:text-slate-400">{subtitle}</p>
          </div>

          {children}
        </div>
        
        {/* Footer */}
        <div className="absolute bottom-6 text-center text-xs text-slate-400">
          © 2024 VigiDoc Health Systems. Todos os direitos reservados.
        </div>
      </div>
    </div>
  );
};

export const LoginPage: React.FC<AuthProps> = ({ onLogin, setAuthPage }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onLogin();
    }, 1500);
  };

  return (
    <AuthLayout 
      title="Bem-vindo de volta" 
      subtitle="Insira suas credenciais para acessar o painel."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input id="email" placeholder="medico@vigidoc.com" type="email" required className="pl-10" />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Senha</Label>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input id="password" type="password" placeholder="••••••••" required className="pl-10" />
          </div>
        </div>

        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-600 dark:text-slate-400"
                >
                    Lembrar de mim
                </label>
            </div>
            <Button 
                type="button" 
                variant="link" 
                className="text-xs"
                onClick={() => setAuthPage('forgot-password')}
            >
                Esqueci minha senha
            </Button>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading} size="lg">
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
              Acessando...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Entrar <ArrowRight size={16} />
            </span>
          )}
        </Button>
      </form>
      
      <div className="text-center text-sm text-slate-600 dark:text-slate-400 pt-4">
        Não tem uma conta?{" "}
        <Button variant="link" onClick={() => setAuthPage('register')}>
          Cadastre-se agora
        </Button>
      </div>
    </AuthLayout>
  );
};

export const RegisterPage: React.FC<AuthProps> = ({ onLogin, setAuthPage }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onLogin(); // Auto login after register
    }, 1500);
  };

  return (
    <AuthLayout 
      title="Criar nova conta" 
      subtitle="Comece a monitorar seus pacientes hoje mesmo."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" placeholder="Dr. João" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="lastname">Sobrenome</Label>
                <Input id="lastname" placeholder="Silva" required />
            </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email profissional</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input id="email" placeholder="medico@hospital.com" type="email" required className="pl-10" />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input id="password" type="password" placeholder="••••••••" required className="pl-10" />
          </div>
        </div>

        <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="terms" required />
            <label
                htmlFor="terms"
                className="text-xs text-slate-600 dark:text-slate-400 leading-tight"
            >
                Concordo com os <a href="#" className="underline text-teal-600">Termos de Serviço</a> e <a href="#" className="underline text-teal-600">Política de Privacidade</a>.
            </label>
        </div>

        <Button type="submit" className="w-full mt-2" disabled={isLoading} size="lg">
          {isLoading ? "Criando conta..." : "Criar Conta"}
        </Button>
      </form>
      
      <div className="text-center text-sm text-slate-600 dark:text-slate-400 pt-4">
        Já possui cadastro?{" "}
        <Button variant="link" onClick={() => setAuthPage('login')}>
          Faça login
        </Button>
      </div>
    </AuthLayout>
  );
};

export const ForgotPasswordPage: React.FC<AuthProps> = ({ setAuthPage }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
        <div className="max-w-md w-full text-center space-y-6">
            <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Construction className="text-amber-600 dark:text-amber-500 w-10 h-10" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Recuperação em Construção</h1>
            <p className="text-slate-500 dark:text-slate-400">
                O módulo de recuperação de senha está sendo implementado com segurança reforçada. Por favor, contate o administrador do sistema.
            </p>
            <Button onClick={() => setAuthPage('login')} variant="outline" className="gap-2 mt-4">
                <ArrowLeft size={16} /> Voltar ao Login
            </Button>
        </div>
    </div>
  );
};

export const AuthManager: React.FC<AuthProps> = (props) => {
    switch (props.currentAuthPage) {
        case 'login': return <LoginPage {...props} />;
        case 'register': return <RegisterPage {...props} />;
        case 'forgot-password': return <ForgotPasswordPage {...props} />;
        default: return <LoginPage {...props} />;
    }
};