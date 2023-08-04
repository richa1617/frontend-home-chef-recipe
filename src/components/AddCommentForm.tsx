import axios from "axios";
import { useRouter } from "next/router";

const AddCommentForm = () => {
  const router = useRouter();
  const recipeId = router.query.recipeId;
  console.log(recipeId);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const postComment = async (
      name: string,
      rating: number,
      message: string
    ) => {
      await axios.post(`http://localhost:3000/comments/${recipeId}`, {
        name: name,
        rating: rating,
        message: message,
      });
    };

    event.preventDefault();
    const nameFromCommentForm = event.currentTarget.commenterName.value;
    const ratingFromCommentForm = event.currentTarget.rating.value;
    const reviewFromCommentForm = event.currentTarget.message.value;

    console.log(nameFromCommentForm);
    console.log(ratingFromCommentForm);
    console.log(reviewFromCommentForm);
    postComment(
      nameFromCommentForm,
      ratingFromCommentForm,
      reviewFromCommentForm
    );
    console.log("New comment has been posted to database");
  };
  return (
    <>
      <form onSubmit={handleSubmit} action="" className="addCommentForm">
        <div className="addCommentFormTop">
          <div className="commentNameField">
            <label htmlFor="name">Name</label>
            <input name="commenterName" id="name" type="text" />
          </div>
          <div className="commentRatingField">
            <label htmlFor="rating">Rating</label>
            <input name="rating" id="rating" type="number" />
          </div>
        </div>
        <div className="commentReviewField">
          <label htmlFor="message">Review</label>
          <textarea name="message" id="message" />
        </div>
        <button className="addCommentSaveButton" type="submit">
          Save
        </button>
      </form>
    </>
  );
};

export default AddCommentForm;
