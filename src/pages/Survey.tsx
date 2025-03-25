import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { submitSurvey } from "@/services/reviews";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const IMPROVEMENT_AREAS = [
  "Service Quality",
  "Wait Time",
  "Cleanliness",
  "Value for Money",
  "Staff Behavior",
  "Other"
];

const Survey = () => {
  const { businessId } = useParams();
  const [searchParams] = useSearchParams();
  const reviewId = searchParams.get("reviewId");
  
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitSurvey({
        businessId: Number(businessId),
        reviewId: Number(reviewId),
        improvementAreas: selectedAreas,
        feedback
      });

      // Show thank you message or redirect
      window.location.href = "/thank-you";
    } catch (error) {
      console.error("Error submitting survey:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-8"
        >
          <h1 className="text-2xl font-bold text-center mb-6">
            Help Us Improve
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h2 className="font-medium">What areas need improvement?</h2>
              {IMPROVEMENT_AREAS.map((area) => (
                <div key={area} className="flex items-center space-x-2">
                  <RadioGroup
                    value={selectedAreas.includes(area) ? area : ""}
                    onValueChange={(value) => {
                      if (value) {
                        setSelectedAreas([...selectedAreas, area]);
                      } else {
                        setSelectedAreas(selectedAreas.filter(a => a !== area));
                      }
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={area} id={area} />
                      <Label htmlFor={area}>{area}</Label>
                    </div>
                  </RadioGroup>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label>Additional Feedback</Label>
              <Textarea
                placeholder="Please tell us more about your experience..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading || selectedAreas.length === 0}
            >
              {loading ? "Submitting..." : "Submit Feedback"}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Survey; 