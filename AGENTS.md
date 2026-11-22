# Local development and preview servers

- The normal documentation preview is http://localhost:3000, served from this checkout.
- Before starting a development server, check whether port 3000 already has a healthy server for this checkout. Reuse that server for browser checks and visual testing when it does.
- Do not start a second Docusaurus server on port 3001 or another fallback port just because port 3000 is already running. An occupied port is a reason to inspect and reuse the existing server.
- Preserve the user-started server: do not stop or restart it as part of routine testing.
- If port 3000 is unused and a preview is needed, start one server on port 3000. Shut it down when testing is complete if you started it solely for that task.
- If a separate checkout, incompatible server configuration, or a different application on port 3000 prevents reuse, explain the conflict before starting another memory-heavy server. Never validate one checkout using a server that serves a different checkout.
