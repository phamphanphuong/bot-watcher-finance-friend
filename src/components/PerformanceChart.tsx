
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { PerformanceData } from '@/lib/mockData';

interface PerformanceChartProps {
  data: PerformanceData[];
  title?: string;
  className?: string;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ 
  data, 
  title = "Hiệu suất Bot", 
  className = "" 
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(value);
  };

  const chartData = useMemo(() => {
    return data.map(item => ({
      ...item,
      formattedDate: new Date(item.date).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit'
      })
    }));
  }, [data]);

  // Calculate percent change from first to last data point
  const percentChange = useMemo(() => {
    if (data.length < 2) return 0;
    const firstValue = data[0].value;
    const lastValue = data[data.length - 1].value;
    return ((lastValue - firstValue) / firstValue) * 100;
  }, [data]);

  const isPositiveTrend = percentChange >= 0;
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border p-3 rounded shadow-sm text-sm">
          <p className="mb-1">{payload[0].payload.date}</p>
          <p className="font-semibold">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={`border shadow-sm ${className}`}>
      <CardHeader className="pb-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              1D
            </Button>
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              1W
            </Button>
            <Button variant="ghost" size="sm" className="h-7 text-xs bg-secondary">
              1M
            </Button>
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              3M
            </Button>
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              1Y
            </Button>
          </div>
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-2xl font-bold">
            {formatCurrency(data[data.length - 1]?.value || 0)}
          </span>
          <span className={`text-sm ${isPositiveTrend ? 'text-profit' : 'text-loss'}`}>
            {isPositiveTrend ? '+' : ''}{percentChange.toFixed(2)}%
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop 
                    offset="5%" 
                    stopColor={isPositiveTrend ? "#10B981" : "#EF4444"} 
                    stopOpacity={0.3}
                  />
                  <stop 
                    offset="95%" 
                    stopColor={isPositiveTrend ? "#10B981" : "#EF4444"} 
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis 
                dataKey="formattedDate" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11 }}
                tickMargin={8}
                minTickGap={5}
                interval="preserveStartEnd"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11 }}
                tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                tickMargin={8}
                domain={['dataMin - 1000000', 'dataMax + 1000000']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={isPositiveTrend ? "#10B981" : "#EF4444"} 
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
