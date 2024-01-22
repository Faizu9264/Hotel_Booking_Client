import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Review } from "../../types/Review";
import { Avatar, Box, Paper, Typography, Button } from "@mui/material";
import StarRating from "../user/StarRating";

interface ReviewsTickerProps {
  reviews: Review[];
}

const ReviewsTicker: React.FC<ReviewsTickerProps> = ({ reviews }) => {
  const [visibleReviews, setVisibleReviews] = useState<Review[]>([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [expandedReviews, setExpandedReviews] = useState<boolean[]>(
    Array(reviews.length).fill(false)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [reviews]);

  useEffect(() => {
    const updateVisibleReviews = () => {
      const startIndex = currentReviewIndex % reviews.length;
      const endIndex = (startIndex + 2) % reviews.length;

      if (startIndex <= endIndex) {
        setVisibleReviews(reviews.slice(startIndex, endIndex + 1));
      } else {
        setVisibleReviews([
          ...reviews.slice(startIndex),
          ...reviews.slice(0, endIndex + 1),
        ]);
      }
    };

    updateVisibleReviews();
  }, [currentReviewIndex, reviews]);

  const handleReadMore = (reviewIndex: number) => {
    setExpandedReviews((prevExpanded) => {
      const newExpanded = [...prevExpanded];
      newExpanded[reviewIndex] = true;
      return newExpanded;
    });
  };

  const handleCollapse = () => {
    setExpandedReviews(Array(reviews.length).fill(false));
  };

  return (
    <div className="reviews-ticker">
    <Typography variant="h6" style={{ marginLeft: "15px", marginTop: '20px', color: '#333', fontSize: '20px', fontWeight: 'bold' }} gutterBottom>
  User Reviews
</Typography>



      <AnimatePresence initial={false}>
        <Box display="flex" flexWrap="wrap">
          {visibleReviews.map((review, index) => (
            <motion.div
              key={index}
              className={`review-box ${index === 1 ? "active" : ""}`}
              initial={{ opacity: 0, x: index === 0 ? 100 : -100 }}
              animate={{ opacity: 1, x: 0, position: "relative" }}
              exit={{
                opacity: 0,
                x: index === 0 ? -100 : 100,
                position: "absolute",
              }}
              transition={{ duration: 0.5 }}
            >
              <Paper
                elevation={3}
                sx={{ padding: 3, margin: 2, width: "415px" }}
              >
                <Avatar src={review.profileImage} alt={`User ${index + 1}`} />

                <div style={{ marginTop: "8px" }}>
                  <StarRating
                    totalStars={5}
                    initialRating={review.rating}
                    onChange={() => {}}
                  />

                  <Typography
                    variant="body2"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: expandedReviews[index] ? "unset" : 1,
                    }}
                  >
                    {review.reviewText}
                  </Typography>

                  {!expandedReviews[index] ? (
                    <Button
                      color="primary"
                      size="small"
                      onClick={() => handleReadMore(index)}
                    >
                      Read More
                    </Button>
                  ) : (
                    <Button
                      color="primary"
                      size="small"
                      onClick={handleCollapse}
                    >
                      Collapse
                    </Button>
                  )}
                </div>
              </Paper>
            </motion.div>
          ))}
        </Box>
      </AnimatePresence>
    </div>
  );
};

export default ReviewsTicker;
