-- CreateTable
CREATE TABLE "LandingPage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "primaryColor" TEXT NOT NULL DEFAULT '#3B82F6',
    "secondaryColor" TEXT NOT NULL DEFAULT '#1F2937',
    "accentColor" TEXT NOT NULL DEFAULT '#F59E0B',
    "buttonStyle" TEXT NOT NULL DEFAULT 'rounded',
    "bannerImageUrl" TEXT,
    "description" TEXT,
    "eventDate" TEXT,
    "eventTime" TEXT,
    "eventLocation" TEXT,
    "buttonText" TEXT,
    "buttonLink" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "LandingPage_slug_key" ON "LandingPage"("slug");
