export const getNormalDateString = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};

export const getTimeString = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getHours()}:${date.getMinutes()}`;
};

export const capitalizeFirstLetter = (string: string) => {
  if (!isNaN(parseInt(string))) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const capitalizeFirstLetters = (string: string) => {
  return string.split(" ").map(capitalizeFirstLetter).join(" ");
};

