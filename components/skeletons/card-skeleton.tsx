const CardSkeleton = () => {
  return (
<<<<<<< HEAD
    <div className="bg-white shadow-lg rounded-sm animate-pulse">
      {/* image waraper */}
      <div className="h-[260px] w-auto rounded-t-sm bg-gray-200">
        {/* Image */}
        <div className=""></div>
      </div>
      {/* Icons Wraper */}
      <div className="p-8">
        <div className="mb-2">
          {/* title */}
          <div className="h-5 w-72 rounded bg-gray-200"></div>
        </div>
        <div className="mb-7">
          {/* price */}
          <div className="h-6 w-36 rounded bg-gray-200"></div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* clock icon */}
            <div className="h-5 w-5 rounded-full bg-gray-200"></div>
            <span>
              <div className="h-5 w-12 rounded bg-gray-200"></div>
            </span>
          </div>
          <div className="h-12 w-36 rounded-sm bg-gray-200"></div>
        </div>
=======
    <div className="rounded-2xl bg-white ring-1 ring-black/5 shadow-md animate-pulse overflow-hidden">
      <div className="h-[220px] w-full bg-black/[0.06]" />
      <div className="p-5 space-y-3">
        <div className="h-4 w-3/4 rounded bg-black/[0.06]" />
        <div className="h-4 w-full rounded bg-black/[0.06]" />
        <div className="h-4 w-2/3 rounded bg-black/[0.06]" />

        <div className="pt-2 flex items-center justify-between">
          <div className="h-5 w-28 rounded bg-black/[0.06]" />
          <div className="h-4 w-16 rounded bg-black/[0.06]" />
        </div>

        <div className="h-10 w-full rounded-2xl bg-black/[0.08]" />
>>>>>>> master
      </div>
    </div>
  );
};

export default CardSkeleton;
