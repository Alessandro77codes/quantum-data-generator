import React, { useState, useEffect } from 'react';

function App() {
  const [generatedData, setGeneratedData] = useState(null);
  const [highlightedValue, setHighlightedValue] = useState('Clique em gerar para iniciar');
  const [highlightType, setHighlightType] = useState('Emails');
  const [highlightIcon, setHighlightIcon] = useState('📧');

  // Algoritmos reais de validação para QA
  const generateCPF = () => {
    const numAleatorio = () => Math.floor(Math.random() * 9);
    const n = Array.from({ length: 9 }, numAleatorio);
    let d1 = n.reduce((acc, curr, idx) => acc + curr * (10 - idx), 0);
    d1 = 11 - (d1 % 11); if (d1 >= 10) d1 = 0;
    let d2 = [...n, d1].reduce((acc, curr, idx) => acc + curr * (11 - idx), 0);
    d2 = 11 - (d2 % 11); if (d2 >= 10) d2 = 0;
    return `${n.join('')}${d1}${d2}`.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const generateCNPJ = () => {
    const rnd = () => Math.floor(Math.random() * 9);
    const n = Array.from({ length: 12 }, (_, i) => i >= 8 ? [0,0,0,1][i-8] : rnd());
    const calc = (v, m) => {
      let sum = v.reduce((acc, curr, idx) => acc + curr * m[idx], 0);
      let rest = sum % 11;
      return rest < 2 ? 0 : 11 - rest;
    };
    const m1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const d1 = calc(n, m1);
    const m2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const d2 = calc([...n, d1], m2);
    return `${n.join('')}${d1}${d2}`.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  };

  // Sementes aleatórias
  const primeirosNomes = ["Alessandro", "Ana", "Carlos", "Bruno", "Mariana", "Diego", "Fernanda", "Rodrigo", "Juliana", "Gabriel"];
  const sobrenomes = ["Silva", "Santos", "Souza", "Lima", "Costa", "Oliveira", "Ribeiro", "Carvalho", "Pereira"];
  const dominiosEmail = ["@quantum.dev", "@testenv.com", "@qa.com", "@sandbox.io"];
  const cidades = ["Salvador (BA)", "São Paulo (SP)", "Rio de Janeiro (RJ)", "Belo Horizonte (MG)", "Curitiba (PR)"];
  const ruas = ["Av. Sete de Setembro", "Alameda das Espatódeas", "Av. Paulista", "Rua das Flores", "Av. Oceanica"];

  const getRandomEmail = (nome, sob) => {
    const num = Math.floor(100 + Math.random() * 900);
    return `${nome.toLowerCase()}.${sob.toLowerCase()}${num}${dominiosEmail[Math.floor(Math.random() * dominiosEmail.length)]}`;
  };

  const getRandomEndereco = () => {
    return `${ruas[Math.floor(Math.random() * ruas.length)]}, ${Math.floor(10 + Math.random() * 990)} - ${cidades[Math.floor(Math.random() * cidades.length)]}`;
  };

  const getRandomTelefone = () => {
    return `(71) 9${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
  };

  const getRandomCartao = () => {
    return `4097 ${Math.floor(1000 + Math.random() * 9999)} ${Math.floor(1000 + Math.random() * 9999)} ${Math.floor(1000 + Math.random() * 9999)}`;
  };

  const handleGenerateAll = () => {
    const nome = primeirosNomes[Math.floor(Math.random() * primeirosNomes.length)];
    const sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
    const email = getRandomEmail(nome, sobrenome);
    
    const novoPayload = {
      usuario: { nome: `${nome} ${sobrenome}`, email, telefone: getRandomTelefone(), status: "Active" },
      documentos: { cpf: generateCPF(), cnpj: generateCNPJ() },
      localizacao: { cep: `${Math.floor(40000 + Math.random() * 90000)}-${Math.floor(100 + Math.random() * 899)}`, endereco: getRandomEndereco() },
      financeiro: { cartao: getRandomCartao(), cvv: Math.floor(100 + Math.random() * 899) },
      metadata: { ambiente: "QA_PROD_SIMULATION", timestamp: new Date().toISOString() }
    };

    setGeneratedData(novoPayload);
    setHighlightedValue(email);
    setHighlightType('Emails');
    setHighlightIcon('📧');
  };

  useEffect(() => {
    handleGenerateAll();
  }, []);

  const updateSingleField = (fieldKey, typeName, icon, generateFn) => {
    if (!generatedData) return;
    const newValue = generateFn();
    const updatedPayload = { ...generatedData };
    if (fieldKey === 'email') updatedPayload.usuario.email = newValue;
    if (fieldKey === 'cpf') updatedPayload.documentos.cpf = newValue;
    if (fieldKey === 'endereco') updatedPayload.localizacao.endereco = newValue;
    if (fieldKey === 'telefone') updatedPayload.usuario.telefone = newValue;
    if (fieldKey === 'cartao') updatedPayload.financeiro.cartao = newValue;

    setGeneratedData(updatedPayload);
    setHighlightedValue(newValue);
    setHighlightType(typeName);
    setHighlightIcon(icon);
  };

  const copyToClipboard = (text, message) => {
    navigator.clipboard.writeText(text);
    alert(message || "Copiado com sucesso! 📋");
  };

  return (
    <div className="min-h-screen bg-[#070A13] text-txtPrimary flex font-sans select-none">
      
      {/* ================= SIDEBAR LATERAL ================= */}
      <aside className="w-64 bg-[#0B0F19] border-r border-gray-900 p-5 flex flex-col justify-between shrink-0 hidden md:flex">
        <div className="space-y-6">
          <div className="flex items-center gap-3 py-2 px-1">
            <div className="bg-gradient-to-tr from-blue-600 to-green-400 p-2 rounded-xl text-white font-black text-xl shadow-[0_0_15px_rgba(0,255,102,0.15)]">⚡</div>
            <div>
              <h1 className="text-sm font-black tracking-wider uppercase text-white">Quantum</h1>
              <p className="text-[10px] text-neon font-bold font-mono tracking-widest">DATA GENERATOR</p>
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center gap-3 shadow-lg shadow-blue-600/20 cursor-pointer">
            <span>🏠</span> Dashboard
          </button>

          <div className="space-y-2">
            <p className="text-[10px] font-bold text-gray-500 tracking-wider uppercase px-2">Geradores</p>
            <nav className="flex flex-col gap-1 text-xs text-txtSecondary font-medium">
              <button className="flex items-center gap-3 py-2.5 px-3 rounded-lg bg-gray-800/30 text-white border-l-2 border-green-400 text-left cursor-pointer"><span>📧</span> Emails</button>
              <button className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-gray-800/20 text-left cursor-pointer"><span>🪪</span> CPF / CNPJ</button>
              <button className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-gray-800/20 text-left cursor-pointer"><span>📍</span> Endereços</button>
              <button className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-gray-800/20 text-left cursor-pointer"><span>📞</span> Telefones</button>
              <button className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-gray-800/20 text-left cursor-pointer"><span>💳</span> Cartões de Crédito</button>
              <button className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-gray-800/20 text-left cursor-pointer"><span>📝</span> Textos Mock</button>
              <button className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-gray-800/20 text-left cursor-pointer"><span>{}</span> Dados JSON</button>
              <button className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-gray-800/20 text-left cursor-pointer"><span>🔗</span> API Pública</button>
            </nav>
          </div>
        </div>

        <div className="bg-[#111625] border border-green-500/10 p-4 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-neon text-xs font-bold"><span>🛡️</span> 100% FICTÍCIO</div>
          <p className="text-[10px] text-txtSecondary leading-relaxed">Todos os dados gerados são fictícios e destinados exclusivamente para testes.</p>
        </div>
      </aside>

      {/* ================= PAINEL CONTEÚDO PRINCIPAL ================= */}
      <div className="flex-grow flex flex-col min-w-0">
        
        {/* TOPBAR */}
        <header className="bg-[#0B0F19]/40 backdrop-blur-md border-b border-gray-950 p-4 flex justify-between items-center px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-mono text-gray-400">API Status: <strong className="text-green-400 font-medium">Online</strong></span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-lg cursor-pointer">🌙</span>
            <span className="text-xs bg-green-500/10 border border-green-500/30 text-neon px-3 py-1 rounded-lg font-mono font-bold">QA</span>
          </div>
        </header>

        <main className="p-8 max-w-6xl w-full mx-auto space-y-6 flex-grow flex flex-col justify-start overflow-y-auto">
          
          {/* BANNER + NOVO DESIGN DO VELOCÍMETRO */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
            <div className="lg:col-span-2 bg-gradient-to-r from-[#0B0F19] to-[#141C31] border border-blue-500/20 p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-blue-500/5">
              <div className="space-y-3 relative z-10">
                <h2 className="text-4xl font-black tracking-tight text-white">Quantum <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Data Generator</span></h2>
                <p className="text-txtSecondary text-xs max-w-xl leading-relaxed">Gere dados fictícios instantaneamente para <strong>QA, testes</strong> e <strong>desenvolvimento</strong> de software.</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="flex items-center gap-2"><span className="text-blue-500 text-sm">🚀</span><div><p className="text-[10px] font-bold text-white leading-none">Rápido</p><p className="text-[8px] text-gray-500">Geração em segundos</p></div></div>
                  <div className="flex items-center gap-2"><span className="text-blue-500 text-sm">🛡️</span><div><p className="text-[10px] font-bold text-white leading-none">Seguro</p><p className="text-[8px] text-gray-500">Dados 100% fictícios</p></div></div>
                  <div className="flex items-center gap-2"><span className="text-blue-500 text-sm">🧠</span><div><p className="text-[10px] font-bold text-white leading-none">Inteligente</p><p className="text-[8px] text-gray-500">Validações integradas</p></div></div>
                  <div className="flex items-center gap-2"><span className="text-blue-500 text-sm">📦</span><div><p className="text-[10px] font-bold text-white leading-none">Completo</p><p className="text-[8px] text-gray-500">Diversos tipos de dados</p></div></div>
                </div>
              </div>

              <div className="flex gap-3 pt-5 relative z-10">
                <button onClick={handleGenerateAll} className="bg-green-500 hover:bg-green-400 text-gray-950 font-black text-xs px-6 py-3 rounded-xl transition-all cursor-pointer shadow-lg flex items-center gap-2">⚡ Gerar Dados</button>
                <button className="bg-transparent hover:bg-blue-600/10 text-blue-400 border border-blue-500/30 font-bold text-xs px-6 py-3 rounded-xl transition-all cursor-pointer">📖 Documentação da API</button>
              </div>
            </div>

            {/* CARD DO VELOCÍMETRO PREMIUM (PRODUTO IDÊNTICO) */}
            <div className="bg-[#0B0F19] border border-blue-500/20 rounded-2xl flex flex-col justify-end shadow-xl shadow-blue-500/5 relative overflow-hidden h-60 lg:h-auto min-h-[220px]">
              
              {/* Arte Gráfica de Circuito e Arco do Velocímetro via SVG */}
              <div className="absolute inset-0 w-full h-full opacity-80 flex items-center justify-center pointer-events-none">
                <svg viewBox="0 0 200 200" className="w-full h-full transform translate-y-4 translate-x-4 scale-125">
                  <defs>
                    <linearGradient id="blueGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1e40af" stopOpacity="0.2"/>
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8"/>
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Linhas de circuito ao fundo */}
                  <path d="M 10,120 L 50,120 L 70,140 M 190,120 L 150,120 L 130,140" stroke="#1e3a8a" strokeWidth="0.5" fill="none" opacity="0.4" />
                  <path d="M 30,150 L 60,150 L 80,170" stroke="#1e3a8a" strokeWidth="0.5" fill="none" opacity="0.3" />
                  
                  {/* Arco Externo do Velocímetro */}
                  <path 
                    d="M 30,130 A 75,75 0 1,1 170,130" 
                    stroke="url(#blueGlow)" 
                    strokeWidth="4" 
                    fill="none" 
                    strokeLinecap="round"
                    filter="url(#glow)"
                  />
                  
                  {/* Linha Fina de Graduação Interna */}
                  <path 
                    d="M 42,130 A 62,62 0 1,1 158,130" 
                    stroke="#1d4ed8" 
                    strokeWidth="1" 
                    strokeDasharray="2,3"
                    fill="none" 
                    opacity="0.6"
                  />
                  
                  {/* Ponteiro Verde Foguete */}
                  <line 
                    x1="100" y1="130" 
                    x2="150" y2="85" 
                    stroke="#00ff66" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                    filter="url(#glow)"
                  />
                  {/* Centro do Ponteiro */}
                  <circle cx="100" cy="130" r="5" fill="#00ff66" />
                </svg>
              </div>

              {/* Textos de Informação em Cima do SVG */}
              <div className="relative z-10 p-6 text-right space-y-1">
                <span className="text-[10px] uppercase font-black tracking-widest text-white block opacity-90">QUANTUM SPEED</span>
                <div className="text-4xl font-black font-mono text-neon tracking-tight drop-shadow-[0_0_12px_rgba(0,255,102,0.4)]">
                  0.003s
                </div>
                <p className="text-[10px] text-green-400 font-bold tracking-wide">
                  Dados gerados com sucesso!
                </p>
              </div>
            </div>
          </div>

          {/* BARRA AZUL DE AVISO */}
          <div className="w-full bg-[#0B0F19] border border-blue-500/10 px-5 py-3 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-2 shadow-md">
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <span className="text-blue-500 font-bold">ⓘ</span>
              <span>Ideal para <strong className="text-green-400 font-medium">testes de cadastro</strong>, validação de formulários, testes automatizados, simulações e homologações.</span>
            </div>
            <span className="text-[9px] bg-green-500/10 text-neon border border-green-500/20 font-black px-3 py-1 rounded-md uppercase tracking-wider">Nenhum dado real é utilizado</span>
          </div>

          {/* DISPLAY CONSOLE */}
          <div className="bg-[#0B0F19] border border-blue-500/20 p-5 rounded-2xl shadow-xl shadow-blue-500/5 space-y-3 w-full">
            <div className="flex gap-2 items-center">
              <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1">{highlightIcon} {highlightType}</span>
              <span className="text-[10px] bg-green-500/10 text-neon border border-green-500/20 font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">✔ Ativo</span>
            </div>
            <div className="bg-[#070A13] border border-green-500/20 p-4 rounded-xl flex justify-between items-center group">
              <div className="flex items-center gap-3 font-mono text-base sm:text-lg font-black text-green-400 overflow-x-auto whitespace-nowrap style-scrollbar pr-4">
                <span className="text-gray-600 select-none">&gt;_</span>
                <span>{highlightedValue}</span>
              </div>
              <button onClick={() => copyToClipboard(highlightedValue, "Copiado!")} className="px-4 py-2 bg-gray-900/60 hover:bg-green-500 text-gray-400 hover:text-gray-950 rounded-lg border border-gray-800 text-xs font-bold cursor-pointer shrink-0">Copiar</button>
            </div>
          </div>

          {/* GRADE DE CARDS COM GLOW */}
          {generatedData && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
              
              {/* Card 1: Emails */}
              <div 
                onClick={() => { setHighlightedValue(generatedData.usuario.email); setHighlightType('Emails'); setHighlightIcon('📧'); }} 
                className={`bg-[#0d1425] p-5 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between h-48 border border-blue-500/20 shadow-md ${
                  highlightType === 'Emails' ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] scale-[1.01]' : 'hover:border-blue-500/40 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-xs">📧</div>
                  <div><h4 className="text-xs font-bold text-white">Emails</h4><p className="text-[9px] text-gray-500">Gere emails fictícios válidos.</p></div>
                </div>
                <div className="flex gap-2 pt-4">
                  <button onClick={(e) => { e.stopPropagation(); updateSingleField('email', 'Emails', '📧', () => getRandomEmail('user', 'test')); }} className="flex-grow bg-green-500 hover:bg-green-400 text-gray-950 font-black text-[11px] py-2.5 rounded-xl cursor-pointer transition-colors">Gerar</button>
                  <button onClick={(e) => { e.stopPropagation(); copyToClipboard(generatedData.usuario.email); }} className="bg-transparent hover:bg-gray-800 p-2.5 rounded-xl border border-gray-800 text-xs cursor-pointer text-gray-400">📋</button>
                </div>
              </div>

              {/* Card 2: CPF / CNPJ */}
              <div 
                onClick={() => { setHighlightedValue(generatedData.documentos.cpf); setHighlightType('CPF / CNPJ'); setHighlightIcon('🪪'); }} 
                className={`bg-[#0d1425] p-5 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between h-48 border border-blue-500/20 shadow-md ${
                  highlightType === 'CPF / CNPJ' ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] scale-[1.01]' : 'hover:border-blue-500/40 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-xs">🪪</div>
                  <div><h4 className="text-xs font-bold text-white">CPF / CNPJ</h4><p className="text-[9px] text-gray-500">Gere CPFs e CNPJs válidos.</p></div>
                </div>
                <div className="flex gap-2 pt-4">
                  <button onClick={(e) => { e.stopPropagation(); updateSingleField('cpf', 'CPF / CNPJ', '🪪', generateCPF); }} className="flex-grow bg-green-500 hover:bg-green-400 text-gray-950 font-black text-[11px] py-2.5 rounded-xl cursor-pointer transition-colors">Gerar</button>
                  <button onClick={(e) => { e.stopPropagation(); copyToClipboard(generatedData.documentos.cpf); }} className="bg-transparent hover:bg-gray-800 p-2.5 rounded-xl border border-gray-800 text-xs cursor-pointer text-gray-400">📋</button>
                </div>
              </div>

              {/* Card 3: Endereços */}
              <div 
                onClick={() => { setHighlightedValue(generatedData.localizacao.endereco); setHighlightType('Endereços'); setHighlightIcon('📍'); }} 
                className={`bg-[#0d1425] p-5 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between h-48 border border-blue-500/20 shadow-md ${
                  highlightType === 'Endereços' ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] scale-[1.01]' : 'hover:border-blue-500/40 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-xs">📍</div>
                  <div><h4 className="text-xs font-bold text-white">Endereços</h4><p className="text-[9px] text-gray-500">Endereços completos com CEP.</p></div>
                </div>
                <div className="flex gap-2 pt-4">
                  <button onClick={(e) => { e.stopPropagation(); updateSingleField('endereco', 'Endereços', '📍', getRandomEndereco); }} className="flex-grow bg-green-500 hover:bg-green-400 text-gray-950 font-black text-[11px] py-2.5 rounded-xl cursor-pointer transition-colors">Gerar</button>
                  <button onClick={(e) => { e.stopPropagation(); copyToClipboard(generatedData.localizacao.endereco); }} className="bg-transparent hover:bg-gray-800 p-2.5 rounded-xl border border-gray-800 text-xs cursor-pointer text-gray-400">📋</button>
                </div>
              </div>

              {/* Card 4: Telefones */}
              <div 
                onClick={() => { setHighlightedValue(generatedData.usuario.telefone); setHighlightType('Telefones'); setHighlightIcon('📞'); }} 
                className={`bg-[#0d1425] p-5 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between h-48 border border-blue-500/20 shadow-md ${
                  highlightType === 'Telefones' ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] scale-[1.01]' : 'hover:border-blue-500/40 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-xs">📞</div>
                  <div><h4 className="text-xs font-bold text-white">Telefones</h4><p className="text-[9px] text-gray-500">Números de celular e fixo.</p></div>
                </div>
                <div className="flex gap-2 pt-4">
                  <button onClick={(e) => { e.stopPropagation(); updateSingleField('telefone', 'Telefones', '📞', getRandomTelefone); }} className="flex-grow bg-green-500 hover:bg-green-400 text-gray-950 font-black text-[11px] py-2.5 rounded-xl cursor-pointer transition-colors">Gerar</button>
                  <button onClick={(e) => { e.stopPropagation(); copyToClipboard(generatedData.usuario.telefone); }} className="bg-transparent hover:bg-gray-800 p-2.5 rounded-xl border border-gray-800 text-xs cursor-pointer text-gray-400">📋</button>
                </div>
              </div>

              {/* Card 5: Cartões de Crédito */}
              <div 
                onClick={() => { setHighlightedValue(generatedData.financeiro.cartao); setHighlightType('Cartões de Crédito'); setHighlightIcon('💳'); }} 
                className={`bg-[#0d1425] p-5 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between h-48 border border-blue-500/20 shadow-md ${
                  highlightType === 'Cartões de Crédito' ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] scale-[1.01]' : 'hover:border-blue-500/40 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-xs">💳</div>
                  <div><h4 className="text-xs font-bold text-white">Cartões de Crédito</h4><p className="text-[9px] text-gray-500">Cartões para teste e simulação.</p></div>
                </div>
                <div className="flex gap-2 pt-4">
                  <button onClick={(e) => { e.stopPropagation(); updateSingleField('cartao', 'Cartões de Crédito', '💳', getRandomCartao); }} className="flex-grow bg-green-500 hover:bg-green-400 text-gray-950 font-black text-[11px] py-2.5 rounded-xl cursor-pointer transition-colors">Gerar</button>
                  <button onClick={(e) => { e.stopPropagation(); copyToClipboard(generatedData.financeiro.cartao); }} className="bg-transparent hover:bg-gray-800 p-2.5 rounded-xl border border-gray-800 text-xs cursor-pointer text-gray-400">📋</button>
                </div>
              </div>

              {/* Card 6: Textos Mock */}
              <div 
                onClick={() => { setHighlightedValue('Lorem ipsum dolor sit amet advanced qa tools...'); setHighlightType('Textos Mock'); setHighlightIcon('📝'); }} 
                className={`bg-[#0d1425] p-5 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between h-48 border border-blue-500/20 shadow-md ${
                  highlightType === 'Textos Mock' ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] scale-[1.01]' : 'hover:border-blue-500/40 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-xs">📝</div>
                  <div><h4 className="text-xs font-bold text-white">Textos Mock</h4><p className="text-[9px] text-gray-500">Lorem ipsum e textos customizáveis.</p></div>
                </div>
                <div className="flex gap-2 pt-4">
                  <button onClick={(e) => { e.stopPropagation(); setHighlightedValue('Massa Lorem Ipsum atualizada para validação.'); }} className="flex-grow bg-green-500 hover:bg-green-400 text-gray-950 font-black text-[11px] py-2.5 rounded-xl cursor-pointer transition-colors">Gerar</button>
                  <button className="bg-transparent hover:bg-gray-800 p-2.5 rounded-xl border border-gray-800 text-xs cursor-pointer text-gray-400">📋</button>
                </div>
              </div>

              {/* Card 7: Dados JSON */}
              <div 
                onClick={() => { setHighlightedValue(JSON.stringify(generatedData.usuario)); setHighlightType('Dados JSON'); setHighlightIcon('{}'); }} 
                className={`bg-[#0d1425] p-5 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between h-48 border border-blue-500/20 shadow-md ${
                  highlightType === 'Dados JSON' ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] scale-[1.01]' : 'hover:border-blue-500/40 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-xs">{"{}"}</div>
                  <div><h4 className="text-xs font-bold text-white">Dados JSON</h4><p className="text-[9px] text-gray-500">Gere conjuntos no formato JSON.</p></div>
                </div>
                <div className="flex gap-2 pt-4">
                  <button className="flex-grow bg-green-500 hover:bg-green-400 text-gray-950 font-black text-[11px] py-2.5 rounded-xl cursor-pointer transition-colors">Gerar</button>
                  <button className="bg-transparent hover:bg-gray-800 p-2.5 rounded-xl border border-gray-800 text-xs cursor-pointer text-gray-400">📋</button>
                </div>
              </div>

              {/* Card 8: API Pública */}
              <div 
                onClick={() => { setHighlightedValue('https://api.quantumdata.dev/v1/mock'); setHighlightType('API Pública'); setHighlightIcon('🔗'); }} 
                className={`bg-[#0d1425] p-5 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between h-48 border border-blue-500/20 shadow-md ${
                  highlightType === 'API Pública' ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] scale-[1.01]' : 'hover:border-blue-500/40 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-xs">🔗</div>
                  <div><h4 className="text-xs font-bold text-white">API Pública</h4><p className="text-[9px] text-gray-500">Consuma nossa API de testes.</p></div>
                </div>
                <div className="flex gap-2 pt-4">
                  <button className="flex-grow bg-blue-700 hover:bg-blue-600 text-white font-black text-[11px] py-2.5 rounded-xl cursor-pointer transition-colors">Ver Endpoints</button>
                  <button className="bg-transparent hover:bg-gray-800 p-2.5 rounded-xl border border-gray-800 text-xs cursor-pointer text-gray-400">🔗</button>
                </div>
              </div>

            </div>
          )}

          {/* RODAPÉ GRID */}
          <div className="w-full border-t border-gray-900 pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 text-left">
            <div className="space-y-1"><p className="text-xs font-bold text-white flex items-center gap-1.5"><span className="text-green-400">🚀</span> Acelere seus testes</p><p className="text-[9px] text-gray-500 leading-normal">Gere milhares de dados em segundos e ganhe tempo nos seus testes.</p></div>
            <div className="space-y-1"><p className="text-xs font-bold text-white flex items-center gap-1.5"><span className="text-green-400">🛡️</span> Segurança garantida</p><p className="text-[9px] text-gray-500 leading-normal">Nenhum dado real é utilizado. Todos são 100% fictícios.</p></div>
            <div className="space-y-1"><p className="text-xs font-bold text-white flex items-center gap-1.5"><span className="text-green-400">&lt;/&gt;</span> API para automação</p><p className="text-[9px] text-gray-500 leading-normal">Integre facilmente com sua stack e automatize a geração de dados.</p></div>
            <div className="space-y-1"><p className="text-xs font-bold text-white flex items-center gap-1.5"><span className="text-green-400">📋</span> Copie com um clique</p><p className="text-[9px] text-gray-500 leading-normal">Resultados prontos para uso. Copie e utilize onde precisar.</p></div>
            <div className="space-y-1"><p className="text-xs font-bold text-white flex items-center gap-1.5"><span className="text-green-400">👥</span> Para Devs e QAs</p><p className="text-[9px] text-gray-500 leading-normal">Feito para desenvolvedores e analistas QA que prezam por qualidade.</p></div>
          </div>

        </main>
      </div>

    </div>
  );
}

export default App;