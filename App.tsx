import React, { useState, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { Layout, Code, Terminal, Layers, Box, Cpu, ArrowRight, MessageSquare, Shield, Coffee, FileCode, Smartphone, Rocket, Calendar, CheckCircle, MessageCircle } from 'lucide-react';
import { TechCard } from './components/TechCard';
import { MarkdownViewer } from './components/MarkdownViewer';
import { generateTechExplanation } from './services/geminiService';
import { TechStack } from './types';

// Custom WhatsApp Icon Component
const WhatsAppIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112-.149.224-.579.73-.709.88-.131.149-.261.169-.486.056-.224-.113-.953-.351-1.815-1.12-.673-.6-1.125-1.334-1.257-1.559-.131-.224-.014-.345.099-.458.101-.101.224-.263.336-.395.112-.132.149-.224.224-.374.075-.15.038-.281-.019-.393-.056-.113-.505-1.217-.692-1.666-.181-.435-.366-.377-.504-.383-.13-.006-.28-.008-.429-.008-.15 0-.395.056-.602.281-.206.225-.787.769-.787 1.876 0 1.106.805 2.174.917 2.323.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.473.537.171 1.026.147 1.413.089.43-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.066-.056-.094-.206-.15-.43-.263" />
  </svg>
);

// Icons mapping
const icons = {
  [TechStack.REACT]: <Box size={24} />,
  [TechStack.NEXTJS]: <Layers size={24} />,
  [TechStack.ANGULAR]: <Shield size={24} />,
  [TechStack.HTML_CSS]: <FileCode size={24} />,
  [TechStack.PYTHON]: <Terminal size={24} />,
  [TechStack.JAVA]: <Coffee size={24} />,
  [TechStack.FLUTTER]: <Layout size={24} />,
  [TechStack.REACT_EXPO]: <Smartphone size={24} />,
  [TechStack.GENERAL]: <Cpu size={24} />,
};

// Data for categories and techs
const categories = [
  {
    title: "Frontend Web",
    techs: [
      {
        id: TechStack.HTML_CSS,
        title: "HTML5 & CSS3",
        description: "Estrutura semântica e estilos modernos para a web."
      },
      {
        id: TechStack.REACT,
        title: "React",
        description: "Crie componentes interativos, hooks e interfaces completas."
      },
      {
        id: TechStack.NEXTJS,
        title: "Next.js",
        description: "Gere aplicações full-stack, APIs e server components."
      },
      {
        id: TechStack.ANGULAR,
        title: "Angular",
        description: "Desenvolva aplicações corporativas robustas com TypeScript."
      }
    ]
  },
  {
    title: "Mobile",
    techs: [
      {
        id: TechStack.FLUTTER,
        title: "Flutter",
        description: "Desenvolva apps nativos para iOS e Android com widgets Dart."
      },
      {
        id: TechStack.REACT_EXPO,
        title: "React Native (Expo)",
        description: "Apps nativos usando React e JavaScript com facilidade."
      }
    ]
  },
  {
    title: "Backend & Linguagens",
    techs: [
      {
        id: TechStack.PYTHON,
        title: "Python",
        description: "Scripts de automação, análise de dados e backends com FastAPI."
      },
      {
        id: TechStack.JAVA,
        title: "Java",
        description: "Sistemas robustos, APIs Spring Boot e desenvolvimento enterprise."
      }
    ]
  }
];

// --- Page Components ---

const HomePage = () => {
  const navigate = useNavigate();

  const handleTechClick = (tech: TechStack) => {
    navigate(`/generate/${tech}`);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      {/* Hero Section */}
      <header className="relative overflow-hidden pt-20 pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-6 shadow-[0_0_15px_rgba(249,115,22,0.3)]">
            <Rocket 
              size={18} 
              className="text-orange-500 animate-pulse drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" 
            />
            <span className="drop-shadow-[0_0_2px_rgba(249,115,22,0.5)]">Vagas limitadas para este mês</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
            Aprenda com um <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Professor Dedicado Remoto</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto mb-10 font-medium">
            Chega de travar em tutoriais. Tenha um mentor experiente ao seu lado para guiar sua carreira em React, Python e IA. 
            <span className="block mt-2 text-white font-semibold">Reserve agora um horário grátis pelo WhatsApp e monte seu plano de estudos.</span>
          </p>
          
          <div className="flex justify-center">
            <button 
              onClick={() => alert("Simulação: Abrindo WhatsApp para agendamento...")}
              className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-8 rounded-full shadow-xl hover:shadow-[#25D366]/40 transition-all transform hover:-translate-y-1 flex items-center gap-3 text-lg group"
            >
              <WhatsAppIcon size={28} className="text-white fill-current" />
              <span>Chamar no WhatsApp</span>
            </button>
          </div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl -z-0 pointer-events-none opacity-20">
           <div className="absolute top-20 left-10 w-64 h-64 bg-green-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
           <div className="absolute top-20 right-10 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>
      </header>

      {/* Tech Grid by Category */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        
        {/* CTA Mentoria - Moved to Top */}
        <div className="mb-20 relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 shadow-2xl border border-white/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black opacity-10 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-4 border border-white/20 shadow-sm">
                <Rocket size={14} className="text-yellow-300" />
                <span>Metodologia Comprovada</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                Domine a Programação + IA
              </h2>
              <p className="text-blue-100 text-base mb-6 leading-relaxed">
                Descubra como unir <strong>Código Sólido</strong> e <strong>Inteligência Artificial</strong> para programar 10x mais rápido. Mentoria 100% prática.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button 
                  onClick={() => handleTechClick(TechStack.GENERAL)}
                  className="bg-white text-blue-700 font-bold py-3 px-6 rounded-lg hover:bg-blue-50 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                   <Cpu size={18} />
                   Testar IA Agora
                </button>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 max-w-sm w-full transform rotate-2 hover:rotate-0 transition-transform duration-500 shadow-2xl">
                <div className="flex items-center gap-3 mb-5 border-b border-white/10 pb-4">
                    <div className="w-12 h-12 rounded-full bg-green-400 flex items-center justify-center text-slate-900 shadow-lg">
                        <CheckCircle size={24} strokeWidth={3} />
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-lg">Seu Próximo Nível</h4>
                        <p className="text-blue-100 text-xs uppercase tracking-wide">Plano Personalizado</p>
                    </div>
                </div>
                <ul className="space-y-4 text-white/90 text-sm">
                    <li className="flex items-center gap-3 bg-white/5 p-2 rounded-lg"><Rocket size={16} className="text-yellow-300"/> Aceleração de Carreira</li>
                    <li className="flex items-center gap-3 bg-white/5 p-2 rounded-lg"><Code size={16} className="text-blue-300"/> Projetos Reais</li>
                    <li className="flex items-center gap-3 bg-white/5 p-2 rounded-lg"><Coffee size={16} className="text-orange-300"/> Acompanhamento Diário</li>
                </ul>
            </div>
          </div>
        </div>
        
        {categories.map((category) => (
          <div key={category.title} className="mb-12">
            <h3 className="text-xl font-bold text-slate-300 mb-6 border-l-4 border-blue-500 pl-3 flex items-center gap-2">
              {category.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.techs.map((techItem) => (
                <TechCard
                  key={techItem.id}
                  title={techItem.title}
                  description={techItem.description}
                  icon={icons[techItem.id]}
                  tech={techItem.id}
                  onClick={handleTechClick}
                />
              ))}
            </div>
          </div>
        ))}
        
        <div className="mt-12 text-center border-t border-slate-800 pt-12">
            <h2 className="text-2xl font-bold text-white mb-4">Como funciona a Plataforma?</h2>
            <div className="grid md:grid-cols-3 gap-8 text-left mt-8">
                <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                    <span className="text-3xl font-bold text-blue-500 mb-2 block">1.</span>
                    <h3 className="text-white font-semibold mb-2">Escolha a Tech</h3>
                    <p className="text-sm text-slate-400">Selecione React, Python, Java ou qualquer outra tecnologia acima.</p>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                    <span className="text-3xl font-bold text-purple-500 mb-2 block">2.</span>
                    <h3 className="text-white font-semibold mb-2">Gere Código</h3>
                    <p className="text-sm text-slate-400">Use nossa IA integrada para gerar exemplos, explicar conceitos e criar componentes.</p>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                    <span className="text-3xl font-bold text-green-500 mb-2 block">3.</span>
                    <h3 className="text-white font-semibold mb-2">Aprenda na Prática</h3>
                    <p className="text-sm text-slate-400">Aplique o conhecimento ou agende uma aula particular para se aprofundar.</p>
                </div>
            </div>
        </div>

      </section>
    </div>
  );
};

const GeneratorPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const tech = (params.tech as TechStack) || TechStack.GENERAL;

  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasGeneratedInitial, setHasGeneratedInitial] = useState(false);

  // Initial generation effect
  React.useEffect(() => {
    if (!hasGeneratedInitial && tech) {
      handleGenerate(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tech]);

  const handleGenerate = async (isInitial: boolean = false) => {
    setLoading(true);
    setResponse(null); // Clear previous response while loading
    
    // If it's not initial, use the user's prompt. If initial, use undefined to trigger the default "Hello World" explanation.
    const query = isInitial ? undefined : prompt;
    
    const result = await generateTechExplanation(tech, query);
    setResponse(result);
    setLoading(false);
    if (isInitial) setHasGeneratedInitial(true);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <header className="bg-slate-800 border-b border-slate-700 p-4 flex items-center justify-between sticky top-0 z-50">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
        >
          <ArrowRight className="rotate-180" size={20} />
          <span className="font-semibold">Voltar para Home</span>
        </button>
        <div className="flex items-center gap-2 text-blue-400 font-bold bg-slate-900 px-4 py-2 rounded-lg border border-slate-700">
           {icons[tech]}
           <span>{tech} Assistant</span>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full p-6 flex flex-col md:flex-row gap-6">
        
        {/* Input Section */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
            <h2 className="text-white font-bold mb-4 flex items-center gap-2">
              <MessageSquare size={20} className="text-purple-400"/>
              Faça um pedido
            </h2>
            <p className="text-slate-400 text-sm mb-4">
              O Gemini já gerou uma explicação inicial. Agora, tente pedir algo específico para {tech}.
            </p>
            <textarea
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none h-40 text-sm"
              placeholder={`Ex: Crie um componente de lista em ${tech}...`}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              onClick={() => handleGenerate(false)}
              disabled={loading || !prompt.trim()}
              className={`w-full mt-4 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2
                ${loading || !prompt.trim() 
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg hover:shadow-blue-500/25'
                }`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Gerando...</span>
                </>
              ) : (
                <>
                  <Code size={18} />
                  <span>Gerar Código</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
            <h3 className="text-slate-300 text-sm font-semibold mb-2">Dicas de Prompt:</h3>
            <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside">
              <li>Seja específico sobre bibliotecas (ex: "Use Material UI" ou "Use Spring Data").</li>
              <li>Peça explicações passo-a-passo.</li>
              <li>Peça tratamento de erros.</li>
            </ul>
          </div>
        </div>

        {/* Output Section */}
        <div className="w-full md:w-2/3 bg-slate-800 rounded-xl border border-slate-700 shadow-xl overflow-hidden flex flex-col">
           <div className="bg-slate-900/50 border-b border-slate-700 px-4 py-3 flex items-center gap-2">
             <div className="flex gap-1.5">
               <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
               <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
             </div>
             <div className="ml-4 text-xs text-slate-500 font-mono">gemini-response.md</div>
           </div>
           
           <div className="p-6 overflow-y-auto flex-1 h-[600px]">
             {loading && !response ? (
               <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
                 <Cpu size={48} className="animate-pulse text-blue-500/50" />
                 <p>O Gemini está pensando na melhor solução...</p>
               </div>
             ) : (
               response && <MarkdownViewer content={response} />
             )}
           </div>
        </div>

      </main>
    </div>
  );
};

// --- App Component ---

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generate/:tech" element={<GeneratorPage />} />
      </Routes>
    </Router>
  );
};

export default App;