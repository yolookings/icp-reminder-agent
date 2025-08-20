import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Calendar,
  Code,
  Database,
  Zap,
  BookOpen,
  Play,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Clock className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  ICP Reminder Agent
                </h1>
                <p className="text-muted-foreground">
                  Autonomous On-Chain AI Reminder
                </p>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="bg-accent text-accent-foreground"
            >
              v1.0.0 - Educational
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Blockchain-Based Reminder Agent
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            A secure and transparent reminder system using ICP Canister
            (TypeScript) and uAgent (Fetch.ai) to store your schedules on the
            blockchain.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/demo">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Play className="mr-2 h-5 w-5" />
                Try Demo
              </Button>
            </Link>
            <Link href="/tutorial">
              <Button variant="outline" size="lg">
                <BookOpen className="mr-2 h-5 w-5" />
                Full Tutorial
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
            Key Features
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border">
              <CardHeader>
                <div className="p-2 bg-primary/10 rounded-lg w-fit">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-card-foreground">
                  ICP Canister Backend
                </CardTitle>
                <CardDescription>
                  TypeScript backend running on the Internet Computer Protocol
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Data permanently stored on blockchain</li>
                  <li>• Secure and tamper-proof</li>
                  <li>• RESTful API for CRUD operations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="p-2 bg-accent/10 rounded-lg w-fit">
                  <Zap className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-card-foreground">
                  uAgent Frontend
                </CardTitle>
                <CardDescription>
                  AI Agent powered by Fetch.ai for natural interaction
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Conversational interface</li>
                  <li>• Natural language processing</li>
                  <li>• Deploy to Agentverse</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="p-2 bg-secondary/10 rounded-lg w-fit">
                  <Code className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-card-foreground">
                  Simulation & Deployment
                </CardTitle>
                <CardDescription>
                  Flexible for both development and production
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Local development with DFX</li>
                  <li>• ICP network simulation</li>
                  <li>• Deploy to ICP mainnet</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
            System Architecture
          </h3>
          <div className="max-w-4xl mx-auto">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">
                  System Workflow
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary rounded-full text-primary-foreground font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground">
                        User Input
                      </h4>
                      <p className="text-muted-foreground">
                        User provides a command: "Remind me about the meeting at
                        10 AM tomorrow"
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-accent rounded-full text-accent-foreground font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground">
                        uAgent Processing
                      </h4>
                      <p className="text-muted-foreground">
                        The agent transforms the input into structured data and
                        sends it to the ICP Canister
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-secondary rounded-full text-secondary-foreground font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground">
                        ICP Storage
                      </h4>
                      <p className="text-muted-foreground">
                        The canister stores the reminder on blockchain and
                        returns confirmation
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary rounded-full text-primary-foreground font-bold text-sm">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground">
                        Query & Response
                      </h4>
                      <p className="text-muted-foreground">
                        User can query schedules and get real-time responses
                        from blockchain
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
            Quick Start
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Simulation (Recommended)
                </CardTitle>
                <CardDescription>For learning and development</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Run the system locally with the DFX simulator for testing and
                  development.
                </p>
                <Link href="/tutorial#simulation">
                  <Button variant="outline" className="w-full bg-transparent">
                    Simulation Guide
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center gap-2">
                  <Zap className="h-5 w-5 text-accent" />
                  Production Deployment
                </CardTitle>
                <CardDescription>Deploy to ICP Mainnet</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Deploy the canister to the ICP mainnet for production with the
                  required cycles.
                </p>
                <Link href="/tutorial#production">
                  <Button variant="outline" className="w-full bg-transparent">
                    Deployment Guide
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            ICP Reminder Agent - Educational Project for Internet Computer
            Protocol
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Built with TypeScript, uAgent (Fetch.ai), and ICP Canister
          </p>
        </div>
      </footer>
    </div>
  );
}
