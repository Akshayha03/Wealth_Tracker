import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceService } from '../../services/finance.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-hero-cards',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 select-none items-stretch">
      
      <!-- Card 1: Income (formerly Verified Inflow) -->
      <div class="glass-card p-6 group relative overflow-hidden flex flex-col justify-between">
        <div class="absolute -right-8 -top-8 size-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-300"></div>
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="text-xs font-extrabold text-slate-400 tracking-wider uppercase">Income</span>
            <div class="size-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-sm shrink-0">
              <app-icon name="arrow-down-left" [size]="18"></app-icon>
            </div>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="text-2xl xl:text-3xl font-black text-white tracking-tight truncate">
              ₹ {{ finance.totalIncome() | number:'1.2-2' }}
            </span>
          </div>
        </div>
        <div class="flex items-center gap-2 mt-4 pt-4 border-t border-white/5 text-xs font-bold text-emerald-400">
          <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shrink-0">
            Active Sync
          </span>
          <span class="text-slate-400 font-medium truncate">salary verified</span>
        </div>
      </div>

      <!-- Card 2: Liquid Net Balance -->
      <div class="glass-card p-6 group relative overflow-hidden flex flex-col justify-between">
        <div class="absolute -right-8 -top-8 size-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-300"></div>
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="text-xs font-extrabold text-slate-400 tracking-wider uppercase">Liquid Net Balance</span>
            <div class="size-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-sm shrink-0">
              <app-icon name="wallet" [size]="18"></app-icon>
            </div>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="text-2xl xl:text-3xl font-black text-white tracking-tight truncate">
              ₹ {{ finance.netBalance() | number:'1.2-2' }}
            </span>
          </div>
        </div>
        <div class="flex items-center gap-2 mt-4 pt-4 border-t border-white/5 text-xs font-bold text-emerald-400">
          <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shrink-0">
            +14.2%
          </span>
          <span class="text-slate-400 font-medium truncate">vs prior month</span>
        </div>
      </div>

      <!-- Card 3: Expenditure (formerly Total Outflow) -->
      <div class="glass-card p-6 group relative overflow-hidden flex flex-col justify-between">
        <div class="absolute -right-8 -top-8 size-32 bg-pink-500/10 rounded-full blur-2xl group-hover:bg-pink-500/20 transition-all duration-300"></div>
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="text-xs font-extrabold text-slate-400 tracking-wider uppercase">Expenditure</span>
            <div class="size-10 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shadow-sm shrink-0">
              <app-icon name="arrow-up-right" [size]="18"></app-icon>
            </div>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="text-2xl xl:text-3xl font-black text-white tracking-tight truncate">
              ₹ {{ finance.totalExpenses() | number:'1.2-2' }}
            </span>
          </div>
        </div>
        <div class="flex items-center gap-2 mt-4 pt-4 border-t border-white/5 text-xs font-bold text-pink-400">
          <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-pink-500/10 border border-pink-500/20 shrink-0">
            Optimal
          </span>
          <span class="text-slate-400 font-medium truncate">within threshold</span>
        </div>
      </div>

      <!-- Card 4: Financial Health Score -->
      <div class="glass-card p-6 group relative overflow-hidden bg-gradient-to-br from-purple-900/40 via-indigo-900/20 to-transparent border-purple-500/30 flex flex-col justify-between">
        <div class="absolute -right-8 -top-8 size-32 bg-purple-500/20 rounded-full blur-2xl animate-pulse"></div>
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="text-xs font-extrabold text-purple-300 tracking-wider uppercase">Financial Health Score</span>
            <div class="size-10 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-sm shadow-purple-500/30 shrink-0">
              <app-icon name="award" [size]="18"></app-icon>
            </div>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="text-2xl xl:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 tracking-tight truncate">
              96<span class="text-lg text-slate-400 font-bold">/100</span>
            </span>
          </div>
        </div>
        <div class="flex items-center gap-2 mt-4 pt-4 border-t border-white/5 text-xs font-bold text-cyan-300">
          <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 shrink-0">
            OPTIMAL
          </span>
          <span class="text-slate-300 font-medium truncate">Top discipline</span>
        </div>
      </div>

    </section>
  `
})
export class HeroCardsComponent {
  finance = inject(FinanceService);
}
