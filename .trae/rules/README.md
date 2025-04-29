# Property Guidance App - MVP Design Document

## 1. App Description

MVP of a property guidance app for Australian buyers ($500k-$1.4M budget). Uses an AI-guided workflow (simplified in MVP) to help users explore strategies, find relevant locations, and connect with vetted mortgage brokers, **strictly without giving financial advice.**

## 2. User Case

Users (e.g., First Home Buyers, early Investors) feel overwhelmed by property decisions and costly advice. This MVP lets them explore common strategies, see *examples* of matching locations based on their chosen priorities, and easily connect with a broker to validate finances – testing the core guidance-to-connection flow.

## 3. Target Platform & Technology

*   **Form Factor:** Phone (Portrait Orientation Only for MVP)
*   **Target OS:** iOS & Android (Specify build target - e.g., React Native, Flutter, or separate Native builds required by AI).
*   **Technology Assumption:** AI should use appropriate technologies for cross-platform development unless otherwise specified.

## 4. Core Principles & Rules for AI Builder

*   **MVP Focus:** Implement ONLY the features, screens, and logic defined within `MVP_Scope.md`. Defer all "OUT OF SCOPE" items.
*   **Compliance: NO FINANCIAL ADVICE:** This is critical. No part of the app should provide recommendations or advice specific to the user's financial situation. All data presentation (strategies, locations) must be factual, educational, and neutral. Required disclaimers MUST be implemented as specified.
*   **Simplicity:** Prioritize functional clarity over complex UI animations or elaborate designs for the MVP. Use standard mobile UI patterns.
*   **Workflow Centric:** The app follows a specific linear flow for MVP: Onboarding -> Strategy -> Location -> Broker Prompt. Ensure navigation enforces this.
*   **Data Simplification:** Use static or simplified data as specified in `Data_MVP.md` for this initial build.

## 5. Document Structure

*   `README.md`: This file - Overview and core rules.
*   `MVP_Scope.md`: Defines features IN and OUT of scope for this build.
*   `Screens.md`: Detailed IA, components, and basic logic for each MVP screen.
*   `Navigation.md`: Defines the screen-to-screen flow.
*   `Data_MVP.md`: Specifies the simplified data requirements for MVP.

---
*AI Builder Note: Refer to all linked documents. Adhere strictly to MVP scope and compliance rules.*