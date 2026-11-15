# Message to CD — Supabase setup

Message to CD uses local demo storage until a Supabase project is connected. Demo messages live in this browser's local storage and are not visible on another device. Once configured, the same form saves messages to Supabase, and the private inbox can be opened at `/admin/messages`.

## 1. Create the Supabase project and database

1. Create a Supabase project and keep its project URL and anon/publishable key available.
2. Open **SQL Editor** in the Supabase dashboard.
3. Run the migration in `supabase/migrations/20261113000000_create_message_inbox.sql`.
4. In **Authentication → Providers**, make sure Email/password sign-in is enabled. Create the owner's user in **Authentication → Users**. Complete any email confirmation required by the project settings.
5. Copy the new owner's user UUID from the Users page. In the SQL Editor, allowlist that account:

   ```sql
   insert into private.message_owners (user_id)
   values ('OWNER_AUTH_USER_UUID');
   ```

   Run this statement in the Supabase dashboard as the project administrator. Keep public sign-ups disabled if only the owner should have an account.

The migration allows the public roles to insert a valid message only. The public roles have no select, update, or delete privileges. Authenticated users can read, update the read flag, and delete rows only when their user ID is present in the private owner table. The owner allowlist is not exposed through the API. The owner check uses a narrowly scoped security-definer helper in the unexposed `private` schema; its search path is pinned and object names are schema-qualified. These are important parts of the Supabase RLS model; see the [Supabase Row Level Security guide](https://supabase.com/docs/guides/database/postgres/row-level-security).

## 2. Configure local development

Copy `.env.example` to `.env.local`, then set:

```dotenv
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_OR_PUBLISHABLE_KEY
```

Restart the Vite development server after changing environment variables. Only use the public anon/publishable key in this frontend. **Never** put a service-role key in a `VITE_` variable, source file, or browser deployment. RLS protects every database operation.

If the values are absent, the desktop app remains usable in demo mode. A successful demo submission is saved only in the current browser under `satwika.message-to-cd.demo.v1`; it is explicitly labeled as device-only and cannot appear in the remote owner inbox.

## 3. Configure Vercel

In the Vercel project, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under **Settings → Environment Variables** for the environments you plan to use, then redeploy. The repository's `vercel.json` rewrites `/admin/messages` to the Vite single-page app entry point; see [Vercel rewrites](https://vercel.com/docs/routing/rewrites).

## 4. Try the full flow

1. Open the deployed Satwika OS and launch **Message to CD** from its existing desktop shortcut or Start Menu entry.
2. Submit a short test note. The success screen appears only after Supabase confirms the insert.
3. Open `https://YOUR_DEPLOYMENT_HOST/admin/messages` on any device and sign in with the allowlisted owner account.
4. Confirm the test note appears newest first. Open it, mark it read or unread, and delete it only when desired.
5. To check the boundary, sign in with a different authenticated account that is not allowlisted. It should not see the inbox; public/anonymous requests cannot read messages.

Owner authentication uses Supabase password sign-in. The owner route checks the signed-in user's allowlist status for its interface, while RLS independently enforces read, update, and delete access in the database. See the official [password sign-in reference](https://supabase.com/docs/reference/javascript/auth-signinwithpassword).

## Data and behavior

- Messages contain only a UUID, message text, timestamp, and read flag; sender identity is not collected.
- Message text is limited to 2,000 characters in the app and database.
- Failed remote inserts show an error and preserve the draft. They are not silently written to local demo storage.
- The public form cannot retrieve submitted messages.
- `/admin/messages` is a route, not an authentication boundary by itself. Supabase Auth and database RLS enforce access.
- Realtime subscriptions are not enabled; use **Refresh** to load messages submitted after the inbox was opened.
