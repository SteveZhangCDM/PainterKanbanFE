import PropTypes from "prop-types";

const Column = ({ color, children }) => {
  return (
    <div className="flex flex-col w-full sm:w-auto bg-white shadow rounded-lg p-4 m-2">
      <h2 className="text-xl font-bold mb-4 text-center capitalize">{color}</h2>
      <div className="flex flex-col space-y-2">{children}</div>
    </div>
  );
};

Column.propTypes = {
  color: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Column;
