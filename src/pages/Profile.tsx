import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  const mockUser = {
    name: 'Дмитрий Соколов',
    role: 'driver' as const,
    email: 'dmitry.s@mail.ru',
    phone: '+7 (999) 123-45-67',
    rating: 4.9,
    completedOrders: 147,
    avatar: '/placeholder.svg',
    car: 'Toyota Camry',
    carNumber: 'А123БВ 77',
    experience: 5,
    description: 'Опытный водитель с безупречной репутацией. Работаю только трезвым, автомобиль всегда чистый и комфортный.'
  };

  const recentOrders = [
    { id: 1, date: '10.11.2024', from: 'ул. Ленина, 45', to: 'пр. Мира, 120', price: 1500, rating: 5 },
    { id: 2, date: '09.11.2024', from: 'ул. Гагарина, 12', to: 'Аэропорт', price: 2500, rating: 5 },
    { id: 3, date: '08.11.2024', from: 'Центр', to: 'ул. Победы, 88', price: 1200, rating: 4 }
  ];

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Профиль успешно обновлен!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50">
      <header className="gradient-primary text-white py-4 px-4 shadow-xl">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <Icon name="Car" className="text-primary" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">DriveNow</h1>
            </div>
          </Link>
          <Link to="/dashboard">
            <Button variant="ghost" className="text-white hover:bg-white/20">
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              К заказам
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="shadow-xl border-2 animate-fade-in">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                      <AvatarImage src={mockUser.avatar} />
                      <AvatarFallback className="text-3xl">{mockUser.name[0]}</AvatarFallback>
                    </Avatar>
                    <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all">
                      <Icon name="Camera" size={20} className="text-white" />
                    </button>
                  </div>
                </div>
                <CardTitle className="text-2xl">{mockUser.name}</CardTitle>
                <CardDescription>
                  <Badge className="bg-gradient-primary mt-2">
                    <Icon name="Car" size={14} className="mr-1" />
                    Водитель
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-card">
                  <div className="flex items-center gap-2">
                    <Icon name="Star" className="text-yellow-400 fill-yellow-400" size={20} />
                    <span className="font-semibold">Рейтинг</span>
                  </div>
                  <span className="text-xl font-bold text-primary">{mockUser.rating}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-card">
                  <div className="flex items-center gap-2">
                    <Icon name="CheckCircle" className="text-green-500" size={20} />
                    <span className="font-semibold">Заказов</span>
                  </div>
                  <span className="text-xl font-bold text-primary">{mockUser.completedOrders}</span>
                </div>
                <div className="pt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Mail" size={16} />
                    <span>{mockUser.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Phone" size={16} />
                    <span>{mockUser.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="shadow-xl border-2 animate-fade-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Профиль водителя</CardTitle>
                    <CardDescription>Управляйте своей информацией</CardDescription>
                  </div>
                  <Button 
                    variant={isEditing ? "default" : "outline"}
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  >
                    <Icon name={isEditing ? "Save" : "Pencil"} size={18} className="mr-2" />
                    {isEditing ? 'Сохранить' : 'Редактировать'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="info" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="info">
                      <Icon name="User" size={18} className="mr-2" />
                      Информация
                    </TabsTrigger>
                    <TabsTrigger value="history">
                      <Icon name="History" size={18} className="mr-2" />
                      История
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="info" className="space-y-4 mt-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Полное имя</Label>
                        <Input 
                          id="name" 
                          defaultValue={mockUser.name}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Телефон</Label>
                        <Input 
                          id="phone" 
                          defaultValue={mockUser.phone}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email"
                        defaultValue={mockUser.email}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="car">Марка и модель авто</Label>
                        <Input 
                          id="car" 
                          defaultValue={mockUser.car}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="carNumber">Госномер</Label>
                        <Input 
                          id="carNumber" 
                          defaultValue={mockUser.carNumber}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">Стаж вождения (лет)</Label>
                      <Input 
                        id="experience" 
                        type="number"
                        defaultValue={mockUser.experience}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">О себе</Label>
                      <Textarea 
                        id="description" 
                        defaultValue={mockUser.description}
                        disabled={!isEditing}
                        rows={4}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="history" className="space-y-4 mt-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-4">Последние поездки</h3>
                      <div className="space-y-3">
                        {recentOrders.map((order, idx) => (
                          <Card 
                            key={order.id} 
                            className="hover:shadow-lg transition-all animate-slide-up"
                            style={{ animationDelay: `${idx * 0.1}s` }}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <Icon name="Calendar" size={16} className="text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">{order.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  {Array.from({ length: order.rating }).map((_, i) => (
                                    <Icon key={i} name="Star" size={14} className="fill-yellow-400 text-yellow-400" />
                                  ))}
                                </div>
                              </div>
                              <div className="space-y-2 mb-3">
                                <div className="flex items-start gap-2">
                                  <Icon name="MapPin" size={16} className="text-secondary mt-0.5" />
                                  <span className="text-sm">{order.from}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                  <Icon name="Navigation" size={16} className="text-accent mt-0.5" />
                                  <span className="text-sm">{order.to}</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-primary">{order.price} ₽</span>
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  Завершена
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
