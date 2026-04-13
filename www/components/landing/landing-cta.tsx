import { Button } from "@/components/ui/button";
import { landingSection, landingStaggerChild } from "@/lib/landing-motion";
import { route } from "@/lib/routes";
import { motion } from "framer-motion";
import { StepForwardIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

export default function LandingCta() {
  const { t } = useTranslation("common");
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      ref={ref}
      className="rounded-2xl border-t border-secondary bg-secondary/10 px-6 py-12 pb-24 text-center sm:px-12"
      variants={landingSection}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.h2
        variants={landingStaggerChild}
        className="mx-auto w-fit font-black text-primary sm:text-3xl"
      >
        {t("landing-cta-title")}
      </motion.h2>
      <motion.p
        variants={landingStaggerChild}
        className="mx-auto mt-4 max-w-xl text-muted-foreground"
      >
        {t("landing-cta-subtitle")}
      </motion.p>
      <motion.div
        variants={landingStaggerChild}
        className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
      >
        <Button asChild size="lg" className="flex items-center gap-2">
          <Link href={route("register")}>
            <StepForwardIcon size={16} />
            <span>{t("get-started")}</span>
          </Link>
        </Button>
      </motion.div>
    </motion.section>
  );
}
