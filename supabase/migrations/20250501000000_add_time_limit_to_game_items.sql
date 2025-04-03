-- Add time_limit field to game_items table
ALTER TABLE game_items ADD COLUMN time_limit INTEGER DEFAULT NULL;