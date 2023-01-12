import { ICardProps } from './card.interface';

export const Card = ({ header, link, date }: ICardProps) => (
  <div className="flex items-center justify-center my-4 ">
    <div className="rounded-xl border p-5 shadow-md  bg-white w-full">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="text-lg font-bold text-slate-700">{header}</div>
        </div>
        <div className="flex items-center space-x-8">
          <button
            onClick={() => {
              window.open(link, '__blank');
            }}
            className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold"
          >
            To Post
          </button>
          <div className="text-xs text-neutral-500">
            {new Date(date).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* <div className="mt-4 mb-6">
        <div className="mb-3 text-xl font-bold">{subHeader}</div>
        <div className="text-sm text-neutral-600">{description}</div>
      </div> */}

      <div></div>
    </div>
  </div>
);
