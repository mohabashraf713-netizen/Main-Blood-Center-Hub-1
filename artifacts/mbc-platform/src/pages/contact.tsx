import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container max-w-6xl mx-auto px-4">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">Contact & Support</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            We're here to help. Whether you're a donor with a question or a hospital needing immediate assistance.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-destructive text-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-2">Emergency Hotline</h2>
              <p className="text-destructive-foreground/90 mb-6">For hospitals and critical situations only. Available 24/7.</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold tracking-tight">1-800-MBC-BLOOD</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold mb-6 text-slate-900">General Inquiries</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">Email Us</p>
                    <p className="text-slate-600">support@mbc-network.org</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">Headquarters</p>
                    <p className="text-slate-600">123 Medical Center Blvd<br />Metropolis, NY 10001</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">Support Hours</p>
                    <p className="text-slate-600">Monday - Friday: 8am - 8pm EST<br />Saturday - Sunday: 9am - 5pm EST</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-8">
                <MessageSquare className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-slate-900">Send us a message</h2>
              </div>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully."); }}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">First Name</label>
                    <Input placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Last Name</label>
                    <Input placeholder="Doe" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Email Address</label>
                  <Input type="email" placeholder="john@example.com" required />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Subject</label>
                  <Input placeholder="How can we help you?" required />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Message</label>
                  <Textarea placeholder="Please provide details..." className="h-32 resize-none" required />
                </div>

                <Button type="submit" size="lg" className="w-full text-base font-bold h-14">
                  Send Message
                </Button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
