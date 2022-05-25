const NoResults = ({
  text = "Sorry! We cant find the products you're looking for",
}) => {
  return (
    <div className="py-5 text-center">
      <h5 className="text-muted">No match found</h5>
      <div className="mt-4 small text-muted">{text}</div>
    </div>
  );
};

export default NoResults;
