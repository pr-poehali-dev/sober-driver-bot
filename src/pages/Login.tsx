import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Вход выполнен успешно!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Icon name="Car" className="text-white" size={28} />
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Вход</h1>
          <p className="text-muted-foreground mt-2">Войдите в свой аккаунт DriveNow</p>
        </div>

        <Card className="shadow-2xl border-2">
          <CardHeader>
            <CardTitle>Добро пожаловать</CardTitle>
            <CardDescription>Введите ваши данные для входа</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email или телефон</Label>
                <Input 
                  id="email" 
                  type="text" 
                  placeholder="example@mail.ru или +7 (___) ___-__-__" 
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Пароль</Label>
                  <a href="#" className="text-sm text-primary hover:underline">
                    Забыли пароль?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Введите пароль" 
                  required
                />
              </div>

              <Button type="submit" className="w-full gradient-primary" size="lg">
                <Icon name="LogIn" size={20} className="mr-2" />
                Войти
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Нет аккаунта?{' '}
              <Link to="/register" className="text-primary font-semibold hover:underline">
                Зарегистрироваться
              </Link>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">или</span>
              </div>
            </div>

            <div className="grid gap-2">
              <Button variant="outline" type="button">
                <Icon name="Mail" size={18} className="mr-2" />
                Войти через Google
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
