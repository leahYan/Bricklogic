# MVP Scope Definition

## Goal of the MVP:

*   Validate user engagement with AI-driven strategy exploration (simplified).
*   Assess if users can successfully use simplified location matching based on their selected priorities.
*   Measure user willingness to connect with a mortgage broker via the app when prompted contextually.
*   Gather initial user feedback on the core workflow concept and value proposition.

## IN SCOPE Features/User Stories for MVP:

*(Highest priority first)*

*   **(P1) US-FLOW-02 (Simplified): AI Strategy Insights Agent**
    *   Presents 2-3 predefined strategy archetypes (static descriptions).
    *   User selects 1-2 key priorities (tags/checkboxes).
    *   Requires disclaimer. Static rules, no dynamic AI.
*   **(P1) US-FLOW-05 (Simplified): Location Analysis Agent**
    *   Searches based on State, Budget Range, and ONE selected priority.
    *   Uses simplified/static data.
    *   Shows basic list of matching Suburb Names + Price Indicator ($$).
    *   Handles "No Results". Basic detail screen optional.
*   **(P1) US-FLOW-06 & FR-AGENT-NET (Broker Only): AI Prompt & Broker Connection**
    *   Contextual prompt to connect with Broker.
    *   User Accepts/Declines.
    *   Displays Broker contact info OR simple Lead Gen Form upon acceptance.
    *   Requires referral disclaimer. Broker category only.
*   **(P2) US-FLOW-01: Basic Onboarding & Profile**
    *   Basic email/password or social login/signup.
    *   Collects Goal Category, Budget Range, State.
*   **(P2) US-FLOW-03 & FR-AI-CORE (Simplified): Basic Workflow Guidance**
    *   Hardcoded linear flow: Onboarding -> Strategy -> Location -> Broker Prompt.
    *   Simple textual guidance between steps.
*   **(P3) FR-AGENT-NET-02 (Minimal Backend): Internal Broker List Management**
    *   Internal data store (non-UI) for broker info used in US-FLOW-06.

## OUT OF SCOPE Features for MVP:

*   All Financial Assessment Agent Functionality (Calculators).
*   Advanced Location Analysis (Complex filters, deep data, maps, comparisons).
*   Advanced AI Strategy Insights (Dynamic analysis).
*   Property Discovery Agent (No listing aggregation/internet search).
*   Property Evaluation Agent (No analysis of specific properties).
*   Other Professional Network Categories (Conveyancers, etc.).
*   Full Journey Planner/Checklists.
*   Advanced User Account Management.
*   Full Admin Panel.
*   Web Application version.

---
*AI Builder Note: Build ONLY the features listed under "IN SCOPE".*