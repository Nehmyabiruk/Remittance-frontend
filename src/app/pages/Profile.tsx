import { useState, useEffect } from "react";
import { User, Shield, Bell, Calendar } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import { Switch } from "../components/ui/switch";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "123 Main St, New York, NY 10001",
    dateOfBirth: "1990-01-15",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    emailFrequency: "immediate" as "immediate" | "daily" | "weekly",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswordSection, setShowPasswordSection] = useState(false);

  // Load user data
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      navigate("/login");
      return;
    }

    const parsed = JSON.parse(savedUser);
    setUser(parsed);

    setProfileData({
      name: parsed.name || "",
      email: parsed.email || "",
      phone: parsed.phone || "",
      password: parsed.password || "",
      address: parsed.address || "123 Main St, New York, NY 10001",
      dateOfBirth: parsed.dateOfBirth || "1990-01-15",
    });

    loadNotificationPreferences();
  }, [navigate]);

  const loadNotificationPreferences = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:5000/api/notifications/preferences", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.success && data.preferences) {
        setNotifications({
          emailNotifications: data.preferences.emailNotifications ?? true,
          smsNotifications: data.preferences.smsNotifications ?? false,
          pushNotifications: data.preferences.pushNotifications ?? true,
          emailFrequency: data.preferences.emailFrequency ?? "immediate",
        });
      }
    } catch (err) {
      console.error("Failed to load notification preferences:", err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You are not logged in");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone,
        }),
      });

      const data = await res.json();

      if (data.success) {
        const updatedUser = { ...user, ...data.user };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (err) {
      toast.error("Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };



  const handleSavePreferences = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You are not logged in");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/notifications/preferences", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          emailNotifications: notifications.emailNotifications,
          smsNotifications: notifications.smsNotifications,
          pushNotifications: notifications.pushNotifications,
          emailFrequency: notifications.emailFrequency,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Notification preferences saved successfully!");
      } else {
        toast.error(data.message || "Failed to save preferences");
      }
    } catch (err) {
      toast.error("Failed to save notification preferences.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/auth/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Password changed successfully!");
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setShowPasswordSection(false);
      } else {
        toast.error(data.message || "Failed to change password");
      }
    } catch (err) {
      toast.error("Failed to change password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="text-center py-20">Loading profile...</div>;

  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Card - White */}
        <Card className="p-6 h-fit bg-white border border-gray-200">
          <div className="text-center">
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl text-white font-bold">
                {profileData.name ? profileData.name.charAt(0) : "U"}
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">{profileData.name}</h2>
            <p className="text-gray-600 mb-4">{profileData.email}</p>
            <div className="space-y-2 text-sm text-left">
              <div className="flex items-center gap-2 text-gray-600">
                <Shield className="w-4 h-4 text-green-600" />
                <span>Account Verified</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Member since 2025</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information - White */}
          <Card className="p-6 bg-white border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Personal Information
              </h3>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={() => setIsEditing(false)} variant="outline" size="sm">
                    Cancel
                  </Button>
                  <Button onClick={handleSaveProfile} disabled={loading} size="sm">
                    {loading ? "Saving..." : "Save"}
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={profileData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Enter your full name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="you@example.com"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="+251 9XX XXX XXX"
                  className="mt-1"
                />
              </div>
            </div>
          </Card>

          {/* Notification Settings - White */}
          <Card className="p-6 bg-white border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-600" />
              Notification Preferences
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive important updates via email</p>
                </div>
                <Switch
                  checked={notifications.emailNotifications}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, emailNotifications: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">SMS Notifications</p>
                  <p className="text-sm text-gray-500">Receive alerts via SMS</p>
                </div>
                <Switch
                  checked={notifications.smsNotifications}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, smsNotifications: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Push Notifications</p>
                  <p className="text-sm text-gray-500">Receive browser or app push notifications</p>
                </div>
                <Switch
                  checked={notifications.pushNotifications}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, pushNotifications: checked })
                  }
                />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t">
              <Button
                onClick={handleSavePreferences}
                disabled={loading}
                className="w-full"
              >
                {loading ? "Saving Preferences..." : "Save Notification Preferences"}
              </Button>
            </div>
          </Card>

          {/* Security Section - White */}
          <Card className="p-6 bg-white border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              Security
            </h3>
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setShowPasswordSection(!showPasswordSection)}
              >
                Change Password
              </Button>

              {showPasswordSection && (
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, currentPassword: e.target.value })
                      }
                      placeholder="Enter current password"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, newPassword: e.target.value })
                      }
                      placeholder="Enter new password"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                      }
                      placeholder="Confirm new password"
                      className="mt-1"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      onClick={handlePasswordChange}
                      disabled={loading}
                      className="flex-1"
                    >
                      {loading ? "Updating..." : "Update Password"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowPasswordSection(false);
                        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}