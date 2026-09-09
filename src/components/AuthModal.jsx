import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Sparkles, ArrowRight, CheckCircle, Copy, Check, Eye, EyeOff } from 'lucide-react';
import { GithubIcon } from './common/BrandIcons';
import { useAuth } from '../context/AuthContext';


export function AuthModal({ isOpen, onClose, initialMode = 'login', initialEmail = '' }) {
  const { login, signup, resetPassword, updateUserPassword, loginWithProvider, startGuestSession } = useAuth();
  const [mode, setMode] = useState(initialMode); // 'login', 'signup', 'forgot', 'reset_new_password'
  const [name, setName] = useState('');
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [resetUrl, setResetUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const [providerType, setProviderType] = useState(null); // 'google' | 'github'

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      if (initialEmail) setEmail(initialEmail);
      setError('');
      setSuccessMsg('');
      setResetUrl('');
      setCopied(false);
      setPassword('');
      setConfirmPassword('');
      setShowPassword(false);
      setShowConfirmPassword(false);
    }
  }, [isOpen, initialMode, initialEmail]);

  if (!isOpen) return null;

  const handleSwitchMode = (newMode) => {
    setMode(newMode);
    setError('');
    setSuccessMsg('');
    setResetUrl('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleClose = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    setSuccessMsg('');
    setResetUrl('');
    onClose();
  };

  const handleStartProviderPrompt = (provider) => {
    setProviderType(provider);
    setMode('provider_prompt');
    setError('');
  };

  const handleProviderSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your ' + (providerType === 'google' ? 'Google' : 'GitHub') + ' email address.');
      return;
    }
    loginWithProvider(providerType, email, name || email.split('@')[0]);
    handleClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setResetUrl('');

    if (mode === 'reset_new_password') {
      if (!password.trim() || !confirmPassword.trim()) {
        setError('Please enter and confirm your new password.');
        return;
      }
      if (password.length < 4) {
        setError('Password must be at least 4 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match. Please try again.');
        return;
      }
      const res = updateUserPassword(email || 'user@example.com', password);
      if (res.success) {
        window.history.replaceState({}, document.title, window.location.pathname);
        handleClose();
      } else {
        setError(res.message);
      }
      return;
    }

    if (mode === 'signup') {
      if (!name.trim() || !email.trim() || !password.trim()) {
        setError('Please fill in all required fields.');
        return;
      }
      const res = signup(name, email, password);
      if (res.success) {
        handleClose();
      } else {
        setError(res.message);
      }
    } else if (mode === 'login') {
      if (!email.trim() || !password.trim()) {
        setError('Please enter your email and password.');
        return;
      }
      const res = login(email, password);
      if (res.success) {
        handleClose();
      } else {
        setError(res.message);
      }
    } else if (mode === 'forgot') {
      if (!email.trim()) {
        setError('Please enter your registered email address.');
        return;
      }
      const res = resetPassword(email);
      setSuccessMsg(res.message);
      setResetUrl(res.resetUrl);
    }
  };

  const handleGuest = () => {
    startGuestSession();
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Banner */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20 mx-auto mb-3">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <h2 className="text-2xl font-extrabold text-white font-outfit">
            {mode === 'provider_prompt'
              ? `Sign in with ${providerType === 'google' ? 'Google' : 'GitHub'}`
              : mode === 'signup' 
              ? 'Create FolioCraft Account' 
              : mode === 'forgot' 
              ? 'Reset Password' 
              : mode === 'reset_new_password'
              ? 'Set New Password'
              : 'Welcome Back'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {mode === 'provider_prompt'
              ? `Enter your ${providerType === 'google' ? 'Google' : 'GitHub'} account details to continue`
              : mode === 'signup' 
              ? 'Build, customize, and publish your professional portfolio' 
              : mode === 'forgot' 
              ? 'Enter your email to receive password reset link' 
              : mode === 'reset_new_password'
              ? `Create a new password for ${email || 'your account'}`
              : 'Sign in to manage and edit your saved portfolios'}
          </p>
        </div>

        {/* Errors & Alerts */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold text-center">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="mb-4 space-y-2">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center space-x-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>

            {resetUrl && (
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-left animate-fadeIn">
                <span className="text-[11px] font-bold text-slate-300 block">Simulated Reset Link:</span>
                <div className="flex items-center justify-between gap-2 p-2 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-xs font-fira text-cyan-400 truncate flex-1">{resetUrl}</span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(resetUrl);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="px-2.5 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 rounded-lg text-xs font-bold flex items-center gap-1 shrink-0 transition-all"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="text-[10px] text-slate-500">Copy this link or click it to test password reset in demo environment.</p>
              </div>
            )}
          </div>
        )}

        {/* Provider Prompt Form */}
        {mode === 'provider_prompt' ? (
          <form onSubmit={handleProviderSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {providerType === 'google' ? 'Google Email Address' : 'GitHub Email / Username'} <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder={providerType === 'google' ? 'user@gmail.com' : 'user@github.com'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Display Name (Optional)</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center space-x-2"
            >
              <span>Continue & Log In</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setMode('login')}
              className="w-full text-center text-xs text-slate-400 hover:underline pt-2"
            >
              &larr; Back to login options
            </button>
          </form>
        ) : (
          <>
            {/* Single Sign-On Providers & Guest Quick Login */}
            {mode !== 'forgot' && (
              <div className="space-y-2.5 mb-6">
                <button
                  onClick={handleGuest}
                  type="button"
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 hover:from-cyan-500/30 hover:to-indigo-500/30 border border-cyan-500/40 rounded-xl text-cyan-300 text-xs font-bold transition-all shadow-md shadow-cyan-500/10"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Login as Guest (Instant Access)</span>
                </button>

                <button
                  onClick={() => handleStartProviderPrompt('google')}
                  type="button"
                  className="w-full flex items-center justify-center space-x-3 py-2.5 px-4 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-xl text-slate-200 text-xs font-semibold transition-all"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>
                <button
                  onClick={() => handleStartProviderPrompt('github')}
                  type="button"
                  className="w-full flex items-center justify-center space-x-3 py-2.5 px-4 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-xl text-slate-200 text-xs font-semibold transition-all"
                >
                  <GithubIcon className="w-4 h-4 text-white" />
                  <span>Continue with GitHub</span>
                </button>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
                  <div className="relative flex justify-center text-[10px] text-slate-500 uppercase"><span className="bg-slate-900 px-2 font-semibold">Or email login</span></div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Input Form */}
        {mode !== 'provider_prompt' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-300">
                      {mode === 'reset_new_password' ? 'New Password' : 'Password'}
                    </label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => handleSwitchMode('forgot')}
                        className="text-[11px] text-cyan-400 hover:underline"
                      >
                        Forgot?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300 transition-colors"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {mode === 'reset_new_password' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Confirm New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300 transition-colors"
                        title={showConfirmPassword ? 'Hide password' : 'Show password'}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center space-x-2"
            >
              <span>
                {mode === 'signup' 
                  ? 'Create Free Account' 
                  : mode === 'forgot' 
                  ? 'Send Reset Link' 
                  : mode === 'reset_new_password'
                  ? 'Save Password & Log In'
                  : 'Sign In'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Footer Toggle */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          {mode === 'login' ? (
            <p>Don't have an account? <button type="button" onClick={() => handleSwitchMode('signup')} className="text-cyan-400 font-semibold hover:underline">Sign up</button></p>
          ) : (
            <p>Already have an account? <button type="button" onClick={() => handleSwitchMode('login')} className="text-cyan-400 font-semibold hover:underline">Log in</button></p>
          )}

          <button
            onClick={handleGuest}
            className="text-slate-500 hover:text-slate-300 hover:underline"
          >
            Guest Quick-Start
          </button>
        </div>

      </div>
    </div>
  );
}
