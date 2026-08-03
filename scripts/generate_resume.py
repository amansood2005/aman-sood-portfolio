#!/usr/bin/env python3
"""Generate Aman Sood's one-page resume (classic template layout)."""

from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

FONT_DIR = Path("/System/Library/Fonts/Supplemental")
pdfmetrics.registerFont(TTFont("TNR", str(FONT_DIR / "Times New Roman.ttf")))
pdfmetrics.registerFont(TTFont("TNR-B", str(FONT_DIR / "Times New Roman Bold.ttf")))
pdfmetrics.registerFont(TTFont("TNR-I", str(FONT_DIR / "Times New Roman Italic.ttf")))
pdfmetrics.registerFont(
    TTFont("TNR-BI", str(FONT_DIR / "Times New Roman Bold Italic.ttf"))
)

PAGE_W, PAGE_H = letter
MARGIN_X = 0.65 * inch
MARGIN_TOP = 0.52 * inch
MARGIN_BOTTOM = 0.45 * inch
CONTENT_W = PAGE_W - 2 * MARGIN_X
RULE = HexColor("#1a1a1a")
LINK_BLUE = HexColor("#0B57D0")

OUT = Path(__file__).resolve().parents[1] / "public" / "docs" / "resume.pdf"

PORTFOLIO_URL = (
    "https://aman-sood-portfolio-git-vercel-react-server-co-f43ca8-aman-a524.vercel.app"
)


def draw_header(c: canvas.Canvas, y: float) -> float:
    c.setFont("TNR-B", 22)
    c.drawCentredString(PAGE_W / 2, y, "Aman Sood")
    y -= 15

    parts = [
        ("+91 62802 73367", None),
        ("amansood2005@gmail.com", "mailto:amansood2005@gmail.com"),
        ("LinkedIn", "https://www.linkedin.com/in/amansood2005/"),
        ("GitHub", "https://github.com/amansood2005"),
        ("Portfolio", PORTFOLIO_URL),
    ]
    sep = "  •  "
    c.setFont("TNR", 9.5)
    full = sep.join(label for label, _ in parts)
    x = (PAGE_W - c.stringWidth(full, "TNR", 9.5)) / 2
    for i, (label, url) in enumerate(parts):
        w = c.stringWidth(label, "TNR", 9.5)
        if url:
            c.setFillColor(LINK_BLUE)
            c.drawString(x, y, label)
            c.linkURL(url, (x, y - 2, x + w, y + 10), relative=0)
            c.setFillColor(HexColor("#000000"))
        else:
            c.drawString(x, y, label)
        x += w
        if i < len(parts) - 1:
            sw = c.stringWidth(sep, "TNR", 9.5)
            c.drawString(x, y, sep)
            x += sw

    return y - 18


def section_title(
    c: canvas.Canvas, y: float, title: str, *, uppercase: bool = True
) -> float:
    c.setFont("TNR-B", 11)
    c.drawString(MARGIN_X, y, title.upper() if uppercase else title)
    y -= 4
    c.setStrokeColor(RULE)
    c.setLineWidth(0.9)
    c.line(MARGIN_X, y, PAGE_W - MARGIN_X, y)
    return y - 13


def row_lr(
    c: canvas.Canvas,
    y: float,
    left: str,
    right: str,
    left_font: str = "TNR-B",
    right_font: str = "TNR-B",
    size: float = 10.5,
) -> float:
    c.setFont(left_font, size)
    c.drawString(MARGIN_X, y, left)
    c.setFont(right_font, size)
    c.drawRightString(PAGE_W - MARGIN_X, y, right)
    return y - 13.5


def wrap_text(
    c: canvas.Canvas,
    text: str,
    font: str,
    size: float,
    max_width: float,
) -> list[str]:
    words = text.split()
    lines: list[str] = []
    cur = ""
    for w in words:
        trial = f"{cur} {w}".strip()
        if c.stringWidth(trial, font, size) <= max_width:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def bullet(c: canvas.Canvas, y: float, text: str, indent: float = 11) -> float:
    x = MARGIN_X + indent
    max_w = CONTENT_W - indent - 4
    c.setFont("TNR", 9.5)
    c.drawString(MARGIN_X + 2, y, "•")
    for line in wrap_text(c, text, "TNR", 9.5, max_w):
        c.drawString(x, y, line)
        y -= 12
    return y


def labeled_line(c: canvas.Canvas, y: float, label: str, body: str) -> float:
    c.setFont("TNR-B", 9.5)
    label_w = c.stringWidth(label, "TNR-B", 9.5)
    c.drawString(MARGIN_X, y, label)
    max_w = CONTENT_W - label_w
    lines = wrap_text(c, body, "TNR", 9.5, max_w)
    c.setFont("TNR", 9.5)
    if lines:
        c.drawString(MARGIN_X + label_w, y, lines[0])
        y -= 12.5
        for line in lines[1:]:
            c.drawString(MARGIN_X, y, line)
            y -= 12.5
    else:
        y -= 12.5
    return y


def project_header(
    c: canvas.Canvas,
    y: float,
    name: str,
    stack: str,
    links: list[tuple[str, str]],
) -> float:
    """Name (bold) left; Live/GitHub (or stack) right; stack italic under name if linked."""
    c.setFont("TNR-B", 10.5)
    c.drawString(MARGIN_X, y, name)

    if links:
        labels = "  |  ".join(label for label, _ in links)
        c.setFont("TNR", 9.2)
        total_w = c.stringWidth(labels, "TNR", 9.2)
        x = PAGE_W - MARGIN_X - total_w
        for i, (label, url) in enumerate(links):
            lw = c.stringWidth(label, "TNR", 9.2)
            c.setFillColor(LINK_BLUE)
            c.drawString(x, y, label)
            c.linkURL(url, (x, y - 2, x + lw, y + 10), relative=0)
            c.setFillColor(HexColor("#000000"))
            x += lw
            if i < len(links) - 1:
                sep = "  |  "
                c.drawString(x, y, sep)
                x += c.stringWidth(sep, "TNR", 9.2)
        y -= 12.5
        c.setFont("TNR-I", 9.2)
        c.drawString(MARGIN_X, y, stack)
        return y - 12.5

    c.setFont("TNR", 9.2)
    c.drawRightString(PAGE_W - MARGIN_X, y, stack)
    return y - 13.5


def build() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUT), pagesize=letter)
    c.setTitle("Aman Sood — Resume")
    c.setAuthor("Aman Sood")

    y = PAGE_H - MARGIN_TOP
    y = draw_header(c, y)

    # EDUCATION
    y = section_title(c, y, "Education")
    y = row_lr(c, y, "Punjab Engineering College (PEC)", "Chandigarh, India")
    y = row_lr(
        c,
        y,
        "B.E. in Electrical Engineering",
        "Aug 2023 – Jun 2027",
        left_font="TNR-I",
        right_font="TNR",
        size=10,
    )
    y = labeled_line(
        c,
        y,
        "Relevant Coursework: ",
        "Data Structures & Algorithms, Object-Oriented Programming, "
        "Probability & Statistics, Linear Algebra",
    )
    c.setFont("TNR", 9.5)
    c.drawString(MARGIN_X, y, "Class 12 (CBSE): 85%  |  Class 10 (ICSE): 95%")
    y -= 16

    # WORK EXPERIENCE
    y = section_title(c, y, "Work Experience")
    y = row_lr(c, y, "Bharat Electronics Limited (BEL)", "India")
    y = row_lr(
        c,
        y,
        "Engineering Intern",
        "Jan 2026 – May 2026",
        left_font="TNR-I",
        right_font="TNR",
        size=10,
    )
    for point in [
        "Analyzed operational datasets across substations, DG sets, and solar systems to surface performance anomalies and deliver actionable insights for stakeholders.",
        "Built structured energy-data tracking and documentation workflows supporting ISO 50001 compliance readiness and measurable sustainability outcomes.",
        "Translated multi-source sensor and operational data into review-ready summaries; contributed to work recognized at the GreenTech Energy Awards.",
    ]:
        y = bullet(c, y, point)
    y -= 7

    # PROJECTS
    y = section_title(c, y, "Projects")

    projects = [
        {
            "name": "E32Log — Real-Time Vehicle Telemetry & OBD-II Logger",
            "stack": "C++, Python, ESP32, OBD-II",
            "links": [
                ("GitHub", "https://github.com/amansood2005/E32Log"),
            ],
            "bullets": [
                "Built a real-time telemetry pipeline ingesting 10+ vehicle parameters (RPM, speed, coolant temp, fuel efficiency) over OBD-II on ESP32 with sub-second polling.",
                "Logged and streamed 1000+ live diagnostic records via wireless/local output for continuous monitoring and debugging.",
                "Designed modular OOP classes for acquisition, buffering, and output to keep end-to-end latency low on constrained hardware.",
            ],
        },
        {
            "name": "Intelligent Traffic Surveillance System",
            "stack": "Python, YOLOv8, DeepSORT, OpenCV, Edge AI",
            "links": [],
            "bullets": [
                "Built a real-time multi-vehicle detection and tracking pipeline with YOLOv8 + DeepSORT for traffic monitoring and rule-based violation analytics.",
                "Implemented ROI/polygon counting plus ambulance-aware exception logic to cut false positives in automated red-light enforcement at the edge.",
            ],
        },
        {
            "name": "E-Commerce Web Application",
            "stack": "JavaScript, Node.js, Express, REST APIs",
            "links": [
                ("Live", "https://ecommerce-web-app-ebon.vercel.app"),
                ("GitHub", "https://github.com/amansood2005/ecommerce-web-app"),
            ],
            "bullets": [
                "Shipped a responsive full-stack storefront with catalog, cart, and checkout flows; integrated REST APIs with clean request/response handling.",
                "Added server-side cart validation (shipping/tax), order-creation endpoints, and a light/dark theme toggle for a production-ready UX.",
            ],
        },
        {
            "name": "Personal Portfolio Website",
            "stack": "Next.js, TypeScript, Framer Motion",
            "links": [
                ("Live", PORTFOLIO_URL),
                ("GitHub", "https://github.com/amansood2005/aman-sood-portfolio"),
            ],
            "bullets": [
                "Built a responsive portfolio with animated about/skills/projects/contact sections, light/dark theme, and one-click resume download.",
            ],
        },
    ]

    for p in projects:
        y = project_header(c, y, p["name"], p["stack"], p["links"])
        for point in p["bullets"]:
            y = bullet(c, y, point)
        y -= 5

    # Skills
    y = section_title(c, y, "Skills & Certifications", uppercase=False)
    y = labeled_line(
        c,
        y,
        "Languages: ",
        "Python, C++, SQL, Java, JavaScript, TypeScript",
    )
    y = labeled_line(
        c,
        y,
        "AI / Data: ",
        "Pandas, NumPy, Scikit-learn, Statistical Analysis, OpenCV, YOLOv8, "
        "Prompt Engineering, RAG fundamentals",
    )
    y = labeled_line(
        c,
        y,
        "Engineering: ",
        "DSA & OOP, FastAPI, Node.js, REST APIs, PostgreSQL, MongoDB, "
        "Next.js, React, Git, Linux, Docker, ESP32 / IoT",
    )
    y = labeled_line(
        c,
        y,
        "Interests: ",
        "AI systems, edge computing, data products, shipping end-to-end prototypes",
    )

    if y < MARGIN_BOTTOM:
        print(f"Warning: content near bottom margin (y={y:.1f})")
    else:
        print(f"Bottom clearance: {y - MARGIN_BOTTOM:.1f} pt")

    c.showPage()
    c.save()
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    build()
