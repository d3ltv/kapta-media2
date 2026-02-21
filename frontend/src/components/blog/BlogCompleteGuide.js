import { useMemo, useState } from "react";
import { ChevronDown, BookOpen, Link as LinkIcon, CircleCheckBig } from "lucide-react";
import { getCompleteGuideBySlug } from "@/data/blogCompleteGuides";
import { getGuideExtensionBySlug } from "@/data/blogCompleteExtensions";
import useTheme from "@/hooks/useTheme";

const BlogCompleteGuide = ({ articleSlug }) => {
  const guide = useMemo(() => getCompleteGuideBySlug(articleSlug), [articleSlug]);
  const extension = useMemo(() => getGuideExtensionBySlug(articleSlug), [articleSlug]);
  const [isOpen, setIsOpen] = useState(false);
  const { isDark } = useTheme();

  if (!guide) return null;

  const paperBackground = isDark
    ? {
        backgroundColor: "#0E1726",
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.11) 1px, transparent 0)," +
          "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 45%, rgba(255,255,255,0.04) 100%)",
        backgroundSize: "16px 16px, 100% 100%",
        backgroundPosition: "0 0, 0 0",
      }
    : {
        backgroundColor: "#F5F8FC",
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.04) 1px, transparent 0)," +
          "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.35) 100%)",
        backgroundSize: "16px 16px, 100% 100%",
        backgroundPosition: "0 0, 0 0",
      };

  return (
    <section className="py-8 md:py-12 bg-[#F8F9FA] dark:bg-[#070A11]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-200 dark:border-[#2A2E39] bg-white dark:bg-[#0D1420] overflow-hidden">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-full flex items-center justify-between gap-4 px-4 py-4 sm:px-5 md:px-6 md:py-5 text-left"
            aria-expanded={isOpen}
            aria-controls={`complete-guide-${articleSlug}`}
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#1c3ff9]/10 text-[#1c3ff9]">
                <BookOpen className="w-5 h-5" />
              </span>
              <div>
                <p className="text-[15px] sm:text-base md:text-lg font-bold text-[#0A0A0A] dark:text-[#F3F6FF]">
                  Voir le blog complet
                </p>
                <p className="text-[13px] sm:text-sm text-[#52525B] dark:text-[#C2C8D8]">
                  Version longue avec les informations omises + sources.
                </p>
              </div>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-[#1c3ff9] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isOpen && (
            <div id={`complete-guide-${articleSlug}`} className="border-t border-gray-200 dark:border-[#2A2E39]">
              <div className="px-4 sm:px-5 md:px-6 pt-5 pb-4 bg-white dark:bg-[#0D1420]">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0A0A0A] dark:text-[#F3F6FF]">
                  {guide.fullTitle}
                </h3>
                <p className="mt-2 text-[14px] sm:text-sm md:text-base text-[#52525B] dark:text-[#C2C8D8]">
                  {guide.strapline}
                </p>
                {extension?.omittedIntro && (
                  <p className="mt-2 text-[14px] sm:text-sm md:text-base text-[#3F4758] dark:text-[#AEB8CD]">
                    {extension.omittedIntro}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                  {guide.sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="inline-flex items-center rounded-full border border-[#1c3ff9]/25 bg-[#1c3ff9]/7 dark:bg-[#1c3ff9]/15 px-2.5 py-1 sm:px-3 text-[11px] sm:text-xs font-semibold text-[#1c3ff9] dark:text-[#9DB6FF] hover:bg-[#1c3ff9]/12 dark:hover:bg-[#1c3ff9]/25 transition-colors"
                    >
                      {section.menu}
                    </a>
                  ))}
                </div>
              </div>

              <div className="px-3 pb-3 md:px-4 md:pb-4 bg-[#F3F4F6] dark:bg-[#090E17]">
                <article
                  className="rounded-xl border border-[#E8EAF0] dark:border-[#2A3448] shadow-sm px-4 py-5 sm:px-5 sm:py-6 md:px-8 md:py-8"
                  style={paperBackground}
                >
                  <div className="space-y-7 md:space-y-8">
                    {guide.sections.map((section) => (
                      <section key={section.id} id={section.id} className="scroll-mt-28">
                        <h4 className="text-[17px] sm:text-lg md:text-xl font-bold text-[#0A0A0A] dark:text-[#EDF3FF] mb-3">
                          {section.heading}
                        </h4>
                        <div className="space-y-3">
                          {section.paragraphs.map((paragraph, idx) => (
                            <p
                              key={`${section.id}-${idx}`}
                              className="text-[14.5px] sm:text-[15px] md:text-base leading-7 text-[#262B36] dark:text-[#C8D4EA]"
                            >
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </section>
                    ))}
                  </div>

                  {extension && (
                    <section className="mt-10 pt-6 border-t border-[#D7DBE6] dark:border-[#2C3750]">
                      <h4 className="text-lg font-bold text-[#0A0A0A] dark:text-[#EDF3FF] mb-2">
                        {extension.omittedTitle}
                      </h4>
                      <p className="text-[14.5px] sm:text-[15px] text-[#3B4354] dark:text-[#B2C0DA] mb-4">
                        Quand vous déroulez chaque bloc ci-dessous, vous retrouvez les détails non couverts dans le format court.
                      </p>

                      <div className="space-y-3">
                        {extension.omittedBlocks.map((block, blockIndex) => (
                          <details
                            key={`${block.heading}-${blockIndex}`}
                            open={blockIndex === 0}
                            className="group rounded-xl border border-[#D9E2F2] dark:border-[#2B3A57] bg-white/75 dark:bg-[#111C2E]/80 overflow-hidden"
                          >
                            <summary className="list-none cursor-pointer px-3.5 py-3 sm:px-4 flex items-center justify-between gap-3">
                              <span className="text-[14.5px] sm:text-[15px] md:text-base font-semibold text-[#0F2349] dark:text-[#DDE8FF]">
                                {block.heading}
                              </span>
                              <ChevronDown className="w-4 h-4 text-[#1c3ff9] dark:text-[#8EA9FF] shrink-0 transition-transform duration-200 group-open:rotate-180" />
                            </summary>
                            <div className="px-3.5 pb-4 sm:px-4">
                              <p className="text-[14.5px] sm:text-[15px] leading-7 text-[#303849] dark:text-[#BDCBE4] mb-3">{block.body}</p>
                              <ul className="space-y-2">
                                {block.bullets.map((bullet, bulletIndex) => (
                                  <li
                                    key={`${block.heading}-bullet-${bulletIndex}`}
                                    className="flex items-start gap-2 text-[14.5px] sm:text-[15px] leading-7 text-[#262B36] dark:text-[#D0DAEE]"
                                  >
                                    <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[#1c3ff9] dark:bg-[#8EA9FF]" />
                                    <span>{bullet}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </details>
                        ))}
                      </div>
                    </section>
                  )}

                  {extension?.checklists?.length > 0 && (
                    <section className="mt-8 pt-6 border-t border-[#D7DBE6] dark:border-[#2C3750]">
                      <h4 className="text-lg font-bold text-[#0A0A0A] dark:text-[#EDF3FF] mb-4">Checklists d'exécution</h4>
                      <div className="space-y-4">
                        {extension.checklists.map((checklist, checklistIndex) => (
                          <div
                            key={`${checklist.heading}-${checklistIndex}`}
                            className="rounded-xl border border-[#D9E2F2] dark:border-[#2B3A57] bg-white/80 dark:bg-[#111C2E]/80 px-3.5 py-4 sm:px-4"
                          >
                            <p className="text-[14.5px] sm:text-[15px] font-semibold text-[#0F2349] dark:text-[#DDE8FF] mb-3">{checklist.heading}</p>
                            <ul className="space-y-2">
                              {checklist.items.map((item, itemIndex) => (
                                <li
                                  key={`${checklist.heading}-item-${itemIndex}`}
                                  className="flex items-start gap-2 text-[14.5px] sm:text-[15px] leading-7 text-[#262B36] dark:text-[#D0DAEE]"
                                >
                                  <CircleCheckBig className="w-4 h-4 mt-1 text-[#1c3ff9] dark:text-[#8EA9FF] shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  <section className="mt-10 pt-6 border-t border-[#D7DBE6] dark:border-[#2C3750]">
                    <h4 className="text-lg font-bold text-[#0A0A0A] dark:text-[#EDF3FF] mb-3">Sources et références</h4>
                    <ul className="space-y-2">
                      {guide.sources.map((source) => (
                        <li key={source.url}>
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-start gap-2 text-[14.5px] sm:text-[15px] text-[#10389C] dark:text-[#9DB6FF] hover:text-[#0A2A72] dark:hover:text-[#C8D8FF] break-words"
                          >
                            <LinkIcon className="w-4 h-4 mt-1 flex-shrink-0" />
                            <span>{source.label}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </section>
                </article>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogCompleteGuide;
