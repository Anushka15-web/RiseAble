import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAccessibility } from "@/context/AccessibilityContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Mail, Key, User, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const Login: React.FC = () => {
  const { language } = useAccessibility();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate login process
    toast({
      title: language === "en" ? "Login Successful" : "लॉगिन सफल",
      description: language === "en" 
        ? "Welcome back to RiseAble!" 
        : "RiseAble में आपका स्वागत है!",
      variant: "default",
    });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate signup process
    toast({
      title: language === "en" ? "Account Created" : "खाता बनाया गया",
      description: language === "en" 
        ? "Welcome to RiseAble! Your account has been created." 
        : "RiseAble में आपका स्वागत है! आपका खाता बना दिया गया है।",
      variant: "default",
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="login">
              {language === "en" ? "Login" : "लॉगिन"}
            </TabsTrigger>
            <TabsTrigger value="signup">
              {language === "en" ? "Sign Up" : "साइन अप"}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>{language === "en" ? "Welcome Back" : "वापसी पर स्वागत है"}</CardTitle>
                <CardDescription>
                  {language === "en" 
                    ? "Sign in to your account to access all features" 
                    : "सभी सुविधाओं का उपयोग करने के लिए अपने खाते में साइन इन करें"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {language === "en" ? "Email" : "ईमेल"}
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder={language === "en" ? "Enter your email" : "अपना ईमेल दर्ज करें"} 
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>{language === "en" ? "Create Account" : "खाता बनाएं"}</CardTitle>
                <CardDescription>
                  {language === "en" 
                    ? "Sign up to join our inclusive community" 
                    : "हमारे समावेशी समुदाय में शामिल होने के लिए साइन अप करें"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullname">
                      {language === "en" ? "Full Name" : "पूरा नाम"}
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="fullname" 
                        type="text" 
                        placeholder={language === "en" ? "Enter your full name" : "अपना पूरा नाम दर्ज करें"} 
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">
                      {language === "en" ? "Email" : "ईमेल"}
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="signup-email" 
                        type="email" 
                        placeholder={language === "en" ? "Enter your email" : "अपना ईमेल दर्ज करें"} 
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">
                      {language === "en" ? "Password" : "पासवर्ड"}
                    </Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="signup-password" 
                        type={showPassword ? "text" : "password"} 
                        placeholder={language === "en" ? "Create a password" : "एक पासवर्ड बनाएं"} 
                        className="pl-10 pr-10"
                        required
                      />
                      <Button 
                        type="button"
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-1 top-1 h-8 w-8"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <label
                      htmlFor="terms"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {language === "en" 
                        ? "I agree to the Terms and Privacy Policy" 
                        : "मैं नियमों और गोपनीयता नीति से सहमत हूं"}
                    </label>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    {language === "en" ? "Create Account" : "खाता बनाएं"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
              <CardFooter>
                <div className="text-center w-full text-sm text-muted-foreground">
                  {language === "en" 
                    ? "Already have an account?" 
                    : "पहले से खाता है?"} 
                  <button 
                    type="button" 
                    className="text-primary font-medium hover:underline focus:outline-none ml-1"
                    onClick={() => document.querySelector('[data-value="login"]')?.dispatchEvent(new MouseEvent('click'))}
                  >
                    {language === "en" ? "Sign in" : "साइन इन करें"}
                  </button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {language === "en" 
              ? "Need assistance? " 
              : "सहायता चाहिए? "}
            <Link to="/contact" className="text-primary hover:underline">
              {language === "en" ? "Contact support" : "समर्थन से संपर्क करें"}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
