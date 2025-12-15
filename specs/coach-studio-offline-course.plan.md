# Coach Studio Offline Course Plan

## Application Overview

Covers Skolasti coach view workflows for creating and publishing offline courses, building curricula with multiple lesson types, validating uploads, verifying Content Library entries, configuring subscription plans, and checking required integrations for live delivery.

## Test Scenarios

### 1. Studio - Course Creation

**Seed:** `tests/seed.spec.ts`

#### 1.1. Create Offline Course With Metadata

**File:** `tests/coach-studio/create-offline-course.spec.ts`

**Steps:**
  1. 1. From coach dashboard, open Creation Hub → Studio and click "Create course".
  2. 2. Fill Title, Category (e.g., Leadership), Course Level, Description, and four skill fields with valid text.
  3. 3. Attempt to submit with any required field blank to confirm inline validation, then correct it.
  4. 4. Click "Create Course" and wait for toast/redirect to Details tab of the new course.
  5. 5. Verify Details tab pre-populates hero, Created/Modified timestamps, and Save/Publish controls.

**Expected Results:**
  - Course form blocks submission until all required metadata is provided and shows inline error states.
  - Successful creation lands on Details tab for the new course with metadata persisted.
  - Save/Publish buttons remain disabled until curriculum content exists.

#### 1.2. Curriculum Builder Supports All Lesson Types

**File:** `tests/coach-studio/curriculum-all-lesson-types.spec.ts`

**Steps:**
  1. 1. On the course Curriculum tab, use "Add New Section" to create a section (e.g., Orientation Module).
  2. 2. Click "Add lesson" and choose Video → My device; upload a valid 16:9 thumbnail/video file and Save Lesson.(For video Use this path to upload a file by clicking on my devices:"D:\Skolasti files\file_example_MP4_480_1_5MG.mp4", For Image Use this path to upload a file by clicking on my devices:"D:\Skolasti files\Thumbnail image.jpg")
  3. 3. Add Audio lesson via Link mode; provide a streaming URL and confirm upload state toggles to ready.(For Audio Use this path to upload a file by clicking on my devices:"D:\Skolasti files\file_example_MP3_1MG.mp3")
  4. 4. Add Document lesson by uploading a PDF, ensuring file validation (size/type) passes and metadata fields are filled.(For Document Use this path to upload a file by clicking on my devices:"D:\Skolasti files\file-example_PDF_500_kB.pdf")
  5. 5. Switch to Quiz content type, choose "New Quiz", enter title, passing percentage, add sample questions, and save.
  6. 6. Reorder lessons within the section and ensure Save Lesson/Save Course enables appropriately.

**Expected Results:**
  - Section list shows each new section with collapse/reorder controls.
  - Each lesson type transitions from upload state to saved entry with correct icon and metadata.
  - Quiz builder enforces required title/passing percentage before creation.
  - Save Lesson and Save Course buttons enable only when pending edits exist and disable after successful save.

#### 1.3. Lesson Upload Validation & Error Handling

**File:** `tests/coach-studio/lesson-upload-validation.spec.ts`

**Steps:**
  1. 1. In the Add Lesson modal, pick Video → Link and click Upload with an empty field to capture required-field error.
  2. 2. Submit an obviously invalid URL (e.g., text without protocol) and verify client-side validation prevents network calls.
  3. 3. Provide a syntactically valid link that should not trigger any error, if its a valid one then it should pass, if it fails then report as an failure but don't stop automation until the last test case. 
  4. 4. Attempt to upload an oversized or unsupported document/audio file from device and confirm rejection messaging.
  5. 5. Ensure that after error states, user can clear input, reattempt with valid assets, and Save Lesson succeeds.

**Expected Results:**
  - Link and file inputs show inline helper text for missing/invalid values.
  - HTTP 404 or upload failures bubble up via toast/alert, and the modal remains open for correction- report if there are any 400 series or bed erros will populate other wise proceed. 
  - Clearing the input resets validation state, allowing subsequent successful uploads.

### 2. Course Management - Library & Publishing

**Seed:** `tests/seed.spec.ts`

#### 2.1. Publish Offline Course & Verify Library Listing

**File:** `tests/coach-studio/publish-course-and-verify-library.spec.ts`

**Steps:**
  1. 1. After curriculum contains at least one lesson, click "Save" then "Publish Course" on Details or Curriculum tab.
  2. 2. Confirm publish confirmation modal messaging and accept it.
  3. 3. Navigate to Content Library → Courses tab and locate the course row by title.
  4. 4. Validate row columns (Status, Created On, Enrollments, Completions, Price) reflect the latest Created course which we created (e.g., Published, Free).
  5. 5. Click the course title to reopen details and verify Published badge plus "Back to Course" navigation works.

**Expected Results:**
  - Publish button remains disabled until prerequisites are met, then successfully publishes the course.
  - Content Library table shows the new course which we created now with correct status and metadata.
  - Course detail page reflects published state consistently across tabs.

#### 2.2. Subscription Plan Creation With Course Selection

**File:** `tests/coach-studio/subscription-plan.spec.ts`

**Steps:**
  1. 1. Open Creation Hub → Subscription Plans and verify empty-state messaging when no plans exist.
  2. 2. Click "+ Add new plan" to open the side drawer and confirm course list populates from existing catalog.
  3. 3. Search for the new offline course and add it to the selected list; verify badge/count updates.
  4. 4. Complete plan details (name, description, currency, price, validity) and attempt to save without payment settings configured.
  5. 5. Capture API 404/validation error for payment config and ensure UI surfaces the failure gracefully without losing form data.

**Expected Results:**
  - Empty-state call-to-action is visible when there are no plans.
  - Course picker supports search/add operations and prevents saving without at least one course.
  - Missing payment configuration triggers the same 404 failure seen during exploration; error messaging is asserted and data persists for retry.

### 3. Settings - Integrations

**Seed:** `tests/seed.spec.ts`

#### 3.1. Verify Live Session Integration Requirements

**File:** `tests/coach-settings/integrations-live.spec.ts`

**Steps:**
  1. 1. Navigate to Settings → Integrations and confirm the Integrations tab is active in the horizontal list.
  2. 2. Validate Google Workspace, Microsoft 365, Zoom, and Google Meet cards render with descriptions plus "Connect" buttons.
  3. 3. For each provider, click Connect and assert redirect/modals launch (or mock) as expected, then cancel.
  4. 4. Attempt to start a Live Course creation from Studio without connecting Zoom/Meet and confirm gating message instructs to connect integrations first.
  5. 5. After mocking a successful integration connection, ensure Live Course creation proceeds without the prior warning.

**Expected Results:**
  - Integrations page loads without errors and lists all providers with actionable buttons.
  - Connect actions either open auth flows or display stub dialogs; cancellations leave state unchanged.
  - Live Course workflow blocks progression until at least one video integration is connected, then allows creation once connection is established.
