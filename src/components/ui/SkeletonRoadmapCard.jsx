const SkeletonRoadmapCard = () => {
  return (
    <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 animate-pulse">
      {/* Top */}
      <div className="flex items-center justify-between mb-5">
        <div className="h-5 w-14 bg-slate-200 rounded-lg"></div>

        <div className="h-5 w-24 bg-slate-200 rounded-lg"></div>
      </div>

      {/* Title */}
      <div className="h-6 w-40 bg-slate-200 rounded mb-4"></div>

      {/* SKS */}
      <div className="h-4 w-16 bg-slate-200 rounded"></div>
    </div>
  );
};

export default SkeletonRoadmapCard;
