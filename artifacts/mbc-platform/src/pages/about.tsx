import { Users, ShieldCheck, Heart, Target, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="bg-white">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/about.png" 
            alt="Medical team" 
            className="w-full h-full object-cover opacity-20 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white"></div>
        </div>
        
        <div className="container relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            The beating heart of <br className="hidden md:block"/> emergency response.
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Main Blood Center was founded on a simple principle: no patient should ever have to wait for blood when a willing donor is nearby. We built the network that bridges that gap.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-14 h-14 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Speed & Precision</h3>
              <p className="text-slate-600 leading-relaxed">
                In critical moments, minutes matter. Our algorithmic matching system ensures that emergency requests reach the right donors instantly.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Clinical Trust</h3>
              <p className="text-slate-600 leading-relaxed">
                We operate under the highest medical standards. Every partner hospital and donation center is rigorously vetted and certified.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-14 h-14 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Human Connection</h3>
              <p className="text-slate-600 leading-relaxed">
                Technology powers the network, but human generosity fuels it. We treat every donor as a hero because they are.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Network / Partners */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center max-w-5xl">
          <h2 className="text-3xl font-bold mb-4 text-slate-900">Our Healthcare Network</h2>
          <p className="text-lg text-slate-600 mb-16 max-w-2xl mx-auto">
            We partner with leading hospitals and regional blood banks to ensure your donation gets exactly where it's needed most.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
            {/* Placeholder Partner Logos */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="bg-slate-100 h-24 rounded-lg flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer">
                <span className="font-bold text-slate-400 text-xl">Hospital {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Join our network today.</h2>
          <Link href="/register-donor">
            <Button variant="destructive" size="lg" className="h-14 px-8 text-lg font-bold">
              Become a Donor
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
