import React, { useState } from "react";
import { useAccessibility } from "@/context/AccessibilityContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Building2, MapPin, Search, Briefcase, Filter, Clock, Hand } from "lucide-react";
import JobApplyButton from "@/components/jobs/JobApplyButton";
import ApplicationDialog from "@/components/ui/application-dialog";
import SignLanguage from "@/components/communication/SignLanguage";

const JobListings: React.FC = () => {
  const { language } = useAccessibility();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentJobForSignLanguage, setCurrentJobForSignLanguage] = useState<{ title: string; company: string } | null>(null);

  // Sample job data
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechInnovate",
      location: "Remote",
      category: "Tech",
      type: "Full-time",
      posted: "2 days ago",
      description: language === "en" 
        ? "We're looking for a frontend developer with experience in React and TypeScript to join our team."
        : "हम अपनी टीम में शामिल होने के लिए React और TypeScript में अनुभव के साथ एक फ्रंटएंड डेवलपर की तलाश कर रहे हैं।",
    },
    {
      id: 2,
      title: "UX Designer",
      company: "DesignHub",
      location: "New York",
      category: "Design",
      type: "Contract",
      posted: "1 week ago",
      description: language === "en"
        ? "Join our design team to create beautiful and accessible user experiences."
        : "सुंदर और सुलभ उपयोगकर्ता अनुभव बनाने के लिए हमारी डिजाइन टीम में शामिल हों।",
    },
    {
      id: 3,
      title: "Accessibility Specialist",
      company: "RiseAble",
      location: "San Francisco",
      category: "Accessibility",
      type: "Full-time",
      posted: "3 days ago",
      description: language === "en"
        ? "Help us make the web more accessible for everyone by joining our team of specialists."
        : "हमारे विशेषज्ञों की टीम में शामिल होकर वेब को सभी के लिए अधिक सुलभ बनाने में हमारी मदद करें।",
    },
    {
      id: 4,
      title: "Content Writer",
      company: "ContentFirst",
      location: "Remote",
      category: "Content",
      type: "Part-time",
      posted: "5 days ago",
      description: language === "en"
        ? "We need creative writers who can produce engaging content about accessibility and inclusion."
        : "हमें रचनात्मक लेखकों की आवश्यकता है जो पहुंच और समावेश के बारे में आकर्षक सामग्री का निर्माण कर सकते हैं।",
    },
  ];
 return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          {language === "en" ? "Job Listings" : "नौकरी सूची"}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {language === "en"
            ? "Find inclusive employment opportunities that value your unique skills and perspectives."
            : "ऐसे समावेशी रोजगार के अवसर खोजें जो आपके अनूठे कौशल और दृष्टिकोण को महत्व देते हैं।"}
        </p>
      </div>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              className="pl-10"
              placeholder={language === "en" ? "Search for jobs or companies..." : "नौकरियों या कंपनियों के लिए खोजें..."}
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
            <div>
              <h3 className="font-medium mb-2">{language === "en" ? "Category" : "श्रेणी"}</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`category-${category}`} 
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => handleCategoryChange(category)}
                    />
                    <Label htmlFor={`category-${category}`}>{category}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">{language === "en" ? "Location" : "स्थान"}</h3>
              <div className="space-y-2">
                {locations.map((location) => (
                  <div key={location} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`location-${location}`} 
                      checked={selectedLocations.includes(location)}
                      onCheckedChange={() => handleLocationChange(location)}
                    />
                    <Label htmlFor={`location-${location}`}>{location}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">{language === "en" ? "Job Type" : "नौकरी का प्रकार"}</h3>
              <div className="space-y-2">
                {jobTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox id={`type-${type}`} />
                    <Label htmlFor={`type-${type}`}>{type}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {language === "en" 
              ? `Showing ${filteredJobs.length} jobs` 
              : `${filteredJobs.length} नौकरियां दिखा रहा है`}
          </p>
          
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">
                {language === "en" ? "All Jobs" : "सभी नौकरियां"}
              </TabsTrigger>
              <TabsTrigger value="saved">
                {language === "en" ? "Saved Jobs" : "सहेजी गई नौकरियां"}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="space-y-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-1">{job.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      {job.company}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {job.posted}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3" />
                    {job.type}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {job.location}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{job.description}</p>
              </CardContent>
              <CardFooter>
                <JobApplyButton 
                  jobTitle={job.title} 
                  company={job.company} 
                  onViewInSignMode={() => openSignLanguageMode(job.title, job.company)}
                />
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <h3 className="font-medium text-lg mb-2">
              {language === "en" ? "No jobs found" : "कोई नौकरी नहीं मिली"}
            </h3>
            <p className="text-muted-foreground">
              {language === "en" 
                ? "Try adjusting your search or filters." 
                : "अपनी खोज या फ़िल्टर समायोजित करने का प्रयास करें।"}
            </p>
          </div>
        )}
      </div>

      {/* Sign Language Dialog */}
      {currentJobForSignLanguage && (
        <ApplicationDialog
          title={language === "en" 
            ? `${currentJobForSignLanguage.title} in Sign Language` 
            : `सांकेतिक भाषा में ${currentJobForSignLanguage.title}`}
          description={language === "en" 
            ? `View information about this job at ${currentJobForSignLanguage.company} in sign language` 
            : `सांकेतिक भाषा में ${currentJobForSignLanguage.company} में इस नौकरी के बारे में जानकारी देखें`}
          open={!!currentJobForSignLanguage}
          onOpenChange={(open) => {
            if (!open) setCurrentJobForSignLanguage(null);
          }}
        >
          <div className="py-4">
            <SignLanguage />
          </div>
        </ApplicationDialog>
      )}
    </div>
  );
};

export default JobListings;
