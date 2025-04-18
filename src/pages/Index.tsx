
import React from 'react';
import ChatContainer from '@/components/ChatContainer';
import AnimatedBackground from '@/components/AnimatedBackground';
import Header from '@/components/Header';
import { ArrowRight, BarChart2, Shield, Zap, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const handleLearnMoreClick = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Animated background */}
      <AnimatedBackground />
      
      {/* Header */}
      <Header />
      
      {/* Hero section */}
      <main className="flex-1 container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left column - Info */}
        <div className="flex flex-col order-2 lg:order-1">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Your <span className="bg-gradient-to-r from-nexwealth-blue to-nexwealth-teal bg-clip-text text-transparent">Financial</span> Future,{" "}
            <span className="bg-gradient-to-r from-nexwealth-teal to-nexwealth-gold bg-clip-text text-transparent">Reimagined</span>
          </h1>
          
          <p className="text-lg text-gray-700 mb-8">
            Get personalized financial guidance powered by AI. Ask questions about budgeting, investing, saving, and more to build a stronger financial future.
          </p>
          
          {/* Feature highlights */}
          <div id="features" className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-nexwealth-teal/10 rounded-lg">
                <BarChart2 className="text-nexwealth-teal" size={20} />
              </div>
              <div>
                <h3 className="font-medium">Personalized Advice</h3>
                <p className="text-sm text-gray-600">Tailored financial guidance for your goals</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-nexwealth-teal/10 rounded-lg">
                <Zap className="text-nexwealth-teal" size={20} />
              </div>
              <div>
                <h3 className="font-medium">Instant Answers</h3>
                <p className="text-sm text-gray-600">Get financial insights in seconds</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-nexwealth-teal/10 rounded-lg">
                <Shield className="text-nexwealth-teal" size={20} />
              </div>
              <div>
                <h3 className="font-medium">Private & Secure</h3>
                <p className="text-sm text-gray-600">Your financial data stays protected</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-nexwealth-teal/10 rounded-lg">
                <ArrowRight className="text-nexwealth-teal" size={20} />
              </div>
              <div>
                <h3 className="font-medium">Learn As You Go</h3>
                <p className="text-sm text-gray-600">Build financial literacy with each chat</p>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex flex-col space-y-6">
            <Button 
              onClick={handleLearnMoreClick}
              className="bg-nexwealth-blue hover:bg-nexwealth-teal text-white px-6 py-2 w-fit"
            >
              Learn More
            </Button>
            
            <div id="about" className="pt-6 border-t">
              <h2 className="text-2xl font-bold mb-4">About NexWealth</h2>
              <p className="text-gray-700">
                NexWealth is your AI-powered financial assistant, designed to help you make better financial decisions. 
                Our mission is to democratize financial advice through cutting-edge AI technology.
              </p>
            </div>
            
            <div id="contact" className="pt-6 border-t">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <div className="flex flex-col space-y-3">
                <a href="mailto:contact@nexwealth.ai" className="flex items-center gap-2 text-nexwealth-blue hover:text-nexwealth-teal transition-colors">
                  <Mail size={18} />
                  <span>contact@nexwealth.ai</span>
                </a>
                <a href="tel:+15551234567" className="flex items-center gap-2 text-nexwealth-blue hover:text-nexwealth-teal transition-colors">
                  <Phone size={18} />
                  <span>+1 (555) 123-4567</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column - Chat */}
        <div className="lg:order-2 w-full h-[600px] order-1">
          <ChatContainer />
        </div>
      </main>
    </div>
  );
};

export default Index;
