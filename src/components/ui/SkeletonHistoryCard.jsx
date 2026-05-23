const SkeletonHistoryCard = () => {
  return (
    <div
      className="
        bg-white
        border border-slate-200
        rounded-3xl
        p-6
        animate-pulse
      "
    >
      {/* Query */}
      <div className="space-y-3 mb-6">
        <div className="h-4 w-28 bg-slate-200 rounded-lg"></div>

        <div className="h-8 w-2/3 bg-slate-200 rounded-xl"></div>

        <div className="h-4 w-40 bg-slate-200 rounded-lg"></div>
      </div>

      {/* Total */}
      <div className="flex items-center justify-between mb-6">
        <div className="h-4 w-32 bg-slate-200 rounded-lg"></div>

        <div className="h-9 w-10 bg-slate-200 rounded-xl"></div>
      </div>

      {/* Recommendation Skeleton */}
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="
              border border-slate-100
              bg-slate-50
              rounded-2xl
              p-5
            "
          >
            {/* Top */}
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-3 flex-1">
                <div className="h-4 w-28 bg-slate-200 rounded-lg"></div>

                <div className="h-6 w-52 bg-slate-200 rounded-xl"></div>

                <div className="h-4 w-32 bg-slate-200 rounded-lg"></div>
              </div>

              <div className="h-8 w-24 bg-slate-200 rounded-xl"></div>
            </div>

            {/* Alasan */}
            <div className="space-y-2 mt-5">
              <div className="h-4 w-full bg-slate-200 rounded-lg"></div>

              <div className="h-4 w-5/6 bg-slate-200 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonHistoryCard;
