import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useGetDashboardStats } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Droplets, Activity, Users, Building, HeartPulse, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: stats, isLoading } = useGetDashboardStats({ query: { enabled: true } });

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 pt-20 pb-24 lg:pt-32 lg:pb-40">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero.png" 
            alt="Modern hospital blood donation center" 
            className="w-full h-full object-cover object-center opacity-10 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 to-transparent"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Activity className="w-4 h-4 animate-pulse" />
                <span>Live Emergency Network</span>
              </motion.div>
              
              <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-tight">
                Every Drop Counts. <br className="hidden md:block" />
                <span className="text-primary">Connect. Donate. Save Lives.</span>
              </motion.h1>
              
              <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                MBC is the central lifeline connecting critical patients with compatible donors in real-time. Your donation today could be the miracle someone needs tomorrow.
              </motion.p>
              
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                <Link href="/request-blood" className="w-full sm:w-auto">
                  <Button size="lg" variant="destructive" className="w-full sm:w-auto h-14 px-8 text-lg font-bold shadow-lg shadow-destructive/20 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                    Request Blood (Emergency)
                  </Button>
                </Link>
                <Link href="/register-donor" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg font-semibold bg-white hover:bg-slate-50 border-slate-200">
                    Register as Donor
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-border relative z-20 -mt-10 mx-4 md:mx-auto max-w-6xl rounded-2xl shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border">
            <div className="text-center px-4">
              <div className="mx-auto w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Registered Donors</p>
              {isLoading ? <Skeleton className="h-8 w-24 mx-auto" /> : <p className="text-3xl font-bold text-foreground">{stats?.totalDonors.toLocaleString()}</p>}
            </div>
            <div className="text-center px-4">
              <div className="mx-auto w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-3">
                <HeartPulse className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Lives Saved</p>
              {isLoading ? <Skeleton className="h-8 w-24 mx-auto" /> : <p className="text-3xl font-bold text-foreground">{stats?.livesSaved.toLocaleString()}</p>}
            </div>
            <div className="text-center px-4">
              <div className="mx-auto w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-3">
                <Droplets className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Donations (Month)</p>
              {isLoading ? <Skeleton className="h-8 w-24 mx-auto" /> : <p className="text-3xl font-bold text-foreground">{stats?.donationsThisMonth.toLocaleString()}</p>}
            </div>
            <div className="text-center px-4">
              <div className="mx-auto w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-3">
                <Building className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Partner Hospitals</p>
              {isLoading ? <Skeleton className="h-8 w-24 mx-auto" /> : <p className="text-3xl font-bold text-foreground">{stats?.partnerHospitals}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">The MBC Network</h2>
            <p className="text-muted-foreground text-lg">A seamless, rapid-response system designed to eliminate delays when every second matters.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-1/2 left-[16%] right-[16%] h-0.5 bg-border -z-10 -translate-y-1/2"></div>
            
            <div className="relative bg-white pt-8 px-6 text-center">
              <div className="w-16 h-16 mx-auto bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 mb-6 rotate-3">
                <Activity className="w-8 h-8 -rotate-3" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Urgent Request</h3>
              <p className="text-muted-foreground">Hospitals broadcast immediate needs to the MBC network detailing blood type and urgency.</p>
            </div>

            <div className="relative bg-white pt-8 px-6 text-center">
              <div className="w-16 h-16 mx-auto bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 mb-6 -rotate-3">
                <Users className="w-8 h-8 rotate-3" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Instant Match</h3>
              <p className="text-muted-foreground">Eligible donors in the vicinity with the matching blood type are immediately notified.</p>
            </div>

            <div className="relative bg-white pt-8 px-6 text-center">
              <div className="w-16 h-16 mx-auto bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 mb-6 rotate-3">
                <HeartPulse className="w-8 h-8 -rotate-3" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Life Saved</h3>
              <p className="text-muted-foreground">The donor visits the nearest center, and the blood is dispatched to the critical patient.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-24 bg-slate-50 border-t border-border overflow-hidden relative">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 opacity-20 pointer-events-none">
          <img src="/images/blood-drop.png" alt="Decorative blood drop" className="w-[600px] h-[600px] object-contain" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="bg-primary rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to be someone's hero?</h2>
              <p className="text-primary-foreground/90 text-lg">
                Join thousands of donors who are making a real difference. It takes 15 minutes to register and a lifetime of impact.
              </p>
            </div>
            <div className="shrink-0 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Link href="/register-donor" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="w-full h-14 px-8 text-lg font-bold">
                  Register Now
                </Button>
              </Link>
              <Link href="/education" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full h-14 px-8 text-lg font-medium border-white/20 text-white hover:bg-white/10 hover:text-white">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
