import { ITableProps } from './table.interface';

export const Table = ({ header, body, className, ...props }: ITableProps) => {
  const Header = header.map((word, i) => (
    <th scope="col" className="px-6 py-3" key={'header#' + i}>
      {word}
    </th>
  ));
  const Body = body.map((row, i) => (
    <tr
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
      key={'row#' + i}
    >
      {row.map((word, j) => (
        <td
          scope="row"
          className={
            j === 0
              ? 'px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
              : 'px-6 py-4'
          }
          key={`row#${i}-word#${j}`}
        >
          {word}
        </td>
      ))}
    </tr>
  ));

  return (
    <div className={'relative overflow-x-auto ' + className} {...props}>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>{Header}</tr>
        </thead>
        <tbody>{Body}</tbody>
      </table>
    </div>
  );
};
