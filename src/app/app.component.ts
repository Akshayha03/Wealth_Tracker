import { Component, inject, effect, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { HeroCardsComponent } from './components/hero-cards/hero-cards.component';
import { InteractiveAnalyticsComponent } from './components/interactive-analytics/interactive-analytics.component';
import { ExpenseTimelineComponent } from './components/expense-timeline/expense-timeline.component';
import { BudgetCardsComponent } from './components/budget-cards/budget-cards.component';
import { QuickActionModalComponent } from './components/quick-action-modal/quick-action-modal.component';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ToastComponent } from './components/toast/toast.component';
import { FinanceService } from './services/finance.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    HeaderComponent,
    HeroCardsComponent,
    InteractiveAnalyticsComponent,
    ExpenseTimelineComponent,
    BudgetCardsComponent,
    QuickActionModalComponent,
    BottomNavComponent,
    LandingPageComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ToastComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class App {
  finance = inject(FinanceService);
  auth = inject(AuthService);

  constructor() {
    effect(() => {
      const user = this.auth.currentUser();
      const profile = this.auth.currentProfile();
      
      if (!user) {
        untracked(() => {
          this.finance.isOnboarded.set(false);
        });
      }
    });
  }
}
