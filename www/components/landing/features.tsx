import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
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
    <motion.section ref={ref} className="space-y-10">
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mx-auto w-fit bg-secondary px-2 text-3xl font-black text-primary"
        >
          Discover the Flow
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-md mt-2 font-medium text-muted-foreground"
        >
          Take a guided tour through the app&apos;s smartest features.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="mx-auto max-w-7xl space-y-2"
      >
        <div className="flex items-center gap-2 overflow-x-auto p-1 [&>button]:w-full">
          {features.map((feature, idx) => (
            <Button
              key={idx}
              size="sm"
              className="space-x-2"
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
                  activeTab === idx ? "text-secondary" : "text-muted-foreground"
                )}
              >
                {feature.title}
              </span>
            </Button>
          ))}
        </div>

        <div className="overflow-hidden rounded-xl border-8 border-secondary shadow-xl">
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
        </div>
      </motion.div>
    </motion.section>
  );
}

const features = [
  {
    title: "Create Workspace",
    image: "../../assets/features/01 - Create Workspace.png",
    imageDark: "../../assets/features/01 - Create Workspace (dark).png",
  },
  {
    title: "Create board",
    image: "../../assets/features/02 - Create Board.png",
    imageDark: "../../assets/features/02 - Create Board (dark).png",
  },
  {
    title: "Create cards",
    image: "../../assets/features/03 - Create card.png",
    imageDark: "../../assets/features/03 - Create card (dark).png",
  },
  {
    title: "Invite members",
    image: "../../assets/features/05 - Inivte members.png",
    imageDark: "../../assets/features/05 - Inivte members (dark).png",
  },
];
