"use client";

import { useState, useEffect } from "react";

interface NFT {
  id: string;
  title: string;
  description: string;
  image: string; // Placeholder image path
  price: number;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  attributes: {
    trait: string;
    value: string;
  }[];
}

export const MarketPlace = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredNFT, setHoveredNFT] = useState<string | null>(null);

  // Mock NFT data
  const nfts: NFT[] = [
    {
      id: "nft-001",
      title: "The Overachiever",
      description:
        "Awarded for consistently achieving top grades and excelling in all courses.",
      image: "/placeholder.svg?height=300&width=300",
      price: 500,
      rarity: "Legendary",
      attributes: [
        { trait: "GPA", value: "4.0" },
        { trait: "Courses", value: "20+" },
        { trait: "Impact", value: "High" },
      ],
    },
    {
      id: "nft-002",
      title: "Consistency King",
      description:
        "For maintaining long learning streaks and consistent daily engagement.",
      image: "/placeholder.svg?height=300&width=300",
      price: 350,
      rarity: "Epic",
      attributes: [
        { trait: "Streak", value: "365+ days" },
        { trait: "Attendance", value: "Perfect" },
        { trait: "Discipline", value: "Exceptional" },
      ],
    },
    {
      id: "nft-003",
      title: "The Troubleshooter",
      description:
        "Recognizes exceptional problem-solving skills and helping peers overcome challenges.",
      image: "/placeholder.svg?height=300&width=300",
      price: 400,
      rarity: "Epic",
      attributes: [
        { trait: "Solutions", value: "100+" },
        { trait: "Forum Activity", value: "High" },
        { trait: "Mentorship", value: "Active" },
      ],
    },
    {
      id: "nft-004",
      title: "Innovator's Spark",
      description:
        "Celebrates creative thinking and groundbreaking project submissions.",
      image: "/placeholder.svg?height=300&width=300",
      price: 450,
      rarity: "Legendary",
      attributes: [
        { trait: "Projects", value: "5+" },
        { trait: "Originality", value: "High" },
        { trait: "Impact", value: "Transformative" },
      ],
    },
    {
      id: "nft-005",
      title: "Community Builder",
      description:
        "Awarded for fostering a positive and collaborative learning environment.",
      image: "/placeholder.svg?height=300&width=300",
      price: 280,
      rarity: "Rare",
      attributes: [
        { trait: "Engagement", value: "Very High" },
        { trait: "Support", value: "Consistent" },
        { trait: "Events", value: "Organized" },
      ],
    },
    {
      id: "nft-006",
      title: "The Mentor's Mark",
      description:
        "For guiding junior students and contributing to their academic success.",
      image: "/placeholder.svg?height=300&width=300",
      price: 320,
      rarity: "Rare",
      attributes: [
        { trait: "Mentees", value: "10+" },
        { trait: "Guidance", value: "Effective" },
        { trait: "Knowledge Share", value: "Frequent" },
      ],
    },
    {
      id: "nft-007",
      title: "Early Bird Learner",
      description:
        "Recognizes students who consistently start and complete courses ahead of schedule.",
      image: "/placeholder.svg?height=300&width=300",
      price: 200,
      rarity: "Common",
      attributes: [
        { trait: "Punctuality", value: "High" },
        { trait: "Completion Rate", value: "100%" },
        { trait: "Proactiveness", value: "Excellent" },
      ],
    },
    {
      id: "nft-008",
      title: "Quiz Whiz",
      description:
        "Awarded for exceptional performance in quizzes and assessments.",
      image: "/placeholder.svg?height=300&width=300",
      price: 250,
      rarity: "Common",
      attributes: [
        { trait: "Quiz Score", value: "90%+" },
        { trait: "Accuracy", value: "High" },
        { trait: "Speed", value: "Fast" },
      ],
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const getRarityStyle = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "Rare":
        return "bg-gray-200 text-gray-800 border-gray-300";
      case "Epic":
        return "bg-gray-700 text-white border-gray-600"; // Darker for contrast
      case "Legendary":
        return "bg-black text-white border-gray-700"; // Darkest for contrast
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleBuyClick = (nftTitle: string, price: number) => {
    alert(
      `Attempting to buy "${nftTitle}" for ${price} EduCred Coins! (This is a demo action)`
    );
    // In a real DApp, this would trigger a blockchain transaction
  };

  return (
    <div className="font-mono min-h-screen bg-gradient-to-br from-gray-50 to-white text-gray-900 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div
          className={`transform transition-all duration-1000 ease-out ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8 text-center relative overflow-hidden">
            {/* Subtle background grid/lines */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
              <div
                className="absolute inset-0 bg-[size:20px_20px] [mask-image:radial-gradient(transparent,white)]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #ccc 1px, transparent 1px), linear-gradient(to bottom, #ccc 1px, transparent 1px)",
                }}
              ></div>
            </div>

            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-800 to-black">
                EduCred NFT Marketplace
              </h1>
              <div className="h-1 bg-gradient-to-r from-black via-gray-600 to-black mt-2 animate-pulse"></div>
              <p className="mt-4 text-base md:text-lg text-gray-700 max-w-3xl mx-auto">
                Explore and acquire unique digital collectibles representing
                academic excellence and community impact within the EduCred
                ecosystem.
              </p>
            </div>
          </div>
        </div>

        {/* NFT Grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transform transition-all duration-1000 delay-200 ease-out ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {nfts.map((nft, index) => (
            <div
              key={nft.id}
              className={`bg-white rounded-lg border border-gray-200 overflow-hidden transform transition-all duration-300 ${
                hoveredNFT === nft.id
                  ? "scale-102 shadow-xl shadow-gray-200/50 border-gray-400"
                  : ""
              }`}
              onMouseEnter={() => setHoveredNFT(nft.id)}
              onMouseLeave={() => setHoveredNFT(null)}
              style={{ transitionDelay: `${index * 70}ms` }} // Staggered animation
            >
              <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden border-b border-gray-200">
                <img
                  src={nft.image || "/placeholder.svg"}
                  alt={nft.title}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
                <div
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold border ${getRarityStyle(
                    nft.rarity
                  )}`}
                >
                  {nft.rarity}
                </div>
              </div>
              <div className="p-4 space-y-3">
                <h3 className="text-xl font-bold text-black">{nft.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {nft.description}
                </p>

                <div className="flex flex-wrap gap-2 text-xs">
                  {nft.attributes.map((attr, attrIndex) => (
                    <span
                      key={attrIndex}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md font-mono border border-gray-200"
                    >
                      {attr.trait}: {attr.value}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="flex items-center space-x-1">
                    <span className="text-xl text-gray-700">🪙</span>
                    <span className="text-2xl font-bold text-black">
                      {nft.price}
                    </span>
                    <span className="text-sm text-gray-600">EduCred</span>
                  </div>
                  <button
                    onClick={() => handleBuyClick(nft.title, nft.price)}
                    className="group relative px-5 py-2 bg-black text-white font-bold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-black/20 transform"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Buy Now
                      <span className="ml-2 transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketPlace;
