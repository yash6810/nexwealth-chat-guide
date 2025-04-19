
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AnimatedBackground from '@/components/AnimatedBackground';
import { DollarSign, BarChart2, Shield, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Landing = () => {
  const { toast } = useToast();

  const handleFeatureClick = (feature: string) => {
    toast({
      title: "Feature Highlight",
      description: `Learn more about our ${feature} feature`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Header */}
      <header className="w-full py-4 px-6 flex justify-between items-center bg-white/80 backdrop-blur-md border-b z-10">
        <div className="flex items-center gap-2">
          <DollarSign size={28} className="text-nexwealth-gold" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-nexwealth-blue to-nexwealth-teal bg-clip-text text-transparent">
            NexWealth
          </h1>
        </div>
        
        <nav className="hidden md:flex gap-8">
          <a href="#features" className="text-nexwealth-teal hover:text-nexwealth-blue transition-colors">Features</a>
          <a href="#how-it-works" className="text-nexwealth-teal hover:text-nexwealth-blue transition-colors">How It Works</a>
          <a href="#pricing" className="text-nexwealth-teal hover:text-nexwealth-blue transition-colors">Pricing</a>
        </nav>
        
        <div className="flex items-center gap-2">
          <Link to="/auth">
            <Button variant="outline" className="hidden md:inline-flex">
              Login
            </Button>
          </Link>
          <Link to="/auth?tab=signup">
            <Button className="bg-nexwealth-blue hover:bg-nexwealth-teal">
              Get Started
            </Button>
          </Link>
        </div>
      </header>
      
      {/* Hero Section */}
      <main className="flex-1 container mx-auto px-4 py-12 md:py-24 flex flex-col items-center justify-center relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Your <span className="bg-gradient-to-r from-nexwealth-blue to-nexwealth-teal bg-clip-text text-transparent">Financial</span> Future,{" "}
            <span className="bg-gradient-to-r from-nexwealth-teal to-nexwealth-gold bg-clip-text text-transparent">Reimagined</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Get personalized AI-powered financial guidance to build wealth and achieve your goals.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Link to="/auth?tab=signup">
              <Button size="lg" className="bg-nexwealth-blue hover:bg-nexwealth-blue/80 text-white px-8 py-6 text-lg">
                Get Started Now <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
                See How It Works
              </Button>
            </a>
          </div>
        </div>
      </main>
      
      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-md relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Powerful Financial Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div 
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
              onClick={() => handleFeatureClick("AI Assistant")}
            >
              <div className="w-14 h-14 bg-nexwealth-teal/10 rounded-lg flex items-center justify-center mb-6">
                <Zap className="text-nexwealth-teal" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">AI Financial Assistant</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get instant personalized advice on investing, saving, and budgeting from our advanced AI.
              </p>
            </div>
            
            <div 
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
              onClick={() => handleFeatureClick("Smart Analytics")}  
            >
              <div className="w-14 h-14 bg-nexwealth-blue/10 rounded-lg flex items-center justify-center mb-6">
                <BarChart2 className="text-nexwealth-blue" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">Smart Analytics</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Track your financial progress with interactive charts and personalized insights.
              </p>
            </div>
            
            <div 
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
              onClick={() => handleFeatureClick("Bank-Level Security")}
            >
              <div className="w-14 h-14 bg-nexwealth-gold/10 rounded-lg flex items-center justify-center mb-6">
                <Shield className="text-nexwealth-gold" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">Bank-Level Security</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your financial data stays secure with our enterprise-grade encryption and privacy controls.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            How NexWealth Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-nexwealth-blue flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="font-bold mb-2">Create an Account</h3>
              <p className="text-gray-600 dark:text-gray-300">Sign up in less than 2 minutes with just your email.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-nexwealth-teal flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="font-bold mb-2">Ask Questions</h3>
              <p className="text-gray-600 dark:text-gray-300">Chat with our AI about any financial topic or concern.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-nexwealth-blue flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="font-bold mb-2">Get Insights</h3>
              <p className="text-gray-600 dark:text-gray-300">Receive personalized advice based on your financial situation.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-nexwealth-teal flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                4
              </div>
              <h3 className="font-bold mb-2">Take Action</h3>
              <p className="text-gray-600 dark:text-gray-300">Implement recommendations and track your financial growth.</p>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <Link to="/auth?tab=signup">
              <Button size="lg" className="bg-nexwealth-blue hover:bg-nexwealth-blue/80 text-white px-8">
                Start Your Financial Journey <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-md relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto">
            Choose the plan that's right for your financial journey
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
              <p className="text-nexwealth-teal font-medium mb-2">Basic</p>
              <h3 className="text-3xl font-bold mb-2">Free</h3>
              <p className="text-gray-600 dark:text-gray-300 pb-6 border-b mb-6">Get started with essential features</p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="text-nexwealth-teal mr-2" size={18} />
                  <span>AI Financial Assistant</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-nexwealth-teal mr-2" size={18} />
                  <span>5 questions per day</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-nexwealth-teal mr-2" size={18} />
                  <span>Basic financial insights</span>
                </li>
              </ul>
              
              <Link to="/auth?tab=signup&plan=free">
                <Button variant="outline" className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-nexwealth-blue/90 to-nexwealth-teal/80 p-8 rounded-xl shadow-lg border border-nexwealth-teal/20 text-white transform scale-105">
              <div className="absolute top-0 right-0 bg-nexwealth-gold text-nexwealth-blue font-bold px-4 py-1 rounded-tr-xl rounded-bl-xl">
                POPULAR
              </div>
              <p className="font-medium mb-2">Premium</p>
              <h3 className="text-3xl font-bold mb-2">$9.99 <span className="text-lg font-normal">/month</span></h3>
              <p className="text-white/80 pb-6 border-b border-white/20 mb-6">Everything in Basic, plus more</p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="mr-2" size={18} />
                  <span>Unlimited AI questions</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2" size={18} />
                  <span>Advanced financial insights</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2" size={18} />
                  <span>Chat history & memory</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2" size={18} />
                  <span>Priority support</span>
                </li>
              </ul>
              
              <Link to="/auth?tab=signup&plan=premium">
                <Button className="w-full bg-white text-nexwealth-blue hover:bg-white/90">
                  Choose Premium
                </Button>
              </Link>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
              <p className="text-nexwealth-blue font-medium mb-2">Enterprise</p>
              <h3 className="text-3xl font-bold mb-2">Custom</h3>
              <p className="text-gray-600 dark:text-gray-300 pb-6 border-b mb-6">For organizations and teams</p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="text-nexwealth-blue mr-2" size={18} />
                  <span>All Premium features</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-nexwealth-blue mr-2" size={18} />
                  <span>Team collaboration tools</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-nexwealth-blue mr-2" size={18} />
                  <span>API access</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-nexwealth-blue mr-2" size={18} />
                  <span>Dedicated account manager</span>
                </li>
              </ul>
              
              <Link to="/contact">
                <Button variant="outline" className="w-full border-nexwealth-blue text-nexwealth-blue hover:bg-nexwealth-blue/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-4 border-t backdrop-blur-md bg-white/50 dark:bg-gray-900/80 relative z-10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <DollarSign size={24} className="text-nexwealth-gold" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-nexwealth-blue to-nexwealth-teal bg-clip-text text-transparent">
                NexWealth
              </h1>
            </div>
            
            <div className="flex gap-8">
              <a href="#" className="text-gray-600 hover:text-nexwealth-blue transition-colors">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-nexwealth-blue transition-colors">Terms</a>
              <a href="#" className="text-gray-600 hover:text-nexwealth-blue transition-colors">Help</a>
            </div>
          </div>
          
          <div className="text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} NexWealth. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
