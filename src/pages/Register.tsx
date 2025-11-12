import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

type UserRole = 'client' | 'driver';

const Register = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole>(
    (searchParams.get('role') as UserRole) || 'client'
  );

  useEffect(() => {
    const role = searchParams.get('role') as UserRole;
    if (role === 'client' || role === 'driver') {
      setSelectedRole(role);
    }
  }, [searchParams]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Регистрация успешна! Добро пожаловать в DriveNow');
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
          <h1 className="text-3xl font-bold text-gray-900">Регистрация</h1>
          <p className="text-muted-foreground mt-2">Создайте аккаунт в DriveNow</p>
        </div>

        <Card className="shadow-2xl border-2">
          <CardHeader>
            <CardTitle>Выберите роль</CardTitle>
            <CardDescription>Вы регистрируетесь как заказчик или водитель?</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedRole} onValueChange={(v) => setSelectedRole(v as UserRole)} className="mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="client">
                  <Icon name="MapPin" size={18} className="mr-2" />
                  Заказчик
                </TabsTrigger>
                <TabsTrigger value="driver">
                  <Icon name="Car" size={18} className="mr-2" />
                  Водитель
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Полное имя</Label>
                <Input 
                  id="name" 
                  placeholder="Иван Иванов" 
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="+7 (___) ___-__-__" 
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="example@mail.ru" 
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Минимум 6 символов" 
                  required
                  minLength={6}
                />
              </div>

              {selectedRole === 'driver' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="car">Марка и модель авто</Label>
                    <Input 
                      id="car" 
                      placeholder="Toyota Camry" 
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="carNumber">Госномер</Label>
                    <Input 
                      id="carNumber" 
                      placeholder="А123БВ 77" 
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Стаж вождения (лет)</Label>
                    <Input 
                      id="experience" 
                      type="number" 
                      placeholder="5" 
                      required
                      min={1}
                    />
                  </div>
                </>
              )}

              <Button type="submit" className="w-full gradient-primary" size="lg">
                <Icon name="UserPlus" size={20} className="mr-2" />
                Зарегистрироваться
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Уже есть аккаунт?{' '}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Войти
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
