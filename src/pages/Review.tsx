import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import api from "@/services/api";
import { toast } from "sonner";

const Review = () => {
  const { urlId } = useParams(); // Updated to use urlId instead of businessId
  const navigate = useNavigate();
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [business, setBusiness] = useState<{
    businessId: number;
    businessName: string;
    googleReviewLink: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        const response = await api.get(`/api/qr-code/review/${urlId}`);
        setBusiness(response.data);
      } catch (error) {
        console.error("Error fetching business:", error);
        toast.error("Could not load business details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinessDetails();
  }, [urlId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use the businessId from the API response, not from the URL
      const response = await api.post("/reviews/submit", {
        businessId: business?.businessId, // Using the ID from the fetched business
        rating,
        comment,
      });

      if (rating >= 4 && business?.googleReviewLink) {
        // Redirect to Google Review
        window.location.href = business.googleReviewLink;
      } else {
        // Redirect to survey - now using businessId from the response
        navigate(
          `/survey/${business?.businessId}?reviewId=${response.data.reviewId}`
        );
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
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-50"></div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-xl shadow-lg p-8 max-w-md">
          <h1 className="text-2xl font-bold text-gray-900">
            Business not found
          </h1>
          <p className="text-gray-500 mt-3">
            This business does not exist or has been removed.
          </p>
          <Button
            className="mt-6 bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate("/")}
          >
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  const ratingFeedback = [
    "",
    "We're sorry to hear about your experience",
    "We appreciate your feedback",
    "Thank you for your review",
    "We're glad you enjoyed your experience!",
    "Excellent! Thank you for your support!",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-md"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-white">
            <h1 className="text-2xl md:text-3xl font-bold text-center">
              {business.businessName}
            </h1>
            <p className="text-center text-white text-opacity-90 mt-2">
              How was your experience with us?
            </p>
          </div>

          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="flex justify-center space-x-1 md:space-x-3">
                {[1, 2, 3, 4, 5].map((value) => (
                  <motion.button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-1 md:p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full"
                  >
                    <Star
                      className={`w-10 h-10 md:w-12 md:h-12 transition-all duration-200 ${
                        value <= rating
                          ? "fill-yellow-400 text-yellow-400 drop-shadow-md"
                          : "text-gray-300"
                      }`}
                    />
                  </motion.button>
                ))}
              </div>

              <AnimatePresence>
                {rating > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-center"
                  >
                    <p
                      className={`font-medium ${
                        rating >= 4 ? "text-green-600" : "text-blue-600"
                      }`}
                    >
                      {ratingFeedback[rating]}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2">
                <label
                  htmlFor="comment"
                  className="text-sm font-medium text-gray-700"
                >
                  Your feedback
                </label>
                <Textarea
                  id="comment"
                  placeholder="Tell us about your experience (optional)"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[120px] rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
                />
              </div>

              <Button
                type="submit"
                className={`w-full py-6 text-lg transition-all ${
                  rating === 0
                    ? "bg-gray-400"
                    : rating >= 4
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                    : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                }`}
                disabled={loading || rating === 0}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Submit Review"
                )}
              </Button>
            </form>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-gray-500 text-sm mt-6"
        >
          Thank you for taking the time to share your feedback
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Review;
