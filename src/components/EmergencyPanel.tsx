
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Phone, AlertTriangle, MapPin, Users, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EmergencyPanel = () => {
  const [emergencyData, setEmergencyData] = useState({
    emergencyType: "",
    location: "",
    description: "",
    peopleAffected: "",
    priority: ""
  });

  const { toast } = useToast();

  const emergencyTypes = [
    "Medical Emergency",
    "Accident",
    "Fire",
    "Crime in Progress",
    "Natural Disaster",
    "Public Disturbance",
    "Other"
  ];

  const priorityLevels = [
    "Low",
    "Medium",
    "High",
    "Critical"
  ];

  const handleEmergencySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emergencyData.emergencyType || !emergencyData.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in emergency type and location.",
        variant: "destructive",
      });
      return;
    }

    console.log("Emergency registered:", emergencyData);
    
    toast({
      title: "Emergency Registered",
      description: "Emergency has been registered and relevant teams have been notified.",
    });

    setEmergencyData({
      emergencyType: "",
      location: "",
      description: "",
      peopleAffected: "",
      priority: ""
    });
  };

  const handleSOS = () => {
    toast({
      title: "SOS Alert Sent",
      description: "Emergency SOS signal has been sent to all nearby officers.",
      variant: "destructive",
    });
    console.log("SOS alert triggered");
  };

  return (
    <div className="space-y-6">
      {/* SOS Emergency Button */}
      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-red-800">Emergency SOS</h3>
            <p className="text-red-600">Press this button to send an immediate distress signal to nearby officers</p>
            <Button 
              onClick={handleSOS}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-bold"
              size="lg"
            >
              <Phone className="h-6 w-6 mr-2" />
              SEND SOS ALERT
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Registration Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <span>Register Emergency</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmergencySubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyType">Emergency Type *</Label>
                <Select value={emergencyData.emergencyType} onValueChange={(value) => setEmergencyData({...emergencyData, emergencyType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select emergency type" />
                  </SelectTrigger>
                  <SelectContent>
                    {emergencyTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority Level</Label>
                <Select value={emergencyData.priority} onValueChange={(value) => setEmergencyData({...emergencyData, priority: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorityLevels.map((level) => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyLocation" className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Location *</span>
                </Label>
                <Input
                  id="emergencyLocation"
                  value={emergencyData.location}
                  onChange={(e) => setEmergencyData({...emergencyData, location: e.target.value})}
                  placeholder="Enter emergency location"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="peopleAffected" className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>People Affected</span>
                </Label>
                <Input
                  id="peopleAffected"
                  value={emergencyData.peopleAffected}
                  onChange={(e) => setEmergencyData({...emergencyData, peopleAffected: e.target.value})}
                  placeholder="Number of people affected"
                  type="number"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyDescription">Description</Label>
              <Textarea
                id="emergencyDescription"
                value={emergencyData.description}
                onChange={(e) => setEmergencyData({...emergencyData, description: e.target.value})}
                placeholder="Describe the emergency situation..."
                rows={4}
              />
            </div>

            <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Register Emergency
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Recent Emergency Calls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Recent Emergency Calls</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
              <div>
                <h4 className="font-medium text-red-800">Medical Emergency</h4>
                <p className="text-sm text-red-600">FC Road, Pune - 2:30 PM</p>
              </div>
              <span className="px-2 py-1 bg-red-600 text-white text-xs rounded">Critical</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div>
                <h4 className="font-medium text-yellow-800">Traffic Accident</h4>
                <p className="text-sm text-yellow-600">Mumbai-Pune Highway - 1:45 PM</p>
              </div>
              <span className="px-2 py-1 bg-yellow-600 text-white text-xs rounded">High</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyPanel;
