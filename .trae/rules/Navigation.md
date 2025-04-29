# MVP Navigation Flow

Defines the primary screen transitions for the MVP build.

1.  **App Start** -> `01 - Splash/Loading`
2.  `01 - Splash/Loading` -> `02 - Login / Signup` (MVP assumes no persistent login state)
3.  `02 - Login / Signup`:
    *   On **Login Success** -> `04 - Strategy Insights` (MVP assumes profile exists/skip)
    *   On **Signup Tap** -> (Reuse `02 - Login / Signup` layout, adjusted for Signup) -> On **Signup Success** -> `03 - Basic Profile Setup`
    *   On **Forgot Password** -> (Out of MVP Scope - placeholder/link)
4.  `03 - Basic Profile Setup` -> On **Save/Continue** -> `04 - Strategy Insights`
5.  `04 - Strategy Insights` -> On **Next Button Tap** (priorities selected) -> `05 - Location Criteria Input`
6.  `05 - Location Criteria Input` -> On **Find Locations Button Tap** -> `06 - Location Results` (Show loader first)
7.  `06 - Location Results`:
    *   On **List Item Tap** -> `07 - Basic Suburb Detail (Optional)`
    *   On **Continue Button Tap** -> `08 - Broker Connection Prompt`
8.  `07 - Basic Suburb Detail (Optional)` -> On **Back Button Tap** -> `06 - Location Results`
9.  `08 - Broker Connection Prompt`:
    *   On **Connect Button Tap** -> `09 - Broker Connection Info / Confirmation`
    *   On **Skip/Maybe Later Tap** -> (MVP: Navigate to a simple placeholder 'End' screen or `10 - Settings`)
10. `09 - Broker Connection Info / Confirmation` -> On **Done Button Tap** -> (MVP: Navigate to placeholder 'End' screen or `10 - Settings`)
11. **Accessing Settings:** Assume standard mobile navigation pattern (e.g., tab bar - *if implemented*, or hamburger menu - *if implemented*). For MVP, could be reachable after the main flow ends.
12. `10 - Settings` -> On **Logout Tap** -> Clear session -> `02 - Login / Signup`
13. `10 - Settings` -> On **Privacy/Terms Tap** -> Open External Browser URL.

---
*AI Builder Note: Implement navigation strictly as defined for this linear MVP flow.*