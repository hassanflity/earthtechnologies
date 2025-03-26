interface IconSpecs {
  w: number;
  h: number;
  color?: string;
}

const back = (props: IconSpecs) => {
  const { w, h, color } = props;
  const fillColor = color || '#ffffff';

  return (
    <svg
      fill={fillColor}
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      width={w}
      height={h}
      viewBox='0 0 42 42'
    >
      <g transform='matrix(-1,-1.22465e-16,1.22465e-16,-1,43.4767,39.9943)'>
        <path d='M6.604,20.468C6.207,20.071 5.994,19.542 5.994,18.995C5.994,18.448 6.207,17.918 6.604,17.522L16.519,7.606C17.332,6.793 18.652,6.793 19.465,7.606C20.278,8.419 20.278,9.74 19.465,10.553L13.106,16.912L36.875,16.911C38.025,16.911 38.959,17.845 38.959,18.995C38.959,20.145 38.025,21.078 36.875,21.078L13.106,21.078L19.465,27.437C20.278,28.25 20.278,29.57 19.465,30.383C18.652,31.196 17.332,31.196 16.519,30.383L6.604,20.468Z' />
      </g>
    </svg>
  );
};

export default back;
