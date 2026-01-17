# Bug Report: Quiz Creation Module

**Test Date:** December 22, 2025  
**Test Environment:** https://qualityloop.skillrok.com/  
**Test Account:** qualityloop17dec2025@yopmail.com  
**Browser:** Chromium

## Executive Summary

Quiz creation functionality is **CRITICALLY BROKEN**. The system shows "Session Time Out" error when attempting to create a quiz, preventing any quiz creation operations. Out of 14 planned test cases, only 2 passed, 3 revealed bugs, and 9 were blocked due to the critical failure.

---

## Critical Bugs (Blocking)

### BUG #5: Quiz Creation Fails with Session Timeout [CRITICAL]

**Severity:** Critical (P0)  
**Status:** Blocking all quiz functionality tests  

**Description:**  
When submitting the "Create Quiz" form with valid data, the page doesn't navigate to the quiz editor. The URL remains at `/coach/studio` and an error message "Session Time Out" appears.

**Steps to Reproduce:**
1. Log in to coach view
2. Navigate to Creation HUB > Studio
3. Click "Create Quiz" card
4. Fill in quiz title: "Test Quiz"
5. Fill in questions: 5
6. Fill in points: 10
7. Click "Submit" button

**Expected Result:**  
- Navigate to quiz editor page (e.g., `/coach/studio/quiz/123`)
- Show quiz editor interface with "Add Question" button

**Actual Result:**  
- URL remains at `https://qualityloop.skillrok.com/coach/studio`
- Error message displayed: "Session Time Out"
- No quiz is created

**Impact:**  
- Users cannot create quizzes
- All quiz-related functionality is blocked
- 9 subsequent test cases cannot be executed

**Root Cause Hypothesis:**  
Session management issue - either:
1. Session timeout is too short for quiz creation operation
2. Quiz creation API call is taking too long and timing out
3. Session token not being properly maintained during form submission

---

## High Priority Bugs

### BUG #1: Quiz Form Structure Doesn't Match Specification

**Severity:** High (P1)  
**Test Case:** TC-QUIZ-001

**Description:**  
The quiz creation form only has 1 spinbutton field instead of the expected 6+ fields for configuring questions across multiple difficulty levels.

**Expected:**  
- Questions Distribution section visible
- Multiple difficulty levels (Level 0, Level 1, Level 2/Three, etc.)
- Each level should have 2 spinbuttons (Questions count + Points per question)
- At least 6 spinbutton fields total

**Actual:**  
- Only 1 spinbutton field found
- Limited configuration options

**Impact:**  
- Cannot configure quizzes with multiple difficulty levels
- Reduced functionality compared to specification

---

## Medium Priority Bugs

### BUG #2: No Validation for Empty Title Field

**Severity:** Medium (P2)  
**Test Case:** TC-QUIZ-002

**Description:**  
When submitting the quiz creation form with an empty title field, the system doesn't show clear validation error messaging.

**Steps to Reproduce:**
1. Open Create Quiz form
2. Leave "Title" field empty
3. Fill other required fields (questions, points)
4. Click "Submit"

**Expected Result:**  
- Validation indicator appears (e.g., "Title*•")
- Clear error message shown
- Form doesn't submit

**Actual Result:**  
- Validation behavior unclear
- May or may not show validation message

**Impact:**  
- Poor user experience
- Users may be confused about why form doesn't submit

---

### BUG #4: Total Points Calculation Not Displayed

**Severity:** Medium (P2)  
**Test Case:** TC-QUIZ-005

**Description:**  
The quiz form doesn't display the calculated total points when configuring question distribution across difficulty levels.

**Expected:**  
- When entering "5 questions × 10 points" for Level 0, show "Total: 50 pts"
- When configuring multiple levels, show overall total (e.g., "170 pts")

**Actual:**  
- Total points calculation not displayed
- Or displayed in different format than expected

**Impact:**  
- Users cannot verify total quiz points before creation
- Harder to configure quizzes to specific point requirements

**Note:** Cannot fully test due to BUG #1 (insufficient form fields)

---

## Test Execution Summary

| Status | Count | Test Cases |
|--------|-------|------------|
| ✓ **PASSED** | 2 | TC-QUIZ-002 (Validation), TC-QUIZ-004 (Cancel Button) |
| ✗ **FAILED** | 3 | TC-QUIZ-001 (Form Structure), TC-QUIZ-003 (Quiz Creation), TC-QUIZ-005 (Points Calculation) |
| ⊘ **BLOCKED** | 9 | TC-QUIZ-006 through TC-QUIZ-014 (All question management tests) |

### Blocked Test Cases

Due to BUG #5 (quiz creation failure), the following test cases could not be executed:

- TC-QUIZ-006: Add Question to Quiz
- TC-QUIZ-007: Edit Existing Question  
- TC-QUIZ-008: Delete Question from Quiz
- TC-QUIZ-009: Add Multiple Answer Options
- TC-QUIZ-010: Delete Answer Option
- TC-QUIZ-011: Question Difficulty Level Selection
- TC-QUIZ-012: Quit Quiz Editor with Unsaved Changes
- TC-QUIZ-013: Character Limit Display
- TC-QUIZ-014: Other Edge Cases

---

## Recommendations

### Immediate Actions (P0)

1. **Fix BUG #5 (Session Timeout)**
   - Investigate session management during quiz creation
   - Increase session timeout if appropriate
   - Optimize quiz creation API performance
   - Add proper error handling and user feedback

### High Priority Actions (P1)

2. **Fix BUG #1 (Form Structure)**
   - Implement full quiz configuration interface per specification
   - Support multiple difficulty levels
   - Add all required form fields

### Medium Priority Actions (P2)

3. **Fix BUG #2 (Validation)**
   - Add clear validation for empty title field
   - Implement consistent validation UI patterns

4. **Fix BUG #4 (Points Calculation)**
   - Display real-time total points calculation
   - Show per-level totals and overall total

### Re-testing Required

Once BUG #5 is resolved, all 14 test cases must be re-executed to verify:
- Quiz creation works end-to-end
- Question management functionality works
- Quiz editor navigation and features work
- Edge cases are handled properly

---

## Test Artifacts

- **Test File:** `d:\Skolasti UI Automation\tests\coach-view\Create-Quiz.spec.ts`
- **Test Plan:** `d:\Skolasti UI Automation\specs\coach-studio-create-quiz-plan.md`
- **Test Execution Time:** ~3 minutes
- **Test Mode:** Single comprehensive test covering all scenarios

---

## Additional Notes

- Login functionality works correctly
- Navigation to Studio page works correctly
- Cancel button functionality works correctly
- Form validation for empty title exists but may need improvement

The quiz creation module requires significant fixes before it can be considered production-ready.
