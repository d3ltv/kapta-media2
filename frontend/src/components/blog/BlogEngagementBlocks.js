const BlogEngagementBlocks = ({
  highlights = [],
}) => {
  const hasHighlights = Array.isArray(highlights) && highlights.length > 0;

  if (!hasHighlights) return null;

  return (
    <section className="mb-14 space-y-6">
      {hasHighlights && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-[#2A2E39] bg-white dark:bg-[#0D1420] p-5"
            >
              <span className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#1c3ff9] to-[#60A5FA]" />
              <p className="text-[11px] uppercase tracking-[0.1em] text-[#71717A] dark:text-[#98A2B6] mb-2">
                {item.title}
              </p>
              <p className="text-[1.6rem] leading-tight font-bold text-[#0A0A0A] dark:text-[#F3F6FF] mb-2">
                {item.value}
              </p>
              <p className="text-sm leading-relaxed text-[#52525B] dark:text-[#C2C8D8] mb-0">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      )}

    </section>
  );
};

export default BlogEngagementBlocks;
