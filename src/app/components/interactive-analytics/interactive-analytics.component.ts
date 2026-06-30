import { Component, ElementRef, ViewChild, AfterViewInit, effect, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceService, Timeframe } from '../../services/finance.service';
import { IconComponent } from '../icon/icon.component';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-interactive-analytics',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="bg-[#0a0c1a] border border-white/10 rounded-[32px] p-6 sm:p-8 relative overflow-hidden select-none shadow-2xl">
      
      <!-- Top Header & Pill Switcher -->
      <div class="flex flex-col md:flex-row md:items-start justify-between gap-6">
        
        <!-- Left Title & Stats -->
        <div>
          <div class="text-[11px] font-black tracking-widest text-slate-400 uppercase mb-1.5">
            CASHFLOW ANALYTICS
          </div>
          
          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            <span class="text-white">Spending </span>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400">timeline</span>
          </h2>

          <!-- Stats Row -->
          <div class="flex items-center gap-5 text-sm font-bold">
            <div class="flex items-center gap-1.5">
              <span class="text-slate-400">Avg</span>
              <span class="text-white font-extrabold">₹{{ avgValue | number:'1.0-0' }}</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="text-slate-400">Peak</span>
              <span class="text-cyan-400 font-extrabold">₹{{ peakValue | number:'1.0-0' }}</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="text-slate-400">Low</span>
              <span class="text-pink-400 font-extrabold">₹{{ lowValue | number:'1.0-0' }}</span>
            </div>
          </div>
        </div>

        <!-- Right Mode Switcher (EXPENSE | INCOME | BOTH) -->
        <div class="bg-[#121426] border border-white/10 rounded-full p-1 flex items-center self-start">
          <button 
            *ngFor="let mode of modes"
            (click)="setMode(mode)"
            [ngClass]="{
              'bg-white/15 text-white font-extrabold shadow-md': finance.chartMode() === mode,
              'text-slate-400 font-bold hover:text-white': finance.chartMode() !== mode
            }"
            class="px-5 py-2 rounded-full text-xs tracking-wider transition-all duration-200">
            {{ mode }}
          </button>
        </div>

      </div>

      <!-- Timeframe Selector Pill Bar & Download Report Button -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 mb-8">
        <div class="bg-[#121426] border border-white/10 rounded-2xl p-1 inline-flex flex-wrap items-center gap-1">
          <button 
            *ngFor="let tf of timeframes"
            (click)="setTimeframe(tf)"
            [ngClass]="{
              'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold shadow-lg shadow-purple-500/20': finance.selectedTimeframe() === tf,
              'text-slate-400 hover:text-white font-bold': finance.selectedTimeframe() !== tf
            }"
            class="px-4 py-2 rounded-xl text-xs transition-all duration-200">
            {{ tf }}
          </button>
        </div>

        <button 
          (click)="finance.downloadReport()"
          class="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 text-cyan-300 hover:text-white border border-cyan-500/30 hover:border-cyan-400/60 text-xs font-extrabold shadow-lg shadow-cyan-500/10 transition-all duration-200 self-start sm:self-auto group cursor-pointer">
          <app-icon name="download" [size]="14" class="group-hover:-translate-y-0.5 transition-transform"></app-icon>
          <span>Download Report</span>
        </button>
      </div>

      <!-- Main Chart Area -->
      <div class="w-full h-80 sm:h-96 relative">
        <canvas #chartCanvas></canvas>
      </div>

    </div>
  `
})
export class InteractiveAnalyticsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  finance = inject(FinanceService);

  chartInstance?: Chart;
  modes: ('EXPENSE' | 'INCOME' | 'BOTH')[] = ['EXPENSE', 'INCOME', 'BOTH'];
  timeframes: Timeframe[] = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Half-Yr', 'Yearly'];

  avgValue = 52;
  peakValue = 765;
  lowValue = 494;

  constructor() {
    effect(() => {
      const data = this.finance.chartData();
      const mode = this.finance.chartMode();
      if (this.chartInstance) {
        this.updateChartData(data, mode);
      }
    });
  }

  setMode(m: 'EXPENSE' | 'INCOME' | 'BOTH') {
    this.finance.chartMode.set(m);
  }

  setTimeframe(tf: Timeframe) {
    this.finance.setTimeframe(tf);
  }

  ngAfterViewInit() {
    this.initChart();
  }

  initChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const pinkGradient = ctx.createLinearGradient(0, 0, 0, 350);
    pinkGradient.addColorStop(0, 'rgba(244, 63, 94, 0.45)');
    pinkGradient.addColorStop(1, 'rgba(244, 63, 94, 0.0)');

    const cyanGradient = ctx.createLinearGradient(0, 0, 0, 350);
    cyanGradient.addColorStop(0, 'rgba(6, 182, 212, 0.45)');
    cyanGradient.addColorStop(1, 'rgba(6, 182, 212, 0.0)');

    const currentData = this.finance.chartData();
    const mode = this.finance.chartMode();
    const activeVals = mode === 'INCOME' ? currentData.income : currentData.expenses;

    this.calculateStats(activeVals);

    // Dashed Average Line Dataset
    const avgArray = activeVals.map(() => this.avgValue);

    this.chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: currentData.labels,
        datasets: [
          {
            label: mode === 'INCOME' ? 'Income' : 'Expenditure',
            data: activeVals,
            borderColor: mode === 'INCOME' ? '#06b6d4' : '#ff007f',
            backgroundColor: mode === 'INCOME' ? cyanGradient : pinkGradient,
            borderWidth: 3,
            fill: true,
            tension: 0.35,
            pointBackgroundColor: '#ffffff',
            pointBorderColor: mode === 'INCOME' ? '#06b6d4' : '#ff007f',
            pointBorderWidth: 3,
            pointRadius: (ctx) => {
              const val = ctx.raw as number;
              return val > 0 && (val === this.peakValue || val === this.lowValue) ? 6 : 0;
            },
            pointHoverRadius: 8
          },
          {
            label: 'avg',
            data: avgArray,
            borderColor: 'rgba(255, 255, 255, 0.25)',
            borderWidth: 1.5,
            borderDash: [6, 6],
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            filter: (item) => item.datasetIndex === 0,
            backgroundColor: 'rgba(15, 12, 41, 0.95)',
            titleColor: '#fff',
            bodyColor: '#cbd5e1',
            borderColor: 'rgba(244, 63, 94, 0.4)',
            borderWidth: 1,
            padding: 12,
            boxPadding: 6,
            usePointStyle: true,
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ₹ ${Number(ctx.raw).toLocaleString('en-IN')}`
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.04)'
            },
            ticks: {
              color: '#64748b',
              font: {
                family: "'Space Grotesk', sans-serif",
                weight: 'bold'
              }
            }
          },
          y: {
            title: {
              display: true,
              text: 'MONEY IN ₹ INR',
              color: '#a855f7',
              font: {
                family: "'Plus Jakarta Sans', sans-serif",
                weight: 'bold',
                size: 11
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.04)'
            },
            ticks: {
              color: '#64748b',
              font: {
                family: "'Space Grotesk', sans-serif",
                weight: 'bold'
              },
              callback: (value) => `₹ ${Number(value).toLocaleString('en-IN')}`
            }
          }
        }
      }
    });
  }

  calculateStats(vals: number[]) {
    const nonZeros = vals.filter(v => v > 0);
    if (nonZeros.length > 0) {
      const sum = nonZeros.reduce((a, b) => a + b, 0);
      this.avgValue = Math.round(sum / nonZeros.length);
      this.peakValue = Math.max(...nonZeros);
      this.lowValue = Math.min(...nonZeros);
    } else {
      this.avgValue = 52;
      this.peakValue = 765;
      this.lowValue = 494;
    }
  }

  updateChartData(data: { labels: string[]; expenses: number[]; income: number[] }, mode: string) {
    if (!this.chartInstance) return;
    const activeVals = mode === 'INCOME' ? data.income : data.expenses;
    this.calculateStats(activeVals);

    const avgArray = activeVals.map(() => this.avgValue);

    this.chartInstance.data.labels = data.labels;
    this.chartInstance.data.datasets[0].data = activeVals;
    this.chartInstance.data.datasets[0].label = mode === 'INCOME' ? 'Income' : 'Expenditure';
    this.chartInstance.data.datasets[0].borderColor = mode === 'INCOME' ? '#06b6d4' : '#ff007f';
    this.chartInstance.data.datasets[1].data = avgArray;
    this.chartInstance.update();
  }

  ngOnDestroy() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }
}
