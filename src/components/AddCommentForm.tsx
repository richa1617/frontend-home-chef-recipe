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
      <form
        onSubmit={handleSubmit}
        action=""
        className="bg-white w-[85vw] md:w-[40vw] h-[50vh] rounded-3xl p-8 flex flex-col justify-between shadow-lg mx-auto"
      >
        <div className="flex md:flex-row flex-col justify-between">
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              name="commenterName"
              id="name"
              type="text"
              className="border border-gray-300 p-2 rounded mb-4"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="rating">Rating</label>
            <input
              name="rating"
              id="rating"
              type="number"
              className="border border-gray-300 p-2 rounded"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="message">Review</label>
          <textarea
            name="message"
            id="message"
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <button
          className="rounded-3xl bg-yellow-500 border-0 text-white text-center outline-none py-2 px-8 mt-4"
          type="submit"
        >
          Save
        </button>
      </form>
    </>
  );
};

export default AddCommentForm;
