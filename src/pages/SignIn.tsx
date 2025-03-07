
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import AuthLayout from '@/components/layout/AuthLayout';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate authentication
    setIsLoading(true);
    
    // For demo purposes, use a timeout to simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Demo credentials for easy testing
      if (email === 'admin@biometrix.com' && password === 'password') {
        toast({
          title: "Success",
          description: "Welcome back to BiometriX",
        });
        navigate('/');
      } else {
        toast({
          title: "Authentication failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  return (
    <AuthLayout 
      title="Sign in to BiometriX" 
      subtitle="Enter your credentials to access your account"
      linkText="Don't have an account? Sign up"
      linkTo="/signup"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          <div className="flex justify-end">
            <Button variant="link" className="h-auto p-0 text-xs">
              Forgot password?
            </Button>
          </div>
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" type="button" disabled={isLoading} className="h-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 mr-2">
              <path
                fill="currentColor"
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              />
            </svg>
            Google
          </Button>
          <Button variant="outline" type="button" disabled={isLoading} className="h-10">
            <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2">
              <path
                d="M16.365 1.43c0 1.14-.788 2.083-1.83 2.342-1.03.26-1.832-.538-1.832-1.69 0-1.15.79-2.09 1.83-2.35 1.042-.25 1.832.55 1.832 1.698z"
                fill="currentColor"
              />
              <path
                d="M21.78 8.36c0-1.128-.93-2.05-2.064-2.05h-4.9c-.49 0-.7-.143-.93-.558-.23-.414-.29-.625-.522-1.08-.212-.438-.682-.77-1.22-.76-.53 0-.994.296-1.205.734-.238.454-.297.665-.537 1.08-.238.414-.447.483-.825.483h-.5v-2.05c0-1.128-.928-2.05-2.063-2.05H2.05C.93 4.109 0 5.03 0 6.16v11.793c0 1.128.93 2.05 2.063 2.05h4.9c.485 0 .7.142.93.557.23.414.29.625.522 1.08.23.438.693.704 1.22.704.53 0 .994-.266 1.205-.704.238-.455.297-.666.537-1.08.238-.415.447-.557.825-.557h4.902c1.134 0 2.064-.922 2.064-2.05V8.36z"
                fill="currentColor"
              />
              <path
                d="M6.49 14.87c-1.198 0-2.17-.97-2.17-2.168 0-1.197.972-2.17 2.17-2.17 1.197 0 2.167.973 2.167 2.17 0 1.198-.97 2.168-2.167 2.168zm0-5.54c-1.856 0-3.373 1.516-3.373 3.372s1.517 3.37 3.373 3.37c1.853 0 3.37-1.517 3.37-3.372 0-1.85-1.518-3.37-3.37-3.37zM17.25 14.87c-1.198 0-2.17-.97-2.17-2.168 0-1.197.972-2.17 2.17-2.17 1.197 0 2.167.973 2.167 2.17 0 1.198-.97 2.168-2.167 2.168zm0-5.54c-1.856 0-3.373 1.516-3.373 3.372s1.517 3.37 3.373 3.37c1.853 0 3.37-1.517 3.37-3.372 0-1.85-1.518-3.37-3.37-3.37z"
                fill="currentColor"
              />
            </svg>
            GitHub
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignIn;
