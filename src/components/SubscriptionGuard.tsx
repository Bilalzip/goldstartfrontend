import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toast } from "sonner";

interface SubscriptionGuardProps {
  children: ReactNode;
}

const SubscriptionGuard = ({ children }: SubscriptionGuardProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  if (user?.subscriptionStatus === "pending") {
    toast.error("Please subscribe to access this feature");
    return <Navigate to="/dashboard/payment" replace />;
  }

  return <>{children}</>;
};

export default SubscriptionGuard;
