import React, { useState } from 'react';
import { Badge, Button } from '../ui/Components';
import { 
  Eye, 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  Activity,
  Heart,
  Thermometer,
  Wind,
  Scale,
  Frown,
  Stethoscope
} from 'lucide-react';
import { cn } from '../../lib/utils';

// --- Types ---
interface PatientData {
  id: string;
  name: string;
  avatar: string;
  time: string;
  bp: string;
  hr: number;
  temp: number;
  spo2: string;
  weight: number;
  pain?: number; // Only for alerts
  status?: 'Gravado' | 'Atrasado' | 'Pendente'; // Only for records
  alertReason?: string; // Only for alerts
}

// --- Data ---
const alertsData: PatientData[] = [
  { id: '1', name: 'Emily Richardson', avatar: 'https://i.pravatar.cc/150?u=emily', time: '08:23', bp: '158/92', hr: 112, temp: 38.2, spo2: '91%', weight: 74.2, pain: 8, alertReason: 'PA Alta & Dor' },
  { id: '2', name: 'James Carter', avatar: 'https://i.pravatar.cc/150?u=james', time: '07:15', bp: '145/88', hr: 104, temp: 37.8, spo2: '94%', weight: 82.1, pain: 6, alertReason: 'Taquicardia' },
  { id: '3', name: 'Maria Garcia', avatar: 'https://i.pravatar.cc/150?u=maria', time: 'Ontem', bp: '182/104', hr: 124, temp: 38.9, spo2: '88%', weight: 68.5, pain: 9, alertReason: 'Sinais Críticos' },
];

const recordsData: PatientData[] = [
  { id: '4', name: 'David Kim', avatar: 'https://i.pravatar.cc/150?u=david', time: '09:12', bp: '118/76', hr: 72, temp: 36.5, spo2: '98%', weight: 71.3, status: 'Gravado' },
  { id: '5', name: 'Sarah Jenkins', avatar: 'https://i.pravatar.cc/150?u=sarah', time: '08:45', bp: '122/80', hr: 68, temp: 36.4, spo2: '99%', weight: 63.8, status: 'Gravado' },
  { id: '6', name: 'Robert Miller', avatar: 'https://i.pravatar.cc/150?u=robert', time: '07:30', bp: '135/85', hr: 76, temp: 36.6, spo2: '97%', weight: 88.2, status: 'Gravado' },
  { id: '7', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?u=john', time: 'Ontem', bp: '128/82', hr: 70, temp: 36.5, spo2: '98%', weight: 76.9, status: 'Atrasado' },
];

// --- Shared Components ---

interface VitalCardProps {
  label: string;
  value: string | number;
  unit?: string;
  isAlert?: boolean;
  icon: React.ElementType;
  iconColorClass: string;
  bgColorClass: string;
}

const VitalCard: React.FC<VitalCardProps> = ({ label, value, unit, isAlert = false, icon: Icon, iconColorClass, bgColorClass }) => (
  <div className={cn("flex flex-col items-center justify-between p-3 rounded-lg border transition-all duration-200 h-full min-h-[120px]", 
    isAlert 
      ? "bg-red-50 border-red-100 dark:bg-red-900/10 dark:border-red-900/30" 
      : "bg-white border-slate-100 dark:bg-slate-800/40 dark:border-slate-800"
  )}>
    {/* Top Section: Icon and Label */}
    <div className="flex flex-col items-center w-full">
        {/* Icon Container: Fixed size to ensure alignment */}
        <div className={cn("w-8 h-8 flex items-center justify-center rounded-full mb-2", bgColorClass, isAlert ? "bg-red-100 dark:bg-red-900/30" : "")}>
            <Icon size={16} className={cn(iconColorClass, isAlert ? "text-red-600 dark:text-red-400" : "")} />
        </div>
        
        {/* Label Container: Fixed height (h-8) to accommodate 1 or 2 lines without shifting content below */}
        <div className="h-8 flex items-center justify-center w-full">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold text-center leading-3">
                {label}
            </span>
        </div>
    </div>
    
    {/* Bottom Section: Value */}
    <span className={cn("text-base font-bold", isAlert ? "text-red-600 dark:text-red-400" : "text-slate-900 dark:text-slate-100")}>
      {value}<span className="text-[10px] font-normal text-slate-400 ml-0.5">{unit}</span>
    </span>
  </div>
);

interface PatientListItemProps {
  data: PatientData;
  type: 'alert' | 'record';
}

const PatientListItem: React.FC<PatientListItemProps> = ({ data, type }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Status Badge Logic
  let statusBadge;
  if (type === 'alert') {
    statusBadge = (
      <Badge variant="destructive" className="flex items-center gap-1 shadow-sm px-2">
        <AlertTriangle size={10} />
        {data.alertReason}
      </Badge>
    );
  } else {
    statusBadge = (
      <Badge 
        variant={data.status === 'Gravado' ? 'success' : data.status === 'Atrasado' ? 'warning' : 'secondary'} 
        className="flex items-center gap-1 px-2"
      >
        {data.status === 'Gravado' ? <CheckCircle2 size={10} /> : <Clock size={10} />}
        {data.status}
      </Badge>
    );
  }

  return (
    <div className="border-b border-slate-100 dark:border-slate-800 last:border-0">
      {/* Header / Summary View */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
      >
        <div className="flex items-center gap-3 md:gap-4">
          <div className="relative">
            <img 
              src={data.avatar} 
              alt={data.name} 
              className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-sm"
            />
            {type === 'alert' && (
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full animate-pulse"></span>
            )}
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">{data.name}</span>
              {/* Only show badge inline on desktop, hide on small mobile to save space if needed, or wrap */}
              <div className="hidden sm:block">{statusBadge}</div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              <span>{data.time}</span>
              <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
              <span className="font-mono">{data.bp} mmHg</span>
            </div>
             {/* Show badge below name on mobile */}
             <div className="sm:hidden mt-1">{statusBadge}</div>
          </div>
        </div>

        <Button variant="ghost" size="icon" className="text-slate-400 group-hover:text-teal-600">
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </Button>
      </div>

      {/* Expanded Details View */}
      <div className={cn(
        "grid transition-[grid-template-rows] duration-300 ease-out",
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      )}>
        <div className="overflow-hidden">
          <div className="p-4 pt-0 bg-slate-50/50 dark:bg-slate-900/30">
             <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-2">
                <VitalCard 
                    label="PA" 
                    value={data.bp} 
                    unit="" 
                    isAlert={type === 'alert' && parseInt(data.bp) > 140}
                    icon={Activity}
                    iconColorClass="text-red-500"
                    bgColorClass="bg-red-100 dark:bg-red-500/10"
                />
                <VitalCard 
                    label="Freq. Card." 
                    value={data.hr} 
                    unit="bpm" 
                    isAlert={type === 'alert' && data.hr > 100}
                    icon={Heart}
                    iconColorClass="text-orange-500"
                    bgColorClass="bg-orange-100 dark:bg-orange-500/10"
                />
                <VitalCard 
                    label="Temp" 
                    value={data.temp} 
                    unit="°C"
                    icon={Thermometer}
                    iconColorClass="text-amber-500"
                    bgColorClass="bg-amber-100 dark:bg-amber-500/10"
                />
                <VitalCard 
                    label="SpO₂" 
                    value={data.spo2} 
                    unit="" 
                    isAlert={parseInt(data.spo2) < 95}
                    icon={Wind}
                    iconColorClass="text-sky-500"
                    bgColorClass="bg-sky-100 dark:bg-sky-500/10"
                />
                <VitalCard 
                    label="Peso" 
                    value={data.weight} 
                    unit="kg"
                    icon={Scale}
                    iconColorClass="text-slate-500"
                    bgColorClass="bg-slate-100 dark:bg-slate-500/10"
                />
                {type === 'alert' ? (
                   <VitalCard 
                        label="Dor" 
                        value={`${data.pain}/10`} 
                        unit="" 
                        isAlert={true}
                        icon={Frown}
                        iconColorClass="text-rose-500"
                        bgColorClass="bg-rose-100 dark:bg-rose-500/10"
                   />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Button size="sm" variant="outline" className="text-xs h-full w-full min-h-[120px] border-teal-200 text-teal-700 hover:bg-teal-50 dark:border-teal-900 dark:text-teal-400 dark:hover:bg-teal-900/20 flex flex-col gap-2 items-center justify-center p-0">
                      <Clock size={16} />
                      <span>Histórico</span>
                    </Button>
                  </div>
                )}
             </div>
             
             {type === 'alert' && (
               <div className="mt-3 flex justify-end gap-2">
                 <Button size="sm" variant="outline" className="text-xs">Dispensar</Button>
                 <Button size="sm" className="text-xs bg-teal-600 hover:bg-teal-700">Contatar</Button>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Exported Lists ---

export const RecentAlertsList = () => {
  return (
    <div className="flex flex-col bg-white dark:bg-slate-900">
      {alertsData.map((patient) => (
        <PatientListItem key={patient.id} data={patient} type="alert" />
      ))}
    </div>
  );
};

export const RecentRecordsList = () => {
  return (
    <div className="flex flex-col bg-white dark:bg-slate-900">
      {recordsData.map((patient) => (
        <PatientListItem key={patient.id} data={patient} type="record" />
      ))}
    </div>
  );
};