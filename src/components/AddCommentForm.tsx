const AddCommentForm = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nameFromCommentForm = event.currentTarget.commenterName.value;
    const ratingFromCommentForm = event.currentTarget.rating.value;
    const reviewFromCommentForm = event.currentTarget.review.value;

    console.log(nameFromCommentForm);
    console.log(ratingFromCommentForm);
    console.log(reviewFromCommentForm);
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
          <label htmlFor="review">Review</label>
          <textarea name="review" id="review" />
        </div>
        <button className="addCommentSaveButton" type="submit">
          Save
        </button>
      </form>
    </>
  );
};

export default AddCommentForm;
