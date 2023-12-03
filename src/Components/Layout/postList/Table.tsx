import React, { HTMLAttributes, HTMLProps, useEffect } from "react";
import ReactDOM from "react-dom/client";
``;

import {
  Column,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  Table,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";
import { SlArrowDown, SlArrowUp, SlMagnifier, SlPencil, SlPlus, SlTrash } from "react-icons/sl";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";
import { formatDate } from "@/utils/formatDate";
import { useTimeAgo } from "@/hooks/useTimeAgo";
import { jwtDecode } from "jwt-decode";
import SubmitButton from "../../Common/Button/Button";
import AddPost from "./AddPost";
import { Token, Post, PostsTableProps } from "@/types";

const PostsTable = ({ data, ...props }: PostsTableProps) => {
  const token: string | null = localStorage.getItem("token");
  const decodeToken = token && (jwtDecode(token) as Token);

  const rerender = React.useReducer(() => ({}), {})[1];

  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [sorting, setSorting] = React.useState([]);

  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const [edit, setEdit] = React.useState<object | {}>({});

  const columns = React.useMemo<ColumnDef<Post>[]>(
    () => [
      // {
      //   id: "select",
      //   header: ({ table }) => (
      //     <IndeterminateCheckbox
      //       {...{
      //         checked: table.getIsAllRowsSelected(),
      //         indeterminate: table.getIsSomeRowsSelected(),
      //         onChange: table.getToggleAllRowsSelectedHandler(),
      //       }}
      //     />
      //   ),
      //   cell: ({ row }) => (
      //     <div className="px-1">
      //       <IndeterminateCheckbox
      //         {...{
      //           checked: row.getIsSelected(),
      //           disabled: !row.getCanSelect(),
      //           indeterminate: row.getIsSomeSelected(),
      //           onChange: row.getToggleSelectedHandler(),
      //         }}
      //       />
      //     </div>
      //   ),
      // },
      {
        header: "Title",
        footer: (props) => props.column.id,
        accessorKey: "title",
      },
      {
        header: "Content",
        accessorKey: "content",
      },
      {
        header: "Date",
        accessorKey: "date",
        cell: ({ row }) => useTimeAgo(row.original.date),
      },
      {
        header: "Author",
        accessorKey: "author",
      },
      {
        header: "Action",

        cell: ({ row }) => (
          <>
            <div className={`${decodeToken && decodeToken.role !== "admin" ? " cursor-not-allowed " : ""}`}>
              <button
                onClick={() => {
                  setEdit(row.original);
                  (document.getElementById("my_modal_7 edit") as HTMLDialogElement).showModal();
                }}
                className={`hover:bg-gray-100 text-2xl focus:ring-4 focus:outline-none focus:ring-gray-200  transition-all font-medium ${
                  decodeToken && decodeToken.role !== "admin" ? "pointer-events-none " : ""
                }`}
              >
                <SlPencil />
              </button>

              <button
                onClick={() => {
                  setDeleteId(row.original.id);

                  (document.getElementById("my_modal_7 delete") as HTMLDialogElement).showModal();
                }}
                className={` hover:bg-gray-100 text-2xl focus:ring-4 text-red-600 focus:outline-none transition-all focus:ring-gray-200 font-medium ms-3  ${
                  decodeToken && decodeToken.role !== "admin" ? "pointer-events-none " : ""
                }`}
              >
                <SlTrash />
              </button>
            </div>
          </>
        ),
        footer: (props) => props.column.id,
      },
    ],
    []
  );
  useEffect(() => {
    console.log(deleteId);
  }, [deleteId]);

  type SortDirection = "asc" | "desc" | false;

  const handleSorter = (e: any) => {
    setSorting(e);
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      sorting: sorting,
      globalFilter: globalFilter,
    },
    enableRowSelection: true,
    // onRowSelectionChange: setRowSelection,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: handleSorter,
    debugTable: true,
  });

  return (
    <div className="p-2">
      {<DeletePost postId={deleteId} />}
      {<EditPost post={edit} />}

      <div className="flex items-center justify-between">
        <div className="focus-within:border-2 justify-between w-1/4 focus-within:border-black transition-all text-[1.4rem] flex border-2 border-[#E5E5E5] rounded-xl items-center py-[0.6rem] px-[1.1rem]">
          <input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="p-2 "
            placeholder="Search all columns..."
          />
          <SlMagnifier className="text-[#b3b3b3]" />
        </div>
        <SubmitButton
          onClick={() => {
            (document.getElementById("my_modal_7 add") as HTMLDialogElement).showModal();
          }}
        >
          <SlPlus className="mr-4" /> add new post
        </SubmitButton>
        <AddPost />
      </div>
      <div className="h-2" />
      <table className="w-full text-[1.4rem] text-left text-gray-500 ">
        <thead className="text-black uppercase bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    onClick={header.column.getToggleSortingHandler()}
                    scope="col"
                    className="p-4  "
                    key={header.id}
                    colSpan={header.colSpan}
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        {flexRender(header.column.columnDef.header, header.getContext())}

                        {((header.column.getIsSorted() as SortDirection) ?? null) && header.column.getIsSorted() === "asc" ? (
                          <span className="mx-1 text-black">⇧</span>
                        ) : header.column.getIsSorted() === "desc" ? (
                          <span className="mx-1 text-black">⇩</span>
                        ) : (
                          <div className="inline-flex items-center ml-2">⇧⇩</div>
                        )}
                      </>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr className="bg-white border-b text-black hover:bg-gray-50" key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td className="px-6 py-4" key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button className="border rounded p-1" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
          {"<<"}
        </button>
        <button className="border rounded p-1" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          {"<"}
        </button>
        <button className="border rounded p-1" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          {">"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <br />
    </div>
  );
};

export default PostsTable;
function IndeterminateCheckbox({ indeterminate, className = "", ...rest }: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return <input type="checkbox" ref={ref} className={className + " cursor-pointer"} {...rest} />;
}
