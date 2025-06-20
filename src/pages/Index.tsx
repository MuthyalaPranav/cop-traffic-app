
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, Phone, Users, Car, FileText, MapPin } from "lucide-react";
import LoginForm from "@/components/LoginForm";
import TrafficCopDashboard from "@/components/TrafficCopDashboard";
import CentralTeamDashboard from "@/components/CentralTeamDashboard";
import MedicalTeamDashboard from "@/components/MedicalTeamDashboard";

type UserRole = "traffic_cop" | "central_team" | "medical_team" | null;

const Index = () => {
  const [currentUser, setCurrentUser] = useState<UserRole>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (role: UserRole) => {
    setCurrentUser(role);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-blue-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">CopFriendlyApp - ESeva</h1>
                <p className="text-blue-200 text-sm">Police Assistance Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-blue-800 text-white">
                {currentUser === "traffic_cop" && "Traffic Officer"}
                {currentUser === "central_team" && "Central Team"}
                {currentUser === "medical_team" && "Medical Team"}
              </Badge>
              <Button variant="outline" onClick={handleLogout} className="text-white border-white hover:bg-blue-800">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="container mx-auto px-4 py-6">
        {currentUser === "traffic_cop" && <TrafficCopDashboard />}
        {currentUser === "central_team" && <CentralTeamDashboard />}
        {currentUser === "medical_team" && <MedicalTeamDashboard />}
      </main>
    </div>
  );
};

export default Index;
