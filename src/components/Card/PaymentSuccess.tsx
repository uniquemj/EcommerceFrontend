import { CheckCircle2, Home, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-3">
          Payment Successful!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your purchase. You'll receive a confirmation email
          shortly.
        </p>

        {/* Celebration Graphic (Optional) */}
        <div className="mb-10">
          <svg
            viewBox="0 0 400 60"
            className="w-full max-w-xs mx-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20,30 Q100,5 180,30 T340,30"
              fill="none"
              stroke="#10B981"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="20" cy="30" r="3" fill="#10B981" />
            <circle cx="340" cy="30" r="3" fill="#10B981" />
          </svg>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Link to="/product/all">
            <Button className="gap-2 bg-green-600 hover:bg-green-700">
              Continue Exploring
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Support Message */}
        <div className="mt-10 text-sm text-gray-500">
          <p>
            Need help?{" "}
            <a
              href="#"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
