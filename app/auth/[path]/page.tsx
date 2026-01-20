import Image from 'next/image';
import { AuthView } from '@neondatabase/auth/react';

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

  const getPageTitle = (p: string) => {
    switch (p) {
      case 'sign-in': return 'Welcome Back';
      case 'sign-up': return 'Start Your Journey';
      case 'forgot-password': return 'Reset Password';
      case 'reset-password': return 'Create New Password';
      case 'sign-out': return 'Sign Out';
      default: return 'Authentication';
    }
  };

  const getPageSubtitle = (p: string) => {
    switch (p) {
      case 'sign-in': return 'Sign in to continue your longevity journey';
      case 'sign-up': return 'Create an account to optimize your health';
      case 'forgot-password': return 'Enter your email to reset your password';
      case 'reset-password': return 'Choose a new secure password';
      case 'sign-out': return 'See you soon!';
      default: return '';
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #071210 0%, #0a1a17 50%, #071210 100%)',
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top-right glow */}
        <div 
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(239, 194, 179, 0.3) 0%, transparent 70%)',
          }}
        />
        {/* Bottom-left glow */}
        <div 
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(239, 194, 179, 0.2) 0%, transparent 70%)',
          }}
        />
        {/* Center subtle glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(239, 194, 179, 0.15) 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(239, 194, 179, 0.15) 0%, rgba(239, 194, 179, 0.05) 100%)',
                border: '1px solid rgba(239, 194, 179, 0.2)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Image
                src="/alumina-isotipo.webp"
                alt="Alumina Logo"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 tracking-tight">
            Alumina <span style={{ color: '#EFC2B3' }}>At Home</span>
          </h1>
          
          <h2 className="text-lg sm:text-xl font-medium text-white/90 mb-2">
            {getPageTitle(path)}
          </h2>
          
          <p className="text-sm text-white/50">
            {getPageSubtitle(path)}
          </p>
        </div>
        
        {/* Auth View Container */}
        <div 
          className="rounded-2xl p-6 sm:p-8 shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <AuthView path={path} />
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-white/30">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>

      {/* Custom styles for Neon Auth UI */}
      <style>{`
        /* Override Neon Auth UI styles to match brand */
        [data-neon-auth] {
          --neon-auth-primary: #EFC2B3 !important;
          --neon-auth-primary-hover: #e5b3a3 !important;
          --neon-auth-background: transparent !important;
          --neon-auth-foreground: #ffffff !important;
          --neon-auth-muted: rgba(255, 255, 255, 0.5) !important;
          --neon-auth-muted-foreground: rgba(255, 255, 255, 0.7) !important;
          --neon-auth-border: rgba(255, 255, 255, 0.1) !important;
          --neon-auth-input: rgba(255, 255, 255, 0.05) !important;
          --neon-auth-ring: rgba(239, 194, 179, 0.5) !important;
          --neon-auth-radius: 0.75rem !important;
        }
        
        [data-neon-auth] input {
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: #ffffff !important;
          padding: 0.875rem 1rem !important;
          font-size: 0.875rem !important;
          border-radius: 0.75rem !important;
          transition: all 0.2s ease !important;
        }
        
        [data-neon-auth] input:focus {
          border-color: rgba(239, 194, 179, 0.5) !important;
          box-shadow: 0 0 0 3px rgba(239, 194, 179, 0.1) !important;
          outline: none !important;
        }
        
        [data-neon-auth] input::placeholder {
          color: rgba(255, 255, 255, 0.4) !important;
        }
        
        [data-neon-auth] button[type="submit"],
        [data-neon-auth] button[data-primary] {
          background: linear-gradient(135deg, #EFC2B3 0%, #e5a896 100%) !important;
          color: #071210 !important;
          font-weight: 600 !important;
          padding: 0.875rem 1.5rem !important;
          border-radius: 0.75rem !important;
          border: none !important;
          transition: all 0.2s ease !important;
          box-shadow: 0 4px 20px rgba(239, 194, 179, 0.3) !important;
        }
        
        [data-neon-auth] button[type="submit"]:hover,
        [data-neon-auth] button[data-primary]:hover {
          background: linear-gradient(135deg, #e5b3a3 0%, #d99a87 100%) !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 6px 24px rgba(239, 194, 179, 0.4) !important;
        }
        
        [data-neon-auth] button:not([type="submit"]):not([data-primary]) {
          color: rgba(255, 255, 255, 0.7) !important;
          background: transparent !important;
        }
        
        [data-neon-auth] button:not([type="submit"]):not([data-primary]):hover {
          color: #ffffff !important;
          background: rgba(255, 255, 255, 0.05) !important;
        }
        
        [data-neon-auth] a {
          color: #EFC2B3 !important;
          text-decoration: none !important;
          transition: color 0.2s ease !important;
        }
        
        [data-neon-auth] a:hover {
          color: #ffffff !important;
        }
        
        [data-neon-auth] label {
          color: rgba(255, 255, 255, 0.8) !important;
          font-size: 0.875rem !important;
          font-weight: 500 !important;
        }
        
        [data-neon-auth] [data-error] {
          color: #f87171 !important;
          background: rgba(248, 113, 113, 0.1) !important;
          border: 1px solid rgba(248, 113, 113, 0.2) !important;
          border-radius: 0.5rem !important;
          padding: 0.75rem !important;
        }
        
        [data-neon-auth] hr,
        [data-neon-auth] [data-divider] {
          border-color: rgba(255, 255, 255, 0.1) !important;
        }
        
        [data-neon-auth] [data-divider-text] {
          color: rgba(255, 255, 255, 0.4) !important;
          background: transparent !important;
        }
      `}</style>
    </main>
  );
}
