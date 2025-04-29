# MVP Data Requirements (Simplified / Static)

Specifies essential data points and assumes simplified/static sources for MVP.

## 1. User Profile Data (Locally Stored for MVP)

*   `userGoal`: String (e.g., "First Home", "Investment")
*   `userBudgetRange`: String (e.g., "$500k-$700k", "$700k-$900k")
*   `userState`: String (e.g., "NSW", "VIC")
*   `selectedPriorities`: Array of Strings (e.g., ["Prioritise Capital Growth"])

## 2. Strategy Archetypes (Static App Content)

*   Array of Objects, each with:
    *   `archetypeName`: String (e.g., "Growth Focus")
    *   `description`: String (Static text explaining the archetype)
    *   `prosCons`: String (Static text outlining general pros/cons)
    *   `associatedPriority`: String (e.g., "Prioritise Capital Growth") - used for filtering logic/tags

*Example Data:*
```json
[
  {
    "archetypeName": "Growth Focus",
    "description": "Strategies focusing on areas expected to increase in value over time...",
    "prosCons": "Pros: Potential for higher long-term returns. Cons: May have lower rental yield initially...",
    "associatedPriority": "Prioritise Capital Growth"
  },
  {
    "archetypeName": "Yield Focus",
    "description": "Strategies focusing on properties generating strong rental income relative to cost...",
    "prosCons": "Pros: Positive cash flow potential. Cons: Capital growth might be slower...",
    "associatedPriority": "Prioritise Yield"
  }
]