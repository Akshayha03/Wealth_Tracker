import { Injectable, signal, computed } from '@angular/core';
import { supabase } from '../../supabase';

export type NavItem = 'Dashboard' | 'Transactions' | 'Budgets' | 'Analytics' | 'Investments' | 'Goals' | 'Settings';

export interface UserProfile {
  name: string;
  income: number;
  avatarUrl: string;
}

export interface Transaction {
  id: string;
  title: string;
  merchant: string;
  amount: number;
  type?: 'expense' | 'income' | 'investment' | 'transfer';
  category: string;
  date: string;
  paymentMethod?: string;
  notes?: string;
  icon?: string;
  color?: string;
  tag?: string;
}

export interface Budget {
  id: string;
  name?: string;
  category: string;
  limit: number;
  allocated: number;
  spent: number;
  icon: string;
  color: string;
  health: 'Optimal' | 'Moderate' | 'Warning' | 'Critical';
}

export type Timeframe = 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly' | 'Half-Yr' | 'Yearly';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  // Avatars for different personas
  availableAvatars = [
    { id: 'av1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80', label: 'Elena' },
    { id: 'av2', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80', label: 'Alex' },
    { id: 'av3', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80', label: 'Maya' },
    { id: 'av4', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80', label: 'Rohan' },
    { id: 'av5', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80', label: 'Priya' },
    { id: 'av6', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80', label: 'Kabir' }
  ];

  // Standard Categories list
  categories = [
    'General',
    'Food & Dining',
    'Shopping',
    'Housing & Rent',
    'Utilities & Bills',
    'Entertainment',
    'Transportation',
    'Health & Fitness',
    'Education',
    'Investments & Savings',
    'Salary & Income',
    'Freelance & Business',
    'Other (Custom)'
  ];

  // User Onboarding State
  userProfile = signal<UserProfile | null>(null);
  isOnboarded = signal<boolean>(false);
  currentUserId = '';

  constructor() {
    this.loadFromStorage();
  }

  loadFromStorage() {
    // Only load if currentUserId is set, or don't auto-load global into wrong accounts
  }

  async syncFromDatabase() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: incomeData } = await supabase.from('income').select('*').eq('user_id', user.id);
      const { data: expenseData } = await supabase.from('expenses').select('*').eq('user_id', user.id);

      const txList: Transaction[] = [];
      if (incomeData && incomeData.length > 0) {
        incomeData.forEach((inc: any) => {
          txList.push({
            id: inc.id,
            title: inc.source || 'Income',
            merchant: 'Deposit',
            amount: Number(inc.amount),
            type: 'income',
            category: 'Salary & Income',
            date: inc.income_date || 'Today',
            paymentMethod: 'Transfer',
            icon: 'inbox',
            color: '#10b981'
          });
        });
      }
      if (expenseData && expenseData.length > 0) {
        expenseData.forEach((exp: any) => {
          txList.push({
            id: exp.id,
            title: exp.description || exp.category || 'Expense',
            merchant: exp.description || 'Merchant',
            amount: -Math.abs(Number(exp.amount)),
            type: 'expense',
            category: exp.category || 'General',
            date: exp.expense_date || 'Today',
            paymentMethod: 'Card',
            icon: 'credit-card',
            color: '#f43f5e'
          });
        });
      }
      if (txList.length > 0) {
        this.transactions.set(txList);
        this.saveState();
      }
    } catch (e) {
      console.error('Error syncing database records:', e);
    }
  }

  loadUserSession(userId: string, defaultName?: string) {
    this.currentUserId = userId;
    const saved = localStorage.getItem(`nexusfi_user_profile_${userId}`);
    const savedTx = localStorage.getItem(`nexusfi_user_transactions_${userId}`);
    const savedBg = localStorage.getItem(`nexusfi_user_budgets_${userId}`);

    if (saved) {
      try {
        const profile: UserProfile = JSON.parse(saved);
        this.userProfile.set(profile);
        this.isOnboarded.set(true);
      } catch (e) {
        console.error('Failed to load user profile', e);
      }
    } else {
      const profile: UserProfile = {
        name: defaultName || 'Manager',
        income: 75000,
        avatarUrl: this.availableAvatars[0].url
      };
      this.userProfile.set(profile);
      this.isOnboarded.set(true);
      localStorage.setItem(`nexusfi_user_profile_${userId}`, JSON.stringify(profile));
    }

    if (savedTx) {
      try {
        let txList: Transaction[] = JSON.parse(savedTx);
        txList = txList.filter(t => t.id !== 'tx_init_2' && t.id !== 'tx_init_3' && !t.title?.includes('Swiggy') && !t.title?.includes('Uber'));
        this.transactions.set(txList);
      } catch (e) {}
    } else {
      const inc = this.userProfile()?.income || 75000;
      this.transactions.set([
        {
          id: `tx_init_${userId}_1`,
          title: 'Monthly Verified Income',
          merchant: 'Salary Deposit',
          amount: inc,
          type: 'income',
          category: 'Salary & Income',
          date: 'Today, 09:00 AM',
          paymentMethod: 'NEFT / UPI',
          icon: 'inbox',
          color: '#10b981',
          tag: 'Verified'
        }
      ]);
    }

    if (savedBg) {
      try {
        let bgList: Budget[] = JSON.parse(savedBg);
        this.budgets.set(bgList);
      } catch (e) {}
    } else {
      const inc = this.userProfile()?.income || 75000;
      this.budgets.set([
        {
          id: `bg_${userId}_1`,
          name: 'Food & Dining',
          category: 'Food & Dining',
          limit: Math.round(inc * 0.25),
          allocated: Math.round(inc * 0.25),
          spent: 0,
          icon: 'credit-card',
          color: '#f43f5e',
          health: 'Optimal'
        },
        {
          id: `bg_${userId}_2`,
          name: 'Shopping & Lifestyle',
          category: 'Shopping',
          limit: Math.round(inc * 0.15),
          allocated: Math.round(inc * 0.15),
          spent: 0,
          icon: 'bag',
          color: '#a855f7',
          health: 'Optimal'
        },
        {
          id: `bg_${userId}_3`,
          name: 'Transportation & Travel',
          category: 'Transportation',
          limit: Math.round(inc * 0.10),
          allocated: Math.round(inc * 0.10),
          spent: 0,
          icon: 'layers',
          color: '#38bdf8',
          health: 'Optimal'
        }
      ]);
    }

    this.saveState();
    this.syncFromDatabase();
  }

  async completeOnboarding(name: string, income: number, avatarUrl: string, userId?: string): Promise<void> {
    if (userId) {
      this.currentUserId = userId;
    }
    const profile: UserProfile = {
      name: name || 'Explorer',
      income: income || 75000,
      avatarUrl: avatarUrl || this.availableAvatars[0].url
    };

    this.userProfile.set(profile);
    this.isOnboarded.set(true);
    const keySuffix = this.currentUserId ? `_${this.currentUserId}` : '';
    localStorage.setItem(`nexusfi_user_profile${keySuffix}`, JSON.stringify(profile));

    // Insert income record into relational income table in Supabase immediately and await it
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error } = await supabase.from('income').insert([{
          user_id: user.id,
          amount: profile.income,
          source: 'Monthly Verified Income',
          income_date: new Date().toISOString().split('T')[0]
        }]);
        if (error) {
          console.error('Failed inserting onboarding income:', error);
        } else {
          await this.syncFromDatabase();
        }
      }
    } catch (e) {
      console.error('Error in onboarding Supabase sync:', e);
    }

    const startingTransactions: Transaction[] = [
      {
        id: `tx_init_${this.currentUserId || '1'}_1`,
        title: 'Monthly Verified Income',
        merchant: 'Salary Deposit',
        amount: profile.income,
        type: 'income',
        category: 'Salary & Income',
        date: 'Today, 09:00 AM',
        paymentMethod: 'NEFT / UPI',
        icon: 'inbox',
        color: '#10b981',
        tag: 'Verified'
      }
    ];

    const startingBudgets: Budget[] = [
      {
        id: `bg_${this.currentUserId || '1'}_1`,
        name: 'Food & Dining',
        category: 'Food & Dining',
        limit: Math.round(profile.income * 0.25),
        allocated: Math.round(profile.income * 0.25),
        spent: 0,
        icon: 'credit-card',
        color: '#f43f5e',
        health: 'Optimal'
      },
      {
        id: `bg_${this.currentUserId || '1'}_2`,
        name: 'Shopping & Lifestyle',
        category: 'Shopping',
        limit: Math.round(profile.income * 0.15),
        allocated: Math.round(profile.income * 0.15),
        spent: 0,
        icon: 'bag',
        color: '#a855f7',
        health: 'Optimal'
      },
      {
        id: `bg_${this.currentUserId || '1'}_3`,
        name: 'Transportation & Travel',
        category: 'Transportation',
        limit: Math.round(profile.income * 0.10),
        allocated: Math.round(profile.income * 0.10),
        spent: 0,
        icon: 'layers',
        color: '#38bdf8',
        health: 'Optimal'
      }
    ];

    this.transactions.set(startingTransactions);
    this.budgets.set(startingBudgets);
    this.saveState();
  }

  resetOnboarding() {
    const keySuffix = this.currentUserId ? `_${this.currentUserId}` : '';
    localStorage.removeItem(`nexusfi_user_profile${keySuffix}`);
    localStorage.removeItem(`nexusfi_user_transactions${keySuffix}`);
    localStorage.removeItem(`nexusfi_user_budgets${keySuffix}`);
    this.userProfile.set(null);
    this.isOnboarded.set(false);
  }

  saveState() {
    const keySuffix = this.currentUserId ? `_${this.currentUserId}` : '';
    localStorage.setItem(`nexusfi_user_transactions${keySuffix}`, JSON.stringify(this.transactions()));
    localStorage.setItem(`nexusfi_user_budgets${keySuffix}`, JSON.stringify(this.budgets()));
    if (this.userProfile()) {
      localStorage.setItem(`nexusfi_user_profile${keySuffix}`, JSON.stringify(this.userProfile()));
    }
  }

  // Navigation & Sidebar
  activeNav = signal<string>('Dashboard');
  sidebarCollapsed = signal<boolean>(false);

  toggleSidebar() {
    this.sidebarCollapsed.update(c => !c);
  }

  setNav(item: string) {
    this.activeNav.set(item);
  }

  // Search & Filters
  searchQuery = signal<string>('');
  selectedFilter = signal<'ALL' | 'expense' | 'income' | 'investment'>('ALL');

  // Modal Control
  isModalOpen = signal<boolean>(false);
  modalTab = signal<'expense' | 'income' | 'transfer' | 'investment'>('expense');

  openModal(tab: 'expense' | 'income' | 'transfer' | 'investment' | 'budget' = 'expense') {
    if (tab === 'budget') {
      this.modalTab.set('expense');
    } else {
      this.modalTab.set(tab);
    }
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  // Timeframe & Chart
  selectedTimeframe = signal<Timeframe>('Daily');
  chartMode = signal<'EXPENSE' | 'INCOME' | 'BOTH'>('EXPENSE');

  setTimeframe(tf: Timeframe) {
    this.selectedTimeframe.set(tf);
  }

  // Dynamic Transactions Ledger
  transactions = signal<Transaction[]>([]);
  budgets = signal<Budget[]>([]);

  // Strictly dynamic liquid cash flow based only on user transactions
  totalIncome = computed(() => {
    return this.transactions()
      .filter(t => t.amount > 0)
      .reduce((acc, curr) => acc + curr.amount, 0);
  });

  totalExpenses = computed(() => {
    return Math.abs(this.transactions()
      .filter(t => t.amount < 0)
      .reduce((acc, curr) => acc + curr.amount, 0));
  });

  netBalance = computed(() => {
    return this.totalIncome() - this.totalExpenses();
  });

  // Chart Data Generator reflecting actual intact user transactions without arbitrary splitting
  chartData = computed(() => {
    const tf = this.selectedTimeframe();
    const expList = this.transactions().filter(t => t.amount < 0);
    const incList = this.transactions().filter(t => t.amount > 0);

    const mapTransactionsToSlots = (labels: string[], txList: Transaction[]) => {
      const arr = new Array(labels.length).fill(0);
      if (txList.length === 0) return arr;
      // Chronologically place each intact transaction from oldest to newest into slots ending at the latest slot
      const startIdx = Math.max(0, labels.length - txList.length);
      txList.slice().reverse().forEach((tx, idx) => {
        const slot = Math.min(labels.length - 1, startIdx + idx);
        arr[slot] += Math.abs(tx.amount);
      });
      return arr;
    };

    if (tf === 'Daily') {
      const labels = ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '00:00', '02:00', '04:00', '06:00', '09:00'];
      return {
        labels,
        expenses: mapTransactionsToSlots(labels, expList),
        income: mapTransactionsToSlots(labels, incList)
      };
    } else if (tf === 'Weekly') {
      const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      return {
        labels,
        expenses: mapTransactionsToSlots(labels, expList),
        income: mapTransactionsToSlots(labels, incList)
      };
    } else if (tf === 'Monthly') {
      const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
      return {
        labels,
        expenses: mapTransactionsToSlots(labels, expList),
        income: mapTransactionsToSlots(labels, incList)
      };
    } else if (tf === 'Quarterly') {
      const labels = ['Month 1', 'Month 2', 'Month 3'];
      return {
        labels,
        expenses: mapTransactionsToSlots(labels, expList),
        income: mapTransactionsToSlots(labels, incList)
      };
    } else if (tf === 'Half-Yr') {
      const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      return {
        labels,
        expenses: mapTransactionsToSlots(labels, expList),
        income: mapTransactionsToSlots(labels, incList)
      };
    } else {
      const labels = ['2021', '2022', '2023', '2024', '2025', '2026'];
      return {
        labels,
        expenses: mapTransactionsToSlots(labels, expList),
        income: mapTransactionsToSlots(labels, incList)
      };
    }
  });

  addTransaction(tx: Omit<Transaction, 'id'>) {
    const newTx: Transaction = {
      ...tx,
      id: 'tx_' + Math.random().toString(36).substring(2, 9)
    };
    this.transactions.update(prev => [newTx, ...prev]);

    if (newTx.amount < 0 && newTx.category) {
      this.budgets.update(prev => prev.map(b => {
        if (b.category === newTx.category || b.name === newTx.category) {
          return { ...b, spent: b.spent + Math.abs(newTx.amount) };
        }
        return b;
      }));
    }

    this.saveState();

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        if (newTx.amount > 0) {
          supabase.from('income').insert([{
            user_id: user.id,
            amount: newTx.amount,
            source: newTx.title || newTx.merchant || 'Income',
            income_date: new Date().toISOString().split('T')[0]
          }]).then(({ error }) => {
            if (error) console.error('Error inserting income transaction:', error);
          });
        } else {
          supabase.from('expenses').insert([{
            user_id: user.id,
            amount: Math.abs(newTx.amount),
            category: newTx.category || 'General',
            description: newTx.title || newTx.merchant || '',
            expense_date: new Date().toISOString().split('T')[0]
          }]).then(({ error }) => {
            if (error) console.error('Error inserting expense transaction:', error);
          });
        }
      }
    }).catch(e => console.error('User fetch error in addTransaction:', e));
  }

  deleteTransaction(id: string) {
    const targetTx = this.transactions().find(t => t.id === id);
    this.transactions.update(prev => prev.filter(t => t.id !== id));
    this.saveState();

    if (targetTx) {
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user) {
          if (targetTx.amount > 0) {
            supabase.from('income').delete().eq('id', id).eq('user_id', user.id).then(() => {});
          } else {
            supabase.from('expenses').delete().eq('id', id).eq('user_id', user.id).then(() => {});
          }
        }
      }).catch(() => {});
    }
  }

  downloadReport() {
    const txList = this.transactions();
    let csv = 'Date,Title,Merchant,Category,Type,Payment Method,Amount (INR)\n';
    txList.forEach(t => {
      csv += `"${t.date || ''}","${t.title || ''}","${t.merchant || ''}","${t.category || ''}","${t.type || ''}","${t.paymentMethod || ''}","${t.amount || 0}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `NexusFi_Wealth_Report_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
