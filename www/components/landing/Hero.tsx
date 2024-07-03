import { GithubIcon, StepForwardIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import { Button } from "../ui/button";

const Hero = () => {
  const { t } = useTranslation("common");

  return (
    <main className="flex flex-col items-center gap-4 py-10 sm:py-24 lg:py-32">
      <div>
        <div className="flex justify-between">
          <svg width="40" height="40" viewBox="0 0 200 200">
            <g clip-path="url(#clip0_118_208)">
              <path
                d="M100 200C97.1048 105.262 94.738 102.91 0 100C94.738 97.1048 97.0903 94.738 100 0C102.895 94.738 105.262 97.0903 200 100C105.262 102.91 102.91 105.233 100 200Z"
                fill="url(#paint0_linear_118_208)"
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
                <stop stop-color="#E9B8FF" />
                <stop offset="1" stop-color="#F9ECFF" />
              </linearGradient>
              <clipPath id="clip0_118_208">
                <rect width="200" height="200" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <svg width="40" height="40" viewBox="0 0 200 200">
            <g clip-path="url(#clip0_118_208)">
              <path
                d="M100 200C97.1048 105.262 94.738 102.91 0 100C94.738 97.1048 97.0903 94.738 100 0C102.895 94.738 105.262 97.0903 200 100C105.262 102.91 102.91 105.233 100 200Z"
                fill="url(#paint0_linear_118_208)"
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
                <stop stop-color="#E9B8FF" />
                <stop offset="1" stop-color="#F9ECFF" />
              </linearGradient>
              <clipPath id="clip0_118_208">
                <rect width="200" height="200" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>

        <h1 className="mx-auto max-w-4xl text-center text-3xl font-bold leading-[2rem] sm:text-5xl sm:leading-[3.5rem]">
          <span className="text-pink-400">Simplify</span> your tasks.{" "}
          <span className="text-pink-400">Enhance</span> your efficiency.{" "}
          <span className="text-pink-400">Reach</span> new heights.
        </h1>
        <p className="pb-4 pt-2 text-center text-gray-500">
          {t("hero-subtitle")}
        </p>
        <div className="flex justify-center gap-4">
          <Button className="flex items-center gap-2 bg-gradient-to-tr from-pink-400 via-pink-600 to-gray-400">
            {/* <CornerDownRightIcon size={14} /> */}
            <StepForwardIcon size={14} />
            <span>{t("get-started")}</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <GithubIcon size={14} />
            <span>{t("star-on-github")}</span>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Hero;
