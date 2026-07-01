import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FinanceService } from '../../services/finance.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <div class="min-h-screen flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      
      <!-- Ambient Glows -->
      <div class="absolute -top-32 -right-32 size-96 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-32 -left-32 size-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <!-- Glassmorphism Card Container -->
      <div class="w-full max-w-md backdrop-blur-2xl bg-[#0f142a]/80 border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10">
        
        <!-- Brand Header -->
        <div class="text-center mb-8">
          <div class="size-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-cyan-500/25">
            <app-icon name="user" [size]="28"></app-icon>
          </div>
          <h1 class="text-2xl sm:text-3xl font-black text-white tracking-tight">Create Account</h1>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Start tracking expenses and managing wealth intelligently</p>
        </div>

        <!-- Sign Up Form -->
        <form (ngSubmit)="onSubmit()" #signupForm="ngForm" class="space-y-4" novalidate>
          
          <!-- Full Name Field -->
          <div>
            <label for="signup-fullname" class="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-1.5">
              Full Name
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <app-icon name="user" [size]="18"></app-icon>
              </div>
              <input 
                id="signup-fullname"
                type="text"
                [(ngModel)]="fullName"
                name="fullName"
                required
                placeholder="Alex Morgan"
                aria-label="Full Name"
                [attr.aria-invalid]="fullNameError() ? 'true' : 'false'"
                (input)="fullNameError.set('')"
                class="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/5 border text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                [ngClass]="fullNameError() ? 'border-red-500/80 bg-red-500/5' : 'border-white/10 focus:border-purple-500'"
              />
            </div>
            <p *ngIf="fullNameError()" class="text-red-400 text-xs font-bold mt-1.5 flex items-center gap-1">
              <span>⚠️</span> {{ fullNameError() }}
            </p>
          </div>

          <!-- Email Field -->
          <div>
            <label for="signup-email" class="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-1.5">
              Email Address
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <app-icon name="mail" [size]="18"></app-icon>
              </div>
              <input 
                id="signup-email"
                type="email"
                [(ngModel)]="email"
                name="email"
                required
                placeholder="you@example.com"
                aria-label="Email Address"
                [attr.aria-invalid]="emailError() ? 'true' : 'false'"
                (input)="emailError.set('')"
                class="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/5 border text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                [ngClass]="emailError() ? 'border-red-500/80 bg-red-500/5' : 'border-white/10 focus:border-purple-500'"
              />
            </div>
            <p *ngIf="emailError()" class="text-red-400 text-xs font-bold mt-1.5 flex items-center gap-1">
              <span>⚠️</span> {{ emailError() }}
            </p>
          </div>

          <!-- Password Field -->
          <div>
            <label for="signup-password" class="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-1.5">
              Password
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <app-icon name="lock" [size]="18"></app-icon>
              </div>
              <input 
                id="signup-password"
                [type]="showPassword() ? 'text' : 'password'"
                [(ngModel)]="password"
                name="password"
                required
                placeholder="At least 6 characters"
                aria-label="Password"
                [attr.aria-invalid]="passwordError() ? 'true' : 'false'"
                (input)="passwordError.set('')"
                class="w-full pl-10 pr-12 py-3 rounded-2xl bg-white/5 border text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
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

          <!-- Confirm Password Field -->
          <div>
            <label for="signup-confirm-password" class="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-1.5">
              Confirm Password
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <app-icon name="lock" [size]="18"></app-icon>
              </div>
              <input 
                id="signup-confirm-password"
                [type]="showConfirmPassword() ? 'text' : 'password'"
                [(ngModel)]="confirmPassword"
                name="confirmPassword"
                required
                placeholder="Re-enter password"
                aria-label="Confirm Password"
                [attr.aria-invalid]="confirmPasswordError() ? 'true' : 'false'"
                (input)="confirmPasswordError.set('')"
                class="w-full pl-10 pr-12 py-3 rounded-2xl bg-white/5 border text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                [ngClass]="confirmPasswordError() ? 'border-red-500/80 bg-red-500/5' : 'border-white/10 focus:border-purple-500'"
              />
              <button 
                type="button"
                (click)="showConfirmPassword.set(!showConfirmPassword())"
                aria-label="Show or hide confirm password"
                class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors">
                <app-icon [name]="showConfirmPassword() ? 'eye-off' : 'eye'" [size]="18"></app-icon>
              </button>
            </div>
            <p *ngIf="confirmPasswordError()" class="text-red-400 text-xs font-bold mt-1.5 flex items-center gap-1">
              <span>⚠️</span> {{ confirmPasswordError() }}
            </p>
          </div>

          <!-- Submit Create Account Button -->
          <button 
            type="submit"
            [disabled]="auth.isLoading()"
            class="w-full mt-2 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 disabled:opacity-50 text-white font-extrabold text-sm tracking-wide shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer">
            <app-icon *ngIf="auth.isLoading()" name="loader" [size]="18" class="animate-spin"></app-icon>
            <span>{{ auth.isLoading() ? 'Creating Account...' : 'Create Account' }}</span>
          </button>

        </form>

        <!-- Link back to Login -->
        <div class="mt-8 pt-6 border-t border-white/10 text-center">
          <p class="text-xs sm:text-sm text-slate-400">
            Already have an account? 
            <button 
              type="button"
              (click)="auth.authView.set('login')"
              class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 hover:opacity-80 underline-offset-4 hover:underline ml-1">
              Sign In
            </button>
          </p>
        </div>

      </div>
    </div>
  `
})
export class SignupComponent {
  auth = inject(AuthService);
  finance = inject(FinanceService);

  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';

  showPassword = signal<boolean>(false);
  showConfirmPassword = signal<boolean>(false);

  fullNameError = signal<string>('');
  emailError = signal<string>('');
  passwordError = signal<string>('');
  confirmPasswordError = signal<string>('');

  validate(): boolean {
    let isValid = true;
    this.fullNameError.set('');
    this.emailError.set('');
    this.passwordError.set('');
    this.confirmPasswordError.set('');

    if (!this.fullName.trim()) {
      this.fullNameError.set('Full Name is required');
      isValid = false;
    }

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
    } else if (this.password.length < 6) {
      this.passwordError.set('Password must be at least 6 characters');
      isValid = false;
    }

    if (!this.confirmPassword) {
      this.confirmPasswordError.set('Please confirm your password');
      isValid = false;
    } else if (this.password !== this.confirmPassword) {
      this.confirmPasswordError.set('Passwords do not match');
      isValid = false;
    }

    return isValid;
  }

  async onSubmit() {
    if (!this.validate()) return;
    const success = await this.auth.signUp(this.fullName.trim(), this.email.trim(), this.password);
    if (success) {
      if (this.auth.currentUser()) {
        this.finance.isOnboarded.set(false);
        this.auth.showAuthPortal.set(false);
      } else {
        this.auth.authView.set('login');
      }
    }
  }
}
