const formatDate = (date) => {
  const d = new Date(date);
  return d
    .toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    .replace(/\//g, "-")
    .replace(",", "")
    .replace(/\s?[AP]M/i, "");
};

export { formatDate };
