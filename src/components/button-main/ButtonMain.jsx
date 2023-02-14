export const ButtonMain = ({ text }) => {
  return (
    <button
      aria-label={text}
      className='uppercase justify-self-end px-6 py-2 rounded-lg bg-[hsl(238,_40%,_52%)] text-[hsl(228,_33%,_97%)] md:px-8 md:py-3 md:text-lg'
    >
      {text}
    </button>
  );
};
