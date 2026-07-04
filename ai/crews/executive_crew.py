from crewai import Crew, Process
from ai.agents.ceo_agent import CEOAgent
from ai.agents.strategy_agent import StrategyAgent
from ai.agents.marketing_agent import MarketingAgent
from ai.agents.sales_agent import SalesAgent
from ai.agents.finance_agent import FinanceAgent
from ai.agents.operations_agent import OperationsAgent
from ai.agents.customer_success_agent import CustomerSuccessAgent
from ai.tasks.strategy_tasks import StrategyTasks
from ai.tasks.execution_tasks import ExecutionTasks
from ai.tasks.ceo_tasks import CEOTasks
from ai.tools.decision_engine import DecisionEvaluationEngine

class ExecutiveCrewManager:
    def __init__(self):
        self.ceo = CEOAgent().create()
        self.strategy = StrategyAgent().create()
        self.marketing = MarketingAgent().create()
        self.sales = SalesAgent().create()
        self.finance = FinanceAgent().create()
        self.operations = OperationsAgent().create()
        self.cs = CustomerSuccessAgent().create()
        
        self.strategy_tasks = StrategyTasks()
        self.exec_tasks = ExecutionTasks()
        self.ceo_tasks = CEOTasks()
        
        self.decision_engine = DecisionEvaluationEngine()

    def run_growth_cycle(self, business_context):
        ctx_str = str(business_context)
        
        # 1. Strategy Formulation
        t_strategy = self.strategy_tasks.design_strategy(self.strategy, ctx_str)
        
        # 2. Execution Planning (Parallel conceptual execution, processed sequentially by CrewAI)
        t_marketing = self.exec_tasks.plan_marketing_campaign(self.marketing, ctx_str)
        t_sales = self.exec_tasks.plan_sales_pipeline(self.sales, ctx_str)
        t_ops = self.exec_tasks.assess_operations(self.operations, ctx_str)
        t_cs = self.exec_tasks.assess_customer_success(self.cs, ctx_str)
        t_finance = self.exec_tasks.review_budget(self.finance, ctx_str)
        
        # 3. CEO Summary
        t_ceo = self.ceo_tasks.orchestrate_and_summarize(self.ceo, ctx_str)
        
        crew = Crew(
            agents=[self.strategy, self.marketing, self.sales, self.operations, self.cs, self.finance, self.ceo],
            tasks=[t_strategy, t_marketing, t_sales, t_ops, t_cs, t_finance, t_ceo],
            process=Process.sequential,
            verbose=True,
            memory=True,
            max_rpm=100,
            full_output=True
        )

        crew_output = crew.kickoff()
        
        # 4. Decision Engine Evaluation
        # We pass the crew outputs into our deterministic evaluation engine
        final_decision = self.decision_engine.evaluate(crew_output)
        return final_decision
