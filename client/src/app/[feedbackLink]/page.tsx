"use client";

import { useGetFeedbackLinkQuery } from "@/state/api";

export default function Page({ params }: { params: { feedbackLink: string } }) {
    const {
        data: business,
        isLoading: businessLoading,
        isError: businessError
      } = useGetFeedbackLinkQuery({ feedbackLink: params.feedbackLink });

    if (businessLoading) return <div>Loading..</div>;
    if (businessError || !business || !business[0]) return <div>{params.feedbackLink} - No such link</div>;
      
    return (
        <div>
            {business[0].placeId}
        </div>
    )
}