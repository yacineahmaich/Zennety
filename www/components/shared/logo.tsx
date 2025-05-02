import { SVGProps } from "react";

export interface LogoProps extends SVGProps<SVGSVGElement> {
  variant?: "small" | "large";
}

const Logo = ({ variant = "large", ...props }: LogoProps) => {
  if (variant === "large") {
    return (
      <svg
        width="auto"
        height="40"
        viewBox="0 0 448 111"
        fill="none"
        {...props}
      >
        <rect
          x="6"
          y="6"
          width="105"
          height="105"
          rx="10"
          className="fill-primary"
        />
        <rect width="105" height="105" rx="10" className="fill-primary" />
        <rect
          x="11"
          y="11"
          width="83"
          height="83"
          className="fill-background"
        />
        <path
          d="M33.1818 76V69L55.1818 39.6364H33.2727V29.4545H71.2727V36.4545L49.2727 65.8182H71.1818V76H33.1818Z"
          className="fill-primary"
        />
        <rect
          x="44"
          y="46.9172"
          width="4"
          height="20"
          transform="rotate(-46.828 44 46.9172)"
          className="fill-background"
        />
        <rect
          x="32"
          y="67.9172"
          width="4"
          height="20"
          transform="rotate(-46.828 32 67.9172)"
          className="fill-background"
        />
        <rect
          x="56"
          y="27.9172"
          width="4"
          height="20"
          transform="rotate(-46.828 56 27.9172)"
          className="fill-background"
        />
        <path
          d="M141.182 78V71L163.182 41.6364H141.273V31.4545H179.273V38.4545L157.273 67.8182H179.182V78H141.182ZM185.438 78V31.4545H218.983V41.6364H198.074V49.6364H217.256V59.8182H198.074V67.8182H218.892V78H185.438ZM265.523 31.4545V78H254.977L238.159 53.5455H237.886V78H225.25V31.4545H235.977L252.523 55.8182H252.886V31.4545H265.523ZM311.773 31.4545V78H301.227L284.409 53.5455H284.136V78H271.5V31.4545H282.227L298.773 55.8182H299.136V31.4545H311.773ZM317.75 78V31.4545H351.295V41.6364H330.386V49.6364H349.568V59.8182H330.386V67.8182H351.205V78H317.75ZM356.29 41.6364V31.4545H396.744V41.6364H382.744V78H370.29V41.6364H356.29ZM399.591 31.4545H413.682L422.773 50.3636H423.136L432.227 31.4545H446.318L429.227 63.3636V78H416.682V63.3636L399.591 31.4545Z"
          className="fill-primary"
        />
        <rect
          x="140"
          y="70.9172"
          width="4"
          height="20"
          transform="rotate(-46.828 140 70.9172)"
          className="fill-background"
        />
        <rect
          x="165"
          y="30.9172"
          width="4"
          height="20"
          transform="rotate(-46.828 165 30.9172)"
          className="fill-background"
        />
        <rect
          x="150"
          y="49.9172"
          width="4"
          height="20"
          transform="rotate(-46.828 150 49.9172)"
          className="fill-background"
        />
        <rect
          x="182"
          y="66.9172"
          width="4"
          height="20"
          transform="rotate(-46.828 182 66.9172)"
          className="fill-background"
        />
        <rect
          x="202"
          y="30.9172"
          width="4"
          height="20"
          transform="rotate(-46.828 202 30.9172)"
          className="fill-background"
        />
        <rect
          x="335"
          y="30.9172"
          width="4"
          height="20"
          transform="rotate(-46.828 335 30.9172)"
          className="fill-background"
        />
        <rect
          x="315"
          y="67.9172"
          width="4"
          height="20"
          transform="rotate(-46.828 315 67.9172)"
          className="fill-background"
        />
        <rect
          x="367"
          y="64.9172"
          width="4"
          height="20"
          transform="rotate(-46.828 367 64.9172)"
          className="fill-background"
        />
        <rect
          x="380"
          y="30.9172"
          width="4"
          height="20"
          transform="rotate(-46.828 380 30.9172)"
          className="fill-background"
        />
        <rect
          x="427"
          y="33.9172"
          width="4"
          height="20"
          transform="rotate(-46.828 427 33.9172)"
          className="fill-background"
        />
        <rect
          x="413"
          y="67.9172"
          width="4"
          height="20"
          transform="rotate(-46.828 413 67.9172)"
          className="fill-background"
        />
        <rect
          x="238.015"
          y="35"
          width="4"
          height="27.0104"
          transform="rotate(39.0463 238.015 35)"
          className="fill-background"
        />
        <rect
          x="267.83"
          y="58"
          width="4"
          height="27.0104"
          transform="rotate(41.3084 267.83 58)"
          className="fill-background"
        />
        <rect
          x="268"
          y="37.3008"
          width="4"
          height="28.0352"
          transform="rotate(-35.1123 268 37.3008)"
          className="fill-background"
        />
        <rect
          x="295"
          y="32.3008"
          width="4"
          height="29.1593"
          transform="rotate(-35.1123 295 32.3008)"
          className="fill-background"
        />
      </svg>
    );
  }

  return (
    <svg width="111" height="111" viewBox="0 0 111 111" fill="none" {...props}>
      <rect
        x="6"
        y="6"
        width="105"
        height="105"
        rx="10"
        className="fill-primary"
      />
      <rect width="105" height="105" rx="10" className="fill-primary" />
      <rect x="11" y="11" width="83" height="83" className="fill-background" />
      <path
        d="M33.1818 76V69L55.1818 39.6364H33.2727V29.4545H71.2727V36.4545L49.2727 65.8182H71.1818V76H33.1818Z"
        className="fill-primary"
      />
      <rect
        x="44"
        y="46.9172"
        width="4"
        height="20"
        transform="rotate(-46.828 44 46.9172)"
        className="fill-background"
      />
      <rect
        x="32"
        y="67.9172"
        width="4"
        height="20"
        transform="rotate(-46.828 32 67.9172)"
        className="fill-background"
      />
      <rect
        x="56"
        y="27.9172"
        width="4"
        height="20"
        transform="rotate(-46.828 56 27.9172)"
        className="fill-background"
      />
    </svg>
  );
};

export default Logo;
