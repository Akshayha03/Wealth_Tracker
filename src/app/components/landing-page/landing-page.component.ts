import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinanceService } from '../../services/finance.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <div class="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 relative select-none overflow-hidden">
      
      <!-- Top Brand Navigation -->
      <header class="absolute top-0 inset-x-0 p-6 flex items-center justify-between max-w-7xl mx-auto w-full z-20">
        <div class="flex items-center gap-3">
          <div class="size-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <app-icon name="zap" class="text-white" [size]="22"></app-icon>
          </div>
          <span class="text-xl font-black tracking-tight text-white">
            NEXUS<span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">FI</span>
          </span>
        </div>

        <span class="px-3 py-1 rounded-full text-xs font-extrabold bg-purple-500/10 text-purple-300 border border-purple-500/30">
          WEALTH OS v2.5
        </span>
      </header>

      <!-- Main Landing Hero State -->
      <main *ngIf="!showTrackModal" class="max-w-4xl mx-auto text-center z-10 py-12 animate-fade-in">
        
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 mb-8 shadow-lg shadow-cyan-500/10">
          <span class="size-2 rounded-full bg-cyan-400 animate-ping"></span>
          REAL-TIME WEALTH TELEMETRY
        </div>

        <h1 class="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none mb-6">
          Personal Finance, <br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 animate-pulse">
            Re-Engineered for Speed.
          </span>
        </h1>

        <p class="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed mb-10">
          Ditch clunky bank spreadsheets. Experience ultra-fast telemetry, real-time UPI tracking, and custom budget limits tailored to your exact cash flow.
        </p>

        <!-- The Track Button -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            (click)="showTrackModal = true"
            class="w-full sm:w-auto px-8 py-5 rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:opacity-95 text-white font-black text-lg tracking-wide shadow-[0_0_40px_rgba(168,85,247,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 group">
            <span>Track My Wealth</span>
            <app-icon name="arrow-right" [size]="22" class="group-hover:translate-x-1 transition-transform"></app-icon>
          </button>
        </div>

        <!-- Feature Pills below -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 text-left max-w-3xl mx-auto">
          <div class="glass-panel p-5">
            <app-icon name="cpu" class="text-purple-400 mb-3" [size]="24"></app-icon>
            <h4 class="font-black text-white text-base mb-1">UPI & Card Ready</h4>
            <p class="text-xs text-slate-400">Streamlined logging across Swiggy, Zomato & salary flows</p>
          </div>
          <div class="glass-panel p-5">
            <app-icon name="shield-check" class="text-cyan-400 mb-3" [size]="24"></app-icon>
            <h4 class="font-black text-white text-base mb-1">Zero Clutter</h4>
            <p class="text-xs text-slate-400">Tailored starting balance in INR & multi-persona sync</p>
          </div>
          <div class="glass-panel p-5">
            <app-icon name="flame" class="text-pink-400 mb-3" [size]="24"></app-icon>
            <h4 class="font-black text-white text-base mb-1">Live Telemetry</h4>
            <p class="text-xs text-slate-400">Interactive Chart.js flow & instant budget caps</p>
          </div>
        </div>

      </main>

      <!-- Onboarding Modal Card (Triggered by Track Button) -->
      <div *ngIf="showTrackModal" class="glass-card max-w-xl w-full p-6 sm:p-10 z-20 relative animate-fade-in shadow-[0_20px_60px_rgba(0,0,0,0.8)] border-purple-500/50">
        <div class="absolute -top-32 -right-32 size-64 bg-purple-600/30 rounded-full blur-3xl pointer-events-none"></div>

        <div class="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div>
            <h3 class="text-2xl font-black text-white tracking-tight">Initialize Your Ledger</h3>
            <p class="text-xs text-purple-300 font-semibold">Assign persona profile & monthly cash flow</p>
          </div>
          <button (click)="showTrackModal = false" class="size-8 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all">
            <app-icon name="x" [size]="18"></app-icon>
          </button>
        </div>

        <div class="space-y-6 text-left">
          
          <!-- Name Input -->
          <div>
            <label class="block text-xs font-black uppercase tracking-wider text-slate-300 mb-2">1. What's your name?</label>
            <input 
              type="text" 
              [(ngModel)]="userName" 
              placeholder="e.g. Elena or Alex" 
              class="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/15 text-base font-bold text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
          </div>

          <!-- Income Input -->
          <div>
            <label class="block text-xs font-black uppercase tracking-wider text-slate-300 mb-2">2. Monthly Verified Income (₹ INR)</label>
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-black text-lg">₹</span>
              <input 
                type="number" 
                [(ngModel)]="userIncome" 
                placeholder="75000" 
                class="w-full pl-10 pr-5 py-4 rounded-2xl bg-white/5 border border-white/15 text-base font-bold text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>
          </div>

          <!-- Avatar Picker -->
          <div>
            <label class="block text-xs font-black uppercase tracking-wider text-slate-300 mb-3">3. Select Your Persona Avatar</label>
            <div class="grid grid-cols-3 sm:grid-cols-6 gap-3">
              <div 
                *ngFor="let av of finance.availableAvatars"
                (click)="selectedAvatar = av.url"
                [class.border-purple-500]="selectedAvatar === av.url"
                [class.ring-4]="selectedAvatar === av.url"
                [class.ring-purple-500/30]="selectedAvatar === av.url"
                [class.scale-105]="selectedAvatar === av.url"
                [class.border-white/10]="selectedAvatar !== av.url"
                class="cursor-pointer rounded-2xl p-1 bg-white/5 border transition-all flex flex-col items-center group relative">
                
                <img [src]="av.url" [alt]="av.label" class="size-12 sm:size-14 rounded-xl object-cover" />
                <span class="text-[9px] font-extrabold text-slate-300 mt-1.5 truncate w-full text-center">{{ av.label }}</span>
              </div>
            </div>
          </div>

          <!-- Launch Button -->
          <button 
            (click)="onLaunch()"
            class="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:opacity-90 text-white font-black text-base shadow-xl shadow-purple-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4">
            <span>Launch Wealth OS</span>
            <app-icon name="sparkles" [size]="18"></app-icon>
          </button>

        </div>
      </div>

    </div>
  `
})
export class LandingPageComponent {
  finance = inject(FinanceService);

  showTrackModal = false;
  userName = '';
  userIncome: number | null = 75000;
  selectedAvatar = this.finance.availableAvatars[0].url;

  onLaunch() {
    this.finance.completeOnboarding(
      this.userName || 'Explorer',
      this.userIncome || 75000,
      this.selectedAvatar
    );
  }
}
