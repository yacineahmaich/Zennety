import { Button } from "@/components/ui/button";
import app from "@/lib/app";
import { route } from "@/lib/routes";
import { motion } from "framer-motion";
import { GithubIcon, StepForwardIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

const Hero = () => {
  const { t } = useTranslation("common");
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="min-h-screen overflow-hidden py-24">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="flex flex-col items-center pt-24"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="mb-8 flex w-full max-w-4xl justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <ShinyStar />
            <ShinyStar />
          </motion.div>

          <motion.h1
            className="mx-auto max-w-4xl text-4xl font-bold leading-[2.8rem] sm:text-center sm:text-5xl sm:leading-[3.8rem]"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="bg-secondary px-2 text-primary">Simplify</span>{" "}
            your tasks.{" "}
            <span className="bg-secondary px-2 text-primary">Enhance</span> your
            efficiency.{" "}
            <span className="bg-secondary px-2 text-primary">Reach</span> new
            heights.
          </motion.h1>
          <motion.p
            className="mx-auto mb-8 mt-4 max-w-2xl text-center text-lg text-gray-500 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t("hero-subtitle")}
          </motion.p>

          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button asChild size="lg" className="flex items-center gap-2">
              <Link href={route("login")}>
                <StepForwardIcon size={16} />
                <span>{t("get-started")}</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="flex items-center gap-2"
            >
              <a href={app.repositoryUrl} target="_blank">
                <GithubIcon size={16} />
                <span>{t("star-on-github")}</span>
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const ShinyStar = () => (
  <motion.svg
    width="40"
    height="40"
    viewBox="0 0 200 200"
    initial={{ rotate: 0 }}
    animate={{ rotate: 360 }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
  >
    <g clipPath="url(#clip0_118_208)">
      <motion.path
        d="M100 200C97.1048 105.262 94.738 102.91 0 100C94.738 97.1048 97.0903 94.738 100 0C102.895 94.738 105.262 97.0903 200 100C105.262 102.91 102.91 105.233 100 200Z"
        fill="url(#paint0_linear_118_208)"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1.2 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_118_208"
        x1="14"
        y1="26"
        x2="179"
        y2="179.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="hsl(var(--primary))" />
        <stop offset="1" stopColor="hsl(var(--primary))" />
      </linearGradient>
      <clipPath id="clip0_118_208">
        <rect width="200" height="200" fill="white" />
      </clipPath>
    </defs>
  </motion.svg>
);

export default Hero;
