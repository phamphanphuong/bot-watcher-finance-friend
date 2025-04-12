
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Transaction } from '@/lib/mockData';

interface TransactionListProps {
  transactions: Transaction[];
  className?: string;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, className = "" }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Hoàn tất';
      case 'pending':
        return 'Đang xử lý';
      case 'failed':
        return 'Thất bại';
      default:
        return status;
    }
  };

  return (
    <Card className={`border shadow-sm ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">Lịch sử giao dịch gần đây</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Loại
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Mã CK
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Số lượng
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Giá
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Tổng
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Thời gian
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 text-sm font-medium">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.type === 'buy' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {transaction.type === 'buy' ? 'Mua' : 'Bán'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {transaction.symbol}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {transaction.amount}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {formatCurrency(transaction.price)}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">
                    {formatCurrency(transaction.total)}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {formatDate(transaction.timestamp)}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(transaction.status)}`}>
                      {getStatusText(transaction.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionList;
