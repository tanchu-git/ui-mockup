-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "cognitoId" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Business" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER,
    "name" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "postcode" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "coordinate" TEXT NOT NULL,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rankData" (
    "rank" INTEGER NOT NULL,
    "totalReviews" INTEGER NOT NULL,
    "mostMentionedCompliment" TEXT NOT NULL,
    "mostMentionedComplaint" TEXT NOT NULL,
    "mostMentionedStaff" TEXT NOT NULL,
    "approvalRatio" TEXT NOT NULL,
    "socialEngagement" INTEGER NOT NULL,
    "topSocialTool" TEXT NOT NULL,
    "bottomSocialTool" TEXT NOT NULL,
    "topReviewTool" TEXT NOT NULL,
    "bottomReviewTool" TEXT NOT NULL,
    "lastReview" TIMESTAMP(3),
    "lastMention" TIMESTAMP(3),
    "businessId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cognitoId_key" ON "User"("cognitoId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "rankData_businessId_key" ON "rankData"("businessId");

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rankData" ADD CONSTRAINT "rankData_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
