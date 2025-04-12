
// Bot interface
export interface Bot {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'error';
  createdAt: string;
  profitLoss: number;
  profitLossPercentage: number;
  balance: number;
  transactions: number;
  strategy: string;
  lastTransaction: string;
}

// Transaction interface
export interface Transaction {
  id: string;
  botId: string;
  type: 'buy' | 'sell';
  symbol: string;
  amount: number;
  price: number;
  total: number;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
}

// Performance data point
export interface PerformanceData {
  date: string;
  value: number;
}

// Mock bots
export const bots: Bot[] = [
  {
    id: '1',
    name: 'VN30 Momentum Tracker',
    description: 'Follows momentum signals for VN30 stocks',
    status: 'active',
    createdAt: '2023-12-01T00:00:00Z',
    profitLoss: 1250000,
    profitLossPercentage: 4.2,
    balance: 30250000,
    transactions: 47,
    strategy: 'Momentum',
    lastTransaction: '2023-04-10T14:30:00Z'
  },
  {
    id: '2',
    name: 'Blue Chip Dividend',
    description: 'Invests in high-yield dividend stocks',
    status: 'active',
    createdAt: '2024-01-15T00:00:00Z',
    profitLoss: 780000,
    profitLossPercentage: 2.6,
    balance: 29780000,
    transactions: 23,
    strategy: 'Dividend',
    lastTransaction: '2023-04-11T10:15:00Z'
  },
  {
    id: '3',
    name: 'Tech Sector Swing',
    description: 'Swing trading on technology sector',
    status: 'paused',
    createdAt: '2024-02-10T00:00:00Z',
    profitLoss: -450000,
    profitLossPercentage: -1.5,
    balance: 28550000,
    transactions: 35,
    strategy: 'Swing Trading',
    lastTransaction: '2023-04-09T09:45:00Z'
  },
  {
    id: '4',
    name: 'Small Cap Hunter',
    description: 'Seeks undervalued small cap stocks',
    status: 'error',
    createdAt: '2024-03-01T00:00:00Z',
    profitLoss: -820000,
    profitLossPercentage: -2.7,
    balance: 28180000,
    transactions: 19,
    strategy: 'Value',
    lastTransaction: '2023-04-08T16:20:00Z'
  }
];

// Mock transactions
export const transactions: Transaction[] = [
  {
    id: 't1',
    botId: '1',
    type: 'buy',
    symbol: 'VNM',
    amount: 100,
    price: 80000,
    total: 8000000,
    timestamp: '2023-04-10T14:30:00Z',
    status: 'completed'
  },
  {
    id: 't2',
    botId: '2',
    type: 'buy',
    symbol: 'VIC',
    amount: 50,
    price: 90000,
    total: 4500000,
    timestamp: '2023-04-11T10:15:00Z',
    status: 'completed'
  },
  {
    id: 't3',
    botId: '3',
    type: 'sell',
    symbol: 'FPT',
    amount: 75,
    price: 95000,
    total: 7125000,
    timestamp: '2023-04-09T09:45:00Z',
    status: 'completed'
  },
  {
    id: 't4',
    botId: '4',
    type: 'buy',
    symbol: 'PNJ',
    amount: 120,
    price: 70000,
    total: 8400000,
    timestamp: '2023-04-08T16:20:00Z',
    status: 'failed'
  },
  {
    id: 't5',
    botId: '1',
    type: 'sell',
    symbol: 'MSN',
    amount: 60,
    price: 105000,
    total: 6300000,
    timestamp: '2023-04-07T11:10:00Z',
    status: 'completed'
  },
  {
    id: 't6',
    botId: '2',
    type: 'buy',
    symbol: 'TCB',
    amount: 200,
    price: 32000,
    total: 6400000,
    timestamp: '2023-04-06T15:45:00Z',
    status: 'completed'
  },
  {
    id: 't7',
    botId: '3',
    type: 'sell',
    symbol: 'HPG',
    amount: 150,
    price: 28000,
    total: 4200000,
    timestamp: '2023-04-05T13:30:00Z',
    status: 'pending'
  },
  {
    id: 't8',
    botId: '1',
    type: 'buy',
    symbol: 'VHM',
    amount: 80,
    price: 65000,
    total: 5200000,
    timestamp: '2023-04-04T10:00:00Z',
    status: 'completed'
  }
];

// Mock performance data
export const generatePerformanceData = (botId: string): PerformanceData[] => {
  const bot = bots.find(b => b.id === botId);
  const data: PerformanceData[] = [];
  const now = new Date();
  let value = 29000000; // Starting value
  
  // Generate 30 days of data
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    
    // Random daily fluctuation between -1% and +1.5%
    const fluctuation = (Math.random() * 2.5 - 1) / 100;
    
    // Add some bias based on the bot's profitLoss
    const bias = bot ? (bot.profitLossPercentage / 100) / 30 : 0;
    
    value = value * (1 + fluctuation + bias);
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(value)
    });
  }
  
  return data;
};

// Overall portfolio statistics
export const portfolioStats = {
  totalValue: 116760000,
  totalProfit: 760000,
  totalProfitPercentage: 0.65,
  activeBotsCount: 2,
  pausedBotsCount: 1,
  errorBotsCount: 1,
  dailyTransactions: 5,
  monthlyTransactions: 78
};
