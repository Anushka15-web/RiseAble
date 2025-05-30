
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
      name: "Aditya Arora",
      role: language === "en" ? "NGO Founder" : "संस्थापक और सीईओ",
      image: "https://assets.weforum.org/article/image/responsive_large_8SHLF6t5YaHJhGwOskAAzFQonGQsEFJZQvtbB_gJY1A.JPG",
      bio: language === "en"
        ? "Passionate about creating a more inclusive digital world for everyone."
        : "सभी के लिए एक अधिक समावेशी डिजिटल दुनिया बनाने के लिए जुनूनी।"
    },
    {
      name: "Raghav Patel",
      role: language === "en" ? "CTO" : "सीटीओ",
      image: "https://wecapable.com/wp-content/uploads/2018/06/javed-abidi-famous-disabled-people-india.jpg",
      bio: language === "en"
        ? "Leading our technical innovations to break accessibility barriers."
        : "एक्सेसिबिलिटी बाधाओं को तोड़ने के लिए हमारे तकनीकी नवाचारों का नेतृत्व करना।"
    },
    {
      name: "Rishita Gupta",
      role: language === "en" ? "Head of Accessibility" : "एक्सेसिबिलिटी प्रमुख",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgTrBEdvDp6Co7z8DfK1yrGXlrzgUK90rdBQ&s",
      bio: language === "en"
        ? "Expert in accessibility standards and inclusive design principles."
        : "एक्सेसिबिलिटी मानकों और समावेशी डिज़ाइन सिद्धांतों में विशेषज्ञ।"
    },
    {
      name: "Seema Nagpal",
      role: language === "en" ? "Community Manager" : "समुदाय प्रबंधक",
      image: "https://hands.org.pk/wp-content/uploads/2023/12/provide-assistance-to-person-with-disabilities-1.jpg",
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
                  ? "RiseAble is a compassionate group project developed by Anushka, Vidhi, Bhumika, and Charu, dedicated to empowering physically disabled individuals. The project focuses on creating accessible solutions that promote independence, mobility, and dignity. By combining innovation with empathy, RiseAble aims to bridge the gap between disability and opportunity. "
                  : "*राइज़एबल (RiseAble)* एक संवेदनशील समूह परियोजना है, जिसे अनुष्का, विधि, भूमिका और चारु द्वारा विकसित किया गया है। इस परियोजना का उद्देश्य शारीरिक रूप से विकलांग लोगों को सशक्त बनाना और उन्हें आत्मनिर्भर बनाना है।"}
              </p>
              <p>
                {language === "en"
                  ? "Whether through assistive technology, awareness campaigns, or community-driven support systems, the team envisions a society where everyone has equal access to resources and opportunities."
                  : " राइज़एबल ऐसे समाधान प्रदान करता है जो उनकी दैनिक ज़रूरतों को आसान बना सकें और समाज में उनकी भागीदारी को बढ़ावा दें। "}
              </p>
              <p>
                {language === "en"
                  ? "RiseAble is not just a project—it’s a step towards a more inclusive and understanding world, where physical limitations do not define one’s potential."
                  : " यह परियोजना सहायक तकनीक, जागरूकता अभियानों और सामुदायिक सहयोग के माध्यम से एक समावेशी समाज की दिशा में कार्य करती है, जहाँ शारीरिक अक्षमता किसी की क्षमता की सीमा नहीं बनती ।"}
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
