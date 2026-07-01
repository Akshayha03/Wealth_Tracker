import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      [attr.width]="size || 20" 
      [attr.height]="size || 20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      [attr.stroke-width]="strokeWidth || 2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
      [ngClass]="customClass">
      <ng-container [ngSwitch]="name">
        <!-- zap -->
        <path *ngSwitchCase="'zap'" d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
        
        <!-- wallet -->
        <path *ngSwitchCase="'wallet'" d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
        <path *ngSwitchCase="'wallet'" d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />

        <!-- search -->
        <circle *ngSwitchCase="'search'" cx="11" cy="11" r="8" />
        <path *ngSwitchCase="'search'" d="m21 21-4.3-4.3" />

        <!-- plus -->
        <path *ngSwitchCase="'plus'" d="M5 12h14" />
        <path *ngSwitchCase="'plus'" d="M12 5v14" />

        <!-- bell -->
        <path *ngSwitchCase="'bell'" d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path *ngSwitchCase="'bell'" d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />

        <!-- sparkles -->
        <path *ngSwitchCase="'sparkles'" d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        <path *ngSwitchCase="'sparkles'" d="M5 3v4" />
        <path *ngSwitchCase="'sparkles'" d="M19 17v4" />
        <path *ngSwitchCase="'sparkles'" d="M3 5h4" />
        <path *ngSwitchCase="'sparkles'" d="M17 19h4" />

        <!-- layout-dashboard -->
        <rect *ngSwitchCase="'layout-dashboard'" width="7" height="9" x="3" y="3" rx="1" />
        <rect *ngSwitchCase="'layout-dashboard'" width="7" height="5" x="14" y="3" rx="1" />
        <rect *ngSwitchCase="'layout-dashboard'" width="7" height="9" x="14" y="12" rx="1" />
        <rect *ngSwitchCase="'layout-dashboard'" width="7" height="5" x="3" y="16" rx="1" />

        <!-- arrow-left-right -->
        <path *ngSwitchCase="'arrow-left-right'" d="M8 3 4 7l4 4" />
        <path *ngSwitchCase="'arrow-left-right'" d="M4 7h16" />
        <path *ngSwitchCase="'arrow-left-right'" d="m16 21 4-4-4-4" />
        <path *ngSwitchCase="'arrow-left-right'" d="M20 17H4" />

        <!-- pie-chart -->
        <path *ngSwitchCase="'pie-chart'" d="M21.21 15.89A10 10 0 1 1 8 2.83" />
        <path *ngSwitchCase="'pie-chart'" d="M22 12A10 10 0 0 0 12 2v10z" />

        <!-- trending-up -->
        <polyline *ngSwitchCase="'trending-up'" points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline *ngSwitchCase="'trending-up'" points="16 7 22 7 22 13" />

        <!-- trending-down -->
        <polyline *ngSwitchCase="'trending-down'" points="22 17 13.5 8.5 8.5 13.5 2 7" />
        <polyline *ngSwitchCase="'trending-down'" points="16 17 22 17 22 11" />

        <!-- line-chart -->
        <path *ngSwitchCase="'line-chart'" d="M3 3v18h18" />
        <path *ngSwitchCase="'line-chart'" d="m19 9-5 5-4-4-3 3" />

        <!-- target -->
        <circle *ngSwitchCase="'target'" cx="12" cy="12" r="10" />
        <circle *ngSwitchCase="'target'" cx="12" cy="12" r="6" />
        <circle *ngSwitchCase="'target'" cx="12" cy="12" r="2" />

        <!-- file-text -->
        <path *ngSwitchCase="'file-text'" d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path *ngSwitchCase="'file-text'" d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path *ngSwitchCase="'file-text'" d="M10 9H8" />
        <path *ngSwitchCase="'file-text'" d="M16 13H8" />
        <path *ngSwitchCase="'file-text'" d="M16 17H8" />

        <!-- settings -->
        <path *ngSwitchCase="'settings'" d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle *ngSwitchCase="'settings'" cx="12" cy="12" r="3" />

        <!-- chevron-right -->
        <path *ngSwitchCase="'chevron-right'" d="m9 18 6-6-6-6" />

        <!-- chevron-left -->
        <path *ngSwitchCase="'chevron-left'" d="m15 18-6-6 6-6" />

        <!-- arrow-down-left -->
        <path *ngSwitchCase="'arrow-down-left'" d="M17 7 7 17" />
        <path *ngSwitchCase="'arrow-down-left'" d="M17 17H7V7" />

        <!-- arrow-up-right -->
        <path *ngSwitchCase="'arrow-up-right'" d="M7 7h10v10" />
        <path *ngSwitchCase="'arrow-up-right'" d="M7 17 17 7" />

        <!-- shield-check -->
        <path *ngSwitchCase="'shield-check'" d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z" />
        <path *ngSwitchCase="'shield-check'" d="m9 12 2 2 4-4" />

        <!-- piggy-bank -->
        <path *ngSwitchCase="'piggy-bank'" d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5z" />
        <path *ngSwitchCase="'piggy-bank'" d="M2 9v1c0 1.1.9 2 2 2h1" />

        <!-- award -->
        <circle *ngSwitchCase="'award'" cx="12" cy="8" r="6" />
        <path *ngSwitchCase="'award'" d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />

        <!-- activity -->
        <path *ngSwitchCase="'activity'" d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />

        <!-- flame -->
        <path *ngSwitchCase="'flame'" d="M8.5 14.5A2.5 2.5 0 0 0 11 17c1.38 0 2.5-1.12 2.5-2.5 0-1.5-1.5-2.5-2.5-4-1 1.5-2.5 2.5-2.5 4Z" />
        <path *ngSwitchCase="'flame'" d="M15.79 6.79C14.39 5.39 13.06 4 11.5 2.5c0 0-1.5 1.5-3 3.5C6.5 8.5 5 11.5 5 14a7 7 0 0 0 14 0c0-2.5-1.5-5.5-3.21-7.21Z" />

        <!-- alert-triangle -->
        <path *ngSwitchCase="'alert-triangle'" d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <path *ngSwitchCase="'alert-triangle'" d="M12 9v4" />
        <path *ngSwitchCase="'alert-triangle'" d="M12 17h.01" />

        <!-- inbox -->
        <polyline *ngSwitchCase="'inbox'" points="22 12 16 12 14 15 10 15 8 12 2 12" />
        <path *ngSwitchCase="'inbox'" d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />

        <!-- credit-card -->
        <rect *ngSwitchCase="'credit-card'" width="20" height="14" x="2" y="5" rx="2" />
        <line *ngSwitchCase="'credit-card'" x1="2" x2="22" y1="10" y2="10" />

        <!-- edit-2 -->
        <path *ngSwitchCase="'edit-2'" d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />

        <!-- trash-2 -->
        <path *ngSwitchCase="'trash-2'" d="M3 6h18" />
        <path *ngSwitchCase="'trash-2'" d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path *ngSwitchCase="'trash-2'" d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />

        <!-- globe -->
        <circle *ngSwitchCase="'globe'" cx="12" cy="12" r="10" />
        <path *ngSwitchCase="'globe'" d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path *ngSwitchCase="'globe'" d="M2 12h20" />

        <!-- layers -->
        <path *ngSwitchCase="'layers'" d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
        <path *ngSwitchCase="'layers'" d="m22 12.5-8.58 3.91a2 2 0 0 1-1.66 0L2 12.5" />
        <path *ngSwitchCase="'layers'" d="m22 17.5-8.58 3.91a2 2 0 0 1-1.66 0L2 17.5" />

        <!-- cpu -->
        <rect *ngSwitchCase="'cpu'" width="16" height="16" x="4" y="4" rx="2" />
        <rect *ngSwitchCase="'cpu'" width="6" height="6" x="9" y="9" rx="1" />
        <path *ngSwitchCase="'cpu'" d="M15 2v2" />
        <path *ngSwitchCase="'cpu'" d="M15 20v2" />
        <path *ngSwitchCase="'cpu'" d="M2 15h2" />
        <path *ngSwitchCase="'cpu'" d="M2 9h2" />
        <path *ngSwitchCase="'cpu'" d="M20 15h2" />
        <path *ngSwitchCase="'cpu'" d="M20 9h2" />
        <path *ngSwitchCase="'cpu'" d="M9 2v2" />
        <path *ngSwitchCase="'cpu'" d="M9 20v2" />

        <!-- repeat -->
        <path *ngSwitchCase="'repeat'" d="m17 2 4 4-4 4" />
        <path *ngSwitchCase="'repeat'" d="M3 11v-1a4 4 0 0 1 4-4h14" />
        <path *ngSwitchCase="'repeat'" d="m7 22-4-4 4-4" />
        <path *ngSwitchCase="'repeat'" d="M21 13v1a4 4 0 0 1-4 4H3" />

        <!-- scan -->
        <path *ngSwitchCase="'scan'" d="M3 7V5a2 2 0 0 1 2-2h2" />
        <path *ngSwitchCase="'scan'" d="M17 3h2a2 2 0 0 1 2 2v2" />
        <path *ngSwitchCase="'scan'" d="M21 17v2a2 2 0 0 1-2 2h-2" />
        <path *ngSwitchCase="'scan'" d="M7 21H5a2 2 0 0 1-2-2v-2" />

        <!-- scan-line -->
        <path *ngSwitchCase="'scan-line'" d="M3 7V5a2 2 0 0 1 2-2h2" />
        <path *ngSwitchCase="'scan-line'" d="M17 3h2a2 2 0 0 1 2 2v2" />
        <path *ngSwitchCase="'scan-line'" d="M21 17v2a2 2 0 0 1-2 2h-2" />
        <path *ngSwitchCase="'scan-line'" d="M7 21H5a2 2 0 0 1-2-2v-2" />
        <path *ngSwitchCase="'scan-line'" d="M7 12h10" />

        <!-- check-circle -->
        <path *ngSwitchCase="'check-circle'" d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path *ngSwitchCase="'check-circle'" d="m9 11 3 3L22 4" />

        <!-- check -->
        <path *ngSwitchCase="'check'" d="M20 6 9 17l-5-5" />

        <!-- compass -->
        <circle *ngSwitchCase="'compass'" cx="12" cy="12" r="10" />
        <polygon *ngSwitchCase="'compass'" points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />

        <!-- heart -->
        <path *ngSwitchCase="'heart'" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />

        <!-- cloud -->
        <path *ngSwitchCase="'cloud'" d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />

        <!-- shopping-bag -->
        <path *ngSwitchCase="'shopping-bag'" d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path *ngSwitchCase="'shopping-bag'" d="M3 6h18" />
        <path *ngSwitchCase="'shopping-bag'" d="M16 10a4 4 0 0 1-8 0" />

        <!-- x -->
        <path *ngSwitchCase="'x'" d="M18 6 6 18" />
        <path *ngSwitchCase="'x'" d="m6 6 12 12" />

        <!-- arrow-right -->
        <path *ngSwitchCase="'arrow-right'" d="M5 12h14" />
        <path *ngSwitchCase="'arrow-right'" d="m12 5 7 7-7 7" />

        <!-- eye -->
        <path *ngSwitchCase="'eye'" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle *ngSwitchCase="'eye'" cx="12" cy="12" r="3" />

        <!-- eye-off -->
        <path *ngSwitchCase="'eye-off'" d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
        <path *ngSwitchCase="'eye-off'" d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
        <path *ngSwitchCase="'eye-off'" d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
        <line *ngSwitchCase="'eye-off'" x1="2" x2="22" y1="2" y2="22" />

        <!-- lock -->
        <rect *ngSwitchCase="'lock'" width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path *ngSwitchCase="'lock'" d="M7 11V7a5 5 0 0 1 10 0v4" />

        <!-- mail -->
        <rect *ngSwitchCase="'mail'" width="20" height="16" x="2" y="4" rx="2" />
        <path *ngSwitchCase="'mail'" d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />

        <!-- user -->
        <path *ngSwitchCase="'user'" d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle *ngSwitchCase="'user'" cx="12" cy="7" r="4" />

        <!-- loader -->
        <path *ngSwitchCase="'loader'" d="M12 2v4" />
        <path *ngSwitchCase="'loader'" d="m16.2 7.8 2.9-2.9" />
        <path *ngSwitchCase="'loader'" d="M18 12h4" />
        <path *ngSwitchCase="'loader'" d="m16.2 16.2 2.9 2.9" />
        <path *ngSwitchCase="'loader'" d="M12 18v4" />
        <path *ngSwitchCase="'loader'" d="m4.9 19.1 2.9-2.9" />
        <path *ngSwitchCase="'loader'" d="M2 12h4" />
        <path *ngSwitchCase="'loader'" d="m4.9 4.9 2.9 2.9" />

        <!-- log-out -->
        <path *ngSwitchCase="'log-out'" d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline *ngSwitchCase="'log-out'" points="16 17 21 12 16 7" />
        <line *ngSwitchCase="'log-out'" x1="21" x2="9" y1="12" y2="12" />

        <!-- fallback -->
        <circle *ngSwitchDefault cx="12" cy="12" r="8" />
      </ng-container>
    </svg>
  `
})
export class IconComponent {
  @Input() name: string = '';
  @Input() size: number | string = 20;
  @Input() strokeWidth: number | string = 2;
  @Input() customClass: string = '';
}
