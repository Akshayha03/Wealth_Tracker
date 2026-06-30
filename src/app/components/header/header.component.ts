import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinanceService } from '../../services/finance.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 px-2 mb-6 select-none">
      
      <!-- Greeting & Live Badge -->
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 shadow-sm shadow-cyan-500/10">
            <span class="size-1.5 rounded-full bg-cyan-400 animate-ping"></span>
            LIVE TELEMETRY
          </span>
          <span class="text-xs font-semibold text-slate-400 hidden sm:inline">· Updated just now</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
          Hello, {{ finance.userProfile()?.name || 'Explorer' }} <span class="animate-bounce inline-block">👋</span>
        </h1>
      </div>

      <!-- Quick Actions & Search Center -->
      <div class="flex items-center gap-3">
        
        <!-- Search Bar with Glass Glow -->
        <div class="relative flex-1 md:w-64">
          <app-icon name="search" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" [size]="16"></app-icon>
          <input 
            type="text"
            [(ngModel)]="searchQuery"
            (ngModelChange)="onSearchChange($event)"
            placeholder="Search transactions, tags..."
            class="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 backdrop-blur-md"
          />
        </div>

        <!-- Add Transaction Glow Button -->
        <button 
          (click)="finance.openModal('expense')"
          class="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
          <app-icon name="plus" [size]="18"></app-icon>
          <span class="hidden sm:inline">Log Transaction</span>
        </button>

        <!-- Notification Bell -->
        <button class="relative p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all">
          <app-icon name="bell" [size]="18"></app-icon>
          <span class="absolute top-2 right-2 size-2 rounded-full bg-pink-500 ring-4 ring-black/50 animate-pulse"></span>
        </button>

        <!-- Profile Avatar Pill -->
        <div class="flex items-center gap-2 pl-1 cursor-pointer group" (click)="finance.setNav('Settings')" title="View Settings">
          <div class="w-10 h-10 rounded-2xl p-0.5 bg-gradient-to-tr from-purple-500 to-cyan-400 shadow-md flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
            <img 
              [src]="finance.userProfile()?.avatarUrl" 
              [alt]="finance.userProfile()?.name" 
              class="w-full h-full rounded-[14px] object-cover"
            />
          </div>
        </div>

      </div>

    </header>
  `
})
export class HeaderComponent {
  finance = inject(FinanceService);
  searchQuery = '';

  onSearchChange(val: string) {
    this.finance.searchQuery.set(val);
  }
}
