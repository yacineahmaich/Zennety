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
    <section className="relative min-h-screen overflow-hidden py-16 sm:py-32">
      <div className="container mx-auto px-4">
        <motion.div ref={ref} className="flex flex-col items-center pt-24">
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
            transition={{ duration: 0.4, delay: 0.2 }}
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
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            {t("hero-subtitle")}
          </motion.p>

          <motion.div
            className="flex w-full flex-col gap-4 sm:flex-row sm:justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.6 }}
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

      <div className="absolute bottom-2 left-0 flex w-full justify-center">
        <svg width="60" height="145" viewBox="0 0 179 145" fill="none">
          <motion.path
            initial={{ opacity: 0, pathLength: 0 }}
            animate={inView ? { opacity: 1, pathLength: 1 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
            d="M175.8 53.8932C170.66 20.7707 154.662 -4.95342 116.689 6.07096C87.437 14.5634 68.7256 54.0726 89.4889 80.0265C94.4637 86.245 105.553 85.2891 111.889 81.8043C121.912 76.2915 124.3 66.5962 121.4 55.8488C116.132 36.3252 94.5076 16.8156 73.2222 22.9599C39.9122 32.5751 23.357 66.341 19.9778 98.7821C19.3047 105.244 22.4114 153.806 29.4 127.404C30.6683 122.613 33.9004 108.124 32.3333 112.827C29.735 120.623 28.6 125.112 28.6 133.538C28.6 135.21 29.8227 143.952 26.1111 140.915C18.5116 134.698 10.4687 129.095 3 122.693"
            stroke="hsl(var(--primary))"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
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
