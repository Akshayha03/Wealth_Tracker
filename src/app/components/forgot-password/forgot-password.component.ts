import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <div class="min-h-screen flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      
      <!-- Ambient Glows -->
      <div class="absolute -top-32 left-1/2 -translate-x-1/2 size-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <!-- Glassmorphism Card Container -->
      <div class="w-full max-w-md backdrop-blur-2xl bg-[#0f142a]/80 border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10">
        
        <div class="text-center mb-8">
          <div class="size-14 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 mx-auto mb-4 shadow-lg shadow-purple-500/20">
            <app-icon name="mail" [size]="28"></app-icon>
          </div>
          <h1 class="text-2xl sm:text-3xl font-black text-white tracking-tight">Reset Password</h1>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Enter your email and we'll send reset instructions</p>
        </div>

        <form (ngSubmit)="onSubmit()" #forgotForm="ngForm" class="space-y-5" novalidate>
          
          <div>
            <label for="forgot-email" class="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-2">
              Email Address
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <app-icon name="mail" [size]="18"></app-icon>
              </div>
              <input 
                id="forgot-email"
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

          <button 
            type="submit"
            [disabled]="auth.isLoading()"
            class="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 disabled:opacity-50 text-white font-extrabold text-sm tracking-wide shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer">
            <app-icon *ngIf="auth.isLoading()" name="loader" [size]="18" class="animate-spin"></app-icon>
            <span>{{ auth.isLoading() ? 'Sending Instructions...' : 'Send Reset Link' }}</span>
          </button>

        </form>

        <div class="mt-8 pt-6 border-t border-white/10 text-center">
          <button 
            type="button"
            (click)="auth.authView.set('login')"
            class="text-xs sm:text-sm font-bold text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-2 mx-auto">
            <span>← Back to Sign In</span>
          </button>
        </div>

      </div>
    </div>
  `
})
export class ForgotPasswordComponent {
  auth = inject(AuthService);
  email = '';
  emailError = signal<string>('');

  async onSubmit() {
    this.emailError.set('');
    if (!this.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email.trim())) {
      this.emailError.set('Please enter a valid email address');
      return;
    }
    const success = await this.auth.resetPassword(this.email.trim());
    if (success) {
      setTimeout(() => this.auth.authView.set('login'), 2500);
    }
  }
}
