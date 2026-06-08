import { useState, useEffect } from 'react';
import {
  Plane,
  MapPin,
  Droplets,
  Sprout,
  ThermometerSun,
  CloudRain,
  Users,
  Lightbulb,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';
import DroneGame from './components/DroneGame';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '#informacoes', label: 'Informações' },
    { href: '#curiosidades', label: 'Curiosidades' },
    { href: '#jogo', label: 'Jogo' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-field-800/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-white font-bold text-lg">
          <Sprout className="w-6 h-6" />
          <span className="hidden sm:inline">IA no Campo</span>
        </a>

        <button
          className="text-white sm:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <ul
          className={`${
            menuOpen ? 'flex' : 'hidden'
          } sm:flex flex-col sm:flex-row gap-2 sm:gap-6 absolute sm:relative top-full sm:top-auto left-0 right-0 bg-field-800/95 sm:bg-transparent px-4 py-4 sm:py-0 backdrop-blur-md sm:backdrop-blur-none`}
        >
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-white/90 hover:text-harvest-300 transition-colors font-medium py-2 block"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #14532d 0%, #166534 30%, #15803d 60%, #22c55e 100%)',
        }}
      />
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 80%, #fde047 0%, transparent 40%), radial-gradient(circle at 80% 20%, #facc15 0%, transparent 40%)',
          }}
        />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-harvest-300 text-sm font-medium">
          <Plane className="w-4 h-4" />
          Tecnologia e Agricultura
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
          Inteligência Artificial{' '}
          <span className="text-harvest-300">no Campo</span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-field-200 mb-8 max-w-2xl mx-auto leading-relaxed">
          Como drones, GPS e tecnologia estão transformando a agricultura
        </p>

        <a
          href="#informacoes"
          className="inline-flex items-center gap-2 bg-harvest-400 hover:bg-harvest-500 text-earth-900 font-bold py-3 px-8 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        >
          Explorar
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-field-50 to-transparent" />
    </section>
  );
}

function InfoSection() {
  const cards = [
    {
      icon: <Plane className="w-8 h-8" />,
      title: 'Inteligência Artificial na Agricultura',
      text: 'A inteligência artificial (IA) está revolucionando a forma como produzimos alimentos. Sistemas de IA analisam dados do solo, clima e plantações para ajudar os agricultores a tomar decisões mais inteligentes e precisas, reduzindo custos e aumentando a produtividade.',
      color: 'field',
    },
    {
      icon: <Plane className="w-8 h-8" />,
      title: 'Drones Monitorando Plantações',
      text: 'Drones equipados com câmeras e sensores sobrevoam as plantações, capturando imagens detalhadas que permitem identificar pragas, doenças e áreas que precisam de irrigação. Com essa tecnologia, o agricultor pode agir rapidamente antes que o problema se espalhe.',
      color: 'harvest',
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'GPS no Plantio e Colheita',
      text: 'Máquinas agrícolas equipadas com GPS plantam e colhem com precisão milimétrica, evitando sobreposição de áreas e desperdício de sementes e fertilizantes. O GPS permite que tratores e colheitadeiras trabalhem de forma autônoma, mesmo à noite ou com baixa visibilidade.',
      color: 'earth',
    },
  ];

  const benefits = [
    { icon: <Droplets className="w-6 h-6" />, label: 'Economia de água' },
    { icon: <Sprout className="w-6 h-6" />, label: 'Menos desperdícios' },
    { icon: <ThermometerSun className="w-6 h-6" />, label: 'Mais produtividade' },
    { icon: <CloudRain className="w-6 h-6" />, label: 'Agricultura sustentável' },
  ];

  const challenges = [
    { icon: <CloudRain className="w-6 h-6" />, label: 'Mudanças climáticas' },
    { icon: <ThermometerSun className="w-6 h-6" />, label: 'Secas e enchentes' },
    { icon: <Users className="w-6 h-6" />, label: 'População crescente' },
  ];

  const colorMap: Record<string, { bg: string; iconBg: string; border: string }> = {
    field: { bg: 'bg-field-50', iconBg: 'bg-field-600 text-white', border: 'border-field-200' },
    harvest: { bg: 'bg-harvest-50', iconBg: 'bg-harvest-500 text-earth-900', border: 'border-harvest-200' },
    earth: { bg: 'bg-earth-50', iconBg: 'bg-earth-600 text-white', border: 'border-earth-200' },
  };

  return (
    <section id="informacoes" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-field-800 mb-3">
            Como a Tecnologia Transforma o Campo
          </h2>
          <p className="text-earth-500 text-lg max-w-2xl mx-auto">
            Descubra como a inteligência artificial, drones e GPS estão revolucionando a agricultura brasileira e mundial
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {cards.map((card, i) => {
            const c = colorMap[card.color];
            return (
              <article
                key={i}
                className={`${c.bg} border ${c.border} rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
              >
                <div className={`${c.iconBg} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}>
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-field-800 mb-3">{card.title}</h3>
                <p className="text-earth-600 leading-relaxed">{card.text}</p>
              </article>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-field-800 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Sprout className="w-6 h-6 text-harvest-300" />
              Benefícios
            </h3>
            <ul className="space-y-4">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="bg-harvest-400 text-earth-900 w-10 h-10 rounded-lg flex items-center justify-center">
                    {b.icon}
                  </span>
                  <span className="font-medium text-field-100">{b.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-earth-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <ThermometerSun className="w-6 h-6 text-harvest-300" />
              Desafios
            </h3>
            <ul className="space-y-4">
              {challenges.map((c, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="bg-earth-500 w-10 h-10 rounded-lg flex items-center justify-center">
                    {c.icon}
                  </span>
                  <span className="font-medium text-earth-100">{c.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function CuriosidadesSection() {
  const facts = [
    {
      emoji: '🚁',
      title: 'Drones detectam sede nas plantas',
      text: 'Drones equipados com câmeras multiespectrais conseguem identificar áreas da plantação que precisam de irrigação antes mesmo que o agricultor perceba visualmente.',
    },
    {
      emoji: '🌿',
      title: 'Sensores monitoram a saúde das plantas',
      text: 'Sensores instalados no solo e nas plantas enviam dados em tempo real sobre nutrientes, umidade e condições de saúde, permitindo intervenções rápidas e precisas.',
    },
    {
      emoji: '🛰️',
      title: 'GPS para plantio milimétrico',
      text: 'Máquinas modernas com GPS de alta precisão podem plantar sementes com margem de erro de apenas 2 centímetros, garantindo distribuição uniforme e máxima eficiência.',
    },
  ];

  return (
    <section id="curiosidades" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-harvest-100 rounded-full px-4 py-2 mb-4 text-harvest-700 text-sm font-semibold">
            <Lightbulb className="w-4 h-4" />
            Você sabia?
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-field-800 mb-3">
            Curiosidades
          </h2>
          <p className="text-earth-500 text-lg">
            Fatos incríveis sobre tecnologia no campo
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {facts.map((fact, i) => (
            <article
              key={i}
              className="group bg-field-50 hover:bg-field-100 border border-field-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{fact.emoji}</div>
              <h3 className="text-xl font-bold text-field-800 mb-3 group-hover:text-field-700 transition-colors">
                {fact.title}
              </h3>
              <p className="text-earth-600 leading-relaxed">{fact.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-field-900 text-field-200 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sprout className="w-6 h-6 text-harvest-400" />
          <span className="text-xl font-bold text-white">IA no Campo</span>
        </div>
        <p className="text-field-300 leading-relaxed max-w-xl mx-auto mb-8">
          A tecnologia no campo ajuda agricultores a produzir alimentos de forma mais eficiente e sustentável, contribuindo para o futuro da agricultura.
        </p>
        <div className="h-px bg-field-700 mb-6" />
        <p className="text-field-500 text-sm">
          Projeto educativo sobre tecnologia na agricultura
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <InfoSection />
        <CuriosidadesSection />
        <DroneGame />
      </main>
      <Footer />
    </div>
  );
}
