
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-primary rounded-full p-2 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-white"
            >
              <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
              <path
                fillRule="evenodd"
                d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-xl font-bold text-primary">EventsManager</span>
        </Link>

        {/* Navigation pour desktop */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <NavLink 
            to="/" 
            end 
            className={({ isActive }) =>
              cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive ? "text-primary" : "text-muted-foreground"
              )
            }
          >
            Accueil
          </NavLink>
          <NavLink 
            to="/events" 
            className={({ isActive }) =>
              cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive ? "text-primary" : "text-muted-foreground"
              )
            }
          >
            Événements
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) =>
              cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive ? "text-primary" : "text-muted-foreground"
              )
            }
          >
            À propos
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) =>
              cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive ? "text-primary" : "text-muted-foreground"
              )
            }
          >
            Contact
          </NavLink>
        </nav>

        <div className="hidden md:flex items-center space-x-2">
          <Button asChild variant="ghost">
            <Link to="/login">Connexion</Link>
          </Button>
          <Button asChild>
            <Link to="/admin">Administration</Link>
          </Button>
        </div>

        {/* Bouton de menu mobile */}
        <button 
          className="md:hidden" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden container py-4 flex flex-col space-y-4 fade-in">
          <NavLink 
            to="/" 
            end 
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              cn(
                "text-sm font-medium p-2 rounded hover:bg-muted",
                isActive ? "bg-muted text-primary" : ""
              )
            }
          >
            Accueil
          </NavLink>
          <NavLink 
            to="/events" 
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              cn(
                "text-sm font-medium p-2 rounded hover:bg-muted",
                isActive ? "bg-muted text-primary" : ""
              )
            }
          >
            Événements
          </NavLink>
          <NavLink 
            to="/about" 
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              cn(
                "text-sm font-medium p-2 rounded hover:bg-muted",
                isActive ? "bg-muted text-primary" : ""
              )
            }
          >
            À propos
          </NavLink>
          <NavLink 
            to="/contact" 
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              cn(
                "text-sm font-medium p-2 rounded hover:bg-muted",
                isActive ? "bg-muted text-primary" : ""
              )
            }
          >
            Contact
          </NavLink>
          <div className="pt-2 flex flex-col space-y-2 border-t">
            <Button asChild variant="ghost">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>Connexion</Link>
            </Button>
            <Button asChild>
              <Link to="/admin" onClick={() => setIsMenuOpen(false)}>Administration</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
