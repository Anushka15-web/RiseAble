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

                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">
                          {language === "en" ? "Address" : "पता"}
                        </p>
                        <p className="text-sm">
                          {language === "en"
                            ? "123 Accessibility Road, Bangalore, India 560001"
                            : "123 एक्सेसिबिलिटी रोड, बैंगलोर, भारत 560001"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === "en" ? "Support Hours" : "सहायता घंटे"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>{language === "en" ? "Monday - Friday" : "सोमवार - शुक्रवार"}</span>
                        <span>9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{language === "en" ? "Saturday" : "शनिवार"}</span>
                        <span>10:00 AM - 2:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{language === "en" ? "Sunday" : "रविवार"}</span>
                        <span>{language === "en" ? "Closed" : "बंद"}</span>
                      </div>
                      <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
                        <p>
                          {language === "en"
                            ? "All times are Indian Standard Time (IST)."
                            : "सभी समय भारतीय मानक समय (IST) हैं।"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="accessibility">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "en" ? "Accessible Support Options" : "सुलभ सहायता विकल्प"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">
                      {language === "en" ? "Sign Language Support" : "सांकेतिक भाषा सहायता"}
                    </h3>
                    <div className="bg-muted rounded-lg p-4 mb-4">
                      <p className="mb-4">
                        {language === "en"
                          ? "Get support in sign language through our video call service."
                          : "हमारी वीडियो कॉल सेवा के माध्यम से सांकेतिक भाषा में सहायता प्राप्त करें।"}
                      </p>
                      <Button>
                        {language === "en" ? "Schedule Sign Language Call" : "सांकेतिक भाषा कॉल शेड्यूल करें"}
                      </Button>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-4">
                      {language === "en" ? "Voice Support" : "वॉयस सपोर्ट"}
                    </h3>
                    <div className="bg-muted rounded-lg p-4">
                      <p className="mb-4">
                        {language === "en"
                          ? "Use our voice-activated support system for hands-free assistance."
                          : "हैंड्स-फ्री सहायता के लिए हमारी वॉयस-एक्टिवेटेड सपोर्ट सिस्टम का उपयोग करें।"}
                      </p>
                      <Button>
                        <Volume2 className="mr-2 h-4 w-4" />
                        {language === "en" ? "Start Voice Support" : "वॉयस सपोर्ट शुरू करें"}
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-4">
                      {language === "en" ? "Text-to-Speech Support" : "टेक्स्ट-टू-स्पीच सपोर्ट"}
                    </h3>
                    <div className="bg-muted rounded-lg p-4 mb-4">
                      <p className="mb-4">
                        {language === "en"
                          ? "Have your messages read aloud to you with our text-to-speech technology."
                          : "हमारी टेक्स्ट-टू-स्पीच तकनीक के साथ अपने संदेशों को आपके लिए जोर से पढ़वाएं।"}
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          {language === "en" ? "Enable Text-to-Speech" : "टेक्स्ट-टू-स्पीच सक्षम करें"}
                        </Button>
                        <Button variant="outline" className="flex-1">
                          {language === "en" ? "Adjust Settings" : "सेटिंग्स समायोजित करें"}
                        </Button>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-4">
                      {language === "en" ? "Simplified Interface" : "सरलीकृत इंटरफेस"}
                    </h3>
                    <div className="bg-muted rounded-lg p-4">
                      <p className="mb-4">
                        {language === "en"
                          ? "Switch to our simplified interface for easier navigation and interaction."
                          : "आसान नेविगेशन और इंटरैक्शन के लिए हमारे सरलीकृत इंटरफेस पर स्विच करें।"}
                      </p>
                      <Button variant="outline">
                        {language === "en" ? "Use Simplified Interface" : "सरलीकृत इंटरफेस का उपयोग करें"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "en" ? "Frequently Asked Questions" : "अक्सर पूछे जाने वाले प्रश्न"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-medium mb-2">
                      {language === "en"
                        ? "How do I enable accessibility features on RiseAble?"
                        : "मैं RiseAble पर एक्सेसिबिलिटी फीचर्स कैसे सक्षम करूं?"}
                    </h3>
                    <p className="text-muted-foreground">
                      {language === "en"
                        ? "You can access all accessibility features through the Accessibility Widget located in the bottom right corner of any page. Click on it to customize your experience."
                        : "आप किसी भी पेज के निचले दाएं कोने में स्थित एक्सेसिबिलिटी विजेट के माध्यम से सभी एक्सेसिबिलिटी फीचर्स तक पहुंच सकते हैं। अपने अनुभव को अनुकूलित करने के लिए उस पर क्लिक करें।"}
                    </p>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-medium mb-2">
                      {language === "en"
                        ? "Is RiseAble available in languages other than English and Hindi?"
                        : "क्या RiseAble अंग्रेजी और हिंदी के अलावा अन्य भाषाओं में उपलब्ध है?"}
                    </h3>
                    <p className="text-muted-foreground">
                      {language === "en"
                        ? "Currently, we fully support English and Hindi. We're working on adding more Indian languages soon. You can request additional languages through our contact form."
                        : "वर्तमान में, हम पूरी तरह से अंग्रेजी और हिंदी का समर्थन करते हैं। हम जल्द ही अधिक भारतीय भाषाओं को जोड़ने पर काम कर रहे हैं। आप हमारे संपर्क फॉर्म के माध्यम से अतिरिक्त भाषाओं का अनुरोध कर सकते हैं।"}
                    </p>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-medium mb-2">
                      {language === "en"
                        ? "How accurate is the sign language interpreter?"
                        : "सांकेतिक भाषा दुभाषिया कितना सटीक है?"}
                    </h3>
                    <p className="text-muted-foreground">
                      {language === "en"
                        ? "Our sign language interpreter has an accuracy rate of approximately 90% for common phrases and conversations. We continuously improve its accuracy through machine learning and user feedback."
                        : "हमारे सांकेतिक भाषा दुभाषिया की सामान्य वाक्यांशों और वार्तालापों के लिए लगभग 90% की सटीकता दर है। हम मशीन लर्निंग और उपयोगकर्ता फीडबैक के माध्यम से इसकी सटीकता में लगातार सुधार करते हैं।"}
                    </p>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-medium mb-2">
                      {language === "en"
                        ? "Are all the job listings accessible to people with disabilities?"
                        : "क्या सभी जॉब लिस्टिंग विकलांग लोगों के लिए सुलभ हैं?"}
                    </h3>
                    <p className="text-muted-foreground">
                      {language === "en"
                        ? "Yes, all job listings on RiseAble are from companies committed to accessible workplaces. We verify each listing and work with employers to ensure accommodations are available."
                        : "हां, RiseAble पर सभी जॉब लिस्टिंग सुलभ कार्यस्थलों के लिए प्रतिबद्ध कंपनियों से हैं। हम प्रत्येक लिस्टिंग को सत्यापित करते हैं और यह सुनिश्चित करने के लिए नियोक्ताओं के साथ काम करते हैं कि सुविधाएं उपलब्ध हैं।"}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      {language === "en"
                        ? "How can I contribute to RiseAble's mission?"
                        : "मैं RiseAble के मिशन में कैसे योगदान दे सकता हूं?"}
                    </h3>
                    <p className="text-muted-foreground">
                      {language === "en"
                        ? "You can contribute by sharing our platform, providing feedback, volunteering as a translator or accessibility tester, or partnering with us as an organization. Contact us for more details on how to get involved."
                        : "आप हमारे प्लेटफॉर्म को साझा करके, प्रतिक्रिया प्रदान करके, अनुवादक या एक्सेसिबिलिटी टेस्टर के रूप में स्वयंसेवा करके, या एक संगठन के रूप में हमारे साथ भागीदारी करके योगदान दे सकते हैं। शामिल होने के तरीके पर अधिक जानकारी के लिए हमसे संपर्क करें।"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Contact;
