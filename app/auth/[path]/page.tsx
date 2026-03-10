import Image from 'next/image';
import AuthForms from '@/components/auth/AuthForms';

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { path: 'sign-in' },
    { path: 'sign-up' },
    { path: 'sign-out' },
    { path: 'forgot-password' },
    { path: 'reset-password' },
  ];
}

export default async function AuthPage({ params }: { params: Promise<{ path: string }> }) {
  const { path } = await params;

  return (
    <main className="auth-page">
      {/* Atmospheric background layers */}
      <div className="auth-bg">
        <div className="auth-bg-grain" />
        <div className="auth-bg-glow auth-bg-glow--top" />
        <div className="auth-bg-glow auth-bg-glow--bottom" />
        <div className="auth-bg-line auth-bg-line--1" />
        <div className="auth-bg-line auth-bg-line--2" />
        <div className="auth-bg-line auth-bg-line--3" />
      </div>

      <div className="auth-layout">
        {/* Left panel - brand & atmosphere (desktop only) */}
        <div className="auth-brand-panel">
          <div className="auth-brand-content">
            <div className="auth-brand-logo">
              <Image
                src="/alumina-isotipo.webp"
                alt="Alumina"
                width={56}
                height={70}
                className="auth-brand-logo-img"
              />
            </div>
            <h1 className="auth-brand-title">ALUMINA</h1>
            <p className="auth-brand-subtitle">At Home</p>
            <div className="auth-brand-divider" />
            <p className="auth-brand-tagline">
              Longevity in your<br />personal sanctuary
            </p>
          </div>

          {/* Decorative botanical element */}
          <div className="auth-brand-decoration">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="auth-brand-svg">
              <circle cx="100" cy="100" r="80" stroke="rgba(239,194,179,0.08)" strokeWidth="0.5" />
              <circle cx="100" cy="100" r="60" stroke="rgba(239,194,179,0.06)" strokeWidth="0.5" />
              <circle cx="100" cy="100" r="40" stroke="rgba(239,194,179,0.04)" strokeWidth="0.5" />
              <path d="M100 20 Q120 60 100 100 Q80 60 100 20" stroke="rgba(239,194,179,0.12)" strokeWidth="0.75" fill="none" />
              <path d="M100 100 Q120 140 100 180 Q80 140 100 100" stroke="rgba(239,194,179,0.12)" strokeWidth="0.75" fill="none" />
              <path d="M20 100 Q60 80 100 100 Q60 120 20 100" stroke="rgba(239,194,179,0.12)" strokeWidth="0.75" fill="none" />
              <path d="M100 100 Q140 80 180 100 Q140 120 100 100" stroke="rgba(239,194,179,0.12)" strokeWidth="0.75" fill="none" />
            </svg>
          </div>
        </div>

        {/* Right panel - form */}
        <div className="auth-form-panel">
          {/* Mobile logo */}
          <div className="auth-mobile-logo">
            <Image
              src="/alumina-isotipo.webp"
              alt="Alumina"
              width={40}
              height={50}
            />
            <span className="auth-mobile-logo-text">ALUMINA</span>
          </div>

          <div className="auth-form-container">
            <AuthForms path={path} />
          </div>

          <footer className="auth-footer">
            <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
          </footer>
        </div>
      </div>
    </main>
  );
}
