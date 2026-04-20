import React, { useState, useEffect, useRef } from 'react';
import logo from './assets/nusa-logo.png';
import bgImage from './assets/BG.jpg';

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { overflow-x: hidden; }

  :root {
    --green: #39FF14;
    --green-dim: rgba(57, 255, 20, 0.15);
    --green-mid: rgba(57, 255, 20, 0.35);
    --dark: #0a0e1a;
    --darker: #050710;
    --glass-bg: rgba(255,255,255,0.04);
    --glass-border: rgba(57,255,20,0.18);
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(36px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes floatA {
    0%,100% { transform: translateY(0px) rotate(0deg); }
    50%      { transform: translateY(-22px) rotate(5deg); }
  }
  @keyframes floatB {
    0%,100% { transform: translateY(0px) rotate(0deg); }
    50%      { transform: translateY(18px) rotate(-4deg); }
  }
  @keyframes floatC {
    0%,100% { transform: translateY(-10px); }
    50%      { transform: translateY(12px); }
  }
  @keyframes pulseGlow {
    0%,100% { box-shadow: 0 0 18px rgba(57,255,20,0.25), inset 0 0 18px rgba(57,255,20,0.05); }
    50%      { box-shadow: 0 0 40px rgba(57,255,20,0.55), inset 0 0 30px rgba(57,255,20,0.12); }
  }
  @keyframes shimmer {
    0%   { background-position: -300% center; }
    100% { background-position:  300% center; }
  }
  @keyframes scrollDot {
    0%   { opacity: 0; transform: translateY(0); }
    40%  { opacity: 1; }
    100% { opacity: 0; transform: translateY(12px); }
  }
  @keyframes gridMove {
    0%   { background-position: 0 0; }
    100% { background-position: 60px 60px; }
  }
  @keyframes scanLine {
    0%   { transform: translateY(-100%); opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { transform: translateY(200vh); opacity: 0; }
  }
  @keyframes borderPulse {
    0%,100% { border-color: rgba(57,255,20,0.3); }
    50%      { border-color: rgba(57,255,20,0.7); }
  }
  @keyframes countFlip {
    0%   { transform: translateY(-8px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }

  .fu1 { animation: fadeUp .8s ease both; animation-delay: .1s; }
  .fu2 { animation: fadeUp .8s ease both; animation-delay: .35s; }
  .fu3 { animation: fadeUp .8s ease both; animation-delay: .6s; }
  .fu4 { animation: fadeUp .8s ease both; animation-delay: .85s; }
  .fu5 { animation: fadeUp .8s ease both; animation-delay: 1.1s; }
  .fu6 { animation: fadeUp .8s ease both; animation-delay: 1.35s; }
  .fu0 { animation: fadeUp .8s ease both; animation-delay: 0s; }

  .hex { clip-path: polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%); }

  .float-a { animation: floatA 7s ease-in-out infinite; }
  .float-b { animation: floatB 9s ease-in-out infinite; }
  .float-c { animation: floatC 5.5s ease-in-out infinite; }

  .glass {
    background: var(--glass-bg);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid var(--glass-border);
  }

  .shimmer-heading {
    background: linear-gradient(90deg, #111 0%, #0a0e1a 50%, #111 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }

  .countdown-card {
    animation: pulseGlow 3.5s ease-in-out infinite, borderPulse 3.5s ease-in-out infinite;
  }

  .count-num { animation: countFlip .3s ease both; }

  .nav-link {
    color: #0a0e1a;
    text-decoration: none;
    font-size: 12px;
    letter-spacing: 2px;
    font-weight: 700;
    transition: color .25s;
    position: relative;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -4px; left: 0; right: 0;
    height: 1px;
    background: var(--green);
    transform: scaleX(0);
    transition: transform .25s;
  }
  .nav-link:hover { color: var(--green); }
  .nav-link:hover::after { transform: scaleX(1); }

  .sub-btn {
    background: transparent;
    border: 2px solid var(--green);
    color: var(--green);
    font-family: 'Orbitron', sans-serif;
    font-size: 12px;
    letter-spacing: 2px;
    font-weight: 700;
    cursor: pointer;
    transition: all .3s;
    white-space: nowrap;
  }
  .sub-btn:hover {
    background: var(--green);
    color: #000;
    box-shadow: 0 8px 30px rgba(57,255,20,.45);
    transform: translateY(-2px);
  }

  .email-input {
    background: rgba(255,255,255,.05);
    border: 1px solid rgba(57,255,20,.3);
    color: #fff;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    outline: none;
    transition: border-color .25s, box-shadow .25s;
  }
  .email-input::placeholder { color: #555; }
  .email-input:focus {
    border-color: rgba(57,255,20,.7);
    box-shadow: 0 0 20px rgba(57,255,20,.15);
  }

  .social-link {
    color: #444;
    transition: color .3s, transform .3s;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px; height: 44px;
    border-radius: 50%;
    border: 1px solid rgba(57,255,20,.12);
    background: rgba(57,255,20,.03);
  }
  .social-link:hover {
    color: var(--green);
    transform: translateY(-5px);
    border-color: rgba(57,255,20,.45);
    box-shadow: 0 6px 20px rgba(57,255,20,.2);
  }

  .feature-card {
    background: #fff;
    border-radius: 16px;
    border: 1px solid rgba(57,255,20,.25);
    transition: transform .3s, box-shadow .3s;
  }
  .feature-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 50px rgba(57,255,20,.15);
  }

  .section-divider {
    width: 1px;
    height: 60px;
    background: linear-gradient(to bottom, transparent, var(--green), transparent);
    margin: 0 auto;
  }

  @media (max-width: 640px) {
    .countdown-grid { gap: 10px !important; }
    .countdown-card { padding: 16px 14px !important; min-width: 72px !important; }
    .count-value { font-size: 32px !important; }
    .hero-tagline { font-size: 11px !important; letter-spacing: 3px !important; }
    .nav-links { gap: 20px !important; }
    .feature-row { flex-direction: column !important; align-items: center !important; }
    .subscribe-form { flex-direction: column !important; }
  }
`;

const Hexagon = ({ size = 80, opacity = 0.15, borderOpacity = 0.3, className = '', style = {} }) => (
  <div
    className={`hex ${className}`}
    style={{
      width: size, height: size,
      background: `rgba(57,255,20,${opacity})`,
      border: `2px solid rgba(57,255,20,${borderOpacity})`,
      flexShrink: 0,
      ...style,
    }}
  />
);

const HexDots = ({ count = 3, size = 14 }) => (
  <div style={{ display: 'flex', gap: 6, alignItems: 'center', justifyContent: 'center' }}>
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="hex"
        style={{
          width: size, height: size,
          background: i === Math.floor(count / 2) ? '#39FF14' : 'rgba(57,255,20,0.35)',
        }}
      />
    ))}
  </div>
);

const LineAccent = ({ width = 70, reversed = false }) => (
  <div style={{
    width, height: 2, flexShrink: 0,
    background: reversed
      ? 'linear-gradient(to left, transparent, #39FF14)'
      : 'linear-gradient(to right, transparent, #39FF14)',
  }} />
);

const StackedLines = ({ reversed = false }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 7, alignItems: reversed ? 'flex-start' : 'flex-end' }}>
    {[1, 0.55, 0.25].map((o, i) => (
      <div key={i} style={{
        height: 2,
        width: `${60 - i * 14}px`,
        background: reversed
          ? `linear-gradient(to right, rgba(57,255,20,${o}), transparent)`
          : `linear-gradient(to left, rgba(57,255,20,${o}), transparent)`,
      }} />
    ))}
  </div>
);

const SocialIcon = ({ href = '#', label, path }) => (
  <a href={href} aria-label={label} className="social-link" title={label}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d={path} />
    </svg>
  </a>
);

export default function NUSAComingSoon() {
  const canvasRef = useRef(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | success
  const [menuOpen, setMenuOpen] = useState(false);

  /* ---------- particle canvas ---------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const N = 90;
    const pts = Array.from({ length: N }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      r:  Math.random() * 1.8 + 0.4,
      vx: (Math.random() - .5) * .45,
      vy: (Math.random() - .5) * .45,
      o:  Math.random() * .6 + .25,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(57,255,20,${p.o})`;
        ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(57,255,20,${.13 * (1 - d / 130)})`;
            ctx.lineWidth = .6;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  /* ---------- subscribe ---------- */
  const handleSubscribe = e => {
    e.preventDefault();
    if (!email) return;
    setStatus('success');
  };

  /* ---------- socials ---------- */
  const socials = [
    { label: 'Twitter / X', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
    { label: 'Facebook',   path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
    { label: 'Instagram',  path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
    { label: 'LinkedIn',   path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  ];

  const features = [
    { emoji: '✈️', title: 'Unmanned Systems', desc: 'Advancing drone and UAV technology across Nigeria' },
    { emoji: '🤖', title: 'Robotics', desc: 'Promoting robotics innovation and education nationwide' },
    { emoji: '🇳🇬', title: 'Indigenous Growth', desc: 'Building a homegrown technology ecosystem' },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: 'linear-gradient(180deg, #f8fff4 0%, #e9ffe7 46%, #effcf4 100%)', minHeight: '100vh', color: '#0a0e1a', position: 'relative' }}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* ── Particle canvas ── */}
      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }}
      />

      {/* ── Animated grid overlay ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(57,255,20,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,.04) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        animation: 'gridMove 8s linear infinite',
      }} />

      {/* ── Scan line ── */}
      <div style={{
        position: 'fixed', left: 0, right: 0, height: '2px', zIndex: 0, pointerEvents: 'none',
        background: 'linear-gradient(to right, transparent, rgba(57,255,20,.3), transparent)',
        animation: 'scanLine 12s linear infinite',
      }} />

      {/* ════════════════════ NAVBAR ════════════════════ */}
      <nav className="glass" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: '0 40px', height: 70,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Nav links — desktop */}
        <div className="nav-links" style={{ display: 'flex', gap: 36 }}>
          <a href="#hero"      className="nav-link">HOME</a>
          <a href="#about"     className="nav-link">ABOUT</a>
          <a href="#subscribe" className="nav-link">SUBSCRIBE</a>
        </div>
      </nav>

      {/* ════════════════════ HERO ════════════════════ */}
      <section
        id="hero"
        style={{
          position: 'relative', zIndex: 1, minHeight: '100vh',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '110px 24px 80px', overflow: 'hidden',
        }}
      >
        {/* Background image with blur */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: -1,
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(1px)',
        }} />

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: -1,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.75) 0%, rgba(234,255,236,0.72) 100%)',
        }} />
        {/* Decorative floating hexagons */}
        <Hexagon size={100} opacity={.12} borderOpacity={.28} className="hex float-a" style={{ position: 'absolute', top: '12%', left: '4%' }} />
        <Hexagon size={160} opacity={.07} borderOpacity={.18} className="hex float-b" style={{ position: 'absolute', top: '18%', right: '5%' }} />
        <Hexagon size={60}  opacity={.18} borderOpacity={.35} className="hex float-c" style={{ position: 'absolute', top: '50%', left: '2%' }} />
        <Hexagon size={70}  opacity={.14} borderOpacity={.25} className="hex float-a" style={{ position: 'absolute', bottom: '22%', right: '4%' }} />
        <Hexagon size={40}  opacity={.22} borderOpacity={.4}  className="hex float-b" style={{ position: 'absolute', bottom: '18%', left: '8%' }} />
        <Hexagon size={200} opacity={.04} borderOpacity={.08} className="hex float-c" style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)' }} />

        {/* Radial glow behind text */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(57,255,20,.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Logo centered at top */}
        <div className="fu0" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 42 }}>
          <img src={logo} alt="NUSA logo" style={{ maxWidth: 250, width: '100%', height: 'auto', display: 'block' }} />
        </div>

        {/* Requested wording */}
        <div className="fu2">
          <p className="hero-tagline" style={{
            color: '#0a0e1a', letterSpacing: 2, fontSize: 15,
            fontWeight: 700, marginBottom: 24, fontFamily: "'Inter', sans-serif", textTransform: 'uppercase',
          }}>
            NIGERIAN UNMANNED SYSTEMS AND ROBOTICS ASSOCIATION
          </p>
        </div>

        {/* New website text */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, justifyContent: 'center' }}>
          <div style={{ width: 50, height: 1, background: '#0a0e1a' }} />
          <span style={{ color: '#0a0e1a', letterSpacing: 5, fontSize: 12, fontWeight: 700, fontFamily: "'Orbitron', sans-serif", textTransform: 'uppercase' }}>
            OUR NEW WEBSITE IS
          </span>
          <div style={{ width: 50, height: 1, background: '#0a0e1a' }} />
        </div>

        {/* COMING SOON with line accents */}
        <div className="fu3" style={{ display: 'flex', alignItems: 'center', gap: 28, marginBottom: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
          <StackedLines />
          <h1
            className="shimmer-heading"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 'clamp(56px, 10vw, 110px)',
              fontWeight: 900, lineHeight: 1.02,
              letterSpacing: 'clamp(2px, 1vw, 8px)',
              textShadow: '0 16px 40px rgba(0,0,0,0.12)',
            }}
          >
            COMING<br />SOON
          </h1>
          <StackedLines reversed />
        </div>

        {/* STAY TUNED */}
        <div className="fu4" style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 64 }}>
          <div style={{ width: 50, height: 1, background: '#0a0e1a' }} />
          <span style={{ color: '#0a0e1a', letterSpacing: 9, fontSize: 12, fontWeight: 800, fontFamily: "'Orbitron', sans-serif" }}>
            STAY TUNED
          </span>
          <div style={{ width: 50, height: 1, background: '#0a0e1a' }} />
        </div>

        {/* Scroll indicator */}
        <div className="fu6">
          <div style={{
            width: 26, height: 44, borderRadius: 13,
            border: '2px solid rgba(57,255,20,.35)',
            display: 'flex', alignItems: 'flex-start',
            justifyContent: 'center', paddingTop: 7, margin: '0 auto',
          }}>
            <div style={{
              width: 4, height: 10, background: '#39FF14', borderRadius: 2,
              animation: 'scrollDot 1.8s ease-in-out infinite',
            }} />
          </div>
          <p style={{ color: '#4b5563', fontSize: 9, letterSpacing: 3, marginTop: 8 }}>SCROLL</p>
        </div>
      </section>

      {/* ════════════════════ ABOUT ════════════════════ */}
      <section
        id="about"
        style={{
          position: 'relative', zIndex: 1,
          background: 'linear-gradient(160deg, #f0fdf4 0%, #ecfdf5 50%, #f0fdf4 100%)',
          padding: '100px 24px',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Decorative hexagon clusters */}
        <div style={{ position: 'absolute', top: -40, left: -40, opacity: .2 }}>
          <div className="hex" style={{ width: 160, height: 160, background: '#39FF14' }} />
        </div>
        <div style={{ position: 'absolute', bottom: -60, right: -50, opacity: .12 }}>
          <div className="hex" style={{ width: 220, height: 220, background: '#39FF14' }} />
        </div>

        <HexDots count={5} size={16} />

        <div style={{ marginTop: 36, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center' }}>
          <div style={{ width: 50, height: 2, background: '#39FF14' }} />
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 'clamp(22px, 4vw, 40px)',
            fontWeight: 900, color: '#0a0e1a', letterSpacing: 4,
          }}>
            ABOUT NUSA
          </h2>
          <div style={{ width: 50, height: 2, background: '#39FF14' }} />
        </div>

        <div style={{ width: 56, height: 3, background: '#39FF14', margin: '0 auto 48px', borderRadius: 2 }} />

        <p style={{
          maxWidth: 720, margin: '0 auto', lineHeight: 1.95,
          fontSize: 'clamp(15px, 2vw, 18px)', color: '#374151',
        }}>
          <strong style={{ color: '#0a0e1a', fontWeight: 700 }}>NUSA</strong>{' '}
          (Nigeria Unmanned Systems &amp; Robotics Association) is an indigenous non-profit organisation
          incorporated under the laws of the{' '}
          <strong style={{ color: '#0a0e1a' }}>Federal Republic of Nigeria</strong> for the sole purpose of
          fostering, developing, and promoting unmanned systems and robotics technologies in Nigeria.
        </p>

        {/* Feature cards */}
        <div
          className="feature-row"
          style={{ display: 'flex', gap: 24, marginTop: 64, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          {features.map((f, i) => (
            <div key={i} className="feature-card" style={{ flex: '1 1 200px', maxWidth: 230, padding: '36px 24px' }}>
              <div style={{ fontSize: 38, marginBottom: 18 }}>{f.emoji}</div>
              <h3 style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 11, fontWeight: 800, color: '#0a0e1a',
                letterSpacing: 2, marginBottom: 12,
              }}>
                {f.title}
              </h3>
              <p style={{ color: '#6b7280', fontSize: 13, lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════ FOOTER ════════════════════ */}
      <footer style={{
        position: 'relative', zIndex: 1,
        background: '#f4fff6',
        borderTop: '1px solid rgba(57,255,20,.18)',
        padding: '24px 40px',
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', flexWrap: 'wrap', gap: 16,
      }}>
        <p style={{ color: '#0a0e1a', fontSize: 11, letterSpacing: 1, textAlign: 'center' }}>
          © 2026 Nigeria Unmanned Systems &amp; Robotics Association. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
