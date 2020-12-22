export const getDate = (date: any) => {
  const d = parseInt(date);
  let [month, day, year] = new Date(d).toLocaleDateString("en-US").split("/");
  let [tMonth, tDay, tYear] = new Date().toLocaleDateString("en-US").split("/");
  const formattedDate = `${month}/${day}/${year}`;
  const todaysDate = `${tMonth}/${tDay}/${tYear}`;

  const finalDate = formattedDate == todaysDate ? "Today" : formattedDate;
  return finalDate;
};
