import React from "react";

export default function Heart(props) {
  return (
    <svg
      onClick={props.addFavorite}
      version="1.1"
      className={"favorite"}
      width="25px"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      style={{ fill: "slategrey" }}
    >
      <defs>
        <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop
            offset="0%"
            style={{ stopColor: "slategray", stopOpacity: 1 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: "#dbeaf5", stopOpacity: 1 }}
          />
        </linearGradient>
        <linearGradient id="grad3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#fdb4cd", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#d6628a", stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
      <g transform="matrix(0.103301,0,0,0.103301,5.88917,5.88923)">
        <path
          d="M339.266,65.896C319.429,46.068 293.06,35.148 265.012,35.148C248.764,35.148 233.304,38.676 219.063,45.635L185.004,62.283L150.934,45.63C136.697,38.675 121.24,35.147 104.995,35.147C76.944,35.147 50.568,46.073 30.722,65.914C11.073,85.566 0.162,111.719 0.002,139.554C-0.158,167.357 10.424,193.613 29.8,213.484C30.624,214.329 31.48,215.146 32.365,215.925L153.396,322.888C162.422,330.864 173.712,334.853 185.002,334.853C196.292,334.853 207.582,330.864 216.608,322.888L337.651,215.916C338.539,215.129 339.399,214.314 340.227,213.462C359.592,193.588 370.166,167.335 369.999,139.532C369.831,111.702 358.92,85.555 339.266,65.896Z"
          style={{ fill: props.favorite ? "url(#grad3)" : "url(#grad2)" }}
        />
      </g>
      <g transform="matrix(0.103301,0,0,0.103301,5.88917,5.88923)">
        <path
          d="M106.516,35.157C121.927,35.472 137.103,38.995 150.934,45.63L185.004,62.283C229.037,40.76 279.48,24.955 321.086,51.325C373.74,84.697 386.469,168.648 338.962,214.713L338.312,215.32C296.097,253.379 257.083,296.665 211.307,326.954C194.265,338.23 170.421,336.94 154.249,323.624C112.984,288.005 72.262,251.758 31.707,215.334C-2.497,183.38 -9.802,124.931 16.262,83.931C35.628,53.465 68.146,34.897 106.516,35.157ZM103.952,57.393C40.297,58.556 -5.984,147.79 46.396,198.623C86.117,235.731 127.435,271.102 168.584,306.62C177.867,314.264 192.105,314.29 201.42,306.62C242.576,271.095 283.898,235.715 323.629,198.603C362.862,160.561 347.417,79.359 290.115,61.23C270.08,54.892 247.914,56.458 228.757,65.65L194.77,82.263C185.79,86.238 182.272,85.377 175.238,82.263C151.503,70.661 130.905,57.229 103.952,57.393Z"
          style={{ fill: "grey" }}
        />
      </g>
      <g transform="matrix(0.135135,0,0,0.135135,-2.8624e-05,4.97616e-05)">
        <path
          d="M106.516,35.157C121.918,35.472 137.022,38.956 150.934,45.63L185.004,62.283L219.063,45.635C227.028,41.813 229.066,41.235 234.164,39.679C285.2,24.095 346.201,53.75 364.2,105.569C377.222,143.059 367.347,188.198 338.312,215.32C297.82,251.825 257.232,288.242 215.755,323.624C198.592,337.924 171.517,338.012 154.249,323.624C112.777,288.246 72.262,251.758 31.707,215.334C-2.497,183.38 -9.802,124.931 16.262,83.931C35.628,53.465 68.146,34.897 106.516,35.157ZM103.827,47.154C32.967,48.449 -21.14,147.348 39.335,206.038L39.813,206.485C80.245,242.799 120.637,279.178 161.984,314.449C174.873,325.188 195.099,325.215 208.02,314.449C249.369,279.176 289.831,242.871 330.198,206.479C374.54,165.058 358.817,72.226 293.203,51.468C270.728,44.358 245.798,46.116 224.294,56.435L190.274,73.064C185.111,75.272 184.629,75.157 179.734,73.064L145.704,56.43C132.708,50.196 118.356,47.066 103.827,47.154Z"
          style={{}}
        />
      </g>
    </svg>
  );
}