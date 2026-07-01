import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none select-none">
      <div 
        *ngFor="let toast of auth.toasts()"
        [ngClass]="{
          'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 shadow-emerald-500/10': toast.type === 'success',
          'bg-red-500/20 border-red-500/40 text-red-300 shadow-red-500/10': toast.type === 'error',
          'bg-cyan-500/20 border-cyan-500/40 text-cyan-300 shadow-cyan-500/10': toast.type === 'info'
        }"
        class="pointer-events-auto backdrop-blur-xl bg-[#0d1124]/90 border p-4 rounded-2xl shadow-2xl flex items-start justify-between gap-3 animate-fade-in transition-all">
        
        <div class="flex items-center gap-3">
          <div 
            [ngClass]="{
              'bg-emerald-500/20 text-emerald-400': toast.type === 'success',
              'bg-red-500/20 text-red-400': toast.type === 'error',
              'bg-cyan-500/20 text-cyan-400': toast.type === 'info'
            }"
            class="size-9 rounded-xl flex items-center justify-center shrink-0">
            <app-icon *ngIf="toast.type === 'success'" name="check-circle" [size]="18"></app-icon>
            <app-icon *ngIf="toast.type === 'error'" name="alert-triangle" [size]="18"></app-icon>
            <app-icon *ngIf="toast.type === 'info'" name="bell" [size]="18"></app-icon>
          </div>
          <p class="text-xs sm:text-sm font-bold leading-relaxed text-slate-100">
            {{ toast.message }}
          </p>
        </div>

        <button 
          (click)="auth.removeToast(toast.id)"
          class="text-slate-400 hover:text-white transition-colors p-1 shrink-0">
          <app-icon name="x" [size]="16"></app-icon>
        </button>

      </div>
    </div>
  `
})
export class ToastComponent {
  auth = inject(AuthService);
}
