const Loader = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      width="50"
      height="50"
      style={{
        shapeRendering: "auto",
      }}
      className="mx-auto block bg-transparent fill-foreground"
    >
      <g>
        <circle cx="84" cy="50" r="10">
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="0.5"
            calcMode="spline"
            keyTimes="0;1"
            values="10;0"
            keySplines="0 0.5 0.5 1"
            begin="0s"
          ></animate>
          <animate
            attributeName="fill"
            repeatCount="indefinite"
            dur="1.3157894736842106s"
            calcMode="discrete"
            keyTimes="0;0.25;0.5;0.75;1"
            // values="#000000;#000000;#000000;#000000;#000000"
            begin="0s"
          ></animate>
        </circle>
        <circle cx="16" cy="50" r="10">
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="1.3157894736842106s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="0;0;10;10;10"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="0s"
          ></animate>
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="1.3157894736842106s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="16;16;16;50;84"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="0s"
          ></animate>
        </circle>
        <circle cx="50" cy="50" r="10">
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="1.3157894736842106s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="0;0;10;10;10"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-0.32894736842105265s"
          ></animate>
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="1.3157894736842106s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="16;16;16;50;84"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-0.32894736842105265s"
          ></animate>
        </circle>
        <circle cx="84" cy="50" r="10">
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="1.3157894736842106s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="0;0;10;10;10"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-0.6578947368421053s"
          ></animate>
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="1.3157894736842106s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="16;16;16;50;84"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-0.6578947368421053s"
          ></animate>
        </circle>
        <circle cx="16" cy="50" r="10">
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="1.3157894736842106s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="0;0;10;10;10"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-0.9868421052631579s"
          ></animate>
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="1.3157894736842106s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="16;16;16;50;84"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-0.9868421052631579s"
          ></animate>
        </circle>
        <g></g>
      </g>
    </svg>
  );
};

export default Loader;
