# MVP Screen Specifications

*AI Builder Note: Implement using standard mobile UI components suitable for cross-platform development (iOS/Android). Adhere to IA hierarchy.*

---

### Screen: 01 - Splash/Loading

*   **Purpose:** Initial app loading.
*   **IA/Layout:** Centered App Logo. Optional subtle loading indicator below logo.
*   **Components:** Image (Logo), ActivityIndicator (optional).
*   **Logic:** Display for a short duration while app initializes, then navigate to Login/Signup (or Strategy Insights if already logged in - *deferred state management for MVP, assume always goes to Login*).

---

### Screen: 02 - Login / Signup

*   **Purpose:** User authentication/registration.
*   **IA/Layout:** App Logo (optional, smaller), Email Input, Password Input, Primary Login Button, Secondary Signup Button, Tertiary "Forgot Password?" Link. Social Login buttons below (if implemented).
*   **Components:** Image (optional Logo), TextInput x2 (Email, Password - secure entry for password), Button x2 (Login, Signup), TextLink ("Forgot Password?"). Optional: Social Login Buttons.
*   **Logic:** Validate inputs. On Login success, navigate to Strategy Insights (MVP assumes profile exists or skips). On Signup tap, navigate to Signup screen (can reuse this screen layout, changing button emphasis/text). Handle basic auth errors (display simple message).

---

### Screen: 03 - Basic Profile Setup

*   **Purpose:** Gather essential context post-signup.
*   **IA/Layout:** Header Text ("Tell us about your goals"), Goal Category Selector (e.g., Picker/Dropdown), Budget Range Selector (e.g., Picker/Dropdown with predefined ranges), State Selector (e.g., Picker/Dropdown), Save/Continue Button at bottom.
*   **Components:** Text (Header), Label x3, Picker/Dropdown x3, Button (Save/Continue).
*   **Logic:** User must make selections. Save button enabled after selections made. On Save, store data locally (simple storage for MVP) and navigate to Strategy Insights.

---

### Screen: 04 - Strategy Insights

*   **Purpose:** Present simplified strategy archetypes, capture user priorities.
*   **IA/Layout:** Header ("Explore Property Approaches"), Intro Text, Strategy Archetype Cards (2-3 vertically stacked Cards), Priority Selection area (Checkboxes/Tags below cards), Disclaimer Text block, Next Button at bottom.
*   **Components:**
    *   Text (Header, Intro).
    *   Card Component x2-3 (Each containing: Text(Archetype Name), Text(Static Description)).
    *   Checkbox Group / Chip Group (Tags) for Priorities (e.g., "Prioritise Capital Growth", "Prioritise Yield", "Prioritise Affordability"). Limit selection (e.g., max 1 or 2).
    *   Text (Disclaimer: "Educational information only, not financial advice.").
    *   Button ("Next: Find Locations").
*   **Logic:** Display static archetype info. Enable Next button when user selects 1-2 priorities. Store selected priorities locally for next step. Navigate to Location Criteria Input.

---

### Screen: 05 - Location Criteria Input

*   **Purpose:** Confirm inputs for simplified location search.
*   **IA/Layout:** Header ("Find Matching Locations"), Display Text showing Selected Priority/Priorities from previous screen, State Selector (pre-fill from profile), Budget Range Selector (pre-fill from profile), Find Locations Button at bottom.
*   **Components:** Text (Header), Text (Display Selected Priority), Label x2, Picker/Dropdown x2 (State, Budget), Button ("Find Locations").
*   **Logic:** Allow user to confirm/edit State and Budget. On tap "Find Locations", trigger simplified search logic and navigate to Location Results.

---

### Screen: 06 - Location Results

*   **Purpose:** Display suburbs matching simplified criteria.
*   **IA/Layout:** Header (e.g., "Locations matching [Priority] in [State]"), Loading Indicator (while searching), Results List area OR centered "No Results Found" Text. If results: Vertical list of items. Continue Button below list/message.
*   **Components:**
    *   Text (Header).
    *   ActivityIndicator (conditional).
    *   List View.
    *   List Item Component (Contains: Text(Suburb Name), Text(State), Text(Price Indicator "$$/$$$")). Allow tap action -> Navigate to Basic Suburb Detail.
    *   Text ("No Results Found..."). Conditional display.
    *   Button ("Continue to Next Step").
*   **Logic:** Show loader. Execute simplified search based on criteria & MVP data. Display results in list OR "No Results" message. Tapping list item navigates. Continue button navigates to Broker Prompt.

---

### Screen: 07 - Basic Suburb Detail (Optional)

*   **Purpose:** Minimal context for a selected suburb.
*   **IA/Layout:** Header (Suburb Name), Body Text blocks (State, Price Indicator, maybe static sentence). Standard Back button in header.
*   **Components:** Text (Header), Text (Body), NavigationBar with Back Button.
*   **Logic:** Display static info passed from Location Results. Back button returns to Location Results.

---

### Screen: 08 - Broker Connection Prompt

*   **Purpose:** Contextual CTA to connect with a broker.
*   **IA/Layout:** Headline Text (Question), Explanatory Text (Why connect?), Primary Button ("Connect with a Broker"), Secondary Button/Link ("Maybe Later"), Disclaimer Text (Referral relationship) at bottom.
*   **Components:** Text (Headline, Body), Button (Primary Style), Button/TextLink (Secondary Style), Text (Disclaimer).
*   **Logic:** Tapping Primary Button navigates to Broker Connection Info/Confirm. Tapping Secondary dismisses prompt (MVP: maybe just navigates 'forward' to a simple placeholder 'End of MVP Flow' screen or similar).

---

### Screen: 09 - Broker Connection Info / Confirmation

*   **Purpose:** Fulfill connection request (Show Info or Confirm Form). Choose **ONE** option for MVP.
*   **IA/Layout (Option A - Info):** Header ("Vetted Broker Contacts"), List/Cards of Broker info (Name, Phone, Email/Link), Instructional Text ("Contact them directly..."), Done button.
*   **IA/Layout (Option B - Form Confirm):** Centered Success Icon/Text ("Success!"), Confirmation Text ("Broker will contact you..."), Done button.
*   **Components (Option A):** Text(Header), List View with Card/ListItem (Text elements for Name, Phone, Email), Text(Instruction), Button(Done).
*   **Components (Option B):** Icon, Text(Header), Text(Body), Button(Done).
*   **Logic:** Display relevant info/confirmation. Done button might navigate to a simple end screen or back to a safe point (e.g., settings - TBD). *If Form chosen for MVP: Form fields (Name, Email, Phone, Consent Checkbox) needed on THIS screen BEFORE confirmation.*

---

### Screen: 10 - Settings (Minimal)

*   **Purpose:** Essential links and logout.
*   **IA/Layout:** Header ("Settings"), List of clickable items (Logout, Privacy Policy, Terms of Service), App Version Text at bottom.
*   **Components:** Text(Header), ListView with Clickable ListItems/TextLinks, Text(Version).
*   **Logic:** Logout clears user session/local data and navigates to Login. Privacy/Terms links open external browser to respective URLs.

---