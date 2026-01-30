# Coach View - Studio - Create Quiz Test Plan

## Application Overview

This test plan covers the quiz creation functionality in the Skolasti LMS Coach View. The quiz creation feature is accessed from the Coach View > Studio option under the Creation HUB button. It allows coaches to create quizzes with configurable difficulty levels, questions distribution, points, and passing percentage. Once a quiz is created, users can add, edit, and delete questions with multiple choice answers.

## Test Scenarios

### 1. Quiz Creation Form Tests

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify Quiz Creation Form Opens

**File:** `tests/coach-view/studio/quiz-creation-form-opens.spec.ts`

**Steps:**
  1. Navigate to https://qualityloop.skillrok.com/
  2. Click on Login button
  3. Enter email 'qualityloop17dec2025@yopmail.com' and password 'Skolasti@123'
  4. Click Submit to login
  5. Click on 'Switch to coach view' button
  6. Click on 'Creation HUB' in the sidebar
  7. Click on 'Studio' sub-menu item
  8. Click on 'Create Quiz' card

**Expected Results:**
  - Create Quiz modal/form appears with Title field
  - Questions Distribution section is displayed with 3 difficulty levels (0, 1, Three)
  - Each difficulty level has Questions and Points input fields
  - Total Points and Passing Percentage fields are visible
  - Cancel and Submit buttons are present

#### 1.2. Verify Quiz Form Validation - Empty Title

**File:** `tests/coach-view/studio/quiz-validation-empty-title.spec.ts`

**Steps:**
  1. Navigate to Coach View > Studio page
  2. Click on 'Create Quiz' card
  3. Leave Title field empty
  4. Enter Questions: 5 and Points: 10 for difficulty level 0
  5. Enter Passing Percentage: 60
  6. Click Submit button

**Expected Results:**
  - Validation indicator appears next to Title field (Title*•)
  - Form is not submitted
  - Quiz is not created

#### 1.3. Create Quiz with Valid Data - Happy Path

**File:** `tests/coach-view/studio/quiz-create-success.spec.ts`

**Steps:**
  1. Navigate to Coach View > Studio page
  2. Click on 'Create Quiz' card
  3. Enter Title: 'Test Quiz'
  4. Enter Questions: 5 and Points: 10 for difficulty level 0
  5. Enter Passing Percentage: 60
  6. Click Submit button

**Expected Results:**
  - Quiz is created successfully
  - User is redirected to quiz editor page at /coach/studio/quiz/{id}
  - Quiz title 'Test Quiz' is displayed
  - Questions Added shows '0/5'
  - 'Add Question' button is present
  - 'Quit' button is present
  - Message shows 'No questions yet' with total questions required

#### 1.4. Verify Cancel Button Closes Form

**File:** `tests/coach-view/studio/quiz-cancel-form.spec.ts`

**Steps:**
  1. Navigate to Coach View > Studio page
  2. Click on 'Create Quiz' card
  3. Enter Title: 'Test Quiz'
  4. Click Cancel button

**Expected Results:**
  - Create Quiz form is closed without any confirmation dialog
  - User remains on Studio page
  - Quiz is not created

#### 1.5. Verify Total Points Calculation

**File:** `tests/coach-view/studio/quiz-total-points-calculation.spec.ts`

**Steps:**
  1. Navigate to Coach View > Studio page
  2. Click on 'Create Quiz' card
  3. Enter Questions: 5 and Points: 10 for difficulty level 0
  4. Enter Questions: 3 and Points: 20 for difficulty level 1
  5. Enter Questions: 2 and Points: 30 for difficulty level Three

**Expected Results:**
  - Level 0 shows 'Total: 50 pts' (5 × 10)
  - Level 1 shows 'Total: 60 pts' (3 × 20)
  - Level Three shows 'Total: 60 pts' (2 × 30)
  - Total Points shows '170 pts' (50 + 60 + 60)

### 2. Quiz Question Management Tests

**Seed:** `tests/seed.spec.ts`

#### 2.1. Add Question to Quiz

**File:** `tests/coach-view/studio/quiz-add-question.spec.ts`

**Steps:**
  1. Create a new quiz with Title 'Test Quiz' and 5 questions at difficulty level 0
  2. On quiz editor page, click 'Add Question' button
  3. Enter Question text: 'What is the capital of France?'
  4. Enter first option: 'Paris'
  5. Enter second option: 'London'
  6. Check the checkbox next to 'Paris' to mark as correct
  7. Click Save button

**Expected Results:**
  - Question form appears with Question field, Difficulty dropdown, Points display
  - Question field shows character count (0/3000)
  - Option fields show character count (0/1000)
  - After saving, question is displayed with difficulty '0' and '10 pts'
  - Questions Added counter updates to '1/5'
  - Paris is marked as correct answer with checkmark icon
  - London is shown without checkmark

#### 2.2. Edit Existing Question

**File:** `tests/coach-view/studio/quiz-edit-question.spec.ts`

**Steps:**
  1. Create a quiz and add a question
  2. Click 'Edit' button on the saved question
  3. Modify the question text
  4. Add a third option using 'Add Another Option' button
  5. Change the correct answer to a different option
  6. Click Save button

**Expected Results:**
  - Question enters edit mode with all fields editable
  - Difficulty dropdown is available
  - 'Add Another Option' button is present
  - Changes are saved successfully
  - Updated question text is displayed
  - New correct answer is marked with checkmark

#### 2.3. Delete Question from Quiz

**File:** `tests/coach-view/studio/quiz-delete-question.spec.ts`

**Steps:**
  1. Create a quiz and add a question
  2. Click 'Delete' button on the question

**Expected Results:**
  - Question is deleted immediately without confirmation dialog
  - 'No questions yet' message appears
  - Questions Added counter resets to '0/5'

#### 2.4. Add Multiple Answer Options

**File:** `tests/coach-view/studio/quiz-multiple-options.spec.ts`

**Steps:**
  1. Create a quiz and click 'Add Question'
  2. Enter Question text
  3. Enter first and second options
  4. Click 'Add Another Option' button multiple times
  5. Enter text in all option fields

**Expected Results:**
  - Each click adds a new option field
  - Each option has a checkbox for marking correct answer
  - Each option has a delete button
  - Option field shows character count

#### 2.5. Delete Answer Option

**File:** `tests/coach-view/studio/quiz-delete-option.spec.ts`

**Steps:**
  1. Create a quiz and click 'Add Question'
  2. Add 3 or more options using 'Add Another Option' button
  3. Click delete button on one of the options

**Expected Results:**
  - Selected option is removed from the list
  - Other options remain intact
  - Minimum 2 options requirement is maintained

#### 2.6. Question Difficulty Level Selection

**File:** `tests/coach-view/studio/quiz-difficulty-selection.spec.ts`

**Steps:**
  1. Create a quiz with questions at multiple difficulty levels
  2. Add a question
  3. Click on Difficulty dropdown
  4. Select a different difficulty level

**Expected Results:**
  - Dropdown shows available difficulty levels with remaining count (e.g., '0 (5 remaining)')
  - Points display updates based on selected difficulty
  - Question is assigned to correct difficulty level

### 3. Quiz Navigation and Exit Tests

**Seed:** `tests/seed.spec.ts`

#### 3.1. Quit Quiz Editor with Unsaved Changes

**File:** `tests/coach-view/studio/quiz-quit-unsaved.spec.ts`

**Steps:**
  1. Create a new quiz
  2. Add a question but do not complete all required questions
  3. Click 'Quit' button

**Expected Results:**
  - Warning dialog appears with '⚠️' icon
  - Heading shows 'You have unsaved changes'
  - Message states 'You have unsaved questions. If you leave now, your changes will be lost.'
  - 'No, Stay' and 'Yes, Exit' buttons are present

#### 3.2. Stay on Quiz Editor After Quit Warning

**File:** `tests/coach-view/studio/quiz-stay-after-warning.spec.ts`

**Steps:**
  1. Trigger quit warning by clicking Quit with unsaved changes
  2. Click 'No, Stay' button

**Expected Results:**
  - Dialog closes
  - User remains on quiz editor page
  - All previously entered data is preserved

#### 3.3. Exit Quiz Editor from Quit Warning

**File:** `tests/coach-view/studio/quiz-exit-after-warning.spec.ts`

**Steps:**
  1. Trigger quit warning by clicking Quit with unsaved changes
  2. Click 'Yes, Exit' button

**Expected Results:**
  - User is redirected away from quiz editor
  - Unsaved changes are discarded

#### 3.4. Navigate to Quiz Editor Title Button

**File:** `tests/coach-view/studio/quiz-title-button.spec.ts`

**Steps:**
  1. Create a quiz named 'Test Quiz'
  2. On quiz editor page, click on the quiz title button

**Expected Results:**
  - Quiz title button is clickable but does not open edit dialog for title
  - Quiz remains on same page

### 4. Quiz Form Edge Cases Tests

**Seed:** `tests/seed.spec.ts`

#### 4.1. Create Quiz with Zero Questions Distribution

**File:** `tests/coach-view/studio/quiz-zero-questions.spec.ts`

**Steps:**
  1. Navigate to Coach View > Studio page
  2. Click on 'Create Quiz' card
  3. Enter Title: 'Empty Quiz'
  4. Leave all Questions fields at 0
  5. Enter Passing Percentage: 50
  6. Click Submit button

**Expected Results:**
  - Form validation should prevent submission
  - User cannot create quiz without any questions configured

#### 4.2. Create Quiz with Maximum Character Title

**File:** `tests/coach-view/studio/quiz-max-title-length.spec.ts`

**Steps:**
  1. Navigate to Coach View > Studio page
  2. Click on 'Create Quiz' card
  3. Enter a very long title (test character limit)
  4. Fill required fields
  5. Click Submit button

**Expected Results:**
  - Title field has character limit
  - Long title is either truncated or validation error shown
  - Quiz handles maximum title length appropriately

#### 4.3. Question Text Character Limit

**File:** `tests/coach-view/studio/quiz-question-char-limit.spec.ts`

**Steps:**
  1. Create a quiz
  2. Add a question
  3. Enter very long question text (approaching 3000 characters)

**Expected Results:**
  - Character counter updates as user types
  - Counter shows format 'X/3000'
  - Text is limited to 3000 characters

#### 4.4. Option Text Character Limit

**File:** `tests/coach-view/studio/quiz-option-char-limit.spec.ts`

**Steps:**
  1. Create a quiz
  2. Add a question
  3. Enter very long option text (approaching 1000 characters)

**Expected Results:**
  - Character counter updates as user types
  - Counter shows format 'X/1000'
  - Option text is limited to 1000 characters
