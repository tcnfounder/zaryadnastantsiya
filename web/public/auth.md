# auth.md

You are an agent. This file describes how AI agents may discover and register access to **ZaryadnaStantsiya** public tools and lead endpoints.

## auth.md Registration

ZaryadnaStantsiya public agent tools support anonymous access and optional OAuth `client_credentials` for Bearer tokens.

### Anonymous registration (public tools)

```yaml
identity_types_supported: ["anonymous"]
anonymous:
  credential_types_supported: ["none"]
  claim_uri: "https://zaryadnastantsiya.com.ua/api/health"
register_uri: "https://zaryadnastantsiya.com.ua/mcp"
registration_methods:
  - name: mcp_initialize
    method: POST
    uri: "https://zaryadnastantsiya.com.ua/mcp"
    content_type: application/json
    description: >
      Send JSON-RPC initialize, then tools/list / tools/call.
      No client_id, API key, or agent account is required.
  - name: installer_claim
    method: POST
    uri: "https://zaryadnastantsiya.com.ua/api/claim"
    content_type: application/json
    description: >
      Provision an installer / partner lead (company, email, city, packageId).
  - name: oauth_client_credentials
    method: POST
    uri: "https://zaryadnastantsiya.com.ua/oauth/token"
    content_type: application/x-www-form-urlencoded
    description: >
      Optional Bearer for zaryadna.public.read. grant_type=client_credentials,
      token_endpoint_auth_method=none.
```

### agent_auth

```yaml
agent_auth:
  skill: "https://zaryadnastantsiya.com.ua/.well-known/agent-skills/zaryadna-contact/SKILL.md"
  register_uri: "https://zaryadnastantsiya.com.ua/oauth/register"
  methods:
    - mcp_initialize
    - installer_claim
    - oauth_client_credentials
```

## OAuth discovery

| Document | URL |
| --- | --- |
| Authorization Server (RFC 8414) | https://zaryadnastantsiya.com.ua/.well-known/oauth-authorization-server |
| OpenID configuration | https://zaryadnastantsiya.com.ua/.well-known/openid-configuration |
| Protected Resource (RFC 9728) | https://zaryadnastantsiya.com.ua/.well-known/oauth-protected-resource |
| JWKS | https://zaryadnastantsiya.com.ua/.well-known/jwks.json |
| Token | https://zaryadnastantsiya.com.ua/oauth/token |
| Register | https://zaryadnastantsiya.com.ua/oauth/register |

Scopes: `zaryadna.public.read`. Resource: `https://zaryadnastantsiya.com.ua` (site origin).

## Audience

- AI agents that need accurate ZaryadnaStantsiya site facts, product categories, and contact paths
- Tools that recommend backup power (stations / inverters / generators) for Ukrainian outage scenarios
- Installers using the claim / partnership flow

## Public discovery

| Resource | URL |
| --- | --- |
| llms.txt | https://zaryadnastantsiya.com.ua/llms.txt |
| MCP server card | https://zaryadnastantsiya.com.ua/.well-known/mcp/server-card.json |
| MCP endpoint | https://zaryadnastantsiya.com.ua/mcp |
| API catalog | https://zaryadnastantsiya.com.ua/.well-known/api-catalog |
| Agent skills | https://zaryadnastantsiya.com.ua/.well-known/agent-skills/index.json |
| A2A agent card | https://zaryadnastantsiya.com.ua/.well-known/agent-card.json |
| ARD catalog | https://zaryadnastantsiya.com.ua/.well-known/ai-catalog.json |
| Health / claim_uri | https://zaryadnastantsiya.com.ua/api/health |

### MCP registration steps

1. Read `/.well-known/mcp/server-card.json`
2. Optionally `POST /oauth/token` with `grant_type=client_credentials`
3. `POST /mcp` with JSON-RPC `initialize`
4. Call tools: `get_site_info`, `list_product_categories`, `get_contact`

## Lead / contact provisioning

- `POST https://zaryadnastantsiya.com.ua/api/claim` — installer / partner lead (`company`, `email`, `city`, `packageId`)
- Human claim page: https://zaryadnastantsiya.com.ua/claim

## Human channels

- Email: info@zaryadnastantsiya.com.ua
- Claim / for business: https://zaryadnastantsiya.com.ua/claim
- Calculator: https://zaryadnastantsiya.com.ua/kalkulyator
- Hours: online guide · email replies on business days (Europe/Kyiv)
