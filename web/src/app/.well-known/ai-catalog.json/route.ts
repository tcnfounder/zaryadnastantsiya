import { NextResponse } from 'next/server';
import { site } from '@/data/site';

export const dynamic = 'force-static';

export async function GET() {
  const origin = site.url;
  const host = new URL(origin).hostname;

  const catalog = {
    specVersion: '1.0',
    host: {
      displayName: 'ZaryadnaStantsiya',
      identifier: `did:web:${host}`,
    },
    entries: [
      {
        identifier: `urn:air:${host}:server:public-mcp`,
        displayName: 'ZaryadnaStantsiya Public MCP',
        type: 'application/mcp-server-card+json',
        url: `${origin}/.well-known/mcp/server-card.json`,
        representativeQueries: [
          'What is ZaryadnaStantsiya?',
          'Порівняння зарядних станцій Україна',
          'Калькулятор резервного живлення',
          'Інвертор чи генератор для квартири',
        ],
      },
      {
        identifier: `urn:air:${host}:skills:index`,
        displayName: 'ZaryadnaStantsiya Agent Skills',
        type: 'application/json',
        url: `${origin}/.well-known/agent-skills/index.json`,
        representativeQueries: [
          'How can an agent contact ZaryadnaStantsiya?',
          'List backup power product categories',
          'ZaryadnaStantsiya site profile for AI agents',
        ],
      },
      {
        identifier: `urn:air:${host}:agent:info`,
        displayName: 'ZaryadnaStantsiya Info Agent',
        type: 'application/json',
        url: `${origin}/.well-known/agent-card.json`,
        representativeQueries: [
          'Find ZaryadnaStantsiya agent card',
          'Ask about power station categories',
        ],
      },
      {
        identifier: `urn:air:${host}:api:catalog`,
        displayName: 'ZaryadnaStantsiya API Catalog',
        type: 'application/linkset+json',
        url: `${origin}/.well-known/api-catalog`,
        representativeQueries: [
          'ZaryadnaStantsiya public API endpoints',
          'Where is the ZaryadnaStantsiya MCP endpoint?',
        ],
      },
    ],
  };

  return NextResponse.json(catalog, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
