"use client";

import { useGetFeedbackLinkQuery } from "@/state/api";
import { FeedbackView } from "../framerVariant";

export default function Page({ params }: { params: { feedbackLink: string } }) {
    const {
        data: business,
        isLoading: businessLoading,
        isError: businessError
      } = useGetFeedbackLinkQuery({ feedbackLink: params.feedbackLink });

    if (businessLoading) return <div>Loading..</div>;
    if (businessError || !business || !business[0]) return <div>{params.feedbackLink} - No such link</div>;
    
    return (
        <div className="">
            {/* {business[0].placeId}    */}
            <FeedbackView />  
        </div>
    )
}