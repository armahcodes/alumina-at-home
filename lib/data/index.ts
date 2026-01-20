/**
 * Alumina At Home - Content Data Index
 * 
 * Central export for all longevity content data.
 */

// Protocols
export { 
  protocols, 
  protocolCategories, 
  dailySchedules,
  type Protocol,
  type ProtocolStep,
  type ProtocolCategory,
  type DailySchedule
} from './protocols';

// Supplements
export {
  supplements,
  supplementStacks,
  supplementCategories,
  type Supplement,
  type SupplementStack,
  type SupplementCategory
} from './supplements';

// Equipment
export {
  equipment,
  equipmentCategories,
  equipmentBundles,
  type Equipment,
  type EquipmentCategory,
  type EquipmentBundle
} from './equipment';

// Videos
export {
  videos,
  videoCategories,
  videoCollections,
  type Video,
  type VideoCategory,
  type VideoCollection
} from './videos';

// Environment
export {
  rooms,
  environmentAssessment,
  type Room,
  type Optimization,
  type RoomMetric,
  type AssessmentQuestion
} from './environment';

// Achievements
export {
  achievements,
  levels,
  achievementCategories,
  calculateLevel,
  getNextLevel,
  getProgressToNextLevel,
  getTierColor,
  type Achievement,
  type AchievementCriteria,
  type AchievementCategory,
  type Level
} from './achievements';

// ============================================================================
// QUICK STATS
// ============================================================================

import { protocols } from './protocols';
import { supplements } from './supplements';
import { equipment } from './equipment';
import { videos } from './videos';
import { rooms } from './environment';
import { achievements } from './achievements';

export const contentStats = {
  protocols: protocols.length,
  supplements: supplements.length,
  equipment: equipment.length,
  videos: videos.length,
  rooms: rooms.length,
  achievements: achievements.length,
  
  // Detailed breakdowns
  protocolsByCategory: protocols.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>),
  
  supplementsByTier: supplements.reduce((acc, s) => {
    acc[s.tier] = (acc[s.tier] || 0) + 1;
    return acc;
  }, {} as Record<string, number>),
  
  videosByCategory: videos.reduce((acc, v) => {
    acc[v.category] = (acc[v.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>),
  
  totalVideoMinutes: Math.round(videos.reduce((sum, v) => sum + v.duration, 0) / 60),
  
  achievementsByTier: achievements.reduce((acc, a) => {
    acc[a.tier] = (acc[a.tier] || 0) + 1;
    return acc;
  }, {} as Record<string, number>)
};
