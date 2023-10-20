from decimal import Decimal
from singleton import fastapi_app
from pydantic_models import AnyBinaryOperaion


@fastapi_app.post("/evaluate")
def evaluate(operation: AnyBinaryOperaion) -> Decimal:
    return operation.evaluate()

