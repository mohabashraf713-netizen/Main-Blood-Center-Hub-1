import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Search, Filter, Droplets, ArrowRight } from "lucide-react";
import { useListHospitals } from "@workspace/api-client-react";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Locator() {
  const [cityFilter, setCityFilter] = useState<string>("");
  const [bloodTypeFilter, setBloodTypeFilter] = useState<string>("");

  const { data, isLoading } = useListHospitals({
    query: {
      queryKey: ["hospitals", cityFilter, bloodTypeFilter],
    }
  }, {
    request: {
      url: `/api/hospitals?${cityFilter ? `city=${cityFilter}&` : ""}${bloodTypeFilter ? `bloodType=${encodeURIComponent(bloodTypeFilter)}` : ""}`
    }
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">Find a Donation Center</h1>
          <p className="text-xl text-muted-foreground">Locate hospitals and dedicated blood banks in the MBC network near you.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-border mb-10 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search by city..." 
              className="pl-10 h-12 text-lg"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
            />
          </div>
          <div className="w-full md:w-64">
            <Select value={bloodTypeFilter} onValueChange={setBloodTypeFilter}>
              <SelectTrigger className="h-12 text-lg">
                <SelectValue placeholder="Needed Blood Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {(cityFilter || bloodTypeFilter && bloodTypeFilter !== "all") && (
            <Button 
              variant="ghost" 
              className="h-12 px-6"
              onClick={() => {
                setCityFilter("");
                setBloodTypeFilter("");
              }}
            >
              Clear
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full rounded-none" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : data?.hospitals.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-border">
            <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <MapPin className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">No centers found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.hospitals.map((hospital, i) => (
              <motion.div
                key={hospital.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="h-full hover:shadow-md transition-shadow duration-300 border-border group overflow-hidden flex flex-col">
                  <div className="h-32 bg-slate-100 relative">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="absolute bottom-4 left-4">
                      {hospital.isBloodBank ? (
                        <Badge className="bg-primary hover:bg-primary/90 shadow-sm border-0">Dedicated Blood Bank</Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm shadow-sm">Partner Hospital</Badge>
                      )}
                    </div>
                  </div>
                  
                  <CardContent className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">{hospital.name}</h3>
                    
                    <div className="space-y-3 mb-6 flex-1">
                      <div className="flex items-start gap-3 text-muted-foreground text-sm">
                        <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                        <span>{hospital.address}, {hospital.city}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground text-sm">
                        <Phone className="w-4 h-4 text-primary shrink-0" />
                        <span>{hospital.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground text-sm">
                        <Clock className="w-4 h-4 text-primary shrink-0" />
                        <span>{hospital.operatingHours}</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <Droplets className="w-3 h-3" /> Critical Needs
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {hospital.availableBloodTypes.map(type => (
                          <span key={type} className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-red-50 text-red-600 font-bold text-sm border border-red-100">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full mt-6 justify-between group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                      Get Directions <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
