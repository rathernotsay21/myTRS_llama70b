import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.landingPage.deleteMany();

  // Create test landing pages
  const pages = [
    {
      title: "Summer Beach Cleanup 2025",
      slug: "summer-beach-cleanup-2025",
      description: "Join us for our annual beach cleanup event to help preserve our beautiful coastline!",
      eventDate: "July 15, 2025",
      eventTime: "8:00 AM - 12:00 PM",
      eventLocation: "Sunshine Beach, Main Entrance",
      buttonText: "Register Now",
      buttonLink: "#register",
      primaryColor: "#3B82F6", // blue-500
      secondaryColor: "#1F2937", // gray-800
      accentColor: "#60A5FA", // blue-400
      buttonStyle: "rounded",
      bannerImageUrl: "https://images.unsplash.com/photo-1520116468816-95b69f847357",
      content: `
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-blue-600 mb-6">Join Our Beach Cleanup Initiative!</h2>
          
          <p class="text-lg mb-4">Help us preserve our beautiful coastline and protect marine life. Every piece of trash we collect makes a difference!</p>
          
          <div class="bg-blue-50 p-6 rounded-lg mb-6">
            <h3 class="text-xl font-semibold mb-3">Event Details</h3>
            <ul class="space-y-2">
              <li>📅 Date: July 15, 2025</li>
              <li>⏰ Time: 8:00 AM - 12:00 PM</li>
              <li>📍 Location: Sunshine Beach, Main Entrance</li>
              <li>🎯 Goal: Clean 5 miles of coastline</li>
            </ul>
          </div>

          <h3 class="text-2xl font-bold mb-4">What to Bring</h3>
          <ul class="list-disc pl-6 mb-6">
            <li>Reusable water bottle</li>
            <li>Sunscreen and hat</li>
            <li>Comfortable shoes</li>
            <li>Positive attitude!</li>
          </ul>

          <div class="bg-green-50 p-6 rounded-lg">
            <h3 class="text-xl font-semibold mb-3">Why Join Us?</h3>
            <p>Your participation helps:</p>
            <ul class="list-disc pl-6">
              <li>Protect marine wildlife</li>
              <li>Keep our beaches beautiful</li>
              <li>Build community connections</li>
              <li>Make a direct environmental impact</li>
            </ul>
          </div>
        </div>
      `,
      published: true,
    },
    {
      title: "Holiday Food Drive 2025",
      slug: "holiday-food-drive-2025",
      description: "Help us ensure every family has a warm meal this holiday season.",
      eventDate: "December 1-20, 2025",
      eventTime: "9:00 AM - 6:00 PM",
      eventLocation: "Community Center",
      buttonText: "Donate Now",
      buttonLink: "#donate",
      primaryColor: "#DC2626", // red-600
      secondaryColor: "#1F2937", // gray-800
      accentColor: "#F87171", // red-400
      buttonStyle: "pill",
      bannerImageUrl: "https://images.unsplash.com/photo-1544427920-c49ccfb85579",
      content: `
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-red-600 mb-6">Spread Holiday Cheer: Join Our Food Drive!</h2>
          
          <p class="text-lg mb-4">Help us ensure every family in our community has a warm meal this holiday season.</p>
          
          <div class="bg-red-50 p-6 rounded-lg mb-6">
            <h3 class="text-xl font-semibold mb-3">Collection Details</h3>
            <ul class="space-y-2">
              <li>📅 Dates: December 1-20, 2025</li>
              <li>⏰ Drop-off Hours: 9:00 AM - 6:00 PM</li>
              <li>📍 Location: Community Center</li>
              <li>🎯 Goal: 10,000 meals</li>
            </ul>
          </div>

          <h3 class="text-2xl font-bold mb-4">Most Needed Items</h3>
          <ul class="list-disc pl-6 mb-6">
            <li>Canned vegetables and fruits</li>
            <li>Pasta and rice</li>
            <li>Peanut butter</li>
            <li>Canned meats</li>
            <li>Baby food</li>
          </ul>

          <div class="bg-orange-50 p-6 rounded-lg">
            <h3 class="text-xl font-semibold mb-3">Volunteer Opportunities</h3>
            <ul class="list-disc pl-6">
              <li>Food sorting and packing</li>
              <li>Drive-through collection</li>
              <li>Delivery to food banks</li>
              <li>Administrative support</li>
            </ul>
          </div>
        </div>
      `,
      published: true,
    },
    {
      title: "Tech Workshop Series",
      slug: "tech-workshop-series",
      description: "Learn valuable tech skills from industry professionals! All workshops are free and open to beginners.",
      eventDate: "Every Saturday in March 2025",
      eventTime: "10:00 AM - 2:00 PM",
      eventLocation: "Tech Hub Downtown",
      buttonText: "Sign Up",
      buttonLink: "#signup",
      primaryColor: "#7C3AED", // purple-600
      secondaryColor: "#1F2937", // gray-800
      accentColor: "#A78BFA", // purple-400
      buttonStyle: "square",
      bannerImageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
      content: `
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-purple-600 mb-6">Free Tech Skills Workshop Series</h2>
          
          <p class="text-lg mb-4">Learn valuable tech skills from industry professionals! All workshops are free and open to beginners.</p>
          
          <div class="bg-purple-50 p-6 rounded-lg mb-6">
            <h3 class="text-xl font-semibold mb-3">Series Details</h3>
            <ul class="space-y-2">
              <li>📅 Every Saturday in March 2025</li>
              <li>⏰ Time: 10:00 AM - 2:00 PM</li>
              <li>📍 Location: Tech Hub Downtown</li>
              <li>💻 Bring your own laptop</li>
            </ul>
          </div>

          <h3 class="text-2xl font-bold mb-4">Workshop Topics</h3>
          <ul class="list-disc pl-6 mb-6">
            <li>Web Development Basics</li>
            <li>Introduction to Python</li>
            <li>Data Analysis Fundamentals</li>
            <li>Mobile App Development</li>
          </ul>

          <div class="bg-indigo-50 p-6 rounded-lg">
            <h3 class="text-xl font-semibold mb-3">What You'll Learn</h3>
            <ul class="list-disc pl-6">
              <li>Practical coding skills</li>
              <li>Industry best practices</li>
              <li>Project portfolio building</li>
              <li>Career advancement tips</li>
            </ul>
          </div>
        </div>
      `,
      published: false,
    }
  ];

  for (const page of pages) {
    await prisma.landingPage.create({
      data: page
    });
  }

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
