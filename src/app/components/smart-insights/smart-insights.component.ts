import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceService } from '../../services/finance.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-smart-insights',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section class="glass-card p-6 sm:p-8 relative overflow-hidden select-none">
      
      <!-- Top Section Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div class="flex items-center gap-3.5">
          <div class="size-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 shrink-0">
            <app-icon name="sparkles" [size]="22"></app-icon>
          </div>
          <div>
            <div class="flex items-center gap-2.5">
              <h3 class="text-xl font-black text-white tracking-tight">Smart Financial Insights</h3>
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-pink-300 border border-pink-500/30">
                LIVE ANALYTICS
              </span>
            </div>
            <p class="text-xs text-slate-400 mt-0.5">Automated recommendations derived from your verified cash flow</p>
          </div>
        </div>

        <div class="flex items-center gap-2 self-end sm:self-auto">
          <button 
            (click)="finance.prevInsight()"
            class="size-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all">
            <app-icon name="chevron-left" [size]="18"></app-icon>
          </button>
          <span class="text-xs font-bold text-slate-400 px-2">
            {{ finance.activeInsightIndex() + 1 }} / {{ finance.insights().length }}
          </span>
          <button 
            (click)="finance.nextInsight()"
            class="size-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all">
            <app-icon name="chevron-right" [size]="18"></app-icon>
          </button>
        </div>
      </div>

      <!-- Active Insight Highlight Banner -->
      <div *ngIf="finance.activeInsight() as insight" class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-white/10 via-white/5 to-transparent p-6 sm:p-8 border border-white/15 shadow-2xl transition-all duration-500 ease-spring">
        <div class="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-purple-500/10 to-transparent pointer-events-none"></div>
        
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div class="flex items-start gap-5 flex-1">
            
            <div 
              [ngClass]="{
                'bg-emerald-500/20 border-emerald-500/30 text-emerald-400': insight.type === 'savings',
                'bg-cyan-500/20 border-cyan-500/30 text-cyan-400': insight.type === 'investment',
                'bg-pink-500/20 border-pink-500/30 text-pink-400': insight.type === 'alert' || insight.type === 'recommendation'
              }"
              class="size-14 rounded-2xl border flex items-center justify-center shrink-0 shadow-lg">
              <app-icon *ngIf="insight.type === 'savings'" name="shield-check" [size]="26"></app-icon>
              <app-icon *ngIf="insight.type === 'investment'" name="flame" [size]="26"></app-icon>
              <app-icon *ngIf="insight.type === 'alert' || insight.type === 'recommendation'" name="zap" [size]="26"></app-icon>
            </div>

            <div>
              <div class="flex items-center gap-2 mb-2">
                <span class="text-xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded bg-white/10 text-white">
                  {{ insight.category }}
                </span>
                <span class="text-xs font-bold text-purple-300">Confidence: {{ insight.impact }}</span>
              </div>
              <h4 class="text-xl sm:text-2xl font-black text-white tracking-tight mb-2.5">
                {{ insight.title }}
              </h4>
              <p class="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
                {{ insight.description }}
              </p>
            </div>

          </div>

          <button class="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold text-sm flex items-center justify-center gap-2.5 shrink-0 transition-all shadow-lg hover:scale-105 active:scale-95">
            <span>Execute Action</span>
            <app-icon name="arrow-right" [size]="18"></app-icon>
          </button>
        </div>
      </div>

      <!-- Quick Recommendations Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div class="glass-panel p-5 flex items-center justify-between hover:border-purple-500/40 transition-all cursor-pointer group">
          <div class="flex items-center gap-3.5">
            <div class="size-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform shrink-0">
              <app-icon name="zap" [size]="18"></app-icon>
            </div>
            <div>
              <span class="block font-black text-sm text-white">Optimize Subscription Stack</span>
              <span class="text-xs text-slate-400">Est. ₹ 840 / mo yield</span>
            </div>
          </div>
          <span class="text-sm font-extrabold text-purple-400 group-hover:translate-x-1 transition-transform">→</span>
        </div>

        <div class="glass-panel p-5 flex items-center justify-between hover:border-cyan-500/40 transition-all cursor-pointer group">
          <div class="flex items-center gap-3.5">
            <div class="size-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform shrink-0">
              <app-icon name="shield-check" [size]="18"></app-icon>
            </div>
            <div>
              <span class="block font-black text-sm text-white">Automate Tax Harvesting</span>
              <span class="text-xs text-slate-400">Section 80C check</span>
            </div>
          </div>
          <span class="text-sm font-extrabold text-cyan-400 group-hover:translate-x-1 transition-transform">→</span>
        </div>

        <div class="glass-panel p-5 flex items-center justify-between hover:border-pink-500/40 transition-all cursor-pointer group">
          <div class="flex items-center gap-3.5">
            <div class="size-10 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform shrink-0">
              <app-icon name="flame" [size]="18"></app-icon>
            </div>
            <div>
              <span class="block font-black text-sm text-white">Liquid FD Allocation</span>
              <span class="text-xs text-slate-400">Shift surplus funds</span>
            </div>
          </div>
          <span class="text-sm font-extrabold text-pink-400 group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>

    </section>
  `
})
export class SmartInsightsComponent {
  finance = inject(FinanceService);
}
