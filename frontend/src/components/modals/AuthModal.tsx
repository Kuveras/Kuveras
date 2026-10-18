import React, { useState } from 'react';
import { X, User, Lock, Mail, Crown } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useAuth } from '../../context/AuthContext';
import { KuverasLogo } from '../common/KuverasLogo';

export const AuthModal: React.FC = () => {
  const { isAuthOpen, setIsAuthOpen, showToast } = useUI();
  const { user, login, register, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'login') {
      login(email, 'Royal Patron');
      showToast('Welcome back to Kuveras!');
    } else {
      register(name || 'Royal Patron', email);
      showToast('Account created successfully!');
    }
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    logout();
    showToast('Logged out of your Kuveras account');
    setIsAuthOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        onClick={() => setIsAuthOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      {/* Box */}
      <div className="relative w-full max-w-md bg-[#FFFDF9] border border-[#E8E2D9] shadow-2xl overflow-hidden animate-fade-in z-10 p-6 sm:p-8">
        <button
          onClick={() => setIsAuthOpen(false)}
          className="absolute top-3 right-3 p-2 text-[#7A736E] hover:text-[#111111]"
          aria-label="Close authentication modal"
        >
          <X className="w-5 h-5" />
        </button>

        {user ? (
          <div className="text-center space-y-4 py-4">
            <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#D4AF37] mx-auto flex items-center justify-center text-[#D4AF37]">
              <Crown className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#111111]">
              Greetings, {user.name}
            </h3>
            <p className="text-xs text-[#7A736E]">{user.email}</p>
            <div className="pt-4 space-y-2">
              <button
                onClick={handleLogout}
                className="w-full py-2.5 bg-[#8B0000] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#660000] transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Logo */}
            <div className="text-center mb-6">
              <KuverasLogo className="w-36 mx-auto mb-2" showSubtext={false} />
              <p className="text-xs text-[#7A736E] mt-1 font-sans">
                Sign in to access your wishlist, order history, and exclusive rental privileges.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#E8E2D9] mb-6">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 ${
                  activeTab === 'login'
                    ? 'border-[#D4AF37] text-[#111111]'
                    : 'border-transparent text-[#7A736E]'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 ${
                  activeTab === 'register'
                    ? 'border-[#D4AF37] text-[#111111]'
                    : 'border-transparent text-[#7A736E]'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === 'register' && (
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Princess Kamini"
                      className="w-full bg-[#FAF8F5] border border-[#E8E2D9] pl-9 pr-3 py-2 text-xs text-[#111111] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-[#FAF8F5] border border-[#E8E2D9] pl-9 pr-3 py-2 text-xs text-[#111111] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#FAF8F5] border border-[#E8E2D9] pl-9 pr-3 py-2 text-xs text-[#111111] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#111111] hover:bg-[#C5A059] text-white text-xs font-semibold uppercase tracking-widest transition-colors mt-2"
              >
                {activeTab === 'login' ? 'Sign In To Account' : 'Register Account'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
