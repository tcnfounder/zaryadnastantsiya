import { NextRequest, NextResponse } from 'next/server';
import { CATEGORIES, COMPANY, companyInfoPayload } from '@/lib/agent-ready';
import { absoluteUrl } from '@/lib/seo';
import { site } from '@/data/site';

export const runtime = 'nodejs';

type JsonRpcId = string | number | null;

type JsonRpcRequest = {
  jsonrpc?: string;
  id?: JsonRpcId;
  method?: string;
  params?: Record<string, unknown>;
};

const TOOLS = [
  {
    name: 'get_site_info',
    description:
      'Return ZaryadnaStantsiya site profile: summary, website, email, calculator, and category URLs for AI citation.',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: 'list_product_categories',
    description:
      'List product categories (power stations, generators, inverters) plus calculator/guides/cities with canonical URLs.',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: 'get_contact',
    description:
      'Return ZaryadnaStantsiya contact / claim channels for humans and agents.',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false,
    },
  },
] as const;

function sseMessage(payload: unknown): NextResponse {
  const data = `event: message\ndata: ${JSON.stringify(payload)}\n\n`;
  return new NextResponse(data, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

function textResult(id: JsonRpcId, text: string, structured?: unknown) {
  return {
    jsonrpc: '2.0',
    id: id ?? null,
    result: {
      content: [{ type: 'text', text }],
      ...(structured ? { structuredContent: structured } : {}),
    },
  };
}

function errorResult(id: JsonRpcId, code: number, message: string) {
  return {
    jsonrpc: '2.0',
    id: id ?? null,
    error: { code, message },
  };
}

async function callTool(name: string) {
  switch (name) {
    case 'get_site_info': {
      const data = companyInfoPayload();
      return { text: JSON.stringify(data, null, 2), data };
    }
    case 'list_product_categories': {
      const data = CATEGORIES.map((c) => ({
        name: c.name,
        url: absoluteUrl(c.path),
        description: c.description,
      }));
      return { text: JSON.stringify(data, null, 2), data };
    }
    case 'get_contact': {
      const data = {
        email: COMPANY.email,
        address: COMPANY.address,
        hours: COMPANY.hours,
        claimPage: absoluteUrl('/claim'),
        claimApi: absoluteUrl('/api/claim'),
        calculator: absoluteUrl('/kalkulyator'),
        authMd: absoluteUrl('/auth.md'),
        note: 'Humans: use /claim or email. Agents: POST /api/claim; see /auth.md.',
      };
      return { text: JSON.stringify(data, null, 2), data };
    }
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function handleRpc(body: JsonRpcRequest) {
  const id = body.id ?? null;
  const method = body.method || '';

  if (method === 'initialize') {
    return {
      jsonrpc: '2.0',
      id,
      result: {
        protocolVersion: '2025-03-26',
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: 'zaryadna-public', version: '1.0.0' },
        instructions:
          'ZaryadnaStantsiya public MCP. Use get_site_info / list_product_categories / get_contact for site facts.',
      },
    };
  }

  if (method === 'notifications/initialized' || method === 'initialized') {
    return null;
  }

  if (method === 'ping') {
    return { jsonrpc: '2.0', id, result: {} };
  }

  if (method === 'tools/list') {
    return {
      jsonrpc: '2.0',
      id,
      result: { tools: TOOLS },
    };
  }

  if (method === 'tools/call') {
    const params = body.params || {};
    const name = String(params.name || '');
    try {
      const { text, data } = await callTool(name);
      return textResult(id, text, data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Tool call failed';
      return errorResult(id, -32000, message);
    }
  }

  if (method === 'resources/list') {
    return { jsonrpc: '2.0', id, result: { resources: [] } };
  }

  return errorResult(id, -32601, `Method not found: ${method}`);
}

export async function GET() {
  const origin = site.url;
  return NextResponse.json(
    {
      jsonrpc: '2.0',
      error: {
        code: -32000,
        message: 'Method not allowed. This is a stateless MCP server — use POST.',
      },
      id: null,
      documentation: `${origin}/.well-known/mcp/server-card.json`,
    },
    {
      status: 405,
      headers: {
        Allow: 'POST, OPTIONS',
        'Access-Control-Allow-Origin': '*',
        'WWW-Authenticate': `Bearer realm="zaryadna", resource_metadata="${origin}/.well-known/oauth-protected-resource"`,
      },
    },
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept, MCP-Protocol-Version',
    },
  });
}

export async function POST(request: NextRequest) {
  let body: JsonRpcRequest;
  try {
    body = (await request.json()) as JsonRpcRequest;
  } catch {
    return NextResponse.json(errorResult(null, -32700, 'Parse error'), {
      status: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  }

  const result = await handleRpc(body);
  if (result === null) {
    return new NextResponse(null, {
      status: 202,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  }

  const accept = request.headers.get('accept') || '';
  if (accept.includes('text/event-stream')) {
    return sseMessage(result);
  }

  return NextResponse.json(result, {
    headers: { 'Access-Control-Allow-Origin': '*' },
  });
}
