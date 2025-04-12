
import React from 'react';
import { Bot } from '@/lib/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Pause, Play, AlertTriangle } from 'lucide-react';

interface BotCardProps {
  bot: Bot;
}

const BotCard: React.FC<BotCardProps> = ({ bot }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(value);
  };

  const getStatusIcon = () => {
    switch (bot.status) {
      case 'active':
        return <Activity className="h-5 w-5 text-primary" />;
      case 'paused':
        return <Pause className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (bot.status) {
      case 'active':
        return 'Đang hoạt động';
      case 'paused':
        return 'Tạm dừng';
      case 'error':
        return 'Lỗi';
      default:
        return '';
    }
  };

  return (
    <Card className="border shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base font-medium">{bot.name}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{bot.description}</p>
          </div>
          <div className="flex items-center gap-1 text-sm px-2 py-0.5 rounded-full">
            {getStatusIcon()}
            <span 
              className={`text-xs ${
                bot.status === 'active' ? 'text-primary' : 
                bot.status === 'paused' ? 'text-yellow-500' : 
                'text-destructive'
              }`}
            >
              {getStatusText()}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <p className="text-sm text-muted-foreground">Lợi nhuận/Thua lỗ</p>
            <p className={`text-lg font-semibold ${bot.profitLoss >= 0 ? 'text-profit' : 'text-loss'}`}>
              {formatCurrency(bot.profitLoss)}
            </p>
            <p className={`text-xs ${bot.profitLossPercentage >= 0 ? 'text-profit' : 'text-loss'}`}>
              {bot.profitLossPercentage >= 0 ? '+' : ''}{bot.profitLossPercentage}%
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Số dư</p>
            <p className="text-lg font-semibold">{formatCurrency(bot.balance)}</p>
            <p className="text-xs text-muted-foreground">{bot.transactions} giao dịch</p>
          </div>
        </div>
        
        <div className="flex justify-between mt-4">
          <p className="text-xs text-muted-foreground">
            Chiến lược: <span className="font-medium text-foreground">{bot.strategy}</span>
          </p>
          {bot.status === 'active' ? (
            <Button variant="outline" size="sm" className="h-8">
              <Pause className="h-3.5 w-3.5 mr-1" />
              Tạm dừng
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="h-8">
              <Play className="h-3.5 w-3.5 mr-1" />
              Bắt đầu
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BotCard;
