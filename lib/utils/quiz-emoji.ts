export const getQuizEmoji = {
  visibility: (type: string) => {
    const map: Record<string, { emoji: string; label: string }> = {
      public: { emoji: "🌍", label: "Public" },
      "invite-only": { emoji: "👥", label: "Invite Only" },
      "only-me": { emoji: "🔒", label: "Only Me" },
    };
    return map[type] || { emoji: "", label: type };
  },
  difficulty: (level: string | null) => {
    if (!level) return { emoji: "", label: "" };
    const map: Record<string, { emoji: string; label: string }> = {
      easy: { emoji: "🌱", label: "Easy" },
      average: { emoji: "🎯", label: "Average" },
      difficult: { emoji: "👑", label: "Difficult" },
    };
    return map[level] || { emoji: "", label: level };
  },
};
