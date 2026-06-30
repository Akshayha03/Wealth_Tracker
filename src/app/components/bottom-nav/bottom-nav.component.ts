import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceService, NavItem } from '../../services/finance.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <nav class="fixed bottom-0 inset-x-0 z-40 lg:hidden glass-panel border-t border-white/10 px-4 py-2 flex items-center justify-around shadow-2xl select-none">
      
      <button
        *ngFor="let item of mobileNav"
        (click)="finance.setNav(item.label)"
        class="flex flex-col items-center gap-1 p-2 rounded-2xl transition-all duration-200"
        [class.text-cyan-400]="finance.activeNav() === item.label"
        [class.scale-105]="finance.activeNav() === item.label"
        [class.text-slate-400]="finance.activeNav() !== item.label">
        <app-icon [name]="item.icon" [size]="20"></app-icon>
        <span class="text-[10px] font-extrabold tracking-wide">{{ item.label }}</span>
      </button>

    </nav>
  `
})
export class BottomNavComponent {
  finance = inject(FinanceService);

  mobileNav: { label: NavItem; icon: string }[] = [
    { label: 'Dashboard', icon: 'layout-dashboard' },
    { label: 'Transactions', icon: 'arrow-left-right' },
    { label: 'Budgets', icon: 'pie-chart' },
    { label: 'Analytics', icon: 'trending-up' },
    { label: 'Settings', icon: 'settings' }
  ];
}
