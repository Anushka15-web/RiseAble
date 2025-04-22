
import React from "react";
import { useAccessibility } from "@/context/AccessibilityContext";
import { Eye, Volume2, Globe, Users, BookOpen, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const FeatureCard: React.FC<{ 
  icon: React.ReactNode, 
  title: string, 
  description: string,
  link: string 
}> = ({ icon, title, description, link }) => (
  <Link to={link} className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
    <div className="mb-4 text-primary">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </Link>
);

const FeaturesSection: React.FC = () => {
  const { language } = useAccessibility();
  
  const features = [
    {
      icon: <Eye className="h-8 w-8" />,
      title: language === "en" ? "Accessibility Tools" : "एक्सेसिबिलिटी टूल्स",
      description: language === "en" 
        ? "Screen readers, high contrast modes, and more for all users."
        : "सभी उपयोगकर्ताओं के लिए स्क्रीन रीडर, हाई कंट्रास्ट मोड, और अधिक।",
      link: "/accessibility-tools"
    },
    {
      icon: <Volume2 className="h-8 w-8" />,
      title: language === "en" ? "Communication Hub" : "संचार केंद्र",
      description: language === "en"
        ? "Sign language interpretation and multi-modal communication."
        : "सांकेतिक भाषा व्याख्या और बहु-मोडल संचार।",
      link: "/communication-hub"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: language === "en" ? "Language Support" : "भाषा समर्थन",
      description: language === "en"
        ? "Translate between Hindi and English with text and voice options."
        : "टेक्स्ट और वॉइस विकल्पों के साथ हिंदी और अंग्रेजी के बीच अनुवाद करें।",
      link: "/language-support"
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: language === "en" ? "Inclusive Jobs" : "समावेशी नौकरियां",
      description: language === "en"
        ? "Find opportunities at companies committed to accessibility."
        : "पहुंच के प्रति प्रतिबद्ध कंपनियों में अवसर खोजें।",
      link: "/jobs"
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: language === "en" ? "Skill Building" : "कौशल निर्माण",
      description: language === "en"
        ? "Accessible courses to develop your skills and advance your career."
        : "अपने कौशल विकसित करने और अपने करियर को आगे बढ़ाने के लिए सुलभ पाठ्यक्रम।",
      link: "/courses"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: language === "en" ? "Community" : "समुदाय",
      description: language === "en"
        ? "Connect with others and share experiences in our inclusive community."
        : "हमारे समावेशी समुदाय में दूसरों से जुड़ें और अनुभव साझा करें।",
      link: "/about"
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === "en" ? "Empowering Features" : "सशक्तिकरण सुविधाएँ"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === "en"
              ? "Explore our suite of tools designed to make digital experiences accessible to everyone."
              : "हमारे उपकरणों का पता लगाएं जो डिजिटल अनुभवों को सभी के लिए सुलभ बनाने के लिए डिज़ाइन किए गए हैं।"}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              link={feature.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
