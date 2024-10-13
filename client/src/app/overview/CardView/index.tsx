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
import CardBarChart from "@/components/CardBarChart";
import CardAreaChart from "@/components/CardAreaChart";
import CardImage from "@/components/CardImage";
import CardTreemapChart from "@/components/CardTreemapChart";
import rankImage from "/public/s2.jpg";
import Masonry from '@mui/lab/Masonry';
import CardText from "@/components/CardText";

type Props = {
    id: string;
  };

const Overview = ({ id }: Props) => {
  const {
    data: rankData,
    isLoading: rankDataLoading,
    isError: rankDataError
  } = useGetRankDataQuery({ businessId: Number(id) });
  
  // Popover state and event handling
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

  // Filter away unnecessary data
  const [filteredData] = rankData.map((data) => {
    return Object.entries(data).filter((data) => 
      data[0] !== "businessId" && data[0] !== "Business");
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

  const icons = {
    "Total reviews": "carbon:review",
    "Review score": "tabler:pentagon-number-9",
    "@Hashtags": "solar:hashtag-square-outline",
    "Top review platform": "carbon:star-review",
  }

  return (
    <div className="container h-full w-[100%] p-8">
      <div className="gap-6 sm:columns-4">     
        <div>
          <CardBarChart themeColor="red" title={"Total reviews"} value={rankData[0].totalReviews}
            icon={icons["Total reviews"]} />
          <CardAreaChart themeColor="blue" title={"Review score"} value={(rankData[0].reviewScore)}
            icon={icons["Review score"]} />
          <CardImage title={"Top complaint"} value={(rankData[0].mostMentionedComplaint)} image={rankImage} />
          <CardTreemapChart themeColor="yellow" title={"@Hashtags"} value={(rankData[0].socialEngagement)} 
            icon={icons["@Hashtags"]} />
          <CardText themeColor="teal" title={"Top review platform"} value={(rankData[0].topReviewTool)} 
            fontSize="text-4xl" icon={icons["Top review platform"]} />
          <CardImage title={"Top compliment"} value={(rankData[0].mostMentionedCompliment)} image={rankImage} />
        </div>
      </div>
    </div>
  )
};

export default Overview;
