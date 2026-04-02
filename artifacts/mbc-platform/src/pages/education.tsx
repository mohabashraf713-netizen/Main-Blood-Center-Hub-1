import { motion } from "framer-motion";
import { BookOpen, CheckCircle2, AlertTriangle, ChevronRight, HelpCircle, Activity } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export default function Education() {
  const compatibilityData = [
    { type: "O-", canGive: ["Everyone"], canReceive: ["O-"] },
    { type: "O+", canGive: ["O+", "A+", "B+", "AB+"], canReceive: ["O+", "O-"] },
    { type: "A-", canGive: ["A+", "A-", "AB+", "AB-"], canReceive: ["A-", "O-"] },
    { type: "A+", canGive: ["A+", "AB+"], canReceive: ["A+", "A-", "O+", "O-"] },
    { type: "B-", canGive: ["B+", "B-", "AB+", "AB-"], canReceive: ["B-", "O-"] },
    { type: "B+", canGive: ["B+", "AB+"], canReceive: ["B+", "B-", "O+", "O-"] },
    { type: "AB-", canGive: ["AB+", "AB-"], canReceive: ["AB-", "A-", "B-", "O-"] },
    { type: "AB+", canGive: ["AB+"], canReceive: ["Everyone"] },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container max-w-5xl mx-auto px-4 md:px-6">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">Knowledge Saves Lives</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Understanding blood types, the donation process, and post-care is crucial for a healthy donor network.
          </p>
        </div>

        <Tabs defaultValue="compatibility" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto p-1 bg-slate-200/50 mb-8 rounded-xl">
            <TabsTrigger value="compatibility" className="py-3 text-base rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Blood Compatibility</TabsTrigger>
            <TabsTrigger value="process" className="py-3 text-base rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">The Process</TabsTrigger>
            <TabsTrigger value="faq" className="py-3 text-base rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">FAQ</TabsTrigger>
          </TabsList>
          
          <TabsContent value="compatibility">
            <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
              <div className="p-8 border-b border-border bg-slate-50/50">
                <h2 className="text-2xl font-bold mb-2">Blood Type Compatibility</h2>
                <p className="text-muted-foreground">O- is the universal donor. AB+ is the universal recipient. See exactly who your donation can help.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-border">
                    <tr>
                      <th className="px-6 py-4 font-bold">Blood Type</th>
                      <th className="px-6 py-4 font-bold">Can Give To</th>
                      <th className="px-6 py-4 font-bold">Can Receive From</th>
                    </tr>
                  </thead>
                  <tbody>
                    {compatibilityData.map((row, i) => (
                      <tr key={row.type} className={`border-b border-border last:border-0 hover:bg-slate-50 transition-colors ${row.type === 'O-' || row.type === 'O+' ? 'bg-red-50/30' : ''}`}>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold shadow-sm">
                            {row.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-700">
                          {row.canGive.join(", ")}
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-700">
                          {row.canReceive.join(", ")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="process">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Before You Donate</h2>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex gap-4">
                      <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground">Hydrate</h4>
                        <p className="text-sm text-muted-foreground">Drink plenty of water before your appointment.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground">Eat well</h4>
                        <p className="text-sm text-muted-foreground">Have a healthy, low-fat meal within 2 hours of donating.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground">Rest</h4>
                        <p className="text-sm text-muted-foreground">Get a good night's sleep before your donation day.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <AlertTriangle className="w-6 h-6 text-orange-500 shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground">Avoid Alcohol</h4>
                        <p className="text-sm text-muted-foreground">Do not consume alcohol 24 hours prior to donating.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">After You Donate</h2>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex gap-4">
                      <Activity className="w-6 h-6 text-blue-500 shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground">Rest briefly</h4>
                        <p className="text-sm text-muted-foreground">Sit and enjoy a snack and drink for 10-15 minutes.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground">Keep the bandage on</h4>
                        <p className="text-sm text-muted-foreground">Leave the bandage on for at least 4 hours.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <AlertTriangle className="w-6 h-6 text-orange-500 shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground">No heavy lifting</h4>
                        <p className="text-sm text-muted-foreground">Avoid strenuous physical activity for the rest of the day.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground">Hydrate more</h4>
                        <p className="text-sm text-muted-foreground">Drink extra liquids over the next 24 hours.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="faq">
            <div className="bg-white rounded-2xl shadow-sm border border-border p-8">
              <div className="flex items-center gap-3 mb-6">
                <HelpCircle className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left font-semibold text-lg">How long does the donation process take?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    The entire process, from registration to post-donation resting, usually takes about 45 minutes to an hour. The actual blood draw only takes 8-10 minutes.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left font-semibold text-lg">Does donating blood hurt?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    You may feel a slight pinch when the needle is inserted, but the actual donation process is painless for most people.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left font-semibold text-lg">How often can I donate?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    You must wait at least 8 weeks (56 days) between whole blood donations. For platelet donations, you can donate every 7 days, up to 24 times a year.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left font-semibold text-lg">Can I donate if I'm taking medication?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    Most medications do not prevent you from donating blood. However, some medications (like blood thinners or certain acne treatments) might require a waiting period. Please inform the staff about any medications during your screening.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left font-semibold text-lg">Can I donate if I have a tattoo or piercing?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    Yes, if the tattoo or piercing was applied by a state-regulated entity using sterile needles and non-reused ink. If not, you must wait 3 months before donating.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </TabsContent>
        </Tabs>
        
      </div>
    </div>
  );
}
