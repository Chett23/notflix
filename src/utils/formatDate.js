const formatDate = (date) => {
  const formattedDate = date.split("-");
  return `${formattedDate[1]}/${formattedDate[2]}/${formattedDate[0]}`;
};

export default formatDate;
