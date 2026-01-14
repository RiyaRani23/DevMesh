const ShimmerCard = () => {
  return (
    <div className="w-80 bg-base-300 shadow-xl rounded-xl p-4 animate-pulse">
      {/* Circle for Close Button */}
      {/* <div className="absolute top-2 right-2 w-8 h-8 bg-gray-700 rounded-full"></div> */}

      {/* Profile Image Circle */}
      <div className="flex justify-center mt-2">
        <div className="w-35 h-35 rounded-full bg-gray-700"></div>
      </div>

      {/* Name and About Bars */}
      <div className="text-center mt-4 flex flex-col items-center gap-3">
        <div className="h-6 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6"></div>
      </div>

      {/* Button Bar */}
      <div className="mt-4">
        <div className="h-12 bg-gray-700 rounded-lg w-full"></div>
      </div>
    </div>
  );
};

export default ShimmerCard;