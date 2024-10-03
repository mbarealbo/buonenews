import type { Sentiment } from "@/utils/openai/types";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";
import React, { useEffect, useState } from "react";

type MoodItemProps = {
  emoji: string;
  label: string;
};

const MoodItem = (props: MoodItemProps) => (
  <div className="flex items-center gap-2.5 whitespace-nowrap text-slate-900">
    <span className="text-xl">{props.emoji}</span>
    <span className="text-base font-semibold">{props.label}</span>
  </div>
);

const Logo = () => {
  const [mood, setMood] = useState<Sentiment | null>(null);

  const handleValueChange = (value: Sentiment) => {
    setMood(value);
    window.location.href =
      value === "positive" ? "https://buone.news" : "https://cattive.news";
  };

  useEffect(() => {
    const domain = window.location.hostname;
    const sentiment = domain.includes("buone") ? "positive" : "negative";
    setMood(sentiment);
  }, []);

  if (!mood) return null;

  return (
    <Select.Root value={mood} onValueChange={handleValueChange}>
      <Select.Trigger
        aria-label="Mood"
        className="inline-flex items-center justify-center gap-3 outline-none border-[1px] border-slate-300 px-2.5 py-1.5 rounded-md hover:bg-slate-100"
      >
        <Select.Value />
        {/* <Select.Icon className="text-violet11">(d)</Select.Icon> */}
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden bg-white border-[1px] rounded-lg p-0.5 border-border border-slate-300">
          <Select.Viewport>
            <SelectItem value="positive">
              <MoodItem emoji="😎" label="hey, buone news!" />
            </SelectItem>
            <SelectItem value="negative">
              <MoodItem emoji="👹" label="ehm, cattive news..." />
            </SelectItem>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

const SelectItem = React.forwardRef<
  React.ElementRef<typeof Select.Item>,
  React.ComponentPropsWithoutRef<typeof Select.Item>
>(({ className, children, ...props }, forwardedRef) => {
  return (
    <Select.Item
      className={classnames(
        "flex items-center relative select-none outline-none cursor-pointer px-4 py-1 m-0.5 rounded-md  data-[highlighted]:outline-none data-[highlighted]:bg-slate-200 data-[state=checked]:bg-orange-200",
        className,
      )}
      {...props}
      ref={forwardedRef}
    >
      <Select.ItemText>{children}</Select.ItemText>
      {/* <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center"> */}
      {/*   (c) */}
      {/* </Select.ItemIndicator> */}
    </Select.Item>
  );
});

export default Logo;
