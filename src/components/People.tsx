interface Count {
  count: number;
}

function People({ count }: Count) {
  const peopleIcons = Array.from({ length: count }, (_, index) => (
    <svg
      key={index}
      width="12"
      height="17"
      viewBox="0 0 17 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.249 4.75C12.249 5.74456 11.8539 6.69839 11.1507 7.40165C10.4474 8.10491 9.49356 8.5 8.499 8.5C7.50444 8.5 6.55061 8.10491 5.84735 7.40165C5.14409 6.69839 4.749 5.74456 4.749 4.75C4.749 3.75544 5.14409 2.80161 5.84735 2.09835C6.55061 1.39509 7.50444 1 8.499 1C9.49356 1 10.4474 1.39509 11.1507 2.09835C11.8539 2.80161 12.249 3.75544 12.249 4.75ZM1 18.868C1.03213 16.9004 1.83634 15.0242 3.23918 13.644C4.64202 12.2639 6.53109 11.4905 8.499 11.4905C10.4669 11.4905 12.356 12.2639 13.7588 13.644C15.1617 15.0242 15.9659 16.9004 15.998 18.868C13.6454 19.9468 11.0871 20.5035 8.499 20.5C5.823 20.5 3.283 19.916 1 18.868Z"
        fill="#0D0D0D"
        stroke="#0D0D0D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ));

  return <>{peopleIcons}</>;
}

export default People;
