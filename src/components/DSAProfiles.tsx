"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Award, Code2, Globe, Flame, CheckCircle2 } from "lucide-react";

const DSA_PROFILES = [
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/rajtripathi08/",
    rating: "1803",
    ratingLabel: "Contest Rating",
    solved: "539",
    globalRank: "Top 7.8%",
    colorClass: "from-[#ffa116]/20 to-[#f97316]/5 border-[#ffa116]/30",
    badgeColor: "bg-[#ffa116]/10 text-[#ffa116] border-[#ffa116]/20",
    logoColor: "text-[#ffa116]",
    stats: [
      { label: "Max Rating", value: "1,803" },
      { label: "Contests Played", value: "13" }
    ]
  },
  {
    name: "Codeforces",
    url: "https://codeforces.com/profile/rajpandit08",
    rating: "Unrated",
    ratingLabel: "Max Rating",
    solved: "11",
    globalRank: "Unrated",
    colorClass: "from-[#3182ce]/20 to-[#e53e3e]/5 border-[#3182ce]/30",
    badgeColor: "bg-[#3182ce]/10 text-[#3182ce] border-[#3182ce]/20",
    logoColor: "text-[#e53e3e]",
    stats: [
      { label: "Current Rating", value: "0" },
      { label: "Division", value: "Unrated" }
    ]
  },
  {
    name: "Coding Ninjas",
    url: "https://www.naukri.com/code360/profile/RajTripathiJi",
    rating: "Level 8",
    ratingLabel: "Level",
    solved: "280",
    globalRank: "Ninja Gold",
    colorClass: "from-[#f27011]/20 to-[#f97316]/5 border-[#f27011]/30",
    badgeColor: "bg-[#f27011]/10 text-[#f27011] border-[#f27011]/20",
    logoColor: "text-[#f27011]",
    stats: [
      { label: "Progress", value: "Level 8" },
      { label: "Badge", value: "Ninja Gold" }
    ]
  },
  {
    name: "GeeksforGeeks",
    url: "https://www.geeksforgeeks.org/profile/rajtripz5vn?tab=activity",
    rating: "332",
    ratingLabel: "Coding Score",
    solved: "100",
    globalRank: "Rank 1520",
    colorClass: "from-[#2f8d46]/20 to-[#10b981]/5 border-[#2f8d46]/30",
    badgeColor: "bg-[#2f8d46]/10 text-[#2f8d46] border-[#2f8d46]/20",
    logoColor: "text-[#2f8d46]",
    stats: [
      { label: "Contest Rating", value: "1545" },
      { label: "Institute Rank", value: "Top 10" }
    ]
  }
];

export default function DSAProfiles() {
  const [leetcodeStats, setLeetcodeStats] = useState({
    solved: "539",
    rating: "1803",
    globalRank: "Top 7.8%",
    maxRating: "1,803",
    contestsPlayed: "13"
  });

  const [codeforcesStats, setCodeforcesStats] = useState({
    solved: "11",
    rating: "Unrated",
    globalRank: "Unrated",
    currentRating: "0",
    division: "Unrated"
  });

  const [gfgStats, setGfgStats] = useState({
    solved: "100",
    rating: "332",
    globalRank: "Rank 1520",
    stats: [
      { label: "Contest Rating", value: "1545" },
      { label: "Institute Rank", value: "Top 10" }
    ]
  });

  const [masteredTopics, setMasteredTopics] = useState({
    arrays: true,
    strings: true,
    linkedlist: false,
    stackqueue: false,
    trees: false,
    graphs: false,
    greedy: true,
    dp: false,
  });

  const topicsList = [
    { key: "arrays", label: "Arrays & Vectors" },
    { key: "strings", label: "Strings & Hashing" },
    { key: "linkedlist", label: "Linked Lists" },
    { key: "stackqueue", label: "Stacks & Queues" },
    { key: "trees", label: "Trees & BST" },
    { key: "graphs", label: "Graphs & BFS/DFS" },
    { key: "greedy", label: "Greedy Algorithms" },
    { key: "dp", label: "Dynamic Programming" },
  ] as const;

  useEffect(() => {
    // 1. Fetch LeetCode Solved Count
    fetch("https://alfa-leetcode-api.onrender.com/rajtripathi08/solved")
      .then(res => res.json())
      .then(data => {
        if (data && data.solvedProblem) {
          setLeetcodeStats(prev => ({
            ...prev,
            solved: String(data.solvedProblem)
          }));
        }
      })
      .catch(() => {}); // Silently fall back to defaults

    // 2. Fetch LeetCode Contest Stats
    fetch("https://alfa-leetcode-api.onrender.com/rajtripathi08/contest")
      .then(res => res.json())
      .then(data => {
        if (data && data.contestRating) {
          setLeetcodeStats(prev => ({
            ...prev,
            rating: String(Math.round(data.contestRating)),
            maxRating: String(Math.round(data.contestRating)),
            contestsPlayed: String(data.contestAttend || "13"),
            globalRank: `Top ${data.contestTopPercentage ? data.contestTopPercentage.toFixed(1) : "7.8"}%`
          }));
        }
      })
      .catch(() => {});

    // 3. Fetch Codeforces unique solved count
    fetch("https://codeforces.com/api/user.status?handle=rajpandit08")
      .then(res => res.json())
      .then(data => {
        if (data && data.status === "OK" && Array.isArray(data.result)) {
          const uniqueSolved = new Set<string>();
          data.result.forEach((sub: { verdict?: string; problem?: { contestId?: number; index?: string } }) => {
            if (sub.verdict === "OK" && sub.problem && sub.problem.contestId && sub.problem.index) {
              uniqueSolved.add(`${sub.problem.contestId}-${sub.problem.index}`);
            }
          });
          if (uniqueSolved.size > 0) {
            setCodeforcesStats(prev => ({
              ...prev,
              solved: String(uniqueSolved.size)
            }));
          }
        }
      })
      .catch(() => {});

    // 4. Fetch Codeforces user rating and rank
    fetch("https://codeforces.com/api/user.info?handles=rajpandit08")
      .then(res => res.json())
      .then(data => {
        if (data && data.status === "OK" && data.result && data.result[0]) {
          const user = data.result[0];
          const rank = user.rank ? user.rank.charAt(0).toUpperCase() + user.rank.slice(1) : "Unrated";
          const ratingVal = user.rating !== undefined ? String(user.rating) : "0";
          const maxRatingVal = user.maxRating !== undefined ? String(user.maxRating) : "0";
          
          setCodeforcesStats(prev => ({
            ...prev,
            rating: user.maxRating ? `${maxRatingVal} (${rank})` : "Unrated",
            globalRank: rank,
            currentRating: ratingVal,
            division: user.maxRating ? `Div. ${user.maxRating >= 1900 ? "1" : user.maxRating >= 1600 ? "2" : "3"}` : "Unrated"
          }));
        }
      })
      .catch(() => {});

    // 5. Fetch GeeksforGeeks Stats via local API proxy (avoids CORS)
    fetch("/api/gfg-stats")
      .then(res => res.json())
      .then(data => {
        if (data) {
          const solvedSum = (Number(data.Easy) || 0) + 
                            (Number(data.Medium) || 0) + 
                            (Number(data.Hard) || 0) + 
                            (Number(data.Basic) || 0) + 
                            (Number(data.School) || 0);

          const totalSolved = (data.total_problems_solved && Number(data.total_problems_solved) > 0)
            ? String(data.total_problems_solved)
            : (solvedSum > 0 ? String(solvedSum) : "100");

          const scoreVal = (data.total_score && Number(data.total_score) > 0)
            ? String(data.total_score)
            : "332";

          const streakVal = (data.pod_solved_longest_streak && Number(data.pod_solved_longest_streak) > 0)
            ? `${data.pod_solved_longest_streak} days`
            : "5 days";

          const progressVal = (data.ProgressBar && Number(data.ProgressBar) > 0)
            ? `Progress ${Math.round(data.ProgressBar * 100)}%`
            : "Rank 1520";

          const easyVal = data.Easy !== undefined && data.Easy !== null ? String(data.Easy) : "29";
          const medVal = data.Medium !== undefined && data.Medium !== null ? String(data.Medium) : "66";
          const hardVal = data.Hard !== undefined && data.Hard !== null ? String(data.Hard) : "1";

          setGfgStats({
            solved: totalSolved,
            rating: scoreVal,
            globalRank: progressVal,
            stats: [
              { label: "Longest Streak", value: streakVal },
              { label: "Easy / Med / Hard", value: `${easyVal} / ${medVal} / ${hardVal}` }
            ]
          });
        }
      })
      .catch(() => {});
  }, []);

  const handleToggle = (key: keyof typeof masteredTopics) => {
    setMasteredTopics((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getProfileValue = (name: string, key: "solved" | "rating" | "globalRank" | "extraStats") => {
    if (name === "LeetCode") {
      if (key === "solved") return leetcodeStats.solved;
      if (key === "rating") return leetcodeStats.rating;
      if (key === "globalRank") return leetcodeStats.globalRank;
      if (key === "extraStats") return [
        { label: "Max Rating", value: leetcodeStats.maxRating },
        { label: "Contests Played", value: leetcodeStats.contestsPlayed }
      ];
    }
    if (name === "Codeforces") {
      if (key === "solved") return codeforcesStats.solved;
      if (key === "rating") return codeforcesStats.rating;
      if (key === "globalRank") return codeforcesStats.globalRank;
      if (key === "extraStats") return [
        { label: "Current Rating", value: codeforcesStats.currentRating },
        { label: "Division", value: codeforcesStats.division }
      ];
    }
    if (name === "GeeksforGeeks") {
      if (key === "solved") return gfgStats.solved;
      if (key === "rating") return gfgStats.rating;
      if (key === "globalRank") return gfgStats.globalRank;
      if (key === "extraStats") return gfgStats.stats;
    }
    // Coding Ninjas (Code Studio)
    const profile = DSA_PROFILES.find(p => p.name === name);
    if (key === "solved") return profile?.solved;
    if (key === "rating") return profile?.rating;
    if (key === "globalRank") return profile?.globalRank;
    if (key === "extraStats") return profile?.stats;
  };

  const totalTopics = topicsList.length;
  const checkedTopics = Object.values(masteredTopics).filter(Boolean).length;
  const percentage = Math.round((checkedTopics / totalTopics) * 100);

  return (
    <section id="dsa" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
          Competitive <span className="text-gradient">Programming</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-foreground/60 max-w-2xl mx-auto">
          Actively solving algorithmic puzzles and building analytical thinking on top coding platforms.
        </p>
        <div className="mt-2 h-1.5 w-16 bg-gradient-to-r from-accent-blue to-accent-purple mx-auto rounded-full" />
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {DSA_PROFILES.map((profile, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`glass-panel p-8 rounded-2xl border bg-gradient-to-br ${profile.colorClass} relative overflow-hidden flex flex-col justify-between`}
          >
            {/* Background elements */}
            <div className="absolute top-0 right-0 -z-10 translate-x-12 -translate-y-12 w-32 h-32 rounded-full bg-foreground/[0.02]" />

            <div>
              {/* Header */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-foreground/[0.03] border border-card-border">
                    <Code2 className={profile.logoColor} size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-foreground/90 font-sans">
                      {profile.name}
                    </h3>
                    <span className={`inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${profile.badgeColor}`}>
                      {profile.ratingLabel}: {getProfileValue(profile.name, "rating") as string}
                    </span>
                  </div>
                </div>
                
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-card-border bg-card-bg hover:border-accent-blue/35 transition-colors cursor-pointer"
                  aria-label={`Visit ${profile.name} profile`}
                >
                  <ExternalLink size={16} />
                </a>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="glass-panel p-4 rounded-xl border-card-border/60">
                  <div className="flex items-center gap-2 text-foreground/60 text-xs font-medium">
                    <Flame size={14} className="text-orange-500" />
                    <span>Problems Solved</span>
                  </div>
                  <p className="text-2xl font-extrabold text-foreground/95 mt-1.5 font-mono">
                    {getProfileValue(profile.name, "solved") as string}
                  </p>
                </div>
                <div className="glass-panel p-4 rounded-xl border-card-border/60">
                  <div className="flex items-center gap-2 text-foreground/60 text-xs font-medium">
                    <Globe size={14} className="text-accent-blue" />
                    <span>Standing / Rank</span>
                  </div>
                  <p className="text-2xl font-extrabold text-foreground/95 mt-1.5 font-sans truncate">
                    {getProfileValue(profile.name, "globalRank") as string}
                  </p>
                </div>
              </div>

              {/* Detailed Extra Stats */}
              <div className="flex items-center justify-between gap-4 mt-6 pt-4 border-t border-card-border/50 text-sm">
                {(getProfileValue(profile.name, "extraStats") as { label: string; value: string }[] || []).map((stat, i) => (
                  <div key={i} className="flex justify-between w-full">
                    <span className="text-foreground/50">{stat.label}:</span>
                    <span className="font-semibold text-foreground/80 font-mono">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Button CTA */}
            <div className="mt-8">
              <a
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-card-border bg-card-bg/40 hover:bg-card-bg hover:border-accent-blue/30 transition-all font-semibold text-sm text-foreground/95 cursor-pointer"
              >
                <span>View Coding Profile</span>
                <Award size={15} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* DSA Topic Mastery Tracker */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-panel p-8 rounded-3xl border border-card-border"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h3 className="text-xl font-bold text-foreground/95">DSA Topic Mastery Tracker</h3>
            <p className="text-sm text-foreground/60 mt-1">
              Select the topics you have thoroughly practiced and mastered to update your progress.
            </p>
          </div>
          
          <div className="flex flex-col w-full md:w-64">
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span className="text-foreground/75">Mastery Progress</span>
              <span className="text-accent-blue font-mono">{percentage}%</span>
            </div>
            <div className="h-3 w-full bg-foreground/[0.04] rounded-full overflow-hidden border border-card-border/50">
              <div 
                className="h-full bg-gradient-to-r from-accent-blue to-accent-purple rounded-full transition-all duration-500 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {topicsList.map((topic) => {
            const isChecked = masteredTopics[topic.key];
            return (
              <div
                key={topic.key}
                onClick={() => handleToggle(topic.key)}
                className={`p-4 rounded-2xl border cursor-pointer select-none flex items-center gap-3 transition-all duration-300 ${
                  isChecked
                    ? "bg-accent-blue/5 border-accent-blue/40 text-accent-cyan"
                    : "bg-foreground/[0.01] border-card-border text-foreground/65 hover:bg-foreground/[0.03] hover:border-card-border-hover"
                }`}
              >
                <div className={`p-1 rounded-md border flex items-center justify-center ${
                  isChecked ? "bg-accent-blue/15 border-accent-blue" : "border-card-border"
                }`}>
                  {isChecked ? (
                    <CheckCircle2 size={16} className="text-accent-cyan" />
                  ) : (
                    <div className="w-4 h-4" />
                  )}
                </div>
                <span className="text-sm font-semibold font-sans">{topic.label}</span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
