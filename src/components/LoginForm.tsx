
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Lock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginFormProps {
  onLogin: (role: "traffic_cop" | "central_team" | "medical_team") => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<string>("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password || !role) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to continue.",
        variant: "destructive",
      });
      return;
    }

    // Demo credentials validation
    const validCredentials = {
      "traffic_cop": { username: "cop123", password: "traffic@123" },
      "central_team": { username: "central123", password: "central@123" },
      "medical_team": { username: "medical123", password: "medical@123" }
    };

    const roleCredentials = validCredentials[role as keyof typeof validCredentials];
    
    if (roleCredentials && username === roleCredentials.username && password === roleCredentials.password) {
      toast({
        title: "Login Successful",
        description: `Welcome to CopFriendlyApp - ESeva`,
      });
      onLogin(role as "traffic_cop" | "central_team" | "medical_team");
    } else {
      toast({
        title: "Invalid Credentials",
        description: "Please check your username and password.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-blue-900">CopFriendlyApp</CardTitle>
          <CardDescription className="text-slate-600">
            ESeva - Police Assistance Portal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role">Select Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="traffic_cop">Traffic Officer</SelectItem>
                  <SelectItem value="central_team">Central Team</SelectItem>
                  <SelectItem value="medical_team">Medical Emergency Team</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800">
              Login to Portal
            </Button>
          </form>

          <div className="mt-6 p-4 bg-slate-50 rounded-lg text-sm">
            <h4 className="font-medium text-slate-700 mb-2">Demo Credentials:</h4>
            <div className="space-y-1 text-xs text-slate-600">
              <p><strong>Traffic Officer:</strong> cop123 / traffic@123</p>
              <p><strong>Central Team:</strong> central123 / central@123</p>
              <p><strong>Medical Team:</strong> medical123 / medical@123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
