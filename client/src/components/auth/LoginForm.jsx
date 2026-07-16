import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Chrome } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';

export const LoginForm = () => {
  const { login, loginWithGoogle, getErrorMessage } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(formData);
      navigate(from, { replace: true });
    } catch (err) {
      setError(getErrorMessage(err, 'Unable to sign in.'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    setError('');
    try {
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (err) {
      setError(getErrorMessage(err, 'Google sign-in failed.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <h2 className="mb-1 text-2xl font-semibold">Welcome back</h2>
      <p className="mb-5 text-sm text-slate-500">Sign in to continue generating contracts.</p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Password</label>
          <Input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
            required
          />
        </div>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <div className="my-4 text-center text-xs uppercase tracking-wide text-slate-400">or</div>

      <Button className="w-full" variant="secondary" onClick={handleGoogle} disabled={loading}>
        <Chrome className="mr-2 h-4 w-4" /> Continue with Google
      </Button>

      <p className="mt-4 text-sm text-slate-500">
        Don&apos;t have an account?{' '}
        <Link className="font-medium text-blue-600" to="/signup">
          Sign up
        </Link>
      </p>
    </Card>
  );
};
