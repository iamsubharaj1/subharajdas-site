import {
  pgTable, text, serial, integer, timestamp, boolean,
  real, date, pgEnum
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// ─── Enums ────────────────────────────────────────────────────────────────────

export const userRoleEnum = pgEnum("user_role", ["user", "superadmin"]);
export const specialDayTypeEnum = pgEnum("special_day_type", ["holiday", "travel", "sick", "catchup"]);
export const taskStatusEnum = pgEnum("task_status", ["pending", "done", "partial", "missed", "blocked"]);
export const commitmentTypeEnum = pgEnum("commitment_type", ["fulltime", "specific_hours"]);

// ─── EXISTING TABLE (kept) ────────────────────────────────────────────────────

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── USERS ────────────────────────────────────────────────────────────────────

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  salt: text("salt").notNull(),
  role: userRoleEnum("role").notNull().default("user"),
  isActive: boolean("is_active").notNull().default(true),
  onboardingComplete: boolean("onboarding_complete").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastLogin: timestamp("last_login"),
});

// ─── USER SCHEDULE CONFIG ────────────────────────────────────────────────────

export const userScheduleConfig = pgTable("user_schedule_config", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  commitmentType: commitmentTypeEnum("commitment_type").notNull().default("fulltime"),
  dailyHoursWeekday: real("daily_hours_weekday").notNull().default(9.5),
  dailyHoursSaturday: real("daily_hours_saturday").notNull().default(3.0),
  dailyHoursHoliday: real("daily_hours_holiday").notNull().default(3.0),
  startTime: text("start_time").notNull().default("10:00"),
  endTime: text("end_time").notNull().default("19:30"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ─── GOALS ───────────────────────────────────────────────────────────────────

export const goals = pgTable("goals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  description: text("description"),
  isPrimary: boolean("is_primary").notNull().default(false),
  priorityRank: integer("priority_rank"),
  estimatedWeeks: integer("estimated_weeks"),
  toughnessScore: integer("toughness_score"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── GOAL BOOK INSIGHTS ───────────────────────────────────────────────────────

export const goalBookInsights = pgTable("goal_book_insights", {
  id: serial("id").primaryKey(),
  goalId: integer("goal_id").notNull().references(() => goals.id),
  userId: integer("user_id").notNull().references(() => users.id),
  book: text("book").notNull(),
  tentacleNumber: integer("tentacle_number").notNull(),
  insight: text("insight").notNull(),
  actionItems: text("action_items"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── SPECIAL DAYS ────────────────────────────────────────────────────────────

export const specialDays = pgTable("special_days", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  dayDate: date("day_date").notNull(),
  dayType: specialDayTypeEnum("day_type").notNull(),
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── WEEKS ───────────────────────────────────────────────────────────────────

export const weeks = pgTable("weeks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  weekNumber: integer("week_number").notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  theme: text("theme"),
  focusDescription: text("focus_description"),
  phase: text("phase"),
  totalHoursPlanned: real("total_hours_planned"),
  totalHoursActual: real("total_hours_actual"),
  momentumScore: real("momentum_score"),
  isGenerated: boolean("is_generated").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── TASK ASSIGNMENTS ────────────────────────────────────────────────────────

export const taskAssignments = pgTable("task_assignments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  weekId: integer("week_id").notNull().references(() => weeks.id),
  goalId: integer("goal_id").references(() => goals.id),
  taskDate: date("task_date").notNull(),
  dayOfWeek: text("day_of_week").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  bookSource: text("book_source"),
  priority: integer("priority").notNull().default(1),
  estimatedMinutes: integer("estimated_minutes"),
  status: taskStatusEnum("status").notNull().default("pending"),
  updatedAt: timestamp("updated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── TASK COMPLETIONS ────────────────────────────────────────────────────────

export const taskCompletions = pgTable("task_completions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  taskId: integer("task_id").notNull().references(() => taskAssignments.id),
  completionDate: date("completion_date").notNull(),
  status: taskStatusEnum("status").notNull().default("pending"),
  blockedReason: text("blocked_reason"),
  notes: text("notes"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── DAILY LOGS ──────────────────────────────────────────────────────────────

export const dailyLogs = pgTable("daily_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  logDate: date("log_date").notNull(),
  checkInCompleted: boolean("check_in_completed").notNull().default(false),
  checkInAnswers: text("check_in_answers"),
  aiAnalysis: text("ai_analysis"),
  energyScore: integer("energy_score"),
  tasksPlanned: integer("tasks_planned").notNull().default(0),
  tasksDone: integer("tasks_done").notNull().default(0),
  streakDay: boolean("streak_day").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── STREAK ──────────────────────────────────────────────────────────────────

export const streak = pgTable("streak", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id).unique(),
  currentStreak: integer("current_streak").notNull().default(0),
  longestStreak: integer("longest_streak").notNull().default(0),
  lastActiveDate: date("last_active_date"),
  totalActiveDays: integer("total_active_days").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ─── COMPOUND SELF ITEMS ─────────────────────────────────────────────────────

export const compoundSelfItems = pgTable("compound_self_items", {
  id: serial("id").primaryKey(),
  book: text("book").notNull(),
  chapter: text("chapter"),
  theme: text("theme"),
  actionItem: text("action_item").notNull(),
  domain: text("domain").notNull(),
  frequency: text("frequency").notNull(),
  level: text("level").notNull(),
  priority: integer("priority").notNull(),
});

// ─── ACTIVATED COMPOUND SELF ITEMS ───────────────────────────────────────────

export const activatedItems = pgTable("activated_items", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  itemId: integer("item_id").notNull().references(() => compoundSelfItems.id),
  goalId: integer("goal_id").references(() => goals.id),
  isActive: boolean("is_active").notNull().default(true),
  activatedAt: timestamp("activated_at").defaultNow().notNull(),
});

// ─── INSERT SCHEMAS ───────────────────────────────────────────────────────────

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true, createdAt: true,
});
export const insertUserSchema = createInsertSchema(users).omit({
  id: true, createdAt: true, lastLogin: true,
});
export const insertGoalSchema = createInsertSchema(goals).omit({
  id: true, createdAt: true,
});
export const insertSpecialDaySchema = createInsertSchema(specialDays).omit({
  id: true, createdAt: true,
});
export const insertTaskAssignmentSchema = createInsertSchema(taskAssignments).omit({
  id: true, createdAt: true,
});
export const insertTaskCompletionSchema = createInsertSchema(taskCompletions).omit({
  id: true, createdAt: true,
});
export const insertDailyLogSchema = createInsertSchema(dailyLogs).omit({
  id: true, createdAt: true,
});

// ─── TYPES ────────────────────────────────────────────────────────────────────

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type SafeUser = Omit<User, "passwordHash" | "salt">;
export type Goal = typeof goals.$inferSelect;
export type InsertGoal = z.infer<typeof insertGoalSchema>;
export type GoalBookInsight = typeof goalBookInsights.$inferSelect;
export type SpecialDay = typeof specialDays.$inferSelect;
export type InsertSpecialDay = z.infer<typeof insertSpecialDaySchema>;
export type Week = typeof weeks.$inferSelect;
export type TaskAssignment = typeof taskAssignments.$inferSelect;
export type InsertTaskAssignment = z.infer<typeof insertTaskAssignmentSchema>;
export type TaskCompletion = typeof taskCompletions.$inferSelect;
export type InsertTaskCompletion = z.infer<typeof insertTaskCompletionSchema>;
export type DailyLog = typeof dailyLogs.$inferSelect;
export type InsertDailyLog = z.infer<typeof insertDailyLogSchema>;
export type Streak = typeof streak.$inferSelect;
export type CompoundSelfItem = typeof compoundSelfItems.$inferSelect;
export type ActivatedItem = typeof activatedItems.$inferSelect;
export type UserScheduleConfig = typeof userScheduleConfig.$inferSelect;
