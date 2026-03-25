import {
  landingSection,
  landingStaggerChild,
  landingStaggerParent,
} from "@/lib/landing-motion";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Building2, Kanban, Ticket, UsersRound } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useInView } from "react-intersection-observer";

const steps = [
  { key: "1" as const, icon: Building2 },
  { key: "2" as const, icon: Kanban },
  { key: "3" as const, icon: Ticket },
  { key: "4" as const, icon: UsersRound },
];

export default function HowItWorks() {
  const { t } = useTranslation("common");
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      ref={ref}
      className="space-y-10"
      variants={landingSection}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.div variants={landingStaggerParent} className="text-center">
        <motion.h2
          variants={landingStaggerChild}
          className="mx-auto w-fit bg-secondary px-2 text-3xl font-black text-primary"
        >
          {t("landing-how-it-works-title")}
        </motion.h2>
        <motion.p
          variants={landingStaggerChild}
          className="text-md mx-auto mt-2 max-w-2xl font-medium text-muted-foreground"
        >
          {t("landing-how-it-works-subtitle")}
        </motion.p>
      </motion.div>

      <motion.ul
        variants={landingStaggerParent}
        className="grid gap-6 sm:grid-cols-2"
      >
        {steps.map(({ key, icon: Icon }, idx) => (
          <motion.li
            key={key}
            variants={landingStaggerChild}
            whileHover={{ y: -4, transition: { duration: 0.22 } }}
            className={cn(
              "flex flex-col rounded-xl border-2 border-secondary bg-card p-6 shadow-sm",
              "transition-shadow hover:shadow-md"
            )}
          >
            <motion.span
              className={cn(
                "mb-4 flex h-12 w-12 items-center justify-center rounded-full",
                "bg-secondary text-primary"
              )}
              aria-hidden
              initial={false}
              whileHover={{ scale: 1.06, rotate: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
            >
              <Icon className="h-6 w-6" strokeWidth={2} />
            </motion.span>
            <span className="mb-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">
              {(idx + 1).toString().padStart(2, "0")}
            </span>
            <h3 className="mb-2 font-semibold leading-snug">
              {t(`landing-step-${key}-title`)}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t(`landing-step-${key}-desc`)}
            </p>
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  );
}
