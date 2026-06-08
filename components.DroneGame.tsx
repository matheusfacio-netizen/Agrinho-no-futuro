import { useState, useCallback, useRef, useEffect } from 'react';

interface Food {
  id: number;
  type: string;
  emoji: string;
  x: number;
  y: number;
  collected: boolean;
}

interface ScorePopup {
  id: number;
  x: number;
  y: number;
}

const FOOD_TYPES = [
  { type: 'cenoura', emoji: '🥕' },
  { type: 'tomate', emoji: '🍅' },
  { type: 'abobora', emoji: '🎃' },
  { type: 'milho', emoji: '🌽' },
  { type: 'uva', emoji: '🍇' },
  { type: 'maca', emoji: '🍎' },
];

const DRONE_SIZE = 48;
const FOOD_SIZE = 40;

function randomPosition(maxX: number, maxY: number) {
  return {
    x: Math.random() * (maxX - FOOD_SIZE - 20) + 10,
    y: Math.random() * (maxY - FOOD_SIZE - 80) + 70,
  };
}

export default function DroneGame() {
  const [score, setScore] = useState(0);
  const [dronePos, setDronePos] = useState({ x: 50, y: 50 });
  const [foods, setFoods] = useState<<Food[]>([]);
  const [popups, setPopups] = useState<<ScorePopup[]>([]);
  const [isMoving, setIsMoving] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);

  const spawnFood = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pos = randomPosition(rect.width, rect.height);
    const foodType = FOOD_TYPES[Math.floor(Math.random() * FOOD_TYPES.length)];
    const newFood: Food = {
      id: nextId.current++,
      type: foodType.type,
      emoji: foodType.emoji,
      x: pos.x,
      y: pos.y,
      collected: false,
    };
    setFoods(prev => [...prev.filter(f => !f.collected), newFood]);
  }, []);

  const startGame = useCallback(() => {
    setGameStarted(true);
    setScore(0);
    setFoods([]);
    nextId.current = 1;
    setTimeout(() => spawnFood(), 300);
  }, [spawnFood]);

  const handleFoodClick = useCallback((food: Food, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!gameStarted) return;

    setIsMoving(true);
    setDronePos({
      x: food.x - (DRONE_SIZE - FOOD_SIZE) / 2,
      y: food.y - (DRONE_SIZE - FOOD_SIZE) / 2,
    });

    setTimeout(() => {
      setFoods(prev =>
        prev.map(f => (f.id === food.id ? { ...f, collected: true } : f))
      );
      setScore(prev => prev + 1);
      setPopups(prev => [...prev, { id: Date.now(), x: food.x, y: food.y }]);
      setIsMoving(false);

      setTimeout(() => {
        setFoods(prev => prev.filter(f => f.id !== food.id));
        spawnFood();
      }, 300);
    }, 650);

    setTimeout(() => {
      setPopups(prev => prev.filter(p => p.id !== food.id + 100000));
    }, 800);
  }, [gameStarted, spawnFood]);

  useEffect(() => {
    if (!gameStarted) return;
    const interval = setInterval(() => {
      setFoods(prev => {
        if (prev.filter(f => !f.collected).length < 3) {
          spawnFood();
        }
        return prev;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [gameStarted, spawnFood]);

  return (
    <section id="jogo" className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-field-800 mb-2">
            Drone Coletor de Alimentos
          </h2>
          <p className="text-earth-600 text-lg">
            Clique nos alimentos para o drone coletar! Cada alimento vale 1 ponto.
          </p>
        </div>

        {!gameStarted ? (
          <div className="flex flex-col items-center justify-center game-area rounded-2xl h-[400px] border-4 border-field-300 shadow-xl">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg">
              <div className="text-6xl mb-4">🚁</div>
              <h3 className="text-2xl font-bold text-field-800 mb-2">Pronto para voar?</h3>
              <p className="text-earth-600 mb-6 max-w-sm">
                Clique nos alimentos que aparecem no campo e o drone vai coletá-los!
              </p>
              <button
                onClick={startGame}
                className="bg-field-600 hover:bg-field-700 text-white font-bold py-4 px-10 rounded-xl text-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                aria-label="Iniciar jogo"
              >
                Iniciar Jogo
              </button>
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="flex items-center justify-between bg-field-700 text-white rounded-t-2xl px-6 py-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🚁</span>
                <span className="font-bold text-lg">Pontuação:</span>
              </div>
              <span className="text-2xl font-bold bg-harvest-400 text-earth-900 px-4 py-1 rounded-lg">
                {score}
              </span>
              <button
                onClick={() => { setGameStarted(false); setScore(0); setFoods([]); }}
                className="bg-field-800 hover:bg-field-900 px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors"
                aria-label="Reiniciar jogo"
              >
                Reiniciar
              </button>
            </div>

            <div
              ref={containerRef}
              className="game-area rounded-b-2xl h-[400px] border-4 border-t-0 border-field-300 shadow-xl"
              role="application"
              aria-label="Área do jogo Drone Coletor de Alimentos"
            >
              {/* Clouds */}
              <div className="cloud h-8 w-20 top-[8%]" style={{ animationDuration: '25s', animationDelay: '0s' }} />
              <div className="cloud h-6 w-16 top-[15%]" style={{ animationDuration: '35s', animationDelay: '5s' }} />
              <div className="cloud h-10 w-24 top-[5%]" style={{ animationDuration: '30s', animationDelay: '12s' }} />

              {/* Ground decorations */}
              <div className="absolute bottom-0 left-0 right-0 h-[45%] pointer-events-none">
                <div className="absolute bottom-2 left-[10%] text-2xl opacity-60">🌾</div>
                <div className="absolute bottom-4 left-[30%] text-2xl opacity-60">🌿</div>
                <div className="absolute bottom-2 left-[55%] text-2xl opacity-60">🌾</div>
                <div className="absolute bottom-3 left-[75%] text-2xl opacity-60">🌿</div>
                <div className="absolute bottom-5 left-[90%] text-2xl opacity-60">🌾</div>
              </div>

              {/* Drone */}
              <div
                className={`drone ${isMoving ? 'propeller-spin' : ''}`}
                style={{
                  left: dronePos.x,
                  top: dronePos.y,
                  width: DRONE_SIZE,
                  height: DRONE_SIZE,
                }}
                aria-label="Drone"
              >
                <svg width={DRONE_SIZE} height={DRONE_SIZE} viewBox="0 0 48 48">
                  <rect x="18" y="20" width="12" height="8" rx="2" fill="#4a5568" />
                  <rect x="20" y="22" width="8" height="4" rx="1" fill="#63b3ed" />
                  <line x1="8" y1="18" x2="18" y2="22" stroke="#718096" strokeWidth="2" />
                  <line x1="30" y1="22" x2="40" y2="18" stroke="#718096" strokeWidth="2" />
                  <line x1="8" y1="30" x2="18" y2="26" stroke="#718096" strokeWidth="2" />
                  <line x1="30" y1="26" x2="40" y2="30" stroke="#718096" strokeWidth="2" />
                  <circle className="propeller" cx="8" cy="18" r="7" fill="none" stroke="#a0aec0" strokeWidth="2" opacity="0.6" />
                  <circle className="propeller" cx="40" cy="18" r="7" fill="none" stroke="#a0aec0" strokeWidth="2" opacity="0.6" />
                  <circle className="propeller" cx="8" cy="30" r="7" fill="none" stroke="#a0aec0" strokeWidth="2" opacity="0.6" />
                  <circle className="propeller" cx="40" cy="30" r="7" fill="none" stroke="#a0aec0" strokeWidth="2" opacity="0.6" />
                  <circle cx="8" cy="18" r="2" fill="#718096" />
                  <circle cx="40" cy="18" r="2" fill="#718096" />
                  <circle cx="8" cy="30" r="2" fill="#718096" />
                  <circle cx="40" cy="30" r="2" fill="#718096" />
                  <rect x="22" y="28" width="4" height="6" rx="1" fill="#a0aec0" />
                </svg>
              </div>

              {/* Foods */}
              {foods.map(food => (
                <button
                  key={food.id}
                  className={`food-item ${food.collected ? 'food-collected' : 'food-float'}`}
                  style={{
                    left: food.x,
                    top: food.y,
                    width: FOOD_SIZE,
                    height: FOOD_SIZE,
                    fontSize: FOOD_SIZE - 8,
                    lineHeight: `${FOOD_SIZE}px`,
                    textAlign: 'center',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                  }}
                  onClick={e => handleFoodClick(food, e)}
                  aria-label={`Coletar ${food.type}`}
                  disabled={food.collected}
                >
                  {food.emoji}
                </button>
              ))}

              {/* Score popups */}
              {popups.map(p => (
                <div
                  key={p.id}
                  className="score-popup text-xl"
                  style={{ left: p.x, top: p.y }}
                >
                  +1
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
