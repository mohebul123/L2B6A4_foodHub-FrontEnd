"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Star, Loader2 } from "lucide-react"; // Loader2 add kora hoyeche
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Textarea } from "@/components/ui/textarea";
import { createReview } from "@/app/service/review"; 

export function ReviewModal({ mealId }: { mealId: string }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // ✅ EIKHANE TOMAR FUNCTION TA THAKBE
  const handleSubmit = async () => {
    if (rating === 0) return toast.error("Please select a rating!");
    setLoading(true);

    try {
      const res = await createReview({ 
        mealId, 
        rating, 
        comment 
      });

      if (res.success) {
        toast.success("Review submitted successfully!");
        setOpen(false);
        setRating(0);
        setComment("");
      } else {
        toast.error(res.message || "Failed to submit review");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Write a Review</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rate this Meal</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={30}
                className={`cursor-pointer transition-colors ${
                  rating >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          <textarea
            placeholder="Share your experience (Optional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[100px]"
          />
          
          {/* ✅ Button-e Loading State add kora hoyeche */}
          <Button 
            onClick={handleSubmit} 
            disabled={loading} 
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Review"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}