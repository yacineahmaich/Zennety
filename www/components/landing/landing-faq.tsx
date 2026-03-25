import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  landingSection,
  landingStaggerChild,
  landingStaggerParent,
} from "@/lib/landing-motion";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { useInView } from "react-intersection-observer";

const faqIds = ["1", "2", "3", "4", "5"] as const;

export default function LandingFaq() {
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
          {t("landing-faq-title")}
        </motion.h2>
        <motion.p
          variants={landingStaggerChild}
          className="text-md mt-2 font-medium text-muted-foreground"
        >
          {t("landing-faq-subtitle")}
        </motion.p>
      </motion.div>

      <motion.div variants={landingStaggerParent} className="mx-auto max-w-4xl">
        <Accordion type="single" collapsible className="w-full">
          {faqIds.map((id) => (
            <motion.div key={id} variants={landingStaggerChild}>
              <AccordionItem value={id} className="border-secondary">
                <AccordionTrigger className="text-left hover:no-underline">
                  {t(`landing-faq-q${id}`)}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {t(`landing-faq-a${id}`)}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
    </motion.section>
  );
}
