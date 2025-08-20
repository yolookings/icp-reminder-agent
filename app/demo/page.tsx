"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Clock,
  Plus,
  Trash2,
  Calendar,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

interface Reminder {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  created: string;
}

export default function DemoPage() {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: "1",
      title: "Team Meeting",
      description: "Discussion about ICP Reminder Agent project",
      date: "2025-08-21",
      time: "10:00",
      created: "2025-08-20T08:30:00Z",
    },
    {
      id: "2",
      title: "Morning Workout",
      description: "Jogging in the park",
      date: "2025-08-21",
      time: "06:00",
      created: "2025-08-20T20:15:00Z",
    },
  ]);

  const [newReminder, setNewReminder] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const addReminder = async () => {
    if (!newReminder.title || !newReminder.date || !newReminder.time) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call to ICP Canister
    setTimeout(() => {
      const reminder: Reminder = {
        id: Date.now().toString(),
        ...newReminder,
        created: new Date().toISOString(),
      };

      setReminders((prev) => [...prev, reminder]);
      setNewReminder({ title: "", description: "", date: "", time: "" });
      setIsLoading(false);

      toast({
        title: "Reminder Added!",
        description: `"${reminder.title}" has been saved to ICP Canister`,
      });
    }, 1500);
  };

  const deleteReminder = (id: string) => {
    const reminder = reminders.find((r) => r.id === id);
    setReminders((prev) => prev.filter((r) => r.id !== id));

    toast({
      title: "Reminder Deleted",
      description: `"${reminder?.title}" has been removed from blockchain`,
    });
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Clock className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Demo Reminder Agent
                </h1>
                <p className="text-muted-foreground">
                  Simulation of interaction with ICP Canister
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add Reminder Form */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />
                Add New Reminder
              </CardTitle>
              <CardDescription>
                Data will be stored in ICP Canister (simulation)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">
                  Reminder Title
                </label>
                <Input
                  placeholder="Example: Client meeting"
                  value={newReminder.title}
                  onChange={(e) =>
                    setNewReminder((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">
                  Description (Optional)
                </label>
                <Textarea
                  placeholder="Additional details about the reminder..."
                  value={newReminder.description}
                  onChange={(e) =>
                    setNewReminder((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Date
                  </label>
                  <Input
                    type="date"
                    value={newReminder.date}
                    onChange={(e) =>
                      setNewReminder((prev) => ({
                        ...prev,
                        date: e.target.value,
                      }))
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Time
                  </label>
                  <Input
                    type="time"
                    value={newReminder.time}
                    onChange={(e) =>
                      setNewReminder((prev) => ({
                        ...prev,
                        time: e.target.value,
                      }))
                    }
                    className="mt-1"
                  />
                </div>
              </div>

              <Button
                onClick={addReminder}
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                    Saving to ICP...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Save Reminder
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Reminders List */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Calendar className="h-5 w-5 text-accent" />
                Reminder List
              </CardTitle>
              <CardDescription>
                Data from ICP Canister (simulation)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {reminders.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No reminders yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reminders.map((reminder) => (
                    <div
                      key={reminder.id}
                      className="border border-border rounded-lg p-4 bg-card"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-card-foreground">
                            {reminder.title}
                          </h3>
                          {reminder.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {reminder.description}
                            </p>
                          )}
                          <div className="flex items-center gap-4 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {formatDate(reminder.date)}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {reminder.time}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteReminder(reminder.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Demo Info */}
        <Card className="mt-8 border-accent/20 bg-accent/5">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-accent" />
              Demo Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-card-foreground mb-2">
                  Simulated:
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Data storage in ICP Canister</li>
                  <li>• Querying data from blockchain</li>
                  <li>• CRUD operations (Create, Read, Delete)</li>
                  <li>• Realistic response time</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-card-foreground mb-2">
                  Real Implementation:
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• TypeScript backend in ICP Canister</li>
                  <li>• uAgent for natural language interface</li>
                  <li>• Persistent data on blockchain</li>
                  <li>• Deploy to Agentverse</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
