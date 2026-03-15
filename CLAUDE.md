# Claude Instructions

## General

- Keep changes minimal and focused on what was asked.
- Prefer editing existing files over creating new ones.
- Do not add comments, docstrings, or type annotations to code you didn't change.
- Avoid over-engineering — solve the current problem, not hypothetical future ones.

## Git

- Use clear, descriptive commit messages.
- Keep commits atomic and single-purpose.
- Never push to `main` directly; use feature branches.

## Code Quality

- Avoid introducing security vulnerabilities (injection, XSS, etc.).
- Do not add unnecessary error handling or validation for impossible scenarios.
- Trust framework guarantees; only validate at system boundaries.
