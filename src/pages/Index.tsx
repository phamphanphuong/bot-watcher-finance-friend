
import React from 'react';
import Header from '@/components/Header';
import BotCard from '@/components/BotCard';
import StatCard from '@/components/StatCard';
import PerformanceChart from '@/components/PerformanceChart';
import TransactionList from '@/components/TransactionList';
import { bots, generatePerformanceData, portfolioStats, transactions } from '@/lib/mockData';
import { Activity, TrendingUp, TrendingDown, Wallet, Bot, BarChart, CreditCard, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container px-4 pt-6 pb-12 mx-auto md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Tổng quan danh mục</h2>
            <p className="text-muted-foreground">
              Kiểm tra hiệu suất và quản lý các bot giao dịch của bạn
            </p>
          </div>
          <Button className="mt-2 md:mt-0">
            <Bot className="mr-2 h-4 w-4" />
            Tạo Bot mới
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <StatCard 
            title="Tổng giá trị danh mục" 
            value={formatCurrency(portfolioStats.totalValue)}
            icon={<Wallet className="h-4 w-4" />}
            trend={portfolioStats.totalProfitPercentage >= 0 ? 'up' : 'down'}
            trendValue={`${portfolioStats.totalProfitPercentage >= 0 ? '+' : ''}${portfolioStats.totalProfitPercentage.toFixed(2)}%`}
          />
          <StatCard 
            title="Bot đang hoạt động" 
            value={`${portfolioStats.activeBotsCount}`}
            icon={<Activity className="h-4 w-4 text-primary" />}
          />
          <StatCard 
            title="Bot tạm dừng" 
            value={`${portfolioStats.pausedBotsCount}`}
            icon={<Bot className="h-4 w-4 text-yellow-500" />}
          />
          <StatCard 
            title="Bot lỗi" 
            value={`${portfolioStats.errorBotsCount}`}
            icon={<AlertTriangle className="h-4 w-4 text-destructive" />}
          />
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-7">
          <PerformanceChart 
            data={generatePerformanceData('overall')} 
            title="Hiệu suất danh mục"
            className="md:col-span-5"
          />
          <div className="grid gap-4 md:col-span-2">
            <StatCard 
              title="Lợi nhuận/Thua lỗ" 
              value={formatCurrency(portfolioStats.totalProfit)}
              icon={portfolioStats.totalProfit >= 0 ? <TrendingUp className="h-4 w-4 text-profit" /> : <TrendingDown className="h-4 w-4 text-loss" />}
              trend={portfolioStats.totalProfit >= 0 ? 'up' : 'down'}
              trendValue={`${portfolioStats.totalProfit >= 0 ? '+' : ''}${portfolioStats.totalProfitPercentage.toFixed(2)}%`}
            />
            <StatCard 
              title="Giao dịch hôm nay" 
              value={`${portfolioStats.dailyTransactions}`}
              icon={<BarChart className="h-4 w-4" />}
            />
            <StatCard 
              title="Giao dịch tháng này" 
              value={`${portfolioStats.monthlyTransactions}`}
              icon={<CreditCard className="h-4 w-4" />}
            />
          </div>
        </div>

        <h3 className="text-lg font-medium mt-8 mb-4">Bot của bạn</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bots.map((bot) => (
            <BotCard key={bot.id} bot={bot} />
          ))}
        </div>

        <div className="mt-8">
          <TransactionList transactions={transactions} />
        </div>
      </main>
    </div>
  );
};

export default Index;
