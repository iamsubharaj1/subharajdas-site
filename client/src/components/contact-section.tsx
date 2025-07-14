import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Linkedin, Send } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { trackEvent } from "@/lib/analytics";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });

  const submitContactForm = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return await apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      // Track successful form submission
      trackEvent('form_submit', 'contact', 'contact_form_success');
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: ""
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact me directly.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to send your message.",
        variant: "destructive",
      });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast({
        title: "Invalid email address",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // Save to database and open mailto link
    submitContactForm.mutate(formData);
    
    // Track mailto link click
    trackEvent('email_click', 'contact', 'mailto_link');
    
    // Create mailto link with form data
    const mailtoSubject = encodeURIComponent(`Website Contact: ${formData.subject}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.firstName} ${formData.lastName}\n` +
      `Email: ${formData.email}\n` +
      `Subject: ${formData.subject}\n\n` +
      `Message:\n${formData.message}\n\n` +
      `---\nSent from subharajdas.com contact form`
    );
    
    const mailtoLink = `mailto:88.srdas@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
    window.open(mailtoLink, '_blank');
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-20 bg-slate-800 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Let's Connect</h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Ready to discuss operations excellence, customer success strategies, or potential collaborations?
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <MapPin className="text-white w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-lg">Location</div>
                <div className="text-slate-300">Bengaluru, Karnataka, India</div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Phone className="text-white w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-lg">Phone</div>
                <div className="text-slate-300">+91 7406235550</div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Mail className="text-white w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-lg">Email</div>
                <div className="text-slate-300">88.srdas@gmail.com</div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Linkedin className="text-white w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-lg">LinkedIn</div>
                <a 
                  href="https://linkedin.com/in/srdas88" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  linkedin.com/in/srdas88
                </a>
              </div>
            </div>
          </div>

          <Card className="bg-slate-700 border-slate-600">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-white">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-white font-semibold">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="bg-slate-600 border-slate-500 text-white placeholder-slate-400 focus:border-primary"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-white font-semibold">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="bg-slate-600 border-slate-500 text-white placeholder-slate-400 focus:border-primary"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-white font-semibold">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-slate-600 border-slate-500 text-white placeholder-slate-400 focus:border-primary"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="subject" className="text-white font-semibold">Subject</Label>
                  <Input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="bg-slate-600 border-slate-500 text-white placeholder-slate-400 focus:border-primary"
                    placeholder="Let's discuss operations excellence"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-white font-semibold">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="bg-slate-600 border-slate-500 text-white placeholder-slate-400 focus:border-primary resize-none"
                    rows={4}
                    placeholder="Tell me about your operations challenges or collaboration ideas..."
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-blue-700 text-white font-semibold"
                  disabled={submitContactForm.isPending}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {submitContactForm.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
