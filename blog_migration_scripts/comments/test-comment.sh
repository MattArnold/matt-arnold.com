#!/bin/bash
curl -X POST http://localhost:8092/.netlify/functions/comments \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com", 
    "message": "This is a test comment",
    "postSlug": "test-post"
  }'
