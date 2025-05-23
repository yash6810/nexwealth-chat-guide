
import React, { useContext } from 'react';
import { BarChart4, DollarSign, Info, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { AuthContext } from '@/App';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Header = ({ className, onAboutClick }: { className?: string, onAboutClick?: () => void }) => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  
  const handleInfoClick = () => {
    if (onAboutClick) {
      onAboutClick();
    }
  };
  
  const handleChartClick = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <header className={cn("w-full py-4 px-6 flex justify-between items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b z-10", className)}>
      <Link to="/" className="flex items-center gap-2 text-nexwealth-teal">
        <DollarSign size={28} className="text-nexwealth-gold" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-nexwealth-blue to-nexwealth-teal bg-clip-text text-transparent">
          NexWealth
        </h1>
      </Link>
      
      {isAuthenticated ? (
        <nav className="hidden md:flex gap-8">
          <Link to="/dashboard" className="text-nexwealth-teal hover:text-nexwealth-blue transition-colors">Dashboard</Link>
          <a href="#" className="text-nexwealth-teal hover:text-nexwealth-blue transition-colors">Analytics</a>
          <a href="#" className="text-nexwealth-teal hover:text-nexwealth-blue transition-colors">Support</a>
        </nav>
      ) : (
        <nav className="hidden md:flex gap-8">
          <a href="#about" className="text-nexwealth-teal hover:text-nexwealth-blue transition-colors">About</a>
          <a href="#features" className="text-nexwealth-teal hover:text-nexwealth-blue transition-colors">Features</a>
          <a href="#contact" className="text-nexwealth-teal hover:text-nexwealth-blue transition-colors">Contact</a>
        </nav>
      )}
      
      <div className="flex items-center gap-4 mr-8">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                onClick={handleChartClick}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="View financial charts"
              >
                <BarChart4 size={20} className="text-nexwealth-blue dark:text-nexwealth-lightTeal" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View financial charts</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                onClick={handleInfoClick}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="About NexWealth"
              >
                <Info size={20} className="text-nexwealth-blue dark:text-nexwealth-lightTeal" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>About NexWealth</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {isAuthenticated && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={() => logout()}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-red-500"
                  aria-label="Log out"
                >
                  <LogOut size={20} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Log out</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </header>
  );
};

export default Header;
