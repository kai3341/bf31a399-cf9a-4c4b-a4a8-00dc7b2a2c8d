from decimal import Decimal
from pydantic import BaseModel

from typing import Literal, Generic, TypeVar, Union

T = TypeVar("T")


class Operation(BaseModel, Generic[T]):
    def evaluate(self) -> T:
        raise NotImplementedError


class BinaryOperation(Operation):
    left: Decimal
    right: Decimal


class OperationAdd(BinaryOperation):
    sign: Literal["add"]

    def evaluate(self) -> Decimal:
        return self.left + self.right


class OperationSub(BinaryOperation):
    sign: Literal["sub"]

    def evaluate(self) -> Decimal:
        return self.left - self.right


class OperationMul(BinaryOperation):
    sign: Literal["mul"]

    def evaluate(self) -> Decimal:
        return self.left * self.right


class OperationDiv(BinaryOperation):
    sign: Literal["div"]

    def evaluate(self) -> Decimal:
        return self.left / self.right


AnyBinaryOperaion = Union[
    OperationAdd,
    OperationSub,
    OperationMul,
    OperationDiv,
]


class Response(BaseModel):
    result: Decimal

