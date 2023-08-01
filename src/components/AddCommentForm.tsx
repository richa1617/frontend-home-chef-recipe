const AddCommentForm = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nameFromCommentForm = event.currentTarget.commenterName.value;
    const ratingFromCommentForm = event.currentTarget.rating.value;
    const reviewFromCommentForm = event.currentTarget.review.value;
  };
  return (
    <>
      <form onSubmit={handleSubmit} action="">
        <label htmlFor="name">Name</label>
        <input name="commenterName" id="name" type="text" />

        <label htmlFor="like-peas">Rating</label>
        <input name="rating" id="rating" type="number" />

        <label htmlFor="review">Review</label>
        <textarea name="review" id="review" />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default AddCommentForm;
