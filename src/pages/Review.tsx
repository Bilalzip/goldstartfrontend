import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import api from "@/services/api";
import { toast } from "sonner";

const Review = () => {
  const { businessId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [business, setBusiness] = useState<{
    business_name: string;
    google_review_link: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        const response = await api.get(`/business/${businessId}/public`);
        setBusiness(response.data);
      } catch (error) {
        console.error("Error fetching business:", error);
        toast.error("Could not load business details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinessDetails();
  }, [businessId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/reviews/submit', {
        businessId: Number(businessId),
        rating,
        comment
      });

      if (rating >= 4 && business?.google_review_link) {
        // Redirect to Google Review
        window.location.href = business.google_review_link;
      } else {
        // Redirect to survey
        navigate(`/survey/${businessId}?reviewId=${response.data.reviewId}`);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Business not found</h1>
          <p className="text-gray-500 mt-2">This business does not exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-8"
        >
          <h1 className="text-2xl font-bold text-center mb-2">
            {business.business_name}
          </h1>
          <p className="text-center text-gray-500 mb-6">
            How was your experience?
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className="p-2 transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-12 h-12 ${
                      value <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="text-center text-sm text-gray-500">
              {rating > 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {rating >= 4 ? "Excellent! We're glad you enjoyed it!" : "We're sorry you didn't have a better experience."}
                </motion.p>
              )}
            </div>

            <Textarea
              placeholder="Tell us about your experience (optional)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px]"
            />

            <Button
              type="submit"
              className="w-full"
              disabled={loading || rating === 0}
            >
              {loading ? "Submitting..." : "Submit Review"}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Review; 