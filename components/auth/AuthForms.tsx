'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { authClient } from '@/lib/auth/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

interface AuthFormProps {
  path: string;
}

export default function AuthForms({ path }: AuthFormProps) {
  switch (path) {
    case 'sign-in':
      return <SignInForm />;
    case 'sign-up':
      return <SignUpForm />;
    case 'forgot-password':
      return <ForgotPasswordForm />;
    case 'reset-password':
      return <ResetPasswordForm />;
    case 'sign-out':
      return <SignOutView />;
    default:
      return <SignInForm />;
  }
}

/* ─── Shared Sub-Components ─── */

function FormHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="af-header">
      <h2 className="af-title">{title}</h2>
      <p className="af-subtitle">{subtitle}</p>
    </div>
  );
}

function FormField({ label, labelRight, children }: { label: string; labelRight?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="af-field">
      <div className="af-field-top">
        <label className="af-label">{label}</label>
        {labelRight}
      </div>
      {children}
    </div>
  );
}

function TextInput({
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  autoComplete,
  required = true,
  icon: Icon,
}: {
  id: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  autoComplete?: string;
  required?: boolean;
  icon: React.ComponentType<{ size: number }>;
}) {
  return (
    <div className="af-input-wrap">
      <Icon size={16} />
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
      />
    </div>
  );
}

function PasswordInput({
  id,
  value,
  onChange,
  placeholder,
  autoComplete,
  minLength,
}: {
  id: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  autoComplete: string;
  minLength?: number;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="af-input-wrap">
      <Lock size={16} />
      <input
        id={id}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required
        minLength={minLength}
        autoComplete={autoComplete}
      />
      <button
        type="button"
        className="af-pw-toggle"
        onClick={() => setShow(!show)}
        tabIndex={-1}
        aria-label={show ? 'Hide password' : 'Show password'}
      >
        {show ? <EyeOff size={15} /> : <Eye size={15} />}
      </button>
    </div>
  );
}

function SubmitButton({ loading, loadingText, children }: { loading: boolean; loadingText: string; children: React.ReactNode }) {
  return (
    <button type="submit" disabled={loading} className="af-submit">
      {loading ? (
        <>
          <Loader2 size={17} className="af-spin" />
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          <span>{children}</span>
          <ArrowRight size={16} className="af-submit-arrow" />
        </>
      )}
    </button>
  );
}

function ErrorBanner({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div className="af-error">
      <div className="af-error-icon" />
      <span>{message}</span>
    </div>
  );
}

function PasswordStrength({ password }: { password: string }) {
  if (password.length === 0) return null;
  const strength = password.length < 8 ? 1 : password.length < 12 ? 2 : 3;
  const label = ['', 'Weak', 'Good', 'Strong'][strength];
  const color = ['', '#f87171', '#fbbf24', '#86efac'][strength];
  const width = `${(strength / 3) * 100}%`;

  return (
    <div className="af-strength">
      <div className="af-strength-track">
        <div className="af-strength-bar" style={{ width, background: color }} />
      </div>
      <span style={{ color }}>{label}</span>
    </div>
  );
}

/* ─── OTP Input ─── */

function OTPInput({
  value,
  onChange,
  length = 6,
  disabled = false,
}: {
  value: string;
  onChange: (val: string) => void;
  length?: number;
  disabled?: boolean;
}) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = value.padEnd(length, '').slice(0, length).split('');

  const focusInput = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  const handleChange = (index: number, char: string) => {
    if (!/^\d?$/.test(char)) return;
    const newDigits = [...digits];
    newDigits[index] = char;
    const newValue = newDigits.join('').replace(/\s/g, '');
    onChange(newValue);
    if (char && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      focusInput(index - 1);
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      focusInput(index - 1);
    }
    if (e.key === 'ArrowRight' && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (pasted) {
      onChange(pasted);
      focusInput(Math.min(pasted.length, length - 1));
    }
  };

  return (
    <div
      onPaste={handlePaste}
      style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}
    >
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit || ''}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onFocus={(e) => e.target.select()}
          disabled={disabled}
          className="af-otp-input"
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          aria-label={`Digit ${i + 1}`}
          style={{
            width: 48,
            height: 56,
            background: 'rgba(240, 237, 232, 0.08)',
            border: '1.5px solid rgba(240, 237, 232, 0.2)',
            color: '#f0ede8',
            fontFamily: "'Courier New', monospace",
            fontSize: '1.5rem',
            fontWeight: 600,
            textAlign: 'center',
            borderRadius: 12,
            caretColor: '#EFC2B3',
          }}
        />
      ))}
    </div>
  );
}

/* ─── Sign In (OTP-first) ─── */

type SignInStep = 'email' | 'otp' | 'password';

function SignInForm() {
  const [step, setStep] = useState<SignInStep>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const router = useRouter();

  // Cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Auto-submit when OTP is complete
  const submittingRef = useRef(false);
  useEffect(() => {
    if (otp.length === 6 && !loading && !submittingRef.current) {
      submittingRef.current = true;
      handleVerifyOTP();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: 'sign-in',
    });

    if (error) {
      setError(error.message || 'Could not send verification code. Make sure you have an account.');
      setLoading(false);
    } else {
      setStep('otp');
      setResendCooldown(60);
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await authClient.signIn.emailOtp({
      email,
      otp,
    });

    submittingRef.current = false;

    if (error) {
      setError(error.message || 'Invalid or expired code.');
      setLoading(false);
    } else {
      router.push('/');
    }
  };

  const handleResend = async () => {
    setError('');
    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: 'sign-in',
    });

    if (error) {
      setError(error.message || 'Could not resend code.');
    } else {
      setResendCooldown(60);
      setOtp('');
    }
  };

  const handlePasswordSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await authClient.signIn.email({ email, password });

    if (error) {
      setError(error.message || 'Invalid email or password.');
      setLoading(false);
    } else {
      router.push('/');
    }
  };

  // Step: OTP verification
  if (step === 'otp') {
    return (
      <form onSubmit={handleVerifyOTP} className="af-form">
        <FormHeader title="Check your email" subtitle={`We sent a 6-digit code to ${email}`} />

        <ErrorBanner message={error} />

        <div className="af-fields">
          <OTPInput value={otp} onChange={setOtp} disabled={loading} />
        </div>

        <SubmitButton loading={loading} loadingText="Verifying...">
          Verify & Sign In
        </SubmitButton>

        <div className="af-resend">
          {resendCooldown > 0 ? (
            <span>Resend code in {resendCooldown}s</span>
          ) : (
            <>
              <span>Didn&apos;t receive a code?</span>
              <button type="button" className="af-resend-btn" onClick={handleResend}>
                Resend
              </button>
            </>
          )}
        </div>

        <div className="af-method-toggle">
          <button type="button" onClick={() => { setStep('email'); setOtp(''); setError(''); }}>
            Use a different email
          </button>
        </div>
      </form>
    );
  }

  // Step: Password fallback
  if (step === 'password') {
    return (
      <form onSubmit={handlePasswordSignIn} className="af-form">
        <FormHeader title="Welcome back" subtitle="Sign in with your password" />

        <ErrorBanner message={error} />

        <div className="af-fields">
          <FormField label="Email">
            <TextInput
              id="signin-email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
              autoComplete="email"
              icon={Mail}
            />
          </FormField>

          <FormField
            label="Password"
            labelRight={
              <Link href="/auth/forgot-password" className="af-link-subtle">
                Forgot?
              </Link>
            }
          >
            <PasswordInput
              id="signin-password"
              value={password}
              onChange={setPassword}
              placeholder="Your password"
              autoComplete="current-password"
            />
          </FormField>
        </div>

        <SubmitButton loading={loading} loadingText="Signing in...">
          Sign In
        </SubmitButton>

        <div className="af-method-toggle">
          <button type="button" onClick={() => { setStep('email'); setError(''); }}>
            Sign in with email code instead
          </button>
        </div>

        <p className="af-switch">
          New to Alumina?{' '}
          <Link href="/auth/sign-up" className="af-link">Create an account</Link>
        </p>
      </form>
    );
  }

  // Step: Email (default — OTP-first)
  return (
    <form onSubmit={handleSendOTP} className="af-form">
      <FormHeader title="Welcome back" subtitle="Sign in to your sanctuary" />

      <ErrorBanner message={error} />

      <div className="af-fields">
        <FormField label="Email">
          <TextInput
            id="signin-email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="you@example.com"
            autoComplete="email"
            icon={Mail}
          />
        </FormField>
      </div>

      <SubmitButton loading={loading} loadingText="Sending code...">
        Continue
      </SubmitButton>

      <div className="af-method-toggle">
        <button type="button" onClick={() => { setStep('password'); setError(''); }}>
          Sign in with password instead
        </button>
      </div>

      <p className="af-switch">
        New to Alumina?{' '}
        <Link href="/auth/sign-up" className="af-link">Create an account</Link>
      </p>
    </form>
  );
}

/* ─── Sign Up ─── */

function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await authClient.signUp.email({ name, email, password });

    if (error) {
      setError(error.message || 'Could not create account.');
      setLoading(false);
    } else {
      router.push('/');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="af-form">
      <FormHeader title="Begin your journey" subtitle="Create your Alumina account" />

      <ErrorBanner message={error} />

      <div className="af-fields">
        <FormField label="Full name">
          <TextInput
            id="signup-name"
            value={name}
            onChange={setName}
            placeholder="Your name"
            autoComplete="name"
            icon={User}
          />
        </FormField>

        <FormField label="Email">
          <TextInput
            id="signup-email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="you@example.com"
            autoComplete="email"
            icon={Mail}
          />
        </FormField>

        <FormField label="Password">
          <PasswordInput
            id="signup-password"
            value={password}
            onChange={setPassword}
            placeholder="Min. 8 characters"
            autoComplete="new-password"
            minLength={8}
          />
          <PasswordStrength password={password} />
        </FormField>
      </div>

      <SubmitButton loading={loading} loadingText="Creating account...">
        Create Account
      </SubmitButton>

      <p className="af-switch">
        Already have an account?{' '}
        <Link href="/auth/sign-in" className="af-link">Sign in</Link>
      </p>
    </form>
  );
}

/* ─── Forgot Password ─── */

function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await authClient.requestPasswordReset({
      email,
      redirectTo: '/auth/reset-password',
    });

    if (error) {
      setError(error.message || 'Could not send reset email.');
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="af-form af-centered">
        <div className="af-success-icon">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="af-success-title">Check your inbox</h3>
        <p className="af-success-desc">
          We sent a password reset link to <strong>{email}</strong>.
          It may take a minute to arrive.
        </p>
        <Link href="/auth/sign-in" className="af-back-link">
          <ArrowLeft size={15} />
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="af-form">
      <FormHeader title="Reset password" subtitle="We'll send you a reset link" />

      <ErrorBanner message={error} />

      <div className="af-fields">
        <FormField label="Email address">
          <TextInput
            id="forgot-email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="you@example.com"
            autoComplete="email"
            icon={Mail}
          />
        </FormField>
      </div>

      <SubmitButton loading={loading} loadingText="Sending...">
        Send Reset Link
      </SubmitButton>

      <Link href="/auth/sign-in" className="af-back-link">
        <ArrowLeft size={15} />
        Back to sign in
      </Link>
    </form>
  );
}

/* ─── Reset Password ─── */

function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    const { error } = await authClient.resetPassword({ newPassword: password });

    if (error) {
      setError(error.message || 'Could not reset password. The link may have expired.');
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="af-form af-centered">
        <div className="af-success-icon">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="af-success-title">Password updated</h3>
        <p className="af-success-desc">
          Your password has been reset. You can now sign in with your new password.
        </p>
        <button onClick={() => router.push('/auth/sign-in')} className="af-submit" style={{ marginTop: '1.5rem' }}>
          <span>Continue to Sign In</span>
          <ArrowRight size={16} className="af-submit-arrow" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="af-form">
      <FormHeader title="New password" subtitle="Choose a secure password" />

      <ErrorBanner message={error} />

      <div className="af-fields">
        <FormField label="New password">
          <PasswordInput
            id="new-password"
            value={password}
            onChange={setPassword}
            placeholder="Min. 8 characters"
            autoComplete="new-password"
            minLength={8}
          />
          <PasswordStrength password={password} />
        </FormField>

        <FormField label="Confirm password">
          <PasswordInput
            id="confirm-password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Re-enter your password"
            autoComplete="new-password"
            minLength={8}
          />
        </FormField>
      </div>

      <SubmitButton loading={loading} loadingText="Resetting...">
        Reset Password
      </SubmitButton>
    </form>
  );
}

/* ─── Sign Out ─── */

function SignOutView() {
  const [done, setDone] = useState(false);

  const doSignOut = useCallback(async () => {
    if (done) return;
    setDone(true);
    await authClient.signOut();
    window.location.href = '/auth/sign-in';
  }, [done]);

  useEffect(() => {
    doSignOut();
  }, [doSignOut]);

  return (
    <div className="af-form af-centered">
      <Loader2 size={28} className="af-spin" style={{ color: 'var(--c-accent)' }} />
      <p className="af-success-desc" style={{ marginTop: '1.25rem' }}>Signing you out...</p>
    </div>
  );
}
