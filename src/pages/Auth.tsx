
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedBackground from '@/components/AnimatedBackground';
import { DollarSign, ArrowRight, Mail, Lock, UserPlus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '@/App';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { login } = useContext(AuthContext);

  // Check if there's a tab parameter in the URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    if (tabParam === 'signup') {
      setActiveTab('signup');
    }
  }, [location]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login behavior - in a real app, you'd verify credentials
    if (email && password) {
      login();
      toast({
        title: "Logged in successfully!",
        description: "Welcome back to NexWealth.",
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Login failed",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock signup behavior
    if (email && password && name) {
      login();
      toast({
        title: "Account created!",
        description: "Welcome to NexWealth.",
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Signup failed",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="container mx-auto flex flex-col items-center justify-center h-screen relative z-10 px-4">
        <Link to="/" className="flex items-center gap-2 text-nexwealth-blue mb-6">
          <DollarSign size={36} className="text-nexwealth-gold" />
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-nexwealth-blue to-nexwealth-teal bg-clip-text text-transparent">
            NexWealth
          </h1>
        </Link>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card className="backdrop-blur-md bg-white/90 border border-gray-200 dark:bg-gray-900/80 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl">Welcome Back</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="you@example.com" 
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="••••••••" 
                        className="pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full bg-nexwealth-teal hover:bg-nexwealth-teal/80">
                    Login <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="signup">
            <Card className="backdrop-blur-md bg-white/90 border border-gray-200 dark:bg-gray-900/80 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl">Create Account</CardTitle>
                <CardDescription>Sign up to start your financial journey</CardDescription>
              </CardHeader>
              <form onSubmit={handleSignup}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                    <div className="relative">
                      <UserPlus className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input 
                        id="name" 
                        type="text" 
                        placeholder="John Doe" 
                        className="pl-10"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="signup-email" className="text-sm font-medium">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input 
                        id="signup-email" 
                        type="email" 
                        placeholder="you@example.com" 
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="signup-password" className="text-sm font-medium">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input 
                        id="signup-password" 
                        type="password" 
                        placeholder="••••••••" 
                        className="pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full bg-nexwealth-blue hover:bg-nexwealth-blue/80">
                    Create Account <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
        
        <p className="mt-8 text-sm text-center text-gray-500">
          By continuing, you agree to NexWealth's Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Auth;
