import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Car, Search, User, Home, Settings, LogOut } from "lucide-react";
import { User as UserEntity } from "@/entities/User";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigationItems = [
  { title: "Home", url: createPageUrl("Home"), icon: Home },
  { title: "Find Rides", url: createPageUrl("FindRides"), icon: Search },
  { title: "My Rides", url: createPageUrl("MyRides"), icon: Car },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await UserEntity.me();
      setUser(currentUser);
    } catch (error) {
      console.log("User not authenticated");
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    try {
      await UserEntity.login();
      const currentUser = await UserEntity.me();
      setUser(currentUser);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    await UserEntity.logout();
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen premium-gradient flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen premium-gradient">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        :root {
          --primary: #5D4EFC;
          --primary-light: #7B68FF;
          --primary-dark: #4B3FD1;
          --secondary: #37D5D6;
          --secondary-light: #4DE5E6;
          --secondary-dark: #2BC4C5;
          --accent: #F4F5FA;
          --text: #1A1B23;
          --text-light: #6B7280;
          --text-muted: #9CA3AF;
          --glass-bg: rgba(255, 255, 255, 0.08);
          --glass-border: rgba(255, 255, 255, 0.16);
          --shadow-soft: 0 8px 32px rgba(0, 0, 0, 0.06);
          --shadow-medium: 0 12px 40px rgba(0, 0, 0, 0.08);
          --shadow-strong: 0 20px 60px rgba(0, 0, 0, 0.12);
        }
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        .premium-gradient {
          background: linear-gradient(135deg, 
            #F8FAFC 0%, 
            #F1F5F9 15%, 
            #E2E8F0 35%, 
            #F8FAFC 65%, 
            #EEF2FF 85%, 
            #F0F9FF 100%
          );
          background-attachment: fixed;
          position: relative;
        }
        
        .premium-gradient::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 20%, rgba(93, 78, 252, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(55, 213, 214, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(139, 92, 246, 0.02) 0%, transparent 50%);
          pointer-events: none;
          z-index: -1;
        }
        
        .glass-nav {
          backdrop-filter: blur(24px) saturate(180%);
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.04),
            inset 0 1px 0 rgba(255, 255, 255, 0.6);
        }
        
        .glass-card {
          backdrop-filter: blur(20px) saturate(180%);
          background: rgba(255, 255, 255, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow: 
            0 12px 40px rgba(0, 0, 0, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .glass-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.6);
          background: rgba(255, 255, 255, 0.85);
        }
        
        .premium-button {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 8px 32px rgba(93, 78, 252, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }
        
        .premium-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.6s;
        }
        
        .premium-button:hover::before {
          left: 100%;
        }
        
        .premium-button:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 12px 40px rgba(93, 78, 252, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          background: linear-gradient(135deg, var(--primary-light) 0%, var(--secondary) 100%);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        
        .nav-link {
          position: relative;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          border-radius: 12px;
          backdrop-filter: blur(8px);
        }
        
        .nav-link.active {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
          box-shadow: 0 4px 20px rgba(93, 78, 252, 0.3);
        }
        
        .nav-link:not(.active):hover {
          background: rgba(255, 255, 255, 0.6);
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
        }
        
        .loading-spinner {
          width: 48px;
          height: 48px;
          border: 3px solid transparent;
          border-top: 3px solid var(--primary);
          border-right: 3px solid var(--secondary);
          border-radius: 50%;
          animation: spin 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .mobile-nav {
          backdrop-filter: blur(24px) saturate(180%);
          background: rgba(255, 255, 255, 0.9);
          border-top: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.04);
        }
        
        .avatar-premium {
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          box-shadow: 0 4px 16px rgba(93, 78, 252, 0.3);
          transition: all 0.3s ease;
        }
        
        .avatar-premium:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 24px rgba(93, 78, 252, 0.4);
        }
      `}</style>

      {/* Header */}
      <header className="glass-nav border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to={createPageUrl("Home")} className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-[#5D4EFC] to-[#37D5D6] rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black gradient-text tracking-tight">Spride Share</span>
            </Link>

            {user ? (
              <div className="flex items-center space-x-6">
                <nav className="hidden lg:flex space-x-2">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.title}
                      to={item.url}
                      className={`nav-link px-4 py-2.5 text-sm font-semibold transition-colors flex items-center gap-2 ${
                        location.pathname === item.url
                          ? "active text-white"
                          : "text-gray-700 hover:text-gray-900"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.title}
                    </Link>
                  ))}
                </nav>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                      <Avatar className="h-10 w-10 avatar-premium">
                        <AvatarImage src={user.profile_photo} alt={user.full_name} />
                        <AvatarFallback className="avatar-premium text-white font-semibold">
                          {user.full_name?.charAt(0) || user.email?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 glass-card border-white/20" align="end" forceMount>
                    <div className="flex flex-col space-y-1 p-4">
                      <p className="text-sm font-semibold text-gray-900">{user.full_name || "User"}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator className="bg-white/20" />
                    <DropdownMenuItem asChild>
                      <Link to={createPageUrl("Profile")} className="cursor-pointer flex items-center gap-2 px-4 py-2">
                        <User className="h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={createPageUrl("Settings")} className="cursor-pointer flex items-center gap-2 px-4 py-2">
                        <Settings className="h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/20" />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer flex items-center gap-2 px-4 py-2">
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button
                  onClick={handleLogin}
                  className="premium-button text-white font-semibold px-6 py-2.5"
                >
                  Sign In with Google
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {user && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 mobile-nav z-50">
          <div className="flex justify-around py-3">
            {navigationItems.map((item) => (
              <Link
                key={item.title}
                to={item.url}
                className={`flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-300 ${
                  location.pathname === item.url
                    ? "text-[#5D4EFC] bg-[#5D4EFC]/10"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <item.icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pb-24 lg:pb-0">
        {children}
      </main>
    </div>
  );
}
