class KPIEngine:
    def calculate_dashboard_metrics(self, business_context: dict) -> dict:
        kpis = business_context.get("current_kpis", {})
        revenue = kpis.get("current_revenue", 0)
        leads = kpis.get("leads", 0)
        retention = kpis.get("customer_retention", 0.5)
        churn = kpis.get("churn_rate", 0.1)
        
        # Try to load real-time dataset
        try:
            import pandas as pd
            import os
            data_path = os.path.join(os.path.dirname(__file__), '../../data/products.csv')
            if os.path.exists(data_path):
                df = pd.read_csv(data_path)
                # Compute real metrics from dataset
                revenue = (df['base_price'] * df['actual_demand']).sum()
                leads = df['forecasted_demand'].sum()
                retention = df['customer_satisfaction_score'].mean() / 5.0 # normalized to 0-1
                churn = df['channel_return_rate'].mean()
        except Exception as e:
            print(f"Dataset load failed: {e}")

        # 1. Business Health Score (0-100)
        health_score = min(100, max(0, int((retention * 100) + (revenue / 1000) - (churn * 200))))
        
        # 2. Growth Score (0-100)
        growth_score = min(100, max(0, int((leads / 100) * 5 + (revenue / 5000))))
        
        # 3. Revenue Opportunity (Mathematical projection)
        rev_opp = revenue * 0.15 * (1 - churn)
        
        # 4. Lead Score
        lead_score = "High" if leads > 1000 else ("Medium" if leads > 100 else "Low")
        
        # 5. Customer Health
        cust_health = int((1 - churn) * 100)
        
        # 6. Risk Alerts
        risks = 0
        if churn > 0.15: risks += 1
        if rev_opp < 5000: risks += 1
        if health_score < 50: risks += 1

        return {
            "business_health": {"value": health_score, "trend": "up" if health_score > 70 else "down", "confidence": 0.90},
            "growth_score": {"value": growth_score, "trend": "up", "confidence": 0.85},
            "revenue_opportunity": {"value": round(rev_opp, 2), "trend": "up", "confidence": 0.80},
            "lead_score": {"value": lead_score, "trend": "neutral", "confidence": 0.95},
            "risk_alerts": {"value": risks, "trend": "down" if risks < 2 else "up", "confidence": 0.99},
            "market_readiness": {"value": "Ready" if health_score > 60 else "Not Ready", "trend": "up", "confidence": 0.85},
            "customer_health": {"value": cust_health, "trend": "up", "confidence": 0.92},
            "ai_recommendations": {"value": "4 Active", "trend": "New", "confidence": 0.95},
            "executive_summary": f"Calculated based on {len(kpis)} active KPIs. Health is {health_score}/100."
        }
    
    def get_charts_data(self, business_context: dict) -> dict:
        return {
            "revenue_trend": [
                {'name': 'Jan', 'revenue': 4000, 'leads': 240},
                {'name': 'Feb', 'revenue': 4500, 'leads': 300},
                {'name': 'Mar', 'revenue': 5200, 'leads': 420},
            ]
        }
