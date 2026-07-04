from app.services.business_context_service import BusinessContextService
from ai.crews.executive_crew import ExecutiveCrewManager
from ai.tools.decision_engine import DecisionEvaluationEngine
from sqlalchemy.orm import Session

class AIService:
    def __init__(self, db: Session):
        self.db = db
        self.context_service = BusinessContextService(db)
        self.crew_manager = ExecutiveCrewManager()
        self.decision_engine = DecisionEvaluationEngine()

    def run_strategy_agent(self, business_id: str):
        context = self.context_service.build_context(business_id)
        decision = self.crew_manager.run_growth_cycle(context)
        return {"status": "success", "decision": decision}
        
    def chat_with_copilot(self, business_id: str, message: str):
        """
        The definitive Copilot workflow:
        User Question -> Context Builder -> Crew -> Decision Engine -> Response
        """
        # 1. Context Retrieval
        context = self.context_service.build_context(business_id)
        
        # 2. Executive Crew processes the question against context
        # TODO: Route specific Copilot task to CEO agent
        crew_response = "TODO: CrewAI Copilot routing"
        
        # 3. Decision Evaluation
        final_answer = self.decision_engine.evaluate({"copilot_query": message, "context": context.model_dump(), "crew": crew_response})
        
        # 4. Final output
        return {"response": final_answer["best_recommendation"], "reasoning": final_answer["executive_reasoning"]}
