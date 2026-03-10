'use client';

import { useState, useEffect, useCallback } from 'react';
import { authClient } from '@/lib/auth/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';

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
    <div className="auth-input-wrapper">
      <Lock size={16} className="auth-input-icon" />
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
        className="auth-password-toggle"
        onClick={() => setShow(!show)}
        tabIndex={-1}
        aria-label={show ? 'Hide password' : 'Show password'}
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      setError(error.message || 'Invalid email or password. Please try again.');
      setLoading(false);
    } else {
      router.push('/');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {error && (
        <div className="auth-error">
          <span className="auth-error-dot" />
          {error}
        </div>
      )}

      <div className="auth-field">
        <label htmlFor="signin-email">Email address</label>
        <div className="auth-input-wrapper">
          <Mail size={16} className="auth-input-icon" />
          <input
            id="signin-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            autoComplete="email"
          />
        </div>
      </div>

      <div className="auth-field">
        <div className="auth-field-header">
          <label htmlFor="signin-password">Password</label>
          <Link href="/auth/forgot-password" className="auth-field-link">
            Forgot?
          </Link>
        </div>
        <PasswordInput
          id="signin-password"
          value={password}
          onChange={setPassword}
          placeholder="Enter your password"
          autoComplete="current-password"
        />
      </div>

      <button type="submit" disabled={loading} className="auth-submit">
        {loading ? (
          <>
            <Loader2 size={18} className="auth-spinner" />
            Signing in...
          </>
        ) : (
          'Sign In'
        )}
      </button>

      <p className="auth-switch">
        New to Alumina?{' '}
        <Link href="/auth/sign-up">Create an account</Link>
      </p>
    </form>
  );
}

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

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    if (error) {
      setError(error.message || 'Could not create account. Please try again.');
      setLoading(false);
    } else {
      router.push('/');
    }
  };

  const passwordStrength = password.length === 0 ? 0 : password.length < 8 ? 1 : password.length < 12 ? 2 : 3;
  const strengthLabel = ['', 'Weak', 'Good', 'Strong'][passwordStrength];
  const strengthColor = ['', '#f87171', '#fbbf24', '#86efac'][passwordStrength];

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {error && (
        <div className="auth-error">
          <span className="auth-error-dot" />
          {error}
        </div>
      )}

      <div className="auth-field">
        <label htmlFor="signup-name">Full name</label>
        <div className="auth-input-wrapper">
          <User size={16} className="auth-input-icon" />
          <input
            id="signup-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            autoComplete="name"
          />
        </div>
      </div>

      <div className="auth-field">
        <label htmlFor="signup-email">Email address</label>
        <div className="auth-input-wrapper">
          <Mail size={16} className="auth-input-icon" />
          <input
            id="signup-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            autoComplete="email"
          />
        </div>
      </div>

      <div className="auth-field">
        <label htmlFor="signup-password">Password</label>
        <PasswordInput
          id="signup-password"
          value={password}
          onChange={setPassword}
          placeholder="Min. 8 characters"
          autoComplete="new-password"
          minLength={8}
        />
        {password.length > 0 && (
          <div className="auth-strength">
            <div className="auth-strength-bar">
              <div
                className="auth-strength-fill"
                style={{
                  width: `${(passwordStrength / 3) * 100}%`,
                  background: strengthColor,
                }}
              />
            </div>
            <span style={{ color: strengthColor }}>{strengthLabel}</span>
          </div>
        )}
      </div>

      <button type="submit" disabled={loading} className="auth-submit">
        {loading ? (
          <>
            <Loader2 size={18} className="auth-spinner" />
            Creating account...
          </>
        ) : (
          'Create Account'
        )}
      </button>

      <p className="auth-switch">
        Already have an account?{' '}
        <Link href="/auth/sign-in">Sign in</Link>
      </p>
    </form>
  );
}

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
      setError(error.message || 'Could not send reset email. Please try again.');
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="auth-form auth-success-view">
        <div className="auth-success-icon">
          <CheckCircle2 size={48} />
        </div>
        <h3 className="auth-success-title">Check your inbox</h3>
        <p className="auth-success-desc">
          We sent a password reset link to <strong>{email}</strong>. It may take a minute to arrive.
        </p>
        <Link href="/auth/sign-in" className="auth-back-link">
          <ArrowLeft size={16} />
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {error && (
        <div className="auth-error">
          <span className="auth-error-dot" />
          {error}
        </div>
      )}

      <p className="auth-desc">
        Enter the email address associated with your account and we&apos;ll send you a link to reset your password.
      </p>

      <div className="auth-field">
        <label htmlFor="forgot-email">Email address</label>
        <div className="auth-input-wrapper">
          <Mail size={16} className="auth-input-icon" />
          <input
            id="forgot-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            autoComplete="email"
          />
        </div>
      </div>

      <button type="submit" disabled={loading} className="auth-submit">
        {loading ? (
          <>
            <Loader2 size={18} className="auth-spinner" />
            Sending...
          </>
        ) : (
          'Send Reset Link'
        )}
      </button>

      <Link href="/auth/sign-in" className="auth-back-link">
        <ArrowLeft size={16} />
        Back to sign in
      </Link>
    </form>
  );
}

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

    const { error } = await authClient.resetPassword({
      newPassword: password,
    });

    if (error) {
      setError(error.message || 'Could not reset password. The link may have expired.');
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="auth-form auth-success-view">
        <div className="auth-success-icon">
          <CheckCircle2 size={48} />
        </div>
        <h3 className="auth-success-title">Password updated</h3>
        <p className="auth-success-desc">
          Your password has been reset successfully. You can now sign in with your new password.
        </p>
        <button
          onClick={() => router.push('/auth/sign-in')}
          className="auth-submit"
          style={{ marginTop: '1rem' }}
        >
          Continue to Sign In
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {error && (
        <div className="auth-error">
          <span className="auth-error-dot" />
          {error}
        </div>
      )}

      <div className="auth-field">
        <label htmlFor="new-password">New password</label>
        <PasswordInput
          id="new-password"
          value={password}
          onChange={setPassword}
          placeholder="Min. 8 characters"
          autoComplete="new-password"
          minLength={8}
        />
      </div>

      <div className="auth-field">
        <label htmlFor="confirm-password">Confirm password</label>
        <PasswordInput
          id="confirm-password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Re-enter your password"
          autoComplete="new-password"
          minLength={8}
        />
      </div>

      <button type="submit" disabled={loading} className="auth-submit">
        {loading ? (
          <>
            <Loader2 size={18} className="auth-spinner" />
            Resetting...
          </>
        ) : (
          'Reset Password'
        )}
      </button>
    </form>
  );
}

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
    <div className="auth-form auth-success-view">
      <Loader2 size={32} className="auth-spinner" style={{ color: '#EFC2B3' }} />
      <p className="auth-success-desc" style={{ marginTop: '1rem' }}>Signing you out...</p>
    </div>
  );
}
