from fastapi import Depends, HTTPException, status, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import os
import jwt  # PyJWT

security = HTTPBearer(auto_error=False)

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
):
    """
    Verifies the Supabase JWT token.
    In demo / dev mode (no token provided), returns a mock user so the
    dashboard can still be explored without completing the full auth flow.
    """
    # --- Demo mode: no token supplied ---
    if credentials is None:
        return {"id": "demo-user", "email": "demo@synexa.ai", "mode": "demo"}

    token = credentials.credentials
    supabase_jwt_secret = os.getenv("SUPABASE_JWT_SECRET", "")

    # --- If secret not configured, allow through in dev ---
    if not supabase_jwt_secret:
        return {"id": "dev-user", "email": "dev@synexa.ai", "mode": "dev"}

    try:
        payload = jwt.decode(
            token,
            supabase_jwt_secret,
            algorithms=["HS256"],
            options={"verify_aud": False},
        )
        return {
            "id": payload.get("sub", "unknown"),
            "email": payload.get("email", ""),
            "mode": "authenticated",
        }
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except jwt.InvalidTokenError:
        # Invalid token → return demo mode rather than hard crash for MVP
        return {"id": "demo-user", "email": "demo@synexa.ai", "mode": "demo"}
