# Platform Social Experience

A social-first Angular application for sharing posts, messaging, commenting, and discovering featured creators (Top Models). The experience wraps a feed, profile detail pages, real-time-like chat, and an admin console on top of a REST API.

## Key Features

- **Content feed** with posts, likes, media previews, and expandable comments.
- **Profiles** with cover/avatar uploads, follower/following stats, cached image busting, and profession chips pulled from the API.
- **Messaging** channel with chatrooms, typing awareness, and responsive layouts that hide the header/footer when scrolling.
- **Top Model directory** that surfaces creators with profession chips, career metadata, and lazy-loaded cards.
- **Admin console** for managing users, posts, and featured models (protected by an `admin` guard and server-side roles).
- **Authentication stack** covering registration, email verification, Twitch/TikTok social connect, and token refresh flows.

## Architecture Overview

1. **Angular Feature Modules**
	- `MainpagesModule`: feed, library, profile, content dialogs, gadgets, and shared UI.
	- `ChatModule`: chatroom, headers, and SignalR integration.
	- `AdminModule`: posts/users/top-models management guarded by `adminGuard`.
	- `Auth` components are either standalone or lazy-loaded for verification/login flows.

2. **Services & State**
	- `AuthenticationService`: token life cycle, refresh, and admin checks.
	- `HeaderService`: scroll tracking for header/footer visibility.
	- `FriendshipService`: follow/follower APIs, counts, and list operations.
	- `UserService`: profile pictures, cover images, and cache-busting URLs.
	- Specialized services for posts, chatrooms, and TikTok interactions.

3. **Styling & Layout**
	- Mobile-first SCSS with desktop overrides, fixed headers, and responsive chips.
	- Profession chips, navigation buttons, and modal dialogs share reusable styles through `SharedmoduleModule`.

## Getting Started

1. **Install dependencies**
	```powershell
	npm install
	```
2. **Set up environment**
	- Update `src/environments/environment.ts` with the correct `apiUrl`, OAuth keys, and other secrets.
	- Ensure the backend at `environment.apiUrl` is running so `/api/auth/refresh-token` and admin routes resolve.
3. **Run the app**
	```powershell
	npm start
	```
	The default host is `http://localhost:4200/`.
4. **Authentication flow**
	- Log in or register to populate tokens in `localStorage`.
	- Admin routes require `role: admin` (token guards check `role`, `roles`, or the Microsoft claim).
	- TikTok/Twitch social buttons rely on the backend redirect URIs defined in `environment.ts`.

## Useful Scripts

| Command | Description |
| --- | --- |
| `npm start` | Serve in watch mode (Angular dev server). |
| `npm run build` | Compiles production build into `dist/`. |
| `npm test` | Runs Karma unit tests if configured. |
| `npm run lint` | Runs available linters (if added). |

## Deployment Notes

- Static assets are located under `src/assets`; fonts and images (e.g., sections in `assets/fonts` and `assets/images`).
- `amplify.yml`, `netlify.toml`, and `bitbucket-pipelines.yml` illustrate possible CI/CD setups.
- Ensure environment-specific replacements (`environment.prod.ts`) point to the production API and OAuth redirect URIs.

## Admin & Maintenance

- `/admin` is lazy-loaded and guarded; missing or invalid tokens redirect to `/auth/welcome` or `/feed`.
- Admin components (`AdminPostListComponent`, `AdminUserComponent`, `AdminTopModelComponent`) depend on `AdminUsersService`, `AdminPostsService`, and `AdminProfessionsService` to talk to `/api/admin/*` endpoints.
- Profile updates (cover, avatar) are cache-busted by `UserService` before broadcasting new URLs.

## Tips

1. **Profile upload flow** uses `heic2any` to convert HEIC images to JPEG before upload.
2. **Following counts** use `FriendshipService.getFollowingCount`; follower stats and flows are kept in sync when following/unfollowing.
3. **Scrolling experience** hides the header/footer via `HeaderService` to maximize screen real estate on mobile.
4. **Top Models and Library views** display profession chips and adjust layout when the viewport is ≥1024px.

Keep this README updated as features grow or backend routes evolve.
