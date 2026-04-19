import React, { useState } from 'react';
import logo from './assets/nusa-logo.svg';

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { overflow-x: hidden; }

  :root {
    --green: #39FF14;
    --dark: #0a0e1a;
    --text: #0a0e1a;
    --muted: #4b5563;
  }

  .glass {
    background: rgba(255,255,255,0.75);
    border: 1px solid rgba(57,255,20,0.18);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }

  .button {
    background: #39FF14;
    border: 0;
    color: #0a0e1a;
    font-family: 'Orbitron', sans-serif;
    letter-spacing: 1.5px;
    font-size: 14px;
    font-weight: 700;
    padding: 16px 26px;
    border-radius: 10px;
    cursor: pointer;
    transition: transform .2s, box-shadow .2s;
  }

  .button:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(57,255,20,0.25);
  }
`;

export default function SimpleNUSA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: 'linear-gradient(180deg, #ffffff 0%, #e8ffeb 40%, #f4fff6 100%)', color: 'var(--text)' }}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <main style={{ maxWidth: 1080, margin: '0 auto', padding: '60px 24px 48px', display: 'flex', flexDirection: 'column', gap: 34 }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 18 }}>
          <img src={logo} alt="NUSA logo" style={{ maxWidth: 420, width: '100%', height: 'auto' }} />
          <div style={{ minWidth: 220, background: 'rgba(255,255,255,0.9)', borderRadius: 18, padding: '22px 24px', boxShadow: '0 20px 60px rgba(15,23,42,0.08)' }}>
            <p style={{ fontSize: 12, letterSpacing: 2, color: '#4b5563', textTransform: 'uppercase', marginBottom: 10 }}>NUSA BRAND</p>
            <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 24, lineHeight: 1.2, color: '#0a0e1a', marginBottom: 12 }}>A clean launch page for the association.</h2>
            <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.8 }}>Simple, bold branding with the exact NUSA logo asset at the top.</p>
          </div>
        </header>

        <section style={{ display: 'grid', gap: 28, alignItems: 'start' }}>
          <div style={{ maxWidth: 700 }}>
            <p style={{ color: '#0a0e1a', fontSize: 14, fontWeight: 600, letterSpacing: '0.08em', marginBottom: 12 }}>Then it nigerian unmanned systems and robotics association</p>
            <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(42px, 7vw, 78px)', lineHeight: 1.03, margin: 0, color: '#0a0e1a' }}>COMING SOON</h1>
            <p style={{ marginTop: 20, fontSize: 16, lineHeight: 1.9, color: '#475569' }}>
              Nigeria Unmanned Systems & Robotics Association is preparing a polished launch experience.
              We kept the design simple, the brand strong, and the logo front and center.
            </p>
          </div>

          <div className="glass" style={{ borderRadius: 24, padding: '32px', maxWidth: 520 }}>
            <h3 style={{ margin: 0, fontFamily: "'Orbitron', sans-serif", fontSize: 18, color: '#0a0e1a', letterSpacing: 2 }}>Stay connected</h3>
            <p style={{ margin: '14px 0 22px', color: '#475569', fontSize: 15, lineHeight: 1.8 }}>
              Subscribe for launch updates from NUSA.
            </p>
            {submitted ? (
              <div style={{ padding: '20px', borderRadius: 18, background: '#f0fff1', color: '#0a0e1a', fontWeight: 700 }}>
                Thank you — you&rsquo;re on the list.
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14 }}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  style={{ width: '100%', borderRadius: 14, border: '1px solid rgba(15,23,42,0.1)', padding: '16px 18px', fontSize: 15, color: '#0a0e1a' }}
                />
                <button type="submit" className="button">Notify me</button>
              </form>
            )}
          </div>
        </section>
      </main>

      <section id="about" style={{ background: '#f7fff5', padding: '68px 24px 92px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4b5563', marginBottom: 14 }}>About NUSA</p>
          <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(30px, 5vw, 44px)', color: '#0a0e1a', margin: 0 }}>Nigeria Unmanned Systems & Robotics Association</h2>
          <p style={{ marginTop: 22, fontSize: 16, lineHeight: 1.95, color: '#475569' }}>
            NUSA is an indigenous non-profit organisation incorporated under the laws of the Federal Republic of Nigeria for the sole purpose of fostering, developing, and promoting unmanned systems and robotics technologies in Nigeria.
          </p>
        </div>
      </section>
    </div>
  );
}
