import React from 'react';
import { useAuth } from '../context/AuthContext';
import { signInWithGoogle } from '../lib/firebase';
import { Navigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { GraduationCap, LogIn } from 'lucide-react';
import { motion } from 'motion/react';

const Login: React.FC = () => {
  const { user, profile, loading } = useAuth();

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  if (user && profile) {
    return <Navigate to={`/${profile.role}/dashboard`} replace />;
  }

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md shadow-2xl border-border bg-card">
          <CardHeader className="text-center space-y-1">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/20 p-3 rounded-full">
                <GraduationCap className="h-10 w-10 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight text-foreground">CMDI Grade Portal</CardTitle>
            <CardDescription className="text-muted-foreground">
              Welcome back. Please sign in to access your portal.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 pt-4">
            <Button 
                onClick={handleLogin} 
                className="w-full h-12 text-lg font-medium transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20"
            >
              <LogIn className="mr-2 h-5 w-5" /> Sign in with Google
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-4">
              Authorized personnel and students only. CMDI Security Protocol active.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
