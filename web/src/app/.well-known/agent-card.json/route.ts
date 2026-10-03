import { NextResponse } from 'next/server';
import { CATEGORIES, COMPANY } from '@/lib/agent-ready';
import { site } from '@/data/site';

export const dynamic = 'force-static';

export async function GET() {
  const origin = site.url;

  const card = {
    name: 'ZaryadnaStantsiya Info Agent',
    description: `${COMPANY.summary} Agents can ask for product categories, calculator links, and contact details.`,
    version: '1.0.0',
    protocolVersion: '0.3',
    url: `${origin}/mcp`,
    provider: {
      organization: COMPANY.name,
      url: origin,
    },
    documentationUrl: `${origin}/llms.txt`,
    supportedInterfaces: [
      {
        url: `${origin}/mcp`,
        protocolBinding: 'HTTP+JSON',
        protocolVersion: '0.3',
      },
    ],
    capabilities: {
      streaming: false,
      pushNotifications: false,
      extendedAgentCard: false,
    },
    defaultInputModes: ['text/plain', 'application/json'],
    defaultOutputModes: ['text/plain', 'application/json'],
    skills: [
      {
        id: 'site-info',
        name: 'Site info',
        description: 'Return ZaryadnaStantsiya site profile and positioning.',
        tags: ['site', 'backup-power', 'ukraine'],
        examples: ['What is ZaryadnaStantsiya?', 'Зарядна станція порівняння'],
        inputModes: ['text/plain'],
        outputModes: ['application/json', 'text/plain'],
      },
      {
        id: 'list-categories',
        name: 'List product categories',
        description: 'List power station, generator, and inverter category URLs.',
        tags: ['categories', 'stations', 'generators', 'inverters'],
        examples: ['Which product categories exist?', 'Де зарядні станції?'],
        inputModes: ['text/plain'],
        outputModes: ['application/json', 'text/plain'],
      },
      {
        id: 'contact',
        name: 'Contact',
        description: 'Return contact / claim channels for partners and installers.',
        tags: ['contact', 'claim', 'installers'],
        examples: ['How do I contact ZaryadnaStantsiya?', 'Заявка для інсталятора'],
        inputModes: ['text/plain'],
        outputModes: ['application/json', 'text/plain'],
      },
    ],
    serviceSkills: CATEGORIES.map((c) => c.name),
  };

  return NextResponse.json(card, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
