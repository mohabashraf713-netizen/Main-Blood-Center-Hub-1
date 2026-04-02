import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout/Layout";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import RegisterDonor from "@/pages/register-donor";
import RequestBlood from "@/pages/request-blood";
import Locator from "@/pages/locator";
import Education from "@/pages/education";
import Emergency from "@/pages/emergency";
import About from "@/pages/about";
import Contact from "@/pages/contact";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/register-donor" component={RegisterDonor} />
        <Route path="/request-blood" component={RequestBlood} />
        <Route path="/locator" component={Locator} />
        <Route path="/education" component={Education} />
        <Route path="/emergency" component={Emergency} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
