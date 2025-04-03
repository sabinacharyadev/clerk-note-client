const generateTextAreaFocusColor = (cardBackgroundColor) => {
  let color = "";
  switch (cardBackgroundColor) {
    case "bg-danger text-white":
      color = "0 0 5px #dc3545";
      break;

    case "bg-white text-black":
      color = "0 0 5px white";
      break;

    case "bg-primary text-white":
      color = "0 0 5px #007bff";
      break;

    case "bg-secondary text-white":
      color = "0 0 5px #6c757d";
      break;

    case "bg-success text-white":
      color = "0 0 5px #198754";
      break;

    case "bg-warning text-white":
      color = "0 0 5px #ffc107";
      break;

    case "bg-info text-white":
      color = "0 0 5px #0dcaf0";
      break;

    case "bg-dark text-white":
      color = "0 0 5px #212529";
      break;
    default:
      color = "0 0 5px #000000";
      break;
  }
  return color;
};
export default generateTextAreaFocusColor;
