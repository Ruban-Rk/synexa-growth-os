class DecisionEvaluationEngine:
    """
    Receives outputs from business agents, compares recommendations,
    detects conflicts (e.g. Marketing wants to spend, Finance rejects),
    assigns confidence scores, and selects best path.
    """
    def evaluate(self, crew_output) -> dict:
        outputs = str(crew_output)
        
        conflicts = self.detect_conflicts(outputs)
        confidence = self.assign_confidence(outputs, conflicts)
        ranked = self.rank_recommendations(outputs)
        merged = self.merge_recommendations(ranked)
        summary = self.generate_executive_summary(merged, confidence, conflicts)
        
        return {
            "best_recommendation": merged,
            "alternative_recommendations": ranked[1:] if len(ranked) > 1 else [],
            "confidence_score": confidence,
            "reasoning": "Determined by evaluating Finance approval against Marketing spend.",
            "executive_summary": summary,
            "conflicts_detected": conflicts
        }

    def detect_conflicts(self, outputs: str):
        conflicts = []
        if "reject" in outputs.lower() and "increase budget" in outputs.lower():
            conflicts.append("Marketing budget increase rejected by Finance.")
        if "capacity warning" in outputs.lower():
            conflicts.append("Operations cannot support projected sales volume.")
        return conflicts

    def assign_confidence(self, outputs: str, conflicts: list):
        base_score = 0.90
        base_score -= (len(conflicts) * 0.15)
        return max(0.10, round(base_score, 2))

    def rank_recommendations(self, outputs: str):
        # TODO: Use NLP to parse distinct recommendations and rank by ROI
        return ["Primary Strategy Execution", "Conservative Growth Path"]

    def merge_recommendations(self, ranked: list):
        return ranked[0] if ranked else "Default Action"

    def generate_executive_summary(self, merged, confidence, conflicts):
        # For MVP, returns structural data matching the required AI Response Format
        return {
            "Executive Summary": f"The team recommends {merged}.",
            "Key Findings": "Market shows potential, but constrained by budget.",
            "Risks": conflicts,
            "Growth Opportunities": ["Optimization of LTV"],
            "Recommended Actions": ["Execute primary strategy with reduced ad spend"],
            "Confidence Score": confidence,
            "Next Steps": ["Approve budget", "Launch campaign"]
        }
