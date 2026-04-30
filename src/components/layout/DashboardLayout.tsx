import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate, Link, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  CreditCard, 
  Users, 
  Settings, 
  LogOut,
  Bell,
  Search,
  Menu,
  ChevronRight,
  ClipboardList
} from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarProvider, 
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from '../ui/sidebar';
import { motion, AnimatePresence } from 'motion/react';

const DashboardLayout: React.FC = () => {
  const { user, profile, loading, signOut } = useAuth();
  const location = useLocation();

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (!user || !profile) return <Navigate to="/login" replace />;

  const getMenuItems = () => {
    const base = [
      { name: 'Dashboard', icon: LayoutDashboard, path: `/${profile.role}/dashboard` },
    ];

    switch (profile.role) {
      case 'student':
        return [
          ...base,
          { name: 'Enrolled Courses', icon: BookOpen, path: '/student/courses' },
          { name: 'Grades', icon: GraduationCap, path: '/student/api/grades' },
          { name: 'Finance', icon: CreditCard, path: '/student/finance' },
          { name: 'Evaluation', icon: ClipboardList, path: '/student/evaluation' },
        ];
      case 'teacher':
        return [
          ...base,
          { name: 'My Classes', icon: BookOpen, path: '/teacher/classes' },
          { name: 'Grades Input', icon: GraduationCap, path: '/teacher/grades' },
          { name: 'Students', icon: Users, path: '/teacher/students' },
        ];
      case 'registrar':
        return [
          ...base,
          { name: 'Enrollment Requests', icon: BookOpen, path: '/registrar/enrollment' },
          { name: 'Course Scheduling', icon: Settings, path: '/registrar/courses' },
          { name: 'Student Records', icon: Users, path: '/registrar/records' },
        ];
      case 'finance':
        return [
          ...base,
          { name: 'Payments', icon: CreditCard, path: '/finance/payments' },
          { name: 'Billing', icon: Settings, path: '/finance/billing' },
          { name: 'Reports', icon: ClipboardList, path: '/finance/reports' },
        ];
      case 'admin':
        return [
          ...base,
          { name: 'User Management', icon: Users, path: '/admin/users' },
          { name: 'System Analytics', icon: LayoutDashboard, path: '/admin/analytics' },
          { name: 'Logs', icon: ClipboardList, path: '/admin/logs' },
        ];
      default:
        return base;
    }
  };

  const menuItems = getMenuItems();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background w-full text-foreground">
        <Sidebar className="border-r border-border bg-sidebar">
          <SidebarHeader className="p-4 flex flex-row items-center gap-3">
            <div className="bg-primary h-8 w-8 rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">CMDI Portal</span>
          </SidebarHeader>
          <SidebarContent className="px-2">
            <SidebarGroup>
              <SidebarGroupLabel className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                Main Menu
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={location.pathname === item.path}
                        className={`transition-all duration-200 ${location.pathname === item.path ? 'bg-primary/20 text-primary-foreground hover:bg-primary/30' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}`}
                      >
                        <Link to={item.path}>
                          <item.icon className="h-4 w-4" />
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4 mt-auto">
            <Separator className="mb-4 bg-border" />
            <div className="flex items-center gap-3 mb-4 px-2">
              <Avatar className="h-9 w-9 ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
                <AvatarImage src={user.photoURL || ''} />
                <AvatarFallback className="bg-muted text-muted-foreground font-bold uppercase">
                  {profile.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col truncate">
                <span className="text-sm font-semibold text-foreground truncate">{profile.name}</span>
                <span className="text-xs text-muted-foreground capitalize">{profile.role}</span>
              </div>
            </div>
            <Button 
                variant="ghost" 
                className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                onClick={() => signOut()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </Button>
            
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 shrink-0 sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="lg:hidden text-foreground" />
              <div className="flex items-center text-sm font-medium text-muted-foreground">
                <span>Dashboard</span>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="text-foreground capitalize">{location.pathname.split('/').pop()}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mr-4">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest hidden xl:inline">Dev Mode:</span>
                <div className="flex gap-1">
                    {(['student', 'teacher', 'admin', 'registrar', 'finance'] as const).map(r => (
                        <Button 
                            key={r} 
                            variant={profile?.role === r ? 'default' : 'outline'} 
                            size="sm" 
                            className="text-[9px] h-6 px-1.5 capitalize transition-all"
                            onClick={async () => {
                                if (!user) return;
                                const { setDoc, doc } = await import('firebase/firestore');
                                const { db } = await import('../../lib/firebase');
                                await setDoc(doc(db, 'users', user.uid), { ...profile, role: r }, { merge: true });
                            }}
                        >
                            {r}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden sm:flex relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input 
                        type="text" 
                        placeholder="Search resources..." 
                        className="h-9 w-64 rounded-full bg-muted pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 border-border text-foreground transition-all placeholder:text-muted-foreground"
                    />
                </div>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full">
                    <Bell className="h-5 w-5" />
                </Button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="max-w-7xl mx-auto w-full"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
