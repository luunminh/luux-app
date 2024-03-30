import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/vi';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import weekday from 'dayjs/plugin/weekday';
import { FC, PropsWithChildren } from 'react';

dayjs.extend(weekday);
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.extend(duration);
dayjs.extend(advancedFormat);

dayjs.extend(relativeTime, {
  thresholds: [
    { l: 's', r: 1 },
    { l: 'm', r: 1 },
    { l: 'mm', r: 59, d: 'minute' },
    { l: 'h', r: 1 },
    { l: 'hh', r: 23, d: 'hour' },
    { l: 'd', r: 1 },
    { l: 'dd', r: 29, d: 'day' },
    { l: 'M', r: 1 },
    { l: 'MM', r: 11, d: 'month' },
    { l: 'y', r: 1 },
    { l: 'yy', d: 'year' },
  ],
  rounding: Math.floor,
});

type DayjsProviderProps = PropsWithChildren & {};

const DayjsProvider: FC<DayjsProviderProps> = ({ children }) => {
  return <>{children}</>;
};

export default DayjsProvider;
