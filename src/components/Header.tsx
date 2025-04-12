
import React from 'react';
import { Bell, Search, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  return (
    <header className="border-b bg-card">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
        <div className="flex items-center gap-4">
          <h1 className="font-semibold text-lg md:text-xl">StockBot Tracker</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Tìm kiếm..."
              className="w-64 h-9 pl-8 bg-secondary border-0 rounded-md focus:ring-1 focus:ring-primary"
            />
          </div>

          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Bell className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Settings className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="border rounded-full overflow-hidden">
            <span className="sr-only">User profile</span>
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
              <span className="font-medium text-sm">NT</span>
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
