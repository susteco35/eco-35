import { useEffect, useRef, useState } from 'react';
import { Users, Calendar, Camera, Heart } from 'lucide-react';
import { STATS } from '@/data';

const ICONS = [Users, Calendar, Camera, Heart];

function useCountUp(target: number, start: boolean, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return val;
}

function Stat({ value, suffix, label, Icon, start }: { value: number; suffix: string; label: string; Icon: typeof Users; start: boolean }) {
  const n = useCountUp(value, start);
  return (
    <div className="reveal flex flex-1 flex-col items-center text-center">
      <Icon className="mb-3 h-5 w-5 text-gold-500 dark:text-gold-400" strokeWidth={1.5} />
      <div className="font-display text-4xl font-semibold text-navy-900 sm:text-5xl dark:text-white">
        {n}
        <span className="text-gold-500 dark:text-gold-400">{suffix}</span>
      </div>
      <div className="mt-2 text-[0.7rem] font-semibold uppercase tracking-widest2 text-slatey-500 dark:text-slatey-400">
        {label}
      </div>
    </div>
  );
}

export default function FloatingStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStart(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative z-20 -mt-12 px-5 sm:px-8 lg:px-12">
      <div
        ref={ref}
        className="card-surface mx-auto flex max-w-4xl flex-col items-stretch gap-6 rounded-2xl px-6 py-8 shadow-xl shadow-navy-900/10 sm:flex-row sm:gap-0 sm:px-10"
      >
        {STATS.map((s, i) => (
          <div key={s.label} className="flex flex-1 flex-col items-stretch sm:flex-row">
            <Stat value={s.value} suffix={s.suffix} label={s.label} Icon={ICONS[i]} start={start} />
            {i < STATS.length - 1 && (
              <div className="my-2 hidden w-px self-stretch bg-slatey-200 dark:bg-navy-700 sm:mx-4 sm:block" />
            )}
            {i < STATS.length - 1 && (
              <div className="mx-auto h-px w-12 bg-slatey-200 dark:bg-navy-700 sm:hidden" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
