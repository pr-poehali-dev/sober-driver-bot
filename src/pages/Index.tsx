import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

type UserRole = 'client' | 'driver';

interface Order {
  id: number;
  clientName: string;
  from: string;
  to: string;
  distance: string;
  time: string;
  status: 'open' | 'in_progress' | 'completed';
  responses: Response[];
}

interface Response {
  driverId: number;
  driverName: string;
  rating: number;
  price: number;
  experience: string;
  avatar: string;
}

const Index = () => {
  const [userRole, setUserRole] = useState<UserRole>('client');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const mockOrders: Order[] = [
    {
      id: 1,
      clientName: 'Александр К.',
      from: 'ул. Ленина, 45',
      to: 'пр. Мира, 120',
      distance: '8.5 км',
      time: '15 мин назад',
      status: 'open',
      responses: [
        {
          driverId: 1,
          driverName: 'Дмитрий С.',
          rating: 4.9,
          price: 1500,
          experience: '5 лет',
          avatar: '/placeholder.svg'
        },
        {
          driverId: 2,
          driverName: 'Михаил П.',
          rating: 4.7,
          price: 1300,
          experience: '3 года',
          avatar: '/placeholder.svg'
        },
        {
          driverId: 3,
          driverName: 'Сергей В.',
          rating: 4.8,
          price: 1450,
          experience: '7 лет',
          avatar: '/placeholder.svg'
        }
      ]
    },
    {
      id: 2,
      clientName: 'Мария В.',
      from: 'ул. Гагарина, 12',
      to: 'ул. Победы, 88',
      distance: '12.3 км',
      time: '32 мин назад',
      status: 'open',
      responses: [
        {
          driverId: 4,
          driverName: 'Андрей К.',
          rating: 5.0,
          price: 1800,
          experience: '10 лет',
          avatar: '/placeholder.svg'
        }
      ]
    },
    {
      id: 3,
      clientName: 'Игорь Т.',
      from: 'Центральный рынок',
      to: 'Аэропорт',
      distance: '25 км',
      time: '1 час назад',
      status: 'open',
      responses: []
    }
  ];

  const handleResponseToOrder = (orderId: number) => {
    toast.success('Ваш отклик отправлен заказчику!');
  };

  const handleSelectDriver = (order: Order, driver: Response) => {
    toast.success(`Вы выбрали водителя ${driver.driverName}. Переходим в чат...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50">
      <header className="gradient-primary text-white py-6 px-4 shadow-xl">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center">
                <Icon name="Car" className="text-primary" size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-bold">DriveNow</h1>
                <p className="text-sm text-white/80">Биржа трезвых водителей</p>
              </div>
            </div>
            <Button variant="outline" className="bg-white text-primary hover:bg-white/90 border-0">
              <Icon name="User" size={18} className="mr-2" />
              Профиль
            </Button>
          </div>

          <Tabs value={userRole} onValueChange={(v) => setUserRole(v as UserRole)} className="w-full max-w-md mx-auto">
            <TabsList className="grid w-full grid-cols-2 bg-white/20 backdrop-blur-sm">
              <TabsTrigger 
                value="client" 
                className="data-[state=active]:bg-white data-[state=active]:text-primary text-white"
              >
                <Icon name="MapPin" size={18} className="mr-2" />
                Заказчик
              </TabsTrigger>
              <TabsTrigger 
                value="driver"
                className="data-[state=active]:bg-white data-[state=active]:text-primary text-white"
              >
                <Icon name="Car" size={18} className="mr-2" />
                Водитель
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {userRole === 'client' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Мои заявки</h2>
                <p className="text-muted-foreground">Управляйте заказами и выбирайте водителей</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="gradient-primary border-0 shadow-lg hover:shadow-xl transition-all">
                    <Icon name="Plus" size={20} className="mr-2" />
                    Создать заявку
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Новая заявка</DialogTitle>
                    <DialogDescription>
                      Укажите детали поездки для трезвого водителя
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="from">Откуда</Label>
                      <div className="relative">
                        <Icon name="MapPin" size={18} className="absolute left-3 top-3 text-muted-foreground" />
                        <Input id="from" placeholder="Адрес подачи" className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="to">Куда</Label>
                      <div className="relative">
                        <Icon name="Navigation" size={18} className="absolute left-3 top-3 text-muted-foreground" />
                        <Input id="to" placeholder="Адрес назначения" className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="details">Дополнительно</Label>
                      <Textarea id="details" placeholder="Комментарии, пожелания..." />
                    </div>
                  </div>
                  <Button className="w-full gradient-primary" onClick={() => toast.success('Заявка создана!')}>
                    Опубликовать заявку
                  </Button>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {mockOrders.map((order, idx) => (
                <Card 
                  key={order.id} 
                  className="hover:shadow-lg transition-all border-2 animate-fade-in cursor-pointer"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-xl">Заказ #{order.id}</CardTitle>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <Icon name="Circle" size={8} className="mr-1 fill-green-500" />
                            Активна
                          </Badge>
                        </div>
                        <CardDescription className="flex items-center gap-2">
                          <Icon name="Clock" size={14} />
                          {order.time}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Откликов</div>
                        <div className="text-2xl font-bold text-primary">{order.responses.length}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                          <Icon name="MapPin" size={16} className="text-secondary" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Откуда</div>
                          <div className="font-medium">{order.from}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                          <Icon name="Navigation" size={16} className="text-accent" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Куда</div>
                          <div className="font-medium">{order.to}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="Route" size={16} />
                        <span>{order.distance}</span>
                      </div>
                    </div>

                    {order.responses.length > 0 && (
                      <div className="space-y-3">
                        <div className="text-sm font-semibold text-gray-700">Отклики водителей:</div>
                        {order.responses.map((response) => (
                          <div 
                            key={response.driverId} 
                            className="p-4 rounded-xl border-2 hover:border-primary transition-all bg-gradient-card"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <Avatar className="border-2 border-white shadow">
                                  <AvatarImage src={response.avatar} />
                                  <AvatarFallback>{response.driverName[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-semibold">{response.driverName}</div>
                                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Icon name="Star" size={14} className="fill-yellow-400 text-yellow-400" />
                                    <span className="font-medium">{response.rating}</span>
                                    <span className="mx-1">•</span>
                                    <span>Опыт {response.experience}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-primary">{response.price} ₽</div>
                              </div>
                            </div>
                            <Button 
                              className="w-full" 
                              variant="outline"
                              onClick={() => handleSelectDriver(order, response)}
                            >
                              <Icon name="MessageCircle" size={18} className="mr-2" />
                              Выбрать и написать
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    {order.responses.length === 0 && (
                      <div className="text-center py-6 text-muted-foreground">
                        <Icon name="Users" size={32} className="mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Пока нет откликов</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Доступные заказы</h2>
              <p className="text-muted-foreground">Откликайтесь на заявки поблизости</p>
            </div>

            <div className="grid gap-4">
              {mockOrders.map((order, idx) => (
                <Card 
                  key={order.id} 
                  className="hover:shadow-lg transition-all border-2 animate-slide-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-xl">Заказ #{order.id}</CardTitle>
                          <Badge className="bg-green-500">
                            <Icon name="Circle" size={8} className="mr-1 fill-white" />
                            Новая
                          </Badge>
                        </div>
                        <CardDescription className="flex items-center gap-2">
                          <Icon name="User" size={14} />
                          {order.clientName}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="text-lg px-3 py-1">
                        <Icon name="MapPin" size={16} className="mr-1 text-secondary" />
                        {order.distance}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                          <Icon name="MapPin" size={16} className="text-secondary" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-muted-foreground">Откуда</div>
                          <div className="font-medium">{order.from}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                          <Icon name="Navigation" size={16} className="text-accent" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-muted-foreground">Куда</div>
                          <div className="font-medium">{order.to}</div>
                        </div>
                      </div>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full gradient-primary shadow-lg hover:shadow-xl" size="lg">
                          <Icon name="Send" size={18} className="mr-2" />
                          Откликнуться на заказ
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Отклик на заказ #{order.id}</DialogTitle>
                          <DialogDescription>
                            Укажите вашу цену и комментарий
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="price">Ваша цена (₽)</Label>
                            <Input 
                              id="price" 
                              type="number" 
                              placeholder="1500" 
                              className="text-lg font-semibold"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="comment">Комментарий</Label>
                            <Textarea 
                              id="comment" 
                              placeholder="Опишите ваш опыт, машину, дополнительные услуги..."
                            />
                          </div>
                        </div>
                        <Button 
                          className="w-full gradient-primary" 
                          onClick={() => handleResponseToOrder(order.id)}
                        >
                          Отправить отклик
                        </Button>
                      </DialogContent>
                    </Dialog>

                    {order.responses.length > 0 && (
                      <div className="mt-3 text-sm text-muted-foreground text-center">
                        <Icon name="Users" size={16} className="inline mr-1" />
                        {order.responses.length} {order.responses.length === 1 ? 'водитель откликнулся' : 'водителей откликнулись'}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="mt-16 bg-white border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Icon name="Shield" size={16} />
            <span className="font-medium">DriveNow</span>
          </div>
          <p className="text-sm">Безопасные поездки с проверенными водителями</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
