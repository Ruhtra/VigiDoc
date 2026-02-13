import React from 'react';
import { 
  Users, 
  Activity, 
  AlertCircle, 
  HeartPulse, 
  FileText, 
  UserPlus,
  UserX,
  ShieldAlert
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from './ui/Components';
import { Badge, Button } from './ui/Components';
import { DailyRecordsChart, AlertsChart } from './charts/Charts';
import { RecentAlertsList, RecentRecordsList } from './tables/DashboardTables';
import { useNavigation } from '../App';

const Dashboard: React.FC = () => {
  const { setCurrentPage } = useNavigation();
  const currentDate = new Date().toLocaleDateString('pt-BR', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="space-y-6 pb-16 lg:pb-0">
      
      {/* 2. DASHBOARD HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Painel de Controle
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 capitalize">
            {currentDate}
          </p>
        </div>
        <div className="flex items-center">
          <Badge variant="secondary" className="text-sm px-3 py-1 font-normal bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400 border border-teal-100 dark:border-teal-900">
            <span className="w-2 h-2 rounded-full bg-teal-500 mr-2 animate-pulse"></span>
            128 pacientes ativos
          </Badge>
        </div>
      </div>

      {/* 3. MAIN METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[
          { title: "Pacientes Ativos", value: "128", icon: Users, trend: "+4%", color: "text-blue-500" },
          { title: "Registros Diários", value: "1.240", icon: Activity, trend: "+12%", color: "text-teal-500" },
          { title: "Alertas Críticos", value: "3", icon: AlertCircle, trend: "-2", color: "text-red-500" },
          { title: "Sem Registros Hoje", value: "15", icon: UserX, trend: "-3", color: "text-orange-500" },
        ].map((metric, i) => (
          <Card key={i} className="group hover:shadow-md hover:border-teal-200 dark:hover:border-teal-800 transition-all duration-300">
            <CardContent className="p-4 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                <div className={`p-2 rounded-lg bg-slate-50 dark:bg-slate-800 ${metric.color}`}>
                  <metric.icon size={20} />
                </div>
                <span className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-300">
                  {metric.trend}
                </span>
              </div>
              <div className="mt-3">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide truncate">
                  {metric.title}
                </p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  {metric.value}
                </h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 4. CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-sm border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>Registros Diários</CardTitle>
            <CardDescription>Envios de pacientes nos últimos 7 dias</CardDescription>
          </CardHeader>
          <CardContent className="pl-0">
            <DailyRecordsChart />
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>Distribuição de Alertas</CardTitle>
            <CardDescription>Por tipo de sinal vital</CardDescription>
          </CardHeader>
          <CardContent>
            <AlertsChart />
          </CardContent>
        </Card>
      </div>

      {/* 5. LISTS (Replaces Tables) */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Alerts List */}
        <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
          <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800 flex flex-row items-center justify-between bg-red-50/50 dark:bg-red-900/10">
            <div>
              <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                <AlertCircle className="w-5 h-5" />
                Alertas Críticos
              </CardTitle>
              <CardDescription>Ação imediata necessária</CardDescription>
            </div>
            <Button 
              onClick={() => setCurrentPage('patients')}
              variant="ghost" 
              size="sm" 
              className="text-xs h-7 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              Ver Todos
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <RecentAlertsList />
          </CardContent>
        </Card>

        {/* Patient Records List */}
        <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
          <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-teal-500" />
                Últimos Registros
              </CardTitle>
              <CardDescription>Monitoramento em tempo real</CardDescription>
            </div>
            <Button 
              onClick={() => setCurrentPage('patients')}
              variant="ghost" 
              size="sm" 
              className="text-xs h-7"
            >
              Ver Todos
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <RecentRecordsList />
          </CardContent>
        </Card>
      </div>

      {/* 6. QUICK ACTIONS */}
      <div>
        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wider">
          Ações Rápidas
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Lista de Pacientes", icon: Users, action: () => setCurrentPage('patients') },
            { label: "Fila de Risco", icon: ShieldAlert, action: () => setCurrentPage('priorities') },
            { label: "Relatório Semanal", icon: FileText, action: () => setCurrentPage('reports') },
            { label: "Convidar Paciente", icon: UserPlus, action: () => {} },
          ].map((action, i) => (
            <Button 
              key={i} 
              variant="outline" 
              onClick={action.action}
              className="h-auto py-4 flex flex-col items-center gap-2 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200 dark:hover:bg-teal-900/20 dark:hover:text-teal-400 dark:hover:border-teal-900 transition-all duration-300 group"
            >
              <action.icon size={24} className="text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors" />
              <span className="font-medium">{action.label}</span>
            </Button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;