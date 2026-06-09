from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "Dental Academy"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    model_config = {"env_file": ".env", "extra": "ignore"}


settings = Settings()
