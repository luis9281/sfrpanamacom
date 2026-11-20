// Funciones de la consultoría de sistemas: texto sencillo para todo público y versión técnica.
import {
  Cloud,
  GraduationCap,
  Map,
  PiggyBank,
  ScanSearch,
  ShieldCheck,
  Wifi,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type ConsultingFunction = {
  icon: LucideIcon;
  title: string;
  simple: string;
  technical: string;
};

export const consultingFunctions: ConsultingFunction[] = [
  {
    icon: ScanSearch,
    title: "Revisamos todo lo que tienes",
    simple: "Vemos tus computadoras, programas, internet y cómo guardas tus archivos, para saber qué funciona y qué no.",
    technical: "Auditoría e inventario de infraestructura TI: hardware, software, licencias, red, accesos y respaldos.",
  },
  {
    icon: Map,
    title: "Te damos un plan por pasos",
    simple: "Te decimos qué arreglar primero, qué puede esperar y cuánto cuesta cada cosa. Sin sorpresas.",
    technical: "Plan estratégico de TI (roadmap) priorizado por impacto, riesgo y presupuesto, con metas medibles.",
  },
  {
    icon: ShieldCheck,
    title: "Protegemos tu información",
    simple: "Para que un virus, un robo o una computadora dañada no te hagan perder el trabajo de años.",
    technical: "Evaluación de seguridad, políticas de contraseñas y accesos, antivirus, firewall y respaldos automáticos.",
  },
  {
    icon: Wifi,
    title: "Ordenamos tu internet y tu red",
    simple: "Para que el WiFi llegue a toda la oficina y no se caiga cuando más lo necesitas.",
    technical: "Diseño y segmentación de red LAN/WiFi, cableado estructurado y enlaces de respaldo.",
  },
  {
    icon: Cloud,
    title: "Llevamos tus archivos a la nube",
    simple: "Para que tú y tu equipo encuentren todo desde cualquier lugar, con copias de seguridad.",
    technical: "Migración a la nube con AWS y Microsoft 365, almacenamiento compartido y acceso remoto seguro.",
  },
  {
    icon: PiggyBank,
    title: "Te ayudamos a gastar menos",
    simple: "Encontramos pagos repetidos, licencias que nadie usa y equipos que se pueden aprovechar mejor.",
    technical: "Optimización de costos TI: licenciamiento, contratos con proveedores y consolidación de servicios.",
  },
  {
    icon: Workflow,
    title: "Automatizamos tareas repetitivas",
    simple: "Lo que hoy tu equipo hace a mano una y otra vez, lo puede hacer el sistema solo.",
    technical: "Automatización de procesos (RPA), integración entre sistemas y soluciones con inteligencia artificial.",
  },
  {
    icon: GraduationCap,
    title: "Enseñamos a tu equipo",
    simple: "Capacitamos a tu personal para que use bien la tecnología y evite errores comunes.",
    technical: "Capacitación en buenas prácticas, seguridad de la información y uso de herramientas.",
  },
];
