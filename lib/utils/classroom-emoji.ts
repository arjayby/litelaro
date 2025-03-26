export const getClassroomEmoji = {
  visibility: (type: string) => {
    const map: Record<string, { emoji: string; label: string }> = {
      public: { emoji: "🌍", label: "Public" },
      "invite-only": { emoji: "👥", label: "Invite Only" },
    };
    return map[type] || { emoji: "", label: type };
  },
};
