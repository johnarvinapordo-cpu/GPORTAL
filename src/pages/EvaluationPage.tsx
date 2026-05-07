import { useState } from "react";
import { useLocation } from "react-router";
import DashboardLayout from "../components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Star, Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function EvaluationPage() {
  const location = useLocation();
  const userRole = location.pathname.includes("/student") ? "student" : 
                   location.pathname.includes("/teacher") ? "teacher" : "admin";
  const userName = userRole === "student" ? "Juan Dela Cruz" : 
                   userRole === "teacher" ? "Prof. Maria Santos" : "Admin User";

  const [selectedCourse, setSelectedCourse] = useState("");
  const [ratings, setRatings] = useState({
    teachingEffectiveness: "",
    courseOrganization: "",
    communication: "",
    knowledgeability: "",
    availability: "",
    overallRating: "",
  });
  const [comments, setComments] = useState("");

  const coursesToEvaluate = [
    { code: "CS101", name: "Introduction to Programming", instructor: "Prof. Maria Santos", status: "Pending" },
    { code: "MATH201", name: "Calculus I", instructor: "Prof. Jose Garcia", status: "Pending" },
    { code: "ENG102", name: "English Composition", instructor: "Prof. Ana Reyes", status: "Completed" },
    { code: "PE101", name: "Physical Education", instructor: "Coach Roberto Cruz", status: "Pending" },
  ];

  const evaluationQuestions = [
    {
      id: "teachingEffectiveness",
      question: "How would you rate the instructor's teaching effectiveness?",
      category: "Teaching Effectiveness",
    },
    {
      id: "courseOrganization",
      question: "How well organized was the course content and materials?",
      category: "Course Organization",
    },
    {
      id: "communication",
      question: "How clear and effective was the instructor's communication?",
      category: "Communication",
    },
    {
      id: "knowledgeability",
      question: "How knowledgeable was the instructor about the subject matter?",
      category: "Subject Knowledge",
    },
    {
      id: "availability",
      question: "How available was the instructor for student questions and support?",
      category: "Availability",
    },
    {
      id: "overallRating",
      question: "What is your overall rating of this instructor and course?",
      category: "Overall Rating",
    },
  ];

  const ratingOptions = [
    { value: "5", label: "Excellent" },
    { value: "4", label: "Very Good" },
    { value: "3", label: "Good" },
    { value: "2", label: "Fair" },
    { value: "1", label: "Poor" },
  ];

  const handleRatingChange = (questionId: string, value: string) => {
    setRatings({ ...ratings, [questionId]: value });
  };

  const handleSubmitEvaluation = () => {
    if (!selectedCourse) {
      toast.error("Please select a course to evaluate");
      return;
    }

    const allRated = Object.values(ratings).every(rating => rating !== "");
    if (!allRated) {
      toast.error("Please answer all evaluation questions");
      return;
    }

    toast.success("Evaluation submitted successfully! Thank you for your feedback.");
    
    // Reset form
    setSelectedCourse("");
    setRatings({
      teachingEffectiveness: "",
      courseOrganization: "",
      communication: "",
      knowledgeability: "",
      availability: "",
      overallRating: "",
    });
    setComments("");
  };

  const renderStars = (rating: string) => {
    const count = parseInt(rating) || 0;
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${star <= count ? "fill-accent text-accent" : "text-gray-300"}`}
          />
        ))}
      </div>
    );
  };

  return (
    <DashboardLayout userRole={userRole} userName={userName}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Teacher Evaluation</h1>
          <p className="text-muted-foreground">
            Your feedback helps improve the quality of education at CMDI
          </p>
        </div>

        {/* Courses to Evaluate */}
        <Card>
          <CardHeader>
            <CardTitle>Select Course to Evaluate</CardTitle>
            <CardDescription>Choose from your enrolled courses this semester</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {coursesToEvaluate.map((course) => (
                <div
                  key={course.code}
                  onClick={() => course.status === "Pending" && setSelectedCourse(course.code)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedCourse === course.code
                      ? "border-primary bg-primary/5"
                      : course.status === "Completed"
                      ? "border-green-200 bg-green-50 cursor-not-allowed opacity-60"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{course.code}</h4>
                      <p className="text-sm text-muted-foreground">{course.name}</p>
                    </div>
                    <Badge
                      variant={course.status === "Completed" ? "secondary" : "outline"}
                      className={
                        course.status === "Completed"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : "bg-accent/10 text-accent border-accent"
                      }
                    >
                      {course.status === "Completed" ? (
                        <span className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Completed
                        </span>
                      ) : (
                        "Pending"
                      )}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium">{course.instructor}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {selectedCourse && (
          <>
            {/* Evaluation Form */}
            <Card>
              <CardHeader>
                <CardTitle>Evaluation Form</CardTitle>
                <CardDescription>
                  Rate your experience with {coursesToEvaluate.find(c => c.code === selectedCourse)?.instructor}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {evaluationQuestions.map((question) => (
                    <div key={question.id} className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label className="text-base">{question.question}</Label>
                          {ratings[question.id as keyof typeof ratings] && (
                            <div className="flex items-center gap-2">
                              {renderStars(ratings[question.id as keyof typeof ratings])}
                              <span className="text-sm font-medium text-muted-foreground">
                                {ratingOptions.find(opt => opt.value === ratings[question.id as keyof typeof ratings])?.label}
                              </span>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{question.category}</p>
                      </div>

                      <RadioGroup
                        value={ratings[question.id as keyof typeof ratings]}
                        onValueChange={(value) => handleRatingChange(question.id, value)}
                        className="flex flex-col space-y-2"
                      >
                        {ratingOptions.map((option) => (
                          <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                            <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                            <Label
                              htmlFor={`${question.id}-${option.value}`}
                              className="flex-1 cursor-pointer flex items-center justify-between"
                            >
                              <span>{option.label}</span>
                              {renderStars(option.value)}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Comments */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Comments (Optional)</CardTitle>
                <CardDescription>
                  Share any additional feedback or suggestions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Your comments and suggestions help us improve the quality of education..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Your feedback is anonymous and will be used solely for improving our educational services.
                </p>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90"
                onClick={handleSubmitEvaluation}
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Evaluation
              </Button>
            </div>
          </>
        )}

        {!selectedCourse && (
          <Card className="border-dashed">
            <CardContent className="py-12">
              <div className="text-center text-muted-foreground">
                <p className="text-lg">Please select a course from above to begin evaluation</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Information Box */}
        <Card className="bg-secondary/5 border-secondary">
          <CardHeader>
            <CardTitle>About Teacher Evaluations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• All evaluations are completely anonymous</li>
              <li>• Your honest feedback helps improve the quality of education</li>
              <li>• Evaluations must be completed before final grades are released</li>
              <li>• Please be constructive and respectful in your comments</li>
              <li>• Your participation is valued and appreciated</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
