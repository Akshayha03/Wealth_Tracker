import { Injectable, signal, inject } from '@angular/core';
import { supabase } from '../../supabase';
import { FinanceService } from './finance.service';

export interface UserProfile {
  id: string;
  full_name?: string;
  email?: string;
  created_at?: string;

}

export interface ToastNotification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  finance = inject(FinanceService);
  currentUser = signal<any | null>(null);
  currentProfile = signal<UserProfile | null>(null);
  session = signal<any | null>(null);
  isLoading = signal<boolean>(false);

  // Active auth view state: 'login' | 'signup' | 'forgot'
  authView = signal<'login' | 'signup' | 'forgot'>('login');
  showAuthPortal = signal<boolean>(false);

  // Toast notifications signal
  toasts = signal<ToastNotification[]>([]);
  private toastCounter = 0;

  private isPlaceholderConfig(): boolean {
    return (
      !supabase ||
      (supabase as any).supabaseUrl === 'YOUR_SUPABASE_URL' ||
      String((supabase as any).supabaseUrl || '').includes('YOUR_SUPABASE_URL')
    );
  }

  constructor() {
    this.initAuth();
  }

  async initAuth() {
    if (this.isPlaceholderConfig()) {
      // Check if demo user exists in session
      const demoSession = sessionStorage.getItem('nexusfi_demo_session');
      if (demoSession) {
        try {
          const user = JSON.parse(demoSession);
          this.currentUser.set(user);
          this.currentProfile.set({ id: user.id, full_name: user.user_metadata?.full_name || 'Demo User', email: user.email });
        } catch (e) { }
      }
      return;
    }

    this.isLoading.set(true);
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        if (error.message?.toLowerCase().includes('expired')) {
          this.showToast('Your session has expired. Please log in again.', 'error');
        }
      } else if (session) {
        this.session.set(session);
        this.currentUser.set(session.user);
        await this.fetchProfile(session.user.id, session.user.email);
      }
    } catch (e: any) {
      console.error('Session check error:', e);
      if (e.message?.includes('URL') || e.message?.includes('fetch')) {
        console.warn('Supabase not configured yet. Using UI demo mode.');
      }
    } finally {
      this.isLoading.set(false);
    }

    try {
      supabase.auth.onAuthStateChange(async (event, session) => {
        this.session.set(session);
        this.currentUser.set(session?.user ?? null);
        if (session?.user) {
          await this.fetchProfile(session.user.id, session.user.email);
        } else {
          this.currentProfile.set(null);
        }
      });
    } catch (e) { }
  }

  async fetchProfile(userId: string, email?: string) {
    if (this.isPlaceholderConfig()) return;
    try {
      const { data: authData } = await supabase.auth.getSession();
      if (!authData?.session) {
        // If testing without a Supabase auth session, set profile in memory cleanly
        const fallbackName = this.currentUser()?.user_metadata?.full_name || email?.split('@')[0] || 'User';
        this.currentProfile.set({ id: userId, full_name: fallbackName, email, created_at: new Date().toISOString() });
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (data && !error) {
        this.currentProfile.set({
          ...data,
          full_name: data.full_name || 'User',
          email: data.email || email
        });
      } else {
        const fallbackName = this.currentUser()?.user_metadata?.full_name || email?.split('@')[0] || 'User';
        const newProfile = { id: userId, full_name: fallbackName, email, created_at: new Date().toISOString() };
        await supabase.from('profiles').upsert([newProfile]);
        this.currentProfile.set(newProfile);
      }
    } catch (e) {
      console.error('Error fetching profile:', e);
    }
  }

  async login(email: string, pass: string, rememberMe: boolean = true): Promise<boolean> {
    this.isLoading.set(true);
    try {
      if (this.isPlaceholderConfig()) {
        await new Promise(r => setTimeout(r, 1000));
        // Demo mode validation
        if (!email || !pass) {
          throw new Error('Please fill in all required fields.');
        }
        const demoUser = {
          id: 'demo-uuid-1234',
          email: email,
          user_metadata: { full_name: email.split('@')[0] || 'Demo Account' }
        };
        this.finance.isOnboarded.set(true);
        this.showAuthPortal.set(false);
        this.currentUser.set(demoUser);
        this.currentProfile.set({ id: demoUser.id, full_name: demoUser.user_metadata.full_name, email: email });
        if (rememberMe) {
          sessionStorage.setItem('nexusfi_demo_session', JSON.stringify(demoUser));
        }
        this.showToast('Login successful! Welcome back.', 'success');
        return true;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: pass
      });

      if (error) {
        throw error;
      }

      this.finance.isOnboarded.set(true);
      this.showAuthPortal.set(false);
      this.currentUser.set(data.user);
      this.session.set(data.session);
      await this.fetchProfile(data.user.id, data.user.email);
      this.showToast('Successfully authenticated!', 'success');
      return true;
    } catch (err: any) {
      const userMsg = this.mapAuthError(err);
      this.showToast(userMsg, 'error');
      return false;
    } finally {
      this.isLoading.set(false);
    }
  }

  async signUp(fullName: string, email: string, pass: string): Promise<boolean> {
    this.isLoading.set(true);
    try {
      if (this.isPlaceholderConfig()) {
        await new Promise(r => setTimeout(r, 1200));
        const demoUser = {
          id: this.generateDeterministicUUID(email),
          email: email,
          user_metadata: { full_name: fullName }
        };
        this.finance.isOnboarded.set(false);
        this.showAuthPortal.set(false);
        this.currentUser.set(demoUser);
        this.currentProfile.set({ id: demoUser.id, full_name: fullName, email });
        sessionStorage.setItem('nexusfi_demo_session', JSON.stringify(demoUser));
        this.showToast('Account created successfully!', 'success');
        return true;
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password: pass,
        options: {
          data: {
            full_name: fullName
          }
        }
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        this.finance.isOnboarded.set(false);
        this.showAuthPortal.set(false);
        this.currentUser.set(data.user);
        this.session.set(data.session);
        await this.fetchProfile(data.user.id, email);
      }

      this.showToast('Account created successfully!', 'success');
      return true;
    } catch (err: any) {
      const userMsg = this.mapAuthError(err);
      this.showToast(userMsg, 'error');
      return false;
    } finally {
      this.isLoading.set(false);
    }
  }

  async logout() {
    this.isLoading.set(true);
    try {
      if (this.isPlaceholderConfig()) {
        sessionStorage.removeItem('nexusfi_demo_session');
      } else {
        await supabase.auth.signOut();
      }
      this.currentUser.set(null);
      this.currentProfile.set(null);
      this.session.set(null);
      this.showAuthPortal.set(false);
      this.authView.set('login');
      this.showToast('You have been logged out.', 'info');
    } catch (e) {
      console.error('Logout error:', e);
    } finally {
      this.isLoading.set(false);
    }
  }

  async logoutToLogin(toastMsg = 'Ledger initialized! Please login to continue.') {
    this.isLoading.set(true);
    try {
      if (this.isPlaceholderConfig()) {
        sessionStorage.removeItem('nexusfi_demo_session');
      } else {
        await supabase.auth.signOut();
      }
      this.currentUser.set(null);
      this.session.set(null);
      this.authView.set('login');
      this.showAuthPortal.set(true);
      this.showToast(toastMsg, 'success');
    } catch (e) {
      console.error('Logout error:', e);
    } finally {
      this.isLoading.set(false);
    }
  }

  async resetPassword(email: string): Promise<boolean> {
    this.isLoading.set(true);
    try {
      if (!email || !email.includes('@')) {
        throw new Error('invalid email');
      }
      if (this.isPlaceholderConfig()) {
        await new Promise(r => setTimeout(r, 800));
        this.showToast(`Password reset link sent to ${email} (Demo Mode)`, 'success');
        return true;
      }
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      this.showToast(`Password reset instructions sent to ${email}`, 'success');
      return true;
    } catch (err: any) {
      this.showToast(this.mapAuthError(err), 'error');
      return false;
    } finally {
      this.isLoading.set(false);
    }
  }

  showToast(message: string, type: 'success' | 'error' | 'info' = 'success') {
    const id = ++this.toastCounter;
    this.toasts.update(list => [...list, { id, message, type }]);
    setTimeout(() => {
      this.removeToast(id);
    }, 4500);
  }

  removeToast(id: number) {
    this.toasts.update(list => list.filter(t => t.id !== id));
  }

  private generateDeterministicUUID(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    let hex = '';
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i).toString(16).padStart(2, '0');
      hex += charCode;
    }
    while (hex.length < 32) {
      hex += Math.abs(hash).toString(16).padStart(8, '0');
      hash = ((hash << 5) - hash) + 12345;
    }
    hex = hex.slice(0, 32);
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-4${hex.slice(13, 16)}-a${hex.slice(17, 20)}-${hex.slice(20, 32)}`;
  }

  private mapAuthError(error: any): string {
    if (!error) return 'An unknown error occurred.';
    const msg = (typeof error === 'string' ? error : error.message || '').toLowerCase();

    if (msg.includes('invalid login credentials') || msg.includes('invalid credentials')) {
      return 'Incorrect email or password. Please verify your credentials.';
    }
    if (msg.includes('user already registered') || msg.includes('already exists')) {
      return 'An account with this email address already exists.';
    }
    if (msg.includes('password should be at least') || msg.includes('weak password') || msg.includes('at least 6')) {
      return 'Password is too weak. Please use at least 6 characters.';
    }
    if (msg.includes('invalid email') || msg.includes('validate email')) {
      return 'Please enter a valid email address.';
    }
    if (msg.includes('user not found')) {
      return 'No account found with this email. Please sign up first.';
    }
    if (msg.includes('network') || msg.includes('fetch') || msg.includes('connection')) {
      return 'Network error. Please check your internet connection.';
    }
    if (msg.includes('jwt expired') || msg.includes('session expired')) {
      return 'Your session has expired. Please sign in again.';
    }
    return error.message || 'Authentication error occurred. Please try again.';
  }
}
