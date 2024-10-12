"use client";

import { RankData, useGetRankDataQuery } from "@/state/api";
import React from "react";
import { useAppSelector } from "../../redux";
import Header from "@/components/Header";
import { getActiveBusiness, getActiveUser } from "@/components/Sidebar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { CircleHelp, Icon, Wallpaper } from "lucide-react";
import IconButton from "@mui/material/IconButton";
import CardActionArea from "@mui/material/CardActionArea";
import Popover from '@mui/material/Popover';
import { text } from "stream/consumers";

type Props = {
    id: string;
  };

const Overview = ({ id }: Props) => {
  const {
    data: rankData,
    isLoading: rankDataLoading,
    isError: rankDataError
  } = useGetRankDataQuery({ businessId: Number(id) });
  
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const popOverId = open ? 'simple-popover' : undefined;

  const darkMode = useAppSelector((state) => state.global.darkMode);

  if (rankDataLoading) return <div>Loading..</div>;
  if (rankDataError || !rankData ) return <div>Error fetching ranking data</div>;

  const [r] = rankData.map((data) => {
    return data;
  })

  const dataNames = {
    "rank": "Rank",
    "totalReviews": "Total Reviews",
    "mostMentionedCompliment": "Top Compliment",
    "mostMentionedComplaint": "Top Complaint",
    "mostMentionedStaff": "Staff In Focus",
    "reviewScore": "Review Score",
    "mostReviewedByGender": "Top Gender",
    "socialEngagement": "@hashtags",
    "topSocialTool": "Top Social Platform",
    "bottomSocialTool": "Worst Social Platform",
    "topReviewTool": "Top Review Platform",
    "bottomReviewTool": "Bottom Review Platform",
    "lastReview": "Last Review",
    "lastMention": "Last @mention",
  }

  return (
    <div className="container h-full w-[100%] p-8">
      <div className="gap-6 grid grid-cols-2 sm:grid-cols-4 relative">
        {          
          Object.entries(r).filter((data) => data[0] !== "businessId" && data[0] !== "Business")
            .map((data) => (
              <Card sx={{ minWidth: 200, boxShadow: 5}} className="dark:bg-black dark:text-gray-200" >
                <CardActionArea>
                  <CardContent>
                    <Typography className="dark:text-white" gutterBottom sx={{ color: 'text.secondary', fontSize: 18 }}>
                      { dataNames[data[0] as keyof typeof dataNames] }
                    </Typography>
                    <Typography className="text-blue-500" variant="body2" sx={{ fontSize: 22, fontWeight: "bold" }}>
                      {data[1]}         
                    </Typography>
                  </CardContent>
                </CardActionArea>

                <IconButton color="primary" aria-describedby={popOverId} onClick={handleClick} 
                  className={`cursor-pointer items-center transition-colors hover:bg-blue-100 dark:bg-black`}>
                  <CircleHelp />
                </IconButton>

                <Popover 
                  id={popOverId}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}>
                  <Typography sx={{ p: 1 }}>The content of the Popover.</Typography>
                </Popover>
              </Card> 
            )
          )
        }
      </div>
    </div>
  );
  
};

export default Overview;
