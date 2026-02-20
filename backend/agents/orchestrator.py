from backend.agents.planner import plan_task
from backend.agents.copilot import run_coder
from backend.agents.critic import critique_output
import os

PROJECT_ROOT = os.path.expanduser("~/agentcraft")

def run_multi_agent(user_request: str) -> dict:
    """
    Orchestrate Planner -> Coder -> Critic pipeline
    Returns all agent outputs for UI display
    """
    results = {
        "planner": None,
        "coder": None,
        "critic": None,
        "final_response": ""
    }
    
    # Step 1 — Planner breaks down the task
    print(f"[Planner] Analyzing: {user_request}")
    planner_result = plan_task(user_request, PROJECT_ROOT)
    results["planner"] = planner_result
    
    # Step 2 — Coder executes the plan
    print(f"[Coder] Executing plan...")
    coder_result = run_coder(planner_result["output"], user_request, PROJECT_ROOT)
    results["coder"] = coder_result
    
    # Step 3 — Critic reviews the output
    print(f"[Critic] Reviewing output...")
    critic_result = critique_output(user_request, coder_result["output"])
    results["critic"] = critic_result
    
    # Final response combines coder output with critic feedback
    results["final_response"] = coder_result["output"]
    
    return results