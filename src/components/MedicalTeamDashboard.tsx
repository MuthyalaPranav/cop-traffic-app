
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Ambulance, MapPin, Clock, Phone, AlertTriangle, Users, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MedicalTeamDashboard = () => {
  const [selectedEmergency, setSelectedEmergency] = useState("");
  const { toast } = useToast();

  const emergencyRequests = [
    {
      id: "E001",
      type: "Cardiac Emergency",
      location: "MG Road, Pune",
      time: "14:30",
      priority: "Critical",
      requestedBy: "Officer Sharma",
      status: "Pending"
    },
    {
      id: "E002",
      type: "Traffic Accident",
      location: "FC Road Junction",
      time: "13:45",
      priority: "High",
      requestedBy: "Officer Patel",
      status: "Dispatched"
    },
    {
      id: "E003",
      type: "Minor Injuries",
      location: "Bund Garden",
      time: "12:20",
      priority: "Medium",
      requestedBy: "Officer Kumar",
      status: "Completed"
    }
  ];

  const ambulanceFleet = [
    { id: "AMB001", status: "Available", location: "Base Station" },
    { id: "AMB002", status: "On Duty", location: "MG Road" },
    { id: "AMB003", status: "Available", location: "Kothrud" },
    { id: "AMB004", status: "Maintenance", location: "Service Center" }
  ];

  const handleDispatchAmbulance = (emergencyId: string) => {
    toast({
      title: "Ambulance Dispatched",
      description: `Emergency unit dispatched for case ${emergencyId}`,
    });
    console.log(`Dispatching ambulance for emergency: ${emergencyId}`);
  };

  const handleUpdateStatus = (emergencyId: string, newStatus: string) => {
    toast({
      title: "Status Updated",
      description: `Emergency ${emergencyId} status updated to ${newStatus}`,
    });
    console.log(`Updating emergency ${emergencyId} status to: ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600">Active Emergencies</p>
                <p className="text-2xl font-bold text-red-900">3</p>
                <p className="text-xs text-red-500">2 critical</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Available Ambulances</p>
                <p className="text-2xl font-bold text-blue-900">2</p>
                <p className="text-xs text-blue-500">out of 4 total</p>
              </div>
              <Ambulance className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Cases Resolved</p>
                <p className="text-2xl font-bold text-green-900">18</p>
                <p className="text-xs text-green-500">Today</p>
              </div>
              <Heart className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600">Response Time</p>
                <p className="text-2xl font-bold text-yellow-900">8.5</p>
                <p className="text-xs text-yellow-500">avg minutes</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <span>Emergency Requests</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emergencyRequests.map((emergency) => (
              <div key={emergency.id} className="p-4 border rounded-lg hover:bg-slate-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      emergency.priority === "Critical" ? "bg-red-100" :
                      emergency.priority === "High" ? "bg-orange-100" : "bg-yellow-100"
                    }`}>
                      <Heart className={`h-6 w-6 ${
                        emergency.priority === "Critical" ? "text-red-600" :
                        emergency.priority === "High" ? "text-orange-600" : "text-yellow-600"
                      }`} />
                    </div>
                    <div>
                      <h4 className="font-medium">{emergency.id} - {emergency.type}</h4>
                      <p className="text-sm text-slate-600">Requested by {emergency.requestedBy}</p>
                      <div className="flex items-center space-x-3 mt-1 text-xs text-slate-500">
                        <span className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{emergency.location}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{emergency.time}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={
                      emergency.priority === "Critical" ? "destructive" :
                      emergency.priority === "High" ? "default" : "secondary"
                    }>
                      {emergency.priority}
                    </Badge>
                    <Badge variant={emergency.status === "Pending" ? "destructive" : "default"}>
                      {emergency.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  {emergency.status === "Pending" && (
                    <Button 
                      size="sm" 
                      onClick={() => handleDispatchAmbulance(emergency.id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Ambulance className="h-4 w-4 mr-1" />
                      Dispatch Ambulance
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    <Phone className="h-4 w-4 mr-1" />
                    Contact Officer
                  </Button>
                  <Select onValueChange={(value) => handleUpdateStatus(emergency.id, value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Update Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dispatched">Dispatched</SelectItem>
                      <SelectItem value="En Route">En Route</SelectItem>
                      <SelectItem value="On Scene">On Scene</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ambulance Fleet Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Ambulance className="h-5 w-5" />
              <span>Ambulance Fleet Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ambulanceFleet.map((ambulance) => (
                <div key={ambulance.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{ambulance.id}</h4>
                    <p className="text-sm text-slate-600 flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{ambulance.location}</span>
                    </p>
                  </div>
                  <Badge variant={
                    ambulance.status === "Available" ? "default" :
                    ambulance.status === "On Duty" ? "destructive" : "secondary"
                  }>
                    {ambulance.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Average Response Time</span>
                <div className="flex items-center space-x-2">
                  <span className="font-bold">8.5 min</span>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Success Rate</span>
                <span className="font-bold text-green-600">94%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Cases This Week</span>
                <span className="font-bold">127</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Critical Cases</span>
                <span className="font-bold text-red-600">23</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MedicalTeamDashboard;
