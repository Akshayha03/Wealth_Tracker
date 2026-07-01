import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FinanceService } from '../../services/finance.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <div class="min-h-screen flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      
      <!-- Ambient Glows -->
      <div class="absolute -top-32 -left-32 size-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-32 -right-32 size-96 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <!-- Glassmorphism Card Container -->
      <div class="w-full max-w-md backdrop-blur-2xl bg-[#0f142a]/80 border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10">
        
        <!-- Brand Header -->
        <div class="text-center mb-8">
          <div class="size-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-purple-500/25">
            <app-icon name="wallet" [size]="28"></app-icon>
          </div>
          <h1 class="text-2xl sm:text-3xl font-black text-white tracking-tight">Welcome Manager</h1>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Sign in to manage your expense tracker & wealth OS</p>
        </div>

        <!-- Login Form -->
        <form (ngSubmit)="onSubmit()" #loginForm="ngForm" class="space-y-5" novalidate>
          
          <!-- Email Field -->
          <div>
            <label for="login-email" class="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-2">
              Email Address
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <app-icon name="mail" [size]="18"></app-icon>
              </div>
              <input 
                id="login-email"
                type="email"
                [(ngModel)]="email"
                name="email"
                required
                email
                placeholder="you@example.com"
                aria-label="Email Address"
                [attr.aria-invalid]="emailError() ? 'true' : 'false'"
                (input)="emailError.set('')"
                class="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-white/5 border text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                [ngClass]="emailError() ? 'border-red-500/80 bg-red-500/5' : 'border-white/10 focus:border-purple-500'"
              />
            </div>
            <p *ngIf="emailError()" class="text-red-400 text-xs font-bold mt-1.5 flex items-center gap-1">
              <span>⚠️</span> {{ emailError() }}
            </p>
          </div>

          <!-- Password Field -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label for="login-password" class="block text-xs font-extrabold uppercase tracking-wider text-slate-300">
                Password
              </label>
              <button 
                type="button"
                (click)="auth.authView.set('forgot')"
                class="text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors">
                Forgot Password?
              </button>
            </div>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <app-icon name="lock" [size]="18"></app-icon>
              </div>
              <input 
                id="login-password"
                [type]="showPassword() ? 'text' : 'password'"
                [(ngModel)]="password"
                name="password"
                required
                placeholder="••••••••"
                aria-label="Password"
                [attr.aria-invalid]="passwordError() ? 'true' : 'false'"
                (input)="passwordError.set('')"
                class="w-full pl-10 pr-12 py-3.5 rounded-2xl bg-white/5 border text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                [ngClass]="passwordError() ? 'border-red-500/80 bg-red-500/5' : 'border-white/10 focus:border-purple-500'"
              />
              <button 
                type="button"
                (click)="showPassword.set(!showPassword())"
                aria-label="Show or hide password"
                class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors">
                <app-icon [name]="showPassword() ? 'eye-off' : 'eye'" [size]="18"></app-icon>
              </button>
            </div>
            <p *ngIf="passwordError()" class="text-red-400 text-xs font-bold mt-1.5 flex items-center gap-1">
              <span>⚠️</span> {{ passwordError() }}
            </p>
          </div>

          <!-- Remember Me Checkbox -->
          <div class="flex items-center justify-between pt-1">
            <label class="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-300 select-none">
              <input 
                type="checkbox"
                [(ngModel)]="rememberMe"
                name="rememberMe"
                class="size-4 rounded accent-purple-500 bg-white/10 border-white/20 cursor-pointer"
              />
              <span>Remember me for 30 days</span>
            </label>
          </div>

          <!-- Submit Login Button -->
          <button 
            type="submit"
            [disabled]="auth.isLoading()"
            class="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 disabled:opacity-50 text-white font-extrabold text-sm tracking-wide shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer">
            <app-icon *ngIf="auth.isLoading()" name="loader" [size]="18" class="animate-spin"></app-icon>
            <span>{{ auth.isLoading() ? 'Authenticating...' : 'Sign In' }}</span>
          </button>

        </form>

        <!-- Switch to Sign Up -->
        <div class="mt-8 pt-6 border-t border-white/10 text-center">
          <p class="text-xs sm:text-sm text-slate-400">
            Don't have an account? 
            <button 
              type="button"
              (click)="auth.authView.set('signup')"
              class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 hover:opacity-80 underline-offset-4 hover:underline ml-1">
              Sign Up
            </button>
          </p>
        </div>

      </div>
    </div>
  `
})
export class LoginComponent {
  auth = inject(AuthService);
  finance = inject(FinanceService);

  email = '';
  password = '';
  rememberMe = true;

  showPassword = signal<boolean>(false);
  emailError = signal<string>('');
  passwordError = signal<string>('');

  validate(): boolean {
    let isValid = true;
    this.emailError.set('');
    this.passwordError.set('');

    if (!this.email.trim()) {
      this.emailError.set('Email is required');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email.trim())) {
      this.emailError.set('Please enter a valid email address');
      isValid = false;
    }

    if (!this.password) {
      this.passwordError.set('Password is required');
      isValid = false;
    }

    return isValid;
  }

  async onSubmit() {
    if (!this.validate()) return;
    const success = await this.auth.login(this.email.trim(), this.password, this.rememberMe);
    if (success && this.auth.currentUser()) {
      const user = this.auth.currentUser();
      const userId = user.id || user.email || 'default';
      const profile = this.auth.currentProfile();
      const targetName = profile?.full_name || user.user_metadata?.full_name || this.email.trim().split('@')[0];
      this.finance.loadUserSession(userId, targetName);
      this.auth.showAuthPortal.set(false);
    }
  }
}
