import { useRouter } from "next/router";

function Delete() {
  const router = useRouter();
  let id = Number(router.query.id);

  return (
    <div>
      <h1>Delete {id}</h1>
    </div>
  );
}

export default Delete;
