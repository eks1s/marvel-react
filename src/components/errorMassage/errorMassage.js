import img from "./error.gif";

const ErrorMassage = () => {
  return (
    <img
      alt="error"
      style={{
        display: "block",
        width: "250px",
        height: "250px",
        objectFit: "contain",
        margin: "0 auto",
      }}
      src={img}
    />
  );
};

export default ErrorMassage;
