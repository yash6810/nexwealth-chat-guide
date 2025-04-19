
import React, { useState } from 'react';
import ChatContainer from '@/components/ChatContainer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { History, MessageSquare, Settings, LogOut } from 'lucide-react';
import Header from '@/components/Header';
import ChatHistory from '@/components/ChatHistory';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<string>('chat');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header className="shadow-sm" 
        onAboutClick={() => setActiveTab('settings')}
      />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:flex w-20 lg:w-64 flex-col bg-white dark:bg-gray-800 border-r p-4 shadow-sm">
          <div className="flex flex-col space-y-2">
            <Button 
              variant={activeTab === 'chat' ? 'default' : 'ghost'} 
              className={`justify-start ${activeTab === 'chat' ? 'bg-nexwealth-teal hover:bg-nexwealth-teal/90' : ''}`}
              onClick={() => setActiveTab('chat')}
            >
              <MessageSquare size={20} className="mr-2" />
              <span className="hidden lg:inline">Chat</span>
            </Button>
            
            <Button 
              variant={activeTab === 'history' ? 'default' : 'ghost'}
              className={`justify-start ${activeTab === 'history' ? 'bg-nexwealth-teal hover:bg-nexwealth-teal/90' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              <History size={20} className="mr-2" />
              <span className="hidden lg:inline">Chat History</span>
            </Button>
            
            <Button 
              variant={activeTab === 'settings' ? 'default' : 'ghost'}
              className={`justify-start ${activeTab === 'settings' ? 'bg-nexwealth-teal hover:bg-nexwealth-teal/90' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings size={20} className="mr-2" />
              <span className="hidden lg:inline">Settings</span>
            </Button>
          </div>
          
          <div className="mt-auto">
            <Button 
              variant="ghost" 
              className="justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 w-full"
              onClick={handleLogout}
            >
              <LogOut size={20} className="mr-2" />
              <span className="hidden lg:inline">Log Out</span>
            </Button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-hidden p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <div className="md:hidden mb-4">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="chat" className="flex-1 h-[calc(100%-3rem)]">
              <ChatContainer />
            </TabsContent>
            
            <TabsContent value="history" className="flex-1 overflow-auto">
              <ChatHistory />
            </TabsContent>
            
            <TabsContent value="settings" className="flex-1 overflow-auto">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Settings</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Customize your NexWealth experience and manage your account settings.
                </p>
                
                <div className="border-t pt-4 mt-4">
                  <h3 className="font-medium mb-2">Account Information</h3>
                  <p className="text-sm text-gray-500">Email: user@example.com</p>
                  <p className="text-sm text-gray-500">Plan: Premium</p>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <h3 className="font-medium mb-2">Privacy Settings</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    Manage how your data is stored and used.
                  </p>
                  
                  <Button variant="outline" size="sm" className="mt-2">
                    Manage Privacy Settings
                  </Button>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <h3 className="font-medium mb-2">Delete Chat History</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    Clear all your previous conversations. This action cannot be undone.
                  </p>
                  
                  <Button variant="destructive" size="sm" className="mt-2">
                    Clear All History
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
