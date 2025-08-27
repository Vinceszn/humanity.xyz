import React, { useMemo } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table';

interface RankedItemUI {
  archetype: string;
  letter: string;
  score: number;
  description: string;
}

const BetterResultsTable: React.FC<{ data: RankedItemUI[] }> = ({ data }) => {
  const [sorting, setSorting] = React.useState<SortingState>([{ id: 'score', desc: true }]);

  const columns = useMemo<ColumnDef<RankedItemUI>[]>(() => [
    {
      id: 'rank',
      header: '#',
      cell: info => info.row.index + 1,
      size: 40
    },
    {
      accessorKey: 'archetype',
      header: 'Archetype',
      cell: info => (
        <div className="font-medium">
          {info.getValue<string>()}
          <span className="ml-2 text-xs text-gray-500">({info.row.original.letter})</span>
        </div>
      )
    },
    {
      accessorKey: 'score',
      header: 'Score',
      cell: info => (
        <div className="flex items-center gap-3">
          <div className="w-28 h-2 rounded-full bg-gray-200 overflow-hidden">
            <div className="h-2 rounded-full bg-gray-900" style={{ width: `${Math.round(info.getValue<number>())}%` }} />
          </div>
          <span className="text-sm text-gray-700 w-10">{Math.round(info.getValue<number>())}</span>
        </div>
      ),
      sortingFn: 'basic'
    },
    {
      accessorKey: 'description',
      header: 'Summary',
      cell: info => <span className="text-sm text-gray-600">{info.getValue<string>()}</span>,
    }
  ], []);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: false
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-600 select-none"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="inline-flex items-center gap-1">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{ asc: '▲', desc: '▼' }[header.column.getIsSorted() as 'asc' | 'desc'] || null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-3 align-top">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BetterResultsTable;
