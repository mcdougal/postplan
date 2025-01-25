# postplan

## Getting Started

- [Cloudflare Tunnel setup instructions](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-local-tunnel/#prerequisites)
- Add to `~/.cloudflared/config.yml` (NOTE: Cloudflare can only generate SSL certs for one-level subdomains):

  ```yaml
  ingress:
    # Postplan
    - hostname: postplan-app.cedricmcdougal.com
      service: http://localhost:3000
    - hostname: postplan-supabase.cedricmcdougal.com
      service: http://localhost:54321
  ```

- Add subdomains to Cloudflare DNS:

  ```sh
  cloudflared tunnel route dns dev postplan-app.cedricmcdougal.com
  cloudflared tunnel route dns dev postplan-supabase.cedricmcdougal.com
  ```

- `npm install`
- `npm run db:start`
- `npm run db:migrate`
- Create a Supabase bucket
  1. In the Supabase dashboard, go to Storage
  2. Click "New bucket", name it "postplan" and save
- Add RLS policy to Supabase storage:
  1. In the Supabase dashboard, go to Storage > Policies
  2. Click "New policy" under the "postplan" bucket
  3. Create a policy from scratch
  4. Name the policy "postplan", select all operations, leave everything else
  5. Click "Review" then "Save policy"

## Running Dev Environment

- `npm run dev`
- `npm run inngest`
- `npm run tunnel`
