
import React from 'react';
import { BarChart4, DollarSign, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = ({ className }: { className?: string }) => {
  return (
    <header className={cn("w-full py-4 px-6 flex justify-between items-center bg-white/80 backdrop-blur-md border-b z-10", className)}>
      <div className="flex items-center gap-2 text-nexwealth-teal">
        <DollarSign size={28} className="text-nexwealth-gold" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-nexwealth-blue to-nexwealth-teal bg-clip-text text-transparent">
          NexWealth
        </h1>
      </div>
      
      <nav className="hidden md:flex gap-8">
        <a href="#about" className="text-nexwealth-teal hover:text-nexwealth-blue transition-colors">About</a>
        <a href="#features" className="text-nexwealth-teal hover:text-nexwealth-blue transition-colors">Features</a>
        <a href="#contact" className="text-nexwealth-teal hover:text-nexwealth-blue transition-colors">Contact</a>
      </nav>
      
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <BarChart4 size={20} className="text-nexwealth-blue" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Info size={20} className="text-nexwealth-blue" />
        </button>
      </div>
    </header>
  );
};

export default Header;
