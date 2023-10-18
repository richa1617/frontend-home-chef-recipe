import axios from "axios";
import { useRouter } from "next/router";
import { SetStateAction, useState } from "react";
import Star from "./Star";

const AddCommentForm = () => {
  const router = useRouter();
  const recipeId = router.query.recipeId;

  const [rating, setRating] = useState(0);
  const [error, setError] = useState<null | string>(null);
  const changeRating = (newRating: number) => {
    setRating(newRating);
    console.log(rating);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nameFromCommentForm = event.currentTarget.commenterName.value;
    const ratingFromCommentForm = rating;
    console.log(ratingFromCommentForm);
    const reviewFromCommentForm = event.currentTarget.message.value;

    try {
      const response = await axios.post(
        `http://localhost:3000/comments/${recipeId}`,
        {
          name: nameFromCommentForm,
          rating: ratingFromCommentForm,
          message: reviewFromCommentForm,
        }
      );

      if (response.status === 200) {
        router.reload();
      } else {
        setError("Something went wrong");
      }
    } catch (error) {
      setError("Something went wrong");
    }
  }

  //   const postComment = async (
  //     name: string,
  //     rating: number,
  //     message: string
  //   ) => {
  //     await axios.post(`http://localhost:3000/comments/${recipeId}`, {
  //       name: name,
  //       rating: rating,
  //       message: message,
  //     });
  //   };

  //   event.preventDefault();
  //   const nameFromCommentForm = event.currentTarget.commenterName.value;
  //   const ratingFromCommentForm = event.currentTarget.rating.value;
  //   const reviewFromCommentForm = event.currentTarget.message.value;

  //   postComment(
  //     nameFromCommentForm,
  //     ratingFromCommentForm,
  //     reviewFromCommentForm
  //   );
  //   console.log("New comment has been posted to database");
  // };
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
              className="border border-gray-300 p-2 rounded mb-4  w-[80%]"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="rating" className="">
              Rating
            </label>
            <span className="flex flex-row mt-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <Star
                  key={value}
                  name="rating"
                  filled={value <= rating}
                  onClick={changeRating}
                  value={value}
                />
              ))}
            </span>
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
        <p className="mt-4 text-red-500"> {error}</p>
      </form>
    </>
  );
};

export default AddCommentForm;
