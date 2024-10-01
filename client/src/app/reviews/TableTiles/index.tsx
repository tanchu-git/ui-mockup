import { useAppSelector } from "@/app/redux";
import Header from "@/components/Header";
import { dataGridClassNames, dataGridSxStyles, sxCustomStyling } from "@/lib/utils";
import { useGetReviewsQuery } from "@/state/api";
import { Grid2, Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";

type Props = {
  id: string;
};

const fiveStarColumns: GridColDef[] = [
    {
      field: "review",
      headerName: "5 Star Reviews",
      width: 400,
    },
  ];

const fourStarColumns: GridColDef[] = [
  {
    field: "review",
    headerName: "4 Star Reviews",
    width: 400,
  },
];

const threeStarColumns: GridColDef[] = [
  {
    field: "review",
    headerName: "3 Star Reviews",
    width: 400,
  },
];

const twoStarColumns: GridColDef[] = [
  {
    field: "review",
    headerName: "2 Star Reviews",
    width: 400,
  },
];

const oneStarColumns: GridColDef[] = [
  {
    field: "review",
    headerName: "1 Star Reviews",
    width: 400,
  },
];

const TableTilesView = ({ id }: Props) => {
  const darkMode = useAppSelector((state) => state.global.darkMode);
  const {
    data: reviews,
    error,
    isLoading,
  } = useGetReviewsQuery({ businessId: Number(id) });

  if (isLoading) return <div>Loading...</div>;
  if (error || !reviews) return <div>An error occurred while fetching reviews</div>;

  const fiveStarReviews = reviews.filter((review) => review.score === 5)
  const fourStarReviews = reviews.filter((review) => review.score === 4)
  const threeStarReviews = reviews.filter((review) => review.score === 3)
  const twoStarReviews = reviews.filter((review) => review.score === 2)
  const oneStarReviews = reviews.filter((review) => review.score === 1)

  return (
    <div className="h-full w-full px-4 pb-8 xl:px-6">
      <h1 className="me-2 text-lg font-bold dark:text-white py-5">
        Reviews
      </h1>
      <Grid2 container spacing={2}>
        <DataGrid
          autoHeight    
          rows={fiveStarReviews || []}
          columns={fiveStarColumns}
          className={"border-hidden bg-white shadow dark:border-stroke-dark dark:bg-dark-secondary dark:text-gray-200"}
          sx={sxCustomStyling(darkMode)}
        />
        <DataGrid
          autoHeight
          rows={fourStarReviews || []}
          columns={fourStarColumns}
          className="border-transparent bg-white shadow dark:border-stroke-dark dark:bg-dark-secondary dark:text-gray-200"
          sx={sxCustomStyling(darkMode)}
        />
        <DataGrid
          autoHeight
          rows={threeStarReviews || []}
          columns={threeStarColumns}
          className="border-transparent bg-white shadow dark:border-stroke-dark dark:bg-dark-secondary dark:text-gray-200"
          sx={sxCustomStyling(darkMode)}
        />
        <DataGrid
          autoHeight
          rows={twoStarReviews || []}
          columns={twoStarColumns}
          className="border-transparent bg-white shadow dark:border-stroke-dark dark:bg-dark-secondary dark:text-gray-200"
          sx={sxCustomStyling(darkMode)}
        />
        <DataGrid
          autoHeight
          rows={oneStarReviews || []}
          columns={oneStarColumns}
          className="border-transparent bg-white shadow dark:border-stroke-dark dark:bg-dark-secondary dark:text-gray-200"
          sx={sxCustomStyling(darkMode)}
        />
      </Grid2>
    </div>
  );
};

export default TableTilesView;