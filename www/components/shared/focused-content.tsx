import { PropsWithChildren, useEffect, useRef } from "react";

type Props = {
  onBlur: () => void;
} & React.ComponentPropsWithoutRef<"div">;

const FocusedContent = ({ onBlur, ...props }: PropsWithChildren<Props>) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!target || !containerRef.current) return;

      // skip clicks inside popover
      const popperWrapper = target.closest(
        "[data-radix-popper-content-wrapper]"
      );

      if (!containerRef.current.contains(target) && !popperWrapper) {
        onBlur();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return <div ref={containerRef} {...props} />;
};

export default FocusedContent;
