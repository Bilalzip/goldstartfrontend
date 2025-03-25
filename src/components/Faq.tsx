
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the review filtering work?",
    answer: "Our system automatically analyzes customer feedback based on their ratings. Positive reviews (typically 4-5 stars) are directed to your Google Business Profile for public posting, while negative or constructive feedback is sent privately to your email inbox for internal improvements."
  },
  {
    question: "Do I need technical knowledge to set this up?",
    answer: "Not at all! We handle the entire setup process for you. Once you subscribe, we'll create your custom QR code and feedback page, which you can easily share with customers through printed materials or digital communications."
  },
  {
    question: "Can I customize the review thresholds?",
    answer: "Yes, you can define what rating threshold constitutes a 'positive' review that gets directed to Google. The default is set at 4-5 stars, but you can adjust this based on your business needs."
  },
  {
    question: "Is there a contract or can I cancel anytime?",
    answer: "There's no long-term contract. The service is billed monthly at $399, and you can cancel at any time without penalties. We're confident you'll see value from our service, but we don't believe in locking customers into contracts."
  },
  {
    question: "How do I know if customers are leaving reviews?",
    answer: "You'll receive email notifications for all reviews, both positive and negative. Additionally, our dashboard provides analytics on customer feedback patterns, review volume, and sentiment trends over time."
  },
  {
    question: "Is this against Google's terms of service?",
    answer: "No, our service complies with Google's review policies. We simply make it easier for satisfied customers to leave Google reviews while providing a channel for constructive feedback. We never incentivize reviews or filter based on specific content—only on overall satisfaction rating."
  }
];

const Faq = () => {
  return (
    <div className="bg-secondary rounded-xl p-8">
      <h2 className="text-3xl mb-8 text-center">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-lg font-medium text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;
