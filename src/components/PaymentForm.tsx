import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, ArrowLeft, Check } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

type PaymentFormProps = {
  isSubmitting: boolean;
  onSubmit: (paymentMethod: string) => void;
  onBack: () => void;
};

const PaymentForm = ({ isSubmitting, onSubmit, onBack }: PaymentFormProps) => {
  const [paymentMethod, setPaymentMethod] = useState<string>("credit-card");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    nameOnCard: "",
  });

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Format card number with spaces
    if (name === "cardNumber") {
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
      setCardDetails((prev) => ({
        ...prev,
        [name]: formatted,
      }));
      return;
    }

    // Format expiry as MM/YY
    if (name === "expiry") {
      const cleaned = value.replace(/\D/g, "");
      let formatted = cleaned;
      if (cleaned.length > 2) {
        formatted = cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
      }
      setCardDetails((prev) => ({
        ...prev,
        [name]: formatted,
      }));
      return;
    }

    setCardDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Validate payment details before submission
    onSubmit(paymentMethod);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <AnimatedSection delay={0.1} className="space-y-4">
          <h3 className="text-lg font-medium">Select Payment Method</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                paymentMethod === "credit-card"
                  ? "border-brand-600 bg-brand-50"
                  : "hover:border-brand-300"
              }`}
              onClick={() => setPaymentMethod("credit-card")}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`rounded-full w-5 h-5 flex items-center justify-center ${
                    paymentMethod === "credit-card"
                      ? "bg-brand-600 text-white"
                      : "border border-gray-400"
                  }`}
                >
                  {paymentMethod === "credit-card" && <Check size={12} />}
                </div>
                <span className="font-medium">Credit Card</span>
              </div>
            </div>

            <div
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                paymentMethod === "paypal"
                  ? "border-brand-600 bg-brand-50"
                  : "hover:border-brand-300"
              }`}
              onClick={() => setPaymentMethod("paypal")}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`rounded-full w-5 h-5 flex items-center justify-center ${
                    paymentMethod === "paypal"
                      ? "bg-brand-600 text-white"
                      : "border border-gray-400"
                  }`}
                >
                  {paymentMethod === "paypal" && <Check size={12} />}
                </div>
                <span className="font-medium">PayPal</span>
              </div>
            </div>

            <div
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                paymentMethod === "bank-transfer"
                  ? "border-brand-600 bg-brand-50"
                  : "hover:border-brand-300"
              }`}
              onClick={() => setPaymentMethod("bank-transfer")}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`rounded-full w-5 h-5 flex items-center justify-center ${
                    paymentMethod === "bank-transfer"
                      ? "bg-brand-600 text-white"
                      : "border border-gray-400"
                  }`}
                >
                  {paymentMethod === "bank-transfer" && <Check size={12} />}
                </div>
                <span className="font-medium">Bank Transfer</span>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {paymentMethod === "credit-card" && (
          <AnimatedSection delay={0.2} className="space-y-4 pt-2">
            <div className="border rounded-lg p-6 bg-gray-50">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="nameOnCard" className="text-sm font-medium">
                    Name on Card
                  </label>
                  <Input
                    id="nameOnCard"
                    name="nameOnCard"
                    placeholder="John Doe"
                    value={cardDetails.nameOnCard}
                    onChange={handleCardDetailsChange}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="cardNumber" className="text-sm font-medium">
                    Card Number
                  </label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.cardNumber}
                      onChange={handleCardDetailsChange}
                      maxLength={19}
                    />
                    <CreditCard
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="expiry" className="text-sm font-medium">
                      Expiry Date
                    </label>
                    <Input
                      id="expiry"
                      name="expiry"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={handleCardDetailsChange}
                      maxLength={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="cvv" className="text-sm font-medium">
                      CVV
                    </label>
                    <Input
                      id="cvv"
                      name="cvv"
                      type="password"
                      placeholder="123"
                      value={cardDetails.cvv}
                      onChange={handleCardDetailsChange}
                      maxLength={3}
                    />
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        )}

        {paymentMethod === "paypal" && (
          <AnimatedSection delay={0.2} className="space-y-2 pt-2">
            <div className="border rounded-lg p-6 bg-gray-50 text-center">
              <p className="text-gray-600 mb-4">
                You'll be redirected to PayPal to complete your payment.
              </p>

              {/* This is where you'd integrate the PayPal button */}
              <div className="w-full py-3 bg-[#0070ba] text-white rounded-md font-medium">
                Pay with PayPal
              </div>

              <p className="text-xs mt-4 text-gray-500">
                Note: This is a placeholder. Backend integration with PayPal API
                required.
              </p>
            </div>
          </AnimatedSection>
        )}

        {paymentMethod === "bank-transfer" && (
          <AnimatedSection delay={0.2} className="space-y-2 pt-2">
            <div className="border rounded-lg p-6 bg-gray-50">
              <h4 className="font-medium mb-2">Bank Transfer Details</h4>
              <p className="text-gray-600 mb-4">
                Please use the following details to make your bank transfer:
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Name:</span>
                  <span className="font-medium">The Gold Star LLC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Number:</span>
                  <span className="font-medium">123456789</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Routing Number:</span>
                  <span className="font-medium">987654321</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bank:</span>
                  <span className="font-medium">Business Bank</span>
                </div>
              </div>

              <p className="text-sm text-gray-500">
                Please include your business name as the reference. We'll
                activate your account once the payment is received.
              </p>
            </div>
          </AnimatedSection>
        )}

        <AnimatedSection delay={0.3} className="pt-2">
          <div className="rounded-lg border p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Monthly Subscription</span>
              <span>$44.99</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between items-center font-medium">
                <span>Total</span>
                <span className="text-lg">$44.99/month</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Your subscription will automatically renew each month. You can
                cancel anytime.
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection
          delay={0.4}
          className="pt-4 flex flex-col sm:flex-row gap-4"
        >
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={isSubmitting}
            className="sm:flex-1"
          >
            <ArrowLeft size={16} className="mr-2" /> Back
          </Button>
          <Button type="submit" className="sm:flex-[2]" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                />
                Processing...
              </>
            ) : (
              <>Complete Subscription – $44.99/month</>
            )}
          </Button>
        </AnimatedSection>
      </div>
    </form>
  );
};

export default PaymentForm;
