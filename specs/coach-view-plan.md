# Coach View Test Plan

## Application Overview

This test plan covers comprehensive testing of the Skolasti LMS Coach View functionality. The Coach View provides content creation and management capabilities for instructors/coaches. Tests include navigation through the Creation Hub (Studio, Content Library, Subscription Plans), creating various types of courses (Offline with all content types, Live), managing subscription plans, and editing course pricing. All tests assume the user starts in Learner View and must toggle to Coach View to access these features.

## Test Scenarios

### 1. Coach View - Home and Navigation

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify Coach Home Page and Live Session Filters

**File:** `tests/coach-view/home-page-filters.spec.ts`

**Steps:**
  1. Navigate to learner login page
  2. Enter valid email: Sirisha.b@inovar-tech.com
  3. Enter valid password: Skolasti@123
  4. Click Submit button
  5. Wait for learner dashboard to load
  6. Click 'Switch to coach view' button in header
  7. Wait for coach dashboard to load
  8. Verify page URL is /coach/dashboard
  9. Verify 'Upcoming Live Sessions' heading is visible
  10. Verify filter buttons are present: Today, Tomorrow, This Week, This Month, Custom
  11. Click 'Today' filter button
  12. Verify filter is applied (date range updates)
  13. Click 'This Week' filter button
  14. Verify filter is applied (date range shows week range)
  15. Click 'This Month' filter button
  16. Verify filter is applied (date range shows month range)

**Expected Results:**
  - Coach dashboard loads successfully with URL /coach/dashboard
  - Page displays 'Upcoming Live Sessions' heading
  - All five filter buttons (Today, Tomorrow, This Week, This Month, Custom) are visible and clickable
  - Date range text updates appropriately when each filter is clicked
  - Session list updates based on selected filter (may show 'No sessions found' if no sessions exist)
  - Page shows statistics cards: Total Sessions count and Active Days count

#### 1.2. Verify Creation Hub Navigation and Tabs

**File:** `tests/coach-view/creation-hub-navigation.spec.ts`

**Steps:**
  1. Navigate to learner login page
  2. Enter valid credentials and login
  3. Switch to coach view
  4. Verify 'Creation HUB' menu item is visible in sidebar
  5. Click 'Creation HUB' menu item to expand
  6. Verify submenu expands with three options: Studio, Content Library, Subscription Plans
  7. Click 'Studio' link
  8. Verify navigation to /coach/studio
  9. Verify Studio page shows four creation options: Create course, Create Live Course, Create Digital Downloads, Create Quiz
  10. Navigate back using sidebar
  11. Click 'Content Library' link
  12. Verify navigation to /coach/collection/courses
  13. Verify Content Library shows tabs: Courses, Live, Downloads, Quiz
  14. Click 'Live' tab
  15. Verify live courses are displayed
  16. Click 'Downloads' tab
  17. Verify digital downloads are displayed
  18. Click 'Quiz' tab
  19. Verify quizzes are displayed
  20. Navigate back using sidebar
  21. Click 'Subscription Plans' link
  22. Verify navigation to /coach/subscription_plan
  23. Verify Subscription Plans page loads with '+ Add new plan' button

**Expected Results:**
  - Creation HUB menu expands to show all three submenu items
  - Studio page loads with heading 'CREATE AMAZING CONTENT WITH CREATOR STUDIO'
  - All four content creation options are visible and accessible
  - Content Library page displays table with courses when on Courses tab
  - Tab switching works correctly - Live, Downloads, and Quiz tabs show respective content
  - Subscription Plans page shows either existing plans or 'No subscription plans yet' message
  - All navigation links work correctly and update the URL appropriately
  - Active tab/link is highlighted in the UI

### 2. Coach View - Course Creation

**Seed:** `tests/seed.spec.ts`

#### 2.1. Create Offline Course with All Content Types and Verify in Content Library

**File:** `tests/coach-view/create-offline-course-all-types.spec.ts`

**Steps:**
  1. Login and switch to coach view
  2. Navigate to Creation HUB > Studio
  3. Click 'Create course' card
  4. Enter course title: 'Test Offline Course with All Content Types'
  5. Enter course description
  6. Select a category (e.g., Technology)
  7. Upload course thumbnail image
  8. Click 'Next' or 'Continue' to proceed to content creation
  9. Add Video Lecture: Click 'Add Content' or similar button
  10. Select 'Video Lecture' content type
  11. Enter video lecture title: 'Introduction Video'
  12. Upload or select a video file
  13. Save the video lecture
  14. Add Audio Lecture: Click 'Add Content'
  15. Select 'Audio Lecture' content type
  16. Enter audio lecture title: 'Audio Lesson 1'
  17. Upload or select an audio file
  18. Save the audio lecture
  19. Add Article/Reading: Click 'Add Content'
  20. Select 'Article' or 'Reading' content type
  21. Enter article title: 'Reading Material 1'
  22. Enter article content using rich text editor
  23. Save the article
  24. Add Quiz: Click 'Add Content'
  25. Select 'Quiz' content type
  26. Enter quiz title: 'Assessment Quiz 1'
  27. Add at least 2 quiz questions with multiple choice options
  28. Set correct answers for each question
  29. Save the quiz
  30. Review all added content (Video, Audio, Article, Quiz)
  31. Click 'Publish' or 'Save as Draft'
  32. Navigate to Creation HUB > Content Library
  33. Click 'Courses' tab
  34. Search or scroll to find 'Test Offline Course with All Content Types'
  35. Verify the course appears in the list
  36. Verify course status (Published or Unpublished)
  37. Click on the course title to open course details
  38. Verify all four content types are present in the course structure
  39. Verify Video lecture 'Introduction Video' is listed
  40. Verify Audio lecture 'Audio Lesson 1' is listed
  41. Verify Article 'Reading Material 1' is listed
  42. Verify Quiz 'Assessment Quiz 1' is listed

**Expected Results:**
  - Course creation form opens successfully from Studio
  - All basic course information fields accept input correctly
  - Content addition interface allows adding multiple content types
  - Video lecture is successfully added with uploaded video file
  - Audio lecture is successfully added with uploaded audio file
  - Article/Reading is successfully added with rich text content
  - Quiz is successfully created with questions and correct answers
  - Course is saved/published without errors
  - Course appears in Content Library Courses tab
  - Course details page shows all four content types correctly
  - Each content item displays with its respective title and type indicator
  - Course can be previewed or edited from Content Library
  - Success message is displayed after course creation

#### 2.2. Create Live Course and Verify in Content Library

**File:** `tests/coach-view/create-live-course.spec.ts`

**Steps:**
  1. Login and switch to coach view
  2. Navigate to Creation HUB > Studio
  3. Click 'Create Live Course' card
  4. Enter live course title: 'Test Live Webinar Session'
  5. Enter course description: 'A test live session for automated testing'
  6. Select category (e.g., Leadership)
  7. Upload course thumbnail
  8. Select live session date and time (choose a future date)
  9. Enter session duration (e.g., 1 hour)
  10. Configure session settings: Enable Q&A segment
  11. Upload supporting documents (optional PDF or presentation)
  12. Enter meeting/webinar link or configure platform integration
  13. Set maximum attendees (if applicable)
  14. Review all session details
  15. Click 'Publish' or 'Schedule Session'
  16. Navigate to Creation HUB > Content Library
  17. Click 'Live' tab
  18. Search or scroll to find 'Test Live Webinar Session'
  19. Verify the live course appears in the list
  20. Verify session date and time are displayed correctly
  21. Click on the live course title to view details
  22. Verify all session information is accurate
  23. Verify supporting documents are attached
  24. Verify Q&A setting is enabled
  25. Check session status (Scheduled/Upcoming)

**Expected Results:**
  - Live course creation form opens from Studio
  - Date/time picker allows selecting future dates
  - Session duration can be configured
  - Q&A toggle/checkbox works correctly
  - Supporting documents upload successfully
  - Live course is saved/scheduled without errors
  - Live course appears in Content Library under 'Live' tab
  - Session details are displayed accurately including date, time, duration
  - Supporting documents are accessible from course details
  - Session shows appropriate status indicator
  - Success notification appears after scheduling
  - Live course can be edited or canceled if needed

### 3. Coach View - Subscription and Pricing Management

**Seed:** `tests/seed.spec.ts`

#### 3.1. Create Subscription Plan and Verify on Public Marketing Page

**File:** `tests/coach-view/create-subscription-plan.spec.ts`

**Steps:**
  1. Login and switch to coach view
  2. Navigate to Creation HUB > Subscription Plans
  3. Verify Subscription Plans page is displayed
  4. Click '+ Add new plan' button
  5. Enter subscription plan name: 'Premium Monthly Plan'
  6. Enter plan description: 'Access to all courses for one month'
  7. Set plan price: 999 (or appropriate currency amount)
  8. Select currency (e.g., INR, USD)
  9. Set validity period: 30 days or 1 month
  10. Select courses to include in the plan (select at least 2-3 courses)
  11. Configure plan features: Unlimited access, Certificate included
  12. Set plan visibility: Public
  13. Review all plan details
  14. Click 'Save' or 'Publish Plan'
  15. Verify success message is displayed
  16. Verify plan appears in Subscription Plans list
  17. Note the plan details for verification
  18. Switch to learner view
  19. Navigate to public marketing/landing page (logout if needed)
  20. Go to pricing or subscription section of the website
  21. Scroll through available subscription plans
  22. Verify 'Premium Monthly Plan' is displayed
  23. Verify plan price (999 or set amount) is shown
  24. Verify validity period (30 days/1 month) is shown
  25. Verify plan features are listed correctly
  26. Verify 'Subscribe' or 'Purchase' button is visible

**Expected Results:**
  - Subscription plan creation form opens successfully
  - All plan configuration fields accept appropriate input
  - Price and currency fields work correctly with validation
  - Validity period can be set in days or months
  - Course selection interface allows selecting multiple courses
  - Plan features can be configured with checkboxes or toggles
  - Plan is saved/published without errors
  - Success message confirms plan creation
  - Plan appears in coach view Subscription Plans list with all details
  - Public marketing page displays the newly created plan
  - Plan pricing, validity, and features are accurately displayed to public users
  - Plan is purchasable from the public page
  - Plan can be edited or deactivated from coach view if needed

#### 3.2. Edit Course Pricing in Content Library

**File:** `tests/coach-view/edit-course-pricing.spec.ts`

**Steps:**
  1. Login and switch to coach view
  2. Navigate to Creation HUB > Content Library
  3. Click 'Courses' tab
  4. Identify a course with 'Free' pricing (e.g., from the list)
  5. Note the current course name and pricing status
  6. Click on the course title to open course details
  7. Look for 'Edit' or 'Settings' button
  8. Click to enter edit mode
  9. Navigate to Pricing section/tab
  10. Verify current pricing is set to 'Free'
  11. Change pricing from 'Free' to 'Paid'
  12. Enter course price: 500 (or appropriate amount)
  13. Select currency (INR, USD, etc.)
  14. Configure discount (optional): Set 10% discount
  15. Set pricing validity or enrollment period if applicable
  16. Review pricing changes
  17. Click 'Save' or 'Update' button
  18. Verify success message appears
  19. Navigate back to Content Library > Courses
  20. Search for the updated course
  21. Verify 'Price' column now shows the new price (₹500 or equivalent)
  22. Verify 'Free' is no longer displayed for this course
  23. Click on course again to verify pricing in course details
  24. Switch to learner view
  25. Search for the course in learner dashboard
  26. Verify course displays new pricing to learners
  27. Verify 'Enroll' or 'Purchase' button reflects paid status

**Expected Results:**
  - Course details page opens with edit capability
  - Pricing section/tab is accessible and editable
  - Pricing can be changed from Free to Paid
  - Price input field accepts numeric values
  - Currency selection works correctly
  - Discount field (if available) accepts percentage values
  - Pricing changes are saved successfully
  - Success notification confirms update
  - Content Library table reflects updated pricing immediately
  - Price column shows new amount instead of 'Free'
  - Course details page displays updated pricing accurately
  - Learner view shows the updated price when viewing the course
  - Course enrollment behavior changes to reflect paid status
  - Payment or purchase flow is initiated when learners try to enroll in paid course
