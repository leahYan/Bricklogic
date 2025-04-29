###### **1. Goal of the MVP:**

- Validate user engagement with AI-driven strategy exploration.
- Assess if users can successfully use simplified location matching based on their selected priorities.
- Measure user willingness to connect with a mortgage broker, account and real estate agent via the app when prompted contextually.
- Gather initial user feedback on the core workflow concept and value proposition.

###### **2. Core Hypothesis to Test:**

- Users facing property decisions, particularly those underserved by traditional advice, will value and follow an AI-guided process that helps them clarify strategic priorities and explore relevant locations, ultimately leading them to take the step of connecting with a necessary professional (starting with a mortgage broker).

###### **3. IN SCOPE Features/User Stories for MVP:**

(Highest priority first)

- **(P1) US-FLOW-02 (Simplified): AI Strategy Insights Agent**

  - **MVP Functionality:** Presents 2-3 predefined property strategy archetypes (e.g., "Focus on Growth", "Focus on Yield/Income", "Balanced Approach"). Each archetype has static, pre-written descriptions covering general characteristics, typical (high-level) pros/cons, and the types of factors usually considered. Uses static rules/data, not dynamic AI analysis for V1.

  - **User Action:** User reviews archetypes and selects 1-2 key priorities (e.g., "Prioritise Capital Growth", "Prioritise Rental Yield", "Prioritise Affordability").
  - **Key Simplification:** No complex AI analysis of user input; presents pre-defined educational content framing common strategies. Absolutely no personalized recommendation. Strong disclaimers required.
  - 1. **Basic Input:** The user confirms their finance state(income, expense), budget range, and the investment goal, risk preference they just selected.

  1. **Simplified Logic:** The app can perform real-time AI analysis base on some pre-defined investment strategy. For example, if the user selected "Prioritise Capital Growth," the MVP might show a list of recommendation properties type and the cashflow projection, if user is interested to know more about that option, they can select that plan and check the suburbs known generally (perhaps from static data) to have had decent growth historically, within their state and budget ballpark.

- **(P1) US-FLOW-05 (Simplified): Location Analysis Agent**
  - **MVP Functionality:** Allows users to search for suburbs based on limited criteria: State, Budget Range (user input), and one key priority selected in the previous step (e.g., finds suburbs known historically for 'Growth' if that was the priority).
  - **Data:** Uses a simplified, potentially static dataset for MVP. Shows basic info for matching suburbs (Name, State, estimated Median Price range - could be broad category like $).
  - **User Action:** User inputs criteria, reviews list of matching suburbs. Can click to see a very basic suburb detail screen (name, state, estimated price range).
  - **Key Simplification:** Limited search criteria, basic results display, no deep data analysis, no complex filtering, no map view. Focus is on demonstrating the link between selected priority and location matching.
- **(P1) US-FLOW-06 & FR-AGENT-NET (Broker Only): AI Prompt & Broker Connection**
  - **MVP Functionality:** After the user reviews location results (or perhaps earlier, e.g., after defining budget), the AI workflow prompts the user: "Understanding your borrowing power is a key next step. Would you like to connect with a vetted Mortgage Broker to discuss your options?".
  - **User Action:** User can accept or decline. If accepted, displays basic contact information for partner broker(s) OR presents a simple contact form (Lead Generation) that captures user consent and basic details to be forwarded to the broker.
  - **Key Simplification:** Only offers Mortgage Broker connection. Vetting process managed manually offline. Connection method is basic (info display or simple form). Clear disclosure about referral model needed.
- **(P2) US-FLOW-01: Basic Onboarding & Profile**
  - **MVP Functionality:** Collects minimal essential info: User goal category (e.g., First Home Buyer, Investor), self-reported Budget Range, State. Basic user account creation (email/password or social login).
  - **User Action:** User creates account and provides basic context.
- **(P2) US-FLOW-03 & FR-AI-CORE (Simplified): Basic Workflow Guidance**
  - **MVP Functionality:** Hardcoded sequence for the MVP: Onboarding -> Strategy Insights -> Location Analysis -> Broker Prompt. Simple textual guidance ("Now let's explore strategies...", "Next, let's find locations...").
  - **Key Simplification:** Not dynamic or deeply intelligent; provides basic linear navigation through the core MVP steps.
- **(P3) FR-AGENT-NET-02 (Minimal Backend): Internal Broker List Management**
  - **MVP Functionality:** A simple internal mechanism (e.g., basic database table, spreadsheet managed by admin) to store contact details and basic info of the vetted mortgage brokers to be displayed or receive leads. Not a user-facing admin panel.

**4. OUT OF SCOPE Features for MVP (Deferred for Later Releases):**

- **All Financial Assessment Agent Functionality:** No borrowing power calculator, purchase cost calculator, ongoing cost modeller, or investment cash flow analyser in MVP.
- **Advanced Location Analysis:** No complex filtering (multiple criteria), deep data dives (demographics, detailed trends, school data, crime stats), map views, suburb comparisons.
- **Advanced AI Strategy Insights:** No dynamic analysis of user input, sophisticated AI algorithms for strategy presentation.
- **Property Discovery Agent:** No internet searching/aggregation of property listings from portals.
- **Property Evaluation Agent:** No analysis of specific properties, no integration of financial tools with listings.
- **Other Professional Network Categories:** No connections for Conveyancers, Inspectors, Accountants, etc. in MVP.
- **Full Journey Planner/Checklists:** No detailed task lists or progress tracking beyond the core MVP flow.
- **User Account Management:** Only basic profile, no advanced settings or management features.
- **Full Admin Panel:** No comprehensive admin interface for managing users, partners, content, or workflow rules.
- **Web Application:** Assuming mobile-first, web version is likely out of scope for initial MVP.
