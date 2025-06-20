
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car, FileText, AlertTriangle, Phone, Plus, MapPin, Clock, User } from "lucide-react";
import ViolationForm from "@/components/ViolationForm";
import EmergencyPanel from "@/components/EmergencyPanel";

const TrafficCopDashboard = () => {
  const [activeView, setActiveView] = useState("overview");
  const [violations] = useState([
    {
      id: "V001",
      violatorName: "John Doe",
      violationType: "Speeding",
      vehicle: "MH12AB1234",
      location: "Mumbai-Pune Highway",
      time: "10:30 AM",
      status: "Pending"
    },
    {
      id: "V002",
      violatorName: "Jane Smith",
      violationType: "No Helmet",
      vehicle: "MH14CD5678",
      location: "FC Road, Pune",
      time: "11:15 AM",
      status: "Ticket Issued"
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-600">Today's Violations</p>
                <p className="text-2xl font-bold text-blue-900">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <Car className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-600">Tickets Issued</p>
                <p className="text-2xl font-bold text-green-900">8</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-500 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-yellow-600">Emergencies</p>
                <p className="text-2xl font-bold text-yellow-900">2</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-500 rounded-lg">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-red-600">SOS Calls</p>
                <p className="text-2xl font-bold text-red-900">0</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button 
          onClick={() => setActiveView("violation")}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Register Violation
        </Button>
        <Button 
          onClick={() => setActiveView("emergency")}
          variant="outline"
          className="border-red-500 text-red-600 hover:bg-red-50"
        >
          <AlertTriangle className="h-4 w-4 mr-2" />
          Register Emergency
        </Button>
        <Button 
          onClick={() => setActiveView("overview")}
          variant="outline"
        >
          <FileText className="h-4 w-4 mr-2" />
          View Violations
        </Button>
      </div>

      {/* Content Area */}
      {activeView === "violation" && <ViolationForm />}
      {activeView === "emergency" && <EmergencyPanel />}
      {activeView === "overview" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Recent Violations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {violations.map((violation) => (
                <div key={violation.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Car className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{violation.violatorName}</h4>
                      <p className="text-sm text-slate-600">{violation.violationType}</p>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-slate-500">
                        <span className="flex items-center space-x-1">
                          <Car className="h-3 w-3" />
                          <span>{violation.vehicle}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{violation.location}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{violation.time}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={violation.status === "Pending" ? "destructive" : "default"}>
                      {violation.status}
                    </Badge>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Emergency SOS Button */}
      <div className="fixed bottom-6 right-6">
        <Button
          size="lg"
          className="bg-red-600 hover:bg-red-700 shadow-lg rounded-full h-16 w-16 p-0"
          onClick={() => setActiveView("emergency")}
        >
          <Phone className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
};

export default TrafficCopDashboard;
