import { IMAGES } from '@config/images';

type Props = {
  color: string;
  x: number;
  y: number;
  name?: string;
};

const Cursor = ({ color, x, y, name }: Props) => (
  <div
    className="pointer-events-none absolute left-0 top-0"
    style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
  >
    <IMAGES.CursorSVG color={color} />

    {name && (
      <div
        className="absolute left-2 top-5 rounded-3xl px-4 py-2"
        style={{ backgroundColor: color, borderRadius: 20 }}
      >
        <p className="whitespace-nowrap text-sm leading-relaxed text-white">{name}</p>
      </div>
    )}
  </div>
);

export default Cursor;
