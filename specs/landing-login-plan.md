# Skolasti Landing & Login Test Plan

**Target build**: Latest staging release (specify build/commit in test run)
**Base URL**: `https://skolastidev1.skolasti.com/`
**Seed test**: `tests/seed.spec.ts`
**Test data**:
- User: `Sirisha.b@inovar-tech.com`
- Password: `Skolasti@123`

## Preconditions
- Browsers installed through `npx playwright install --with-deps`.
- Account above exists with permissions to access dashboard and create courses.
- Test data reset script seeded with at least one existing course template but zero draft courses.
- Network allows calls to authentication, content, and media CDNs.

## Scenario 1: Landing Page Navigation & Visual Elements
**Goal**: Ensure critical landing-page UI renders and interactive hooks respond.
1. Load base URL.
   - Expect page status 200, no blocking requests.
2. Verify global header is visible with logo, primary nav (Home, Solutions, Pricing, Resources, Contact), login CTA.
   - Hover each nav item to confirm hover states and correct href targets.
3. Inspect hero section (headline, supporting copy, hero media, "Get Started" and "Request Demo" CTAs).
   - Resize viewport to mobile breakpoint and confirm hero stacks vertically with menu collapsed into hamburger.
4. Scroll to feature grid / value props.
   - Confirm icons load, copy matches product messaging, and "Learn more" anchors scroll to the right section.
5. Validate testimonials or social proof carousel auto-advances and supports manual navigation.
6. Confirm footer shows sitemap links, social icons, privacy links, and contact info; links open in correct targets.

## Scenario 2: Landing Page → Login Entry Points
**Goal**: Confirm all login entry points route to the same auth form.
1. Click header "Login" CTA.
   - Expect navigation to `/login` with auth form rendered in <3s.
2. Return to landing, click hero "Get Started" CTA.
   - Expect same `/login` route with CTA query captured (analytics event logged).
3. Validate footer "Access Portal" (or equivalent) also routes to `/login`.
4. From mobile view, open hamburger menu, tap "Login"; ensure drawer closes and user is taken to `/login`.

## Scenario 3: Login Form Validation
**Goal**: Validate client-side and server-side guardrails before authenticating.
1. On `/login`, ensure email and password inputs, "Remember me" checkbox, "Forgot password" link, and submit button are visible and enabled.
2. Leave both fields blank; click "Sign In".
   - Expect inline validation: email required, password required, submit blocked.
3. Enter invalid email format `sirisha@invalid` + any password; submit.
   - Expect email format error.
4. Enter valid email with incorrect password; submit.
   - Expect server error message without lockout; error banner accessible (role="alert").
5. Trigger "Forgot password"; verify reset modal or redirect appears with instructions.

## Scenario 4: Successful Authentication Flow
**Goal**: Ensure happy-path login works with provided credentials.
1. Enter username `Sirisha.b@inovar-tech.com` and password `Skolasti@123`; click "Sign In".
2. Verify spinner/progress indicator shows until dashboard loads.
3. Confirm redirected dashboard URL (e.g., `/app/dashboard`).
4. Validate auth cookies/token stored securely (HttpOnly, Secure) and local/session storage contains no secrets.
5. Refresh page to confirm session persistence; log out using avatar menu and ensure redirect back to landing/login.

## Scenario 5: Post-Login UI Smoke
**Goal**: Confirm key dashboard widgets render and respond.
1. Re-login (or skip logout). Check presence of:
   - Global nav (Dashboard, Courses, Learners, Reports, Settings).
   - Notification bell, help icon, user avatar.
2. Validate KPI tiles (Active learners, Courses in progress, Completion rate) show data and tooltips.
3. Test filters/date range controls update KPI values and charts.
4. Open announcements drawer; ensure cards expandable and links open in new tab.
5. Switch theme (if available) and confirm components restyle without layout shift.

## Scenario 6: Courses List & Creation Workflow
**Goal**: Verify course management UI and ability to create new course.
1. Navigate to `Courses` from nav; ensure table/grid loads with search, status filter, and pagination.
2. Use search to locate existing course; ensure debounce <500ms and empty states informative.
3. Click "New Course" button.
   - Expect modal or wizard with required sections: Overview, Curriculum, Publishing.
4. Step 1 (Overview):
   - Provide title, description, category, thumbnail upload.
   - Validate required-field messaging by clearing fields before proceeding.
5. Step 2 (Curriculum):
   - Add at least two modules with lessons, attach resources.
   - Drag-and-drop reorder should update numbering.
6. Step 3 (Publishing):
   - Choose visibility (draft/published), set enrollment open date, price (if applicable).
   - Toggle prerequisite flags and ensure dependent fields enable/disable correctly.
7. Submit course creation; confirm success toast, redirected to course detail page.
8. Course detail page should display metadata, syllabus, publish status, and actions (Edit, Duplicate, Archive).
9. Return to Courses list; ensure new course appears at top with correct status and filters update accordingly.

## Scenario 7: Accessibility & Reliability Checks
**Goal**: Ensure landing, login, and dashboard uphold baseline accessibility & resiliency.
1. Run axe-core scan on landing and dashboard; no critical violations.
2. Keyboard-only navigation from landing through login and into course creation wizard should be possible; focus outlines visible.
3. Validate components announce via screen reader (aria-labels for CTA, form controls, toasts).
4. Simulate network slowdown (Fast 3G) while logging in; ensure loaders appear and operations succeed within acceptable timeout.

## Metrics & Reporting
- Capture screenshots for each major section (desktop & mobile).
- Record performance timings (TTFB, LCP, interaction to next paint) for landing and dashboard.
- Log defects with severity, reproduction steps, and affected build.

## Exit Criteria
- All scenarios executed and pass.
- No Sev1/Sev2 defects open for landing/login/course creation areas.
- Accessibility scan free of blocking issues.
