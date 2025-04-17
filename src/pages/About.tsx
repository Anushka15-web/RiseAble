
import React from "react";
import { useAccessibility } from "@/context/AccessibilityContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Heart, Users, Award, BookOpen, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const About: React.FC = () => {
  const { language } = useAccessibility();

  const team = [
    {
      name: "Priya Sharma",
      role: language === "en" ? "Founder & CEO" : "संस्थापक और सीईओ",
      image: "/lovable-uploads/19f436d8-dfdc-4e9e-a16c-54ee084b8b90.png",
      bio: language === "en"
        ? "Passionate about creating a more inclusive digital world for everyone."
        : "सभी के लिए एक अधिक समावेशी डिजिटल दुनिया बनाने के लिए जुनूनी।"
    },
    {
      name: "Rahul Patel",
      role: language === "en" ? "CTO" : "सीटीओ",
      image: "/lovable-uploads/19f436d8-dfdc-4e9e-a16c-54ee084b8b90.png",
      bio: language === "en"
        ? "Leading our technical innovations to break accessibility barriers."
        : "एक्सेसिबिलिटी बाधाओं को तोड़ने के लिए हमारे तकनीकी नवाचारों का नेतृत्व करना।"
    },
    {
      name: "Anjali Gupta",
      role: language === "en" ? "Head of Accessibility" : "एक्सेसिबिलिटी प्रमुख",
      image: "/lovable-uploads/19f436d8-dfdc-4e9e-a16c-54ee084b8b90.png",
      bio: language === "en"
        ? "Expert in accessibility standards and inclusive design principles."
        : "एक्सेसिबिलिटी मानकों और समावेशी डिज़ाइन सिद्धांतों में विशेषज्ञ।"
    },
    {
      name: "Arjun Singh",
      role: language === "en" ? "Community Manager" : "समुदाय प्रबंधक",
      image: "/lovable-uploads/19f436d8-dfdc-4e9e-a16c-54ee084b8b90.png",
      bio: language === "en"
        ? "Building bridges between communities and fostering inclusion."
        : "समुदायों के बीच पुल बनाना और समावेश को बढ़ावा देना।"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          {language === "en" ? "About RiseAble" : "RiseAble के बारे में"}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {language === "en"
            ? "Our mission, vision, and the story behind our commitment to accessibility."
            : "हमारा मिशन, विज़न और एक्सेसिबिलिटी के प्रति हमारी प्रतिबद्धता के पीछे की कहानी।"}
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Mission and Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-primary/10 rounded-full mr-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">
                  {language === "en" ? "Our Mission" : "हमारा मिशन"}
                </h2>
              </div>
              <p className="mb-4">
                {language === "en"
                  ? "To break digital accessibility and language barriers for individuals with various disabilities, empowering everyone to participate fully in the digital world."
                  : "विभिन्न विकलांगताओं वाले व्यक्तियों के लिए डिजिटल एक्सेसिबिलिटी और भाषा बाधाओं को तोड़ना, हर किसी को डिजिटल दुनिया में पूरी तरह से भाग लेने के लिए सशक्त बनाना।"}
              </p>
              <p>
                {language === "en"
                  ? "We believe that technology should serve everyone, regardless of their abilities or background."
                  : "हमारा मानना है कि तकनीक को सभी की सेवा करनी चाहिए, चाहे उनकी क्षमताएं या पृष्ठभूमि कुछ भी हो।"}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-primary/10 rounded-full mr-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">
                  {language === "en" ? "Our Vision" : "हमारा विज़न"}
                </h2>
              </div>
              <p className="mb-4">
                {language === "en"
                  ? "A world where digital experiences are inherently accessible to all, where language is not a barrier, and where people with disabilities have equal opportunities in education and employment."
                  : "एक ऐसी दुनिया जहां डिजिटल अनुभव स्वाभाविक रूप से सभी के लिए सुलभ हों, जहां भाषा एक बाधा न हो, और जहां विकलांग लोगों को शिक्षा और रोजगार में समान अवसर मिलें।"}
              </p>
              <p>
                {language === "en"
                  ? "We're working towards a future where inclusive design is the standard, not an afterthought."
                  : "हम एक ऐसे भविष्य की ओर काम कर रहे हैं जहां समावेशी डिज़ाइन मानक है, बाद का विचार नहीं।"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Our Story */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">
              {language === "en" ? "Our Story" : "हमारी कहानी"}
            </h2>
          </div>
          
          <div className="bg-muted p-8 rounded-xl">
            <div className="prose prose-lg max-w-none">
              <p>
                {language === "en"
                  ? "RiseAble was founded in 2022 by Priya Sharma, who experienced firsthand the challenges that people with disabilities face in the digital world. After watching her sister, who is visually impaired, struggle to use essential online services, Priya decided to create a solution."
                  : "RiseAble की स्थापना 2022 में प्रिया शर्मा द्वारा की गई थी, जिन्होंने डिजिटल दुनिया में विकलांग लोगों के सामने आने वाली चुनौतियों का सीधे अनुभव किया था। अपनी बहन को, जो दृष्टिबाधित है, आवश्यक ऑनलाइन सेवाओं का उपयोग करने के संघर्ष को देखने के बाद, प्रिया ने एक समाधान बनाने का फैसला किया।"}
              </p>
              <p>
                {language === "en"
                  ? "What began as a simple screen reader project quickly evolved into a comprehensive platform addressing multiple accessibility challenges. We assembled a team of technologists, accessibility experts, and advocates who shared our vision."
                  : "जो एक साधारण स्क्रीन रीडर प्रोजेक्ट के रूप में शुरू हुआ था, वह जल्दी ही कई एक्सेसिबिलिटी चुनौतियों को संबोधित करने वाले एक व्यापक प्लेटफॉर्म में विकसित हो गया। हमने प्रौद्योगिकीविदों, एक्सेसिबिलिटी विशेषज्ञों और वकीलों की एक टीम बनाई जो हमारे दृष्टिकोण को साझा करते थे।"}
              </p>
              <p>
                {language === "en"
                  ? "Today, RiseAble serves thousands of users across India and beyond, continuously innovating to create more inclusive digital experiences. We partner with organizations, governments, and educational institutions to drive accessibility forward."
                  : "आज, RiseAble भारत और उससे आगे हजारों उपयोगकर्ताओं की सेवा करता है, अधिक समावेशी डिजिटल अनुभव बनाने के लिए लगातार नवाचार करता है। हम एक्सेसिबिलिटी को आगे बढ़ाने के लिए संगठनों, सरकारों और शैक्षिक संस्थानों के साथ साझेदारी करते हैं।"}
              </p>
              <div className="flex justify-center mt-8">
                <Button asChild size="lg">
                  <Link to="/contact">
                    {language === "en" ? "Join Our Mission" : "हमारे मिशन से जुड़ें"}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">
              {language === "en" ? "Our Values" : "हमारे मूल्य"}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {language === "en" ? "Inclusion" : "समावेश"}
                </h3>
                <p className="text-sm">
                  {language === "en"
                    ? "We design for everyone, ensuring no one is left behind in the digital world."
                    : "हम सभी के लिए डिज़ाइन करते हैं, यह सुनिश्चित करते हैं कि डिजिटल दुनिया में कोई भी पीछे न छूटे।"}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {language === "en" ? "Excellence" : "उत्कृष्टता"}
                </h3>
                <p className="text-sm">
                  {language === "en"
                    ? "We maintain the highest standards in everything we create and deliver."
                    : "हम जो कुछ भी बनाते और वितरित करते हैं, उसमें उच्चतम मानकों को बनाए रखते हैं।"}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {language === "en" ? "Education" : "शिक्षा"}
                </h3>
                <p className="text-sm">
                  {language === "en"
                    ? "We believe in empowering through knowledge and continuous learning."
                    : "हम ज्ञान और निरंतर सीखने के माध्यम से सशक्तिकरण में विश्वास करते हैं।"}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {language === "en" ? "Opportunity" : "अवसर"}
                </h3>
                <p className="text-sm">
                  {language === "en"
                    ? "We create pathways for everyone to succeed, regardless of ability."
                    : "हम सभी के लिए सफल होने के मार्ग बनाते हैं, क्षमता की परवाह किए बिना।"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Our Team */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">
              {language === "en" ? "Our Team" : "हमारी टीम"}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 rounded-full overflow-hidden w-32 h-32 mx-auto">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
                <p className="text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">
              {language === "en" ? "Our Certifications" : "हमारे प्रमाणपत्र"}
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-card p-4 rounded-lg flex flex-col items-center text-center">
              <div className="mb-2 text-3xl">🏆</div>
              <p className="font-medium">WCAG 2.2 AA</p>
              <p className="text-xs text-muted-foreground">Certified</p>
            </div>
            <div className="bg-card p-4 rounded-lg flex flex-col items-center text-center">
              <div className="mb-2 text-3xl">🌐</div>
              <p className="font-medium">ISO 9001:2015</p>
              <p className="text-xs text-muted-foreground">Quality Management</p>
            </div>
            <div className="bg-card p-4 rounded-lg flex flex-col items-center text-center">
              <div className="mb-2 text-3xl">🛡️</div>
              <p className="font-medium">ISO 27001</p>
              <p className="text-xs text-muted-foreground">Information Security</p>
            </div>
            <div className="bg-card p-4 rounded-lg flex flex-col items-center text-center">
              <div className="mb-2 text-3xl">⭐</div>
              <p className="font-medium">
                {language === "en" ? "Inclusive Employer" : "समावेशी नियोक्ता"}
              </p>
              <p className="text-xs text-muted-foreground">
                {language === "en" ? "Gold Status" : "गोल्ड स्टेटस"}
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary text-primary-foreground rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            {language === "en" ? "Join Our Mission" : "हमारे मिशन से जुड़ें"}
          </h2>
          <p className="mb-6 max-w-2xl mx-auto">
            {language === "en"
              ? "Together, we can create a more accessible and inclusive digital world for everyone."
              : "साथ मिलकर, हम सभी के लिए एक अधिक सुलभ और समावेशी डिजिटल दुनिया बना सकते हैं।"}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" asChild>
              <Link to="/contact">
                {language === "en" ? "Contact Us" : "संपर्क करें"}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/courses">
                {language === "en" ? "Take a Course" : "एक कोर्स लें"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
