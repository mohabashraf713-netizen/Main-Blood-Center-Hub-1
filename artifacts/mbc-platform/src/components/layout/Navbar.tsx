import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Activity, Heart, Droplets, Menu, X, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/locator", label: "Find Center" },
    { href: "/education", label: "Learn" },
    { href: "/emergency", label: "Live Feed", icon: <Activity className="w-4 h-4 mr-1 text-primary animate-pulse" /> },
    { href: "/about", label: "About" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md border-b border-border shadow-sm py-2" : "bg-white py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Droplets className="w-6 h-6 text-primary" />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">
              MBC
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary flex items-center ${
                  location === link.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/register-donor">
              <Button variant="outline" className="border-primary/20 hover:bg-primary/5 font-medium">
                <Heart className="w-4 h-4 mr-2 text-primary" />
                Register as Donor
              </Button>
            </Link>
            <Link href="/request-blood">
              <Button variant="destructive" className="font-semibold shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Request Blood (Emergency)
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border bg-white overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-medium py-2 flex items-center ${
                    location === link.href ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                <Link href="/register-donor" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-center">
                    <Heart className="w-4 h-4 mr-2" />
                    Register as Donor
                  </Button>
                </Link>
                <Link href="/request-blood" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="destructive" className="w-full justify-center font-bold">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Emergency Blood Request
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
