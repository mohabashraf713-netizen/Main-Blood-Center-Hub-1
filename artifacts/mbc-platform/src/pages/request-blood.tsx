import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { AlertCircle, Clock, MapPin, Activity, User, Phone, FileText } from "lucide-react";

import { useCreateBloodRequest } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  patientName: z.string().min(2, "Patient name is required"),
  bloodType: z.string().min(1, "Blood type is required"),
  unitsNeeded: z.coerce.number().min(1, "At least 1 unit is required").max(20, "Max 20 units per request"),
  hospitalName: z.string().min(2, "Hospital name is required"),
  city: z.string().min(2, "City is required"),
  urgency: z.enum(["critical", "high", "standard"]),
  contactPhone: z.string().min(10, "Valid phone number is required"),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function RequestBlood() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const createRequest = useCreateBloodRequest();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientName: "",
      bloodType: "",
      unitsNeeded: 1,
      hospitalName: "",
      city: "",
      urgency: "high",
      contactPhone: "",
      notes: "",
    },
  });

  const urgencyWatch = form.watch("urgency");

  function onSubmit(data: FormValues) {
    createRequest.mutate(
      { data },
      {
        onSuccess: () => {
          toast({
            title: "Emergency Request Broadcasted",
            description: "Your request has been added to the live feed. Eligible donors are being notified.",
            variant: "default",
          });
          setLocation("/emergency");
        },
        onError: () => {
          toast({
            title: "Request failed",
            description: "There was an error broadcasting the request. Please try again or call the hotline.",
            variant: "destructive",
          });
        },
      }
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container max-w-3xl mx-auto px-4">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-destructive/20 relative"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-destructive"></div>
          
          <div className="p-6 md:p-10">
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center text-destructive shrink-0">
                <AlertCircle className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Emergency Blood Request</h1>
                <p className="text-muted-foreground mt-1">This request will immediately alert eligible donors in your area.</p>
              </div>
            </div>

            {urgencyWatch === "critical" && (
              <Alert variant="destructive" className="mb-8 bg-destructive/5">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Critical Urgency Selected</AlertTitle>
                <AlertDescription>
                  This request will bypass standard queuing and trigger immediate SMS alerts to all matching donors within a 15-mile radius.
                </AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                <div className="space-y-6">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" /> Patient Details
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl border border-border">
                    <FormField
                      control={form.control}
                      name="patientName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Patient Name or ID</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter patient identifier" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="bloodType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Blood Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(type => (
                                  <SelectItem key={type} value={type}>{type}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="unitsNeeded"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Units</FormLabel>
                            <FormControl>
                              <Input type="number" min="1" max="20" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" /> Request Logistics
                  </h3>
                  
                  <div className="bg-slate-50 p-6 rounded-xl border border-border space-y-6">
                    <FormField
                      control={form.control}
                      name="urgency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Urgency Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className={
                                field.value === "critical" ? "border-destructive text-destructive font-bold" : 
                                field.value === "high" ? "border-orange-500 text-orange-600 font-semibold" : ""
                              }>
                                <SelectValue placeholder="Select urgency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="critical" className="text-destructive font-bold">CRITICAL (Needed within 2 hours)</SelectItem>
                              <SelectItem value="high" className="text-orange-600 font-semibold">HIGH (Needed today)</SelectItem>
                              <SelectItem value="standard">STANDARD (Needed within 48 hours)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="hospitalName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hospital / Facility Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input className="pl-9" placeholder="e.g. Mercy General" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="Location" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Phone className="w-5 h-5 text-primary" /> Contact & Notes
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Direct Contact Phone</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="Staff or desk number" {...field} />
                          </FormControl>
                          <FormDescription>Where donors/MBC staff can reach you directly</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Clinical Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any specific requirements (e.g., CMV negative, irradiated)" 
                            className="resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="pt-6">
                  <Button 
                    type="submit" 
                    variant="destructive" 
                    size="lg" 
                    className="w-full h-14 text-lg font-bold shadow-lg"
                    disabled={createRequest.isPending}
                  >
                    {createRequest.isPending ? "Broadcasting Request..." : "Broadcast Emergency Request"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
