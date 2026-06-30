import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceService } from '../../services/finance.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-budget-cards',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section class="select-none">
      
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 class="text-xl sm:text-2xl font-black text-white tracking-tight">Smart Budget Caps</h3>
          <p class="text-xs text-slate-400 mt-0.5">Real-time expenditure thresholds synced with your monthly cash flow</p>
        </div>
        <button 
          (click)="finance.openModal('expense')"
          class="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs flex items-center gap-2 self-start sm:self-auto transition-all">
          <app-icon name="plus" [size]="15"></app-icon>
          <span>Adjust Allocations</span>
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div 
          *ngFor="let b of finance.budgets()"
          class="glass-card p-6 relative overflow-hidden group hover:border-white/30 transition-all duration-300 flex flex-col justify-between">
          
          <!-- Title & Health Badge -->
          <div>
            <div class="flex items-center justify-between mb-4">
              <div>
                <span class="block text-lg font-black text-white tracking-tight">{{ b.category || b.name }}</span>
                <span class="text-xs text-slate-400 font-medium">Smart Cap</span>
              </div>

              <!-- Health Status Badge -->
              <span 
                [ngClass]="{
                  'bg-emerald-500/10 text-emerald-400 border-emerald-500/20': b.health === 'Optimal',
                  'bg-cyan-500/10 text-cyan-400 border-cyan-500/20': b.health === 'Moderate',
                  'bg-amber-500/10 text-amber-400 border-amber-500/20': b.health === 'Warning',
                  'bg-pink-500/10 text-pink-400 border-pink-500/20': b.health === 'Critical'
                }"
                class="px-2.5 py-1 rounded-full text-[10px] font-extrabold border">
                {{ b.health }}
              </span>
            </div>

            <!-- Spend vs Cap Values -->
            <div class="flex items-baseline justify-between mb-3">
              <span class="text-3xl font-black text-white">₹ {{ b.spent | number:'1.2-2' }}</span>
              <span class="text-sm font-bold text-slate-400">/ ₹ {{ b.limit | number:'1.0-0' }} cap</span>
            </div>
          </div>

          <!-- Animated Progress Bar -->
          <div class="mt-2">
            <div class="w-full h-3 rounded-full bg-white/10 overflow-hidden relative">
              <div 
                class="h-full rounded-full transition-all duration-700 ease-spring"
                [style.width.%]="Math.min(100, (b.spent / b.limit) * 100)"
                [style.background-color]="b.color"
                [style.box-shadow]="'0 0 12px ' + b.color">
              </div>
            </div>

            <div class="flex items-center justify-between mt-3 text-xs font-bold text-slate-400">
              <span>{{ ((b.spent / b.limit) * 100) | number:'1.0-0' }}% utilized</span>
              <span>₹ {{ (b.limit - b.spent) > 0 ? ((b.limit - b.spent) | number:'1.2-2') : 0 }} remaining</span>
            </div>
          </div>

        </div>

      </div>

    </section>
  `
})
export class BudgetCardsComponent {
  finance = inject(FinanceService);
  Math = Math;
}
