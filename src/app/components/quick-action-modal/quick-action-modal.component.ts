import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinanceService } from '../../services/finance.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-quick-action-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <!-- Floating Action Button (FAB) -->
    <button 
      (click)="finance.openModal('expense')"
      class="fixed bottom-24 right-6 lg:bottom-8 lg:right-8 z-40 size-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 text-white flex items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:scale-110 active:scale-95 transition-all duration-300">
      <app-icon name="plus" [size]="26"></app-icon>
    </button>

    <!-- Modal Backdrop & Dialog -->
    <div 
      *ngIf="finance.isModalOpen()" 
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in select-none">
      
      <div class="bg-[#0c0e1d] border border-white/10 w-full max-w-md rounded-[28px] p-6 sm:p-7 relative overflow-hidden shadow-2xl text-left">
        
        <!-- Header -->
        <div class="flex items-center justify-between pb-3 mb-5">
          <h3 class="text-2xl font-extrabold text-white tracking-tight">Log a transaction</h3>
          <button 
            (click)="finance.closeModal()"
            class="text-slate-400 hover:text-white p-1 transition-all">
            <app-icon name="x" [size]="22"></app-icon>
          </button>
        </div>

        <!-- 4 Type Tabs -->
        <div class="grid grid-cols-4 gap-2 mb-6">
          <button 
            *ngFor="let t of tabs"
            (click)="setTab(t)"
            [ngClass]="{
              'bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-extrabold shadow-lg shadow-purple-500/25 border border-purple-400/40': finance.modalTab() === t,
              'bg-white/5 text-slate-400 font-bold hover:bg-white/10 border border-white/5': finance.modalTab() !== t
            }"
            class="py-2.5 rounded-xl text-xs capitalize transition-all duration-200">
            {{ t }}
          </button>
        </div>

        <!-- Form Elements -->
        <div class="space-y-5">
          
          <!-- AMOUNT -->
          <div>
            <label class="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2">AMOUNT</label>
            <div class="flex items-center justify-between px-4 py-3.5 rounded-2xl bg-[#141629] border border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.25)] transition-all">
              <div class="flex items-center gap-2.5 flex-1">
                <span class="text-slate-400 font-bold text-lg">₹</span>
                <input 
                  type="number" 
                  [(ngModel)]="amount" 
                  placeholder="0.00" 
                  class="w-full bg-transparent text-lg font-extrabold text-white placeholder-slate-500 focus:outline-none"
                />
              </div>
              <div class="text-slate-400 text-xs font-bold">INR</div>
            </div>
          </div>

          <!-- CATEGORY & METHOD (2 columns) -->
          <div class="grid grid-cols-2 gap-3.5">
            <div>
              <label class="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2">CATEGORY</label>
              <div class="relative">
                <select 
                  [(ngModel)]="category" 
                  class="w-full pl-8 pr-3 py-3 rounded-2xl bg-[#141629] border border-white/10 text-sm font-bold text-white focus:outline-none focus:border-purple-500 appearance-none transition-all">
                  <option *ngFor="let cat of finance.categories" [value]="cat">{{ cat }}</option>
                </select>
                <span class="absolute left-3 top-1/2 -translate-y-1/2 size-2 rounded-full bg-purple-400 pointer-events-none"></span>
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2">METHOD</label>
              <select 
                [(ngModel)]="method" 
                class="w-full px-4 py-3 rounded-2xl bg-[#141629] border border-white/10 text-sm font-bold text-white focus:outline-none focus:border-purple-500 transition-all">
                <option value="UPI">UPI</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Net Banking">Net Banking</option>
                <option value="Cash">Cash</option>
              </select>
            </div>
          </div>

          <!-- Custom Category Text Input (Appears if Other / Custom is chosen) -->
          <div *ngIf="category === 'Other (Custom)'" class="animate-fade-in">
            <label class="block text-[11px] font-black uppercase tracking-wider text-purple-400 mb-1.5">SPECIFY CUSTOM CATEGORY</label>
            <input 
              type="text" 
              [(ngModel)]="customCategory" 
              placeholder="Enter custom category name..." 
              class="w-full px-4 py-3 rounded-2xl bg-[#141629] border border-purple-500/50 text-sm font-bold text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all"
            />
          </div>

          <!-- MERCHANT / SOURCE -->
          <div>
            <label class="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2">MERCHANT / SOURCE</label>
            <input 
              type="text" 
              [(ngModel)]="merchant" 
              placeholder="Swiggy, Zomato, Salary..." 
              class="w-full px-4 py-3.5 rounded-2xl bg-[#141629] border border-white/10 text-sm font-bold text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all"
            />
          </div>

          <!-- NOTES -->
          <div>
            <label class="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2">NOTES</label>
            <textarea 
              [(ngModel)]="notes" 
              rows="2"
              placeholder="Optional" 
              class="w-full px-4 py-3 rounded-2xl bg-[#141629] border border-white/10 text-sm font-bold text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all resize-none"></textarea>
          </div>

          <!-- Submit Action Button -->
          <button 
            (click)="submitTransaction()"
            class="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 via-cyan-400 to-blue-500 hover:opacity-95 text-slate-950 font-black text-base shadow-lg shadow-cyan-500/30 transition-all flex items-center justify-center mt-2 capitalize">
            Add {{ finance.modalTab() }}
          </button>

        </div>

      </div>
    </div>
  `
})
export class QuickActionModalComponent {
  finance = inject(FinanceService);

  tabs: ('expense' | 'income' | 'transfer' | 'investment')[] = ['expense', 'income', 'transfer', 'investment'];

  amount: number | null = null;
  category: string = 'General';
  customCategory: string = '';
  method: string = 'UPI';
  merchant: string = '';
  notes: string = '';

  setTab(tab: 'expense' | 'income' | 'transfer' | 'investment') {
    this.finance.modalTab.set(tab);
  }

  submitTransaction() {
    if (!this.amount) return;
    
    const finalCategory = this.category === 'Other (Custom)' && this.customCategory.trim() 
      ? this.customCategory.trim() 
      : this.category;

    const currentTab = this.finance.modalTab();
    const finalAmount = currentTab === 'expense' ? -Math.abs(this.amount) : Math.abs(this.amount);

    this.finance.addTransaction({
      title: this.merchant || (currentTab === 'income' ? 'Income Deposit' : 'General Expense'),
      merchant: this.merchant || 'General Transaction',
      category: finalCategory,
      amount: finalAmount,
      type: currentTab as any,
      date: 'Today',
      paymentMethod: this.method,
      notes: this.notes,
      icon: currentTab === 'income' ? 'inbox' : 'credit-card',
      color: currentTab === 'income' ? '#10b981' : '#a855f7',
      tag: this.method
    });

    // Reset fields
    this.amount = null;
    this.category = 'General';
    this.customCategory = '';
    this.merchant = '';
    this.notes = '';
    this.finance.closeModal();
  }
}
