
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  linkText: string;
  linkTo: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  linkText,
  linkTo,
}) => {
  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="flex items-center justify-center mb-8">
          <div className="w-12 h-12 rounded-md bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold mr-3">
            B
          </div>
          <h1 className="text-2xl font-bold">BiometriX</h1>
        </div>
        
        <div className="bg-card rounded-xl border border-border shadow-sm p-8">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold mb-2">{title}</h2>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
          
          {children}
          
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">{linkText.split(' ')[0]} </span>
            <Link to={linkTo} className="font-medium text-primary hover:underline">
              {linkText.split(' ').slice(1).join(' ')}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
