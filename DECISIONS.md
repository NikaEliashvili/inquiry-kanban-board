# DECISIONS

## Drag-and-Drop Approach

**Chosen:** `@dnd-kit`

- Lightweight drag-and-drop library
- Full control over drag logic
- No DOM mutation side effects

**Why:**

- Needed precise control over the kanban card movements
- Smooth animations and visual feedback were important
- Optimistic updates required predictable state handling during drag

**Alternatives Considered:**

- `react-beautiful-dnd`: heavier, deprecated, and less flexible for custom UX
- Native HTML5 drag events: inconsistent behavior and too low-level for complex UI

---

## State Management

**Chosen:** Zustand

**Structure:**

- `filters-store.ts`: manages filter values and counts, updates UI and URL in real time
- `inquiry-store.ts`: manages board state, inquiries list, and selected inquiry
- Actions are simple setters, keeping state predictable and localized

**Why:**

- Minimal boilerplate and easy to read
- Works seamlessly with optimistic updates

**Alternatives Considered:**

- Redux: too heavy for this small-to-medium project
- Context API: could work, but more boilerplate and harder to maintain for multiple independent states

## UX Decisions

##### Theme Support

- Supports both light and dark modes for better accessibility and user preference

##### Optimistic Updates

- Changes are reflected immediately in the UI
- Improves perceived performance and responsiveness
- Errors are handled gracefully without blocking interaction

##### Drag & Drop Feedback

- Cards use smooth animations and transitions to make interactions feel natural
- Dragged cards provide clear visual feedback, improving usability and confidence during interaction
- If a card is dropped in an invalid location, it smoothly returns to its original position to prevent accidental changes

##### Error Handling

- If an error occurs, the UI waits 1 second before reverting the action
- This gives users clear feedback and avoids sudden visual jumps
- handles for situations when the same card is quickly dragged multiple times and throws an error. it always returns the card to the correct phase.

##### Filters Behavior

- Filters update results in real time **Uses the Debounce with 500ms delay**
- URL is kept in sync with active filters
- Allows sharing and restoring filtered views

##### Slider Interaction

- Native range input is used for accessibility
- Custom UI is layered on top for visual consistency
- Supports keyboard, mouse, and touch input

---

## Improvements with More Time

- Enable dropping a card directly in a target position within a column (e.g., move to second position in `sent_to_hotels`)
- Make cards droppable inside a column to reorder by priority (e.g., third to first position)

**Alternatives Considered:**

- Server-only updates instead of optimistic: slower UX, not as responsive
- No visual feedback during drag: would confuse users
- Filters updating on every keystroke without debounce: could cause performance issues

---
