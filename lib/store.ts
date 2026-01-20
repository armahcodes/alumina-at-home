import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserProfile {
  name: string;
  email: string;
  goals: string[];
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  availableTime: number; // minutes per day
  healthConditions: string[];
  budget: 'essential' | 'intermediate' | 'premium';
}

interface DailyMetrics {
  date: string;
  energy: number;
  sleep: number;
  mood: number;
  completed: string[];
  notes?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface AppState {
  // User & Auth
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  user: UserProfile | null;

  // Gamification
  currentStreak: number;
  longestStreak: number;
  totalPoints: number;
  achievements: Achievement[];

  // Daily Tracking
  completedTasks: string[];
  supplements: string[]; // Track taken supplements
  dailyMetrics: DailyMetrics[];

  // Actions
  login: (email: string, password: string) => void;
  logout: () => void;
  completeOnboarding: (profile: UserProfile) => void;
  updateUser: (profile: Partial<UserProfile>) => void;
  toggleTask: (taskId: string) => void;
  toggleSupplement: (supplementId: string) => void;
  addDailyMetric: (metric: DailyMetrics) => void;
  unlockAchievement: (achievementId: string) => void;
  incrementStreak: () => void;
  addPoints: (points: number) => void;
  resetDay: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial State
      isAuthenticated: false,
      hasCompletedOnboarding: false,
      user: null,
      currentStreak: 0,
      longestStreak: 0,
      totalPoints: 0,
      achievements: [],
      completedTasks: [],
      supplements: [],
      dailyMetrics: [],

      // Actions
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      login: (email: string, _password: string) => {
        // Simple auth for MVP - replace with real auth later
        set({
          isAuthenticated: true,
          user: { ...get().user!, email }
        });
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          hasCompletedOnboarding: false
        });
      },

      completeOnboarding: (profile: UserProfile) => {
        set({
          hasCompletedOnboarding: true,
          user: profile
        });
      },

      updateUser: (profile: Partial<UserProfile>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...profile }
          });
        }
      },

      toggleTask: (taskId: string) => {
        const current = get().completedTasks;
        const newTasks = current.includes(taskId)
          ? current.filter(t => t !== taskId)
          : [...current, taskId];

        set({ completedTasks: newTasks });

        // Award points
        if (newTasks.length > current.length) {
          get().addPoints(10);
        }
      },

      toggleSupplement: (supplementId: string) => {
        const current = get().supplements;
        const newSupplements = current.includes(supplementId)
          ? current.filter(s => s !== supplementId)
          : [...current, supplementId];

        set({ supplements: newSupplements });

        // Award points for taking supplements
        if (newSupplements.length > current.length) {
          get().addPoints(5);
        }
      },

      addDailyMetric: (metric: DailyMetrics) => {
        set({
          dailyMetrics: [...get().dailyMetrics, metric]
        });
      },

      unlockAchievement: (achievementId: string) => {
        const achievements = get().achievements;
        const achievement = achievements.find(a => a.id === achievementId);

        if (achievement && !achievement.unlockedAt) {
          set({
            achievements: achievements.map(a =>
              a.id === achievementId
                ? { ...a, unlockedAt: new Date().toISOString() }
                : a
            )
          });

          // Award bonus points for achievement
          get().addPoints(100);
        }
      },

      incrementStreak: () => {
        const newStreak = get().currentStreak + 1;
        const longestStreak = Math.max(newStreak, get().longestStreak);

        set({
          currentStreak: newStreak,
          longestStreak
        });

        // Check for streak achievements
        if (newStreak === 7) get().unlockAchievement('streak-7');
        if (newStreak === 30) get().unlockAchievement('streak-30');
        if (newStreak === 90) get().unlockAchievement('streak-90');
      },

      addPoints: (points: number) => {
        set({ totalPoints: get().totalPoints + points });
      },

      resetDay: () => {
        set({ completedTasks: [], supplements: [] });
      }
    }),
    {
      name: 'alumina-storage',
    }
  )
);
