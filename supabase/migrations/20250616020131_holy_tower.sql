/*
  # Seed Spam Database with Sample Data

  1. Sample Data
    - Add common spam/scam phone numbers
    - Add various spam types (robocalls, scams, telemarketing)
    - Add confidence scores and reported counts

  2. Purpose
    - Provide initial data for testing
    - Demonstrate spam detection capabilities
    - Show realistic spam patterns
*/

-- Insert sample spam numbers
INSERT INTO spam_database (phone_number, spam_type, confidence_score, reported_count, last_reported) VALUES
  ('+15551234567', 'robocall', 95, 1247, now() - interval '2 hours'),
  ('+15559876543', 'scam', 98, 2156, now() - interval '1 hour'),
  ('+15555555555', 'telemarketing', 87, 892, now() - interval '3 hours'),
  ('+15551112222', 'robocall', 92, 1543, now() - interval '5 hours'),
  ('+15553334444', 'scam', 99, 3421, now() - interval '30 minutes'),
  ('+15556667777', 'telemarketing', 84, 567, now() - interval '4 hours'),
  ('+15558889999', 'robocall', 91, 1876, now() - interval '6 hours'),
  ('+15550001111', 'scam', 97, 2987, now() - interval '45 minutes'),
  ('+15552223333', 'telemarketing', 86, 743, now() - interval '7 hours'),
  ('+15554445555', 'robocall', 93, 1654, now() - interval '2.5 hours'),
  ('+15556668888', 'scam', 96, 2234, now() - interval '1.5 hours'),
  ('+15557778888', 'telemarketing', 82, 456, now() - interval '8 hours'),
  ('+15559990000', 'robocall', 94, 1987, now() - interval '3.5 hours'),
  ('+15551110000', 'scam', 98, 3156, now() - interval '20 minutes'),
  ('+15552220000', 'telemarketing', 85, 634, now() - interval '5.5 hours')
ON CONFLICT (phone_number) DO NOTHING;

-- Add some international spam numbers
INSERT INTO spam_database (phone_number, spam_type, confidence_score, reported_count, last_reported) VALUES
  ('+442012345678', 'scam', 89, 567, now() - interval '4 hours'),
  ('+919876543210', 'robocall', 91, 1234, now() - interval '6 hours'),
  ('+861234567890', 'telemarketing', 83, 345, now() - interval '8 hours'),
  ('+4915123456789', 'scam', 94, 876, now() - interval '2 hours'),
  ('+33123456789', 'robocall', 88, 654, now() - interval '5 hours')
ON CONFLICT (phone_number) DO NOTHING;