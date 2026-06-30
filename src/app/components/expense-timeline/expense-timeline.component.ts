import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceService } from '../../services/finance.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-expense-timeline',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section class="glass-card p-6 sm:p-8 select-none">
      
      <!-- Ledger Header & Category Pills -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
        <div>
          <h3 class="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <span>Real-Time Transaction Ledger</span>
          </h3>
          <p class="text-xs text-slate-400 mt-0.5">Verified incoming credits and outgoing debit activity</p>
        </div>

        <!-- Filter Pills -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          <button 
            *ngFor="let filter of filters"
            (click)="setFilter(filter)"
            [class.bg-purple-600]="finance.selectedFilter() === filter"
            [class.text-white]="finance.selectedFilter() === filter"
            [class.bg-white/5]="finance.selectedFilter() !== filter"
            [class.text-slate-400]="finance.selectedFilter() !== filter"
            class="px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shrink-0 hover:bg-white/10">
            {{ filter }}
          </button>
        </div>
      </div>

      <!-- Transactions List -->
      <div class="space-y-4">
        
        <div 
          *ngFor="let tx of filteredTransactions()"
          class="p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
          
          <div class="flex items-center gap-4">
            
            <div 
              [style.background-color]="(tx.color || '#a855f7') + '20'"
              [style.color]="tx.color || '#a855f7'"
              [style.border-color]="(tx.color || '#a855f7') + '40'"
              class="size-12 rounded-2xl border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-md">
              <app-icon [name]="tx.icon || 'credit-card'" [size]="22"></app-icon>
            </div>

            <div>
              <div class="flex items-center gap-2">
                <span class="font-black text-base text-white tracking-tight">{{ tx.title || tx.merchant }}</span>
                <span *ngIf="tx.tag" class="text-[10px] font-extrabold px-2 py-0.5 rounded bg-white/10 text-slate-300">
                  {{ tx.tag }}
                </span>
              </div>
              <div class="flex items-center gap-2 mt-1 text-xs text-slate-400 font-medium">
                <span>{{ tx.merchant }}</span>
                <span>·</span>
                <span class="text-purple-300 font-bold">{{ tx.category }}</span>
                <span>·</span>
                <span>{{ tx.date }}</span>
              </div>
            </div>

          </div>

          <!-- Amount & Actions -->
          <div class="flex items-center justify-between sm:justify-end gap-5 self-end sm:self-auto w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5">
            <span 
              [class.text-emerald-400]="tx.amount > 0"
              [class.text-white]="tx.amount <= 0"
              class="text-xl font-black tracking-tight">
              {{ tx.amount > 0 ? '+' : '' }}₹ {{ Math.abs(tx.amount) | number:'1.2-2' }}
            </span>

            <button 
              (click)="finance.deleteTransaction(tx.id)"
              title="Delete Transaction"
              class="size-8 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
              <app-icon name="trash-2" [size]="16"></app-icon>
            </button>
          </div>

        </div>

        <div *ngIf="filteredTransactions().length === 0" class="py-12 text-center text-slate-400">
          <app-icon name="inbox" [size]="40" class="mx-auto mb-3 opacity-30"></app-icon>
          <p class="font-bold">No transactions found for this filter.</p>
        </div>

      </div>

    </section>
  `
})
export class ExpenseTimelineComponent {
  finance = inject(FinanceService);
  Math = Math;

  filters: ('ALL' | 'expense' | 'income' | 'investment')[] = ['ALL', 'expense', 'income'];

  setFilter(f: 'ALL' | 'expense' | 'income' | 'investment') {
    this.finance.selectedFilter.set(f);
  }

  filteredTransactions() {
    const filter = this.finance.selectedFilter();
    const query = this.finance.searchQuery().toLowerCase().trim();
    let list = this.finance.transactions();

    if (filter !== 'ALL') {
      list = list.filter(t => t.type === filter);
    }

    if (query) {
      list = list.filter(t => 
        (t.title && t.title.toLowerCase().includes(query)) ||
        (t.merchant && t.merchant.toLowerCase().includes(query)) ||
        (t.category && t.category.toLowerCase().includes(query))
      );
    }

    return list;
  }
}
