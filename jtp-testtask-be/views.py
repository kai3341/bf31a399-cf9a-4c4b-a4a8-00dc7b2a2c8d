from singleton import fastapi_app
from pydantic_models import AnyBinaryOperaion, Response


@fastapi_app.post("/evaluate")
def evaluate(operation: AnyBinaryOperaion) -> Response:
    return Response(
        result=operation.evaluate(),
    )

