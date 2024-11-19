import { SVGProps } from "react";

interface LogoProps extends SVGProps<SVGSVGElement> {}

const Logo = (props: LogoProps) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 111 111"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="6" y="6" width="105" height="105" rx="10" fill="fill-primary" />
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
