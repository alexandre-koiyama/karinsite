from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from jinja2 import Environment, FileSystemLoader

from app.core.config import settings
from app.api.v1 import courses as courses_api

BASE_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = BASE_DIR.parent

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

app.mount("/static", StaticFiles(directory=PROJECT_ROOT / "static"), name="static")

templates_env = Environment(
    loader=FileSystemLoader(str(PROJECT_ROOT / "templates")),
    autoescape=True,
)


def render(template_name: str, context: dict) -> HTMLResponse:
    template = templates_env.get_template(template_name)
    html = template.render(**context)
    return HTMLResponse(content=html)


app.include_router(courses_api.router, prefix="/api/v1")


@app.get("/")
async def home(request: Request):
    return render("index.html", {"request": request})


@app.get("/courses")
async def courses_page(request: Request):
    return render("courses.html", {"request": request})


@app.get("/course/{course_id}")
async def course_detail(request: Request, course_id: str):
    course = courses_api.COURSES.get(course_id)
    if not course:
        return HTMLResponse("<h1>Course not found</h1>", status_code=404)
    return render("course_detail.html", {"request": request, "course": course, "course_id": course_id})


@app.get("/about")
async def about_page(request: Request):
    return render("about.html", {"request": request})


@app.get("/contact")
async def contact_page(request: Request):
    return render("contact.html", {"request": request})


@app.get("/health")
async def health():
    return {"status": "ok"}
