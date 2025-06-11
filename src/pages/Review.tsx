import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import api from "@/services/api";
import { toast } from "sonner";

const Review = () => {
  const { urlId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPublicReview, setIsPublicReview] = useState<boolean>(false);
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

  useEffect(() => {
    if (rating > 0) {
      setIsPublicReview(rating >= 4);
    }
  }, [rating]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/reviews/submit", {
        businessId: business?.businessId,
        rating,
        comment,
      });

      if (isPublicReview && business?.googleReviewLink) {
        window.location.href = business.googleReviewLink;
      } else {
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

  const getStarBasedMessage = () => {
    if (rating >= 1 && rating <= 3) {
      return "We’re sorry your experience wasn’t ideal. If you’d prefer to share your feedback privately, leave the box unchecked. But if you want to share with others by posting publicly, feel free to check the box. — your voice matters either way.";
    } else if (rating >= 4 && rating <= 5) {
      return "Thanks for the great rating! We'd really appreciate if you shared your experience publicly — it helps this business grow and lets others know what to expect.";
    }
    return "";
  };

  const ratingFeedback = [
    "",
    "We're sorry to hear about your experience",
    "We appreciate your feedback",
    "Thank you for your review",
    "We're glad you enjoyed your experience!",
    "Excellent! Thank you for your support!",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-4 md:py-8 px-3 md:px-4 flex items-center justify-center">
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
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 md:px-6 py-6 md:py-8 text-white">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center leading-tight">
              {business.businessName}
            </h1>
            <p className="text-center text-white text-opacity-90 mt-2 text-sm md:text-base">
              How was your experience with us?
            </p>
          </div>

          <div className="p-4 md:p-6 lg:p-8">
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              <div className="flex justify-center space-x-2 md:space-x-3">
                {[1, 2, 3, 4, 5].map((value) => (
                  <motion.button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full transition-all"
                  >
                    <Star
                      className={`w-9 h-9 md:w-11 md:h-11 lg:w-12 lg:h-12 transition-all duration-200 ${
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

              <AnimatePresence>
                {rating > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3 md:space-y-4"
                  >
                    <div className="text-xs md:text-sm text-gray-600 bg-gray-50 p-3 rounded-lg leading-relaxed">
                      This box can be checked or unchecked at any time. You are
                      free to share your feedback publicly or privately —
                      whichever you prefer.
                    </div>

                    <div className="text-xs md:text-sm text-gray-700 leading-relaxed">
                      {getStarBasedMessage()}
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <input
                        type="checkbox"
                        id="publicReview"
                        checked={isPublicReview}
                        onChange={(e) => setIsPublicReview(e.target.checked)}
                        className="mt-0.5 h-4 w-4 md:h-5 md:w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="publicReview"
                        className="text-xs md:text-sm font-medium text-gray-700 cursor-pointer leading-relaxed"
                      >
                        I'd like to post this review publicly on Google.
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2">
                <label
                  htmlFor="comment"
                  className="text-xs md:text-sm font-medium text-gray-700"
                >
                  Your feedback
                </label>
                <Textarea
                  id="comment"
                  placeholder="Tell us about your experience (optional)"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[100px] md:min-h-[120px] rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none text-sm md:text-base"
                />
              </div>

              <Button
                type="submit"
                className={`w-full py-4 md:py-6 text-base md:text-lg transition-all ${
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

            <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center leading-relaxed">
                This platform allows users to choose whether to submit feedback
                publicly or privately. We do not filter, block, or suppress any
                review based on its content or rating. All review decisions are
                made solely by the user.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-gray-500 text-xs md:text-sm mt-4 md:mt-6 px-2"
        >
          Thank you for taking the time to share your feedback
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Review;
