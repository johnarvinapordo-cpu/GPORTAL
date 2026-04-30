"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue'> {
  min?: number;
  max?: number;
  step?: number;
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
}

function Slider({ className, min = 0, max = 100, step = 1, value, defaultValue, onValueChange, ...props }: SliderProps) {
  const [values, setValues] = React.useState(defaultValue ?? [min, max]);

  React.useEffect(() => {
    if (value !== undefined) {
      setValues(value);
    }
  }, [value]);

  const handleChange = (newValue: number[]) => {
    setValues(newValue);
    onValueChange?.(newValue);
  };

  const percentage = ((values[0] - min) / (max - min)) * 100;

  return (
    <div className="relative w-full">
      <div className="relative h-2 w-full">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={values[0]}
          onChange={(e) => handleChange([Number(e.target.value), values[1]])}
          className={cn(
            "absolute h-full w-full appearance-none bg-transparent cursor-pointer",
            "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer",
            className,
          )}
          {...props}
        />
        <div className="absolute h-full w-full rounded-full bg-primary/20">
          <div
            className={`h-full bg-primary rounded-full transition-all w-[${percentage}%]`}
          />
        </div>
      </div>
    </div>
  );
}

export { Slider };
