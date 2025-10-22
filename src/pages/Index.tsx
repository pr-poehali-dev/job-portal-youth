import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  verified: boolean;
  description: string;
  ageRestriction: string;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('teen');

  const mockJobs: Job[] = [
    {
      id: 1,
      title: 'Помощник в кафе',
      company: 'Coffee House',
      location: 'Москва, ЦАО',
      type: 'part-time',
      salary: '15 000 ₽/мес',
      verified: true,
      description: 'Приём заказов, уборка зала. График 3-4 часа в день.',
      ageRestriction: '16+'
    },
    {
      id: 2,
      title: 'Курьер пеший',
      company: 'FastDelivery',
      location: 'Санкт-Петербург',
      type: 'flexible',
      salary: 'От 20 000 ₽/мес',
      verified: true,
      description: 'Доставка заказов в своём районе. Гибкий график.',
      ageRestriction: '16+'
    },
    {
      id: 3,
      title: 'Промоутер',
      company: 'Event Agency',
      location: 'Москва',
      type: 'temporary',
      salary: '1 500 ₽/день',
      verified: false,
      description: 'Раздача листовок на мероприятиях. Выходные дни.',
      ageRestriction: '14+'
    },
    {
      id: 4,
      title: 'Помощник репетитора',
      company: 'EduCenter',
      location: 'Казань',
      type: 'part-time',
      salary: '12 000 ₽/мес',
      verified: true,
      description: 'Помощь с домашними заданиями для младших школьников.',
      ageRestriction: '15+'
    },
  ];

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || job.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-black">
      <header className="border-b border-gray-800 bg-black/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                <Icon name="TrendingUp" className="text-white" size={24} />
              </div>
              <span className="text-2xl font-bold text-white">
                УСПЕХ 14
              </span>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <a href="#vacancies" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Вакансии</a>
              <a href="#employers" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Для работодателей</a>
              <a href="#about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">О платформе</a>
            </nav>

            <div className="flex items-center gap-2">
              <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Icon name="User" size={18} className="mr-2" />
                    Вход
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Вход в личный кабинет</DialogTitle>
                    <DialogDescription>
                      Введите свои данные для входа
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Пароль</Label>
                      <Input id="password" type="password" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button className="w-full">Войти</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    Регистрация
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Регистрация</DialogTitle>
                    <DialogDescription>
                      Выберите тип аккаунта
                    </DialogDescription>
                  </DialogHeader>
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="teen">Ищу работу</TabsTrigger>
                      <TabsTrigger value="employer">Работодатель</TabsTrigger>
                    </TabsList>
                    <TabsContent value="teen" className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="teen-name">Имя и фамилия</Label>
                        <Input id="teen-name" placeholder="Иван Иванов" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="teen-age">Возраст</Label>
                        <Input id="teen-age" type="number" placeholder="16" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="teen-email">Email</Label>
                        <Input id="teen-email" type="email" placeholder="your@email.com" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="teen-password">Пароль</Label>
                        <Input id="teen-password" type="password" />
                      </div>
                      <Button className="w-full">Создать аккаунт</Button>
                    </TabsContent>
                    <TabsContent value="employer" className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="emp-company">Название компании</Label>
                        <Input id="emp-company" placeholder="ООО «Компания»" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="emp-inn">ИНН</Label>
                        <Input id="emp-inn" placeholder="1234567890" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="emp-contact">Контактное лицо</Label>
                        <Input id="emp-contact" placeholder="Иван Иванов" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="emp-email">Email</Label>
                        <Input id="emp-email" type="email" placeholder="company@email.com" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="emp-password">Пароль</Label>
                        <Input id="emp-password" type="password" />
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg border border-gray-700">
                        <Icon name="ShieldCheck" size={20} className="text-gray-300" />
                        <p className="text-xs text-gray-300">
                          После регистрации мы проверим ваши данные для получения бейджа верификации
                        </p>
                      </div>
                      <Button className="w-full">Зарегистрироваться</Button>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
              Первая работа для{' '}
              <span className="text-gray-300">
                подростков
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Безопасная платформа для поиска работы с 14 лет. Только проверенные работодатели.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mt-8">
              <div className="relative flex-1">
                <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Должность или компания"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-[200px] h-12">
                  <SelectValue placeholder="Тип занятости" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все типы</SelectItem>
                  <SelectItem value="part-time">Частичная</SelectItem>
                  <SelectItem value="flexible">Гибкий график</SelectItem>
                  <SelectItem value="temporary">Временная</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Icon name="ShieldCheck" className="text-gray-400" size={20} />
                <span className="text-sm text-gray-400">Безопасно</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle" className="text-gray-400" size={20} />
                <span className="text-sm text-gray-400">Проверенные вакансии</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Clock" className="text-gray-400" size={20} />
                <span className="text-sm text-gray-400">Гибкий график</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="vacancies" className="py-12 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">Актуальные вакансии</h2>
            <Badge variant="secondary" className="text-sm">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'вакансия' : 'вакансий'}
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job, index) => (
              <Card 
                key={job.id} 
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in opacity-0"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    {job.verified && (
                      <Badge variant="default" className="bg-secondary gap-1 flex-shrink-0">
                        <Icon name="ShieldCheck" size={14} />
                        Проверено
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <Icon name="Building2" size={16} />
                    {job.company}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="MapPin" size={16} />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Wallet" size={16} />
                    {job.salary}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{job.ageRestriction}</Badge>
                    <Badge variant="outline" className="capitalize">{job.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {job.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    Откликнуться
                    <Icon name="ArrowRight" size={16} className="ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="employers" className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Для работодателей</h2>
              <p className="text-lg text-gray-400">
                Найдите ответственных и мотивированных молодых сотрудников
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Icon name="ShieldCheck" className="text-primary" size={32} />
                  </div>
                  <CardTitle>Верификация</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Получите бейдж проверенного работодателя для повышения доверия
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 bg-secondary/10 rounded-2xl flex items-center justify-center">
                    <Icon name="Users" className="text-secondary" size={32} />
                  </div>
                  <CardTitle>Широкий выбор</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Доступ к базе кандидатов от 14 до 17 лет со всей России
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Icon name="Zap" className="text-primary" size={32} />
                  </div>
                  <CardTitle>Быстро</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Публикуйте вакансии за минуту и получайте отклики в течение дня
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button size="lg" onClick={() => setIsRegisterOpen(true)}>
                Разместить вакансию
                <Icon name="Plus" size={18} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Почему Успех 14?</h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Icon name="Shield" className="text-primary" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Безопасность</h3>
                  <p className="text-sm text-muted-foreground">
                    Все работодатели проходят проверку. Мы защищаем ваши данные.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                    <Icon name="Scale" className="text-secondary" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Легальность</h3>
                  <p className="text-sm text-muted-foreground">
                    Все вакансии соответствуют трудовому законодательству РФ.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Icon name="Heart" className="text-primary" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Поддержка</h3>
                  <p className="text-sm text-muted-foreground">
                    Команда поддержки всегда готова помочь с любыми вопросами.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                    <Icon name="TrendingUp" className="text-secondary" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Развитие</h3>
                  <p className="text-sm text-muted-foreground">
                    Первый опыт работы — важный шаг к карьерному росту.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-800 py-8 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" className="text-white" size={16} />
              </div>
              <span className="font-bold">УСПЕХ 14</span>
            </div>
            <p className="text-sm text-gray-500">
              © 2024 Успех 14. Безопасная работа для подростков.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">
                Условия использования
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">
                Конфиденциальность
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;