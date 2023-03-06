import { redirect } from "react-router-dom";

export const RedirectToReviews = async () => {
  return redirect("/profile/reviews");
};
