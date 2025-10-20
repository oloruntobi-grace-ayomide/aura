-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "name" TEXT,
    "image" TEXT,
    "emailVerified" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TravelPreferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "preferredClass" TEXT[],
    "seatPreference" TEXT,
    "alwaysCheckBags" BOOLEAN NOT NULL DEFAULT false,
    "airlineLoyalty" TEXT[],
    "hotelLoyalty" TEXT[],
    "mustHaveAmenities" TEXT[],
    "roomPreference" TEXT,
    "rentalCarCompany" TEXT,
    "ridesharePreference" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TravelPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailPreferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "prioritySenders" TEXT[],
    "autoResponseRules" JSONB,
    "draftingStyle" TEXT,
    "workingHoursStart" TEXT,
    "workingHoursEnd" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchedulingPreferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "workHoursStart" TEXT,
    "workHoursEnd" TEXT,
    "timeZone" TEXT,
    "focusTimeBlocks" BOOLEAN NOT NULL DEFAULT true,
    "focusTimeHours" TEXT NOT NULL DEFAULT '02:00',
    "meetingBuffer" INTEGER DEFAULT 15,
    "NoMeetingsBefore" TEXT DEFAULT '09:00',
    "NoMeetingsAfter" TEXT DEFAULT '06:00',
    "autoDeclineNoAgenda" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SchedulingPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "TravelPreferences_userId_key" ON "TravelPreferences"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "EmailPreferences_userId_key" ON "EmailPreferences"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SchedulingPreferences_userId_key" ON "SchedulingPreferences"("userId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TravelPreferences" ADD CONSTRAINT "TravelPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailPreferences" ADD CONSTRAINT "EmailPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchedulingPreferences" ADD CONSTRAINT "SchedulingPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
