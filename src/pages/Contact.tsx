import React, { useState } from "react";
import { useAccessibility } from "@/context/AccessibilityContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Mail, Phone, MapPin, Volume2, Hand } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

const Contact: React.FC = () => {
  const { language } = useAccessibility();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    console.log(values);
    
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      form.reset();
      
      toast({
        title: language === "en" ? "Form Submitted Successfully" : "फॉर्म सफलतापूर्वक सबमिट किया गया",
        description: language === "en" 
          ? "We'll get back to you as soon as possible." 
          : "हम जल्द से जल्द आपसे संपर्क करेंगे।",
      });
   
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
      
    }, 1500);
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          {language === "en" ? "Contact & Help Center" : "संपर्क और सहायता केंद्र"}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {language === "en"
            ? "Get in touch with our team for support, inquiries, or feedback."
            : "सहायता, पूछताछ या प्रतिक्रिया के लिए हमारी टीम से संपर्क करें।"}
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <Tabs defaultValue="contact">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="contact">
              <Mail className="mr-2 h-4 w-4" />
              {language === "en" ? "Contact Form" : "संपर्क फॉर्म"}
            </TabsTrigger>
            <TabsTrigger value="accessibility">
              <Volume2 className="mr-2 h-4 w-4" />
              {language === "en" ? "Accessible Support" : "सुलभ सहायता"}
            </TabsTrigger>
            <TabsTrigger value="faq">
              <Hand className="mr-2 h-4 w-4" />
              {language === "en" ? "FAQ" : "अक्सर पूछे जाने वाले प्रश्न"}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="contact">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === "en" ? "Send Us a Message" : "हमें संदेश भेजें"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isSuccess ? (
                      <div className="py-8 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                          <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                          {language === "en" ? "Message Sent Successfully!" : "संदेश सफलतापूर्वक भेजा गया!"}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {language === "en"
                            ? "Thank you for reaching out. We'll get back to you shortly."
                            : "संपर्क करने के लिए धन्यवाद। हम जल्द ही आपसे संपर्क करेंगे।"}
                        </p>
                        <Button onClick={() => setIsSuccess(false)}>
                          {language === "en" ? "Send Another Message" : "एक और संदेश भेजें"}
                        </Button>
                      </div>
                    ) : (
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    {language === "en" ? "Name" : "नाम"}
                                  </FormLabel>
                                  <FormControl>
                                    <Input placeholder={language === "en" ? "Your name" : "आपका नाम"} {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    {language === "en" ? "Email" : "ईमेल"}
                                  </FormLabel>
                                  <FormControl>
                                    <Input placeholder={language === "en" ? "Your email" : "आपका ईमेल"} {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  {language === "en" ? "Subject" : "विषय"}
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder={language === "en" ? "Subject of your message" : "आपके संदेश का विषय"} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  {language === "en" ? "Message" : "संदेश"}
                                </FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder={language === "en" ? "Your message" : "आपका संदेश"} 
                                    className="h-40"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="flex justify-between items-center">
                            <FormDescription>
                              {language === "en"
                                ? "We'll respond within 24-48 hours."
                                : "हम 24-48 घंटों के भीतर जवाब देंगे।"}
                            </FormDescription>
                            <Button type="submit" disabled={isSubmitting}>
                              {isSubmitting ? (
                                language === "en" ? "Sending..." : "भेज रहा है..."
                              ) : (
                                language === "en" ? "Send Message" : "संदेश भेजें"
                              )}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>
                      {language === "en" ? "Contact Information" : "संपर्क जानकारी"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">
                          {language === "en" ? "Email" : "ईमेल"}
                        </p>
                        <a href="mailto:info@riseable.org" className="text-sm text-primary hover:underline">
                          info@riseable.org
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">
                          {language === "en" ? "Phone" : "फोन"}
                        </p>
                        <a href="tel:+918001234567" className="text-sm text-primary hover:underline">
                          +91 800 123 4567
                        </a>
                      </div>
                    </div>
