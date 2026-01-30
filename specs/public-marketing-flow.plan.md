# Skillrok Public Marketing Flow Plan

## Application Overview

Validates the Skillrok public marketing homepage content and login redirect without authentication requirements.

## Test Scenarios

### 1. Public Marketing Experience

**Seed:** `tests/coach-view/seed.spec.ts`

#### 1.1. Marketing homepage smoke

**File:** `tests/coach-view/public-marketing-flow.spec.js`

**Steps:**
  1. Launch the public marketing base URL in a clean browser context.
  2. Wait for the network to become idle and confirm the landing URL remains the marketing root.
  3. Validate header navigation controls (Learning Library, About us, Contact us, Subscription, Login) are visible.
  4. Confirm hero messaging shows the maintenance headline and subtext.
  5. Scroll to the footer and validate logo text, description, quick links, and copyright copy.
  6. Click the Login button, capture the spawned tab, and wait for it to finish loading.
  7. Confirm the login tab URL matches https://patashala-testjan16-820.skillrok.com/learner and displays an Email textbox.

**Expected Results:**
  - Marketing page loads with no redirects away from https://patashala-testjan16-820.skillrok.com/.
  - Header navigation items and login CTA are visible and actionable.
  - Hero heading and subtext read exactly as specified.
  - Footer content matches the required branding, quick links, and copyright text.
  - Login CTA opens a new tab pointing to the learner URL under the patashala-testjan16-820.skillrok.com domain.
  - Login page finishes loading and renders the Email textbox, proving accessibility.
