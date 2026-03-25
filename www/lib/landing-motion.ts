/** Shared framer-motion presets for landing page sections */
export const landingEase = [0.22, 1, 0.36, 1] as const;

/** Orchestrates stagger timing between major blocks (e.g. header vs content). */
export const landingSection = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.04 },
  },
};

/** Stagger children inside a block (headings, cards, FAQ rows). */
export const landingStaggerParent = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

export const landingStaggerChild = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: landingEase },
  },
};

/** Slightly snappier for small controls (feature tabs). */
export const landingStaggerTab = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: landingEase },
  },
};
