const SingleBox = ({ value, onClick }) => {
    return (
      <div className="single-box" onClick={onClick}>
        {value && (
          <img
            className="transition"
            src={value === "X" ? "img/x.png" : "img/o.png"}
            alt={value}
          />
        )}
      </div>
    );
  };

  export default SingleBox;