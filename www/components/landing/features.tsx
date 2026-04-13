import {
  landingEase,
  landingSection,
  landingStaggerChild,
  landingStaggerParent,
  landingStaggerTab,
} from "@/lib/landing-motion";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Button } from "../ui/button";

export default function Features() {
  const [activeTab, setActiveTab] = useState(0);

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
          Discover the Flow
        </motion.h2>
        <motion.p
          variants={landingStaggerChild}
          className="text-md mt-2 font-medium text-muted-foreground"
        >
          Take a guided tour through the app&apos;s smartest features.
        </motion.p>
      </motion.div>

      <motion.div variants={landingStaggerParent} className="space-y-2">
        <motion.div
          variants={landingStaggerParent}
          className="flex items-center gap-2 overflow-x-auto p-1 [&>button]:w-full"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={landingStaggerTab}
              className="flex-1 !flex-shrink-0"
            >
              <Button
                size="sm"
                className="w-full space-x-2"
                variant={activeTab === idx ? "default" : "secondary"}
                onClick={() => setActiveTab(idx)}
              >
                <span
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-primary",
                    activeTab === idx ? "bg-secondary" : "bg-background"
                  )}
                >
                  {(idx + 1).toString().padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "font-semibold",
                    activeTab === idx
                      ? "text-secondary"
                      : "text-muted-foreground"
                  )}
                >
                  {feature.title}
                </span>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={landingStaggerChild} className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.38, ease: landingEase }}
              className="aspect-[1468/835] overflow-hidden rounded-xl border-2 border-secondary bg-muted"
            >
              <img
                src={features[activeTab].image}
                className="dark:hidden"
                alt={features[activeTab].title}
              />
              <img
                src={features[activeTab].imageDark}
                alt={features[activeTab].title}
                className="hidden dark:block"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

const features = [
  {
    title: "Create Workspace",
    image: "/assets/features/01-create-workspace.png",
    imageDark: "/assets/features/01-create-workspace-dark.png",
  },
  {
    title: "Create board",
    image: "/assets/features/02-create-board.png",
    imageDark: "/assets/features/02-create-board-dark.png",
  },
  {
    title: "Create cards",
    image: "/assets/features/03-create-card.png",
    imageDark: "/assets/features/03-create-card-dark.png",
  },
  {
    title: "Invite members",
    image: "/assets/features/05-invite-members.png",
    imageDark: "/assets/features/05-invite-members-dark.png",
  },
];
