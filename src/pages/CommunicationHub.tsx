
import React, { useState } from "react";
import { useAccessibility } from "@/context/AccessibilityContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Volume2, Hand } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ChatAssistant from "@/components/communication/ChatAssistant";
import TextToSpeech from "@/components/communication/TextToSpeech";
import SignLanguage from "@/components/communication/SignLanguage";

const CommunicationHub: React.FC = () => {
  const { language } = useAccessibility();
  const [selectedTab, setSelectedTab] = useState("chat");

  const handleSwitchToSign = () => {
    setSelectedTab("sign");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary/80 to-blue-500 text-transparent bg-clip-text">
          {language === "en" ? "Communication Hub" : "संचार केंद्र"}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {language === "en"
            ? "Connect and communicate in the way that works best for you."
            : "उस तरीके से जुड़ें और संवाद करें जो आपके लिए सबसे अच्छा काम करता है।"}
        </p>
      </div>

      <Tabs 
        defaultValue="chat" 
        value={selectedTab} 
        onValueChange={setSelectedTab} 
        className="max-w-4xl mx-auto"
      >
        <TabsList className="grid grid-cols-3 mb-8 p-1 bg-muted/30 rounded-full">
          <TabsTrigger value="chat" className="rounded-full data-[state=active]:shadow-md">
            <MessageSquare className="mr-2 h-4 w-4" />
            {language === "en" ? "Chat" : "चैट"}
          </TabsTrigger>
          <TabsTrigger value="speech" className="rounded-full data-[state=active]:shadow-md">
            <Volume2 className="mr-2 h-4 w-4" />
            {language === "en" ? "Text to Speech" : "टेक्स्ट टू स्पीच"}
          </TabsTrigger>
          <TabsTrigger value="sign" className="rounded-full data-[state=active]:shadow-md">
            <Hand className="mr-2 h-4 w-4" />
            {language === "en" ? "Sign Language" : "सांकेतिक भाषा"}
          </TabsTrigger>
        </TabsList>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <TabsContent value="chat" className="space-y-6 mt-0">
              <Card className="shadow-lg border-2 border-muted/40 overflow-hidden">
                <div className="absolute top-0 right-0 h-32 w-32 -mt-8 -mr-8 bg-primary/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 h-32 w-32 -mb-8 -ml-8 bg-blue-500/10 rounded-full blur-2xl"></div>
                
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    {language === "en" ? "Chat Assistant" : "चैट सहायक"}
                  </CardTitle>
                  <CardDescription>
                    {language === "en"
                      ? "Chat with our accessibility assistant to get help or information."
                      : "सहायता या जानकारी प्राप्त करने के लिए हमारे एक्सेसिबिलिटी सहायक से चैट करें।"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChatAssistant onSwitchToSign={handleSwitchToSign} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="speech" className="space-y-6 mt-0">
              <Card className="shadow-lg border-2 border-muted/40 overflow-hidden">
                <div className="absolute top-0 right-0 h-32 w-32 -mt-8 -mr-8 bg-primary/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 h-32 w-32 -mb-8 -ml-8 bg-blue-500/10 rounded-full blur-2xl"></div>
                
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Volume2 className="h-5 w-5 text-primary" />
                    {language === "en" ? "Text to Speech" : "टेक्स्ट टू स्पीच"}
                  </CardTitle>
                  <CardDescription>
                    {language === "en"
                      ? "Convert text to spoken words using our text-to-speech engine."
                      : "हमारे टेक्स्ट-टू-स्पीच इंजन का उपयोग करके टेक्स्ट को बोले गए शब्दों में बदलें।"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TextToSpeech />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="sign" className="space-y-6 mt-0">
              <Card className="shadow-lg border-2 border-muted/40 overflow-hidden">
                <div className="absolute top-0 right-0 h-32 w-32 -mt-8 -mr-8 bg-primary/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 h-32 w-32 -mb-8 -ml-8 bg-blue-500/10 rounded-full blur-2xl"></div>
                
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Hand className="h-5 w-5 text-primary" />
                    {language === "en" ? "Sign Language Interpreter" : "सांकेतिक भाषा दुभाषिया"}
                  </CardTitle>
                  <CardDescription>
                    {language === "en"
                      ? "Communicate using sign language with our virtual interpreter."
                      : "हमारे वर्चुअल दुभाषिया के साथ सांकेतिक भाषा का उपयोग करके संवाद करें।"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SignLanguage />
                </CardContent>
              </Card>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  );
};

export default CommunicationHub;
