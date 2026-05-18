import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, 
  ChevronRight, 
  Code, 
  Layout, 
  Server, 
  Sparkles, 
  Terminal, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Database,
  Lock,
  Github,
  Instagram,
  Heart
} from 'lucide-react';

const steps = [
  { id: 'html', label: 'HTML Básico', icon: Terminal },
  { id: 'lp', label: 'Landing Page', icon: Layout },
  { id: 'saas', label: 'Mini SaaS', icon: Server },
  { id: 'db', label: 'Banco de Dados', icon: Database, future: true },
  { id: 'sec', label: 'Segurança', icon: Lock, future: true },
];

export function Home() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState('html');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = steps.filter(s => !s.future).map(s => document.getElementById(s.id));
      let current = '';
      let completed = [];

      sections.forEach((section, index) => {
        if (!section) return;
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
          current = section.id;
          completed = steps.filter(s => !s.future).slice(0, index).map(s => s.id);
        }
      });

      if (current) {
        setActiveStep(current);
        setCompletedSteps(completed);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isCompleted = (stepId: string) => completedSteps.includes(stepId) || (activeStep !== stepId && steps.findIndex(s => s.id === stepId) < steps.findIndex(s => s.id === activeStep));

  return (
    <div className="min-h-screen bg-[#050510] text-slate-300 font-sans selection:bg-indigo-500/30">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 origin-left z-50"
        style={{ scaleX }}
      />

      <header className="fixed top-0 left-0 right-0 z-40 bg-[#050510]/80 backdrop-blur-md border-b border-white/5 py-4 px-6 mt-1">
        <div className="max-w-4xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar gap-4">
          {steps.map((step, index) => {
            const active = activeStep === step.id;
            const completed = isCompleted(step.id);
            const StepIcon = step.icon;
            
            return (
              <div key={step.id} className="flex items-center gap-2 flex-shrink-0">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  active ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 
                  completed ? 'text-emerald-400' : 
                  'text-slate-600'
                }`}>
                  {completed ? <Check size={16} /> : <StepIcon size={16} />}
                  <span>{step.label}</span>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight size={16} className={completed ? 'text-emerald-500/50' : 'text-slate-800'} />
                )}
              </div>
            );
          })}
        </div>
      </header>

      <main className="pt-24 pb-32">
        <section id="html" className="min-h-screen flex items-center pt-12 pb-24 px-6">
          <div className="max-w-4xl mx-auto w-full">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-sm mb-6">
                <Sparkles size={14} className="text-yellow-500" />
                <span>Passo 1 de 5</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
                A estrutura de <br className="hidden md:block" />tudo na internet.
              </h1>
              <p className="text-lg text-slate-400 max-w-xl mx-auto">
                Não se assuste. Por trás de toda página complexa, aplicativo ou sistema milionário, existe uma estrutura surpreendentemente simples.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid gap-8"
            >
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-4">O que é HTML?</h3>
                <p className="text-slate-300 mb-4 text-lg">
                  HTML é a linguagem usada para criar a estrutura dos sites.
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <span className="px-3 py-1.5 rounded-lg bg-black/50 text-indigo-300 text-sm font-medium border border-indigo-500/20">Títulos</span>
                  <span className="px-3 py-1.5 rounded-lg bg-black/50 text-indigo-300 text-sm font-medium border border-indigo-500/20">Textos</span>
                  <span className="px-3 py-1.5 rounded-lg bg-black/50 text-indigo-300 text-sm font-medium border border-indigo-500/20">Botões</span>
                  <span className="px-3 py-1.5 rounded-lg bg-black/50 text-indigo-300 text-sm font-medium border border-indigo-500/20">Imagens</span>
                  <span className="px-3 py-1.5 rounded-lg bg-black/50 text-indigo-300 text-sm font-medium border border-indigo-500/20">Páginas completas</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-8 rounded-2xl bg-white/5 border border-white/10 shadow-xl">
                  <h3 className="text-2xl font-bold text-white mb-6">Estrutura Básica</h3>
                  
                  <div className="bg-[#0D0D18] rounded-xl p-4 font-mono text-sm border border-white/5">
                    <span className="text-slate-500">1</span> <span className="text-indigo-400">&lt;!DOCTYPE html&gt;</span><br/>
                    <span className="text-slate-500">2</span> <span className="text-indigo-400">&lt;html&gt;</span><br/>
                    <span className="text-slate-500">3</span> &nbsp;&nbsp;<span className="text-indigo-400">&lt;head&gt;</span><br/>
                    <span className="text-slate-500">4</span> &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-indigo-400">&lt;title&gt;</span>Meu Primeiro Site<span className="text-indigo-400">&lt;/title&gt;</span><br/>
                    <span className="text-slate-500">5</span> &nbsp;&nbsp;<span className="text-indigo-400">&lt;/head&gt;</span><br/>
                    <span className="text-slate-500">6</span> <br/>
                    <span className="text-slate-500">7</span> &nbsp;&nbsp;<span className="text-indigo-400">&lt;body&gt;</span><br/>
                    <span className="text-slate-500">8</span> &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-400 font-bold">&lt;h1&gt;</span>Hello World<span className="text-emerald-400 font-bold">&lt;/h1&gt;</span><br/>
                    <span className="text-slate-500">9</span> &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-400 font-bold">&lt;p&gt;</span>Meu primeiro site em HTML<span className="text-emerald-400 font-bold">&lt;/p&gt;</span><br/>
                    <span className="text-slate-500">10</span> &nbsp;<span className="text-indigo-400">&lt;/body&gt;</span><br/>
                    <span className="text-slate-500">11</span> <span className="text-indigo-400">&lt;/html&gt;</span>
                  </div>
                </div>

                <div className="p-8 rounded-2xl bg-white/5 border border-white/10 shadow-xl">
                  <h3 className="text-2xl font-bold text-white mb-6">Explicação das Tags</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="font-mono text-indigo-400 font-bold w-16">&lt;html&gt;</div>
                      <div className="flex-1 text-sm text-slate-400">Estrutura principal. Tudo fica dentro dela.</div>
                    </div>
                    <div className="flex gap-4">
                      <div className="font-mono text-indigo-400 font-bold w-16">&lt;head&gt;</div>
                      <div className="flex-1 text-sm text-slate-400">Configurações da página.</div>
                    </div>
                    <div className="flex gap-4">
                      <div className="font-mono text-indigo-400 font-bold w-16">&lt;title&gt;</div>
                      <div className="flex-1 text-sm text-slate-400">Nome que aparece na aba do navegador.</div>
                    </div>
                    <div className="flex gap-4">
                      <div className="font-mono text-indigo-400 font-bold w-16">&lt;body&gt;</div>
                      <div className="flex-1 text-sm text-slate-400">Área com o conteúdo visível.</div>
                    </div>
                    <div className="flex gap-4">
                      <div className="font-mono text-emerald-400 font-bold w-16">&lt;h1&gt;</div>
                      <div className="flex-1 text-sm text-slate-400">Título principal da página.</div>
                    </div>
                    <div className="flex gap-4">
                      <div className="font-mono text-emerald-400 font-bold w-16">&lt;p&gt;</div>
                      <div className="flex-1 text-sm text-slate-400">Parágrafo de texto normal.</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-r from-indigo-900/40 to-purple-900/20 border border-indigo-500/20 text-center shadow-xl mt-6">
                <h3 className="text-2xl font-bold text-white mb-4">Veja isso funcionando na prática</h3>
                <p className="text-lg text-indigo-200/80 mb-8 max-w-2xl mx-auto">
                  Preparamos um ambiente seguro para você testar esse código. Clique no botão abaixo para abrir nosso Mini Editor, colar o código e ver a mágica acontecer.
                </p>
                <button 
                  onClick={() => navigate('/editor')}
                  className="px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold tracking-wide transition-all shadow-[0_0_40px_-5px_rgba(79,70,229,0.5)] flex items-center justify-center gap-2 mx-auto"
                >
                  <Code size={20} />
                  ABRIR MINI EDITOR DE CÓDIGO
                </button>
              </div>
            </motion.div>

            {/* CSS Bonus Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 pt-16 border-t border-white/5"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/30 border border-cyan-800 text-cyan-400 text-sm mb-6">
                <Sparkles size={14} className="text-cyan-400" />
                <span>Bônus Especial</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
                Introdução Básica ao CSS
              </h2>
              
              <div className="grid gap-8">
                {/* O que é CSS? */}
                <div className="p-8 rounded-2xl bg-white/5 border border-white/10 shadow-xl">
                  <h3 className="text-2xl font-bold text-white mb-4">O que é CSS?</h3>
                  <p className="text-slate-300 mb-4 text-lg">
                    CSS é a linguagem usada para estilizar um site.
                  </p>
                  <p className="text-slate-400 mb-6">
                    Enquanto o HTML cria a estrutura, o CSS deixa o site bonito. Com CSS você consegue mudar:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {['Cores', 'Tamanhos', 'Fontes', 'Espaçamentos', 'Animações', 'Aparência visual da página'].map(item => (
                      <span key={item} className="px-3 py-1.5 rounded-lg bg-black/50 text-cyan-300 text-sm font-medium border border-cyan-500/20">{item}</span>
                    ))}
                  </div>
                </div>

                {/* Exemplo Básico de CSS & Explicando */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-8 rounded-2xl bg-white/5 border border-white/10 shadow-xl">
                    <h3 className="text-2xl font-bold text-white mb-6">Exemplo Básico de CSS</h3>
                    
                    <div className="bg-[#0D0D18] rounded-xl p-4 font-mono text-sm border border-white/5 overflow-x-auto">
                      <span className="text-indigo-400">&lt;!DOCTYPE html&gt;</span><br/>
                      <span className="text-indigo-400">&lt;html&gt;</span><br/>
                      <span className="text-indigo-400">&lt;head&gt;</span><br/>
                      &nbsp;&nbsp;<span className="text-indigo-400">&lt;title&gt;</span>Meu Primeiro Site<span className="text-indigo-400">&lt;/title&gt;</span><br/><br/>
                      &nbsp;&nbsp;<span className="text-indigo-400">&lt;style&gt;</span><br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">body</span> {'{'} <br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-300">background</span>: <span className="text-emerald-400">black</span>;<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-300">color</span>: <span className="text-emerald-400">white</span>;<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-300">font-family</span>: <span className="text-emerald-400">Arial</span>;<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-300">text-align</span>: <span className="text-emerald-400">center</span>;<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-300">padding-top</span>: <span className="text-emerald-400">100px</span>;<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;{'}'}<br/><br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">h1</span> {'{'} <br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-300">color</span>: <span className="text-emerald-400">cyan</span>;<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-300">font-size</span>: <span className="text-emerald-400">50px</span>;<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;{'}'}<br/><br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400">p</span> {'{'} <br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-300">color</span>: <span className="text-emerald-400">gray</span>;<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-300">font-size</span>: <span className="text-emerald-400">20px</span>;<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;{'}'}<br/>
                      &nbsp;&nbsp;<span className="text-indigo-400">&lt;/style&gt;</span><br/><br/>
                      <span className="text-indigo-400">&lt;/head&gt;</span><br/>
                      <span className="text-indigo-400">&lt;body&gt;</span><br/>
                      &nbsp;&nbsp;<span className="text-emerald-400 font-bold">&lt;h1&gt;</span>Hello World<span className="text-emerald-400 font-bold">&lt;/h1&gt;</span><br/>
                      &nbsp;&nbsp;<span className="text-emerald-400 font-bold">&lt;p&gt;</span>Meu primeiro site estilizado<span className="text-emerald-400 font-bold">&lt;/p&gt;</span><br/>
                      <span className="text-indigo-400">&lt;/body&gt;</span><br/>
                      <span className="text-indigo-400">&lt;/html&gt;</span>
                    </div>
                  </div>

                  <div className="p-8 rounded-2xl bg-white/5 border border-white/10 shadow-xl flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-white mb-6">Explicando o CSS</h3>
                    <div className="space-y-6">
                      <div>
                        <div className="font-mono text-cyan-400 font-bold mb-1">background</div>
                        <div className="text-sm text-slate-400">Muda a cor de fundo da página.</div>
                      </div>
                      <div className="h-px bg-white/5 w-full"></div>
                      <div>
                        <div className="font-mono text-cyan-400 font-bold mb-1">color</div>
                        <div className="text-sm text-slate-400">Muda a cor do texto.</div>
                      </div>
                      <div className="h-px bg-white/5 w-full"></div>
                      <div>
                        <div className="font-mono text-cyan-400 font-bold mb-1">font-size</div>
                        <div className="text-sm text-slate-400">Muda o tamanho do texto.</div>
                      </div>
                      <div className="h-px bg-white/5 w-full"></div>
                      <div>
                        <div className="font-mono text-cyan-400 font-bold mb-1">font-family</div>
                        <div className="text-sm text-slate-400">Muda a fonte do texto.</div>
                      </div>
                      <div className="h-px bg-white/5 w-full"></div>
                      <div>
                        <div className="font-mono text-cyan-400 font-bold mb-1">text-align</div>
                        <div className="text-sm text-slate-400">Alinha o texto.</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resultado Final Explain */}
                <div className="p-8 rounded-2xl bg-[#0D0D18] border border-white/5 mt-4">
                  <h3 className="text-xl font-bold text-white mb-4">O Resultado Final</h3>
                  <p className="text-slate-400 mb-6">Agora seu site já possui a estrutura com <strong>HTML</strong> e o estilo visual com <strong>CSS</strong>.</p>
                  <p className="text-slate-400 mb-6">Essa é a base usada para criar:</p>
                  <div className="flex flex-wrap gap-4">
                    {['Landing pages', 'Sites modernos', 'Interfaces profissionais', 'Páginas animadas', 'Dashboards', 'Sistemas web'].map((item, index) => (
                      <span key={index} className="flex items-center gap-2 text-sm text-slate-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                        <Check size={14} className="text-emerald-500" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-16 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col items-center text-center gap-3 max-w-lg mx-auto"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-emerald-400 font-semibold text-xl">Resultado conquistado</h3>
              <p className="text-emerald-400/80">"Nossa... eu consigo programar." Você acabou de entender a base e "criar" seu primeiro código real.</p>
            </motion.div>
          </div>
        </section>

        <section id="lp" className="py-24 px-6 relative border-t border-white/5 bg-gradient-to-b from-[#050510] to-[#0a0a1a]">
          <div className="max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-sm mb-6">
                <span>Passo 2 de 5</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Você criou manualmente...</h2>
              <p className="text-lg text-slate-400 mb-8 max-w-2xl">
                O fluxo normal para publicar uma página na internet exige paciência. É de graça, mas leva tempo.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { title: 'Gerar Código', desc: 'Criar HTML/CSS no ChatGPT', icon: Code },
                  { title: 'Conta & Repo', desc: 'Configurar GitHub', icon: Github },
                  { title: 'Arquivos', desc: 'Criar e salvar index.html', icon: Terminal },
                  { title: 'Deploy', desc: 'Ativar GitHub Pages', icon: Globe },
                ].map((step, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-[#0D0D18] border border-white/5 relative">
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-400">
                      {i + 1}
                    </div>
                    <step.icon size={24} className="text-slate-500 mb-3" />
                    <h3 className="text-white font-medium mb-1">{step.title}</h3>
                    <p className="text-sm text-slate-500">{step.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
                <CheckCircle2 className="text-emerald-400 flex-shrink-0" />
                <p className="text-emerald-400/90 font-medium">✅ Você publicou sua primeira página online (manualmente).</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-32 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-indigo-900/40 via-purple-900/20 to-black border border-indigo-500/20 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none"></div>
              
              <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Enquanto a maioria demora dias para criar páginas...
                  </h2>
                  <p className="text-xl text-indigo-200/80 mb-6 font-light">
                    Você pode gerar landing pages completas em <strong className="text-white">minutos</strong> usando IA.
                  </p>
                  <ul className="space-y-4 mb-10">
                    {[
                      'Páginas profissionais prontas para converter',
                      'Design cinematográfico e responsivo',
                      'Animações implementadas automaticamente',
                      'Deploy em 1 clique (sem GitHub)'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check size={20} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-sm text-slate-400 mb-6 italic">
                    Páginas criadas aqui podem ser vendidas por R$750, R$1.500 ou mais.
                  </p>

                  <a href="https://seusite-ai-lp-lz.vercel.app/" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm tracking-wide transition-all shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] inline-flex items-center justify-center gap-2 group">
                    QUERO CRIAR LANDING PAGES PROFISSIONAIS COM IA
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
                
                <div className="relative">
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
                    <div className="absolute inset-0 bg-slate-900 flex flex-col">
                      <div className="h-12 bg-black border-b border-white/5 flex items-center px-4">
                        <div className="flex gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                        </div>
                        <div className="mx-auto text-xs font-semibold text-slate-500 tracking-widest pt-0.5">SEUSITE.AI</div>
                      </div>
                      <div className="flex-1 relative p-6 flex flex-col justify-center items-center">
                        <div className="w-full max-w-xs space-y-4">
                          <div className="h-10 bg-white/5 rounded-lg border border-white/10 flex items-center px-4">
                            <div className="w-2 h-4 bg-indigo-500 animate-pulse"></div>
                            <span className="text-slate-400 text-sm ml-2">Gerando copy persuasiva...</span>
                          </div>
                          <div className="space-y-2">
                            <div className="h-2 bg-white/5 rounded w-full"></div>
                            <div className="h-2 bg-white/5 rounded w-4/5"></div>
                            <div className="h-2 bg-white/5 rounded w-full"></div>
                          </div>
                          
                          <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="mt-8 p-4 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 border border-white/20 shadow-xl"
                          >
                            <div className="h-6 w-3/4 bg-white/20 rounded mb-2"></div>
                            <div className="h-3 w-1/2 bg-white/20 rounded mb-4"></div>
                            <div className="h-8 w-1/3 bg-white rounded-full"></div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="saas" className="py-24 px-6 relative border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-sm mb-6">
                <span>Passo 3 de 5</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">O Próximo Nível: Criando Softwares</h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                "Se eu consigo criar uma landing page... talvez eu consiga criar um sistema inteiro."<br/> E a resposta é: <strong className="text-white">Sim, você consegue.</strong>
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {[
                { title: '1. O que é SaaS?', desc: 'Software as a Service. Um sistema pago de forma recorrente por usuários (Netflix, Spotify).' },
                { title: '2. Criando a Interface', desc: 'Usando prompts avançados para gerar dashboards bonitos e funcionais.' },
                { title: '3. Lógica e APIs', desc: 'Conectando botões a funcionalidades reais que entregam valor.' },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                  <h3 className="text-white font-medium mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-10 rounded-3xl bg-slate-900 border border-slate-800 mb-16 text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-2">Landing pages vendem serviços.</h3>
              <h3 className="text-2xl font-bold text-emerald-400 mb-8">SaaS vende enquanto você dorme.</h3>
              
              <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-400">
                <span className="px-4 py-2 rounded-full bg-black border border-white/5 flex items-center gap-2"><Lock size={14}/> Login</span>
                <span className="px-4 py-2 rounded-full bg-black border border-white/5 flex items-center gap-2"><Layout size={14}/> Dashboard</span>
                <span className="px-4 py-2 rounded-full bg-black border border-white/5 flex items-center gap-2"><Zap size={14}/> Automações</span>
                <span className="px-4 py-2 rounded-full bg-black border border-white/5 flex items-center gap-2"><Server size={14}/> Sistemas Vendáveis</span>
              </div>
            </motion.div>

            <div className="text-center mb-16">
              <a href="https://lp-curso-saas.vercel.app/" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-wide transition-all shadow-[0_0_40px_-10px_rgba(16,185,129,0.4)] inline-flex items-center justify-center gap-2 mx-auto group">
                CONHECER O CURSO: CRIANDO SEU MINI SAAS
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 max-w-lg mx-auto flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h3 className="text-emerald-400 font-semibold mb-1">Resultado conquistado</h3>
                <p className="text-emerald-400/80 text-sm">✅ Você construiu (visualmente) seu primeiro software. O limite agora é a sua imaginação.</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="final" className="py-24 px-6 relative border-t border-white/5 bg-black">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black pointer-events-none"></div>
          
          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Próximos Passos</h2>
            <p className="text-xl text-slate-400 mb-12">
              Para escalar seus projetos, os próximos passos envolvem <span className="text-white">Bancos de Dados</span> e <span className="text-white">Segurança</span>.
            </p>

            <div className="p-1 rounded-[2rem] bg-gradient-to-b from-indigo-500 via-purple-500 to-indigo-500/20 shadow-2xl">
              <div className="bg-[#050510] rounded-[1.85rem] p-10 md:p-16">
                <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 font-semibold text-sm mb-6 uppercase tracking-wider">
                  Pacote Completo
                </div>
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">Domine a Programação com IA</h3>
                <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                  Acesso total ao construtor de Landing Pages <strong>SeuSite AI</strong> + <strong>Curso Mini SaaS</strong> + Módulos Avançados (DB e Segurança).
                </p>

                <div className="flex flex-col items-center justify-center mb-8">
                  <div className="text-slate-500 line-through text-lg mb-1">De R$ 497,00</div>
                  <div className="flex items-end gap-2 text-white">
                    <span className="text-2xl font-bold">R$</span>
                    <span className="text-6xl font-black">99<span className="text-4xl text-slate-400">,90</span></span>
                  </div>
                  <div className="text-emerald-400 font-medium mt-2">Pagamento único. Acesso vitalício.</div>
                </div>

                <ul className="text-left space-y-4 max-w-md mx-auto mb-10">
                  {[
                    '1 Ano de SeuSite AI Pro',
                    'Curso Completo: Mini SaaS do Zero',
                    'Módulo Extra: Bancos de Dados com Supabase',
                    'Módulo Extra: Segurança e Autenticação',
                    'Acesso à Comunidade de Builders'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 size={20} className="text-indigo-400 flex-shrink-0" />
                      <span className="text-slate-200">{item}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full sm:w-auto px-10 py-5 rounded-full bg-white hover:bg-slate-100 text-black font-bold text-lg tracking-wide transition-all shadow-[0_0_40px_-5px_rgba(255,255,255,0.3)]">
                  GARANTIR PACOTE COMPLETO AGORA
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer / Créditos */}
      <footer className="py-12 px-6 border-t border-white/10 bg-[#050510] text-center relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
          <div className="flex items-center justify-center gap-2 text-slate-400">
            <span>Desenvolvido com</span>
            <Heart className="text-red-500 w-4 h-4 fill-red-500" />
            <span>pela equipe</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full">
            <div className="flex flex-col items-center gap-2">
              <span className="font-bold text-white text-lg">João Layon</span>
              <span className="text-xs text-slate-500">Desenvolvedor Fullstack & CEO</span>
              <a href="https://instagram.com/layon.dev" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1.5 transition-colors mt-1">
                <Instagram size={16} /> @layon.dev
              </a>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <span className="font-bold text-white text-lg">Paulo Davi</span>
              <span className="text-xs text-slate-500">Co-fundador / Parceiro</span>
              <a href="https://instagram.com/davi._link" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1.5 transition-colors mt-1">
                <Instagram size={16} /> @davi._link
              </a>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <span className="font-bold text-white text-lg">Luiz Henrique</span>
              <span className="text-xs text-slate-500">Co-fundador / Parceiro</span>
              <a href="https://instagram.com/web.lz_" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1.5 transition-colors mt-1">
                <Instagram size={16} /> @web.lz_
              </a>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <span className="font-bold text-white border-b-2 border-indigo-500/50 pb-1 text-lg">DS Company</span>
              <span className="text-xs text-slate-500">Agência / Empresa</span>
              <a href="https://instagram.com/dscompany1_" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-1.5 transition-colors mt-1">
                <Instagram size={16} /> @dscompany1_
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/5 w-full text-sm text-slate-600">
            &copy; {new Date().getFullYear()} DS Company. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
