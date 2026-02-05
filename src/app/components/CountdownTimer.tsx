import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  eventDate: string;
  eventEndTime: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ eventDate, eventEndTime }) => {
  const [timeRemaining, setTimeRemaining] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
  }>({ hours: 0, minutes: 0, seconds: 0, isExpired: false });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const targetDateTime = new Date(`${eventDate}T${eventEndTime}`);
      const now = new Date();
      const difference = targetDateTime.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeRemaining({ hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({ hours, minutes, seconds, isExpired: false });
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [eventDate, eventEndTime]);

  return (
    <div className="flex items-center gap-3 bg-slate-800/50 rounded-lg px-4 py-3 border border-slate-700">
      <Clock className="w-5 h-5 text-cyan-400" />
      <div className="flex items-center gap-2">
        <div className="text-center">
          <div className="text-2xl text-white tabular-nums">
            {String(timeRemaining.hours).padStart(2, '0')}
          </div>
          <div className="text-xs text-slate-400">Hours</div>
        </div>
        <div className="text-xl text-slate-500">:</div>
        <div className="text-center">
          <div className="text-2xl text-white tabular-nums">
            {String(timeRemaining.minutes).padStart(2, '0')}
          </div>
          <div className="text-xs text-slate-400">Minutes</div>
        </div>
        <div className="text-xl text-slate-500">:</div>
        <div className="text-center">
          <div className="text-2xl text-white tabular-nums">
            {String(timeRemaining.seconds).padStart(2, '0')}
          </div>
          <div className="text-xs text-slate-400">Seconds</div>
        </div>
      </div>
      {timeRemaining.isExpired && (
        <span className="ml-2 text-red-400 text-sm">Expired</span>
      )}
    </div>
  );
};
