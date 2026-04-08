import { Mail, Phone, MessageSquare, Clock, MapPin, Send } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully!", {
      description: "Our team will get back to you within 24 hours.",
    });
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Support</h1>
        <p className="text-gray-600">We're here to help. Reach out to us anytime!</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Phone Support</h3>
                <p className="text-gray-600 text-sm mb-2">
                  Call us for immediate assistance
                </p>
                <p className="text-blue-600 font-medium">+251 90908765</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Email Support</h3>
                <p className="text-gray-600 text-sm mb-2">
                  Send us a detailed message
                </p>
                <p className="text-green-600 font-medium">support@swiftremit.com</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Live Chat</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Chat with our support team
                </p>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  Start Chat
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Support Hours</h3>
                <p className="text-gray-600 text-sm">
                  Monday - Friday: 9AM - 6PM EST<br />
                  Saturday - Sunday: 10AM - 4PM EST
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-red-600" />
              </div>
              <div>
                
              </div>
            </div>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="p-6 lg:col-span-2">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Send us a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Your Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                type="text"
                placeholder="How can we help you?"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Please describe your issue or question in detail..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
                className="mt-1"
              />
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </form>

          {/* FAQ Section */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4">Frequently Asked Questions</h4>
            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-gray-900 mb-1">How long does a transfer take?</h5>
                <p className="text-sm text-gray-600">
                  Most transfers are completed within minutes. International transfers may take 1-3 business days.
                </p>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 mb-1">What are the transfer fees?</h5>
                <p className="text-sm text-gray-600">
                  We charge a small fee of 2% per transaction with a minimum of $1.
                </p>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 mb-1">Is my money secure?</h5>
                <p className="text-sm text-gray-600">
                  Yes, we use bank-level encryption and security measures to protect your funds and personal information.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
