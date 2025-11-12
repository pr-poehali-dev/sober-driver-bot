import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const Landing = () => {
  const features = [
    {
      icon: 'Shield',
      title: 'Безопасность',
      description: 'Все водители проходят проверку и работают только трезвыми'
    },
    {
      icon: 'DollarSign',
      title: 'Честные цены',
      description: 'Водители сами устанавливают стоимость, вы выбираете лучшее предложение'
    },
    {
      icon: 'Clock',
      title: 'Быстрый отклик',
      description: 'Получайте предложения от водителей в течение нескольких минут'
    },
    {
      icon: 'Star',
      title: 'Рейтинговая система',
      description: 'Выбирайте водителей на основе отзывов и рейтингов других пользователей'
    }
  ];

  const forDrivers = [
    'Гибкий график работы',
    'Выбирайте заказы сами',
    'Устанавливайте свою цену',
    'Прозрачная система оплаты'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50">
      <header className="gradient-primary text-white py-4 px-4 shadow-xl sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <Icon name="Car" className="text-primary" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">DriveNow</h1>
              <p className="text-xs text-white/80">Биржа трезвых водителей</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link to="/login">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                Вход
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" className="bg-white text-primary hover:bg-white/90 border-0">
                Регистрация
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Найдите трезвого водителя
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Биржа профессиональных водителей для безопасных поездок. 
            Выберите лучшее предложение из множества откликов.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/register?role=client">
              <Button size="lg" className="gradient-primary text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all">
                <Icon name="MapPin" size={24} className="mr-2" />
                Я ищу водителя
              </Button>
            </Link>
            <Link to="/register?role=driver">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 hover:bg-white">
                <Icon name="Car" size={24} className="mr-2" />
                Я водитель
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">Почему выбирают DriveNow</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <Card 
              key={idx} 
              className="text-center hover:shadow-xl transition-all border-2 animate-slide-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-2xl flex items-center justify-center">
                  <Icon name={feature.icon as any} size={32} className="text-white" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h3 className="text-4xl font-bold mb-6">Как это работает для заказчиков</h3>
            <div className="space-y-6">
              {[
                { step: 1, text: 'Создайте заявку с адресами подачи и назначения' },
                { step: 2, text: 'Получите предложения от водителей с ценами' },
                { step: 3, text: 'Выберите подходящего водителя по цене и рейтингу' },
                { step: 4, text: 'Свяжитесь с водителем и договоритесь о деталях' }
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <p className="text-lg text-gray-700 pt-1">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
          <Card className="p-8 shadow-2xl border-2 animate-fade-in bg-gradient-card">
            <CardHeader>
              <CardTitle className="text-2xl">Для водителей</CardTitle>
              <CardDescription className="text-base">Зарабатывайте на своих условиях</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {forDrivers.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={16} className="text-white" />
                    </div>
                    <span className="text-base">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/register?role=driver">
                <Button className="w-full mt-6 gradient-primary" size="lg">
                  Стать водителем
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="gradient-primary text-white py-16 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-6">Готовы начать?</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к сообществу DriveNow и найдите надежного водителя уже сегодня
          </p>
          <Link to="/register">
            <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90 border-0 text-lg px-8 py-6">
              Зарегистрироваться бесплатно
            </Button>
          </Link>
        </div>
      </section>

      <footer className="bg-white border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Shield" size={20} className="text-primary" />
              <span className="font-semibold text-gray-700">DriveNow © 2024</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-600">
              <a href="#" className="hover:text-primary transition-colors">О сервисе</a>
              <a href="#" className="hover:text-primary transition-colors">Правила</a>
              <a href="#" className="hover:text-primary transition-colors">Поддержка</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
