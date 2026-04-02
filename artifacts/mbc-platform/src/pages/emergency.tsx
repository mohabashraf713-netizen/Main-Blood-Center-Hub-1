import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Clock, MapPin, Activity, Droplets, ArrowRight } from "lucide-react";
import { useGetEmergencyFeed } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Emergency() {
  const { data, isLoading } = useGetEmergencyFeed({
    query: {
      refetchInterval: 5000, // Poll every 5s to feel live
    }
  });

  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case 'critical': return 'bg-destructive text-white border-destructive';
      case 'high': return 'bg-orange-500 text-white border-orange-500';
      default: return 'bg-blue-500 text-white border-blue-500';
    }
  };

  const getPulseEffect = (urgency: string) => {
    return urgency.toLowerCase() === 'critical' ? 'animate-pulse' : '';
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Live Header */}
      <div className="bg-slate-900 text-white py-6 border-b border-slate-800">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Live Emergency Feed</h1>
          </div>
          <div className="text-sm font-mono text-slate-400">
            Auto-updating • {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-8">
        
        {isLoading && !data ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-pulse h-40"></div>
            ))}
          </div>
        ) : data?.emergencies.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-slate-800">No Active Emergencies</h2>
            <p className="text-slate-500">The network is stable. No critical requests in your area.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {data?.emergencies.map((req) => (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  layout
                  className={`bg-white rounded-xl overflow-hidden border shadow-sm transition-all hover:shadow-md ${
                    req.urgency === 'critical' ? 'border-destructive/50' : 'border-slate-200'
                  }`}
                >
                  <div className="flex flex-col md:flex-row">
                    
                    {/* Urgency Strip */}
                    <div className={`w-full md:w-2 ${getUrgencyColor(req.urgency)} h-2 md:h-auto`}></div>
                    
                    <div className="p-6 flex-1 flex flex-col md:flex-row gap-6 items-start md:items-center">
                      
                      {/* Blood Type Badge */}
                      <div className="shrink-0 flex flex-col items-center justify-center">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black shadow-inner ${
                          req.urgency === 'critical' ? 'bg-red-50 text-destructive border-2 border-destructive/20' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {req.bloodType}
                        </div>
                        <span className="text-xs font-bold text-slate-500 mt-2 uppercase tracking-wider">{req.unitsNeeded} Units</span>
                      </div>

                      {/* Details */}
                      <div className="flex-1 space-y-2 w-full">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${getUrgencyColor(req.urgency)} ${getPulseEffect(req.urgency)}`}>
                            {req.urgency} Priority
                          </span>
                          <span className="text-xs text-slate-500 flex items-center">
                            <Clock className="w-3 h-3 mr-1" /> {req.minutesAgo} mins ago
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-slate-900">{req.hospitalName}</h3>
                        
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <span className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-slate-400" /> {req.city}</span>
                          <span className="hidden sm:flex items-center"><Droplets className="w-4 h-4 mr-1 text-slate-400" /> Patient: {req.patientName}</span>
                        </div>
                      </div>

                      {/* Action */}
                      <div className="w-full md:w-auto shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                        <Link href="/locator">
                          <Button 
                            className={`w-full md:w-auto font-bold h-12 px-6 ${
                              req.urgency === 'critical' ? 'bg-destructive hover:bg-destructive/90' : ''
                            }`}
                          >
                            Respond Now <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>

                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

// Needed to avoid missing icon error
import { CheckCircle } from "lucide-react";