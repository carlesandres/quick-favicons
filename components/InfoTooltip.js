import { Popover } from '@headlessui/react'

const InfoTooltip = (props) => {
  const { children } = props;

  return (
    <Popover className="relative">
      <Popover.Button>
        <div className="rounded-full bg-gray-100 inline-flex w-6 
          hover:text-gray-500 transition-all
          h-6 items-center justify-center">
          i
        </div>
      </Popover.Button>

      <Popover.Panel className="absolute z-10">
        <div className="border bg-gray-50 p-2 text-sm">{children}</div>
      </Popover.Panel>
    </Popover>
  );
};

export default InfoTooltip;
