from singleton import fastapi_app as app

import views
views.__package__


__all__ = (
    # ===
    "app",
)

