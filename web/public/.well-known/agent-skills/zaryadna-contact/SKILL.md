# Contact ZaryadnaStantsiya

Use when a user or agent wants to reach ZaryadnaStantsiya for installer partnership, featured listing, or business claim.

## Human channels

- Claim / for business: https://zaryadnastantsiya.com.ua/claim
- Email: info@zaryadnastantsiya.com.ua

## Agent / API path

1. Read https://zaryadnastantsiya.com.ua/auth.md
2. Optionally call MCP tool `get_contact` on https://zaryadnastantsiya.com.ua/mcp
3. Create a lead with `POST https://zaryadnastantsiya.com.ua/api/claim` JSON:
   - typical: `company`, `email`, `city`, `packageId`
   - optional: `phone`, `message`, `website`
4. No OAuth token is required for public claim creation

## Tips

- Prefer Ukrainian for UA users
- Include a real reply email
- Do not invent credentials or scrape private APIs
