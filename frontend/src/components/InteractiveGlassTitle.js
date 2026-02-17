const InteractiveGlassTitle = ({ children }) => {
  return (
    <div
      className="relative mb-6 rounded-3xl border border-white/82 bg-white/66 px-4 py-4 backdrop-blur-2xl ring-1 ring-[#BFDBFE]/45 shadow-[0_20px_55px_rgba(28,63,249,0.14),inset_0_1px_0_rgba(255,255,255,0.95)] dark:border-[#93C5FD]/26 dark:bg-[#1a1d26]/82 dark:ring-[#60A5FA]/24 dark:shadow-[0_24px_58px_rgba(0,0,0,0.62),inset_0_1px_0_rgba(147,197,253,0.08)] sm:px-6 sm:py-5 md:px-8 md:py-6"
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-90 dark:hidden"
        style={{
          background:
            "radial-gradient(circle at 24% 10%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.6) 34%, rgba(219,234,254,0.24) 68%, rgba(191,219,254,0.14) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 hidden rounded-3xl opacity-95 dark:block"
        style={{
          background:
            "radial-gradient(circle at 26% 12%, rgba(96,165,250,0.16) 0%, rgba(30,64,175,0.11) 28%, rgba(26,29,38,0.12) 62%, rgba(10,10,14,0.22) 100%)",
        }}
      />
      <div className="pointer-events-none absolute -right-10 -top-12 h-28 w-28 rounded-full bg-[#60A5FA]/20 blur-2xl dark:bg-[#3B82F6]/18" />
      <h1 className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0A0A0A] dark:text-[#F3F6FF] leading-[1.1] tracking-tight">
        {children}
      </h1>
    </div>
  );
};

export default InteractiveGlassTitle;
