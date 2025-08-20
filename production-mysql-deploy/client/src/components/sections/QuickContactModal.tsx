import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";

const serviceOptions = [
  "Website Development",
  "Mobile App Development", 
  "Cybersecurity Solutions",
  "Cloud Infrastructure",
  "AI & Machine Learning",
  "E-commerce Solutions",
  "Digital Marketing",
  "IT Consulting",
  "Other"
];

const budgetRanges = [
  "$5,000 - $10,000",
  "$10,000 - $25,000", 
  "$25,000 - $50,000",
  "$50,000 - $100,000",
  "$100,000+"
];

interface QuickContactModalProps {
  trigger?: React.ReactNode;
}

export default function QuickContactModal({ trigger }: QuickContactModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceInterest: "",
    budgetRange: "",
    message: "",
    urgency: "normal"
  });

  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, you would send this to your backend
      console.log("Form submission:", formData);
      
      setIsSubmitted(true);
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      });

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          serviceInterest: "",
          budgetRange: "",
          message: "",
          urgency: "normal"
        });
        setIsOpen(false);
      }, 3000);

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultTrigger = (
    <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
      <MessageCircle size={20} />
      <span>Quick Contact</span>
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <MessageCircle className="mr-3 text-primary" size={28} />
            Get in Touch
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            Ready to transform your business? Let's discuss your project requirements and how we can help you succeed.
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="py-12 text-center">
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-emerald-600 dark:text-emerald-400" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Message Sent Successfully!
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Thank you for reaching out. Our team will review your inquiry and get back to you within 24 hours.
            </p>
            <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center justify-center space-x-2">
                <Clock size={16} />
                <span>Expected response time: 2-24 hours</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Mail size={16} />
                <span>You'll receive a confirmation email shortly</span>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Your full name"
                  required
                  className="border-gray-300 dark:border-gray-600 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@company.com"
                  required
                  className="border-gray-300 dark:border-gray-600 focus:border-primary"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="border-gray-300 dark:border-gray-600 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  placeholder="Your company name"
                  className="border-gray-300 dark:border-gray-600 focus:border-primary"
                />
              </div>
            </div>

            {/* Project Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="service">Service Interest</Label>
                <Select value={formData.serviceInterest} onValueChange={(value) => handleInputChange("serviceInterest", value)}>
                  <SelectTrigger className="border-gray-300 dark:border-gray-600 focus:border-primary">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceOptions.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Budget Range</Label>
                <Select value={formData.budgetRange} onValueChange={(value) => handleInputChange("budgetRange", value)}>
                  <SelectTrigger className="border-gray-300 dark:border-gray-600 focus:border-primary">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">Project Details *</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="Please describe your project requirements, timeline, and any specific needs you have..."
                rows={4}
                required
                className="border-gray-300 dark:border-gray-600 focus:border-primary resize-none"
              />
            </div>

            {/* Urgency */}
            <div className="space-y-2">
              <Label htmlFor="urgency">Project Urgency</Label>
              <Select value={formData.urgency} onValueChange={(value) => handleInputChange("urgency", value)}>
                <SelectTrigger className="border-gray-300 dark:border-gray-600 focus:border-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - Planning phase (3+ months)</SelectItem>
                  <SelectItem value="normal">Normal - Standard timeline (1-3 months)</SelectItem>
                  <SelectItem value="high">High - Need to start soon (within 1 month)</SelectItem>
                  <SelectItem value="urgent">Urgent - ASAP (within 1-2 weeks)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Contact Preferences */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">What happens next?</h4>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>We'll review your inquiry within 2-4 hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>A project specialist will contact you for a free consultation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>We'll provide a detailed project proposal within 24-48 hours</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-primary hover:bg-primary/90 text-white py-3 rounded-full transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Send size={18} />
                    <span>Send Message</span>
                  </div>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 rounded-full"
              >
                Cancel
              </Button>
            </div>

            {/* Emergency Contact */}
            <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                Need immediate assistance?
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm">
                <a href="tel:+15551234567" className="flex items-center space-x-1 text-primary hover:underline">
                  <Phone size={14} />
                  <span>+1 (555) 123-4567</span>
                </a>
                <span className="text-gray-400">|</span>
                <a href="mailto:contact@ieNet.com" className="flex items-center space-x-1 text-primary hover:underline">
                  <Mail size={14} />
                  <span>contact@ieNet.com</span>
                </a>
              </div>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}