function useDate(createdAt) {
  const now = new Date();

  // To calculate the time difference of two dates
  const differenceInTime = now.getTime() - createdAt.getTime();

  // To calculate the no. of days between two dates
  const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
  if (differenceInDays === 0) {
    return 'today';
  } else if (differenceInDays === 1) {
    return 'yesterday';
  } else if (differenceInDays < 7) {
    return `${differenceInDays} days ago`;
  } else if (differenceInDays === 7) {
    return '1 week ago';
  } else if (differenceInDays > 7) {
    const differenceInWeeks = Math.round(differenceInDays / 7);
    if (differenceInWeeks === 1) {
      return '1 week ago';
    } else {
      return `${differenceInWeeks} weeks ago`;
    }
  }
}

export default useDate;
