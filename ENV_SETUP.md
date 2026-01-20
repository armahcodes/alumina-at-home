# Environment Variables Setup Guide

## Quick Setup

1. Create a `.env.local` file in the project root (it's already in `.gitignore`)
2. Copy the environment variables below into your `.env.local` file

---

## Environment Variables

### Copy these into `.env.local`:

```env
# Neon Database
DATABASE_URL='postgresql://user:password@host/database?sslmode=require'

# Neon Auth
NEON_AUTH_BASE_URL='https://your-project.neonauth.your-region.aws.neon.tech/your-db/auth'

# AI Provider for Alumina Assistant
AI_PROVIDER=google
GOOGLE_GENERATIVE_AI_API_KEY='your_google_ai_api_key'
```

---

## AI Provider Configuration (Alumina Assistant)

The Alumina Assistant uses [Mastra v1](https://mastra.ai) with [AI SDK](https://sdk.vercel.ai) to support **40+ model providers**.

### Recommended: Google AI (Free Tier)

```env
AI_PROVIDER=google
GOOGLE_GENERATIVE_AI_API_KEY='your_key_here'
```

**Get your free API key:** https://aistudio.google.com/apikey

### Alternative: Anthropic (Claude)

```env
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY='your_key_here'
```

**Get your API key:** https://console.anthropic.com/

### Alternative: OpenAI

```env
AI_PROVIDER=openai
OPENAI_API_KEY='your_key_here'
```

**Get your API key:** https://platform.openai.com/api-keys

### Adding More Providers

Mastra supports many more providers. To add them:

```bash
# Install the provider SDK
npm install @ai-sdk/groq @ai-sdk/mistral @ai-sdk/togetherai

# Add to your .env.local
GROQ_API_KEY=your_key
```

Then update `lib/mastra/index.ts` to include the new provider case.

---

## Setup Instructions

### Step 1: Create .env.local file

```bash
# From project root
touch .env.local
```

### Step 2: Add the environment variables

Open `.env.local` in your editor and paste:

```env
# Database
DATABASE_URL='postgresql://user:password@host/database?sslmode=require'

# Neon Auth
NEON_AUTH_BASE_URL='https://your-project.neonauth.your-region.aws.neon.tech/your-db/auth'

# AI Provider (choose one)
AI_PROVIDER=google
GOOGLE_GENERATIVE_AI_API_KEY='your_google_ai_key'
# ANTHROPIC_API_KEY='your_anthropic_key'
# OPENAI_API_KEY='your_openai_key'
```

### Step 3: Verify setup

```bash
# Restart your dev server
npm run dev
```

You should see NO warnings about missing environment variables.

---

## What Each Variable Does

### DATABASE_URL
- **Purpose:** Connection string for Neon PostgreSQL database
- **Used by:** `lib/db.ts` - All database operations
- **Format:** `postgresql://user:password@host/database?sslmode=require`

### NEON_AUTH_BASE_URL
- **Purpose:** Base URL for Neon Auth service
- **Used by:** Auth middleware and auth routes
- **Format:** `https://your-project.neonauth.region.aws.neon.tech/database/auth`

### AI_PROVIDER
- **Purpose:** Select which AI model provider to use
- **Options:** `google`, `anthropic`, `openai`
- **Default:** `google` (if not set)

### GOOGLE_GENERATIVE_AI_API_KEY
- **Purpose:** API key for Google AI (Gemini models)
- **Models used:** `gemini-2.0-flash`
- **Get key:** https://aistudio.google.com/apikey

### ANTHROPIC_API_KEY
- **Purpose:** API key for Anthropic (Claude models)
- **Models used:** `claude-3-5-sonnet-20241022`
- **Get key:** https://console.anthropic.com/

### OPENAI_API_KEY
- **Purpose:** API key for OpenAI (GPT models)
- **Models used:** `gpt-4o-mini`
- **Get key:** https://platform.openai.com/api-keys

---

## Security Notes

### What's Safe to Commit?
- `.env.example` - YES (template with placeholder values)
- `.env.local` - NO (contains real credentials, already in .gitignore)

### Public vs Private Variables
**Public (NEXT_PUBLIC_*):**
- These are exposed to the browser
- Safe to use in client-side React components
- Should not contain sensitive secrets

**Private (no prefix):**
- Only available in server-side code (API routes, server components)
- Never exposed to the browser
- Can contain sensitive secrets

---

## Troubleshooting

### "DATABASE_URL is not set" warning
**Cause:** Environment variable not found  
**Solution:** 
1. Check `.env.local` exists in project root
2. Verify the file contains `DATABASE_URL=...`
3. Restart dev server: `npm run dev`

### AI Assistant returns fallback response
**Cause:** Missing or invalid AI provider API key  
**Solution:**
1. Verify `AI_PROVIDER` is set correctly
2. Check the corresponding API key is set
3. Test your API key directly with the provider

### Database connection fails
**Cause:** Neon database may be in sleep mode  
**Solution:** Wait 10-20 seconds for Neon to wake up, then try again

---

## For Production (Vercel, Netlify, etc.)

Add these environment variables in your hosting platform's dashboard:

1. Go to your project settings
2. Find "Environment Variables" section
3. Add each variable:
   - `DATABASE_URL`
   - `NEON_AUTH_BASE_URL`
   - `AI_PROVIDER`
   - Your chosen provider's API key (e.g., `GOOGLE_GENERATIVE_AI_API_KEY`)

**Note:** Some platforms require redeployment after adding environment variables.

---

## Quick Test

After setup, test your AI configuration:

```bash
# Start dev server
npm run dev

# Test the chat API
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello!"}]}'
```

If configured correctly, you'll get an AI response from Alumina.

---

## Need Help?

- [Mastra Documentation](https://mastra.ai/docs)
- [AI SDK Documentation](https://sdk.vercel.ai/docs)
- [Google AI Studio](https://aistudio.google.com)
- [Neon Documentation](https://neon.tech/docs)
- Check `DATABASE_MIGRATION.md` for full migration guide
