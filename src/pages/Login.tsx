import { useState } from 'react';
import { LoginForm } from '@/components/LoginForm';
import { SignUpForm } from '@/components/SignUpForm';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-ocean flex items-center justify-center p-4">
      {isSignUp ? (
        <SignUpForm onSwitchToLogin={() => setIsSignUp(false)} />
      ) : (
        <LoginForm onSwitchToSignUp={() => setIsSignUp(true)} />
      )}
    </div>
  );
}