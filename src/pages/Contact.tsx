
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { MailIcon, PhoneIcon, MapPinIcon } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-white to-brand-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Have questions about our review management service? We're here to help!
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Contact Form Section */}
      <section className="section container">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
            <p className="text-muted-foreground mb-8">
              Fill out the form below and one of our representatives will get back to you shortly.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="bg-brand-100 text-brand-600 p-3 rounded-lg">
                  <MailIcon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Email Us</h3>
                  <p className="text-muted-foreground">info@reputationrocket.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-brand-100 text-brand-600 p-3 rounded-lg">
                  <PhoneIcon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Call Us</h3>
                  <p className="text-muted-foreground">(555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-brand-100 text-brand-600 p-3 rounded-lg">
                  <MapPinIcon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Visit Us</h3>
                  <p className="text-muted-foreground">123 Business Ave, Suite 200<br />San Francisco, CA 94107</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white p-8 rounded-xl shadow-sm border border-border">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe" 
                    required 
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com" 
                    required 
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <Input 
                    id="phone" 
                    name="phone"
                    type="tel" 
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567" 
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Company Name
                  </label>
                  <Input 
                    id="company" 
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Business" 
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?" 
                    rows={4} 
                    required 
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="section-sm container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-xl overflow-hidden shadow-lg h-[400px] w-full"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555098464!2d-122.50764017948622!3d37.75781499068417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1636567348175!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            title="Office location"
          ></iframe>
        </motion.div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
