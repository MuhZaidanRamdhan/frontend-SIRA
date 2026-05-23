const SkeletonRecommendation = () => {
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
      {/* TOP */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3 flex-1">
          <div className="h-6 w-28 bg-slate-200 rounded-xl"></div>

          <div className="h-7 w-52 bg-slate-200 rounded-xl"></div>

          <div className="h-5 w-32 bg-slate-200 rounded-xl"></div>
        </div>

        <div className="h-10 w-16 bg-slate-200 rounded-xl"></div>
      </div>

      {/* CONTENT */}
      <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
        <div className="h-4 w-full bg-slate-200 rounded"></div>

        <div className="h-4 w-full bg-slate-200 rounded"></div>

        <div className="h-4 w-2/3 bg-slate-200 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonRecommendation;
