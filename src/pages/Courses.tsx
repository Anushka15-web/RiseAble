import React, { useState } from "react";
import { useAccessibility } from "@/context/AccessibilityContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, Filter, Search, GraduationCap, UserCircle2, Star } from "lucide-react";
import CourseEnrollButton from "@/components/courses/CourseEnrollButton";

const Courses: React.FC = () => {
  const { language } = useAccessibility();
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  const courses = [
    {
      id: "ACC101",
      title: language === "en" ? "Introduction to Accessibility" : "एक्सेसिबिलिटी का परिचय",
      instructor: "Dr. Renu Mahindra",
      duration: "8 weeks",
      level: language === "en" ? "Beginner" : "शुरुआती",
      rating: 4.8,
      students: 1245,
      price: "₹199",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDBQcJe92ceZww1A-KEKiiSDSPJuuhNsOUFA&s",
      description: language === "en" 
        ? "Learn the fundamentals of accessibility principles and practices."
        : "एक्सेसिबिलिटी के सिद्धांतों और प्रथाओं के मूल तत्वों को सीखें।",
    },
    {
      id: "ACC201",
      title: language === "en" ? "Web Content Accessibility Guidelines" : "वेब कंटेंट एक्सेसिबिलिटी गाइडलाइन्स",
      instructor: "Dr. Anurag Singh Chauhan",
      duration: "10 weeks",
      level: language === "en" ? "Intermediate" : "मध्यवर्ती",
      rating: 4.7,
      students: 892,
      price: "₹99",
      image: "https://media.licdn.com/dms/image/D4D12AQFlIKTnve2oGA/article-cover_image-shrink_720_1280/0/1697141068159?e=2147483647&v=beta&t=i8DKoa8fyOLh4eoQ0P6q-3sTDUz0OkFRxH6JAY0Wb6w",
      description: language === "en"
        ? "Master the WCAG 2.1 standards and learn how to implement them in your projects."
        : "WCAG 2.1 मानकों को मास्टर करें और सीखें कि उन्हें अपने प्रोजेक्ट्स में कैसे लागू करें।",
    },
    {
      id: "ACC301",
      title: language === "en" ? "Assistive Technologies" : "सहायक तकनीकें",
      instructor: "Suman Jaiswal",
      duration: "6 weeks",
      level: language === "en" ? "Advanced" : "उन्नत",
      rating: 4.9,
      students: 567,
      price: "₹149",
      image: "https://franciscanchildrens.org/wp-content/uploads/2022/02/DB6A9178-scaled.jpg",
      description: language === "en"
        ? "Explore various assistive technologies and how to design with them in mind."
        : "विभिन्न सहायक तकनीकों का अन्वेषण करें और उन्हें ध्यान में रखकर डिजाइन कैसे करें।",
    },
    {
      id: "ACC401",
      title: language === "en" ? "Inclusive Design Principles" : "समावेशी डिज़ाइन सिद्धांत",
      instructor: "Rajan Kaushal",
      duration: "12 weeks",
      level: language === "en" ? "Intermediate" : "मध्यवर्ती",
      rating: 4.6,
      students: 721,
      price: "FREE",
      image: "https://www.datocms-assets.com/38511/1657052917-2-designing-for-diversity.png?auto=format",
      description: language === "en"
        ? "Learn how to create designs that are inclusive for all users, regardless of abilities."
        : "सीखें कि कैसे ऐसे डिज़ाइन बनाएं जो सभी उपयोगकर्ताओं के लिए समावेशी हों, क्षमताओं के बावजूद।",
    },
  ];

  const categories = ["Web Accessibility", "Mobile Accessibility", "Document Accessibility", "Design"];
  const levels = ["Beginner", "Intermediate", "Advanced"];
  
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          {language === "en" ? "Accessibility Courses" : "एक्सेसिबिलिटी पाठ्यक्रम"}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {language === "en"
            ? "Expand your knowledge and skills in accessibility with our expert-led courses."
            : "हमारे विशेषज्ञ-नेतृत्व वाले पाठ्यक्रमों के साथ एक्सेसिबिलिटी में अपने ज्ञान और कौशल का विस्तार करें।"}
        </p>
      </div>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              className="pl-10"
              placeholder={language === "en" ? "Search for courses..." : "पाठ्यक्रमों के लिए खोजें..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            className="md:w-auto flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            {language === "en" ? "Filters" : "फ़िल्टर"}
          </Button>
        </div>
        
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 border rounded-lg bg-muted/10 mb-6">
            
          </div>
        )}
        
        <Tabs defaultValue="all" className="mb-4">
          <TabsList>
            <TabsTrigger value="all">
              {language === "en" ? "All Courses" : "सभी पाठ्यक्रम"}
            </TabsTrigger>
            <TabsTrigger value="enrolled">
              {language === "en" ? "My Courses" : "मेरे पाठ्यक्रम"}
            </TabsTrigger>
            <TabsTrigger value="saved">
              {language === "en" ? "Saved" : "सहेजे गए"}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden flex flex-col">
              <div className="relative h-48 bg-muted">
                <div 
                  className="absolute inset-0 bg-center bg-cover"
                  style={{ backgroundImage: `url(${course.image})` }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <Badge className="absolute top-2 right-2">
                  {course.level}
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <UserCircle2 className="h-4 w-4" />
                  {course.instructor}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4 line-clamp-2">{course.description}</p>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    {course.rating} ({course.students})
                  </span>
                </div>
              </CardContent>
              
              <CardFooter className="border-t pt-4 flex justify-between items-center">
                <p className="font-bold">{course.price}</p>
                <CourseEnrollButton 
                  courseTitle={course.title}
                  courseId={course.id}
                  price={course.price}
                />
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-medium text-lg mb-2">
              {language === "en" ? "No courses found" : "कोई पाठ्यक्रम नहीं मिला"}
            </h3>
            <p className="text-muted-foreground">
              {language === "en" 
                ? "Try adjusting your search criteria." 
                : "अपने खोज मानदंडों को समायोजित करने का प्रयास करें।"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
