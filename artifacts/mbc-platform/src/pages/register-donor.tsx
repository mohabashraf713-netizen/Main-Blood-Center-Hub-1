import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, CheckCircle2, ChevronRight, Droplets, MapPin, Phone, Calendar as CalendarIcon, User, AlertCircle } from "lucide-react";

import { useRegisterDonor } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  bloodType: z.string().min(1, "Blood type is required"),
  city: z.string().min(2, "City is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  weight: z.coerce.number().min(50, "Must weigh at least 50kg (110 lbs) to donate"),
  lastDonationDate: z.string().optional(),
  hasChronicDisease: z.boolean().default(false),
  email: z.string().email("Valid email is required").optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

export default function RegisterDonor() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isEligible, setIsEligible] = useState<boolean | null>(null);

  const registerDonor = useRegisterDonor();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      bloodType: "",
      city: "",
      phone: "",
      dateOfBirth: "",
      weight: 0,
      lastDonationDate: "",
      hasChronicDisease: false,
      email: "",
    },
  });

  const checkEligibility = () => {
    const values = form.getValues();
    const isWeightOk = values.weight >= 50;
    const isDiseaseOk = !values.hasChronicDisease;
    // Add age check if needed
    
    if (isWeightOk && isDiseaseOk) {
      setIsEligible(true);
      setStep(2);
    } else {
      setIsEligible(false);
    }
  };

  function onSubmit(data: FormValues) {
    if (!isEligible) {
      toast({
        title: "Ineligible to donate",
        description: "Based on the provided information, you currently do not meet the eligibility criteria to donate blood.",
        variant: "destructive",
      });
      return;
    }

    registerDonor.mutate(
      { data },
      {
        onSuccess: () => {
          toast({
            title: "Registration successful",
            description: "Thank you for registering as a donor. Every drop counts.",
          });
          setLocation("/");
        },
        onError: () => {
          toast({
            title: "Registration failed",
            description: "There was an error registering your profile. Please try again.",
            variant: "destructive",
          });
        },
      }
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container max-w-3xl mx-auto px-4">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Register as a Donor
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Join the MBC network. Your commitment today means someone gets a second chance at life tomorrow.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-border">
          
          <div className="flex border-b border-border">
            <div className={`flex-1 text-center py-4 font-medium text-sm transition-colors ${step === 1 ? "bg-primary/5 text-primary border-b-2 border-primary" : "text-muted-foreground"}`}>
              1. Eligibility Check
            </div>
            <div className={`flex-1 text-center py-4 font-medium text-sm transition-colors ${step === 2 ? "bg-primary/5 text-primary border-b-2 border-primary" : "text-muted-foreground"}`}>
              2. Personal Details
            </div>
          </div>

          <div className="p-6 md:p-10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-6"
                    >
                      <h2 className="text-xl font-bold mb-6">Basic Eligibility</h2>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="weight"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Body Weight (kg)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="e.g. 70" {...field} />
                              </FormControl>
                              <FormDescription>Must be at least 50kg</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="dateOfBirth"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date of Birth</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormDescription>Must be between 18 and 65</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="hasChronicDisease"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                Do you have any chronic medical conditions?
                              </FormLabel>
                              <FormDescription>
                                Such as severe heart disease, chronic lung disease, etc.
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />

                      {isEligible === false && (
                        <div className="p-4 bg-destructive/10 text-destructive rounded-lg flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold">Currently Ineligible</h4>
                            <p className="text-sm mt-1">Based on the provided information, you do not meet the minimum requirements for blood donation. Thank you for your willingness to help.</p>
                          </div>
                        </div>
                      )}

                      <Button type="button" size="lg" className="w-full" onClick={checkEligibility}>
                        Continue <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-6"
                    >
                      <h2 className="text-xl font-bold mb-6">Contact & Profile</h2>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input className="pl-9" placeholder="John" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="bloodType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Blood Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select blood type" />
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
                          name="lastDonationDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Donation Date (Optional)</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input type="date" className="pl-9" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Emergency Contact Number</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input className="pl-9" type="tel" placeholder="+1 (555) 000-0000" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address (Optional)</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="john@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input className="pl-9" placeholder="San Francisco" {...field} />
                              </div>
                            </FormControl>
                            <FormDescription>Where you can donate locally</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex gap-4 pt-4 border-t border-border">
                        <Button type="button" variant="outline" onClick={() => setStep(1)} className="w-full">
                          Back
                        </Button>
                        <Button type="submit" className="w-full" disabled={registerDonor.isPending}>
                          {registerDonor.isPending ? "Registering..." : "Complete Registration"}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
