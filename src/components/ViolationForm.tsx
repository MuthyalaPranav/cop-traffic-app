
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Car, User, MapPin, Calendar, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ViolationForm = () => {
  const [formData, setFormData] = useState({
    violatorName: "",
    violationType: "",
    drivingLicense: "",
    vehicleNumber: "",
    vehicleType: "",
    location: "",
    datetime: "",
    repeatedOffender: false,
    remarks: ""
  });

  const { toast } = useToast();

  const violationTypes = [
    "Speeding",
    "No Helmet",
    "Signal Jump",
    "Wrong Way",
    "No License",
    "Drunk Driving",
    "Mobile Usage",
    "Parking Violation",
    "Overloading",
    "Other"
  ];

  const vehicleTypes = [
    "Two Wheeler",
    "Car",
    "Auto Rickshaw",
    "Taxi",
    "Bus",
    "Truck",
    "Other"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.violatorName || !formData.violationType || !formData.vehicleNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    console.log("Violation registered:", formData);
    
    toast({
      title: "Violation Registered",
      description: `Violation case for ${formData.violatorName} has been registered successfully.`,
    });

    // Reset form
    setFormData({
      violatorName: "",
      violationType: "",
      drivingLicense: "",
      vehicleNumber: "",
      vehicleType: "",
      location: "",
      datetime: "",
      repeatedOffender: false,
      remarks: ""
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <span>Register Traffic Violation</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Violator Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="violatorName" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Violator Name *</span>
              </Label>
              <Input
                id="violatorName"
                value={formData.violatorName}
                onChange={(e) => setFormData({...formData, violatorName: e.target.value})}
                placeholder="Enter violator's full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="violationType">Violation Type *</Label>
              <Select value={formData.violationType} onValueChange={(value) => setFormData({...formData, violationType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select violation type" />
                </SelectTrigger>
                <SelectContent>
                  {violationTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="drivingLicense">Driving License Number</Label>
              <Input
                id="drivingLicense"
                value={formData.drivingLicense}
                onChange={(e) => setFormData({...formData, drivingLicense: e.target.value})}
                placeholder="Enter license number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicleNumber" className="flex items-center space-x-2">
                <Car className="h-4 w-4" />
                <span>Vehicle Number *</span>
              </Label>
              <Input
                id="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={(e) => setFormData({...formData, vehicleNumber: e.target.value})}
                placeholder="e.g., MH12AB1234"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicleType">Vehicle Type</Label>
              <Select value={formData.vehicleType} onValueChange={(value) => setFormData({...formData, vehicleType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  {vehicleTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Location</span>
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="Enter violation location"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="datetime" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Date & Time</span>
              </Label>
              <Input
                id="datetime"
                type="datetime-local"
                value={formData.datetime}
                onChange={(e) => setFormData({...formData, datetime: e.target.value})}
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="repeatedOffender"
                checked={formData.repeatedOffender}
                onCheckedChange={(checked) => setFormData({...formData, repeatedOffender: !!checked})}
              />
              <Label htmlFor="repeatedOffender" className="text-sm font-medium">
                Repeated Offender
              </Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="remarks">Additional Remarks</Label>
              <Textarea
                id="remarks"
                value={formData.remarks}
                onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                placeholder="Enter any additional details..."
                rows={3}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Register Violation
            </Button>
            <Button type="button" variant="outline" className="bg-green-600 hover:bg-green-700 text-white border-green-600">
              Issue Ticket
            </Button>
            <Button type="button" variant="outline">
              Accept Payment
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ViolationForm;
