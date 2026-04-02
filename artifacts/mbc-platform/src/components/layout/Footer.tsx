import { Link } from "wouter";
import { Droplets, Heart, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Droplets className="w-6 h-6 text-primary" />
              <span className="font-bold text-xl tracking-tight text-foreground">
                MBC
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Main Blood Center connects donors with patients in real-time. Every drop counts in our mission to save lives.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Emergency Hotline</p>
                <p className="font-bold text-foreground">1-800-MBC-BLOOD</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/register-donor" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Register as Donor
                </Link>
              </li>
              <li>
                <Link href="/request-blood" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Request Blood
                </Link>
              </li>
              <li>
                <Link href="/locator" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Find a Center
                </Link>
              </li>
              <li>
                <Link href="/emergency" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Live Emergency Feed
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Information</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/education" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Education & FAQ
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About MBC
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                <span>123 Medical Center Blvd<br />Metropolis, NY 10001</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>support@mbc-network.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Main Blood Center. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Privacy Policy</span>
            <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
