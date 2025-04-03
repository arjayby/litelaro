-- Add points field to game_items table
ALTER TABLE game_items ADD COLUMN points INTEGER NOT NULL DEFAULT 1;