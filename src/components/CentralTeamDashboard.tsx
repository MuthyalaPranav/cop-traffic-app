
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Car, MapPin, Clock, TrendingUp, TrendingDown, DollarSign, Users } from "lucide-react";

const CentralTeamDashboard = () => {
  const violationStats = [
    { type: "Speeding", count: 45, trend: "up" },
    { type: "No Helmet", count: 32, trend: "down" },
    { type: "Signal Jump", count: 28, trend: "up" },
    { type: "Parking", count: 15, trend: "down" },
  ];

  const recentViolations = [
    { id: "V001", officer: "Officer Sharma", type: "Speeding", location: "MG Road", fine: "₹1,000", time: "10:30 AM" },
    { id: "V002", officer: "Officer Patel", type: "No Helmet", location: "FC Road", fine: "₹500", time: "11:15 AM" },
    { id: "V003", officer: "Officer Kumar", type: "Signal Jump", location: "Bund Garden", fine: "₹2,000", time: "12:00 PM" },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Total Violations</p>
                <p className="text-2xl font-bold text-blue-900">156</p>
                <p className="text-xs text-blue-500">+12% from yesterday</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Total Fines</p>
                <p className="text-2xl font-bold text-green-900">₹1,24,500</p>
                <p className="text-xs text-green-500">+8% from yesterday</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600">Active Officers</p>
                <p className="text-2xl font-bold text-yellow-900">24</p>
                <p className="text-xs text-yellow-500">On duty today</p>
              </div>
              <Users className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Vehicles Checked</p>
                <p className="text-2xl font-bold text-purple-900">342</p>
                <p className="text-xs text-purple-500">Today's count</p>
              </div>
              <Car className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Violation Types Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Violation Types - Today's Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {violationStats.map((stat) => (
              <div key={stat.type} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{stat.type}</h4>
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-red-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-green-500" />
                  )}
                </div>
                <p className="text-2xl font-bold">{stat.count}</p>
                <p className={`text-xs ${stat.trend === "up" ? "text-red-500" : "text-green-500"}`}>
                  {stat.trend === "up" ? "↑" : "↓"} vs yesterday
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Violations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Violations & Fines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentViolations.map((violation) => (
              <div key={violation.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{violation.id} - {violation.type}</h4>
                    <p className="text-sm text-slate-600">Reported by {violation.officer}</p>
                    <div className="flex items-center space-x-3 mt-1 text-xs text-slate-500">
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
                <div className="text-right">
                  <p className="font-bold text-green-600">{violation.fine}</p>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    Collected
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Officers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Officer Sharma</span>
                <Badge>15 violations</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Officer Patel</span>
                <Badge>12 violations</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Officer Kumar</span>
                <Badge>10 violations</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>High Activity Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>MG Road</span>
                <Badge variant="destructive">25 violations</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>FC Road</span>
                <Badge variant="destructive">18 violations</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Bund Garden</span>
                <Badge>12 violations</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CentralTeamDashboard;
