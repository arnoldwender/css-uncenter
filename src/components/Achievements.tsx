import { motion, AnimatePresence } from "framer-motion";
import { type Achievement } from "../constants";
import { Zap, Flame, Skull, Bomb, Trophy, Crown } from "lucide-react";

/* ── Achievement badges display ── */
interface AchievementsProps {
  achievements: Achievement[];
  unlockedIds: string[];
  newlyUnlocked: string | null;
}

/* Map icon string names to lucide components */
const ICON_MAP: Record<string, React.ElementType> = {
  ZAP: Zap,
  FLAME: Flame,
  SKULL: Skull,
  BOMB: Bomb,
  TROPHY: Trophy,
  CROWN: Crown,
};

export function Achievements({ achievements, unlockedIds, newlyUnlocked }: AchievementsProps) {
  const hasAny = unlockedIds.length > 0;

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div
        style={{
          fontSize: "0.62rem",
          letterSpacing: "4px",
          color: "#00ffff77",
          marginBottom: "0.75rem",
        }}
      >
        ACHIEVEMENTS ({unlockedIds.length}/{achievements.length})
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.4rem" }}>
        {achievements.map((ach) => {
          const unlocked = unlockedIds.includes(ach.id);
          const isNew = newlyUnlocked === ach.id;
          const IconComponent = ICON_MAP[ach.icon] || Zap;

          return (
            <motion.div
              key={ach.id}
              animate={isNew ? { scale: [1, 1.15, 1], borderColor: ["#00ffff22", "#00ffff", "#00ffff22"] } : {}}
              transition={{ duration: 0.6 }}
              style={{
                border: `1px solid ${unlocked ? "#00ffff44" : "#00ffff11"}`,
                background: unlocked ? "#00ffff08" : "transparent",
                padding: "0.5rem",
                textAlign: "center",
                opacity: unlocked ? 1 : 0.35,
              }}
            >
              <div style={{ marginBottom: "0.3rem", display: "flex", justifyContent: "center" }}>
                <IconComponent
                  size={16}
                  color={unlocked ? "#00ffff" : "#00ffff44"}
                  style={{ filter: unlocked ? "drop-shadow(0 0 4px #00ffff)" : "none" }}
                />
              </div>
              <div style={{ fontSize: "0.5rem", color: unlocked ? "#00ffff" : "#00ffff44", letterSpacing: "1px", marginBottom: "0.15rem" }}>
                {ach.title}
              </div>
              <div style={{ fontSize: "0.45rem", color: "#00ffff33", lineHeight: "1.3" }}>
                {unlocked ? ach.description : "???"}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Toast notification for newly unlocked achievement */}
      <AnimatePresence>
        {newlyUnlocked && hasAny && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            transition={{ duration: 0.4 }}
            style={{
              position: "fixed",
              bottom: "2rem",
              left: "50%",
              background: "#000",
              border: "1px solid #00ffff",
              boxShadow: "0 0 20px #00ffff44, 0 0 40px #00ffff22",
              padding: "0.8rem 1.5rem",
              zIndex: 10000,
              textAlign: "center",
              fontFamily: "monospace",
            }}
          >
            <div style={{ fontSize: "0.55rem", color: "#00ffff66", letterSpacing: "3px", marginBottom: "0.3rem" }}>
              ACHIEVEMENT UNLOCKED
            </div>
            <div style={{ fontSize: "0.75rem", color: "#00ffff", letterSpacing: "1px" }}>
              {achievements.find((a) => a.id === newlyUnlocked)?.title}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
