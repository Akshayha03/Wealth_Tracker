import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceService, NavItem } from '../../services/finance.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <aside 
      [class.w-64]="!finance.sidebarCollapsed()" 
      [class.w-20]="finance.sidebarCollapsed()" 
      class="hidden lg:flex flex-col border-r border-white/10 bg-[#080a18]/80 backdrop-blur-2xl transition-all duration-300 relative select-none shrink-0 h-screen sticky top-0">
      
      <!-- Logo Header -->
      <div class="h-20 flex items-center justify-between px-6 border-b border-white/5">
        <div *ngIf="!finance.sidebarCollapsed()" class="flex items-center gap-3 animate-fade-in">
          <div class="size-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <app-icon name="zap" class="text-white" [size]="22"></app-icon>
          </div>
          <span class="text-xl font-black tracking-tight text-white">
            NEXUS<span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">FI</span>
          </span>
        </div>
        <div *ngIf="finance.sidebarCollapsed()" class="mx-auto">
          <div class="size-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-400 flex items-center justify-center shadow-lg">
            <app-icon name="zap" class="text-white" [size]="20"></app-icon>
          </div>
        </div>

        <button 
          (click)="finance.toggleSidebar()" 
          class="size-8 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all">
          <app-icon [name]="finance.sidebarCollapsed() ? 'chevron-right' : 'chevron-left'" [size]="18"></app-icon>
        </button>
      </div>

      <!-- Navigation Links -->
      <nav class="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
        <div *ngFor="let item of navItems" 
             (click)="finance.setNav(item.label)"
             [class.bg-gradient-to-r]="finance.activeNav() === item.label"
             [class.from-purple-600/20]="finance.activeNav() === item.label"
             [class.to-indigo-600/10]="finance.activeNav() === item.label"
             [class.border-l-4]="finance.activeNav() === item.label"
             [class.border-purple-500]="finance.activeNav() === item.label"
             [class.text-white]="finance.activeNav() === item.label"
             [class.text-slate-400]="finance.activeNav() !== item.label"
             class="flex items-center gap-3.5 px-3.5 py-3 rounded-2xl font-extrabold text-sm cursor-pointer hover:bg-white/5 hover:text-white transition-all group">
          
          <app-icon [name]="item.icon" [size]="20" 
            [class.text-purple-400]="finance.activeNav() === item.label"
            class="group-hover:scale-110 transition-transform shrink-0"></app-icon>
          
          <span *ngIf="!finance.sidebarCollapsed()" class="truncate">{{ item.label }}</span>
        </div>
      </nav>

      <!-- Bottom Status Banner -->
      <div *ngIf="!finance.sidebarCollapsed()" class="p-4 m-3 rounded-2xl bg-gradient-to-br from-purple-900/30 to-indigo-900/20 border border-purple-500/20 animate-fade-in">
        <div class="flex items-center gap-2.5 mb-2">
          <span class="size-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span class="text-xs font-black uppercase tracking-wider text-purple-300">Live Telemetry</span>
        </div>
        <p class="text-xs text-slate-300 font-medium mb-3">All transactions & accounts synced across INR flow.</p>
        <button 
          (click)="finance.openModal('expense')"
          class="w-full py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-200 text-xs font-bold transition-all">
          Quick Log
        </button>
      </div>

    </aside>
  `
})
export class SidebarComponent {
  finance = inject(FinanceService);

  navItems: { label: NavItem; icon: string }[] = [
    { label: 'Dashboard', icon: 'grid' },
    { label: 'Transactions', icon: 'credit-card' },
    { label: 'Budgets', icon: 'pie-chart' },
    { label: 'Analytics', icon: 'bar-chart' },
    { label: 'Investments', icon: 'trending-up' },
    { label: 'Goals', icon: 'target' },
    { label: 'Settings', icon: 'settings' }
  ];
}
