# Zen Marinero — PRD

## Problem statement
Web para restaurante Zen Marinero en Caleta del Sebo, La Graciosa (Lanzarote). Inspirada en bar Pimentel pero con identidad propia. Elegante, cálida, gastronómica. Cream + burgundy, tipografía editorial (Cormorant Garamond + Manrope).

## User personas
- Visitantes / turistas buscando reservar mesa.
- Residentes de la isla que consultan carta / horario.
- Candidatos a empleo que envían CV.
- Dueño del restaurante (admin).

## Core requirements
1. Header con logo + nav + Reservar + Ver carta + Instagram.
2. Hero con imagen grande y tagline.
3. "Somos un restaurante de barrio" (emocional).
4. Sección Carta con botón PDF.
5. Historia.
6. Galería asimétrica.
7. Dirección + Google Maps + teléfono + horario + WhatsApp + redes.
8. Formulario reservas, contacto y empleo con CV.
9. Footer legal.
10. SEO local.

## Implemented (02 Feb 2026)
- Backend FastAPI: `POST /api/reservations`, `/api/contact`, `/api/jobs` (multipart CV).
- Admin endpoints protegidos con Bearer token (`ADMIN_TOKEN`).
- Email opcional vía Resend (requiere `RESEND_API_KEY`).
- Frontend React SPA con secciones: Header, Hero, About, MenuSection (modal carta + PDF), History, Gallery (bento), Visit (maps iframe), Employment, Footer, WhatsApp floating button.
- Dialogs: Reserva, Contacto, Carta.
- Admin page `/admin` con tabs Reservas / Contacto / Empleo + descarga CV.
- Schema.org Restaurant JSON-LD para SEO local.

## Backlog / P1
- Integrar Resend API key real para envío de emails.
- Subir carta PDF definitiva (actualmente placeholder).
- Admin CRUD: cambiar estado reserva (confirmada/cancelada).
- Galería con lightbox.
- Internacionalización ES/EN.

## P2
- Reservas con control de aforo / horarios bloqueados.
- Newsletter.
- Blog de temporada.
