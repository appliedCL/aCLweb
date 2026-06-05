import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowRight, X as CloseIcon } from 'lucide-react';
import { TERMS_TC } from '../data/terms';

const scrollStyles = `
  .custom-scroll {
    scrollbar-gutter: stable;
    scrollbar-width: thin;
    scrollbar-color: #ef7d55 transparent;
  }
  .custom-scroll::-webkit-scrollbar { width: 6px; }
  .custom-scroll::-webkit-scrollbar-track { background: transparent; }
  .custom-scroll::-webkit-scrollbar-thumb { 
    background-color: #ef7d55; 
    border-radius: 20px; 
  }
`;

const Modal = ({ type, onClose }: { type: 'terms' | 'privacy'; onClose: () => void }) => {
  const data = TERMS_TC?.[type];
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-white/95 backdrop-blur-md animate-in fade-in duration-200">
      <style>{scrollStyles}</style>
      <div className="bg-white border border-black/10 w-full max-w-2xl h-[75vh] flex flex-col shadow-2xl rounded-sm overflow-hidden text-black">
        <header className="shrink-0 flex justify-between items-center p-6 border-b border-black/5 bg-gray-50/50">
          <div className="flex flex-col gap-1">
            <span className="text-[#ef7d55] font-bold text-[10px] uppercase tracking-[0.2em]">{data.title}</span>
            <span className="text-[9px] text-muted-foreground uppercase font-mono">{data.subtitle}</span>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }} 
            className="hover:text-[#ef7d55] transition-colors p-2 -mr-2 cursor-pointer"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>
        
        <div className="flex-grow overflow-y-auto p-8 sm:p-12 font-mono text-[12px] leading-relaxed text-slate-700 custom-scroll overscroll-contain">
          <div className="max-w-prose space-y-8">
            {data.sections?.map((section: any) => (
              <div key={section.id} className="group">
                <h4 className="text-black font-bold mb-2 flex items-baseline gap-2">
                  <span className="text-[#ef7d55] text-[10px]">{section.id}.</span>
                  <span className="underline underline-offset-4 decoration-black/10 group-hover:decoration-[#ef7d55] transition-colors">
                    {section.title}
                  </span>
                </h4>
                <p className="opacity-80 leading-loose">{section.content}</p>
              </div>
            ))}
          </div>
        </div>

        <footer className="shrink-0 p-6 border-t border-black/5 bg-gray-50/50 flex justify-end">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }} 
            className="text-[11px] font-bold uppercase border-2 border-black px-10 py-3 hover:bg-[#ef7d55] hover:border-[#ef7d55] hover:text-white transition-all active:scale-95 cursor-pointer"
          >
            Acknowledge
          </button>
        </footer>
      </div>
    </div>
  );
};

const Landing: React.FC = () => {
  const currentDate = "February 12, 2026";
  const [modalContent, setModalContent] = useState<'terms' | 'privacy' | null>(null); 

  const words = ["Active Inference.",
                "Causal Cognition.",
                "Generative World Models.",
                "Predictive Processing.",
                "Free Energy Principle.",
                "Counterfactual Simulation."];
  const researchTopics = [
    "Causal Structure Discovery", "Variational Free Energy", "Synaptic Plasticity Modelling",
    "Manifold Learning", "Neuromorphic Gating", "Active Inference",
    "Topological Data Analysis", "Sparse Coding", "Statistical Learning"
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleType = () => {
      const fullText = words[currentWordIndex];
      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(50);
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(150);
      }
      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    };
    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex]);

  useEffect(() => {
    document.body.style.overflow = modalContent ? 'hidden' : 'unset';
  }, [modalContent]);

  return (
    <div className="h-[100dvh] w-full flex flex-col font-mono bg-background text-foreground overflow-hidden selection:bg-[#ef7d55] selection:text-white tracking-tight">
      <style>{scrollStyles}</style>

      {modalContent && (
        <Modal 
          type={modalContent} 
          onClose={() => setModalContent(null)} 
        />
      )}
      
      <main className="flex-grow w-full overflow-y-auto md:overflow-hidden custom-scroll">
        <div className="max-w-[68rem] mx-auto px-6 sm:px-10 pt-20 pb-24 md:py-24 min-h-full flex flex-col justify-start gap-8">
          
          <header className="w-full">
            <div className="mb-3 flex items-center gap-3"> 
              <img 
                src="/favicon.ico" 
                alt="appliedCL Logo" 
                className="h-[1.4em] w-auto object-contain"
              />
              
              <h2 className="font-display text-[15px] md:text-[15.5px] font-semibold tracking-tight text-[#ef7d55]">
                appliedCL
              </h2>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-2 leading-[1.05] text-black font-display -ml-[2px] md:-ml-1">
              <span>{"Brain Mirroring for "}</span>
              <span className="text-[#ef7d55]">
                {currentText}
                <span className="inline-block w-[2px] h-[0.8em] bg-[#ef7d55] ml-1 align-middle animate-[pulse_1s_infinite]"></span>
              </span>
            </h1>
            <div className="flex items-baseline gap-2 font-mono text-[11px] text-muted-foreground tracking-tight">
              <span>Last Updated</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground/40 translate-y-[1px]" />
              <span>{currentDate}</span>
            </div>
          </header>

          <section className="w-full">
            <hr className="border-border mb-6 w-full opacity-50" />
            <article className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 leading-relaxed text-[15px] md:text-[15.5px] text-black">
              <p>We are rethinking the architecture of artificial intelligence by looking backward at the biological substrate. The current trajectory of ML scaling relies on brute-force compute; we believe the next leap requires a more elegant symmetry between neural topology and algorithmic execution.</p>
              <p>Our collective comprises core contributors to foundational open-source primitives. We are committed to the scientific commons, publishing reproducible research that systematically dismantles the barriers between theoretical science and production-grade inference.</p>
            </article>
          </section>

          <div className="flex flex-col gap-12 pt-4">
            <section className="w-full">
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">Focus Areas</h3>
              <div className="flex flex-wrap items-center gap-2 md:gap-x-3 md:gap-y-4">
                {researchTopics.map((topic, index) => (
                  <React.Fragment key={index}>
                    <span className="px-2 py-1 border border-border text-[10px] md:text-[12px] leading-tight text-black hover:bg-[#ef7d55] hover:text-white transition-colors cursor-default whitespace-normal md:whitespace-nowrap text-center md:text-left">
                      {topic}
                    </span>
                    {index < researchTopics.length - 1 && (
                      <ArrowRight className="hidden md:block w-3 h-3 text-muted-foreground/40" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </section>

            <footer className="w-full pt-8">
              <div className="space-y-6">
                <p className="italic text-muted-foreground font-mono text-[10px] tracking-tight">
                  Technical documentation will be released as we emerge from stealth.
                </p>
                
                <div className="flex flex-row flex-wrap items-baseline gap-x-6 gap-y-4 pt-1"> 
                  <a href="mailto:hello@appliedCL.com" className="group inline-flex items-baseline gap-1">
                    <span className="font-mono text-[10px] uppercase border-b border-foreground/20 group-hover:border-[#ef7d55] group-hover:text-[#ef7d55] pb-0.5 leading-none transition-colors tracking-wider">hello@appliedCL.com</span>
                    <ArrowUpRight className="w-2.5 h-2.5 translate-y-[1px] text-black group-hover:text-[#ef7d55] transition-all" />
                  </a>

                  <a href="https://github.com/appliedCL" target="_blank" rel="noopener noreferrer" className="group">
                    <span className="font-mono text-[10px] uppercase border-b border-foreground/20 group-hover:border-[#ef7d55] group-hover:text-[#ef7d55] pb-0.5 transition-colors">GitHub</span>
                  </a>
                  <a href="https://x.com/appliedCL" target="_blank" rel="noopener noreferrer" className="group">
                    <span className="font-mono text-[10px] uppercase border-b border-foreground/20 group-hover:border-[#ef7d55] group-hover:text-[#ef7d55] pb-0.5 transition-colors">X</span>
                  </a>

                  <button onClick={() => setModalContent('terms')} className="group outline-none bg-transparent border-none p-0 cursor-pointer">
                    <span className="font-mono text-[10px] uppercase border-b border-foreground/20 group-hover:border-[#ef7d55] group-hover:text-[#ef7d55] pb-0.5 transition-colors">Terms</span>
                  </button>
                  <button onClick={() => setModalContent('privacy')} className="group outline-none bg-transparent border-none p-0 cursor-pointer">
                    <span className="font-mono text-[10px] uppercase border-b border-foreground/20 group-hover:border-[#ef7d55] group-hover:text-[#ef7d55] pb-0.5 transition-colors">Privacy</span>
                  </button>
                </div>
              </div>
            </footer>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Landing;