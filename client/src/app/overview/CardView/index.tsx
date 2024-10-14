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
    "#Hashtags": "solar:hashtag-square-outline",
    "Top review platform": "carbon:star-review",
    "Rank": "hugeicons:ranking",
    "Staff mentioned": "mdi:person-alert-outline",
    "Top social platform": "simple-line-icons:social-instagram",
    "Most reviewed by": "simple-line-icons:social-instagram",
  }

  return (
    <div className="flex flex-wrap gap-6 container h-full w-[100%] p-8">
      {/* Column 1 */}
      <div className="gap-6 columns-1 max-w-96">
        <CardAreaChart themeColor="violet" title={"Rank"} value={(rankData[0].rank)}
          icon={icons["Rank"]} />
        <CardText themeColor="green" title={"Staff mentioned"} value={(rankData[0].mostMentionedStaff)} 
          fontSize="text-4xl" icon={icons["Staff mentioned"]} />
        <CardTreemapChart themeColor="yellow" title={"#Hashtags"} value={(rankData[0].socialEngagement)} 
          icon={icons["#Hashtags"]} />        
      </div>
      {/* Column 2 */}
      <div className="gap-6 columns-1 max-w-96">
        <CardImage title={"Top compliment"} value={(rankData[0].mostMentionedCompliment)} image={rankImage} />
        <CardText themeColor="blue" title={"Top social platform"} value={(rankData[0].topSocialTool)} 
          fontSize="text-4xl" icon={icons["Top social platform"]} />
      </div>
      {/* Column 3 */}
      <div className="gap-6 columns-1 max-w-96">
        <CardText themeColor="teal" title={"Top review platform"} value={(rankData[0].topReviewTool)} 
          fontSize="text-4xl" icon={icons["Top review platform"]} />
        <CardAreaChart themeColor="dark" title={"Review score"} value={(rankData[0].reviewScore)}
          icon={icons["Review score"]} />
        <CardBarChart themeColor="red" title={"Total reviews"} value={rankData[0].totalReviews}
          icon={icons["Total reviews"]} />        
      </div>
      {/* Column 4 */}
      <div className="gap-6 columns-1 max-w-96">
        <CardText themeColor="cyan" title={"Most reviewed by"} value={(rankData[0].mostReviewedByGender)} 
          fontSize="text-4xl" icon={icons["Most reviewed by"]} />
        <CardImage title={"Top complaint"} value={(rankData[0].mostMentionedComplaint)} image={rankImage} />
      </div>
    </div>
  )
};

export default Overview;
